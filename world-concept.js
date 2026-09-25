/* R0:hello world · 概念地图 + 名词库数据
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 */
(function () {
"use strict";

window.WORLD_TERMS = [
  { term: "变量与类型", term_en: "Variables & Types", cat: "语言基础", short: "给数据起个名字，并说明它是什么种类。", short_en: "Naming data and stating what kind it is.",
    detail: ["类型决定能做什么运算、占多少内存。", "动态类型语言在运行时才确定类型。"],
    vs: "变量是「盒子」，类型是「盒子的规格」。", vs_en: "The variable is the box; the type is its spec." },
  { term: "控制流", term_en: "Control Flow", cat: "语言基础", short: "决定代码按什么顺序执行：条件与跳转。", short_en: "What runs when: conditions and jumps.",
    detail: ["if/else 分支、switch 多分支、提前返回。", "嵌套过深的分支应该拆函数。"],
    vs: "控制流管「走哪条路」，循环管「重复走」。", vs_en: "Control flow picks a path; loops repeat one." },
  { term: "循环", term_en: "Loop", cat: "语言基础", short: "让一段代码重复执行。", short_en: "Repeating a block of code.",
    detail: ["for 适合已知次数，while 适合按条件。", "注意终止条件，避免死循环。"],
    vs: "循环是重复，递归是自我调用。", vs_en: "Loops repeat; recursion calls itself." },
  { term: "函数", term_en: "Function", cat: "结构与抽象", short: "把一段可复用的逻辑打包，起个名字。", short_en: "Packaging reusable logic under a name.",
    detail: ["输入是参数，输出是返回值。", "一个函数只做一件事，名字说清楚做什么。"],
    vs: "函数是「封装」，参数是「接口」。", vs_en: "A function encapsulates; parameters are its interface." },
  { term: "作用域", term_en: "Scope", cat: "语言基础", short: "变量在哪些代码里可见。", short_en: "Where a variable can be seen.",
    detail: ["内层可以读外层，反之通常不行。", "全局变量越少越好，容易互相踩。"],
    vs: "作用域管可见性，生命周期管活多久。", vs_en: "Scope is visibility; lifetime is how long it lives." },
  { term: "数组与列表", term_en: "Array & List", cat: "语言基础", short: "按顺序存放多个值。", short_en: "An ordered collection of values.",
    detail: ["按下标访问，增删的成本随结构不同。", "遍历是最常用的操作。"],
    vs: "数组重顺序，映射（字典）重按键查。", vs_en: "Arrays keep order; maps look up by key." },
  { term: "字符串", term_en: "String", cat: "语言基础", short: "文本在程序里的表示。", short_en: "How text is represented in code.",
    detail: ["不可变是多数语言的默认。", "拼接大量字符串建议用专门的构建器或 join。"],
    vs: "字符串是字符的序列，数组是任意元素的序列。", vs_en: "A string is a char sequence; an array holds anything." },
  { term: "递归", term_en: "Recursion", cat: "结构与抽象", short: "函数调用自己来解决问题。", short_en: "A function calling itself.",
    detail: ["必须有终止条件，否则栈溢出。", "树与嵌套结构天然适合递归。"],
    vs: "递归表达简洁，循环更省内存。", vs_en: "Recursion is expressive; loops are cheaper." },
  { term: "面向对象", term_en: "OOP", cat: "结构与抽象", short: "把数据与操作绑成对象，用类描述一类事物。", short_en: "Bundling data and behaviour into objects described by classes.",
    detail: ["封装、继承、多态是三大支柱。", "不要为了面向对象而面向对象；先有清晰职责。"],
    vs: "面向对象组织「谁做什么」，函数式组织「怎么算」。", vs_en: "OOP organises who does what; FP organises how to compute." },
  { term: "异常处理", term_en: "Exception Handling", cat: "结构与抽象", short: "程序出错时的受控处理方式。", short_en: "Controlled handling of runtime failures.",
    detail: ["只捕获能处理的，别吞掉所有异常。", " finally / 清理逻辑要保证资源释放。"],
    vs: "异常管「出错了怎么办」，测试管「错在没被发现」。", vs_en: "Exceptions handle failures; tests find them early." },
  { term: "模块与包", term_en: "Module & Package", cat: "结构与抽象", short: "把代码拆成可复用的文件与目录。", short_en: "Splitting code into reusable files and folders.",
    detail: ["按职责拆分，避免一个文件几千行。", "导入关系要单向，避免循环依赖。"],
    vs: "模块是文件级复用，函数是逻辑级复用。", vs_en: "Modules reuse files; functions reuse logic." },
  { term: "输入输出", term_en: "I/O", cat: "语言基础", short: "程序与外界交换数据：键盘、文件、网络。", short_en: "Exchanging data with the outside: keyboard, files, network.",
    detail: ["I/O 通常比计算慢得多，是性能瓶颈常客。", "读文件要考虑编码与关闭。"],
    vs: "I/O 是边界，函数是内部。", vs_en: "I/O is the boundary; functions are the inside." },
  { term: "算法复杂度", term_en: "Complexity", cat: "结构与抽象", short: "用大 O 描述耗时随规模增长的速度。", short_en: "Big-O describes how cost grows with input size.",
    detail: ["常数再小也救不了 O(n²)。", "先看复杂度，再谈微优化。"],
    vs: "复杂度看趋势，性能测试看实际。", vs_en: "Complexity is the trend; benchmarks are reality." },
  { term: "数据结构", term_en: "Data Structure", cat: "结构与抽象", short: "组织数据的方式：数组、映射、栈、队列、树。", short_en: "How data is organised: arrays, maps, stacks, queues, trees.",
    detail: ["选对结构常常比换算法更有效。", "字典/映射是使用频率最高的结构之一。"],
    vs: "数据结构是容器，算法是在容器上的步骤。", vs_en: "Structures hold; algorithms operate." },
  { term: "调试", term_en: "Debugging", cat: "工程与工具", short: "定位并修掉程序里的错误。", short_en: "Locating and fixing errors.",
    detail: ["先缩小范围，再看变量与调用栈。", "打印不是坏办法，断点更高效。"],
    vs: "调试管「为什么错」，日志管「什么时候错」。", vs_en: "Debugging finds why; logs record when." },
  { term: "版本控制", term_en: "Version Control", cat: "工程与工具", short: "记录代码的每次变更，可回滚可协作。", short_en: "Recording every change, rollback and collaboration.",
    detail: ["Git 是事实标准：提交、分支、合并。", "小步提交 + 清晰的提交信息。"],
    vs: "版本控制管代码，备份管数据。", vs_en: "Version control is for code; backups are for data." },
  { term: "编译与解释", term_en: "Compile vs Interpret", cat: "工程与工具", short: "代码变成机器可执行形式的两种方式。", short_en: "Two ways code becomes executable.",
    detail: ["编译型通常更快、报错更早；解释型更灵活。", "很多现代语言是混合模式（先编译成中间码）。"],
    vs: "编译在运行前翻译，解释在运行时翻译。", vs_en: "Compilers translate ahead; interpreters on the fly." },
  { term: "指针与引用", term_en: "Pointer & Reference", cat: "语言基础", short: "指向内存位置的变量。", short_en: "Variables that point at memory locations.",
    detail: ["C/C++ 的指针能直接操作地址。", "引用更安全，但也要注意共享可变状态。"],
    vs: "指针给地址，引用给别名。", vs_en: "Pointers hold addresses; references are aliases." },
  { term: "标准库", term_en: "Standard Library", cat: "工程与工具", short: "语言自带的常用功能集合。", short_en: "The utilities a language ships with.",
    detail: ["先查标准库，再考虑第三方，最后自己写。", "熟悉标准库能省掉大量重复造轮子。"],
    vs: "标准库自带，第三方库需安装。", vs_en: "The stdlib ships; third-party needs installing." },
  { term: "单元测试", term_en: "Unit Test", cat: "工程与工具", short: "对最小可测单元写自动化验证。", short_en: "Automated checks for the smallest testable unit.",
    detail: ["测试让你改代码时心里有底。", "先写正常路径，再补边界与异常。"],
    vs: "测试是护栏，调试是事故处理。", vs_en: "Tests are the guardrail; debugging is the cleanup." }
];

window.WORLD_CONCEPT_MAP = {
  nodes: [
    { id: "程序", tier: 0 },
    { id: "数据", tier: 1 }, { id: "控制流", tier: 1 }, { id: "函数", tier: 1 },
    { id: "输入输出", tier: 1 }, { id: "调试", tier: 1 },
    { id: "变量与类型", tier: 2 }, { id: "循环", tier: 2 }, { id: "递归", tier: 2 },
    { id: "作用域", tier: 2 }, { id: "数组与列表", tier: 2 }, { id: "字符串", tier: 2 },
    { id: "异常处理", tier: 2 }, { id: "算法复杂度", tier: 2 },
    { id: "面向对象", tier: 3 }, { id: "模块与包", tier: 3 }, { id: "数据结构", tier: 3 }, { id: "版本控制", tier: 3 }
  ],
  edges: [
    { a: "数据", b: "程序", zh: "程序的原料", en: "the fuel" },
    { a: "控制流", b: "程序", zh: "执行的顺序", en: "the order" },
    { a: "函数", b: "程序", zh: "组织的单位", en: "the unit of organisation" },
    { a: "输入输出", b: "程序", zh: "与外界交换", en: "talks to the world" },
    { a: "调试", b: "程序", zh: "让它跑对", en: "makes it right" },

    { a: "变量与类型", b: "数据", zh: "数据的载体", en: "holds the data" },
    { a: "数组与列表", b: "数据", zh: "成组的数据", en: "grouped data" },
    { a: "字符串", b: "数据", zh: "文本数据", en: "text data" },
    { a: "数据结构", b: "数组与列表", zh: "更高层的组织", en: "higher-level organisation" },

    { a: "循环", b: "控制流", zh: "重复执行", en: "repeats" },
    { a: "递归", b: "函数", zh: "函数调用自己", en: "a function calling itself" },
    { a: "递归", b: "循环", zh: "可互相改写", en: "interchangeable" },
    { a: "作用域", b: "变量与类型", zh: "决定可见性", en: "decides visibility" },
    { a: "算法复杂度", b: "循环", zh: "衡量嵌套的代价", en: "costs of nesting" },
    { a: "数据结构", b: "算法复杂度", zh: "结构影响复杂度", en: "structure shapes cost" },

    { a: "面向对象", b: "函数", zh: "把函数与数据绑定", en: "binds data to behaviour" },
    { a: "模块与包", b: "函数", zh: "把函数分组复用", en: "groups functions" },
    { a: "异常处理", b: "函数", zh: "函数出错的出口", en: "the error path" },

    { a: "版本控制", b: "调试", zh: "能回滚就能放心改", en: "rollback enables bold edits" },
    { a: "版本控制", b: "模块与包", zh: "管理代码的演进", en: "manages evolution" }
  ]
};

/* B12/B13 英文覆盖层：名词 detail、概念图孤立节点、分类名。
 * 不改上面的原始词条，装载时按 term 合并进 detail_en —— 与 AGI 站的叠加层做法一致。 */
var TERM_DETAIL_EN = {
  "变量与类型": ["A type decides which operations are allowed and how much memory it takes.", "Dynamically typed languages resolve the type only at runtime."],
  "控制流": ["if/else for two-way forks, switch for many-way, and early returns.", "Deeply nested branches should be pulled out into functions."],
  "循环": ["Use for when the count is known, while when a condition drives it.", "Watch the termination condition, or you get an infinite loop."],
  "函数": ["Inputs are parameters; the output is the return value.", "One function, one job — and its name should say what that job is."],
  "作用域": ["An inner scope can read the outer one, not the other way round.", "Fewer globals are better; they easily step on each other."],
  "数组与列表": ["Index access is cheap; insert/delete costs differ between structures.", "Iteration is by far the most common operation."],
  "字符串": ["Immutability is the default in most languages.", "For heavy concatenation use a builder or join instead."],
  "递归": ["A base case is mandatory, otherwise the stack overflows.", "Trees and nested structures are a natural fit for recursion."],
  "面向对象": ["Encapsulation, inheritance and polymorphism are the three pillars.", "Don't use OOP for its own sake — start from clear responsibilities."],
  "异常处理": ["Catch only what you can handle; never swallow every exception.", "finally / cleanup logic must guarantee that resources are released."],
  "模块与包": ["Split by responsibility; avoid files thousands of lines long.", "Keep imports one-directional and avoid dependency cycles."],
  "输入输出": ["I/O is usually far slower than computation and is the classic bottleneck.", "When reading files, mind the encoding and close the handle."],
  "算法复杂度": ["A tiny constant cannot rescue an O(n²).", "Look at the complexity first, micro-optimise afterwards."],
  "数据结构": ["Choosing the right structure often beats rewriting the algorithm.", "Dictionaries / maps are among the most heavily used structures."],
  "调试": ["Narrow the range first, then inspect variables and the call stack.", "Print statements are not a bad method; breakpoints are just faster."],
  "版本控制": ["Git is the de facto standard: commit, branch, merge.", "Commit in small steps with clear messages."],
  "编译与解释": ["Compiled languages are usually faster and fail earlier; interpreted ones are more flexible.", "Many modern languages are hybrids that compile to bytecode first."],
  "指针与引用": ["C/C++ pointers manipulate addresses directly.", "References are safer, but shared mutable state still bites."],
  "标准库": ["Check the standard library first, then third-party packages, then write it yourself.", "Knowing the standard library saves a lot of reinvented wheels."],
  "单元测试": ["Tests are what let you change code without fear.", "Cover the happy path first, then edge cases and failures."]
};
window.WORLD_TERMS.forEach(function (x) { if (TERM_DETAIL_EN[x.term]) x.detail_en = TERM_DETAIL_EN[x.term]; });

/* 概念图里这两个节点不是词条（词条表查不到），只能靠标签表兜底 */
window.WORLD_LABEL_EN = { "程序": "Program", "数据": "Data" };
window.WORLD_CAT_EN = {
  "语言基础": "Language Fundamentals",
  "结构与抽象": "Structure & Abstraction",
  "工程与工具": "Engineering & Tools"
};

})();
