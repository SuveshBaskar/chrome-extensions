$(function(){

    // Show Limit and Total
    chrome.storage.sync.get(['total','limit'],function(resultObject){
        let limit = resultObject.limit ? resultObject.limit : 0;
        let total = resultObject.total ? resultObject.total : 0;
        $('#limit').text(limit)
        $('#total').text(total)
    });

    // Set Limit
    $('#setLimit').click(function(){

        let limitAmount = $('#limitAmount').val()

        if(limitAmount){
            chrome.storage.sync.set({'limit': limitAmount});
            $('#limit').text(limitAmount)
        }
        $('#limitAmount').val('')
        close()
    })

    
    // Reset Total
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': '0'},function(){
            let notificationOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total Amount is set to Zero💰',
                message: 'You have changed your total spending amount to zero!'
            } 

            let timestamp = new Date().getTime()
            chrome.notifications.create('total-reset-notification-'+ timestamp, notificationOptions)

        });
        $('#total').text(0)
    })


})