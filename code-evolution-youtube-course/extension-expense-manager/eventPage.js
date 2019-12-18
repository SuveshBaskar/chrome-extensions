let contextMenuItems = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItems)

function isInt(value){
    return  !isNaN(value) && 
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value,10))
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total','limit'],function(budget){
                let newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total)
                }

                newTotal += parseInt(clickData.selectionText)
                chrome.storage.sync.set({'total':newTotal},function(){
                    if(newTotal >= budget.limit){
                        let notificationOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Spend Limit Reached!💸',
                            message: 'It looks like you have reached your spending limit!!'
                        } 
    
                        let timestamp = new Date().getTime()
                        chrome.notifications.create('limit-exceed-notification-'+ timestamp, notificationOptions)
    
                    }
                })
            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes,storageName){
    chrome.browserAction.setBadgeText({'text':changes.total.newValue.toString()})
})