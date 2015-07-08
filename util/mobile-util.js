/**
 * MobileWeb 通用功能助手，包含常用的 UA 判断、页面屏幕适配、search 参数转键值对。
 * 该 JS 应在 head 中尽可能早的引入，减少重绘。
 *
 * fixViewport
 *      参数：type(适配类型, 可选值为'fixed'或'rem')；width(设计稿宽度，整数)
 *      页面添加meta标签 <meta name="viewport" content="width=device-width, initial-scale=1">，根据以下两种情况适配：
 *      1. 定宽：设定viewport的宽度为固定值(即传递的width值)，并根据屏幕宽度和width值计算viewport缩放比例。
 *      2. REM: 根据设备dpr和屏幕宽度来计算viewport宽度，并根据设备dpr计算viewport缩放比例，然后在html标签中设置font-size的属性值。
 *         对应 css 开发，任何长度尺寸均使用 rem 单位，大小设置为设计稿中px单位的尺寸值 / 100;
 *         若需要1px物理像素的边框效果，则border的宽度不需要使用rem，设定为1px即可。
 */
window.mobileUtil = (function (win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos;  // 粗略的判断

    return {
        isAndroid: isAndroid,
        isIos: isIos,
        isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ\/\d/gi.test(UA),
        isYixin: /YiXin/gi.test(UA),
        isWeibo: /Weibo/gi.test(UA),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

        tapEvent: isMobile ? 'tap' : 'click',

        /**
         * 页面屏幕适配
         */
        fixViewport: function (type, width) {
            var metaEl = doc.querySelector('meta[name="viewport"]');
            var scale, content;

            switch (type) {
                case 'fixed':
                    var iw = win.innerWidth || width,
                        ow = win.outerWidth || iw,
                        sw = win.screen.width || iw,
                        saw = win.screen.availWidth || iw,
                        w = Math.min(iw, ow, sw, saw);

                    scale = w / width;
                    content = 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale +
                        ',minimum-scale=' + scale + ',user-scalable=no';
                    break;
                case 'rem':
                    var dpr = win.devicePixelRatio || 1;
                    var clientWidth = doc.documentElement.clientWidth;

                    var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
                    var reCalc = function () {
                        doc.documentElement.style.fontSize = 100 * (clientWidth * dpr / width) + "px";
                    };

                    win.addEventListener(resizeEvt, reCalc, false);
                    doc.addEventListener("DOMContentLoaded", reCalc, false);

                    scale = 1 / dpr;
                    content = 'width=' + clientWidth * dpr + ',initial-scale=' + scale + ',maximum-scale=' + scale +
                        ', minimum-scale=' + scale + ',user-scalable=no';
                    break;
            }

            metaEl.setAttribute('content', content);
        },

        /**
         * 转href参数成键值对
         * @param href {string} 指定的href，默认为当前页href
         * @returns {object} 键值对
         */
        getSearch: function (href) {
            href = href || win.location.search;
            var data = {}, reg = new RegExp("([^?=&]+)(=([^&]*))?", "g");
            href && href.replace(reg, function ($0, $1, $2, $3) {
                data[$1] = $3;
            });
            return data;
        }
    };
})(window, document);

// 调用页面屏幕适配方法
mobileUtil.fixViewport('fixed', 640);