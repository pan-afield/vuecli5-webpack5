import router from "@/router";

const UTILS = {
  $location: window.location,
  $pageGo: function (type, params) {
    const query = params.query || {};

    if (
      location.href.indexOf("source=") > 0 &&
      location.href.indexOf("tag=") > 0
    ) {
      query["source"] = UTILS.getQueryString("source");
      query["tag"] = UTILS.getQueryString("tag");
    }

    if (type === "router") {
      router.push({ name: params.name, query: query });
    } else {
      let href = params.href;

      Object.keys(query).forEach((key, index) => {
        href += (index ? "&" : "?") + key + "=" + query[key];
      });
      window.open(href, params.target || "_blank");
    }
  },
  /**
   * 节流
   * @param func 要执行的函数
   * @param wait 要延时执行的时间
   * @return {Function}
   */
  throttle(func, wait) {
    var lastTime = null,
      timeout = null;

    return function () {
      var context = this,
        now = Date.now();

      // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
      if (now - lastTime - wait > 0) {
        // 如果之前有了定时任务则清除
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        func.apply(context, arguments);
        // 这里lastTime是上次的触发时间
        lastTime = now;
      } else if (!timeout) {
        timeout = setTimeout(function () {
          // 改变执行上下文环境
          func.apply(context, arguments);
        }, wait);
      }
    };
  },

  /**
   * 防抖
   * @param func 要执行的函数
   * @param wait 要延时执行的时间
   * @return {Function}
   */
  debounce(func, wait) {
    var timeout = null;

    return function () {
      var context = this;

      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        // 改变执行上下文环境
        func.apply(context, arguments);
      }, wait);
    };
  },
  // 深拷贝
  deepCopy(o) {
    let newO;

    if (o === null) return o; // null
    if (o instanceof RegExp) return new RegExp(o); // 正则
    if (o instanceof Date) return new Date(o); // 日期
    if (typeof o === "function") {
      // eslint-disable-next-line new-cap
      return new o(); // 方法
    }

    if (typeof o === "object") {
      // 不直接创建空对象目的，克隆的结果和之前保持相同的所属类
      newO = new o.constructor();

      // 数组
      if (o instanceof Array) {
        for (let i = 0, len = o.length; i < len; i++) {
          newO.push(this.deepCopy(o[i]));
        }

        //    对象
      } else {
        let k;
        for (k in o) {
          // eslint-disable-next-line no-prototype-builtins
          if (o.hasOwnProperty(k)) {
            newO[k] = this.deepCopy(o[k]);
          }
        }
      }
    }

    return newO || o;
  },
  // 一键复制兼容移动端
  copyText(text) {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector("#copyInput");
    if (!input) {
      input = document.createElement("input");
      input.id = "copyInput";
      input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
      input.style.position = "fixed";
      input.style.left = "-1000px";
      input.style.zIndex = "-1000";
      document.body.appendChild(input);
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      //   alert('已复制到粘贴板')
    } else {
      console.log("不兼容");
    }
    input.blur();

    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        // ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex); // 起始光标
        range.moveEnd("character", stopIndex - startIndex); // 结束光标
        range.select(); // 不兼容苹果
      } else {
        // firefox/chrome/sifari
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    }
  },
  // 判断obj是不是空的 空的返回true,不空返回false
  // 字符串验证 返回true  or  false
  valReg(val, type) {
    var regExp = (function (r) {
      switch (type) {
        case "price": // 非价格类
          r = /(^\d\d*\.\d{0,2}$)|(^\d\d*$)|(^\.\d{0,2}$)/;
          // r = /(^-{0,1}$)|(^-?\d\d*\.\d{0,2}$)|(^-?\d\d*$)|(^-?\.\d{0,2}$)/;
          break;
        case "integer": // 非整数
          r = /[^0-9]/;
          break;
        case "decimal": // 非小数
          r = /(^-?\d\d*\.\d{0,15}$)|(^-?\d\d*$)|(^-?\.\d{0,15}$)/;
          break;
        case "cjk": // 中文
          r =
            /[\u3400-\u4DB5\u4E00-\u9FA5\u9FA6-\u9FBB\uF900-\uFA2D\uFA30-\uFA6A\uFA70-\uFAD9\uFF00-\uFFEF\u2E80-\u2EFF\u3000-\u303F\u31C0-\u31EF]/;
          break;
        case "email": // 邮箱
          r = /^([a-zA-Z0-9]|[_|.|-])+@([a-zA-Z0-9]|[_|.|-])*\.[a-zA-Z0-9]+$/;
          break;
        case "url": // 非http或https地址
          r = new RegExp(
            "^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://|[fF][tT][pP]://)\\S+$"
          );
          break;
      }
      return r;
    })("");
    return regExp.test(val);
  },
};

export default UTILS;
