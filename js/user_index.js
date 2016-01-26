$(function(){
	$(".not-go").click(function(){
		$(".user_zbrz").css("display","block");
		$(".check-approve").css("display","none");
		
	})
	/*资金明细处，点击下来按钮选择操作*/
	$(".dian").click(function(){
		$(".cz_show").toggle();
	})
})