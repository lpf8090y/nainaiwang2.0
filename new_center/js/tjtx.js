$(document).ready(function(){
    $(".txtj .tjtx_imgs").click(function() {
      $(".txtj .tjtx_imgs").removeClass("hover_img");
      $(this).addClass("hover_img");
      
      if($(this).hasClass('hover_img')){
      	var srcImg =$(this).find('img').attr('src');
      	
      	$('.cropped .ylimg1').html('<img src="'+srcImg+'" align="absmiddle" style="width:100%;">');
		$('.cropped .ylimg2').html('<img src="'+srcImg+'" align="absmiddle" style="width:100%;">');
/*		$('.cropped .ylimg1').append('<img src="'+srcImg+'" align="absmiddle" style="width:120px;">');
		$('.cropped .ylimg2').append('<img src="'+srcImg+'" align="absmiddle" style="width:80px;">');*/
      }
      
    });

        
});