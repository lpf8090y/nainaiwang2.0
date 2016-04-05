//一些共用方法    基于jq
'use strict';
(function ($, w) {

    //$自身方法
    $.extend({
        /*
			flashCookie 
			cookie跨域
		*/
        SwfStore: function (options) {
            options = options || {};
            options.url = options.url || '/Scripts/swfstore.min.js';
            options.namespace = options.namespace || 'ggang_t';
            options.swf_url = options.swf_url || '/Scripts/storage.swf';
            options.debug = options.debug || false;
            options.timeout = options.timeout || 10;

            $.ajax({
                url: options.url,
                dataType: "script",
                cache: true
            }).done(function () {
                //加载完成之后
                var _mySwfStore = new SwfStore({
                    namespace: options.namespace,
                    swf_url: options.swf_url,
                    debug: options.debug,
                    timeout: options.timeout,
                    onready: function () {
                        options.readyFn && options.readyFn(_mySwfStore);
                    },
                    onerror: function () {
                        options.errorFn && options.errorFn();
                    }
                });
            });
            return this;
        },
        /*
			json   url    互转
		*/
        json2url: function (json) {
            var arr = [];
            for (var name in json) {
                arr.push(name + '=' + encodeURIComponent(json[name]))
            }
            return arr.join('&');
        },
        url2json: function (url) {
            var arr = url.split('&');
            var json = {};
            $.each(arr, function (i, e) {
                json[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]) || '';
            });
            return json;
        },
        /*
			img转base64     
		*/
        imgToBase64: function (options) {
            options = options || {};
            options.url = options.url || '';
            options.cb = options.cb || null;
            options.out = options.out || 'image/png';
            if (options.url && options.cb) {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var img = new Image;
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx.drawImage(img, 0, 0);
                    var dataURL = canvas.toDataURL(options.out);
                    options.cb.call(this, dataURL);
                    canvas = null;
                };
                img.src = options.url;
            }
        }
,
        ggAlert: function (n) {
            function r(n) {
                n.stopPropagation(),
                i.remove(),
                t.remove()
            }
            var t = $('<div style="position:fixed; background:#000; filter:alpha(40); opacity:0.4;top:0; bottom:0; left:0; right:0; z-index:10001;"><\/div>').appendTo("body")
              , i = $('<div style="position:fixed; width:300px; height:150px; left:50%; top:50%; margin:-80px 0 0 -155px; background:#fff; z-index:10002; border:5px solid #f2f2f2; text-align:center;"><p style="color:#d90038; padding-top:10px; height:36px; margin:15px 0; overfolw:hidden;font:bold 18px/36px \'微软雅黑\'">' + n + '<\/p><span style="color:#fff; background:#d90038; padding:8px 60px; font-size:14px; cursor:pointer;" >确定<\/span><\/div>').appendTo("body");
            i.find("span").click(function (n) {
                r(n)
            }),
            t.click(function (n) {
                r(n)
            })
        }
    });

    //$对象方法
    $.fn.extend({

    });

})(jQuery, this)