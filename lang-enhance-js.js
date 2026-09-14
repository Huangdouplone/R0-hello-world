/* ============================================================
 * 课程深化补充数据：JavaScript
 * 挂载：window.LESSON_EXTRA[课程id] = {out, deep:[...], recap}
 * ============================================================ */
window.LESSON_EXTRA = window.LESSON_EXTRA || {};
Object.assign(window.LESSON_EXTRA, {
"js-1-1":{out:"Hello, JavaScript!\n你好，JS!",deep:["JS 由 Brendan Eich 于 1995 年在 10 天内设计完成，最初叫 Mocha，后改名 LiveScript，最终定名 JavaScript。","浏览器内核：Chrome 的 V8 引擎、Firefox 的 SpiderMonkey、Safari 的 JavaScriptCore。","ES6（2015）是现代 JS 的分水岭：箭头函数、class、let/const、模板字符串、Promise 都来自 ES6。"],recap:"JS = 浏览器原生语言 + Node.js 后端，ES6+ 是现代标准。"},
"js-1-2":{out:"age = 26\n(无输出，代码只声明变量)",deep:["const 并非「常量」——它只是不能重新赋值绑定，但 const 对象的属性仍可修改。","TDZ（暂时性死区）：let/const 声明前访问会 ReferenceError，而 var 会得到 undefined。","块级作用域：{} 内的 let/const 在外部不可见；var 只在函数级作用域。"],recap:"默认 const，需要重新赋值才用 let；var 已过时。"},
"js-1-3":{out:"true\nfalse\nobject",deep:["== 的隐式转换规则：null == undefined 为 true，但与其他都为 false。","typeof null 返回 'object' 是历史 bug，永远修不好。","NaN 是唯一一个不等于自身的值——用 Number.isNaN(x) 判断。"],recap:"永远用 === 比较；typeof 有 null/array 两个坑。"},
"js-1-4":{out:"Hello, World! 2024\n1000",deep:["模板字符串支持嵌套插值——但过度嵌套会影响可读性。","运算符优先级：**（幂）高于 * / 高于 + -；== 低于比较运算符。","逗号运算符 , 会先求值左边再返回右边——业务代码避免使用。"],recap:"模板字符串 = 反引号 + ${}；注意 + 拼接 vs 加法的区别。"},
"js-2-1":{out:"B\n优秀",deep:["switch 的 case 如果没有 break 会「穿透」到下一个 case。","三元运算符可以嵌套，但超过两层建议改用 if 可读性更好。","Falsy 值：false, 0, '', null, undefined, NaN——其他都是 truthy。"],recap:"多分支用 if/else；switch 记得 break。"},
"js-2-2":{out:"0\n1\n2\n0 10\n1 20",deep:["for...in 遍历的是键名（字符串），包括原型链上的属性——遍历数组用 for...of。","break label 可以跳出多层循环：outer: for(...) { break outer; }。","forEach 不能 break；需要中断用 for...of 或 some()/every()。"],recap:"遍历数组用 for...of；for...in 只用于对象键。"},
"js-2-3":{out:"5\n6\nHi, Tom!",deep:["箭头函数没有 arguments——用 ...rest 参数代替。","箭头函数不能作为构造函数（new 会报错），也没有 prototype。","普通函数的 this 由调用方式决定；箭头函数继承定义时的 this。"],recap:"回调/短函数用箭头函数；需要 this 或 arguments 时用普通函数。"},
"js-2-4":{out:"1\n2",deep:["闭包的本质是函数对象在创建时记录了它词法作用域的引用。","循环中 var + setTimeout 是经典坑——用 let 或 IIFE 解决。","闭包会导致外部变量无法被 GC——不需要时手动置 null。"],recap:"闭包 = 函数记住了定义时的环境；小心内存泄漏。"},
"js-3-1":{out:"[2,4,6,8,10]\n[2,4]\n15",deep:["map/filter 返回新数组，不修改原数组——这是函数式编程的核心。","reduce 的初始值很重要：不传初始值时第一个元素作为初始值。","flat/flatMap：flat(Infinity) 拍平任意层级；flatMap = map + flat(1)。"],recap:"map 变换、filter 筛选、reduce 聚合——数组三板斧。"},
"js-3-2":{out:"Alice\n['name','age','city']\n['Alice',25,'Beijing']",deep:["对象键会自动转字符串——obj[1] 和 obj['1'] 是同一个键。","Object.freeze 浅冻结（嵌套对象仍可改）；深冻结需要递归。","Map 比普通对象更灵活：键可以是任意类型，且保持插入顺序。"],recap:"普通对象当字典用；需要非字符串键或有序遍历用 Map。"},
"js-3-3":{out:"1 2\nBob 25\n[1,2,3,4]\n{a:1,b:2}",deep:["对象展开是浅拷贝——obj1 = {...obj2} 只复制第一层，嵌套对象仍共享引用。","解构默认值：const {name = '匿名'} = obj。","数组解构可以跳过元素：const [a,,c] = arr。"],recap:"解构提取，展开复制合并；注意浅拷贝陷阱。"},
"js-3-4":{out:"{\"name\":\"Tom\",\"score\":95}\nTom 95",deep:["JSON 不支持 undefined/Function/Symbol——序列化时这些键会被忽略。","Date 会序列化成字符串，反序列化后需要 new Date(str)。","localStorage 只能存字符串，且同源策略限制。"],recap:"JSON.stringify/parse + localStorage 是前端持久化标配。"},
"js-4-1":{out:"（标题变为新标题，文字变红）",deep:["innerHTML 有 XSS 风险——插入用户输入的内容时必须先转义。","textContent 只插入文本，浏览器不会解析其中的 HTML。","classList.toggle(name, force) 第二个参数可控制添加/移除。"],recap:"改文本用 textContent；加 class 用 classList。"},
"js-4-2":{out:"点击了 [object HTMLButtonElement]",deep:["事件冒泡：子元素事件会向上传播到父元素——e.stopPropagation() 阻止。","事件委托利用冒泡：在父元素上监听，通过 e.target 判断实际点击。","addEventListener 第三个参数 true 表示在捕获阶段触发。"],recap:"动态元素用事件委托；e.target 是实际触发元素。"},
"js-4-3":{out:"输入: hello\n（表单不刷新）",deep:["input 事件每次按键触发；change 在失焦或回车时触发。","FormData 自动收集表单字段——包括文件上传。","checkbox/radio 的值用 e.target.checked 获取。"],recap:"e.preventDefault() 阻止默认提交；input 事件实时获取。"},
"js-4-4":{out:"1秒后\n（每500ms输出一次，3次后停止）",deep:["setTimeout(0) 不是立刻执行——它把回调放入任务队列，等同步代码执行完。","setInterval 不保证精确——回调执行时间长会堆叠；用递归 setTimeout 更可控。","debounce（防抖）：停止输入后执行一次；throttle（节流）：固定间隔执行。"],recap:"延时用 setTimeout；重复用 setInterval；记得 clear。"},
"js-5-1":{out:"成功!",deep:["Promise 一旦状态改变不可逆——不能从 fulfilled 变回 pending。",".then 可以链式调用，每个 then 返回新的 Promise。","Promise.all 全部成功才成功；Promise.race 第一个完成就返回。"],recap:"Promise 解决回调地狱；then 链是异步代码的主干。"},
"js-5-2":{out:"（异步数据加载完成）",deep:["async 函数总是返回 Promise——return 值会被 Promise.resolve 包装。","await 会暂停函数执行，但不阻塞主线程——事件循环可以处理其他任务。","for await...of 可以遍历异步迭代器（如流）。"],recap:"async/await 让异步代码看起来像同步；try/catch 捕获错误。"},
"js-5-3":{out:"（返回 JSON 数据）",deep:["fetch 的 404/500 不会 reject——要检查 res.ok。","POST 请求要手动设置 Content-Type: application/json。","fetch 默认不带 cookies——需要 credentials: 'include'。"],recap:"fetch + async/await + res.ok 检查三件套。"},
"js-5-4":{out:"解析失败: ...\n清理工作",deep:["try/catch 可以捕获同步错误和 await 的异步错误。","throw 抛出的错误必须在某个 try/catch 中被捕获。","finally 无论是否异常都执行——适合清理资源。"],recap:"await 必须在 try/catch 中；finally 做清理。"},
"js-6-1":{out:"Hi, I'm Alice",deep:["class 是原型继承的语法糖——typeof class 返回 function。","constructor 在 new 时自动调用；this 指向新创建的实例。","类字段可以直接声明：class A { x = 1 } 而不是在 constructor 里赋值。"],recap:"class = 语法糖；constructor 初始化；this 指向实例。"},
"js-6-2":{out:"Hi, I'm Alice, grade A",deep:["extends 实现继承；super 调用父类构造或方法。","子类 constructor 必须先调用 super() 才能使用 this。","方法重写：子类定义同名方法即覆盖父类。"],recap:"extends + super 实现继承；多态通过父类引用调用。"},
"js-6-3":{out:"3",deep:["ESM 中 import 是编译时静态分析——不能动态拼接路径（除非用 import()）。","tree-shaking：未使用的 export 在打包时会被移除。","CommonJS（require）和 ESM（import）不能混用。"],recap:"import/export 是现代模块系统；默认导出 vs 命名导出。"},
"js-6-4":{out:"1\n1",deep:["IIFE（立即执行函数）在 ES6 之前用来创建模块作用域。","现代 ES Module 天然有模块作用域——IIFE 模块模式已过时。","模块模式的价值：封装私有变量，只暴露公共 API。"],recap:"闭包 + IIFE = 旧版模块；现在用 ESM。"},
"js-7-1":{out:"dark",deep:["localStorage 永久保存，除非用户清除或代码 removeItem。","sessionStorage 关闭标签页即清除。","存储大小约 5MB——存大文件用 IndexedDB。"],recap:"localStorage 存设置；sessionStorage 存临时状态。"},
"js-7-2":{out:"（URL 参数）",deep:["history.pushState 不刷新页面——配合 popstate 事件实现 SPA 路由。","URLSearchParams 是标准 API，比手动解析字符串可靠。","location.reload() 刷新；location.href = '...' 跳转。"],recap:"URLSearchParams 读参数；pushState 改 URL 不刷新。"},
"js-7-3":{out:"（动画帧回调）",deep:["rAF 在屏幕下次重绘前执行——通常 60fps。","页面不可见时 rAF 自动暂停——省电。","与 CSS transition/animation 相比，rAF 适合程序化动画。"],recap:"动画用 rAF；UI 过渡用 CSS transition。"},
"js-7-4":{out:"（POST 请求成功）",deep:["POST body 必须是字符串——对象用 JSON.stringify。","GET 参数拼在 URL 上；POST 数据在 body 中。","Headers 对象设置 Content-Type、Authorization 等。"],recap:"POST + JSON.stringify + Content-Type 三件套。"},
"js-8-1":{out:"（安装成功）",deep:["package.json 的 dependencies 是生产依赖；devDependencies 是开发依赖。","npm ci 严格按 package-lock.json 安装——CI/CD 中推荐。","npx 可以直接运行包而不全局安装。"],recap:"npm init → npm install → package.json 追踪依赖。"},
"js-8-2":{out:"（声明式 vs 命令式）",deep:["React 的核心思想：状态 → UI；状态变化时框架自动 diff DOM。","Vue 用响应式系统追踪依赖；Svelte 在编译时优化。","框架不是万能的——小项目原生 JS 更直接。"],recap:"声明式 = 描述结果；框架负责怎么更新 DOM。"},
"js-8-3":{out:"（控制台分级输出）",deep:["console.table 以表格形式打印对象数组——调试时非常直观。","console.time/console.timeEnd 测量代码执行时间。","debugger 语句在 DevTools 打开时自动断点。"],recap:"console.table 看数据；console.time 测性能；debugger 断点。"},
"js-8-4":{out:"（防抖后的搜索结果）",deep:["防抖：停止输入后等待 N 毫秒执行一次——适合搜索框、resize。","节流：每 N 毫秒最多执行一次——适合 scroll、mousemove。","requestAnimationFrame + IntersectionObserver 是现代性能优化利器。"],recap:"高频事件必须防抖/节流；先测量再优化。"}
});
