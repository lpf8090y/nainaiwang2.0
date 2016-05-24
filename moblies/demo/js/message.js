/*滑动删除*/
    window.addEventListener('load',function(){
        var initX;//触摸位置
        var moveX;//滑动时的位置
        var X = 0;//移动距离
        var objX = 0;//目标对象位置
        window.addEventListener('touchstart',function(event){
            event.preventDefault();
            var obj = event.target.parentNode;
            if(obj.className == "list-li"){
                initX = event.targetTouches[0].pageX;
                objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
            }
            if( objX == 0){
                window.addEventListener('touchmove',function(event) {
                    event.preventDefault();
                    var obj = event.target.parentNode;
                    if (obj.className == "list-li") {
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                        }
                        else if (X < 0) {
                            var l = Math.abs(X);
                            obj.style.WebkitTransform = "translateX(" + -l + "px)";
                            if(l>60){
                                l=60;
                                obj.style.WebkitTransform = "translateX(" + -l + "px)";
                            }
                        }
                    }
                });
            }
            else if(objX<0){
                window.addEventListener('touchmove',function(event) {
                    event.preventDefault();
                    var obj = event.target.parentNode;
                    if (obj.className == "list-li") {
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            var r = -60 + Math.abs(X);
                            obj.style.WebkitTransform = "translateX(" + r + "px)";
                            if(r>0){
                                r=0;
                                obj.style.WebkitTransform = "translateX(" + r + "px)";
                            }
                        }
                        else {     //向左滑动
                            obj.style.WebkitTransform = "translateX(" + -60 + "px)";
                        }
                    }
                });
            }

        })
        window.addEventListener('touchend',function(event){
            event.preventDefault();
            var obj = event.target.parentNode;
            if(obj.className == "list-li"){
                objX =(obj.style.WebkitTransform.replace(/translateX\(/g,"").replace(/px\)/g,""))*1;
                if(objX>-40){
                    obj.style.WebkitTransform = "translateX(" + 0 + "px)";
                }else{
                    obj.style.WebkitTransform = "translateX(" + -60 + "px)";
                }
            }
         })

    })
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