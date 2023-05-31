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
    FacetFiltersForm.activeFilterCount();
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

	  const endlessCollection = new Ajaxinate({
		  container: '#product-grid',
		  pagination: '.infinite_next',
	  });
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
    designSort();
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
	  onlyShowIfInStock();
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

  static activeFilterCount() {
    let activeFilters = document.querySelectorAll('.mobile-facets__checkbox:checked');
    let activeFiltersDOMElements = document.querySelectorAll(".mobile-facets__active-filter-count");
    activeFiltersDOMElements.forEach(function(element) {
      element.innerHTML = "(" + activeFilters.length + ")";
    });
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
    FacetFiltersForm.activeFilterCount();
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

$(".pagination__list .loading-overlay__spinner").removeClass("hidden");

    function colorRounds(html) {
      let colorLabels = html.querySelectorAll(".color-label");
      for (let i = 0; i < colorLabels.length; i++) {
        let siblingRound = colorLabels[i].previousElementSibling;
        if (colorLabels[i].innerHTML.includes("שחור")) {
          siblingRound.style.backgroundColor = "#000000";
        } else if (colorLabels[i].innerHTML.includes("לבן")) {
          siblingRound.style.backgroundColor = "#ffffff";
          siblingRound.style.border = "1px solid #000000";
        } else if (colorLabels[i].innerHTML.includes("אדום")) {
          siblingRound.style.backgroundColor = "#ff0000";
        } else if (colorLabels[i].innerHTML.includes("כחול")) {
          siblingRound.style.backgroundColor = "rgb(34, 29, 193)";
        } else if (colorLabels[i].innerHTML.includes("ירוק")) {
          siblingRound.style.backgroundColor = "rgb(0, 106, 78)";
        } else if (colorLabels[i].innerHTML.includes("ניוד")) {
          siblingRound.style.backgroundColor = "rgb(225, 205, 180)";
        } else if (colorLabels[i].innerHTML.includes("צהוב")) {
          siblingRound.style.backgroundColor = "rgb(253, 226, 0)";
        } else if (colorLabels[i].innerHTML.includes("כתום")) {
          siblingRound.style.backgroundColor = "rgb(231, 155, 46)";
        } else if (colorLabels[i].innerHTML.includes("סגול")) {
          siblingRound.style.backgroundColor = "rgb(126, 11, 128)";
        } else if (colorLabels[i].innerHTML.includes("ורוד")) {
          siblingRound.style.backgroundColor = "rgb(252, 172, 173)";
        } else if (colorLabels[i].innerHTML.includes("חום")) {
          siblingRound.style.backgroundColor = "rgb(123, 79, 44)";
        } else if (colorLabels[i].innerHTML.includes("אפור")) {
          siblingRound.style.backgroundColor = "rgb(217, 217, 217)";
        } else {
          console.log("no color");
        }
      }
 }

function sizeRounds(dom) {
  let sizeLabels = dom.querySelectorAll(".size-label");
  for (let i = 0; i < sizeLabels.length; i++) {
    let sizeLabel = sizeLabels[i];
    $(sizeLabel).closest("ul").css("display", "flex")
    $(sizeLabel).closest("ul").css("flex-direction", "column")
    if (sizeLabel.innerHTML.includes("XXS")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 1);
      $(sizeLabel).closest(".list-menu__item").css("order", 1);
    } else if (sizeLabel.innerHTML.includes("XS")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 2);
      $(sizeLabel).closest(".list-menu__item").css("order", 2);
    } else if (sizeLabel.innerHTML.includes("S")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 3);
      $(sizeLabel).closest(".list-menu__item").css("order", 3);
    } else if (sizeLabel.innerHTML.includes("M")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 4);
      $(sizeLabel).closest(".list-menu__item").css("order", 4);
    } else if (sizeLabel.innerHTML.includes("L")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 5);
      $(sizeLabel).closest(".list-menu__item").css("order", 5);
    } else if (sizeLabel.innerHTML.includes("XL")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 6);
      $(sizeLabel).closest(".list-menu__item").css("order", 6);
    } else if (sizeLabel.innerHTML.includes("XXL")) {
      $(sizeLabel).closest(".mobile-facets__item").css("order", 7);
      $(sizeLabel).closest(".list-menu__item").css("order", 7);
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
    // fakeDropDown.innerHTML = realSelectElement.options[realSelectElement.selectedIndex].innerHTML;
    fakeDropDown.innerHTML = 'סינון לפי';

    // add the fake dropdown to the real select element
    realSelectContainer[i].appendChild(fakeDropDown);

    // create a fake select element (div) that will contain all the fake options
    let fakeSelectElement = document.createElement("DIV");
    fakeSelectElement.setAttribute("class", "select-items select-hide");

    // loop through all the options of the real select element
    for (let j = 1; j < realSelectElement.length; j++) {

      // create a fake option (div) for each option of the real select element
      let fakeOption = document.createElement("DIV");
      fakeOption.setAttribute("class", "mobile-facets__label");
      let fakeOptionSquare = document.createElement("span");
      fakeOptionSquare.setAttribute("class", "mobile-facets__label-square");
      fakeOption.prepend(fakeOptionSquare);
      let fakeOptionLabel = document.createElement("span");
      fakeOptionLabel.setAttribute("class", "mobile-facets__label-text");
      fakeOptionLabel.innerHTML = realSelectElement.options[j].innerHTML;
      fakeOption.append(fakeOptionLabel);
      let fakeOptionCheckmark = document.createElement("span");
      fakeOptionCheckmark.setAttribute("class", "mobile-facets__label-checkmark");
      let fakeOptionCheckmarkHTML = '<svg aria-hidden="true" class="icon icon-checkmark" width="1.1rem" height="0.7rem" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
      fakeOptionCheckmark.innerHTML = fakeOptionCheckmarkHTML;
      fakeOption.append(fakeOptionCheckmark);

      // when the fake option is clicked, update the fake dropdown text and the real select element
      fakeOption.addEventListener("click", function(e) {

        // get the real select element of the fake option that was clicked
        let fakeOptionRealSelect = this.parentNode.parentNode.querySelector(".select__select");

        // get the fake dropdown of the fake option that was clicked
        let fakeDropdownOption = this.parentNode.previousSibling;

        // toggle the checkmark
        this.lastElementChild.firstElementChild.classList.toggle("visible-checkmark");
        this.lastElementChild.classList.toggle("checked");

        for (let i = 0; i < fakeOptionRealSelect.length; i++) {
          if (fakeOptionRealSelect.options[i].innerHTML === this.firstElementChild.nextElementSibling.innerHTML) {
            fakeOptionRealSelect.selectedIndex = i;
            fakeDropdownOption.innerHTML = this.firstElementChild.nextElementSibling.innerHTML;
            let fakeSelectedOption = this.parentNode.getElementsByClassName("same-as-selected");
            fakeOptionRealSelect.options[i].setAttribute("selected", "selected");
            //submit the parent form of the select element when the fake option is clicked using jquery
            $(fakeOptionRealSelect).closest('form').submit();

            for (let k = 0; k < fakeSelectedOption.length; k++) {
              fakeSelectedOption[k].removeAttribute("class");
            }
            this.classList.add("same-as-selected");
            break;
          } else {
            this.classList.remove("same-as-selected");
          }
        }
        // fakeDropdownOption.click();
      });
      fakeSelectElement.appendChild(fakeOption);
    }
    realSelectContainer[i].appendChild(fakeSelectElement);
    fakeDropDown.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.parentElement.firstElementChild.nextElementSibling.classList.toggle("rotate-arrow");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {

    // a function that will close all select boxes in the document, except the current select box
    let arrNo = [];

    // get all the fake select elements
    let fakeSelectContainer = document.getElementsByClassName("select-items");

    // get all the fake dropdowns
    let y = document.getElementsByClassName("select-selected");

    // loop through all the fake dropdowns
    for (let i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
  }
}

colorRounds(document);
sizeRounds(document);
hideInStockFacet();
designSort();

function onlyShowIfInStock() {
	const inputsToQuery = $(".facet-checkbox").find("input");
	for (let i = 0; i < inputsToQuery.length; i++) {
		if (inputsToQuery[i].value === '1') {
			inputsToQuery[i].checked = true;
		}
	}
}