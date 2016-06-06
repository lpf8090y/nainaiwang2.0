$(function() {
	$(".buyer-top .state-ul li .zt-a").click(function(){
		$(".buyer-top .state-ul li .zt-a").removeClass("cur");
		$(this).addClass("cur");

	});
	//1 申诉原因选择（contract_appeal.html）
  	$(".radio").click(function(){
      $(".radio").removeClass("der_col");
      $(".radio .radio_click").removeClass("radio_check");
      $(this).addClass("der_col");
      $(this).find(".radio_click").addClass("radio_check");
  	});
 /*协商一致弹出层和订单取消弹出层*/
        //open popup
    $('.cd-popup-trigger').on('click', function(event){
       $("#bg").css("display","block")
        event.preventDefault();
        $('.cd-popup_d').addClass('is-visible');
    });
    
    //close popup
    $('.cd-popup_d').on('click', function(event){
        if( $(event.target).is('.an1') || $(event.target).is('.cd-popup_d') ) {
           $("#bg").css("display","none")
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
           $("#bg").css("display","none")
            $('.cd-popup_d').removeClass('is-visible');
        }
    });
    /*协商一致弹出层 end*/
});