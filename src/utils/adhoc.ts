

export function removeURLParameters() {
    // Get the current URL
    let url = window.location.href;

    // Check if there are any parameters in the URL
    if (url.indexOf('?') !== -1) {
        // Remove parameters by slicing the URL string
        url = url.slice(0, url.indexOf('?'));
        
        // Update the URL without parameters
        window.history.replaceState({}, document.title, url);
    }
}
