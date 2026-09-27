/* ================================================================
 * R0:hello world · R6 W2 第二批：js 语言「底层机制」新章（js-s9，4 节双语）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 与 world-depth-go.js 同一套模式，三条机制约束照抄自己的文件头：
 *   ① 英文只走 I18N 按 id 查表（lesson_en / stages / lessons / stage_en / phases_en）；
 *   ② 加一章必须同时加一个 phase，range 用 stage 下标（js 原有 8 章 → 新章下标 8）；
 *   ③ stages / phases 原地 push；中文侧的纵深与回顾写进 LESSON_EXTRA，
 *      否则中文态会比英文态少区块（go 那批真的犯过一次）。
 * ================================================================ */
(function () {
  var J = window.LANG_DATA && window.LANG_DATA.js;
  if (!J || !J.stages || !window.I18N) return;
  var IDX = J.stages.length;

  J.stages.push({
    id: "js-s9", icon: "🧠", name: "底层机制", lv: "hard",
    desc: "事件循环、原型链、闭包与多线程",
    goal: "能从事件循环、原型链、作用域链和线程模型四层解释 JS 的行为。",
    links: [["MDN event loop", "https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide"], ["TC39 specs", "https://tc39.es/ecma262/"]],
    lab: {
      t: "把一段重计算搬进 Worker",
      req: ["主线程用 setTimeout 跑一个 2 秒的同步循环，观察界面卡住", "同样逻辑改写成 worker.js 并用 postMessage 取结果", "把一个百万长度 Float32Array 用 transfer 转移给 Worker，比较耗时"],
      starter: "// main.js\nconst w = new Worker(\"worker.js\");\nw.postMessage({ n: 5_000_000 });\nw.onmessage = e => console.log(\"done\", e.data);\n\n// worker.js（这里没有 window / document）\nself.onmessage = e => {\n  let s = 0;\n  for (let i = 0; i < e.data.n; i++) s += i;\n  self.postMessage(s);\n};",
      hint: "先确认界面确实卡住，再对比 Worker 版本；想避免拷贝开销就用第二个参数把 ArrayBuffer 转移过去。",
      xp: 26
    },
    lessons: [
      {
        id: "js-9-1", title: "事件循环与微任务", min: 15,
        summary: [
          "一个线程 = 执行栈 + 任务队列：同步代码跑完，先清空微任务队列，再取一个宏任务，如此往复。",
          "微任务来自 Promise 回调、queueMicrotask、MutationObserver；宏任务来自 setTimeout、I/O、事件回调。",
          "同一轮里注册的 Promise.resolve().then 比 setTimeout(fn,0) 先执行，因为微任务排在下一个宏任务之前。",
          "async/await 是 Promise 的语法糖：await 之后的代码等价于包进 .then，恢复时同样走微任务，不产生任何延时。",
          "微任务里再排微任务会被持续清空，可能饿死渲染；长流程要主动让出（等一个计时器或拆成多段）。",
          "浏览器渲染通常对齐 vsync，不是每轮循环都画；要精确控制绘制时机用 requestAnimationFrame。"
        ],
        code: "console.log(\"1\");\nsetTimeout(() => console.log(\"macro\"), 0);\nPromise.resolve().then(() => console.log(\"micro\"));\nqueueMicrotask(() => console.log(\"micro2\"));\nconsole.log(\"2\");\n// 1 -> 2 -> micro -> micro2 -> macro",
        pit: "以为 await 就是「等一会儿」：await 一个已完成的 Promise 只是把后续放进微任务，想真等必须交给计时器或 I/O。",
        ex: { q: "微任务队列什么时候被清空？", a: "当前宏任务的同步代码跑完之后、下一个宏任务开始之前，一直清到队列为空。" },
        target: "能预测混有 Promise、setTimeout、async/await 的输出顺序，并说清微任务饿死渲染的条件。"
      },
      {
        id: "js-9-2", title: "原型链与 class 的底层", min: 16,
        summary: [
          "属性查找沿原型链走：自身 → [[Prototype]] → … → Object.prototype → null；for...in 会连原型链上的可枚举属性一起列出。",
          "class 是语法糖：方法定义在 Fn.prototype 上，extends 负责接原型链，super 是原型引用的固定写法，运行时没有独立的「类」。",
          "new F() 四步：造空对象 → 链接到 F.prototype → 绑定 this 执行构造函数 → 构造函数返回对象时用它作结果。",
          "静态成员挂在构造器本身，实例方法挂在 prototype；extends 会同时建立两条链（构造器链与原型链）。",
          "私有字段 #x 由语言层保证，无法绕过，语义和性能都优于 _x 这种约定；私有方法同理。",
          "instanceof 检查的是原型链，改过 setPrototypeOf 或跨 realm（iframe、worker）时结果会失真；判断字面量对象用 Object.getPrototypeOf(x) === Object.prototype。"
        ],
        code: "class Point {\n  constructor(x) { this.x = x; }\n  dist() { return Math.abs(this.x); }\n}\nconst p = new Point(3);\np.dist();                                    // method lives on Point.prototype\nObject.getPrototypeOf(p) === Point.prototype // true\nclass Point3D extends Point { }              // Point3D.prototype -> Point.prototype",
        pit: "把方法写成 this.dist = () => {} 放在构造函数里，每个实例各持一份，内存与共享都变差；要共享就挂到 prototype 上。",
        ex: { q: "class 与「函数 + 原型」有本质区别吗？", a: "没有。class 只是语法糖，方法仍挂在 prototype 上，运行时依旧是原型委托模型。" },
        target: "能画出实例到构造器原型的链路，并解释 new 的四步与 instanceof 失真的两种场景。"
      },
      {
        id: "js-9-3", title: "闭包与作用域链", min: 15,
        summary: [
          "函数携带它定义时的词法环境，这就是闭包：捕获的是绑定本身，不是当时的值。",
          "作用域链按书写位置静态确定，与调用处无关；这与随调用方式变化的 this 是两套规则。",
          "var 是函数作用域且提升，let/const 是块作用域并有暂时性死区；循环里用 let 才会为每轮新建绑定。",
          "闭包会延长被引用变量的生命周期：回调还在，它捕获的大数组就不能回收，这是最常见的内存泄漏形态。",
          "模块模式、偏函数、防抖节流、迭代器与生成器都建立在闭包上，它是 JS 里封装私有状态的最小手段。",
          "引擎会驱逐未被引用的变量，因此调试器里看到的作用域内容不一定等于实际保留的集合。"
        ],
        code: "function counter() {\n  let n = 0;                 // referenced by the returned closures\n  return { inc: () => ++n, get: () => n };\n}\nconst c = counter();\nc.inc(); c.inc(); c.get();   // 2, and n is unreachable from outside",
        pit: "循环里用 var 配闭包，所有回调读到的都是最终值；改 let、或用 IIFE 传参、或改成工厂函数，三者选一。",
        ex: { q: "闭包捕获的是值还是变量？", a: "是绑定本身：变量之后被改写，闭包读到的就是新值——循环 var 陷阱正是由此而来。" },
        target: "能用闭包写出带私有状态的模块，并说清它带来的生命周期延长与回收后果。"
      },
      {
        id: "js-9-4", title: "Worker 与共享内存", min: 17,
        summary: [
          "Worker 是独立线程加独立事件循环，与主线程不共享 JS 对象；通信靠 postMessage 的结构化克隆，默认是拷贝。",
          "Worker 里没有 window 与 DOM，只有 self 和受限 API：渲染留在主线程，重计算搬到 Worker。",
          "大缓冲可用 Transferable 转移所有权避免拷贝，代价是转移后原线程不能再碰它。",
          "SharedArrayBuffer + Atomics 提供真共享内存，适合图像、加密、物理模拟等 CPU 密集并行。",
          "SAB 需要页面处于跨源隔离状态（配 COOP/COEP 响应头）。本站是 GitHub Pages 纯静态托管，加不了这两个头，所以课程只用 Worker 与拷贝式通信——这是部署约束，不是语言限制。",
          "还有 SharedWorker（多标签共享一个）、模块 worker、以及 OffscreenCanvas（把绘制移出主线程）。"
        ],
        code: "// main thread\nconst w = new Worker(\"worker.js\");\nw.postMessage({ nums: [3, 4, 5] });\nw.onmessage = e => console.log(e.data.sum);\n\n// worker.js\nself.onmessage = e => {\n  const sum = e.data.nums.reduce((a, b) => a + b, 0);\n  self.postMessage({ sum });\n};",
        pit: "以为 postMessage 传的是引用，改了「对端的数据」主线程也跟着变——默认拿到的是副本；要真共享得用 SAB 或转移 ArrayBuffer。",
        ex: { q: "为什么 SharedArrayBuffer 要求跨源隔离？", a: "共享内存让计时侧信道成为可能，浏览器因此要求页面显式声明隔离到独立的站点隔离单元。" },
        target: "能把一段重计算搬进 Worker，并说清拷贝、转移、共享三种数据方式的取舍与前提。"
      }
    ],
    quiz: [
      { q: "同一轮里 Promise.resolve().then 与 setTimeout(fn,0) 谁先执行？", o: ["then 先，因为微任务排在下一个宏任务之前", "setTimeout 先", "看注册顺序", "同时执行"], a: 0, why: "同步代码跑完后先清空微任务队列，再取下一个宏任务。" },
      { q: "await 一个已完成的 Promise 会怎样？", o: ["阻塞线程直到下一帧", "把后续代码放进微任务，不产生延时", "抛错", "跳到下一个宏任务"], a: 1, why: "await 之后的部分等价于 .then 回调，恢复时走微任务队列。" },
      { q: "class 的方法实际存放在哪里？", o: ["每个实例上", "构造函数的 prototype 上", "全局作用域", "私有堆区"], a: 1, why: "实例通过原型链委托到 Fn.prototype，方法只有一份。" },
      { q: "new F() 的第三步是什么？", o: ["创建空对象", "链接到 F.prototype", "绑定 this 并执行构造函数", "返回 undefined"], a: 2, why: "顺序为：造对象 → 链接原型 → 绑定 this 执行 → 返回值不是对象时用新对象。" },
      { q: "Worker 里能直接操作 document 吗？", o: ["能", "不能", "只在 module worker 能", "加权限后能"], a: 1, why: "Worker 没有 window 与 DOM，只有 self 和受限 API。" },
      { q: "闭包捕获的是变量的值而不是绑定。", o: ["正确", "错误"], a: 1, why: "捕获的是绑定本身，变量被改写后闭包读到的是新值。" },
      { q: "SharedArrayBuffer 在任何页面上都能直接使用。", o: ["正确", "错误"], a: 1, why: "需要页面处于跨源隔离状态（COOP/COEP），纯静态托管往往配不了这两个头。" },
      { q: "把方法写在构造函数内（this.f = () => {}）会让每个实例各持一份。", o: ["正确", "错误"], a: 0, why: "要共享就挂到 prototype 上，这是 class 语法糖背后做的事。" },
      { q: "for...in 会遍历原型链上的可枚举属性。", o: ["正确", "错误"], a: 0, why: "所以遍历对象自有属性要用 for...of + Object.keys，或加 hasOwnProperty 判断。" }
    ]
  });

  J.phases.push({
    icon: "🧠", name: "第四篇 · 底层机制", range: [IDX, IDX],
    desc: "事件循环、原型链、闭包与多线程", wk: 2
  });

  /* ---------- 英文侧表：渲染时按 id 查表，优先级高于课节对象字段 ---------- */
  var I = window.I18N;
  I.stages["js-s9"] = { n: "Under the Hood", d: "Event loop, prototypes, closures and threads" };
  I.stage_en["js-s9"] = {
    goal: "Explain JavaScript's behaviour from four angles: the event loop, the prototype chain, the scope chain and the thread model.",
    links: [["MDN event loop", "https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide"], ["TC39 specs", "https://tc39.es/ecma262/"]],
    /* 实战卡的标题 / 要求 / 提示也走 stage_en.lab：漏了它，英文态卡面就是整段中文
       （篇章条那处已经因为「写了侧表但少字段」漏过一次，同一族问题要一次查全）*/
    lab: {
      t: "Move a Heavy Computation into a Worker",
      req: ["Run a 2-second synchronous loop on the main thread from a timer and watch the UI freeze",
        "Rewrite the same logic as worker.js and read the result back through postMessage",
        "Hand a one-million-element Float32Array to the Worker with transfer and compare the timings"],
      hint: "Confirm the UI really freezes first, then compare against the Worker version; to skip the copy cost, pass the ArrayBuffer in the second argument so it is transferred instead of cloned."
    }
  };
  I.lessons["js-9-1"] = "The Event Loop and Microtasks";
  I.lessons["js-9-2"] = "Prototype Chains and What class Compiles To";
  I.lessons["js-9-3"] = "Closures and the Scope Chain";
  I.lessons["js-9-4"] = "Workers and Shared Memory";

  I.lesson_en["js-9-1"] = {
    summary: [
      "One thread = a stack plus task queues: finish the synchronous code, drain the microtask queue, then take a single macrotask, and repeat.",
      "Microtasks come from Promise callbacks, queueMicrotask and MutationObserver; macrotasks from setTimeout, I/O and event handlers.",
      "A Promise.resolve().then registered in the same turn beats setTimeout(fn,0), because microtasks are drained before the next macrotask.",
      "async/await is sugar over promises: code after await behaves like a .then callback, so it resumes on the microtask queue with no delay.",
      "A microtask that queues more microtasks keeps getting drained and can starve rendering; yield deliberately with a timer or by splitting the work.",
      "Browsers usually paint in step with vsync rather than every loop turn; use requestAnimationFrame when you need to control paint timing."
    ],
    pit: "Treating await as waiting a while: awaiting an already-settled promise only defers to a microtask; real delay needs a timer or I/O.",
    ex: { q: "When is the microtask queue drained?", a: "After the current macrotask's synchronous code finishes and before the next macrotask starts — drained until empty." },
    target: "Predict the output order of code mixing promises, timers and async/await, and explain when microtasks starve rendering.",
    deep: ["Node's loop has more phases (timers, poll, check), so setImmediate and process.nextTick behave differently from the browser.", "An await inside a loop serialises work that could have been concurrent.", "Long synchronous handlers block input and paint; that is what jank is."],
    recap: "Sync code, then drain microtasks, then one macrotask; await costs a microtask, not a delay."
  };
  I.lesson_en["js-9-2"] = {
    summary: [
      "Lookup walks the chain: own properties, then [[Prototype]], and so on to Object.prototype and null; for...in also yields enumerable inherited keys.",
      "class is syntax sugar: methods land on Fn.prototype, extends wires the chains, super is fixed notation for the prototype reference — there is no separate class object at runtime.",
      "new F() has four steps: create an object, link it to F.prototype, run the constructor with this bound, and use the returned object if it is one.",
      "Static members sit on the constructor while instance methods sit on the prototype; extends sets up both chains.",
      "Private fields #x are enforced by the language and cannot be reached around, which makes them better than the _x convention in both semantics and speed.",
      "instanceof inspects the prototype chain, so it lies after setPrototypeOf or across realms (iframe, worker); test plain objects with Object.getPrototypeOf(x) === Object.prototype."
    ],
    pit: "Assigning this.dist = () => {} inside the constructor gives every instance its own copy; put shared behaviour on the prototype.",
    ex: { q: "Is class fundamentally different from a function plus a prototype?", a: "No. It is syntax sugar; methods still live on the prototype and the runtime remains prototype delegation." },
    target: "Draw the chain from an instance up to its constructor prototype and explain the four steps of new plus two ways instanceof misleads.",
    deep: ["Delegating lookups defeat V8 inline caches when the shape changes late; add fields in the constructor.", "Object.create(null) makes a dictionary with no inherited pollution.", "Mixins that patch prototypes affect every instance — prefer composition."],
    recap: "Objects delegate to prototypes; class builds those links for you; new creates, links, binds, returns."
  };
  I.lesson_en["js-9-3"] = {
    summary: [
      "A function carries the lexical environment where it was defined — that is a closure, and it captures bindings, not snapshots of values.",
      "The scope chain is fixed by where you wrote the code, independent of the call site, unlike this which follows how you called it.",
      "var is function-scoped and hoisted; let/const are block-scoped with a temporal dead zone, and let gives each loop iteration a fresh binding.",
      "Closures extend the life of whatever they reference: as long as the callback lives, the big array it captured cannot be collected — the most common leak shape.",
      "Module patterns, partial application, debounce/throttle, iterators and generators are all built on closures; it is JavaScript's smallest unit of encapsulation.",
      "Engines prune unreferenced variables, so what the debugger shows as the scope is not always what is actually retained."
    ],
    pit: "var plus a closure inside a loop makes every callback read the final value; switch to let, pass through an IIFE, or return a factory.",
    ex: { q: "Does a closure capture the value or the variable?", a: "The binding: later writes are visible inside the closure, which is exactly why the var loop trap happens." },
    target: "Write a module with private state using a closure, and explain the lifetime and collection consequences.",
    deep: ["Event listeners that close over large objects leak until they are removed.", "WeakMap/WeakRef exist precisely so a cache can stop keeping keys alive.", "Generators are closures with a resumable program counter."],
    recap: "Scope is lexical, this is dynamic; closures keep bindings alive, which is both the power and the leak risk."
  };
  I.lesson_en["js-9-4"] = {
    summary: [
      "A Worker is a separate thread with its own event loop; no JS objects are shared, and postMessage uses structured cloning, which copies by default.",
      "Inside a Worker there is no window or DOM, only self plus a restricted API: keep painting on the main thread and move heavy computation out.",
      "Transferable objects (ArrayBuffer) hand over ownership to avoid copying, and the sending side must stop using them afterwards.",
      "SharedArrayBuffer with Atomics gives genuine shared memory for CPU-heavy parallel work such as image processing, crypto and simulation.",
      "SAB requires a cross-origin isolated document (COOP/COEP response headers). This site is plain GitHub Pages static hosting where those headers cannot be set, so the course sticks to Workers with copied data — a deployment constraint, not a language limit.",
      "Also available: SharedWorker (one worker across tabs), module workers, and OffscreenCanvas to move drawing off the main thread."
    ],
    pit: "Assuming postMessage passes a reference and that mutating the received data changes the sender's copy too — you get a clone; sharing needs SAB or an ArrayBuffer transfer.",
    ex: { q: "Why does SharedArrayBuffer demand cross-origin isolation?", a: "Shared memory enables timing side channels, so browsers require the page to opt into its own site isolation unit." },
    target: "Move a heavy computation into a Worker and compare the copy, transfer and share options with their prerequisites.",
    deep: ["Structured cloning fails on functions, DOM nodes and most class instances.", "Worker startup costs milliseconds, so pool them for short repeated jobs.", "Atomics.wait cannot run on the main thread; it would defeat the point."],
    recap: "Workers mean separate heaps and message passing; transfer avoids the copy; SAB gives real sharing but needs isolation headers."
  };

  /* phases_en 按**篇章下标**取（phName 用 p._i），IDX 是章（stage）下标，两者不是一回事：
     写错下标会让英文态整个篇章条回落中文，而数组看起来"有值"。 */
  (I.phases_en.js = I.phases_en.js || [])[J.phases.length - 1] = {
    n: "Part 4 · Under the Hood",
    d: "Event loop, prototypes, closures and threads"
  };

  /* 中文侧的纵深与回顾走 LESSON_EXTRA（extraOf 读它），与英文侧表一一对应 */
  var X = (window.LESSON_EXTRA = window.LESSON_EXTRA || {});
  X["js-9-1"] = {
    deep: ["Node 的循环有更多阶段（timers、poll、check），所以 setImmediate 与 process.nextTick 的行为和浏览器不同。", "循环体里逐个 await 会把本可并发的操作串起来。", "过长的同步回调会阻塞输入与绘制，这就是「卡顿」的来源。"],
    recap: "先同步代码，再清空微任务，再取一个宏任务；await 只花一个微任务，不是延时。"
  };
  X["js-9-2"] = {
    deep: ["后期才加字段会破坏内联缓存的形状稳定性，热路径上把字段都在构造函数里声明。", "Object.create(null) 得到没有继承污染的字典型对象。", "往 prototype 上打补丁的 mixin 会影响所有实例，优先用组合。"],
    recap: "对象沿原型委托；class 只是把这些链接好；new 的四步是造对象、连原型、绑 this、定返回值。"
  };
  X["js-9-3"] = {
    deep: ["闭包捕获大对象的事件监听器，在解绑之前一直是泄漏。", "WeakMap / WeakRef 的存在就是为了让缓存不再拖住键。", "生成器本质上是「可以暂停和恢复的闭包」。"],
    recap: "作用域是静态的、this 是动态的；闭包让绑定继续活着，这既是能力也是泄漏风险。"
  };
  X["js-9-4"] = {
    deep: ["结构化克隆不能传函数、DOM 节点和多数类实例。", "Worker 启动要几毫秒，短任务应该用池而不是每次新建。", "Atomics.wait 不允许在主线程调用，否则正好违背了它的目的。"],
    recap: "Worker 是独立堆 + 消息传递；transfer 免拷贝；SAB 才是真共享，但需要隔离头。"
  };
})();
