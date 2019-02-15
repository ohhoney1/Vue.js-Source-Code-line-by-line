## warn 函数（回顾）

```javascript
warn = (msg, vm) => {
  const trace = vm ? generateComponentTrace(vm) : ''

  if (config.warnHandler) {
    config.warnHandler.call(null, msg, vm, trace)
  } else if (hasConsole && (!config.silent)) {
    console.error(`[Vue warn]: ${msg}${trace}`)
  }
}
```

在最近的6篇文章里，我们已经详细的学习了 `warn` 函数中的每一个细节。为了不遗漏细节，我们先回顾下 `warn` 函数的基础功能：

+ `warn` 接收一个警告信息和一个 Vue 实例作为参数。
+ 如果传递了 Vue 实例参数，`warn` 函数中会生成一个包含错误日志的组件层次追踪器。
+ 这个追踪器是通过 `.$parent` 属性递归每一个组件树来生成的。

在追踪器生成的背后：

+ 工具函数 `repeat` 为追踪过程创建足够量的空白（行）。
+ 工具函数 `formatComponentName` 帮助格式化追踪过程中每一个组件的名称，不断地调用 `classify` 函数（移除连接符和下划线，大写部分字母）和添加文件索引。

在追踪器（或者是在没有传递 Vue 实例作为参数的情况下，是一个空白字符串）生成之后，`warn` 函数：

+ 调用一个自定义的警告处理器（假设 `config.warnHandler` 存在），或者
+ 调用 `console.error`，并连接 `[Vue warn]:` 、`msg` 参数和已生成的追踪器。

这是一个 `warn` 函数生效后的例子：

![warn](./public/images/warn.png)

[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/19-props-and-normalizeProps.md)，继续回到 `normalizeProps` 函数（已在[第十章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/10-the-normalizeProps-function-1.md)里介绍过）。
