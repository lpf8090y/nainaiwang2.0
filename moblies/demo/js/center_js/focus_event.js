 $(function(){
   $(".keyword").focus(function(){ 
     var txt_value = $(this).val();
     if(txt_value==this.defaultValue){
        $(this).val("");
    } });
   $(".keyword").blur(function(){
     var txt_value = $(this).val();
     if(txt_value==""){
        $(this).val(this.defaultValue);
     } });
   
 });
