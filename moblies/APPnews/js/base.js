$(document).ready(function(){
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 5,
        paginationClickable: true,
        
    });
    $(".swiper-wrapper .swiper-slide a").click(function(){
        $(".swiper-wrapper .swiper-slide a").removeClass("on");
        $(this).addClass("on")
    })
})