## mergeOptions 函数（2）

现在，我们继续回到 `mergeOptions` 函数，正如注释所讲的，这个函数“把两个参数对象合并成一个”：

```javascript
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

首先，`mergeOptions` 函数检查当前环境以确定不是在生成环境中。如果不是在生成环境下，调用 `checkComponents` 函数，并把child作为参数。

---

### checkComponents 函数

`checkComponents` 函数通过枚举参数 `options` 的 `components` 属性，并在每次遍历时调用 `validateComponentName` 方法：

```javascript
function checkComponents (options: Object) {
  for (const key in options.components) {
    validateComponentName(key)
  }
}
```

`validateComponentName` 函数接收组件名作为参数，如果组件名不合法时，会调用 `warn` 函数：

```javascript
export function validateComponentName (name: string) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    )
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    )
  }
}
```

首先，`validateComponentName` 函数会先检查 `name` 参数是否以字母且只包含字母数字的字符开头。在正则表达式中调用 `test` 方法做验证。如果验证失败，拼接一个字符串作为参数，调用 `warn` 函数。

然后，检查参数 `name` 是否是一个内置标签或者是保留标签（调用两个工具函数）：

```javascript
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
```

`isBuiltInTag` 和 `isReservedAttribute` 这两个变量的值都为调用 `makeMap` 函数后的返回值（参数不同）。

### makeMap 函数

`makeMap` 函数建立一个映射对象，并返回一个检测某一键是否在映射对象里的函数：
  + 参数为一个字符串和一个布尔值，
  + 创建一个空对象，
  + 以逗号来分割字符串
  + 遍历分割后的字符串，并在映射对象中设置当前项为键，值为 true 。

如果 `expectsLowerCase` 为 true，`makeMap` 返回一个函数，这个函数可以判断一个值小写后，是否为映射对象的某一个键。否则，返回的函数是判断当前这个值为否为映射对象的某一个键。

[下一章](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/07-the-mergeOptions-function(3).md)，我们将继续讲解 `mergeOptions` 函数。
