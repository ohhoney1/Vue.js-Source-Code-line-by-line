## generateComponentTrace 函数（3）

上篇文章里，我们学习了 `repeat` 函数，现在我们可以继续函数 `generateComponentTrace` 中那个冗长的语句了。

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

通过上篇文章，我们知道 `repeat` 函数的主要功能是重复传递进去的字符串。在这里，重复空字符串一定次数。

```javascript
i === 0 ? '--->' : repeat(' ', 5 + i * 2)
```

---

接着，用一个三元运算符检测 `vm` 是不是一个数组。如果 `vm` 是数组，调用 `formatComponentName` 函数，参数为 `vm` 的第一个参数、“… (”，`vm`的第二个参数和“ recursive calls”， `.map` 的回调函数拼接其返回值。

如果 `vm` 不是数组，调用 `formatComponentName` 函数，参数为 `vm` ，`.map` 的回调函数拼接其返回值。

函数 `formatComponentName` 在其他地方声明了，我们将在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/16-the-formatComponentName-function.md)里学习，后面再继续回到 `generateComponentTrace` 函数中。
