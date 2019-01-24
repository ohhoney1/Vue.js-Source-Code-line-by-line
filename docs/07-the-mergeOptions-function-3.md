## mergeOptions 函数（3）

我们继续浏览 `mergeOptions` 函数。对参数 `child` 用操作符 `typeof` 来判断它是不是一个函数。如果是函数，则 `child` 被赋值为 `child.options`。

```javascript
if (typeof child === 'function') {
  child = child.options
}
```

然而，你会记得在 `Vue.prototype._init` 里，`mergeOptions` 函数的参数会是其中之一：
  + `options`：Vue对象构造函数的 options
  + `{}`：如果没传 options 的话，就传一个空对象

接着，`mergeOptions` 函数调用3个格式化函数：

```javascript
normalizeProps(child, vm)
normalizeInject(child, vm)
normalizeDirectives(child)
```

### normalizeProps 函数

我们会逐个分析下这些函数。在这篇文章的后续部分，我们将学习下 `normalizeProps` 函数。如注释所讲，这个函数要“确保所有的 props 选项都被格式化为一个基础的对象格式”。所以，也正如我们预料的那样，`normalizeProps` 函数的参数为 `options`，也接收 vm 最为参数（如：Vue 实例或者 this）。

```javascript
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
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

初始化一个变量 `props`，并把 `options` 的 `props` 赋值给它。如果 `options` 对象中不存在 `props` ，那么函数终止。然后，初始化一个变量 `res` ，赋值为一个空对象。接着声明了3个变量。

```javascript
const props = options.props
if (!props) return
const res = {}
let i, val, name
```

剩余部分是一个冗长的条件语句：
  1. 检查 `props` 是否是一个数组；
  2. 若不是，检查把 `props` 作为参数，调用 `isPlainObject` 方法后的返回值是否为 true；
  3. 否则，检查环境不是在生成环境中。


首先，如果 `props` 是一个数组，把数组的长度赋值给变量 i，然后，递减 i，把数组的元素，赋值给 val。如果数组中的元素类型时字符串：(1) 调用 `camelize` 方法，参数为数组的元素 (2) 给对象 `res` 添加属性 `name`，赋值为一个含有属性 `type` 且值为 `null` 的对象。

```javascript
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
}
```

函数 `camelize` 在其他地方中声明了，我们先跳过他，先看[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/08-the-cached-function(4).md)，下一章里会给出 `camelize` 函数的解释地址。
