## mergeOptions 函数（1）

先回顾下，在声明 Vue 对象构造函数是，直接调用 `initMixin` 函数，并把 Vue 作为参数：

```javascript
initMixin(Vue)
```

`initMixin` 是个很简单的函数：把 Vue 作为参数，并在自己的原型上添加了个 `._init` 方法。

```javascript
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    [. . . .]
  }
}
```

上篇文章里，我们分析了 `Vue.prototype` 上的 `._init` 方法：

+ 给 `this` 设置一个辅助变量 `vm`
+ 每当 `._init` 方法被调用时，添加一个自增的变量 `.uid` ，并设置为 Vue 实例的属性
+ 在特定条件下，增加一个性能检查。这个检查会返回一个时间戳，且在浏览器的输入缓冲性能处，有个基于 `.uid` 的独特标记。
+ 如果 Vue 对象构造函数中 `options` 对象传给了，且 `options` 的属性 `.isComponent` 为 `true` ，那么就会调用 `initInternalComponent` 函数。

---

再看 `else` 语句，如果 `options` 未传递给 Vue 对象构造函数或者属性 `.isComponent` 为 `false` ，设置个 `$options` 属性，值为 `mergeOptions` 函数的返回结果：

```javascript
[. . . .]
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
```

### resolveConstructorOptions 函数

函数 `resolveConstructorOptions` 中的参数为 Vue 的实例，这个函数在代码里的其他地方已经声明过了：

```javascript
function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}
```

参数名 `Ctor` 就是 `constructor` 的缩写。首先，设置了一个 `options` 变量，值为构造函数的一属性 `Ctor.options` 。接着，如果 `Ctor.super` 存在，设置一个 `superOptions` 变量，值为把 `Ctor.super` 作为参数，调用 `resolveConstructorOptions` 方法后的返回结果。

```javascript
function resolveConstructorOptions (Ctor) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    [. . . .]
  }
}
```

---

属性 `super` 在 `initExtend` 函数中定义，这个函数在其他地方（src/core/global-api/extend.js）中定义的。`initExtend` 把 Vue 作为参数，并定义了一个 `extend` 方法，作为继承类。

```javascript
export function initExtend (Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}
```

后续的文档中，我们会分析 `initExtend` 函数。现阶段，知道 `super` 提供了简单的访问链以进行继承就足够了。

---

接着，为构造函数的属性 `superOptions` 设置了一个变量 `cachedSuperOptions` 。`superOptions` 也是定义在 Vue.extend 方法里。

正如注释所讲，`superOptions` 是从扩展（例如，当 `Vue.extend` 被调用时）中设置的 `Super` 继承 `options` 的副本。因此，下一个对此中，检测了从扩展到实例化的变化。

```javascript
if (superOptions !== cachedSuperOptions) {
  // super option changed,
  // need to resolve new options.
  Ctor.superOptions = superOptions
  // check if there are any late-modified/attached options (#4976)
  const modifiedOptions = resolveModifiedOptions(Ctor)
  // update base extend options
  if (modifiedOptions) {
    extend(Ctor.extendOptions, modifiedOptions)
  }
  options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
  if (options.name) {
    options.components[options.name] = Ctor
  }
}
```

如果在扩展到实例化的过程中 `options` 变化了，设置构造函数的 `superOptions` 属性为变量 `superOptions` ，来处理新的 `options` 。

接着，函数 `resolveModifiedOptions` 检测是否有一些后期修改或附件选项。为此，变量 `modifiedOptions` 的值为把 `Ctor` 作为参数，调用 `resolveModifiedOptions` 方法后的返回结果。

```javascript
function resolveConstructorOptions (Ctor) {
  [. . . .]
  const modifiedOptions = resolveModifiedOptions(Ctor)
  [. . . .]
}
```

---

### resolveModifiedOptions 函数

在代码里做这个检测，是为了修复这个 [issue #4976](https://github.com/vuejs/vue/issues/4976)。为了弄明白这里发生了什么，不妨看下相应的问题报告。“我发现在核心库里，会出现偶尔丢弃了为构造函数后期注入的 options  的一个问题。这意味着，如果我们使用 vue-hot-reload-api 或者 vue-loader ，在创建组件构造函数后，它们会给组件的 options 注入一些 options ，然后组件通过使用 `$createElement` 创建的构造函数来实例化，在 `resolveComponentOptions` 函数中那些注入的 `options` 会被丢弃。”

`resolveModifiedOptions` 把构造函数 `Ctor` 作为参数：

```javascript
function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const extended = Ctor.extendOptions
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = dedupe(latest[key], extended[key], sealed[key])
    }
  }
  return modified
}
```

`resolveModifiedOptions` 函数声明了一个 `modified` 变量。你可能会注意到，在函数的后面，`modified` 变量是函数的返回值。

`resolveModifiedOptions` 函数初始化3个变量：`latest` `extended` `sealed` 。属性 `extendOptions` 和 `sealedOptions` 都在 Vue.extend 方法中定义。

`extendOptions` 设置为传递给 `Vue.extend` 方法的任何参数。`sealedOptions` 设置为调用 `extend` 方法（而不是 `Vue.extend` 方法）后的返回值，参数为一个空对象和 `Sub.options` 。`extend` 方法在其他处（src/shared/util.js）定义的：

### extend 工具函数

```javascript
/**
 * Mix properties into target object.
 */
export function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
```

这个函数接收两个参数： `to` 和 `_from` 。然后遍历 `_from` 的键，并把 `_from` 的键作为 `to` 的键。最后返回 `to` 。

了解过 `extend` 函数后，我们可以理解当表达式 `Sub.sealedOptions = extend({}, Sub.options)` 的意思了。`extend` 函数遍历 `Sub.options` 的所有键，并设置作为第一个参数的键。就我们的目的而言，重要的是要注意到，这发生在扩展 extension 时。

---

现在我们可以理解 `resolveComponentOptions` 中的 `for` 循环了：

```javascript
for (const key in latest) {
  if (latest[key] !== sealed[key]) {
    if (!modified) modified = {}
    modified[key] = dedupe(latest[key], extended[key], sealed[key])
  }
}
```

遍历构造函数的属性 `options` 以检测它的每一项是否和 `sealed` 有不同——键在扩展时创建的。如果有任一键是不同的，这个函数就会创建一个 `modified` 对象，并会把的调用参数为 `latest[key]` `extended[key] `sealed[key]` 的  `dedupe` 方法后的结果赋值给 `modified[key]` 。

`dedupe` 函数定义在其他处，在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/04-the-dedupe-function.md)我们会分析下它。
