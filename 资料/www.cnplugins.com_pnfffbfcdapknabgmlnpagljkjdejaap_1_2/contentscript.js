var jimBodyDiv = document.getElementById('jim-body');
if(jimBodyDiv){
	chrome.extension.sendRequest({action:'showAction'}, function(response) {});
	var chromeTransfer = document.getElementById('chromeTransfer');
	if(chromeTransfer){
		var installEventObject = document.createEvent('Event');
		installEventObject.initEvent('extensionInstalled', true, true);
		chromeTransfer.dispatchEvent(installEventObject);

		chromeTransfer.addEventListener('getContentEvent', handleContentEvent);
		chromeTransfer.addEventListener('getCommentsEvent', handleCommentsEvent);
		handleContentEvent();
	}

	function handleContentEvent() {
		var chromeTransferDiv = document.getElementById('chromeTransfer');
		if(chromeTransferDiv){
			if($(chromeTransferDiv).text()!=""){
				var request = JSON.parse($(chromeTransferDiv).text());
				var requestURL = request.url;
					jQuery.ajax({
					"type": "GET",
					"dataType": "html",
					"url": "./review/"+ requestURL +".html",
					"cache": false
					})
					.done(function(html, textStatus, jqXHR) {
						chromeTransferDiv.innerText = JSON.stringify({html:html, textStatus:textStatus,jqXHR:jqXHR});
						var doneEventObject = document.createEvent('Event');
						doneEventObject.initEvent('ajaxDoneEvent', true, true);
						chromeTransferDiv.dispatchEvent(doneEventObject);
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						chromeTransferDiv.innerText = JSON.stringify({textStatus:textStatus,jqXHR:jqXHR,errorThrown:errorThrown});
						var failEventObject = document.createEvent('Event');
						failEventObject.initEvent('ajaxFailEvent', true, true);
						chromeTransferDiv.dispatchEvent(failEventObject);
					});
			}
		}
	}
	
	function handleCommentsEvent() {
		var chromeTransferDiv = document.getElementById('chromeTransfer');
		if(chromeTransferDiv){		
		    	jQuery.ajax({
		    	      "url": "comments/annotations.json",
		    	      "dataType": "json"
		    	    })
		    	    .done(function(json, textStatus, jqXHR) {
						chromeTransferDiv.innerText = JSON.stringify(json);
						var doneEventObject = document.createEvent('Event');
						doneEventObject.initEvent('ajaxCommentsDoneEvent', true, true);
						chromeTransferDiv.dispatchEvent(doneEventObject);
		    	    })
		    	    .fail(function(xhr, status, error) {
						var failEventObject = document.createEvent('Event');
						failEventObject.initEvent('ajaxCommentsFailEvent', true, true);
						chromeTransferDiv.dispatchEvent(failEventObject);
		    	    });
			
		}
	}
}
else{
    chrome.extension.sendRequest({action:'hideAction'}, function(response) {});
}


