## props 和 normalizeProps

在过去的8篇文章里，我们绕过了 `warn` 函数。这篇中，我们回到 `normalizeProps` 函数中。自从我们上次看这个函数时，已经有一段时间了，那么让我们简单回顾下 `normalizeProps`。

+ Vue 对象构造函数调用 `this._init`，参数为 options。
+ `Vue.prototype._init` 方法在 [`initMixin`](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/02-the-initMixin-function.md) 函数中定义，参数为 options。
+ `._init` 方法做了许多事，有一项是合并 options 选项。
+ 通过这两种方式之一合并 options：(1)如果 `options._isComponent` 为 true，`._init` 方法合并 options 是通过调用 [`initInternalComponent`](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/02-the-initMixin-function.md)，传递的参数为 `vm` 和 `options`；(2)如果 `options._isComponent` 不为 true，`._init` 方法合并 options 是通过调用 `mergeOptions`。
+ [`mergeOptions`](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/03-the-mergeOptions-function-1.md) 是一个把两个 options 合二为一的工具函数。
+ `mergeOptions` 函数中调用了 `normalizeProps` 函数。

上次我们停留在了这：

```javascript
function normalizeProps (options: Object, vm: ?Component) {
  const props = options.props
  if (!props) return
  const res = {}
  let i, val, name
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    )
  }
  options.props = res
}
```

但是如果你是个 Vue 新手，你可能会有这个疑问：“什么是 props”？在我们解答这个疑问之前，让我们先试着从源码中解释它。

**props 是一个 options 上的属性：**

```javascript
const props = options.props
```

**也可以是 options 对象中不存在 props 属性的情况：

```javascript
if (!props) return
```

如果在 props 不存在的情况下，运行环境也没有抛出错误，说明 props 并不是必须的。

**props 也可以是一个数组：**

```javascript
if (Array.isArray(props)) {
```

**或者 props 也可以是一个对象：**

```javascript
} else if (isPlainObject(props)) {
```

**但是如果 props 既不是对象也不是数组，会在开发环境中出现警告 [warning](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/11-the-warn-function.md)：**

```javascript
} else if (process.env.NODE_ENV !== 'production') {
  warn(
    `Invalid value for option "props": expected an Array or an Object, ` +
    `but got ${toRawType(props)}.`,
    vm
  )
}
```

**如果 props 是数组，Vue 希望数组元素是字符串类型的。**

---

**规范化（Normalization）发生的情况有以下两种：**

**1. 对于数组格式的 props，遍历每一个元素，并转为驼峰式（[camelized](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/09-the-camelize-function.md)），把转后的字符作为 `res` 对象的一个键，并给 `res` 赋值为一个包含 `type: null` 的对象。**

**2. 对于对象格式的 props，`res` 对象是用 `props` 对象上的键（属性）填充的，如下：**

```javascript
} else if (isPlainObject(props)) {
  for (const key in props) {
    val = props[key]
    name = camelize(key)
    res[name] = isPlainObject(val)
      ? val
      : { type: val }
  }
}
```

+ 遍历 `porps` 上的属性:

```javascript
for (var key in props) {
```

+ 遍历的时候，设置变量 `val` 的值为 props 的属性值：

```javascript
val = props[key]
```

+ 遍历的时候，设置变量 `name` 的值为 `props` 属性名转为驼峰后的格式：

```javascript
name = camelize(key)
```

+ 如果 `props` 的属性是个对象，设置 `res` 的一个属性，属性名就是 `props` 属性名转为驼峰后的格式，值根据 `val` 是不是对象来决定：

```javascript
res[name] = isPlainObject(val)
  ? val
  : { type: val }
```

---

**做所有有用的事情**

如上，在规范化（Normalization）之后，`normalizeProps` 函数重置 `options.props` 为 `res` 变量（规范化后的结果）的值。

```javascript
options.props = res
```

---

**props 到底是什么？**

现在我们已经学习了源码，我们进一步看下 [Vue API](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE):

> *Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。*

因此， `options.props` 是一个在以上定义下的一个注册元素。它是一个注册到组件的属性，这个属性可以接收数据作为自定义属性。

但是目前来说，我们没必要关心 `props` 的细节。我们只需要知道这个点：Vue 中存在一个函数，在正确的时机把相关字段转为驼峰式，并把 props 正确格式化，以此来规范 props 。

为了避免分散这篇文章，我们会跳到两个工具类函数的具体实现的学习：`isPlainObject` 和 `toRawType`。[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/20-the-isPlainObject-function.md)我们会学习 `isPlainObject`。
