## repeat 函数

```javascript
const repeat = (str, n) => {
  let res = ''
  while (n) {
    if (n % 2 === 1) res += str
    if (n > 1) str += str
    n >>= 1
  }
  return res
}
```

`repeat` 函数接收一个字符串 str 和一个数字 n 作为参数。初始化一个结果变量 `res` ，赋值为空字符串。然后，当 n 不为 0 时，一直循环。

如果 n 除于 2 的余数为 1 ，`res` 拼接字符串 `str`。如果数字 n 大于 1，str 拼接自身。然后 n 赋值为 n 右移 1。

---

[右移赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#%E5%8F%B3%E7%A7%BB%E8%B5%8B%E5%80%BC%EF%BC%88Right_shift_assignment%EF%BC%89)“右移赋值运算符使变量向右移指定位数的比特位，然后把结果赋给该变量”。

---

在循环结束后，`repeat` 函数返回 `res` 变量的值。

在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/15-the-generateComponentTrace-function-3.md)里，我们将继续回到 `generateComponentTrace` 函数，来看下 `repeat` 函数是怎么使用的。
