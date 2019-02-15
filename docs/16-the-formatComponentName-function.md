## formatComponentName 函数

```javascript
let formatComponentName = (noop: any)

if (process.env.NODE_ENV !== 'production') {
  formatComponentName = (vm, includeFile) => {
    if (vm.$root === vm) {
      return '<Root>'
    }
    const options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {}
    let name = options.name || options._componentTag
    const file = options.__file
    if (!name && file) {
      const match = file.match(/([^/\\]+)\.vue$/)
      name = match && match[1]
    }

    return (
      (name ? `<${classify(name)}>` : `<Anonymous>`) +
      (file && includeFile !== false ? ` at ${file}` : '')
    )
  }
}
```

如果在开发环境中，`formatComponentName` 函数什么也不做，因为在顶级作用域下，它的值为 noop 函数。

```javascript
function noop (a?: any, b?: any, c?: any) {}
```

如果不在开发环境中，变量 `formatComponentName` 被重置为一个全新的函数，接收 `vm` 和 `includeFile` 作为参数。

Vue 文档里解释 `vm.$root` 是“当前组件树的根 Vue 实例。如果当前实例没有父实例，值就是它自身”。所以，当 `if` 语句检测到 `vm.$root` 严格等于 `vm`，即检测到 `vm` 没有父实例，因此就是当前组件树的根 Vue 实例。如果当前 Vue 实例不存在父实例，函数返回 `<Root>`。

---

为了更好地理解源码，你需要了解这两件事。

第一，Vue 实例上的属性和方法（而不是用户自定义的属性和方法）上添加前缀 $ ，是为了清晰地区别于用户自定义的。因此，`vm.$root`是一个实例属性。

第二，
> 一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。
>
>-[Vue.js API](https://cn.vuejs.org/v2/guide/instance.html)

---

所以，对于 `formatComponentName` 函数的目的，首先 `if` 语句通过判断 `vm.$root` 这个实例属性是否严格等于所传递的实例，只检查 `vm` 参数是根 Vue 实例或者一个 Vue 组件。

接着，初始化一个 `options` 变量，赋值为[嵌套的三元运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)的结果：

```javascript
const options = typeof vm === 'function' && vm.cid != null
  ? vm.options
  : vm._isVue
    ? vm.$options || vm.constructor.options
    : vm || {}
```

如果 `vm` 是一个函数，且 `vm.cid` 不等于 null，`options` 设置为 `vm.options`。

---

函数 `initExtend` 中的注释解释了 `cid` 属性：“每一个实例的构造函数，包括 Vue ，有一个唯一的 cid。这允许我们创建子构造函数的集合，以实现原型继承，并能够缓存他们”。

---

如果 `vm` 不是一个函数或者 `vm.cid` 为 `null`，接下来我们检查 `vm._isVue` 这个标记是否为 true。你应该还记得，在 `Vue.prototype._init` 中设置 `vm._isVue` 为 true。如果成立，变量 `options` 的值被赋值为 `vm.$options` 或者 `vm.constructor.options`。如果 `vm._isVue` 这个标记为 false，变量 `options` 被赋值为 vm 或者空对象。

```javascript
vm._isVue
  ? vm.$options || vm.constructor.options
  : vm || {}
```

接下来，初始化`name` 变量，如果 `options.name` 存在，赋值为 `options.name`，若不存在，赋值为 `options._componentTag`。初始化 `file` 变量，赋值为 `options.__file`：

```javascript
let name = options.name || options._componentTag
const file = options.__file
```

然后，我们检查下 `name` 变量是否为 false，且`file` 变量是否为 true。如果都成立，调用 [`match` 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)，参数为一个正则表达式，返回值变量赋值为变量 `match`。这个正则表达式查找以 .vue 结尾的文件名。

正则表达式的括号里，最前面有一个 ^ 符号，表示是[一个反向字符集](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-negated-character-set)：

> 一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。

因此，`match` 将会是任何值，除了值为斜杠或反斜杠（用两个反斜杠是因为第一个是用来转义的）。如果 `match` 值存在，变量 `name` 被赋值为 `match[1]`。

如果有困惑的话，不妨看下 [`match` 方法的返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)：

> 如果有正则表达式匹配到了某字符，它将会返回数组，这个数组的第一个元素为匹配到字符，其次是符合括号里条件的任何字符。如果什么都没匹配到，返回 `null`。

所以，返回数组的第一个元素是匹配到的整个字符，第二个元素是仅仅是[括号的子字符串匹配](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#%E4%BD%BF%E7%94%A8%E6%8B%AC%E5%8F%B7%E7%9A%84%E5%AD%90%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D_2)到的。

---

现在，我们回到后面的代码里：

```javascript
return (
  (name ? `<${classify(name)}>` : `<Anonymous>`) +
  (file && includeFile !== false ? ` at ${file}` : '')
)
```

显然，返回的是一个拼接后的字符串。我们一次性的将连接字符串的每个部分。首先，如果 `name` 判断为 true，调用 `classify` 函数（下一章里讲解这个函数），传的参数为 `name`，拼接尖括号后返回出去。

如果 `name` 强制转换后不为 true，函数 `formatComponentName` 返回 `'<Anonymous>'` 和后面两个选项之一。如果 `file` 判断为 true，且 `includeFiles` 不严格等于 false，然后，拼接 ' at ' 和 `file`。否则，拼接是空字符串。


[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/17-the-classify-function.md)里，我们将简单看一下 `classify` 函数。
