var activeXHR = !(window.XMLHttpRequest);
function xhr(u, c){
	var xhttp = activeXHR ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	xhttp.onreadystatechange = function(evt){c.call(xhttp, u)};
	xhttp.open("GET", u, true);
	xhttp.send();
}
function load(o){
	var u = o.options[o.selectedIndex].value;
	xhr(u, function(uri){
		if(this.readyState == 4){
				if(this.status == 200){
//				var xtree = document.createElement("div");
//				window.x = this.responseText;
//				xtree.innerHTML = this.responseText;
//				var xstring = HTMLtoXML(this.responseText);
				var parser = new DOMParser();  
//				var xtree = parser.parseFromString(this.responseText, "text/xml");
//				window.x = xtree;
//				var xtree = HTMLtoDOM(this.responseText);
//				var ell = xtree.getElementsByTagName("a");
				var a = this.responseText.split("<a");
				window.x = a;
				var i;
				var els = [];
				a.shift();
				var dir = parseUri(uri).directory;
				for(i in a){
					var x = ("<a" + a[i]).replace(/\r/g, "").replace(/\n/g, " ");
					var href = dir + x.match('href="(.*?)"')[1];
//					console.log(x, href);
//					href = href[1];
					var ih = x.match('>(.*?)</a')[1];
					els.push({href: href, innerHTML: ih});
				}
				var o = document.getElementById("items");
				o.innerHTML = "";
				for(i in els){
					console.log(els[i].href);
					var a = document.createElement("a");
					a.href = els[i].href;
					a.innerHTML = els[i].innerHTML;
					var li = document.createElement("li");
					li.appendChild(a);
					o.appendChild(li);
				}
			}
		}
		console.log(this.readyState, this.status);
	});
}
