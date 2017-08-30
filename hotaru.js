/**
 * 全局公共方法库
 * Created by Gentean.
 * Mail: 4083189@qq.com
 * Date: 15/10/31
 * Time: 上午10:49
 */
"use strict";
//var store = require('js/core/router');

/**
 * 生成树
 * @param parentCode
 * @param datas
 * @param level
 * @returns {Array}
 */
function createTree(parentCode, datas, level) {
  if (level == undefined) {
    level = 0;
  }
  var child = [];
  var childCodes = [];

  // 找子节点
  for (var i in datas) {
    var item = datas[i];
    if (item.parent == parentCode) {
      item.level = level;
      child.push(item);
      childCodes.push(item.code);
    }
  }

  var len = child.length;

  if (len > 0) {
    if (parentCode != 0) {
      datas[parentCode].child = child;
      datas[parentCode].childCodes = childCodes;
    }
    for (i = 0; i < len; i++) {
      createTree(child[i].code, datas, level + 1);
    }
  }
  if (level == 0) {
    return child;
  }
}

/**
 * 生成指定长度的随机字符串
 * @param len
 * @returns {string}
 */
function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

/**
 * 金额转大写
 * @param num
 * @returns {string|*}
 */
function numberToChines(num) {
  if (num != 0 && !num) return '';
  var strOutput = "";
  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  var intPos = num.indexOf('.');
  if (intPos >= 0)
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (var i = 0; i < num.length; i++)
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}
/**
 * 人名币格式
 * @param price 人名币
 * 
 */
function getMoneyFormat(price) {
  // var price=money
  // if (!price) {
  //   return 0;
  // }
  // var list = (Math.abs(price)/ 100 + "").split(".");
  // list[0] = list[0].split("").reverse().join("");
  // var num = "";
  // for (var i = 0; i < list[0].length / 3; i++) {
  //   num += list[0].substr(i * 3, (i + 1) * 3) + ","
  // }
  // if (money<0) { 
  //   num=num+"-"
  // }
  // list[0] = num.split("").reverse().join("");
  // return list.join(".").substring(1);
  var n = parseFloat(price / CONFIG.moneyUnit).toFixed(2);
  var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  return n.replace(re, "$1,");
}
/**
 * 时间格式
 * @param format 时间格式
 * @param timestamp  时间戳
 */
function formatDate(format, timestamp) {
  if (!timestamp) return '';

  var date = new Date(parseInt(timestamp));
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds(),
    w = date.getDay(),
    week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  i = i < 10 ? '0' + i : i;
  s = s < 10 ? '0' + s : s;
  return format.replace('YYYY', y)
    .replace('MM', m)
    .replace('DD', d)
    .replace('H', h)
    .replace('i', i)
    .replace('s', s)
    .replace('WW', week[w]);
}

/**
 * 查询字符串参数
 * @returns {Object}
 * @constructor
 */
function getRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = {};
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

/**
 * dataURL 转 Blob
 * @param dataurl
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


function timeFormat(time, defaultValue) {
  var stringTime = time ? (time / CONFIG.timeUnit).toFixed(2) : (defaultValue == undefined ? 0 : defaultValue);

  return Number(stringTime);
}

function timeFormatSixty(time, defaultValue) {
  var stringTime = time ? (time / 60).toFixed(2) : (defaultValue == undefined ? 0 : defaultValue);

  return Number(stringTime);
}

function moneyFormat(money, defaultValue) {
  var n = parseFloat(money / 100).toFixed(2);
  var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  return n.replace(re, "$1,");
}


/**
 * js数字精度转换
 */
function formatFloat(f, digit) {
  var m = Math.pow(10, digit);
  return Math.round(f * m, 10) / m;
}

/**
 * 分钟数转成小时表示
 * @param number
 * @returns {string}
 */
function intToHours(number) {
  //如果的整数
  if (number % 1 == 0) {
    var hours = Math.floor(number / 60),
      minutes = number % 60;
  }
  hours = hours < 10 ? "0".concat(hours) : hours;
  minutes = minutes < 10 ? "0".concat(minutes) : minutes;

  return hours + ':' + minutes
}

function getMonthLastDate(timestamp) {
  var date = new Date(parseInt(timestamp));
  var y = date.getFullYear();
  var m = date.getMonth() + 2;
  var time = y + "-" + m + "-01"
  time = new Date(time).getTime() - 1000;
  return time;
};

/*
  获取日期相差多少天
  need moment
* */
function getSubDays(endDate, startDate) {
  return moment(parseInt(endDate)).diff(moment(parseInt(startDate)), 'days') + 1;
}

//判断课时是否为整数
function deleteZero(classHour) {
  return (new Number(classHour)).valueOf()
}

//判断是否为两位小数
function isNumber(str) {
  var regex = /^\d+\.?\d{0,2}$/;
  return regex.test(str);
}


// 判断是否是数组且长度不为0
function isLongArr(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

//判断是否为整数
function isInteger(obj) {
  return obj % 1 === 0
}

// 获取剩余天数,设置课程有效期之后启用
function getLeftExpiredDay (expiredDate, minWarningDays, onlyShowTimeover) {
  var expiredDay = Math.ceil((Number(expiredDate) - Date.now()) / (24 * 60 * 60000));
  var tempStr = '（剩余'+ expiredDay +'天）'
  if (expiredDay <= 0){
    tempStr = '（已到期）'
  }

  // 最小预警天数
  if (minWarningDays){
    if (expiredDay > minWarningDays){
      tempStr = ''
    }
  }

  if (onlyShowTimeover){
    if (expiredDay > 0){
      tempStr = ''
    }
  }

  return tempStr;
}

// 检测是否为正确的手机号码
function isValidPhone(phone) {
  var tempPhone = Number(phone)
  return /^1(3|4|5|7|8)\d{9}$/.test(tempPhone)
}

// 名字替换为中间带 * 的样子
function formatName(str) {
  var tempStr = ''
  if (!str.length){
    tempStr = ''
  }
  if(str.length == 1){
    tempStr = str
  }
  if (str.length == 2){
    tempStr = str.replace(/^(.).*(.)$/,"$1*")
  }
  if (str.length > 2){
    var num = str.length - 2;
    var temp = '';
    for (var i = 0; i < num; i ++){
      temp += '*'
    }
    var reg = "$1" + temp + "$2"
    tempStr = str.replace(/^(.).*(.)$/, reg)
  }
  return tempStr
}

