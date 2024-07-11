 class DetailsModal extends HTMLElement {
   constructor() {
     super();
     this.detailsContainer = this.querySelector('details');
     this.summaryToggle = this.querySelector('summary');

     this.detailsContainer.addEventListener(
       'keyup',
       (event) => event.code.toUpperCase() === 'ESCAPE' && this.close()
     );
     this.summaryToggle.addEventListener(
       'click',
       this.onSummaryClick.bind(this)
     );
     this.querySelector('button[type="button"]').addEventListener(
       'click',
       this.close.bind(this)
     );

     this.summaryToggle.setAttribute('role', 'button');
   }

   isOpen() {
     return this.detailsContainer.hasAttribute('open');
   }

   onSummaryClick(event) {
     event.preventDefault();
     event.target.closest('details').hasAttribute('open')
       ? this.close()
       : this.open(event);
	   if (event.target.classList.contains('icon-search')) {
		   this.parentNode.querySelector('input.search__input').click();
	   }
   }

   onBodyClick(event) {
     if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) this.close(false);
   }

   open(event) {
     this.onBodyClickEvent =
       this.onBodyClickEvent || this.onBodyClick.bind(this);
     event.target.closest('details').setAttribute('open', true);
	   let headerMenu = $(event.target).closest('details').parents('.header__icons').siblings('nav')
	   if (window.screen.width > 990) {
		   headerMenu.addClass("header__menu--swiped");
	   } else {
		   if ($(event.target).parents(".header__search").length) {
			   $(event.target).parents(".header__search").addClass("search--active");
		   }
	   }
     document.body.addEventListener('click', this.onBodyClickEvent);
	   $("html").addClass("overflow-hidden");

     trapFocus(
       this.detailsContainer.querySelector('[tabindex="-1"]'),
       this.detailsContainer.querySelector('input:not([type="hidden"])')
     );
   }

   close(focusToggle = true) {
     removeTrapFocus(focusToggle ? this.summaryToggle : null);
		 if (this.summaryToggle.classList.contains('header__icon')) {
			 let headerMenu = $(this.summaryToggle).closest('details').parents('.header__icons').siblings('nav')
			 if (window.screen.width > 990) {
				 headerMenu.removeClass("header__menu--swiped");
			 } else {
				 if ($(".header__search").hasClass("search--active")) {
					 $(".header__search").removeClass("search--active");
				 }
			 }
		 }
     this.detailsContainer.removeAttribute('open');
     document.body.removeEventListener('click', this.onBodyClickEvent);
     document.body.classList.remove('overflow-hidden');
		 $("html").removeClass("overflow-hidden");
		 $(".header-overlay").addClass("hidden");
   }
 }

 customElements.define('details-modal', DetailsModal);
