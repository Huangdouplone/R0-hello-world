/* JavaScript curriculum for R0:hello world */
window.LANG_DATA = window.LANG_DATA || {};
window.LANG_DATA.js = {
stages:[
{id:"js-s1",icon:"🚀",name:"启航与环境",desc:"认识 JavaScript、浏览器与 Node.js",lv:"basic",
goal:"跑通第一行 JS，理解浏览器控制台与 Node.js 两种运行环境。",
links:[["MDN JavaScript 教程","https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"],["现代 JavaScript 教程","https://zh.javascript.info/"]],
lab:{t:"环境自检与自我介绍",req:["在浏览器控制台打印你的昵称","在 Node.js 中用 console.log 打印当前版本","写一个 .js 文件并在终端运行"],starter:`// intro.js\nconsole.log("Hello, JavaScript!");`,hint:"浏览器按 F12 打开控制台；Node.js 用 node intro.js 运行。",xp:20},
lessons:[
{id:"js-1-1",title:"认识 JavaScript：网页的灵魂",min:8,summary:["JavaScript 是 Web 的编程语言，运行在浏览器中，也可通过 Node.js 在服务器运行。","能让网页动起来：交互、动画、表单校验、API 请求。","ES6+ 是现代 JS 标准，掌握箭头函数、let/const、模板字符串等。"],code:`// 第一行 JS
console.log("Hello, JavaScript!");
alert("你好，JS!");`,pit:"不要把 JS 和 Java 搞混——它们除了名字几乎没有关系。",ex:{q:"JS 主要运行在哪里？",a:"主要在浏览器中运行；Node.js 让它也能运行在服务器。"},target:"能在浏览器控制台和 Node.js 中各运行一行 JS。"},
{id:"js-1-2",title:"变量：let、const 与 var",min:10,summary:["let 声明可变变量，const 声明常量（推荐默认用 const）。","var 是旧写法，有函数作用域提升问题，现代代码应避免。","块级作用域：let/const 在 {} 内有效，var 只在函数内有效。"],code:`let age = 25;
const name = "Alice";
age = 26; // OK
// name = "Bob"; // TypeError: 不能重新赋值 const`,pit:"const 声明的对象/数组内部属性仍可修改——const 保护的是绑定，不是值。",ex:{q:"什么时候用 let，什么时候用 const？",a:"默认用 const；只有需要重新赋值时才用 let。"},target:"能正确使用 let/const 声明变量。"},
{id:"js-1-3",title:"数据类型与类型转换",min:10,summary:["原始类型：string、number、boolean、null、undefined、symbol、bigint。","引用类型：Object（Array、Function、Date 等）。","== 会做隐式转换，=== 严格比较——永远用 ===。"],code:`const n = 42;
const s = "42";
console.log(n == s);  // true（隐式转换）
console.log(n === s); // false（类型不同）
console.log(typeof null); // "object"（历史 bug）`,pit:"0、''、null、undefined、NaN 都是 falsy；空数组 [] 和空对象 {} 是 truthy。",ex:{q:"为什么推荐用 === 而不是 ==？",a:"== 的隐式转换规则反直觉（如 null == undefined 为 true 但 null === undefined 为 false），=== 更安全可预测。"},target:"能区分原始类型与引用类型，正确使用 ===。"},
{id:"js-1-4",title:"模板字符串与运算符",min:8,summary:["模板字符串用反引号，支持 ${} 插值和多行字符串。","算术运算符：+ - * / % **（幂）。","比较与逻辑：=== !== > < && || !。"],code:`const name = "World";
console.log(\`Hello, \${name}!
这是多行字符串\`);
const a = 10, b = 3;
console.log(a ** b); // 1000`,pit:"+ 在数字间是加法，在字符串间是拼接；'5' + 3 = '53'，'5' - 3 = 2。",ex:{q:"如何在字符串中插入变量？",a:"用模板字符串：\\`Hello, \\${name}\\`，比 'Hello, ' + name 更清晰。"},target:"能用模板字符串拼接字符串，理解常见运算符。"}
],
quiz:[
{q:"声明不会重新赋值的变量应该用？",o:["var","let","const","function"],a:2,why:"const 声明常量，防止意外重新赋值。"},
{q:"严格相等运算符是？",o:["=","==","===","!=="],a:2,why:"=== 同时比较值和类型，避免隐式转换陷阱。"},
{q:"模板字符串用什么符号？",o:["单引号","双引号","反引号","括号"],a:2,why:"反引号 ` 支持 ${} 插值和多行。"}
]},
{id:"js-s2",icon:"🔢",name:"控制流与函数",desc:"条件、循环、箭头函数与作用域",lv:"basic",
goal:"能写条件分支和循环，理解函数定义与箭头函数的区别。",
links:[["MDN 控制流","https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"]],
lab:{t:"BMI 计算器",req:["用 prompt 获取身高和体重","计算 BMI 并根据区间输出评价","用模板字符串拼接结果"],starter:`const h = parseFloat(prompt("身高(m): "));
const w = parseFloat(prompt("体重(kg): "));
// 计算 BMI`,hint:"parseFloat 把字符串转数字；toFixed(1) 保留一位小数。",xp:20},
lessons:[
{id:"js-2-1",title:"if/else 与 switch",min:8,summary:["if/else if/else 做条件分支。","switch 做多值匹配，记得 break。","三元运算符 condition ? a : b 用于简单选择。"],code:`const score = 85;
if(score >= 90) console.log("A");
else if(score >= 80) console.log("B");
else console.log("C");
const level = score >= 60 ? "及格" : "不及格";`,pit:"switch 忘记 break 会穿透到下一个 case；用 default 处理兜底。",ex:{q:"if 和 switch 怎么选？",a:"2-3 个区间用 if；固定值多分支用 switch。"},target:"能用 if/else 实现多分支逻辑。"},
{id:"js-2-2",title:"循环：for、while、for...of",min:10,summary:["for 循环用于已知次数；while 用于条件满足时。","for...of 遍历数组元素；for...in 遍历对象键（不推荐用于数组）。","break 跳出循环，continue 跳过本次。"],code:`for(let i=0;i<3;i++) console.log(i);
const arr=[10,20,30];
for(const v of arr) console.log(v);
let n=0; while(n<3){console.log(n++);}`,pit:"for...in 遍历的是索引字符串而非值，且会遍历原型链属性；数组遍历用 for...of。",ex:{q:"遍历数组用 for...of 还是 for...in？",a:"用 for...of 直接拿到值；for...in 拿到的是字符串索引且可能遍历到意外属性。"},target:"能根据场景选择合适的循环。"},
{id:"js-2-3",title:"函数声明与箭头函数",min:10,summary:["函数声明：function name() {} 有提升。","函数表达式：const f = function() {}。","箭头函数：const f = (a,b) => a+b，不绑定自己的 this。"],code:`// 函数声明
function add(a,b){ return a+b; }
// 箭头函数
const mul = (a,b) => a*b;
const greet = name => \`Hi, \${name}!\`;
console.log(add(2,3), mul(2,3), greet("Tom"));`,pit:"箭头函数没有自己的 this，它继承外层 this——这在定时器和回调中非常有用，但不能当构造函数。",ex:{q:"箭头函数和普通函数的主要区别？",a:"箭头函数不绑定自己的 this、arguments，不能 new，没有 prototype。"},target:"能用箭头函数写简洁的回调。"},
{id:"js-2-4",title:"作用域与闭包入门",min:10,summary:["全局、函数、块三级作用域。","闭包：函数记住了它定义时的词法作用域。","闭包常用于数据私有化和函数工厂。"],code:`function counter(){
  let count = 0;
  return function(){ return ++count; };
}
const c = counter();
console.log(c()); // 1
console.log(c()); // 2`,pit:"闭包会持有外部变量引用，可能导致内存泄漏——不需要时及时解除引用。",ex:{q:"闭包为什么能记住变量？",a:"内部函数引用了外部函数的变量，即使外部函数已返回，变量也不会被回收。"},target:"理解闭包的基本概念。"}
],
quiz:[
{q:"遍历数组元素推荐用？",o:["for...in","for...of","for(;;)","while"],a:1,why:"for...of 直接遍历值，安全且简洁。"},
{q:"箭头函数的特点是？",o:["有自己的 this","没有自己的 this","不能传参","必须有函数名"],a:1,why:"箭头函数继承外层 this，适合回调场景。"},
{q:"跳出当前循环用？",o:["return","break","continue","exit"],a:1,why:"break 立即终止循环；continue 只跳过本次。"}
]},
{id:"js-s3",icon:"📦",name:"数组与对象",desc:"列表、映射、解构与展开",lv:"basic",
goal:"能操作数组和对象，使用解构与展开运算符。",
links:[["MDN 数组","https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array"]],
lab:{t:"待办列表管理器",req:["创建一个 todo 数组","用 push 添加任务、splice 删除任务","用 map 生成 HTML 列表"],starter:`const todos = ["学JS", "写作业"];
// 添加、删除、渲染`,hint:"Array.map 返回新数组；Array.filter 按条件筛选。",xp:20},
lessons:[
{id:"js-3-1",title:"数组常用方法",min:12,summary:["push/pop 末尾增删；shift/unshift 开头增删。","map 变换、filter 筛选、reduce 聚合——函数式三件套。","slice 截取（不改原数组），splice 修改（改原数组）。"],code:`const nums=[1,2,3,4,5];
const doubled = nums.map(n=>n*2);
const evens = nums.filter(n=>n%2===0);
const sum = nums.reduce((a,b)=>a+b,0);
console.log(doubled, evens, sum); // [2,4,6,8,10] [2,4] 15`,pit:"forEach 不能 break；需要中断遍历用 for...of。map/filter 返回新数组，不修改原数组。",ex:{q:"map 和 forEach 的区别？",a:"map 返回新数组（有返回值），forEach 只是遍历（返回 undefined）。"},target:"能用 map/filter/reduce 处理数组。"},
{id:"js-3-2",title:"对象与属性操作",min:10,summary:["对象是键值对集合，键默认是字符串。","点语法 obj.key 或方括号 obj['key']。","Object.keys/values/entries 获取所有键、值、键值对。"],code:`const user = {name:"Alice", age:25, city:"Beijing"};
console.log(user.name); // Alice
console.log(Object.keys(user)); // ["name","age","city"]
console.log(Object.values(user)); // ["Alice",25,"Beijing"]`,pit:"对象键如果有空格或特殊字符必须用方括号：obj['my key']。",ex:{q:"如何遍历对象的所有键值对？",a:"Object.entries(obj).forEach(([k,v]) => ...)。"},target:"能创建和操作对象。"},
{id:"js-3-3",title:"解构与展开",min:10,summary:["数组解构：const [a,b] = arr。","对象解构：const {name,age} = obj。","展开运算符 ... 用于复制数组/对象、合并。"],code:`const [x,y] = [1,2];
const {name,age} = {name:"Bob",age:30};
const arr1=[1,2], arr2=[...arr1,3,4];
const obj1={a:1}, obj2={...obj1,b:2};
console.log(x,y,name,age,arr2,obj2);`,pit:"对象展开是浅拷贝——嵌套对象仍是引用。",ex:{q:"如何不修改原数组添加元素？",a:"const newArr = [...oldArr, newItem]。"},target:"能用解构提取数据，用展开复制合并。"},
{id:"js-3-4",title:"JSON 与序列化",min:8,summary:["JSON.stringify 把对象转 JSON 字符串。","JSON.parse 把 JSON 字符串转回对象。","localStorage 用 JSON 持久化数据。"],code:`const data = {name:"Tom", score:95};
const str = JSON.stringify(data);
console.log(str); // '{"name":"Tom","score":95}'
const obj = JSON.parse(str);
localStorage.setItem("user", str);`,pit:"JSON 不支持 undefined、函数、Symbol——序列化时这些会丢失。",ex:{q:"localStorage 能直接存对象吗？",a:"不能，必须 JSON.stringify 后存字符串，读取时 JSON.parse。"},target:"能用 JSON 和 localStorage 存取数据。"}
],
quiz:[
{q:"把数组每个元素翻倍用？",o:["forEach","map","filter","reduce"],a:1,why:"map 返回每个元素变换后的新数组。"},
{q:"解构对象 const {name} = user 相当于？",o:["user.name","user[0]","user.name()","new user"],a:0,why:"解构提取同名属性值。"},
{q:"把对象转 JSON 字符串用？",o:["JSON.parse","JSON.stringify","toString","stringify"],a:1,why:"JSON.stringify 序列化，JSON.parse 反序列化。"}
]},
{id:"js-s4",icon:"🌐",name:"DOM 与事件",desc:"操作页面元素、响应用户交互",lv:"basic",
goal:"能选择元素、修改内容、绑定事件。",
links:[["MDN DOM 指南","https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model"]],
lab:{t:"交互式计数器",req:["创建一个显示数字的 <div>","加 + 和 - 按钮，点击更新数字","数字变化时更新页面显示"],starter:`<div id="count">0</div>
<button onclick="inc()">+</button>
<button onclick="dec()">-</button>`,hint:"document.getElementById('count').textContent = 新值。",xp:20},
lessons:[
{id:"js-4-1",title:"选择与修改 DOM",min:10,summary:["document.querySelector('#id') / '.class' / 'tag' 选择元素。","textContent 修改文本；innerHTML 修改 HTML。","classList.add/remove/toggle 操作 CSS 类。"],code:`const el = document.querySelector("#title");
el.textContent = "新标题";
el.classList.add("highlight");
el.style.color = "red";`,pit:"innerHTML 插入用户输入的内容有 XSS 风险——用 textContent 更安全。",ex:{q:"修改元素文本用 textContent 还是 innerHTML？",a:"纯文本用 textContent（安全）；需要插入 HTML 标签才用 innerHTML。"},target:"能选择并修改页面元素。"},
{id:"js-4-2",title:"事件监听",min:10,summary:["addEventListener('click', fn) 绑定事件。","事件对象 e 包含 target、type 等信息。","事件委托：在父元素监听子元素事件。"],code:`const btn = document.querySelector("#btn");
btn.addEventListener("click", function(e){
  console.log("点击了", e.target);
});
// 事件委托
document.querySelector("#list").addEventListener("click", function(e){
  if(e.target.tagName === "LI") console.log("点了", e.target.textContent);
});`,pit:"不要用 onclick 属性绑定多个函数——会覆盖；用 addEventListener。",ex:{q:"为什么用事件委托？",a:"动态添加的子元素不用重新绑定事件，且减少监听器数量。"},target:"能用 addEventListener 处理点击等事件。"},
{id:"js-4-3",title:"表单与输入",min:8,summary:["input/change 事件监听用户输入。","FormData 收集表单数据。","preventDefault() 阻止表单默认提交。"],code:`const input = document.querySelector("#name");
input.addEventListener("input", e => {
  console.log("输入:", e.target.value);
});
form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(data.get("name"));
});`,pit:"input 事件每次按键触发；change 事件在失焦或回车时触发。",ex:{q:"如何阻止表单提交刷新页面？",a:"在 submit 事件中调用 e.preventDefault()。"},target:"能获取表单输入并阻止默认提交。"},
{id:"js-4-4",title:"定时器与异步基础",min:10,summary:["setTimeout(fn, ms) 延时执行一次。","setInterval(fn, ms) 重复执行。","clearTimeout/clearInterval 取消定时器。"],code:`setTimeout(() => console.log("1秒后"), 1000);
let count = 0;
const id = setInterval(() => {
  console.log(++count);
  if(count >= 3) clearInterval(id);
}, 500);`,pit:"setInterval 不保证精确——如果回调执行时间长，会堆叠；用 setTimeout 递归更可控。",ex:{q:"setTimeout(0) 是立刻执行吗？",a:"不是，它把回调放到事件队列，等当前同步代码执行完才运行。"},target:"能用定时器做延时和重复任务。"}
],
quiz:[
{q:"选择 ID 为 title 的元素用？",o:["getElementById","querySelectorAll","querySelector('#title')","A和C都可以"],a:3,why:"两种方式都能选择 ID 元素。"},
{q:"阻止表单默认提交用？",o:["stop()","preventDefault()","return false 就够了","cancel()"],a:1,why:"e.preventDefault() 阻止默认行为。"},
{q:"重复执行任务用？",o:["setTimeout","setInterval","repeat","loop"],a:1,why:"setInterval 按固定间隔重复执行。"}
]},
{id:"js-s5",icon:"⚡",name:"异步编程",desc:"Promise、async/await 与 fetch",lv:"adv",
goal:"能写异步代码，用 fetch 请求 API。",
links:[["MDN Promise","https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise"]],
lab:{t:"天气查询器",req:["用 fetch 请求一个公共 API","用 async/await 获取数据","在页面显示结果"],starter:`async function load(){
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}`,hint:"fetch 返回 Promise，await 等待结果。记得处理错误。",xp:30},
lessons:[
{id:"js-5-1",title:"Promise 基础",min:12,summary:["Promise 表示一个异步操作的最终完成或失败。","三种状态：pending、fulfilled、rejected。",".then 处理成功，.catch 处理失败。"],code:`const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("成功!"), 1000);
});
p.then(result => console.log(result))
 .catch(err => console.error(err));`,pit:"Promise 一旦状态改变就不可逆——不能从 fulfilled 变回 pending。",ex:{q:"Promise 解决了什么问题？",a:"解决回调地狱——链式 .then 让异步代码更易读。"},target:"理解 Promise 三种状态和基本用法。"},
{id:"js-5-2",title:"async/await",min:10,summary:["async 函数总是返回 Promise。","await 暂停执行直到 Promise resolve。","try/catch 捕获异步错误。"],code:`async function fetchData(){
  try{
    const res = await fetch("/api");
    const data = await res.json();
    return data;
  } catch(err){
    console.error("请求失败:", err);
  }
}`,pit:"await 只能在 async 函数内使用（顶层 await 在模块中可用）。",ex:{q:"async 函数和普通函数的区别？",a:"async 函数返回 Promise，内部可以用 await 暂停。"},target:"能用 async/await 写异步逻辑。"},
{id:"js-5-3",title:"fetch API",min:10,summary:["fetch(url) 发起网络请求，返回 Promise。","res.ok 检查是否成功（200-299）。","res.json() / res.text() 读取响应体。"],code:`async function getUser(id){
  const res = await fetch(\`https://api.example.com/users/\${id}\`);
  if(!res.ok) throw new Error("HTTP " + res.status);
  return await res.json();
}`,pit:"fetch 只有网络错误才 reject；404/500 不会 reject——要检查 res.ok。",ex:{q:"fetch 返回 404 会进入 catch 吗？",a:"不会——fetch 只在网络错误时 reject；HTTP 错误要检查 res.ok。"},target:"能用 fetch 请求 API 并处理响应。"},
{id:"js-5-4",title:"错误处理",min:8,summary:["try/catch 捕获同步和异步错误。","throw 主动抛出错误。","finally 无论成功失败都执行。"],code:`try{
  const data = JSON.parse(badJson);
} catch(e){
  console.error("解析失败:", e.message);
} finally {
  console.log("清理工作");
}`,pit:"异步错误用 .catch 或 try/catch(await)；未捕获的 Promise 错误会报 UnhandledPromiseRejection。",ex:{q:"finally 什么时候执行？",a:"无论 try 成功还是 catch 捕获了错误，finally 都执行。"},target:"能正确处理异步错误。"}
],
quiz:[
{q:"Promise 的状态不包括？",o:["pending","fulfilled","rejected","running"],a:3,why:"Promise 只有 pending/fulfilled/rejected 三种状态。"},
{q:"await 必须在什么函数中使用？",o:["普通函数","async 函数","箭头函数","构造函数"],a:1,why:"await 只能在 async 函数内使用。"},
{q:"fetch 返回 404 会？",o:["进入 catch","正常 resolve 但 res.ok 为 false","reject","崩溃"],a:1,why:"HTTP 错误不会 reject fetch，需检查 res.ok。"}
]},
{id:"js-s6",icon:"🏗️",name:"面向对象与模块",desc:"class、原型、ES Module",lv:"adv",
goal:"能用 class 写面向对象代码，理解模块系统。",
links:[["MDN Classes","https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes"]],
lab:{t:"类的封装：购物车",req:["创建 Cart 类，包含 items 数组","addItem/removeItem/getTotal 方法","实例化并测试"],starter:`class Cart {
  constructor(){ this.items = []; }
  addItem(item){ this.items.push(item); }
}`,hint:"this 指向实例；constructor 初始化状态。",xp:30},
lessons:[
{id:"js-6-1",title:"class 与 constructor",min:10,summary:["class 是语法糖，底层仍是原型继承。","constructor 初始化实例。","this 在方法中指向调用对象。"],code:`class Person {
  constructor(name, age){ this.name = name; this.age = age; }
  greet(){ return \`Hi, I'm \${this.name}\`; }
}
const p = new Person("Alice", 25);
console.log(p.greet());`,pit:"class 方法默认不可枚举；this 在独立调用时为 undefined（严格模式）或全局对象。",ex:{q:"new 关键字做了什么？",a:"创建空对象、绑定 this、执行 constructor、返回新对象。"},target:"能定义类并实例化。"},
{id:"js-6-2",title:"继承与 super",min:10,summary:["extends 实现继承。","super 调用父类构造和方法。","方法重写：子类定义同名方法覆盖父类。"],code:`class Student extends Person {
  constructor(name, age, grade){
    super(name, age);
    this.grade = grade;
  }
  greet(){ return super.greet() + ", grade " + this.grade; }
}`,pit:"在子类 constructor 中必须先调用 super() 才能使用 this。",ex:{q:"super() 和 super.method() 的区别？",a:"super() 调用父类构造函数；super.method() 调用父类方法。"},target:"能用 extends 实现继承。"},
{id:"js-6-3",title:"ES Module：import/export",min:8,summary:["export 导出函数/类/变量。","import 导入使用。","ESM 是现代浏览器和 Node.js 的标准模块系统。"],code:`// math.js
export const add = (a,b) => a+b;
export default function(){ return 42; }
// app.js
import add, { add as addFn } from "./math.js";
console.log(add(1,2));`,pit:"module 中默认 this 是 undefined；相对导入路径必须加 .js 扩展名（浏览器中）。",ex:{q:"export default 和 export 的区别？",a:"default 每个模块只能有一个；named export 可以有多个。"},target:"能拆分和导入模块。"},
{id:"js-6-4",title:"闭包与模块模式",min:8,summary:["IIFE（立即执行函数表达式）创建私有作用域。","模块模式：用闭包暴露公共 API、隐藏内部状态。","现代 ES Module 替代了 IIFE 模块模式。"],code:`const counter = (function(){
  let count = 0;
  return {
    inc: () => ++count,
    get: () => count
  };
})();
console.log(counter.inc(), counter.get());`,pit:"闭包中的变量是私有的——外部无法直接访问 count。",ex:{q:"模块模式解决了什么？",a:"创建私有变量，只暴露受控的公共接口。"},target:"理解闭包和模块模式。"}
],
quiz:[
{q:"子类构造函数必须先调用什么？",o:["this()","super()","parent()","init()"],a:1,why:"super() 调用父类构造，之后才能使用 this。"},
{q:"默认导出用？",o:["export","export default","module.exports","exports"],a:1,why:"export default 每模块一个默认导出。"},
{q:"class 本质是什么？",o:["新类型","原型继承的语法糖","接口","结构体"],a:1,why:"JS class 底层仍是原型链。"}
]},
{id:"js-s7",icon:"🎨",name:"Web API 与浏览器",desc:"BOM、存储、动画",lv:"adv",
goal:"了解浏览器提供的 API。",
links:[["MDN Web API","https://developer.mozilla.org/zh-CN/docs/Web/API"]],
lab:{t:"主题切换器",req:["用 localStorage 保存用户选择","切换 CSS 变量改变页面颜色","刷新后恢复选择"],starter:`const btn = document.querySelector("#toggle");
btn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", ...);
};`,hint:"localStorage 持久化；CSS 变量用 document.documentElement.style.setProperty。",xp:30},
lessons:[
{id:"js-7-1",title:"localStorage 与会话存储",min:8,summary:["localStorage 永久存储（除非清除）。","sessionStorage 仅当前会话。","都只能存字符串——对象用 JSON。"],code:`localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
localStorage.removeItem("theme");
// localStorage.clear();`,pit:"隐私模式下 localStorage 可能不可用；存储大小约 5MB。",ex:{q:"localStorage 和 sessionStorage 区别？",a:"localStorage 持久保存；sessionStorage 关闭标签页即清除。"},target:"能用 localStorage 持久化设置。"},
{id:"js-7-2",title:"history 与 location",min:8,summary:["location.href 获取/设置当前 URL。","history.back()/forward()/pushState() 操作历史。","URL 搜索参数用 URLSearchParams。"],code:`console.location.href;
const params = new URLSearchParams(location.search);
console.log(params.get("page"));
history.pushState({}, "", "/new-page");`,pit:"pushState 不触发页面刷新，配合 popstate 事件实现 SPA。",ex:{q:"如何获取 URL ?id=123 的参数？",a:"new URLSearchParams(location.search).get('id')。"},target:"能操作 URL 和历史记录。"},
{id:"js-7-3",title:"requestAnimationFrame",min:8,summary:["rAF 在下次重绘前执行，适合动画。","比 setInterval 更流畅、更省电。","返回 id，用 cancelAnimationFrame 取消。"],code:`function animate(t){
  el.style.transform = \`translateX(\${t}px)\`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`,pit:"rAF 回调接收一个高精度时间戳参数，可用于计算动画进度。",ex:{q:"为什么动画用 rAF 而不是 setInterval？",a:"rAF 跟随屏幕刷新率，页面不可见时自动暂停，更流畅省电。"},target:"能用 rAF 做简单动画。"},
{id:"js-7-4",title:"Fetch 进阶：POST 与 Headers",min:10,summary:["POST 请求设置 method 和 body。","Content-Type 头告诉服务器数据格式。","FormData 发送文件上传。"],code:`const res = await fetch("/api", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({name: "Alice"})
});`,pit:"JSON 请求必须手动设置 Content-Type: application/json；fetch 默认不发送 cookies，需要 credentials。",ex:{q:"POST JSON 数据时必须设置什么头？",a:"Content-Type: application/json，并把对象 JSON.stringify。"},target:"能用 fetch 发送 POST 请求。"}
],
quiz:[
{q:"localStorage 存对象需要？",o:["直接存","JSON.stringify","toString","String()"],a:1,why:"localStorage 只存字符串，对象需 JSON 序列化。"},
{q:"动画推荐用？",o:["setInterval","setTimeout","requestAnimationFrame","while"],a:2,why:"rAF 跟随刷新率，更流畅。"},
{q:"POST JSON 数据时 body 要？",o:["直接传对象","JSON.stringify 后的字符串","FormData","URLSearchParams"],a:1,why:"body 必须是字符串，对象需序列化。"}
]},
{id:"js-s8",icon:"🚀",name:"现代工程与实战",desc:"npm、框架思想、性能",lv:"hard",
goal:"了解现代 JS 开发生态。",
links:[["npm 官网","https://www.npmjs.com/"]],
lab:{t:"完整待办应用",req:["增删改查 todos","持久化到 localStorage","简单样式美化"],starter:`// 综合练习：把前面学到的 DOM、事件、存储组合起来`,hint:"用事件委托、模板字符串、localStorage。",xp:40},
lessons:[
{id:"js-8-1",title:"npm 与 package.json",min:8,summary:["npm 是 JS 包管理器。","npm init 初始化项目，生成 package.json。","npm install <pkg> 安装依赖。"],code:`npm init -y
npm install lodash
node app.js`,pit:"node_modules 很大且可重新生成——加入 .gitignore，只提交 package.json。",ex:{q:"为什么不提交 node_modules？",a:"它可以从 package.json 重新安装，且体积巨大。"},target:"能用 npm 管理依赖。"},
{id:"js-8-2",title:"框架思想：声明式 UI",min:10,summary:["jQuery 是命令式：直接操作 DOM。","React/Vue 是声明式：描述 UI 状态，框架自动更新 DOM。","状态驱动视图：数据变了，UI 自动更新。"],code:`// 命令式（jQuery）
$("#btn").click(() => $("#count").textContent(n+1));
// 声明式（React/Vue 思想）
// const [count, setCount] = useState(0);
// <button onClick={() => setCount(count+1)}>{count}</button>`,pit:"框架不是必须的——小项目原生 JS 更直接；大项目框架管理状态更高效。",ex:{q:"声明式和命令式的区别？",a:"命令式描述怎么做；声明式描述目标结果，框架负责怎么做。"},target:"理解现代前端框架的核心思想。"},
{id:"js-8-3",title:"错误监控与调试",min:8,summary:["console.error/warn/debug 分级输出。","debugger 语句在 DevTools 中断。","window.onerror 捕获未处理错误。"],code:`console.log("普通信息");
console.warn("警告");
console.error("错误");
debugger; // DevTools 打开时在此暂停
window.onerror = (msg, src, line) => {
  console.error("全局错误:", msg, src, line);
};`,pit:"生产环境记得移除 debugger 语句——可通过构建工具自动剔除。",ex:{q:"debugger 语句什么时候生效？",a:"DevTools 打开时生效，相当于自动打了个断点。"},target:"能用 console 和 debugger 调试。"},
{id:"js-8-4",title:"性能优化要点",min:8,summary:["减少重排：批量修改样式用 class。","事件委托减少监听器数量。","防抖(debounce)和节流(throttle)优化高频事件。"],code:`// 防抖：停止输入 300ms 后才执行
function debounce(fn, ms=300){
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), ms); };
}
input.addEventListener("input", debounce(search, 300));`,pit:"scroll/resize/input 事件触发极频繁——不加防抖会导致卡顿。",ex:{q:"防抖和节流的区别？",a:"防抖是停止后执行一次；节流是固定间隔执行。"},target:"理解常见性能优化手段。"}
],
quiz:[
{q:"node_modules 应该提交吗？",o:["应该","不应该","小项目应该","看情况"],a:1,why:"从 package.json 可重新安装，且体积巨大。"},
{q:"声明式 UI 的优势？",o:["更快","状态驱动视图，不用手动操作 DOM","更简单","兼容所有浏览器"],a:1,why:"描述状态，框架自动更新 DOM。"},
{q:"输入框搜索应该加什么优化？",o:["节流","防抖","缓存","压缩"],a:1,why:"防抖让用户停止输入后才搜索，减少请求。"}
]}
]
};
