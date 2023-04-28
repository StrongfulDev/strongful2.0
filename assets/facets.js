class FacetFiltersForm extends HTMLElement {
  constructor() {
    super();
    this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    this.debouncedOnSubmit = debounce((event) => {
      this.onSubmitHandler(event);
    }, 500);

    const facetForm = this.querySelector('form');
    facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

    const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
  }

  static setListeners() {
    const onHistoryChange = (event) => {
      const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
      if (searchParams === FacetFiltersForm.searchParamsPrev) return;
      FacetFiltersForm.renderPage(searchParams, null, false);
    }
    window.addEventListener('popstate', onHistoryChange);
  }

  static toggleActiveFacets(disable = true) {
    document.querySelectorAll('.js-facet-remove').forEach((element) => {
      element.classList.toggle('disabled', disable);
    });
  }

  static renderPage(searchParams, event, updateURLHash = true) {
    FacetFiltersForm.searchParamsPrev = searchParams;
    const sections = FacetFiltersForm.getSections();
    const countContainer = document.getElementById('ProductCount');
    const countContainerDesktop = document.getElementById('ProductCountDesktop');
    document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
    if (countContainer) {
      countContainer.classList.add('loading');
    }
    if (countContainerDesktop) {
      countContainerDesktop.classList.add('loading');
    }

    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = element => element.url === url;

      FacetFiltersForm.filterData.some(filterDataUrl) ?
        FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) :
        FacetFiltersForm.renderSectionFromFetch(url, event);
    });

    if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
  }

  static renderSectionFromFetch(url, event) {
    fetch(url)
      .then(response => response.text())
      .then((responseText) => {
        const html = responseText;
        FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, {html, url}];
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
      });
  }

  static renderSectionFromCache(filterDataUrl, event) {
    const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
    FacetFiltersForm.renderFilters(html, event);
    FacetFiltersForm.renderProductGridContainer(html);
    FacetFiltersForm.renderProductCount(html);
  }

  static renderProductGridContainer(html) {
    document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
  }

  static renderProductCount(html) {
    const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML
    const container = document.getElementById('ProductCount');
    const containerDesktop = document.getElementById('ProductCountDesktop');
    container.innerHTML = count;
    container.classList.remove('loading');
    if (containerDesktop) {
      containerDesktop.innerHTML = count;
      containerDesktop.classList.remove('loading');
    }
  }

  static renderFilters(html, event) {
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    const facetDetailsElements =
      parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');
    const matchesIndex = (element) => {
      const jsFilter = event ? event.target.closest('.js-filter') : undefined;
      return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
    }
    const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
    const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

    facetsToRender.forEach((element) => {
      document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
    });

    colorRounds(document);
    sizeRounds(document);
    FacetFiltersForm.renderActiveFacets(parsedHTML);
    FacetFiltersForm.renderAdditionalElements(parsedHTML);

    if (countsToRender) FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
  }

  static renderActiveFacets(html) {
    const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

    activeFacetElementSelectors.forEach((selector) => {
      const activeFacetsElement = html.querySelector(selector);
      if (!activeFacetsElement) return;
      document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
      hideInStockFacet();
    })

    FacetFiltersForm.toggleActiveFacets(false);
  }

  static renderAdditionalElements(html) {
    const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

    mobileElementSelectors.forEach((selector) => {
      if (!html.querySelector(selector)) return;
      document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
    });

    document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
  }

  static renderCounts(source, target) {
    const targetElement = target.querySelector('.facets__selected');
    const sourceElement = source.querySelector('.facets__selected');

    const targetElementAccessibility = target.querySelector('.facets__summary');
    const sourceElementAccessibility = source.querySelector('.facets__summary');

    if (sourceElement && targetElement) {
      target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
    }

    if (targetElementAccessibility && sourceElementAccessibility) {
      target.querySelector('.facets__summary').outerHTML = source.querySelector('.facets__summary').outerHTML;
    }
  }

  static updateURLHash(searchParams) {
    history.pushState({searchParams}, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
  }

  static getSections() {
    return [
      {
        section: document.getElementById('product-grid').dataset.id,
      }
    ]
  }

  createSearchParams(form) {
    const formData = new FormData(form);
    return new URLSearchParams(formData).toString();
  }

  onSubmitForm(searchParams, event) {
    FacetFiltersForm.renderPage(searchParams, event);
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const sortFilterForms = document.querySelectorAll('facet-filters-form form');
    if (event.srcElement.className == 'mobile-facets__checkbox') {
      const searchParams = this.createSearchParams(event.target.closest('form'))
      this.onSubmitForm(searchParams, event)
    } else {
      const forms = [];
      const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

      sortFilterForms.forEach((form) => {
        if (!isMobile) {
          if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
            const noJsElements = document.querySelectorAll('.no-js-list');
            noJsElements.forEach((el) => el.remove());
            forms.push(this.createSearchParams(form));
          }
        } else if (form.id === 'FacetFiltersFormMobile') {
          forms.push(this.createSearchParams(form));
        }
      });
      this.onSubmitForm(forms.join('&'), event)
    }
  }

  onActiveFilterClick(event) {
    event.preventDefault();
    FacetFiltersForm.toggleActiveFacets();
    const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
    FacetFiltersForm.renderPage(url);
  }
}

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

class PriceRange extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('input')
      .forEach(element => element.addEventListener('change', this.onRangeChange.bind(this)));
    this.setMinAndMaxValues();
  }

  onRangeChange(event) {
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValues();
  }

  setMinAndMaxValues() {
    const inputs = this.querySelectorAll('input');
    const minInput = inputs[0];
    const maxInput = inputs[1];
    if (maxInput.value) minInput.setAttribute('max', maxInput.value);
    if (minInput.value) maxInput.setAttribute('min', minInput.value);
    if (minInput.value === '') maxInput.setAttribute('min', 0);
    if (maxInput.value === '') minInput.setAttribute('max', maxInput.getAttribute('max'));
  }

  adjustToValidValues(input) {
    const value = Number(input.value);
    const min = Number(input.getAttribute('min'));
    const max = Number(input.getAttribute('max'));

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
}

customElements.define('price-range', PriceRange);

class FacetRemove extends HTMLElement {
  constructor() {
    super();
    const facetLink = this.querySelector('a');
    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', this.closeFilter.bind(this));
    facetLink.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') this.closeFilter(event);
    });
  }

  closeFilter(event) {
    event.preventDefault();
    const form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
    form.onActiveFilterClick(event);
  }
}

customElements.define('facet-remove', FacetRemove);

function colorRounds(html) {
  const colorLabels = html.querySelectorAll(".color-label");
  const colorRounds = html.querySelectorAll(".color-round");

  for (let i = 0; i < colorLabels.length; i++) {
    switch (colorLabels[i].innerHTML) {
      case "שחור":
        colorRounds[i].style.backgroundColor = "#000000";
        break;
      case "לבן":
        colorRounds[i].style.backgroundColor = "#ffffff";
        colorRounds[i].style.border = "1px solid #000000";
        break;
      case "אדום":
        colorRounds[i].style.backgroundColor = "#ff0000";
        break;
      case "כחול":
        colorRounds[i].style.backgroundColor = "rgb(34, 29, 193)";
        break;
      case "ירוק":
        colorRounds[i].style.backgroundColor = "rgb(0, 106, 78)";
        break;
      case "ניוד":
        colorRounds[i].style.backgroundColor = "rgb(225, 205, 180)";
        break;
      case "צהוב":
        colorRounds[i].style.backgroundColor = "rgb(253, 226, 0)";
        break;
      case "כתום":
        colorRounds[i].style.backgroundColor = "rgb(231, 155, 46)";
        break;
      case "סגול":
        colorRounds[i].style.backgroundColor = "rgb(126, 11, 128)";
        break;
      case "ורוד":
        colorRounds[i].style.backgroundColor = "rgb(252, 172, 173)";
        break;
      case "חום":
        colorRounds[i].style.backgroundColor = "rgb(123, 79, 44)";
        break;
      case "אפור":
        colorRounds[i].style.backgroundColor = "rgb(217, 217, 217)";
        break;
      default:
        console.log("no color");
        break;
    }
  }
}

function sizeRounds(dom) {
  let sizeLabels = dom.querySelectorAll(".size-label");
  for (let i = 0; i < sizeLabels.length; i++) {
    let sizeLabel = sizeLabels[i];
    switch (sizeLabel.innerHTML) {
      case "XXS":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 1);
        break;
      case "XS":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 2);
        break;
      case "S":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 3);
        break;
      case "M":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 4);
        break;
      case "L":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 5);
        break;
      case "XL":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 6);
        break;
      case "XXL":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 7);
        break;
      case "XXXL":
        $(sizeLabel).closest(".mobile-facets__item").css("order", 8);
        break;
    }
  }
}

function hideInStockFacet() {
  let spans = document.querySelectorAll('.active-facets__button-inner');
  spans.forEach(function(span) {
    if (span.innerText.includes('Availability')) {
      $(span).parents('facet-remove').addClass('hidden');
    }
  });
}

function designSort() {

  // get all the parent divs of the real select elements
  let realSelectContainer = document.querySelectorAll(".select");

  // loop through all the parent divs
  for (let i = 0; i < realSelectContainer.length; i++) {

    // get the real select element of each parent div
    let realSelectElement = realSelectContainer[i].querySelector("select");

    // create a fake select element container
    let fakeDropDown = document.createElement("DIV");
    fakeDropDown.setAttribute("class", "select-selected");
    fakeDropDown.innerHTML = realSelectElement.options[realSelectElement.selectedIndex].innerHTML;

    // add the fake dropdown to the real select element
    realSelectContainer[i].appendChild(fakeDropDown);

    // create a fake select element (div) that will contain all the fake options
    let fakeSelectElement = document.createElement("DIV");
    fakeSelectElement.setAttribute("class", "select-items select-hide");

    // loop through all the options of the real select element
    for (let j = 1; j < realSelectElement.length; j++) {

      // create a fake option (div) for each option of the real select element
      let fakeOption = document.createElement("DIV");
      fakeOption.innerHTML = realSelectElement.options[j].innerHTML;

      // when the fake option is clicked, update the fake dropdown text and the real select element
      fakeOption.addEventListener("click", function(e) {

        // get the real select element of the fake option that was clicked
        let fakeOptionRealSelect = this.parentNode.parentNode.querySelector(".select__select");

        // get the fake dropdown of the fake option that was clicked
        let fakeDropdownOption = this.parentNode.previousSibling;

        for (let i = 0; i < fakeOptionRealSelect.length; i++) {
          if (fakeOptionRealSelect.options[i].innerHTML === this.innerHTML) {
            fakeOptionRealSelect.selectedIndex = i;
            fakeDropdownOption.innerHTML = this.innerHTML;
            let fakeSelectedOption = this.parentNode.getElementsByClassName("same-as-selected");
            fakeOptionRealSelect.options[i].setAttribute("selected", "selected");
            //submit the parent form of the select element when the fake option is clicked using jquery
            $(fakeOptionRealSelect).closest('form').submit();

            for (let k = 0; k < fakeSelectedOption.length; k++) {
              fakeSelectedOption[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        fakeDropdownOption.click();
      });
      fakeSelectElement.appendChild(fakeOption);
    }
    realSelectContainer[i].appendChild(fakeSelectElement);
    fakeDropDown.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    let arrNo = [];
    let fakeSelectContainer = document.getElementsByClassName("select-items");
    let y = document.getElementsByClassName("select-selected");
    for (let i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (let i = 0; i < fakeSelectContainer.length; i++) {
      if (arrNo.indexOf(i)) {
        fakeSelectContainer[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);
}

colorRounds(document);
sizeRounds(document);
hideInStockFacet();
designSort();

// TODO: Insert to class
document.getElementById('Filter-filter.v.availability-mobile-1').checked = true;
