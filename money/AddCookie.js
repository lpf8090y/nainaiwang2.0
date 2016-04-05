

(function ($) {

    $.SwfStore({
        readyFn: function (obj) {
            $.flashCookie = obj;
            var cookie = obj.get('token');

            //if (!cookie) {
            //    document.cookie = "token=" + cookie;
            //}

        },
        errorFn: function () {
            //
        }
    });

})(jQuery)


function setCookie(name, value, time) {
    if (time) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + time);
        document.cookie = name + '=' + value + ';domain=.ggang.cn;expires=' + oDate.toUTCString()+';path=/';
    } else {
        document.cookie = name + '=' + value;
    }
};

function getCookie(name) {
    var str = document.cookie;
    var arr = str.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
};

function removeCookie(name) {
    setCookie(name, '', -1);
};
