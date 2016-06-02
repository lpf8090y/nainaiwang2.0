
//是否选中消息
$(function() {
$(".radio").click(function(){
      $(".radio").removeClass("der_col");
      $(".radio .radio_click").removeClass("radio_check");
      $(this).addClass("der_col");
      $(this).find(".radio_click").addClass("radio_check");
    });
});
/*是否选中消息 end*/