## initMixin 函数

`._init` 方法定义在 `initMixin` 函数里。在 Vue 对象构造函数被定义后，`initMixin` 等其他一系列函数直接地被调用：

```javascript
initMixin(vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

`initMixin` 函数很简单，参数为 Vue 对象构造函数，并在它的原型上添加一个 `._init` 方法：

```javascript
let uid = 0

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

在函数外部，顶级作用域下，设置一个变量 `uid` ，作为一个增量的计数器。 并在每次创建一个新的 `Vue` 实例且调用 `._init` 方法时，设置为 `Vue` 实例的一个属性。

```javascript
let uid = 0
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    [. . . .]
    // a uid
    vm._uid = uid++
    [. . . .]
  }
}
```

`._init` 方法为 `this` 设置了一个辅助变量。即通过 `vm = this` 来保存 `this` 关键字的当前作用域，以方便后面使用。

接下来，`._init` 方法设置了一个对性能的检查。

```javascript
let startTag, endTag
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  startTag = `vue-perf-start:${vm._uid}`
  endTag = `vue-perf-end:${vm._uid}`
  mark(startTag)
}
```

`._init` 方法声明了两个变量：`startTag` 和 `endTag` 。

---

### Istanbul

然后你会注意到一个奇怪的注释：

```javascript
/* istanbul ignore if */
```

[Istanbul](https://github.com/gotwarlost/istanbul) 是“另一种 JS 代码覆盖率工具，当运行测试时，它可以通过模块加载钩子透明地计算语句、行、函数和分支的覆盖率。”。这个覆盖率提示告诉 `Istanbul` 忽略 `if` 语句。

`if` 语句里第一个检测的是当前环境不是开发环境： `process.env.NODE_ENV !== production`。

然后检测 `config.performance` 是否设置为 `true`。

因为对象 `config` 在其他地方定义，且默认值为 `false`，所以我们将跳到 config.js 文件（src/core/config）。如注释所讲，属性 `object.performance` 的值决定了是否要记录 Vue 的性能：

```javascript
const config = {
  [. . . .]
  /**
   * Whether to record perf
   */
  performance: false,
  [. . . .]
}
```

回到方法 `Vue.prototype._init` 上，if 语句里下一检测是名为 `mark` 的变量。因为在源码里， mark 定义在其他地方，不妨看下（src/core/util/perf）：

```javascript
let mark
let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
```

然而，变量 `mark` 只有在特定的情况下才被定义。首先，我们检查下当前环境是否是浏览器。如果是浏览器的话，又因为 `&&` 连接符把后面的表达式连接一体，所以检查下 `window.performance` 是否存在，若存在，就把它赋值给 `perf` 变量。

为了了解这里到底做了什么，需要我们快速研究下 Window 对象的performance 属性。 据[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance)解释：“Web Performance API 允许网页访问某些函数来测量网页和 Web 应用程序的性能，包括 Performance Timeline API，Navigation Timing API，the User Timing API，the Resource Timing API”。 [`Performance`](https://developer.mozilla.org/en-US/docs/Web/API/Performance) 接口是 `High Resolution Timing API` 的一部分，它可以获取到当前页面中与性能相关的信息。

`Performance` 对象中有一系列方法：`mark` `measure` `clearMarks` 和 `clearMeasures`。

+ `mark`：根据给出 `name` 值，在浏览器的性能输入缓冲区中创建一个相关的`timestamp`
+ `measure`：在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 `timestamp`
+ `clearMarks`：将给定的 `mark` 从浏览器的性能输入缓冲区中移除
+ `clearMeasures`：将给定的 `measure` 从浏览器的性能输入缓冲区中

正如 Vue.js 官方文档所说，设置 `Vue.config.performance`  为 `true` 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 `performance.mark` API 的浏览器上。

然后呢，我们来看下变量 mark 的初始化：

```javascript
// ...
mark = tag => perf.mark(tag)
// measure = ...
```

如果 `pref` 对象存在，且含有 `mark` `measure` `clearMarks` `clearMeasures` 方法，那么 Vue 会给变量 `mark` `measure` 赋值个函数。

`mark` 函数的参数为 `tag` ，返回值是在浏览器的性能输入缓冲区中创建一个相关的`timestamp`。

`measure` 同理。在浏览器开发者工具中的 `performance/timeline` 面板里，我们可以通过这个函数获取到性能相关的一些信息。

接着分析 `Vue.prototype._init` 方法。满足了 `if` 里的所有条件后， Vue 对 `startTag` 和 `endTag` 变量赋值，然后把 `startTag` 作为实参调用 `mark` 函数。这就会在浏览器的性能输入缓冲区中创建一个相关的 `timestamp` 。

```javascript
if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  startTag = `vue-perf-start:${vm._uid}`
  endTag = `vue-perf-end:${vm._uid}`
  mark(startTag)
}
```

---

`._init` 接下来在 Vue 实例对象中添加了 `_isVue` 属性，并设置为 `true` ，作一个 flag 以防止被观察到：

```javascript
// a flag to avoid this being observed
vm._isVue = true
```

---

然后，`._init` 方法检测 `options` 是否存在。前面提过，参数 `options` 是在创建一个新的 Vue 实例时传给 Vue 构造函数的——所以，`Vue.prototype` 上的 `._init` 方法里可以访问到此参数。

```javascript
function Vue (options) {
  // ...
  this._init(options)
}
```

在检测过 `options` 是否存在后，`._init` 方法接着校验 `options._isComponent` 是否为 `true` ：

```javascript
if (options && options._isComponent) {
  // optimize internal component instantiation
  // since dynamic options merging is pretty slow, and none of the
  // internal component options needs special treatment.
  initInternalComponent(vm, options)
}
```

在 Vue.js 的源码中，只在一处实例中 `options._isComponent` 设置为了 `true` ——函数 `createComponentInstanceForVnode` 中：

```javascript
function createComponentInstanceForVnode (
  vnode: any, // we know it's MountedComponentVNode but flow doesn't
  parent: any, // activeInstance in lifecycle state
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  return new vnode.componentOptions.Ctor(options)
}
```

后续我们会讲到 `createComponentInstanceForVnode` 函数。先回到 `._init` 方法上，如果传入了 `options` 且 `options._isComponent` 为 `true` ，就会调用 `initInternalComponent` 函数，并传入 `vm`（例如：`this` / Vue 实例） 和 `options` 作为参数。

---

`initInternalComponent` 函数是另一处声明：

```javascript
function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
```

函数 `initInternalComponent` 声明了个 `opts` 变量，又在 Vue 对象上添加了个 `$options` 属性，值都是一个原型 `__proto__` 为 `vm.constructor.options` 的新对象：

```javascript
function initInternalComponent (vm, options) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  [...]
}
```

`initInternalComponent` 函数然后给新对象 `opts` 设置了一系列默认值。如注释所讲，这样比动态枚举的效率高。

最后，在 `options.render` 为 `true` 的情况下，`initInternalComponent` 函数在 `opts` 对象上设置两个和渲染相关的属性。

---

回到 `initMixin` 函数上，如果 `options` 或 `options._isComponent` 有一个为 `false`，`initMixin` 设置个 `$options` 属性，值为 `mergeOptions` 函数的返回结果，`mergeOptions` 有3个参数：
1. 参数为 `vm.constructor` （Vue 实例的构造函数）的 `resolveConstructorOptions` 方法；
2. `options` 或者 一个空对象
3. `vm` （Vue 实例）

```javascript
// ...
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
// ...
```

[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/03-the-mergeOptions-function.md)，继续分析 `initMixin` 函数：研究下 `mergeOptions` 函数。
