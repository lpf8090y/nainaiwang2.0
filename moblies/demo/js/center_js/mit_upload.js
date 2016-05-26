window.onload=function(){(function(){function f(){
  document.getElementById(this.getAttribute("imgid")).src="";
    this.parentNode.style.display="none"}for(var a=document.querySelectorAll(".uploadimga"),
    b=0;b<a.length;b++){var c=document.createElement("input"),
    g=document.getElementById(a[b].getAttribute("imgid")),
    d=document.getElementById(a[b].getAttribute("removeid"));
    d.setAttribute("imgid",
      a[b].getAttribute("imgid"));
    c.setAttribute("removeboxid",
      a[b].getAttribute("removeboxid"));
    d.onclick=f;
    c.style.display="none";
    c.type="file";
    c.setAttribute("imgid",
    a[b].getAttribute("imgid"));
    a[b].appendChild(c);
a[b].onclick=function(){var b=this.getElementsByTagName("input")[0];
b.onchange=function(a){var c=this;
  a=b.files[0];
  if(!/image\/\w+/.test(a.type))return!1;
  var e=new FileReader;
  e.readAsDataURL(a);
  e.onload=function(a){document.getElementById(c.getAttribute("removeboxid")).style.display="block";
  document.getElementById(c.getAttribute("imgid")).src=this.result}};
  var a=document.createEvent("MouseEvents");
  a.initEvent("click",!1,!0);
  b.dispatchEvent(a)};
  g.onclick=function(){var a=document.createElement("img");
  a.src=this.src;
  a.className="mengbanimg";
  var b=document.createElement("div");
  b.appendChild(a);
  b.className="mengban";document.body.appendChild(b);
  b.onclick=function(){b.remove()}
}}})();
};