// 防抖函数。delay：延迟事件
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
/**
 * 格式化函数 ， 给日期格式化
 * 时间戳：1535694719
 * 1.将时间戳转为Date对象
 * const date = new Date(1535694719)
 * 2.将date进行格式化，转为对应的字符串
 * 第一种： date.getYear()获取年，依次获取之后，进行字符串拼接
 */
export function formatDate(date, fmt) {
  // date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
  //获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + "";
    //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
  }

  //获取其他
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
