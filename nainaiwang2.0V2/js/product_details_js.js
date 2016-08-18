
$(function(){
	var  list=$("#scroll_pic_nav li");		
	var shu_total = $(".add_numb span").append(Math.max(list.length)-1);	
	});


//购置数量 
$(document).ready(function(){
//获得文本框对象
   var t = $("#text_box");
//初始化数量为1,并失效减
$('#min').attr('disabled',true);
    //数量增加操作
    $("#add").click(function(){    
        t.val(parseInt(t.val())+1)
        if (parseInt(t.val())!=1){
            $('#min').attr('disabled',false);
        }
      
    }) 
    //数量减少操作
    $("#min").click(function(){
        t.val(parseInt(t.val())-1);
        if (parseInt(t.val())==1){
            $('#min').attr('disabled',true);
        }
      
    })
   
});

window.onload=function(){  
      var keyWord = document.getElementsByName('keyword')[0];   //搜索name为keyWord的DOM对象
    keyWord.onfocus = function() {
        keyWord.value = '';
    };
    keyWord.onblur = function() {
        keyWord.value = '搜索您感兴趣的资源';
    };

};