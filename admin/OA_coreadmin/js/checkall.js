$(function(){ //调用全选插件
    $.fn.check({checkall_name:"checkall",checkbox_name:"check"})}),
/*alert("ss")*/

//全选插件
(function($) {
    $.fn.check    = function(options) {
    var defaults  = {
        checkall_name: "checkall_name", //全选框name
        checkbox_name: "checkbox_name" //单选框name
    },
    ops           = $.extend(defaults, options);
    e             = $("input[name='" + ops.checkall_name + "']"), //全选
    f             = $("input[name='" + ops.checkbox_name + "']"), //单选
    g             = f.length; //单选数量
    f.click(function() {
    $("input[name ='" + ops.checkbox_name + "']:checked").length == $("input[name='" + ops.checkbox_name + "']").length ? e.attr("checked", !0) : e.attr("checked", !1);
    }), e.click(function() {
    for (i = 0; g > i; i++) f[i].checked = this.checked;
    });
    };
})(jQuery);