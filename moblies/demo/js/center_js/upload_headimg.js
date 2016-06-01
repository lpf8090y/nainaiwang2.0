$(function(){
function orient() {

if (window.orientation == 0 || window.orientation == 180) {
$("body").attr("class", "portrait");

var img = new Image();
img.src = $("#img0").attr("src");


if($(document.body).width()<img.width){
$("#img0").attr("width", $(document.body).width());
}else{
$("#img0").attr("width", img.width);
}

}
else if (window.orientation == 90 || window.orientation == -90) {
$("body").attr("class", "landscape");

var img = new Image();
img.src = $("#img0").attr("src");


if($(document.body).width()<img.width){
$("#img0").attr("width", $(document.body).width());
}else{
$("#img0").attr("width", img.width);
}

}
}

$(window).bind( 'orientationchange', function(e){
orient();
});


$("#file0").change(function(){
var objUrl = getObjectURL(this.files[0]) ;
var obj_file = document.getElementById("file0");
filesize = obj_file.files[0].size;
if(filesize>1024*200){
$('#note').css({display:'block', top:'-100px'}).animate({top: '+3'}, 500, function(){
setTimeout(out, 3000);
});
function out(){
$('#note').animate({top:'0'}, 500, function(){
$(this).css({display:'none', top:'-100px'});
});
}
$('#file0').val('');
return false;
}
console.log("objUrl = "+objUrl) ;
if (objUrl) {
$("#img0").attr("src", objUrl).after(" <i class=\"icon icon-clear\" style=\"position:absolute;width:75px;height:75px;cursor:pointer;height75px;left:5%\"></i>");
$(".add").css("display","none");
$(".icon-clear").click(function(){
$(".add").css("display","");
$('#file0').val('');
$("#img0").attr("src", "");
$("#img0").removeAttr("width").removeAttr("height");
$("#img0").next("i").remove();

});
var img = new Image();
img.src = objUrl;
img.onload = function(){


if(img.width/img.height>4/3){
if(img.width>80){
$("#img0").attr("width", "75");
}else{
$("#img0").attr("width", "75");
}
}else{
if(img.height>60){
$("#img0").attr("height", "75");
}else{
$("#img0").attr("height", "75");
}
}

}


}
}) ;});
//建立一個可存取到該file的url
function getObjectURL(file) {
var url = null ;
if (window.createObjectURL!=undefined) { // basic
url = window.createObjectURL(file) ;
} else if (window.URL!=undefined) { // mozilla(firefox)
url = window.URL.createObjectURL(file) ;
} else if (window.webkitURL!=undefined) { // webkit or chrome
url = window.webkitURL.createObjectURL(file) ;
}
return url ;
}

