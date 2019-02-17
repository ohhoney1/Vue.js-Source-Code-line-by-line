## isPlainObject 函数

```javascript
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
```

我们必须要先知道，变量 `_toString` 表示 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法，它是在顶级作用域下声明的，并在多个函数里用到：

```javascript
const _toString = Object.prototype.toString
```

函数 `isPlainObject` 接收一个参数，返回的是一个布尔值。返回语句检查了参数 `obj` 调用 `Object.prototype.toString()` 方法后的返回值是否严格等于 `[object Object]`。如果严格等于，确定了 `obj` 是一个纯粹的 JavaScript 对象（plain JavaScript object）。

那么在之前的文章里，`normalizeProps` 函数里包含了一下代码：

```javascript
} else if (isPlainObject(props)) {
```

毫无疑问了，检测的是 props 是否是一个纯粹的 JavaScript 对象。（注：即直接继承自 Object 构造函数）。

[下一篇](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/21-the-toRawType-function.md)，我们将学习下 `toRawType` 这个工具函数。
