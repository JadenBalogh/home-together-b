/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/utils/module/String.js
 */

module.exports = {
  isEmpty: function (val) {
    switch (typeof val) {
      case "string":
        return val.length == 0 ? true : false;

      case "number":
        return val == 0;

      case "object":
        for (var name in val) {
          return false;
        }
        return true;

      case "array":
        return val.length == 0;

      default:
        return true;
    }
  },

  isNull: function (val) {
    return typeof val == "undefined" || val == null || val == "" ? true : false;
  },

  isUndefined: function (val) {
    return typeof val == "undefined" ? true : false;
  },

  trim: function (str) {
    if (this.isEmpty(str)) {
      return "";
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },

  replaceAll: function (s1, s2, str) {
    if (this.isEmpty(str)) {
      return "";
    }
    str = str.replace(s1, s2);
    if (str.indexOf(s1) !== -1) {
      str = this.replaceAll(s1, s2, str);
    }
    return str;
  },

  len: function (str) {
    var length = 0;
    var reg = /[\u4e00-\u9fa5]/;
    for (var i = 0; i < str.length; i++) {
      if (reg.test(str.charAt(i))) {
        length += 2;
      } else {
        length++;
      }
    }
    return length;
  },

  cut: function (str, len, hasDot) {
    if (this.isEmpty(str)) {
      return str;
    }
    var strlen = 0,
      s = "";
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        strlen += 2;
      } else {
        strlen++;
      }
      s += str.charAt(i);
      if (strlen >= len) {
        if (!this.isNull(hasDot)) {
          s += hasDot;
        }
        return s;
      }
    }

    return s;
  },

  subStr: function (str, firstLen, lastLen) {
    if (this.isNumber(str)) {
      str = str.toString();
    }
    firstLen = parseInt(firstLen);
    if (isNaN(firstLen)) {
      firstLen = 1;
    }
    lastLen = parseInt(lastLen);
    if (isNaN(lastLen)) {
      lastLen = 1;
    }
    var s = "",
      m = "",
      e = "",
      len = str.length,
      re = "";
    for (var i = 0; i < len; i++) {
      if (firstLen > 0 && i < firstLen) {
        s += str.charAt(i);
      }
      if (lastLen > 0 && i >= len - lastLen) {
        e += str.charAt(i);
      }
    }
    if (len - (firstLen + lastLen) > 0) {
      for (i = 0; i < len - (firstLen + lastLen); i++) {
        m += "*";
      }
    }
    if (m == "") {
      m = "***";
    }
    if (firstLen > 0) {
      re += s;
    }
    re += m;
    if (lastLen > 0) {
      re += e;
    }
    return re;
  },

  cleanTabs: function (text) {
    if (typeof text != "string" || this.isEmpty(text)) {
      return "";
    }
    return text
      .replace("\r\n", "")
      .replace("\r", "")
      .replace("\n", "")
      .replace("\t", "");
  },
  stripTags: function (html) {
    html = html || "";
    return html
      .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, "")
      .replace(/<\/?.+?>/g, "")
      .trim();
  },
  getDescText: function (text) {
    text = text || "";
    text = this.stripTags(text);
    text = this.cleanTabs(text);
    text = text.replace(" ", "");
    text = text.replace("&nbsp;", "");
    text = text.replace(" ", "");
    text = this.cut(text, 70, "");
    return text;
  },

  htmlEncode: function (text) {
    if (typeof text != "string" || this.isEmpty(text)) {
      return "";
    }
    return text
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  escape: function (html) {
    var temp = document.createElement("div");
    temp.textContent != undefined
      ? (temp.textContent = html)
      : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
  },
  unescape: function (text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },

  CharStrMode: function (iN) {
    if (iN >= 48 && iN <= 57)
      //Number
      return 1;
    if (iN >= 65 && iN <= 90)
      //uppercase letter
      return 2;
    if (iN >= 97 && iN <= 122)
      //Lower case letters
      return 4;
    else return 8; //Special characters
  },

  bitTotal: function (num) {
    var modes = 0;
    for (var i = 0; i < 4; i++) {
      if (num & 1) modes++;
      num >>>= 1;
    }
    return modes;
  },

  /**
   * @description: Returns the strength level of the password
   * @param {*} spwPW
   * @return {Number}
   */
  checkPasswordStrong: function (pw) {
    if (pw.length <= 4) return 0; //password is too short
    var Modes = 0;
    for (var i = 0; i < pw.length; i++) {
      Modes |= this.CharStrMode(pw.charCodeAt(i));
    }
    return this.bitTotal(Modes);
  },
  nl2br: function (str, is_xhtml) {
    if (typeof str === "undefined" || str === null) {
      return "";
    }
    var breakTag =
      is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
    return (str + "").replace(
      /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
      "$1" + breakTag + "$2"
    );
  },
};
