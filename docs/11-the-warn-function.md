## warn 函数

```javascript
let warn = noop
let generateComponentTrace = (noop: any) // work around flow check

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  // [...]

  warn = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace)
    } else if (hasConsole && (!config.silent)) {
      console.error(`[Vue warn]: ${msg}${trace}`)
    }
  }
}
```

默认情况下，`warn` 函数什么也不做：

```javascript
function noop (a?: any, b?: any, c?: any) {}
// [. . . .]
let warn = noop
```

但是，当你处于开发环境时，`warn` 就有用了。然后是做了什么呢？

`warn` 函数接收两个参数 `msg` 和 `vm`：`msg` 是一个字符串，`vm` 是一个 `Vue` 实例。例如：

```javascript
warn(
  'Failed to mount component: template or render function not defined.', vm
)
```

`warn` 函数初始化一个变量 `trace` 。如果参数 `vm` 传递给了 `warn` 函数，`trace` 赋值为调用 `generateComponentTrace` 函数且参数为 `vm` 的返回值。若参数 `vm` 没传递给 `warn` 函数，`trace` 为一个空字符串。

对于 `generateComponentTrace` 的讨论，我们留到下次。

---

`warn` 函数然后检查下 `config.warnHandler` 是否已设置。根据 Vue.js 的 API，`config.warnHandler` 表示“一个 Vue 运行时警告的通用处理函数。仅在开发环境下生效，生产环境无效”。它的用法如下：

```javascript
warnHandler: ?(msg: string, vm: Component, trace: string) => void;
```

正如上面所示，`Vue.config.warnHandler` 是一个函数，接收参数为一个信息字符串，一个 Vue 实例，和 `trace`，允许你用函数体自定义警告处理信息。

---

现在，我们继续回到 `warn` 函数。如果已设置了 `config.warnHandler`，就会用 `call()` 方法调用 `config.warnHandler`。`call()` 方法把 `this` 的值设为`null` ，并传递了3个参数：
  (1)一个信息字符串，
  (2)一个 Vue 实例，
  (3)`trace`。

另一方面，如果没设置 `config.warnHandler`，`warn` 函数检测 `hasConsole` 是否为 true，`hasConsole` 的定义如下：

```javascript
const hasConsole = typeof console !== 'undefined'
```

接着，`warn` 函数检测 `config.silent` 为非真。如果这些条件都符合，就调用 `console.error`。

`console.error` “在开发者工具里的 console 里输出错误信息”。在这，`console.error` 输出 “[Vue warn]: ” 和 `msg` `trace` 的连接字符。`msg` 来自 `warn` 函数的参数。`trace` 设置在 `warn` 函数里，用来描述以上更详细的信息。

---

我们回顾下，在开发环境下，`warn` 函数接收一个字符串和 Vue 实例作为参数，然后调用自定义的错误处理函数或者是默认的 `console.error`，以提示开发者某一个错误问题。默认的处理器提供了警告信息和溯源功能。

[下一篇](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/12-the-generateComponentTrace-function-1.md)，我们将学习下 `generateComponentTrace` 函数。
