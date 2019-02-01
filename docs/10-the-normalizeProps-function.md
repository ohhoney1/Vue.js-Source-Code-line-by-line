## normalizeProps 函数

在我们上次分析 `normalizeProps` 函数时，我们停留在了 `name = camelize(val)`：

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

现在，我们已经学习了 `camelize` 函数，它首先检查 `cache` 对象（包裹在一个闭包里）中传过去的值（在这里是 `val`）是否匹配 `cache` 对象的某一属性或键。如果 `val` 已经被缓存过了，函数 `camelize` 返回已经计算过的值。如果 `val` 没被缓存过，会调用 `String.replace()` 方法来替换一个单词中的中划线及中划线后的第一个字母。函数 `camelize` 通过移除中划线分割字符及大写中划线后的首字母来替换中划线分隔类的单词。

然后，函数 `normalizeProps` ：
  (1)给对象 `res` 设置一个属性，属性名为一个新的驼峰式字符（例如：`name`）
  (2)用一个对象来初始化它
  (3)在对象设置一个 `type` 属性，值为 `null`

如果 `val` 的类型不是一个字符串，并且处于开发环境中，函数 `normalizeProps` 会调用 `warn` 函数，参数为一个字符串——“当用数组语法时，`props` 的每一项必须为一个字符串类型”。

在之前的文章里我们承诺过，[下一篇](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/11-the-warn-function.md)我们将探究下 `warn` 函数。
