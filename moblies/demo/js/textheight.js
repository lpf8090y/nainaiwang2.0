//帮忙找货助手中多行文本框自适应高度
$(window).load(function() {
	var text = document.getElementById("textarea"),
  	tip = '想写点什么..';
  
	autoTextarea(text);// 调用

	text.value = tip;
	text.style.color="#ababab";
	text.onfocus = function () {
	  if (text.value === tip) {
	  	text.value = '';
	  	text.style.color="#000";
	  }
	};
	text.onblur = function () {
	  if (text.value === '') {
	  	text.value = tip;
	  	text.style.color="#ababab";
	  }
	 
	};

});