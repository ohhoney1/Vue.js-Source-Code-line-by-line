## camelize 函数

这篇文章中，我们讲解下 `camelize` 函数，这个函数接收一个字符串作为参数，返回一个驼峰格式的字符串。

```javascript
const camelizeRE = /-(\w)/g
const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
```

首先，在顶级作用域内初始化一个变量 `camelize` ，值为调用 `cached` 函数后的返回值，`cached` 函数接收的参数是一个参数为字符串的函数。

你应该还记得在上篇文章中，`cached` 创建了一个函数缓存版本。所以，当变量 `camelize` 被初始化后，函数 `cached` 创建一个空对象，并返回一个函数（形成了闭包），这个函数会在 `camelize` 每次被调用时，判断 `camelize` 函数在某一特定参数下是否已经被调用过。如果没有调用过，结果会映射到 `cache` 对象中。如果已经调用过，`camelize` 将直接从 `cache` 对象中返回结果。

```javascript
function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

但我们上述讨论的结果是什么呢？`camelize` 给 `cache` 传递了一个函数，且调用了 [`String.replace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法。这个方法“查找指定的字符或者正则表达式匹配项，返回被替换特定字符后的字符串”，第一个参数为要查找的字符串，第二个参数为替换后的新值。

```javascript
return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
```

`String.replace()` 方法搜索一个字符前的中划线‘-’，并用一个返回新值的函数来替换它。这个函数检查参数 `c` 是否为 truthy。如果是，调用字符串的 `toUppercase()` 方法把 `c` 转换成大写形式并返回。如果不是，返回一个空字符串。

---

回顾下，在本系列的第七章里，我们知道了 `normalizeProps` 函数调用了 `camelize` 函数。在第八章里，我们学习了允许 `camelize` 函数缓存结果值的 `cached` 函数。最后，在本章里，我们学习了把连字符格式的字符串转成驼峰式的 `camelize` 函数。在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/10-the-normalizeProps-function.md)里，我们终于可以回头来看 `normalizeProps` 函数了。
