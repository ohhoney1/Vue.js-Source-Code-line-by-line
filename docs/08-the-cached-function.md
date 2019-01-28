## cached 函数

在我们理解 `camelize` 函数之前，我们要先了解下 `cached` 函数。`cached` 函数是一个工具类函数——“一个纯函数的缓存版本”。

```javascript
/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

`cached` 函数的把函数作为一个参数，然后初始化一个变量 `cache`，并设置为空对象。接着返回了一个参数为字符串的函数（这里即创建了一个闭包）。

当返回的函数被调用时，初始化一个变量 `hit`，值为 `cache` 对象的 `str` 属性的值。

如果 `hit` 存在，就返回 `hit` （例如，如果 `cached` 函数在某一字符串作为参数时已经被调用过一次）。否则，给 `cache` 的 `str` 属性赋值为调用参数函数 `fn` 且参数为 `str` 的值。

这是一种优雅的缓存之前的函数调用的方式。通过闭包，返回的那个函数能访问到 `fn` 参数和 `cache` 变量。当每次返回的函数被调用的时候，一个新的属性或者键被添加到缓存对象 `cache` 中。如果这个属性已经存在了，函数即会返回结果值，而不是再次调用函数计算。如果属性不存在，这个函数就会调用 `fn` 函数，设置一个属性，并返回当前函数。

基于此背景下，我们就有能力在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/08-the-camelize-function.md)中分析 `camelize` 函数了。
