$(function(){
    //确认订单页面地址有无的切换
    $(".con_order .no_adderss").click(function(){

        $(".show_adderss").css({'display':'block'});
        $(".no_adderss").css({'display':'none'}); 
    });
    $(".con_order .show_adderss").click(function(){
        $(".show_adderss").css({'display':'none'});
        $(".no_adderss").css({'display':'block'}); 
    });
      //确认订单页面地址有无的切换end
});