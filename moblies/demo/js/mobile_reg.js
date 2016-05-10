$(function(){
    //个人注册和企业注册的切换
    $(".reg_top .reg_title").click(function(){
        $(".reg_top .reg_title").removeClass("cur");
       $(this).addClass("cur");
    });
    $(".reg_top .reg_left").click(function(){
        $(".personage").css({'display':'block'});
        $(".company").css({'display':'none'}); 
    });
    $(".reg_top .reg_right").click(function(){
        $(".personage").css({'display':'none'});
        $(".company").css({'display':'block'}); 
    });
      //个人注册和企业注册的切换end

      /*注册是否同意选择显示*/
      $(".checkbox").click(function(){
        $(".checkbox").toggleClass("check_background");
    });
       /*注册是否同意选择显示end*/

   $(".cont_ul li .li_a").click(function(){
        $(this).toggleClass("cur_a");
        $(this).find(".cur_hide").toggleClass("cur_i");
    });
});
    