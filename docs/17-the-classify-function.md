## classify 函数

```javascript
const classifyRE = /(?:^|[-_])(\w)/g
const classify = str => str
  .replace(classifyRE, c => c.toUpperCase())
  .replace(/[-_]/g, '')
```

在顶级作用域下，初始化变量 `classifyRE`，值为一个正则表达式。这个正则表达式使用了 g 修饰符：“[全局匹配，而不是找到第一个匹配项后就停止](https://www.w3schools.com/jsref/jsref_regexp_g.asp)”。以一个[非捕获括号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-capturing-parentheses)开头：`(?:x)`。`classifyRE` 其实也就是寻找一个输入的开始（没有捕获），或者是一个连字符，或者是一个下划线（没有捕获）：`^|[-_]`。接下来是一个单词字符（ 捕获）：`(\w)`。

然后，定义一个函数变量 `classify`，参数是一个字符串，返回值是参数 `str` 两次链式调用 [`replace` 方法](https://www.w3schools.com/jsref/jsref_replace.asp)。

> `replace` 方法搜索指定的值，或一个字符串的正则表达式，并返回其中指定的值置换后的新字符串。

在这里，第一个 `replace` 方法再 `str` 字符搜索，以找到符合 `classifyRE` （正则表达式）的字符，替换它的是一个函数的返回值，参数 `c` 是匹配到 `classifyRE` 的字符，`.toUpperCase()` 返回的是字符的全部大写形式。替换匹配项为这是函数的返回值。：

```javascript
replace(classifyRE, c => c.toUpperCase())
```

第二个 `replace` 方法全局搜索连字符和下划线，替换为空字符串：

```javascript
replace(/[-_]/g, '')
```

总结下这篇文章里我们所学习的，`classify` 函数接收一个字符串作为参数，寻找符合下列条件的字符：

+ 在字符串的开头
+ 在连接符 - 之后
+ 或者在下划线 _ 之后

替换为一个大写字母，然后移除连接符和下划线。例如，“this_is-an_example” 将会替换为 “ThisIsAnExample”。

基于此，我们最后将回到 `warn` 函数中，这个函数在本系列的第十一章（接着是 `generateComponentTrace` 函数，`repeat` `formatComponentName` 函数，和现在的 `classify` 函数）里学习过。[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/18-the-warn-function.md)我们将继续回到 `warn` 函数的学习中。
