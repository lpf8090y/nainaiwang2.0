$(function() {
/*认证弹出层*/
        //open popup
    $('.cd-popup-rz').on('click', function(event){
       $("#bg").css("display","block")
        event.preventDefault();
        $('.cd-popup_tender').addClass('is-visible');
    });
    
    //close popup
    $('.cd-popup_tender').on('click', function(event){
        if( $(event.target).is('.an1') || $(event.target).is('.cd-popup_tender') ) {
           $("#bg").css("display","none")
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
           $("#bg").css("display","none")
            $('.cd-popup_tender').removeClass('is-visible');
        }
    });
    /*认证弹出层 end*/
});

