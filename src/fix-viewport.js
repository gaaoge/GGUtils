/**
 * Created by GG on 15/7/29.
 *
 *  页面事先添加meta标签 <meta name="viewport" content="width=device-width, initial-scale=1">
 *  参数：type(适配类型, 可选值为'fixed'或'rem')；width(设计稿宽度，整数)
 *  可以选择以下两种情况适配：
 *  1. 定宽：原理是设定viewport的宽度为固定值(即传递的width值)，并根据屏幕宽度和width值计算viewport缩放比例。
 *     实际开发在css中长度尺寸均使用px单位，大小设置为设计稿中原始尺寸值即可。
 *  2. REM：原理是根据设备dpr和屏幕宽度来计算viewport宽度，并根据设备dpr计算viewport缩放比例，然后在html标签中设置font-size的属性值。
 *     实际开发在css中任何长度尺寸均使用rem单位，大小设置为设计稿中px单位的尺寸值 / 100;
 *     字体单位不要用rem，使用px并根据dpr指定不同的字体大小；
 *     若需要1px物理像素的边框效果，则border的宽度不需要使用rem，设定为1px即可。
 */

(function (win, doc) {
    function fixViewport (type, width) {
        var docEl = doc.documentElement;
        var metaEl = doc.querySelector('meta[name="viewport"]');
        //由于页面初始设置了viewport的width=device-width,所以此处取得的即是屏幕的设备宽度
        var clientWidth = docEl.clientWidth;
        var scale, content;

        switch (type) {
            case 'fixed':
                scale = clientWidth / width;
                content = 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale +
                    ',minimum-scale=' + scale;
                break;
            case 'rem':
                var dpr = win.devicePixelRatio || 1;
                // 设置data-dpr属性，留作的css hack设置元素的font-size用
                docEl.setAttribute('data-dpr', dpr);

                var resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
                var reCalc = function () {
                    docEl.style.fontSize = 100 * (clientWidth * dpr / width) + "px";
                };

                win.addEventListener(resizeEvt, reCalc, false);
                doc.addEventListener("DOMContentLoaded", reCalc, false);

                scale = 1 / dpr;
                content = 'width=' + clientWidth * dpr + ',initial-scale=' + scale + ',maximum-scale=' + scale +
                    ', minimum-scale=' + scale;
                break;
        }

        metaEl.setAttribute('content', content);
    }

    fixViewport('fixed', 640);
}(window, document));