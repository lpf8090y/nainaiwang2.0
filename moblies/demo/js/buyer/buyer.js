$(function() {
	$(".buyer-top .state-ul li .zt-a").click(function(){
		$(".buyer-top .state-ul li .zt-a").removeClass("cur");
		$(this).addClass("cur");

	});
	//1 申诉原因选择（contract_appeal.html）
  	$(".radio").click(function(){
      $(".radio").removeClass("der_col");
      $(".radio .radio_click").removeClass("radio_check");
      $(this).addClass("der_col");
      $(this).find(".radio_click").addClass("radio_check");
  	});
 /*协商一致弹出层和订单取消弹出层*/
        //open popup
    $('.cd-popup-trigger').on('click', function(event){
       $("#bg").css("display","block")
        event.preventDefault();
        $('.cd-popup_d').addClass('is-visible');
    });
    
    //close popup
    $('.cd-popup_d').on('click', function(event){
        if( $(event.target).is('.an1') || $(event.target).is('.cd-popup_d') ) {
           $("#bg").css("display","none")
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
           $("#bg").css("display","none")
            $('.cd-popup_d').removeClass('is-visible');
        }
    });
    /*协商一致弹出层 end*/
});


 //图片上传预览    IE是用了滤镜。
        function previewImage(file)
        {
          var MAXWIDTH  = 260; 
          var MAXHEIGHT = 180;
          var div = document.getElementById('preview');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=imghead>';
              var img = document.getElementById('imghead');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
                img.style.marginTop = rect.top+'px';
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
        }