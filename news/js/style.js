$(function(){
	//咨讯类型切换
	$(".content_title_ul li .title_a").click(function(){
		$(".content_title_ul li .title_a").removeClass("on");
		$(this).addClass('on');
	})
	//分页切换样式
	$(".page .page_num").click(function(){
		$(".page .page_num").removeClass("on");
		$(this).addClass('on');
	})
})