## generateComponentTrace 函数（1）

上一篇中已介绍，如果一个 Vue 实例传递给了 `warn` 函数，就会调用 `generateComponentTrace` 函数来设置变量 `trace` 。上一篇里，我们主要中心放在了 `warn` 函数的具体实现上，忽略了 `generateComponentTrace` 函数。这次，我们将回到 `generateComponentTrace` 函数中：

```javascript
generateComponentTrace = vm => {
  if (vm._isVue && vm.$parent) {
    const tree = []
    let currentRecursiveSequence = 0
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1]
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++
          vm = vm.$parent
          continue
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence]
          currentRecursiveSequence = 0
        }
      }
      tree.push(vm)
      vm = vm.$parent
    }
    return '\n\nfound in\n\n' + tree
      .map((vm, i) => `${
        i === 0 ? '---> ' : repeat(' ', 5 + i * 2)
      }${
        Array.isArray(vm)
          ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
          : formatComponentName(vm)
      }`)
      .join('\n')
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`
  }
}
```

---

默认情况下，`generateComponentTrace` 函数是一个没有任何作用的函数：

```javascript
function noop (a?: any, b?: any, c?: any) {}
// [. . . .]
let generateComponentTrace = (noop: any) // work around flow check
```

---

但是，如果不是在生产环境中的话，`generateComponentTrace` 函数将会赋予其他作用：

```javascript
if (process.env.NODE_ENV !== 'production') {
  // [. . . .]
  generateComponentTrace = function (vm) {
    // [. . . .]
  }
}
```

---

这个函数接收一个参数 `vm` 。然后检查 `vm` 是不是一个 Vue 实例。你应该还记得在 `Vue.prototype._init` 中，属性 `._isVue` 被设置为 `true` ：

```javascript
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // [. . . .]
    // a flag to avoid this being observed
    vm._isVue = true
    // [. . . .]
  }
}
```

然后检查 `vm.$parent` 经过强制类型转换后是否为 `true`。因为这是我们第一次介绍 `vm.$parent`，那就让我们好好熟悉下它。[Vue.js API](https://vuejs.org/v2/api/#vm-parent) 对我们很有帮助，API 里解释了： `vm.$parent` 是 Vue 实例的一个属性，表示“父实例，如果当前实例有的话。”当父实例作为属性时，API 中解释为：

> 在两个组件之间建立父子关系。子组件可以通过 `vm.$parent` 来访问父组件，子组件将被追加到父组件的 `$children` 数组里。

我们将会在讨论 `initLifecycle` 函数时，深入探讨下父子组件关系，以及如果通过 `$parent` 访问父组件。这里我们只需要知道这个语句检查了 Vue 实例是否存在一个 `$parent` 属性。

---

如果以上条件都满足了，`generateComponentTrace` 函数会先初始化一个变量 `tree`，并赋值为一个空数组，然后定义一个 `currentRecursiveSequence` 变量，设置为0。

`while` 循环看起来有点奇怪？这个循环怎么停止呢？`vm` 如何变为其他值，而不再是 `vm`？答案在循环的结尾处。每一次循环结尾，Vue 实例被放到 `tree` 数组里，`vm` 设置为当前实例的父实例。

```javascript
while (vm) {
  // [ . . . .]
  tree.push(vm)
  vm = vm.$parent
}
```

换句话说，这个循环不断递归 Vue 实例的 `.$parent` 属性，直到某一实例不存在 `.$parent` 属性时。

所以，我们继续看循环的内部吧。首先，检查 `tree` 数组的长度是否大于0，如果大于0，设置变量 `last` 为数组的最后一个元素。因为在 Javascript 中，数组是零基础（zero based）的——即数组的索引从0开始——一个数组的长度总是比数组最后一项的索引大1。因此你可以通过数组长度减1的索引拿到数组的最后一项：

```javascript
const last = tree[tree.length - 1]
```

接下来，检查下 `last.constructor` 是否严格等于 `vm.constructor`。如果是，`currentRecursiveSequence` 自增一次，且 Vue 实例被赋值为它的父实例，`continue` 语句“终止循环中的当前迭代，继续执行循环的下一次迭代”。

```javascript
  currentRecursiveSequence++
  vm = vm.$parent
  continue
```

换句话说，在 `continue` 之后，下面语句不会执行：

```javascript
tree.push(vm)
vm = vm.$parent
```

如果 `last.constructor`严格等于 `vm.constructor` 不成立，且 `currentRecursiveSequence` 大于0，`tree` 的最后一项设置为一个带有两个元素的数组：`last` 和 `currentRecursiveSequence`，`currentRecursiveSequence` 重置为0：

```javascript
} else if (currentRecursiveSequence > 0) {
  tree[tree.length - 1] = [last, currentRecursiveSequence]
  currentRecursiveSequence = 0
}
```

最后，Vue 实例被追加到 `tree` 中——正如前面提过的——Vue 实例重赋值为 Vue 实例的属性 `.$parent` 的值：

```javascript
tree.push(vm)
vm = vm.$parent
```

这个循环结束时，是在某一实例不存在 `.$parent` 属性时。

接下来，将是一个冗长的返回语句，我们将在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/13-the-generateComponentTrace-function-2.md)里讲解。
