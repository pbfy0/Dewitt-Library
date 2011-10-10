var activeXHR = !(window.XMLHttpRequest);
function xhr(u, c){
	var xhttp = activeXHR ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	xhttp.onreadystatechange = function(evt){c.call(xhttp, u)};
	xhttp.open("GET", u, true);
	xhttp.send();
}
//window.items = {};
var gc = 0;
function fload(){
	document.getElementById("noscript").style.display = "none";
	document.getElementById("subject").style.display = "inline";
	xhr("classresources/manifest.json", function(uri){
		if(this.readyState != 4 || this.status != 200){return}
		var ls = JSON.parse(this.responseText);
		var i;
		for(i in ls){
			xhr("classresources/" + ls[i], function(uri){
				if(this.readyState != 4 || this.status != 200){return}
//				console.log(this.readyState, this.status, this.responseText);
				var its = JSON.parse(this.responseText);
				var name = its.name;
				its = its.links;
				var i;
				var el = document.getElementById("items");
				var div = document.createElement("div");
				div.style.display = "none";
				div.id = "e" + gc;
				gc++;
				el.appendChild(div);
				for(i in its){
					var a = document.createElement("a");
					a.innerHTML = its[i][0];
					a.href = its[i][1];
					div.appendChild(a);
					div.appendChild(document.createElement("br"));
				}
				var op = document.createElement("option");
				op.innerHTML = name;
				op.value = div.id;
				document.getElementById("subject").appendChild(op);
			});
		}
	});
}

function hide(){
	var th = document.getElementById("items").getElementsByTagName("div");
	var i;
	for(i in th){
		if(th[i].style === undefined){continue}
		th[i].style.display = "none";
	}
}
function load(){
	var o = document.getElementById("subject");
	hide();
	if(o.selectedIndex == 0){
		return;
	}
	var u = o.options[o.selectedIndex].value;
	document.getElementById(u).style.display = "block";
}
/*function load(){
	var o = document.getElementById("subject");
	if(o.selectedIndex == 0){
		document.getElementById("items").innerHTML = "";
		return;
	}
	var u = o.options[o.selectedIndex].value;
	xhr(u, function(uri){
		if(this.readyState == 4){
			if(this.status == 200){
				var jds = JSON.parse(this.responseText);
				var out = document.getElementById("items");
				out.innerHTML = "";
				for(i in jds){
					var a = document.createElement("a");
					a.href = jds[i].href;
					a.innerHTML = jds[i].innerHTML;
					out.appendChild(a);
					out.appendChild(document.createElement("br"));
				}
			}
		}
	});
}*/
