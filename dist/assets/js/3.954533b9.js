(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{175:function(t,s,e){"use strict";e.r(s);var n=e(0),a=Object(n.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("p",[t._v("新的 Vue 实例是用 Vue 构造函数来创建的：")]),t._v(" "),t._m(2),e("p",[t._v("一个对象的构造函数是创建其他对象的基本。按照约定，对象构造函数通常以一个大写字母开头：")]),t._v(" "),t._m(3),t._m(4),t._v(" "),t._m(5),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line/blob/master/docs/02-the-initMixin-function.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("下一章"),e("OutboundLink")],1),t._v("，我们聊聊 "),e("code",[t._v("initMixin")]),t._v(" 这个函数。")])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"vue-的构造函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-的构造函数","aria-hidden":"true"}},[this._v("#")]),this._v(" Vue 的构造函数")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("研究 "),e("code",[t._v("Vue.js")]),t._v(" 源码时，最合理的切入点就是 "),e("code",[t._v("Vue")]),t._v(" 的实例。如 "),e("code",[t._v("Vue.js")]),t._v(" 的教程所说的那样，“每个 Vue 应用都是通过 "),e("code",[t._v("Vue")]),t._v(" 函数创建一个新的 "),e("strong",[t._v("Vue 实例")]),t._v("开始的。”")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Vue")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("evn"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NODE_ENV")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'production'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("instanceof")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("warn")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Vue is a constructor and should be called with the `new` keyword'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("_init")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("Vue")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("通过 "),s("code",[this._v("new")]),this._v(" 关键字来调用一个构造函数。例如，你可以通过下面的方式来调用 "),s("code",[this._v("Vue")]),this._v(" 构造函数：")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-javascript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" vm "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Vue")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// options")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("调用一个对象的构造函数后返回一个新的对象，并设置一个 "),s("code",[this._v("this")]),this._v(" 关键字指向该对象的返回值。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Vue")]),this._v(" 对象构造函数用了一个参数：options。在函数内部，通过 "),s("code",[this._v("if")]),this._v(" 语句来检测当前环境不是生成环境。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果当前环境是生成环境，因为有 "),s("code",[this._v("&&")]),this._v(" 这个逻辑与运算符，表达式的后半部分就不用考虑了，整个表达式的值即为 "),s("code",[this._v("false")]),this._v("。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("若当前环境为开发环境，构造函数就会用 "),s("code",[this._v("instanceof")]),this._v(" 检查 "),s("code",[this._v("this")]),this._v(" 是否是 "),s("code",[this._v("Vue")]),this._v(" 的实例。")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("若在开发环境，且 "),e("code",[t._v("this")]),t._v(" 不是 "),e("code",[t._v("Vue")]),t._v(" 的实例，就会调用 "),e("code",[t._v("warn")]),t._v(" 函数，并传一个字符串作为参数，以提示开发者调用构造函数需要用 "),e("code",[t._v("new")]),t._v(" 关键字。参数里，在单引号 '' 里用了一个反引号 ` ，有个很明显的好处，就是防止引号过早地结束。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("最后，"),s("code",[this._v("Vue")]),this._v(" 构造函数调用了 "),s("code",[this._v("this._init")]),this._v(" 方法，并把构造函数的参数 options 作为自己的参数。")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("等等， "),e("code",[t._v("this")]),t._v(" 在哪定义的 "),e("code",[t._v("_init")]),t._v(" 方法？其实，这不是对象构造函数内定义的函数调用。快速看下源码会发现，"),e("code",[t._v("_init")]),t._v(" 方法在一个单独的 "),e("code",[t._v("initMixin")]),t._v(" 函数里，被添加到 Vue 的原型上- "),e("code",[t._v("Vue.prototype")]),t._v("。")])}],!1,null,null,null);s.default=a.exports}}]);