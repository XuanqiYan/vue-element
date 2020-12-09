// Called when a message is passed.
function onRequest(request, sender, sendResponse) {
  if (request.action == 'showAction') {
	chrome.pageAction.show(sender.tab.id);
  }
  else if(request.action == 'hideAction'){
    chrome.pageAction.hide(sender.tab.id);
  }
  
  // Return nothing to let the connection be cleaned up.
  sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);