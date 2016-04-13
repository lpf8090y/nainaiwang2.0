 $(document).ready(function(){
 //获取Select选择的Text

    $("#btn").click(function(){

    var item=$("#test").find("option:selected").text();
     $("#app").append("<ul><li class='qxm'><input type='text' class='text' value="+item+"></li> <li class='cz'><a  class='del'><img  src='css/img/icon_x.jpg'/></a></li></ul>");

       $(".del").click(function(){
     	alert("d")
            $(this).parent("li").parent("ul").remove();
        });

    });
});