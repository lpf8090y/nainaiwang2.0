$(function(){
    //个人注册和企业注册的切换
    $(".con_order .no_adderss").click(function(){

        $(".show_adderss").css({'display':'block'});
        $(".no_adderss").css({'display':'none'}); 
    });
    $(".con_order .show_adderss").click(function(){
        $(".show_adderss").css({'display':'none'});
        $(".no_adderss").css({'display':'block'}); 
    });
      //个人注册和企业注册的切换end
});