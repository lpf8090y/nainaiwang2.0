//搜索栏

$(function(){
    $(".bodys p").not(":first").hide();
    $(".searchbox ul li").mouseover(function(){
        var index = $(this).index();
        if(index==0){
            $(this).find("a").addClass("style1");
            $("li").eq(1).find("a").removeClass("style2");
        }
        if(index==1){
            $(this).find("a").addClass("style2");
            $("li").eq(0).find("a").removeClass("style1");
        }
        var index=$(this).index();
        $(".bodys p").eq(index).show().siblings().hide();
    });
});

//楼层电梯 

$(function () {
    $(window).scroll(function () {
        var scrollTop = $(document).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var contentItems = $("#mainContent").find(".i_market_left");
        var currentItem = "";

        if (scrollTop+windowHeight==documentHeight) {
            currentItem= "#" + contentItems.last().attr("id");
        }else{
            contentItems.each(function () {
                var contentItem = $(this);
                var offsetTop = contentItem.offset().top;
                if (scrollTop > offsetTop - 100) {//此处的100视具体情况自行设定，因为如果不减去一个数值，在刚好滚动到一个div的边缘时，菜单的选中状态会出错，比如，页面刚好滚动到第一个div的底部的时候，页面已经显示出第二个div，而菜单中还是第一个选项处于选中状态
                    currentItem = "#" + contentItem.attr("id");
                }
            });
        }
        if (currentItem != $("#floornav").find(".cur").attr("data")) {
            $("#floornav").find(".cur").removeClass("cur");
            $("#floornav").find("[data=" + currentItem + "]").addClass("cur");
        };

    });
});


window.onscroll = function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > 400) {
        $("#floornav").fadeIn(300);
    }
    else {
        $("#floornav").fadeOut(300);
    }
}
