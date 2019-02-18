## toRawType 函数

上篇文章里，我们介绍了变量 `_toString` 表示 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法，它是在顶级作用域下声明的，并在多个函数里用到：

```javascript
const _toString = Object.prototype.toString
```

函数 `toRawType` 接收 `value` 作为参数，返回一个字符串：

```javascript
function toRawType (value: any): string {
  return _toString.call(value).slice(8, -1)
}
```

返回语句调用了 `Object.prototype.toString()` 方法，参数为 `value`，然后切分提取（[slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)）返回的值：

```javascript
_toString.call(value).slice(8, -1)
```

我们来看个例子，在切分提取前做了什么。假设你穿了一个对象 `anObject` 给 `_toString.call` 调用，返回值将会是：`'[object Object]'`。

现在，我们看下 `slice` 方法。“**slice()** 方法提取字符串的某一部分，并返回一个新的字符串。”第一个参数作为提取字符的开始索引，第二个参数（可选）是作为提取字符的结束索引。如果结束索引为负数，结尾处为该字符的长度减去这个数字。

那么，你期望 `_toString.call(value).slice(8, -1)` 之后会发生什么呢？

其实，在上面参数为对象的例子中，slice 方法开始出在 `Object` 的“O”，结尾处为右括号。因此，你会得到所处值的原生类型，在这里是：“Object”。

---

我们已经学习了一系列函数，例如 `toRawType` ，这个函数是在 `normalizeProps` 函数中遇到的。现在，我们已经学习了 `normalizeProps` 函数的每一部分，接下来，我们可以回到函数 `mergeOptions` （`normalizeInject` 函数）中。

```javascript
function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  // [...]
```

[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/22-the-normalizeInject-function.md)，我们将要学习下 `normalizeInject` 函数。
