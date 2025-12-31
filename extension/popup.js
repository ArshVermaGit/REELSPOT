document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('statusText');
    const downloadBtn = document.getElementById('downloadBtn');

    // Get current tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;

        if (url.includes('instagram.com') || url.includes('youtube.com') || url.includes('tiktok.com') || url.includes('twitter.com') || url.includes('x.com')) {
            statusText.textContent = "Supported platform detected. Ready to extract.";
            downloadBtn.style.opacity = "1";
        } else {
            statusText.textContent = "No supported media detected on this page.";
            // downloadBtn.style.opacity = "0.5";
            // downloadBtn.disabled = true;
        }

        downloadBtn.addEventListener('click', () => {
             // For development, we point to localhost. 
             // IN PRODUCTION: Change this to https://reelspot.vercel.app/
             const targetBase = "http://localhost:3000/"; 
             
             // Open ReelSpot with URL pre-filled
             // We can pass it as a query param if we update the main page to read it
             // For now, let's just open the site
             chrome.tabs.create({ url: targetBase + "?url=" + encodeURIComponent(url) });
        });
    });
});
