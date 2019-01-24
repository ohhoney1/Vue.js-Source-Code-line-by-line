## 逐行级分析 Vue 源码

[在线查看](https://ohhoney1.github.io/Vue.js-Source-Code-line-by-line/)

这个仓库翻译自“逐行级深入探究 Vue.js 源码”系列文章，地址：[文章地址](https://medium.com/@oneminutejs/a-deep-dive-in-the-vue-js-source-code-0-table-of-contents-170dcc3c8ec)，已经过作者本人同意。目的也是为了巩固、学习 `JavaScript` 和 `Vue` 相关的知识点。

> 这个系列的文章都是详细地分析 `Vue.js` 的源码，以说明一些基本的 `JavaScript` 概念。文章讲述一些 `JavaScript` 概念时，尽量以一种对初学者友好的方式。查看这篇[更新计划](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/05-update-plan.md)，获取本系列文章的后续计划和方向等更多信息。

## 目录

1. [Vue 构造函数](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/01-the-vue-object-constructor-function.md)
2. [initMixin 函数](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/02-the-initMixin-function.md)
3. [mergeOptions 函数（1）](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/03-the-mergeOptions-function-1.md)
4. [dedupe 函数](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/04-the-dedupe-function.md)
5. [更新计划](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/05-update-plan.md)
6. [mergeOptions 函数（2）](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/06-the-mergeOptions-function-2.md)
7. [mergeOptions 函数（3）](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/07-the-mergeOptions-function-3.md)
8. [cached 函数](https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/08-the-cached-function.md)
