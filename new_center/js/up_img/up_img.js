$(window).load(function() {

	//$('#btnCrop').click();$("#idName").css("cssText","background-color:red!important");

	

	//$(".imageBox").css("cssText","background-position:88px 88px!important");$(".imageBox").css("cssText","background-size:222px 222px!important");

	var options =

	{

		thumbBox: '.thumbBox',

		spinner: '.spinner',

		imgSrc: ''

	}

	var cropper = $('.imageBox').cropbox(options);

	var img="";

	$('#upload-file').on('change', function(){

		var reader = new FileReader();

		reader.onload = function(e) {

			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);

			
			$(".action").css("display","none")
			$(".thumbBox").css({'box-shadow':'0 0 0 1000px rgba(0, 0, 0, 0.5)',
   ' background':' none repeat scroll 0% 0% transparent',})

		}

		reader.readAsDataURL(this.files[0]);

		this.files = [];

		//getImg();

	})

	/*$('#btnCrop').on('click', function(){

		alert("图片上传喽");

	})*/

	function getImg(){

		img = cropper.getDataURL();

		$('.cropped .ylimg1').html('');
		$('.cropped .ylimg2').html('');

		$('.cropped .ylimg1').append('<img src="'+img+'" align="absmiddle" style="width:120px;">');

		$('.cropped .ylimg2').append('<img src="'+img+'" align="absmiddle" style="width:80px;">');

		}

		
	$(".imageBox").on("hover",function(){

 		getImg();
 		$(".imageBox").on("mouseup",function(){

 		getImg();

  		});

  	});
	

		

		

	$('#btnZoomIn').on('click', function(){

		cropper.zoomIn();

	})

	$('#btnZoomOut').on('click', function(){

		cropper.zoomOut();

	})

});
