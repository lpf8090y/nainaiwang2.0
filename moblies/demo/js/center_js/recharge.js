// 选择充值方式
$(document).ready(function(){
        $(".recharge_right i").click(function(){
        $(this).addClass("zj_on").parent().parent().siblings().find('.zj_on').removeClass("zj_on");
　　});
    });
