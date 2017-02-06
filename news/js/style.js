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
	//行业移入移除效果
	$("ul li.quotation_li").mouseover(function () {
                $(".quotation_ul_bage").show();
    });
    $("ul li.quotation_li").mouseleave(function () {
       $(".quotation_ul_bage").hide();
    });
})