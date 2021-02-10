/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/utils/module/Number.js
 */

module.exports = {
  /**
   * @description: radom ID
   * @param {Number} j length
   * @return {Number}
   */
  getID(j) {
    if (!j) {
      j = 5;
    }
    var random_no = "";
    for (var i = 0; i < j; i++) {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
  },

  /**
   *  @description: Get a random number in a specified range
   * @param {Number} minVal Minimum
   * @param {Number} maxVal Max
   * @return {Number}
   */
  random: function (minVal, maxVal) {
    return minVal >= maxVal
      ? minVal
      : (minVal = minVal >> 0) +
          Math.round(Math.random() * ((maxVal || 9) - minVal));
  },

  /**
   * @description: Determine whether the value is an integer
   * @param {*} val
   * @return {boolean}
   */
  isInt: function (val) {
    if (val == "") {
      return false;
    }
    var reg = /\D+/;
    return !reg.test(val);
  },

  /**
   * @description: Determine whether the value is a number
   * @param {*} val
   * @return {boolean}
   */
  isNumber: function (val) {
    var reg = /^-?[1-9]+(\.\d+)?$|^-?0(\.\d+)?$|^-?[1-9]+[0-9]*(\.\d+)?$/;
    return reg.test(val);
  },
};
