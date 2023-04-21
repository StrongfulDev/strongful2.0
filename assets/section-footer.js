
window.addEventListener("load", function(event) {
  // Load newsletter form
  function openNews() {
    if (window.screen.width < 990) { // mobile
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', 'S3pQAq']);
    } else { // desktop
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', 'TxTJKC']);
    }
  }
  
  document.querySelector('.newsletter-image').addEventListener('click', openNews);
});
