## generateComponentTrace 函数（2）

```javascript
return '\n\nfound in\n\n' + tree
  .map((vm, i) => `${
    i === 0 ? '---> ' : repeat(' ', 5 + i * 2)
  }${
    Array.isArray(vm)
      ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
      : formatComponentName(vm)
  }`)
  .join('\n')
```


上篇文章里，我们学习了 `generateComponentTrace` 函数：如果 `vm.isVue` 和 `vm.$parent` 判断后都为 `true`，会有一系列操作——已在上篇文章里详细说明——然后返回上面的语句。

显而易见，这个语句返回的是用含有冗长的 map 函数拼接后的字符串。简单来说，这个字符串的开头是两空白行、“found in” 和另外两个空白行。然后拼接调用 `tree` 数组的 `map()` 方法后的返回值。

[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map) 方法“对类型化数组的每个元素调用提供的函数，并使用结果来创建新的类型化数组”。

---

我们来看下对 tree 数组的元素调用提供的函数。代码很长，让我们逐一击破。`map()` 方法的回调函数接收两个参数：
  (1) 当前传递过来作为参数的元素（在这里是 `vm`，因为 tree 数组的每个元素都是 Vue 实例），
  (2) `i` （当前元素的索引）。

```javascript
(vm, i) => {}
```

它返回一个拼接的字符串。如果索引为 tree 数组的第一个元素的索引（例如，i === 0），拼接 `-->`。如果索引不是数组第一个元素的索引，调用 `repeat` 函数拼接字符串。

函数 `repeat` 在其他地方定义了，[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/14-the-repeat-function.md)将学习它，之后再继续回到 `generateComponentTrace` 函数中。
