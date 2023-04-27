
class SliderComponent extends HTMLElement {
    constructor() {
        super();
        this.slider = this.querySelector('[id^="Slider-"]');
        this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
        this.enableSliderLooping = false;
        this.currentPageElement = this.querySelector('.slider-counter--current');
        this.pageTotalElement = this.querySelector('.slider-counter--total');
        this.prevButton = this.querySelector('button[name="previous"]');
        this.nextButton = this.querySelector('button[name="next"]');

        if (!this.slider || !this.nextButton) return;

        this.initPages();
        const resizeObserver = new ResizeObserver(entries => this.initPages());
        resizeObserver.observe(this.slider);

        this.slider.addEventListener('scroll', this.update.bind(this));
        this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
        this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
    }

    cumulativeOffset(element) {
        return {
            top: element.offsetTop,
            left: element.offsetLeft
        }

        let top = 0;
        let left = 0;

        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    };

    initPages() {
        this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
        if (this.sliderItemsToShow.length < 2) return;
        this.sliderItemOffset = this.cumulativeOffset(this.sliderItemsToShow[1]).left - this.cumulativeOffset(this.sliderItemsToShow[0]).left;
        this.slidesPerPage = Math.floor((this.slider.clientWidth - this.cumulativeOffset(this.sliderItemsToShow[0]).left) / this.sliderItemOffset);
        this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
        this.update();
    }

    resetPages() {
        this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
        this.initPages();
    }

    update() {
        // Temporarily prevents unneeded updates resulting from variant changes
        // This should be refactored as part of https://github.com/Shopify/dawn/issues/2057
        if (!this.slider || !this.nextButton) return;

        const previousPage = this.currentPage;
        this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

        if (this.currentPageElement && this.pageTotalElement) {
            this.currentPageElement.textContent = this.currentPage;
            this.pageTotalElement.textContent = this.totalPages;
        }

        if (this.currentPage != previousPage) {
            this.dispatchEvent(new CustomEvent('slideChanged', {
                detail: {
                    currentPage: this.currentPage,
                    currentElement: this.sliderItemsToShow[this.currentPage - 1]
                }
            }));
        }

        if (this.enableSliderLooping) return;

        if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
            this.prevButton.setAttribute('disabled', 'disabled');
        } else {
            this.prevButton.removeAttribute('disabled');
        }

        if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
            this.nextButton.setAttribute('disabled', 'disabled');
        } else {
            this.nextButton.removeAttribute('disabled');
        }
    }

    isSlideVisible(element, offset = 0) {
        const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
        return (this.cumulativeOffset(element).left + element.clientWidth) <= lastVisibleSlide && this.cumulativeOffset(element).left >= this.slider.scrollLeft;
    }

    onButtonClick(event) {
        event.preventDefault();
        console.log(event.currentTarget.name);
        const step = event.currentTarget.dataset.step || 1;
        this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + (step * this.sliderItemOffset) : this.slider.scrollLeft - (step * this.sliderItemOffset);
        this.slider.scrollTo({
            left: this.slideScrollPosition
        });
    }
}

customElements.define('slider-component', SliderComponent);

