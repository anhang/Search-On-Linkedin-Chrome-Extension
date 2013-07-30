var mouseX = 0;
var mouseY = 0;

function showCompanyDataBox(companyId){
	var bg = document.createElement("div");
	bg.setAttribute("id", "companyFrameDiv");
	bg.setAttribute("style", "background-color:rgba(255,255,255,0.8);width:100%;height:"+document.height+"px;position:absolute;top:0px;");
	bg.setAttribute("onclick", "document.body.removeChild(this);");
	
	var div = document.createElement("div");
	div.setAttribute("style", "z-index:9999;border:2px black solid;background:white;position:absolute; top: "+(mouseY-150)+"px; left: "+(mouseX-300)+"px;");
	
	var closeButton = document.createElement("div");
	closeButton.setAttribute("style", "padding:2px;opacity:0.8;position:absolute;background:black;color:white;top:0;right:0;cursor:pointer;");
	closeButton.setAttribute("onclick", "document.body.removeChild(this.parentElement.parentElement);");
	closeButton.appendChild(document.createTextNode("Close"));
	
	var iframe = document.createElement("iframe");
	iframe.setAttribute("src", "http://www.anhangzhu.com/companyframe.html?companyId="+companyId);
	iframe.setAttribute("id", "companyFrame");
	iframe.setAttribute("style", "width:645px; height:320px;border:none;");
	
	
	div.appendChild(iframe);
	div.appendChild(closeButton);
	bg.appendChild(div);
	document.body.appendChild(bg);
}

document.onmousemove = function(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
}


function onSelectionChange() {
  var selection = window.getSelection().toString().trim();
  var msg = {
    "selection" : selection
  };
  chrome.extension.sendMessage(msg, function(company) {
    showCompanyDataBox(company.id);
  });
}

document.addEventListener('selectionchange', onSelectionChange);
