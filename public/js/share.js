const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
  try {
    // Get the current URL
    const currentURL = window.location.href;

    // Check if the Web Share API is available
    if (navigator.share) {
      await navigator.share({
        title: 'Live Fixture',
        url: currentURL,
      });
      console.log('Content shared successfully!');
    } else {
      console.log('Web Share API not supported.');
      // Fallback to a different sharing mechanism, if needed
    }
  } catch (error) {
    console.error('Error sharing content:', error);
  }
});
