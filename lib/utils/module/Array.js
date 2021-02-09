/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/utils/module/Array.js
 */

module.exports = {
  /**
   * @description: Determine whether it is an array
   * @param {*} value
   * @return {boolean}
   */

  isArray: function (value) {
    return (
      value &&
      typeof value === "object" &&
      typeof value.length === "number" &&
      typeof value.splice === "function" &&
      !value.propertyIsEnumerable("length")
    );
  },

  /**
   * @description: Exclude duplicates
   * @param {Array} arr
   * @return {Array}
   */
  unique: function (arr) {
    var newArr = [],
      i = 0,
      len = arr.length;

    for (; i < len; i++) {
      var a = arr[i];
      if (newArr.indexOf(a) !== -1) {
        continue;
      } else {
        newArr[newArr.length] = a;
      }
    }

    return newArr;
  },

  /**
   * @description: Determine whether the value exists in the array
   * @param {*} needle
   * @param {*} haystack
   * @return {boolean}
   */
  in_array: function (needle, haystack) {
    if (typeof needle == "string" || typeof needle == "number") {
      for (var i in haystack) {
        if (haystack[i] == needle) {
          return true;
        }
      }
    }
    return false;
  },
};
