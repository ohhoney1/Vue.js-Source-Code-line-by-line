## Vue 的构造函数

研究 `Vue.js` 源码时，最合理的切入点就是 `Vue` 的实例。如 `Vue.js` 的教程所说的那样，“每个 Vue 应用都是通过 `Vue` 函数创建一个新的 **Vue 实例**开始的。”

新的 Vue 实例是用 Vue 构造函数来创建的：

```javascript
function Vue (options) {
  if (process.evn.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
一个对象的构造函数是创建其他对象的基本。按照约定，对象构造函数通常以一个大写字母开头：

```javascript
function Vue (options) {
  // ...
}
```

通过 `new` 关键字来调用一个构造函数。例如，你可以通过下面的方式来调用 `Vue` 构造函数：

```javascript
var vm = new Vue({
  // options
})
```

调用一个对象的构造函数后返回一个新的对象，并设置一个 `this` 关键字指向该对象的返回值。

`Vue` 对象构造函数用了一个参数：options。在函数内部，通过 `if` 语句来检测当前环境不是生成环境。

如果当前环境是生成环境，因为有 `&&` 这个逻辑与运算符，表达式的后半部分就不用考虑了，整个表达式的值即为 `false`。

若当前环境为开发环境，构造函数就会用 `instanceof` 检查 `this` 是否是 `Vue` 的实例。

若在开发环境，且 `this` 不是 `Vue` 的实例，就会调用 `warn` 函数，并传一个字符串作为参数，以提示开发者调用构造函数需要用 `new` 关键字。参数里，在单引号 '' 里用了一个反引号 ` ，有个很明显的好处，就是防止引号过早地结束。

最后，`Vue` 构造函数调用了 `this._init` 方法，并把构造函数的参数 options 作为自己的参数。

等等， `this` 在哪定义的 `_init` 方法？其实，这不是对象构造函数内定义的函数调用。快速看下源码会发现，`_init` 方法在一个单独的 `initMixin` 函数里，被添加到 Vue 的原型上- `Vue.prototype`。

[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/02-the-initMixin-function.md)，我们聊聊 `initMixin` 这个函数。
