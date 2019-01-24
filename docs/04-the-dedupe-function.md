## dedupe 函数

正如注释所说，`dedupe` 函数“比较 latest 和 sealed ，以确保 merge 时，生命周期钩子不会重复”：

```javascript
function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    extended = Array.isArray(extended) ? extended : [extended]
    for (let i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i])
      }
    }
    return res
  } else {
    return latest
  }
}
```

首先，`dedupe` 函数在 `if` 语句中调用 `Array.isArray`，并把 `latest` 作为参数，来检测 `latest` 是否是一个数组。

然后，初始化一个变量 `res` ，值为空数组。

接着，为了确保 `sealed` 是数组，通过调用[三元运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)重置了 `sealed`。如果是数组，`sealed` 设为 `sealed`（例如，`dedupe` 函数的参数 `sealed`）。如果不是数组，就用一个数组包裹下 `sealed`。设置 `extended` 时，也是同 `sealed` 一样。

```javascript
sealed = Array.isArray(sealed) ? sealed : [sealed]
extended = Array.isArray(extended) ? extended : [extended]
```

接下来，`dedupe` 函数遍历 `latest` 数组：调用 `indexOf` 方法来判断 `latest` 数组中的当前项是否在 `extended` 数组中，或者不在 `sealed` 中，如果条件成立，这些选项就会被 `push` （追加）到 `res` 数组里。遍历完后，再返回数组 `res`。

```javascript
for (var i = 0; i < latest.length; i++) {
  if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
    res.push(latest[i])
  }
}
return res
```

然而，如果表达式 `Array.isArray(latest)` 的值为 `false`，`dedupe` 函数返回 `latest` 。

---

跳到 `resolveModifiedOptions` 函数，现在我们理解了通过遍历构造函数的选项属性，判断哪些选项被更改了，如果被更改了，映射一个更改项的对象，并且返回出去。

```javascript
for (const key in latest) {
  if (latest[key] !== sealed[key]) {
    if (!modified) modified = {}
    modified[key] = dedupe(latest[key], extended[key], sealed[key])
  }
}
return modified
```

最后，我们回到 `resolveConstructorOptions` ，这个函数在初始化 `modifiedOptions` 变量时，通过传给 `resolveModifiedOptions` 函数一个构造函数作为参数设置变量的值。


```javascript
function resolveConstructorOptions (Ctor) {
  // ...
  const modifiedOptions = resolveModifiedOptions(Ctor)
  // ...
}
```

因此，`modifiedOptions` 的值将是一个被更改过的选项 `options` 的对象。

---

`resolveConstructorOptions` 函数然后检测下是否有选项被更改了，如果更改了，调用我们之前讨论过的 `extend` 函数，所传参数为构造函数的 `extendOptions` 属性和 `modifiedOptions` 变量。回一下，`extend` 函数遍历第二个参数，这里就是 `modifiedOptions`，然后把第二个参数的每个键的值设置为第一个参数对应键的值。

再次调用 `mergeOptions` ，并把返回值设置给 `options` 和 `Ctor.options`。

然后，检查 `options.name` 是否为 `true` 。如果为真，把 `options.components` 上名为 `options.name` 的属性设置为构造函数 `Ctor` 。最后，把变量 `options` 返回。

```javascript
function resolveConstructorOptions (Ctor) {
  // ...
  options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
  if (options.name) {
    options.components[options.name] = Ctor
  }
  return options
}
```

---

在这些基础上，最后我们可以返回到 `._init` 方法中。`._init` 方法通过调用 `mergeOptions` 函数，并传3个参数，设置了一个 `$options` 属性：

```javascript
// ...
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
// ...
```

在以上的讨论中，现在我们理解了传给 `mergeOptions` 函数的第一个参数：`resolveConstructorOptions(vm.constructor)` 。在[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/06-the-mergeOptions-function(2).md)，我们将更详细的讨论 `mergeOptions` 方法。

