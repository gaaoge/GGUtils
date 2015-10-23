/**
 * Created by GG on 15/7/29.
 *
 *  页面事先添加meta标签 <meta name="viewport" content="width=device-width, initial-scale=1" />
 *  参数：type(适配类型, 可选值为'fixed'或'rem')；width(设计稿宽度，整数)
 *  可以选择以下两种情况适配：
 *  1. 定宽：原理是设定viewport的宽度为固定值(即传递的width值)，并根据屏幕宽度和width值计算viewport缩放比例。
 *     实际开发在css中任何长度尺寸均使用px单位，大小设置为设计稿中原始尺寸值；
 *     字体单位使用em, body下直接子元素字体大小设置为设计稿中尺寸值 / 100；
 *     非直接子元素若其父元素未设置字体大小则与直接子元素相同，否则根据父元素字体大小计算其相对值。
 *  2. REM：原理是根据设备dpr和屏幕宽度来计算viewport宽度，并根据设备dpr计算viewport缩放比例，然后在html标签中设置font-size的属性值。
 *     实际开发在css中任何长度尺寸均使用rem单位，大小设置为设计稿中尺寸值 / 100;
 *     字体单位使用em, body下直接子元素字体大小设置为设计稿中尺寸值 / 100；
 *     非直接子元素若其父元素未设置字体大小则与直接子元素相同，否则根据父元素字体大小计算其相对值。
 *     若需要1px物理像素的边框效果，则border的宽度不需要使用rem，设定为1px即可。
 */

(function () {
    function fixViewport(type, designWidth) {
        var metaEl = document.querySelector('meta[name="viewport"]');
        //由于初始设置了viewport的width=device-width,所以此处docEl.clientWidth即是屏幕的设备宽度
        var clientWidth = document.documentElement.clientWidth;
        var width, scale;

        switch (type) {
            case 'fixed':
                width = designWidth;
                scale = clientWidth / designWidth;
                break;
            case 'rem':
                var dpr = window.devicePixelRatio || 1;
                width = clientWidth * dpr;
                scale = 1 / dpr;
                document.documentElement.style.fontSize = 100 * (clientWidth * dpr / designWidth) + "px";
                break;
        }
        metaEl.setAttribute('content', 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale +
            ',minimum-scale=' + scale);

        //设置body的基准字体大小
        window.addEventListener('DOMContentLoaded', function () {
            document.body.style.fontSize = 50 / scale + 'px';
        });
    }

    fixViewport('rem', 640);
}());