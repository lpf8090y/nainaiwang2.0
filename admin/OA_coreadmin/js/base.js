$(document).ready(function(){
	$(".header_nav").click(function(){
		$(".header_nav").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".main").click(function(){
		$(".zhu_nav").show();
		$(".top_nav").hide();
		$(".bom_nav").hide();
	});
	$(".top").click(function(){
		$(".zhu_nav").hide();
		$(".top_nav").show();
		$(".bom_nav").hide();
	});
	$(".bom").click(function(){
		$(".zhu_nav").hide();
		$(".top_nav").hide();
		$(".bom_nav").show();
	});
	$(".zhn").click(function(){
		$(".zidingyi").hide();
		$(".zhannei").show();
	});
	$(".zdy").click(function(){
		$(".zidingyi").show();
		$(".zhannei").hide();
	});
})