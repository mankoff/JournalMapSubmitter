
// This function is called onload in the popup code
function getPageDetails(callback) { 
    // Inject the content script into the current page 
    chrome.tabs.executeScript(null, { file: 'content.js' }); 
    // Perform the callback when a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message)  { 
        // Call the callback function
        callback(message); 
    }); 
}; 


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // read `newIconPath` from request and read `tab.id` from sender

	chrome.browserAction.setBadgeText({
	    text: "DOI",
	    tabId: sender.tab.id
	});
	
	chrome.browserAction.setBadgeBackgroundColor({
	    color: [255,0,0],
	    tabId: sender.tab.id
	});
	
        // chrome.browserAction.setIcon({
        //     path: request.newIconPath,
        //     tabId: sender.tab.id
        // });

	// chrome.browserAction.setTitle({
	//     default_title: request.setTitle,
	//     tabId: sender.tab.id
	// });

    });

