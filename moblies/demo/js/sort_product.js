// 筛选
window.onload=function(){        
   onload2();    
   onload3();    
} 

function onload3()
{
	var oTable=document.getElementById('fil_first');
	// var oBtnDefault=oTable.getElementsByTagName('a')[0];
	var oBtnPrice=oTable.getElementsByTagName('a')[1];
	var oBtnArea=oTable.getElementsByTagName('a')[2];
	var i=0;
	oBtnPrice.href="javascript:void(0);";
	oBtnPrice.order='none';
	oBtnPrice.onclick=sortByPrice;
	
	oBtnArea.href="javascript:void(0);";
	oBtnArea.order='none';
	oBtnArea.onclick=sortByArea;
	// oBtnDefault.onclick=function(){
		
	// };
};





function sortByPrice()
{
	var oTable=document.getElementById('fil_first');
	var oBtnPrice=oTable.getElementsByTagName('a')[1];
	var oBtnArea=oTable.getElementsByTagName('a')[2];
	var result=1;
	
	switch(oBtnPrice.order)
	{
		case 'none':
		case 'asc':
			oBtnPrice.className='up_active';
			oBtnPrice.order='desc';
			result=1;
			break;
		case 'desc':
			oBtnPrice.className='down_active';
			oBtnPrice.order='asc';
			result=-1;
			break;
	}
	
	oBtnArea.order='none';
	oBtnArea.className='up_down';
	
	
}

function sortByArea()
{
	var oTable=document.getElementById('fil_first');
	var oBtnPrice=oTable.getElementsByTagName('a')[1];
	var oBtnArea=oTable.getElementsByTagName('a')[2];
	var result=1;
	
	switch(oBtnArea.order)
	{
		case 'none':
		case 'asc':
			oBtnArea.className='up_active';
			oBtnArea.order='desc';
			result=1;
			break;
		case 'desc':
			oBtnArea.className='down_active';
			oBtnArea.order='asc';
			result=-1;
			break;
	}
	
	oBtnPrice.order='none';
	oBtnPrice.className='up_down';
	
}



//筛选二
$(function(){
$(".dropdiv").click(function(e){
$(".chooseItems").slideUp(100);
e.stopPropagation();
var quest = $(this).parent();
var questwidth = parseInt(quest.width())-2;
var questheight = quest.height();
var left = quest.position().left+parseInt(quest.css("margin-left"))+parseInt(quest.css("padding-left"));
var top = parseInt(quest.position().top)+parseInt(questheight)+4;
var attrs = quest.attr("quest");
var selectsd = $('.chooseItems[answer='+attrs+']');
var selectsdHeight = selectsd.height();
if((top+selectsdHeight)>$(window).height()){
top = top - selectsdHeight - questheight-7;
}
if($(selectsd).is(":visible")){
$(selectsd).slideUp(100);
}else{
$(selectsd).css({"left":left+"px","top":top+"px","width":questwidth+"px"}).slideDown(100);
}
});
$(".chooseItem").click(function(e){
e.stopPropagation();
var divhtml = $(this);
var displayMember,valueMember;
displayMember = divhtml.attr("displayMember");
valueMember = divhtml.attr("valueMember");
var attrs =$(this).parent().attr("answer");
var parent = $("#"+attrs).css('color','#bc1018').removeClass("dropdiv_b");
var olddisplayMember,oldvalueMember;
olddisplayMember = parent.attr("displayMember");
oldvalueMember = parent.attr("valueMember");
if(olddisplayMember !=displayMember){
parent.attr("displayMember",displayMember);
parent.attr("valueMember",valueMember);
parent.val(valueMember);
parent.change();
}
$(this).parent().slideUp(100);
});
$(document).click(function(e){
var target = $(e.target);
if(target.closest(".chooseItems").length == 0){
$(".chooseItems");
}
});
$(".dropdiv").click(function(){
   $(this).toggleClass("dropdiv_b");
   $('.mask_layer').toggle()
 });
});


$(function(){
$(".chooseItem").click(function(){
	if($('.mask_layer').style="block"){
       $('.mask_layer').css('display','none');
    }else{
    	$('.mask_layer').css('display','block');
    }
  });
});