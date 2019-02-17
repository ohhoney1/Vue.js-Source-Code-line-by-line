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
      ['13-the-generateComponentTrace-function-2', '13. generateComponentTrace 函数(2)'],
      ['14-the-repeat-function', '14. repeat 函数'],
      ['15-the-generateComponentTrace-function-3', '15. generateComponentTrace 函数(3)'],
      ['16-the-formatComponentName-function', '16. formatComponentName 函数'],
      ['17-the-classify-function', '17. classify 函数'],
      ['18-the-warn-function', '18. warn 函数(回顾)'],
      ['19-props-and-normalizeProps', '19. props 和 normalizeProps'],
      ['20-the-isPlainObject-function', '20. isPlainObject 函数'],
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
