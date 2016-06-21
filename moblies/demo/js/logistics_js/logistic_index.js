$(document).ready(function(){
  $(".hide_an .tp-btn").click(function(){
  	if($(this).hasClass('btn-on')){
  		$(this).removeClass("btn-on").addClass("btn-off");
  	}else{
  		$(this).removeClass("btn-off").addClass("btn-on");	
  	}
  });
 });
