chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.todo == 'showPageAction') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if(tabs[0]) chrome.pageAction.show(tabs[0].id)
    })
  }
});

let contextMenuItems = {
  id: 'create-ticket',
  title: 'Create Ticket'
};

chrome.contextMenus.create(contextMenuItems);
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == 'create-ticket') {
    chrome.tabs.executeScript({
      file: 'script.js'
    })
  }
})