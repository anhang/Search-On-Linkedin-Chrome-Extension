var sendToApplication;

function getCompanyId(name) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://www.linkedin.com/ta/federator?types=company&query=" + name, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
      getCompanyIdCB(JSON.parse(xhr.responseText));
	  }
	}
	xhr.send();
}

function getCompanyIdCB(response) {
  if (response.company.resultList.length === 0) {
    return;
  }
  sendToApplication && sendToApplication(response.company.resultList[0]);
}

var cm_clickHandler = function(clickData, tab) {
  getCompanyId(clickData.selectionText);
};

chrome.contextMenus.create({
  title: 'search!',
  contexts: ['all'],
  onclick: cm_clickHandler
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  sendToApplication = sendResponse;
  return true;
});

