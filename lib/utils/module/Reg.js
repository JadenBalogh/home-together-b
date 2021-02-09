/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/utils/module/Reg.js
 */

module.exports = {
  isURL: function (str) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(str);
  },

  isLowerCase: function (str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  },
  Avatar: function (str) {
    return this.isURL(str) ? str : "/" + str;
  },

  isUpperCase: function (str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  },

  isAlphabets: function (str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  },

  isEmail: function (str) {
    const re = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    return re.test(str);
  },

  isENTag: function (str) {
    const re = /^[a-zA-Z]{4,10}$/;
    return !this.isEmpty(str) && re.test(str);
  },

  isObject: function (obj) {
    return typeof obj == "object";
  },

  tel: function (str) {
    var reg = /^0[\d]{2,3}-[\d]{7,8}$/;
    return reg.test(str);
  },
};
