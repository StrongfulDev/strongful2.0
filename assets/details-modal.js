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
	   }
     document.body.addEventListener('click', this.onBodyClickEvent);
     document.body.classList.add('overflow-hidden');

     trapFocus(
       this.detailsContainer.querySelector('[tabindex="-1"]'),
       this.detailsContainer.querySelector('input:not([type="hidden"])')
     );
   }

   close(focusToggle = true) {
     removeTrapFocus(focusToggle ? this.summaryToggle : null);
	   let headerMenu = $(event.target).closest('details').parents('.header__icons').siblings('nav')
	   if (window.screen.width > 990) {
		   headerMenu.removeClass("header__menu--swiped");
	   }
     this.detailsContainer.removeAttribute('open');
     document.body.removeEventListener('click', this.onBodyClickEvent);
     document.body.classList.remove('overflow-hidden');
   }
 }

 customElements.define('details-modal', DetailsModal);
