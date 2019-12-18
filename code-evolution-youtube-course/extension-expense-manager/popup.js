$(function(){

    // Show Limit and Total
    chrome.storage.sync.get(['total','limit'],function(resultObject){
        let limit = resultObject.limit ? resultObject.limit : 0;
        let total = resultObject.total ? resultObject.total : 0;
        $('#limit').text(limit)
        $('#total').text(total)
    });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'],function(resultObject){
            let newTotal = 0;

            if(resultObject.total){
                newTotal += parseInt(resultObject.total)
            }

            let enteredAmount = $('#amount').val()

            if(enteredAmount){
                newTotal += parseInt(enteredAmount)
            }
            
            
            chrome.storage.sync.set({'total': newTotal},function(){
                if(enteredAmount && (newTotal >= resultObject.limit)){
                    let notificationOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Spend Limit Reached!💸',
                        message: 'It looks like you have reached your spending limit!!'
                    } 

                    let timestamp = new Date().getTime()
                    chrome.notifications.create('limit-exceed-notification-'+ timestamp, notificationOptions)
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('')
        })
    })
})