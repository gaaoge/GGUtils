/**
 * Created by GG on 15/7/24.
 */

/*Date工具类*/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

/*String工具类*/
//trim去掉字符串两边的指定字符,默去空格
String.prototype.trim = function (tag) {
    if (!tag) {
        tag = '\\s';
    } else {
        if (tag == '\\') {
            tag = '\\\\';
        } else if (tag == ',' || tag == '|' || tag == ';') {
            tag = '\\' + tag;
        } else {
            tag = '\\s';
        }
    }
    eval('var reg=/(^' + tag + '+)|(' + tag + '+$)/g;');
    return this.replace(reg, '');
};
//字符串截取后面加入...
String.prototype.interceptString = function (len) {
    if (this.length > len) {
        return this.substring(0, len) + "...";
    } else {
        return this;
    }
};
//将一个字符串用给定的字符变成数组
String.prototype.toArray = function (tag) {
    if (this.indexOf(tag) != -1) {
        return this.split(tag);
    } else {
        if (this != '') {
            return [this.toString()];
        } else {
            return [];
        }
    }
};
//只留下数字(0123456789)
String.prototype.toNumber = function () {
    return this.replace(/\D/g, "");
};
//保留中文
String.prototype.toCN = function () {
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
    return this.replace(regEx, '');
};
//转成int
String.prototype.toInt = function () {
    var temp = this.replace(/\D/g, "");
    return isNaN(parseInt(temp)) ? this.toString() : parseInt(temp);
};
//是否是以XX开头
String.prototype.startsWith = function (tag) {
    return this.substring(0, tag.length) == tag;
};
//是否已XX结尾
String.prototype.endWith = function (tag) {
    return this.substring(this.length - tag.length) == tag;
};
//StringBuffer
var StringBuffer = function () {
    this._strs = new Array;
};
StringBuffer.prototype.append = function (str) {
    this._strs.push(str);
};
StringBuffer.prototype.toString = function () {
    return this._strs.join("");
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

/*Array工具类*/
//移除数组中的某元素
Array.prototype.remove= function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
};
//判断元素是否在数组中
Array.prototype.contains= function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj == this[i]) {
            return true;
        }
    }
    return false;
};
