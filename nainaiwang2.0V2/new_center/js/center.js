$(document).ready(function(){
  //个人中心左侧导航栏
    $(".ul1 .ul1_titles").click(function() {
       $(this).find(".ul2").toggle();
       if(!$(this).find(".ul2").is(":hidden")){
          $(this).find("i").addClass("icon-caret-up");
          $(this).find("i").removeClass("icon-caret-down");
       }else{
           $(this).find("i").addClass("icon-caret-down");
           $(this).find("i").removeClass("icon-caret-up");
       }
    
    });
     //鼠标的移入移出  
        $(".ck_span").mouseover(function (){  
            $(".cksl_bk").show();  
        }).mouseout(function (){  
            $(".cksl_bk").hide();  
        }); 
        //鼠标的移入移出  
        $(".ck_span2").mouseover(function (){  
            $(".cksl_bk2").show();  
        }).mouseout(function (){  
            $(".cksl_bk2").hide();  
        });  
        //鼠标的移入移出  
        $(".ck_span3").mouseover(function (){  
            $(".cksl_bk3").show();  
        }).mouseout(function (){  
            $(".cksl_bk3").hide();  
        });  
});