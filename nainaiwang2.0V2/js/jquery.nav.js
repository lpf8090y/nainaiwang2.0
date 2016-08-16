; (function ($) {
    $.fn.extend({
        "nav": function (con) {
            var $this = $(this), $nav = $this.find('.switch-tab'), t = (con && con.t) || 3000, a = (con && con.a) || 500, i = 0, autoChange = function () {
                $nav.find('a:eq(' + (i + 1 === 5 ? 0 : i + 1) + ')').addClass('current').siblings().removeClass('current');
                $this.find('.event-item:eq(' + i + ')').css('display', 'none').end().find('.event-item:eq(' + (i + 1 === 5 ? 0 : i + 1) + ')').css({
                    display: 'block',
                    opacity: 0
                }).animate({
                    opacity: 1
                }, a, function () {
                    i = i + 1 === 5 ? 0 : i + 1;
                }).siblings('.event-item').css({
                    display: 'none',
                    opacity: 0
                });
            }, st = setInterval(autoChange, t);
            $this.hover(function () {
                clearInterval(st);
                return false;
            }, function () {
                st = setInterval(autoChange, t);
                return false;
            }).find('.switch-nav>a').bind('click', function () {
                var current = $nav.find('.current').index();
                i = $(this).attr('class') === 'prev' ? current - 2 : current;
                autoChange();
                return false;
            }).end().find('.switch-tab>a').bind('click', function () {
                i = $(this).index() - 1;
                autoChange();
                return false;
            });
            return $this;
        }
    });
}(jQuery));

// 分类目录切换
    $('.all-sort-list > .item').hover(function () {
        var eq = $('.all-sort-list > .item').index(this),               //获取当前滑过是第几个元素
                h = $('.all-sort-list').offset().top,                       //获取当前下拉菜单距离窗口多少像素
                s = $(window).scrollTop(),                                  //获取游览器滚动了多少高度
                i = $(this).offset().top,
                id = $(this).attr('id');                               //当前元素滑过距离窗口多少像素

        try{
            item=parseInt(Aa(this, "item-list clearfix")[0].currentStyle['height']);
        }catch (er){item = ( $(this).children('.item-list').height());            //下拉菜单子类内容容器的高度
       }
                sort = $('.all-sort-list').height();                        //父类分类列表容器的高度

        if (item < sort) {                                             //如果子类的高度小于父类的高度
            if (eq == 0) {
                $(this).children('.item-list').css('top', (i - h));
            } else {
                $(this).children('.item-list').css('top', (i - h) + 1);
            }
        } else {
            if (s > h) {                                              //判断子类的显示位置，如果滚动的高度大于所有分类列表容器的高度
                if (i - s > 0) {                                         //则 继续判断当前滑过容器的位置 是否有一半超出窗口一半在窗口内显示的Bug,
                    $(this).children('.item-list').css('top', (s - h) + 2);
                } else {
                    $(this).children('.item-list').css('top', (s - h) - (-(i - s)) + 2);
                }
            } else {
                $(this).children('.item-list').css('top', 0);
            }
        }


        $(this).addClass('hover');
        $(this).children('.item-list').css('display', 'block');
        $(this).children('.icon-nh' + id).addClass('icon-nh' + id + '-1');
    }, function () {
        $(this).removeClass('hover');
        $(this).children('.item-list').css('display', 'none');
        var id = $(this).attr("id");
        //alert(id);
        $(this).children('.icon-nh' + id).removeClass('icon-nh' + id + '-1');
    });
    function Aa(a, b) {var c = a.getElementsByTagName("*");var d = [];for (var i = 0; i < c.length; i++) {if (c[i].className == b) {d.push(c[i]);}};return d;}
    var item;

  