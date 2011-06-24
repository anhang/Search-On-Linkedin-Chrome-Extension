function selectionOnClick(info, tab){
	getCompanyId(info["selectionText"], tab);
}

function getCompanyId(name, tab){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://www.linkedin.com/ta/federator?types=company&query=" + name, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		getCompanyIdCB(JSON.parse(xhr.responseText), tab);
	  }
	}
	xhr.send();
}

function getCompanyIdCB(response, tab){
	chrome.tabs.sendRequest(tab.id, {companyId : response.company.resultList[0].id}, function(response){
		// alert(response.response);
	});
}


var context = "selection"
var title = "Search On Linkedin!";
var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                     "onclick": selectionOnClick});

