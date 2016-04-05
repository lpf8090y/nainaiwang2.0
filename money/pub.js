

var JPlaceHolder = {
    //检测
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init: function () {
        if (!this._check()) {
            this.fix();
        }
    },
    //修复
    fix: function () {
        jQuery(':input[placeholder]').each(function (index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');

            //top: pos.top,
            var holder = $('<i></i>').text(txt).css({ position: 'absolute', left: pos.left, height: h, "line-height": +h + 'px', paddingLeft: paddingleft, color: '#aaa' }).appendTo(self.parent());
            self.focusin(function (e) {
                holder.hide();
            }).focusout(function (e) {
                if (!self.val()) {
                    holder.show();
                }
            });
            holder.click(function (e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function () {
    JPlaceHolder.init();
});




//大图轮播
$.fn.extend({
    Runbanner: function () {
        var oLi = this.find('li');

        oLi.css({"opacity":"1","height":oLi.eq('0').find('img').height()});
        oLi.eq(0).css("zIndex", "10");
        var oIcon = this.parent().find('.icon');
        var timer;
        var index = 0;
        var left = -this.find('img').width();
        //定时器
        timer = setInterval(run, 6000);


        oIcon.css({ "left": "50%", "marginLeft": -oIcon.width() / 2 });
        oLi.css({ position: "absolute", "opacity": "0" });
        oLi.eq(0).css({"opacity":"1"})
        //轮播到最后从0重新播放
        function run() {
            index++;
            if (index == oLi.length) {
                index = 0;
            }
            //oLi.eq(index).fadeIn(500).siblings().fadeOut();
            // $('.banner').animate({left:left*index});
            if (oLi.length!=1){
                act();
                oIcon.find('li').eq(index).addClass("active").siblings().removeClass("active");
            }
        }

        oIcon.find('li').each(function (i, e) {
            $(this).click(function () {
                if ($(this).hasClass('active')) { }
                else{
                    clearInterval(timer);
                    $(this).addClass("active").siblings().removeClass("active");
                    index = i;
                    act();
                }
            })



            $(this).hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(run, 5000);
            })
        })

        //判断是带有ACTIVE的Class,是否下一个轮播图，设置样式
        function act() {
            var active = oLi.filter(".active").length ? oLi.filter(".active") : oLi.first();
            var next = active.next().length ? active.next() : oLi.first();
            active.css({ "z-index": 9 });
            oLi.eq(index).css({ opacity: 0.0, "z-index": 10 }).addClass('active').animate({ opacity: 1.0 }, oLi.eq(index - 1).animate, function () {
                active.removeClass('active').css({ "z-index": 8 }).css({ opacity: 0.0, "z-index": 8 });
            });
        }
        return this;


    }
})


