
// Load newsletter form
  function openNews() {
    console.log("click");
    if (window.screen.width < 990) { // mobile
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', 'S3pQAq']);
    } else { // desktop
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', 'TxTJKC']);
    }
  }
  
  document.querySelector('.blog_and_newsletter_image.newsletter-image').addEventListener('click', openNews);
