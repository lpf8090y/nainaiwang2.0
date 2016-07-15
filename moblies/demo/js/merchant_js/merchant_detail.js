$(function() {
 /*商户详情弹出页*/
        //open popup
    $('.march_xq').on('click', function(event){
       $("#bg").css("display","block")
        event.preventDefault();
        $('.cd-popup_d').addClass('is-visible');
    });
    
    //close popup
    $('.cd-popup_d').on('click', function(event){
        if( $(event.target).is('.qx_a') || $(event.target).is('.cd-popup_d') ) {
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
    /*商户详情弹出页 end*/
});
