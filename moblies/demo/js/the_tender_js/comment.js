//发表评论多行文本框自适应高度
$(window).load(function() {
    var text = document.getElementById("textareas"),
    tip = '输入你想要发表的内容';
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