$(document).ready(function(){
  //左侧导航栏
    $(".nav-first").click(function() {
       $(this).parents(".btn1").find(".zj_zh").toggle();
       if(!$(this).parents(".btn1").find(".zj_zh").is(":hidden")){
          $(this).find("i").addClass("icon-caret-down");
          $(this).find("i").removeClass("icon-caret-right");
       }else{
           $(this).find("i").addClass("icon-caret-right");
           $(this).find("i").removeClass("icon-caret-down");
       }
    
    });
      //end左侧导航栏

//商品分类展开
    $(".class_jy").delegate(".info-show", "click", function () {
      $(this).parents(".class_jy").find(".infoslider").show(); 
      $(this).removeClass("info-show").addClass("info-hide").html("收起");
    });    
    $(".class_jy").delegate(".info-hide", "click", function () {
      $(this).parents(".class_jy").find(".infoslider").hide();
      $(this).removeClass("info-hide").addClass("info-show").html("展开")
    });    
    // end商品分类展开                
});

/*数量加减控件*/
$(document).ready(function(){
$("#add").click(function(){
  var n=$("#num").val();
  var num=parseInt(n)+1;
 if(num==0){alert("cc");}
  $("#num").val(num);
});
$("#jian").click(function(){
  var n=$("#num").val();
  var num=parseInt(n)-1;
 if(num==0){alert("不能为0!"); return}
  $("#num").val(num);
  });
});
//企业认证切换
$(document).ready(function(){
  $(".rz_ul .rz").click(function(){
    $(".rz_ul .rz_li").removeClass("cur");
    $(".re_xx").show();
    $(".yz_img").hide();
    $(".sh_jg").hide();
    $(this).parents(".rz_li").addClass("cur");

  });
  $(".rz_ul .yz").click(function(){
    $(".rz_ul .rz_li").removeClass("cur");
    $(".yz_img").show();
    $(".re_xx").hide();
    $(".sh_jg").hide();
    $(this).parents(".rz_li").addClass("cur");

  });
  $(".rz_ul .shjg").click(function(){
    $(".rz_ul .rz_li").removeClass("cur");
    $(".sh_jg").show();
    $(".yz_img").hide();
    $(".re_xx").hide();
    $(this).parents(".rz_li").addClass("cur");

  });
});
//end企业认证切换

