let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
});

const installBtn = document.getElementById('installBtn');
installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    await deferredPrompt.prompt();
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    // Reset the deferred prompt variable
    deferredPrompt = null;
    // Handle the user's response
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  }
});
