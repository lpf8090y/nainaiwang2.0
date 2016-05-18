
$(function() {
	//新增加地址设置默认开关
    $(".default .tp-btn").click(function(){
      $(".tp-btn").toggleClass("btn-on");
  	});
  	//1 设置默认地址控制 2 控制是否开发票的选择（invoice.html）
  	$(".radio").click(function(){
      $(".radio").removeClass("der_col");
      $(".radio .radio_click").removeClass("radio_check");
      $(this).addClass("der_col");
      $(this).find(".radio_click").addClass("radio_check");
  	});
  	//控制收货地址列表中是否选中地址
  	$(".name_mobile .nm_a").click(function(){
  	  $(".name_mobile .nm_a").removeClass("colbd1016");
      $(this).addClass("colbd1016");
  	});
    //开发票（invoice.html）中地址有无的切换
    $(".kfp_con .no_adderss").click(function(){

        $(".show_adderss").css({'display':'block'});
        $(".no_adderss").css({'display':'none'}); 
    });
    $(".kfp_con .show_adderss").click(function(){
        $(".show_adderss").css({'display':'none'});
        $(".no_adderss").css({'display':'block'}); 
    });
    /*开发票（invoice.html）中地址有无的切换end*/
    /*发票内容显示和隐藏*/
    $(".fp_tit .show_radio").click(function(){
        $(".kfp_con").css({'display':'block'}); 
    });
    $(".fp_tit .no_radio").click(function(){
        $(".kfp_con").css({'display':'none'});
    });
    /*发票内容显示和隐藏 end*/
 }); 