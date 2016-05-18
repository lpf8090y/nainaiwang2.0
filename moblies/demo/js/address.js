
$(function() {
	//新增加地址设置默认开关
    $(".default .tp-btn").click(function(){
      $(".tp-btn").toggleClass("btn-on");
  	});
  	//设置默认地址控制
  	$(".mr_address .radio").click(function(){
      $(this).find(".radio_click").toggleClass("radio_check");
  	});
  	//控制收货地址列表中是否选中地址
  	$(".name_mobile .nm_a").click(function(){
  	  $(".name_mobile .nm_a").removeClass("colbd1016");
      $(this).addClass("colbd1016");
  	});
 }); 