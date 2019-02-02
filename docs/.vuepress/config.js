const path = require('path');
const dest = path.resolve(__dirname, '../../dist');

module.exports = {
  title: 'Vue.js-Source-Code-line-by-line',
  description: '逐行级深入探究 Vue.js 源码',
  dest,
  themeConfig: {
    // nav: [
    //   { text: 'Github', link: 'https://github.com/ohhoney1/Vue.js-Source-Code-line-by-line' },
    // ],
    sidebar: [
      ['/', '首页'],
      ['01-the-vue-object-constructor-function', '01. Vue 的构造函数'],
      ['02-the-initMixin-function', '02. initMixin 函数'],
      ['03-the-mergeOptions-function-1', '03. mergeOptions 函数(1)'],
      ['04-the-dedupe-function', '04. dedupe 函数'],
      ['05-update-plan', '05. 更新计划'],
      ['06-the-mergeOptions-function-2', '06. mergeOptions 函数(2)'],
      ['07-the-mergeOptions-function-3', '07. mergeOptions 函数(3)'],
      ['08-the-cached-function', '08. cached 函数'],
      ['09-the-camelize-function', '09. camelize 函数'],
      ['10-the-normalizeProps-function', '10. normalizeProps 函数'],
      ['11-the-warn-function', '11. warn 函数'],
      ['12-the-generateComponentTrace-function-1', '12. generateComponentTrace 函数(1)'],
    ],
    sidebarDepth: 0,
    lastUpdated: '上次更新',
    repo: 'ohhoney1/Vue.js-Source-Code-line-by-line',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
  },
  base: '/Vue.js-Source-Code-line-by-line/'
};
