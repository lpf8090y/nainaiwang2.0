
$(function(){

        //解决IE8之类不支持getElementsByClassName
        if (!document.getElementsByClassName) {
            document.getElementsByClassName = function (className, element) {
                var children = (element || document).getElementsByTagName('*');
                var elements = new Array();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    var classNames = child.className.split(' ');
                    for (var j = 0; j < classNames.length; j++) {
                        if (classNames[j] == className) {
                            elements.push(child);
                            break;
                        }
                    }
                }
                return elements;
            };
        };


// 顶部滑动效果
            var oTop1 = $(document).scrollTop(); 

            $(window).scroll(function(){
                var oTop2 = $(document).scrollTop(); 

                if(oTop2 > oTop1){
                    $(".head_nav,.header_search").css("display","none");
                    $(".head_nav.border_top").css("display","block");
                }else {
                      $(".head_nav,.header_search").css("display","block");
                }
                oTop1 = $(document).scrollTop();
              });
        });

// 切换版式
window.onload=function(){       
   onload2();    
   onload3();    
} 

 function onload2(){ 
   var oBtn = document.getElementById('qiehuan');
        var oDiv1 = document.getElementById('pro_lists');
        var oDiv2 = document.getElementById('pro_lists_again');
        oBtn.onclick = function(){
            if(oDiv1.style.display == 'block'){
                oDiv1.style.display = 'none';
                oDiv2.style.display = 'block';
            }else{
                oDiv2.style.display = 'none';
                oDiv1.style.display = 'block';
            } 
        };

// 搜索框点击为空
    var keyWord = document.getElementsByName('keyword')[0];   //搜索name为keyWord的DOM对象
    keyWord.onfocus = function() {
        keyWord.value = '';
    };
    keyWord.onblur = function() {
        keyWord.value = '输入价格';
    };

};


$(function(){
    var oBtn = document.getElementById('qiehuan');
   var oSpan = oBtn.getElementsByTagName('span')[0];   
  oSpan.onclick = function(){
          $(this).toggleClass("img_tab_b");
        };
});
 



 

 