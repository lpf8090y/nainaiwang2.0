// ChisWill Start
function user_open_window()
{
    $("#window_page").show();
    $("#window_layer").show();
}

function user_close_window()
{
    $("#window_page").hide();
    $("#window_layer").hide();
}

$(document).ready(function(){
    // 搜索栏右边的任务跳转链接
    $(".missionList_href").click(function(){
        $.get($.createUrl('site','recordUrl'),{url:$(this).attr('href')},function(){
            location.href = $.createUrl('public','login');
        },'json');
        return false;
    })

    var flag = $("#is_first_mission").val();
    if(flag) {
        user_open_window();
    }
    $("#window_close_btn").click(function(event) {
        user_close_window();
    });

    var share_span = $(".jiathis_txt");
      share_span.each(function(){
          $(this).attr('onclick','shareEvent()');
      })
	
  //还盘
  $("body",document).on("click",'.subcounteroff',function(e){
    e.stopPropagation();
    var id = $(this).attr('tradeid');
    var isguest = $(this).attr('isguest');
    if (isguest) {
        if(window.confirm("请先登录！")){
          $.get($.createUrl('site', 'recordUrl'), {url: window.location.href}, function () {
              location.href = $.createUrl('public', 'login');
          }, 'json');
          return true;
        }
        else{
          return false;
        }
    }
    $(".popupBox").show();
    $("#shade").show();
    $("#trading_id").text(id);

    return false;
  });
  

    $("body", document).on("click", '.speed_off', function (e) {
        e.stopPropagation();
        var id = $(this).attr('tradeid');
        var isguest = $(this).attr('isguest');
        if (isguest) {
            if (window.confirm("请先登录！")) {
                $.get($.createUrl('site', 'recordUrl'), {url: window.location.href}, function () {
                    location.href = $.createUrl('public', 'login');
                }, 'json');
                return true;
            }
            else {
                return false;
            }
        }
        $.post($.createUrl('trade', 'ajaxUserInfo'), {"id": id}, function (msg) {
            if (msg.status) {
                //alert(msg.infotype);
                $('#adminUserName').text(msg.info.name);

                $('#adminUserPhone').text(msg.info.mobile_phone);
                //site.close();
            } else {
                alert(msg.info);
                //site.close();
            }
            return false;
        }, 'json');
        $(".popupBox_speed").show();
        $("#shade_speed").show();
        $("#trading_id").text(id);
        return false;
    });
});
// ChisWill End
var site = {
    placeholder:function(input)
    {
        var text = input.getAttribute('placeholder'),
        defaultValue = input.defaultValue;
        if(defaultValue==''){
          input.value=text
        }

        origin = input.style.color;
        input.style.color = '#aaa';
        input.onfocus=function(){
            input.style.color = origin;
            if(input.value===text)
            {
              this.value='';
            }
        };
        input.onblur = function(){
            if(input.value === ''){
            input.style.color = '#aaa';
            this.value=text;
        }
        }
    },
    compatible:function()
    {
        var doc=document,
        inputs=doc.getElementsByTagName('textarea'),

        supportPlaceholder='placeholder'in doc.createElement('textarea');



        if(!supportPlaceholder){
            for(var i=0,len=inputs.length;i<len;i++){
              var input=inputs[i],
              text=input.getAttribute('placeholder');
              if(text){
                 this.placeholder(input);
              }
            }
        }
    },
    close:function()
    {

        $('#shade').hide();
        $('.popupBox').hide();
        $("#tips").html('');
        $("#counterOffer_content").val('');

        $('#shade_speed').hide();
        $('.popupBox_speed').hide();
        $("#tips").html('');
        $("#counterOffer_content").val('');
        return false;
    },
   counterOffer_submit:function(id)
   {
        var content = $.trim($("#counterOffer_content").val());
       if(id.type) {
           id = $("#trading_id").text();
       }else {
           if (!id) {
               id = $("#trading_id").text();
           }
       }
        if(!content) {
          $("#tips").text($("#tips").attr('info'));
        } else {
          $.post($.createUrl('site','counterOffer'),{"id":id,"content":content},function(msg){
            if(msg.status) {
              alert(msg.info);
              site.close();
              $(".transaction_status[tradeid='"+id+"']").text("正在洽谈");
            } else {
              if(msg.info=="请先登录!"){
                if(window.confirm(msg.info)){
                  $.get($.createUrl('site', 'recordUrl'), {url: window.location.href}, function () {
                      window.location.href = $.createUrl('public', 'login');
                  }, 'json');
                }
                else{
                  site.close();
                }
              }else{
                alert(msg.info);
              }
            }
            return false;
          },'json');
        }
        return false;
    },
    speedBuyOffer_submit: function (id) {
        var content = $.trim($("#counterOffer_content").val());
        if (id.type) {
            id = $("#trading_id").text();
        } else {
            if (!id) {
                id = $("#trading_id").text();
            }
        }
        if (!content) {
            $("#tips").text($("#tips").attr('info'));
        } else {
            $.post($.createUrl('trade', 'ajaxSpeedBuyOffer'), {"id": id, "content": content}, function (msg) {
                //return false;
                if (msg.status) {
                    alert(msg.info);
                    site.close();
                    $(".transaction_status[tradeid='"+id+"']").text("正在洽谈");
                } else {
                    alert(msg.info);
                    site.close();
                }
                return false;
            }, 'json');
        }
        return false;
    }
};
$(function(){
	var h = $(window).height();
site.compatible();

//$('.popupBox').css({top:h / 4.5 + 'px',left:$(window).width() / 2.8 + 'px'});
$('#shade,#shade_speed').css('height',$(document).height());

$('.popupBox,.popupBox_speed').find('a').click(site.close);
$('#cancel').click(site.close);
$('#cancel_speed').click(site.close);
$('#true').click(site.counterOffer_submit);
$("#talkabout").on('click','.removeTag',function(){
  if(confirm('确认删除点评?')) {
    var obj = $(this);
    $.post($.createUrl('site','removeTag'),{'id':$(this).attr('tag_id')},function(msg){
      if (msg.status) {
        //alert(msg.info);
        obj.parent().hide();
      } else {
        alert(msg.info);
      }
      return false;
    },'json');
  }
});

	$(".weixin_area").hover(function(){
    var $this = $(this);
    var left = $this.offset().left;
    var top = $this.offset().top;  
    $("#index_weixin").css('top',top-250);
    $("#index_weixin").css('left',left-70);
    $("#index_weixin").show();
    },function(){
        $("#index_weixin").hide();
	    })
	  
	  
$(".helpme").click(function(){
	if ($(this).attr("isguest") == 1) {
		window.location = "/public/login";	
		return false;
	}
    var content = $.trim($("#srk").val());
    if(!content){
    alert('需求内容不能为空!');
    return false;
    }
})

  
  	 
});


  function follow(id){

      $.post($.createUrl('user','follow'),{id:id},function(msg){
        if(msg.status) {
                  //alert(msg.info);
                  var follower_num = $("#follower_num").val();
                  follower_num++;
                  $("#follower_span").html('(粉丝数：' + follower_num + ')');
                  $("#follow_btn").attr('class','att_btn_no');
                  $("#follow_btn").html('<a href="javascript:void(0);">已关注</a>');
                  site.close();
                } else {
                  alert(msg.info);
                  site.close();
                }
        return false;
      },'json');
      
      return false;
  }

    function like(id){

      $.post($.createUrl('user','like'),{id:id},function(msg){
        if(msg.status) {
                  //alert(msg.info);
                  var num = $("#topNum").html();
                  num++;
                  $("#topNum").html(num);
                  site.close();
                } else {
                  alert(msg.info);
                  site.close();
                }
        return false;
      },'json');
      
      return false;
  }

  function addTag(id){
    if(isGuest){
      if(window.confirm("请先登录！")){
         window.location.href = $.createUrl("public","login");
         return true;
      }
      else{
        return false;
      }
    }
    var name = $('#inputTag').val();
    $.post($.createUrl('user','addTag'),{name:name,mid:id},function(msg){
        if(msg.status) {
          alert(msg.info);
          $("#talkabout").append('<span><em class="removeTag" tag_id="'+msg.extra.id+'">x</em>'+name+'</span>');
          $("#inputTag").val('');
          site.close();
        } else {
          // console.log(msg.info);
          alert(parse_info(msg.info));
          site.close();
        }
        return false;
    },'json');
  }

  function shareEvent(){
    //alert(1);
    $.post($.createUrl('site','shareEvent'));
  }
