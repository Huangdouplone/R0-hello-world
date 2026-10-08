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
    vs: "测试是护栏，调试是事故处理。", vs_en: "Tests are the guardrail; debugging is the cleanup." },
    { term: "变量", term_en: "Variables", cat: "语言基础", short: "给数据起名字并绑定类型。", short_en: "Name your data and bind a type.",
      detail: ["七门语言都支持，差别在声明方式：动态类型直接赋值，静态类型先写类型。"], vs: "变量是程序里最小的可复用单元。", vs_en: "A variable is the smallest reusable unit in a program.", detail_en: ["All seven languages support them; the difference is declaration — dynamic languages assign directly, static languages declare the type first."] },
    { term: "常量", term_en: "Constants", cat: "语言基础", short: "声明后不可重新赋值的量。", short_en: "A value that cannot be reassigned after declaration.",
      detail: ["拼写各异：const / final / constexpr / #define。"], vs: "常量约束的是「绑定」，不总是「内容」。", vs_en: "A constant constrains the binding, not always the content.", detail_en: ["The spelling varies: const / final / constexpr / #define."] },
    { term: "类型转换", term_en: "Type Conversion", cat: "语言基础", short: "在类型之间显式或隐式地换一种解释。", short_en: "Reinterpreting a value as another type, implicitly or explicitly.",
      detail: ["隐式转换方便但易错（C 的整型提升）；显式构造最稳。"], vs: "整型提升是 C 系独有的隐形坑。", vs_en: "Integer promotion is an invisible trap unique to the C family.", detail_en: ["Implicit conversion is convenient but error-prone (C's integer promotion); explicit construction is the safest."] },
    { term: "条件分支", term_en: "Branching", cat: "语言基础", short: "按条件走不同路径：if / else if / switch。", short_en: "Choosing a path by condition: if / else if / switch.",
      detail: ["C 系注意 switch 贯穿；Python 用 elif。"], vs: "分支是所有控制流的地基。", vs_en: "Branching is the foundation of all control flow.", detail_en: ["In the C family watch for switch fall-through; Python uses elif."] },
    { term: "循环", term_en: "Loops", cat: "语言基础", short: "重复执行：计数 for、条件 while、遍历 for-in。", short_en: "Repetition: counting for, conditional while, iterating for-in.",
      detail: ["Python 的 for 遍历可迭代对象；C 系经典 for 是计数循环。"], vs: "range-based for 是后来才加入 C++ 与 Java 的。" },
    { term: "函数", term_en: "Functions", cat: "语言基础", short: "把逻辑命名并复用。", short_en: "Name a piece of logic and reuse it.",
      detail: ["默认参数、重载、可变参数的规则各语言不同。"], vs: "C 没有重载与默认参数；C++ 两者都有。" },
    { term: "参数传递", term_en: "Argument Passing", cat: "语言基础", short: "传值还是传引用，决定函数能否改到外面。", short_en: "By value or by reference decides whether a function can mutate the caller's data.",
      detail: ["四门主语言都号称值传递，但「值」的内容不同。"], vs: "swap 题考的就是这个。", vs_en: "The classic swap exercise tests exactly this.", detail_en: ["All four main languages claim pass-by-value, but what counts as \"the value\" differs."] },
    { term: "递归", term_en: "Recursion", cat: "结构与抽象", short: "函数调用自身，把问题拆小。", short_en: "A function calling itself to shrink the problem.",
      detail: ["必须有终止条件；栈深度是硬限制。"], vs: "递归的代价是栈。" },
    { term: "数组", term_en: "Arrays", cat: "结构与抽象", short: "同类型元素的连续集合。", short_en: "A contiguous run of same-typed elements.",
      detail: ["C 数组传参退化成指针；vector/list 是各自语言的动态版。"], vs: "数组随机访问 O(1)，插入删除是弱项。", vs_en: "Arrays offer O(1) random access but are weak at insertion and deletion.", detail_en: ["A C array decays to a pointer when passed; vector/list are the dynamic versions in their respective languages."] },
    { term: "字符串", term_en: "Strings", cat: "结构与抽象", short: "文本的表示与处理。", short_en: "How text is represented and processed.",
      detail: ["C 用 char 数组加 \0 结尾；高级语言内置不可变字符串。"], vs: "文本是标准库差异最大的地方。" },
    { term: "映射", term_en: "Maps / Dicts", cat: "结构与抽象", short: "键值对的存取。", short_en: "Storing and reading key-value pairs.",
      detail: ["Python dict 内置且保序；C++ 有 map/unordered_map 两套。"], vs: "键值查找是日常代码的主力结构。", vs_en: "Key-value lookup is the workhorse structure of everyday code.", detail_en: ["Python's dict is built in and keeps insertion order; C++ ships two: map and unordered_map."] },
    { term: "面向对象", term_en: "Object-Oriented Programming", cat: "结构与抽象", short: "把数据和行为打包成一个类型。", short_en: "Packaging data with behaviour into one type.",
      detail: ["C 的 struct 只有数据；C++/Java 的 class 补上行为。"], vs: "这是面向对象的起点。" },
    { term: "继承", term_en: "Inheritance", cat: "结构与抽象", short: "基于已有类型扩展新类型。", short_en: "Extending an existing type into a new one.",
      detail: ["Java 单继承+多接口；Python 多继承靠 MRO 定序。"], vs: "优先组合，其次继承。", vs_en: "Prefer composition first, inheritance second.", detail_en: ["Java allows single inheritance plus many interfaces; Python's multiple inheritance is ordered by the MRO."] },
    { term: "多态", term_en: "Polymorphism", cat: "结构与抽象", short: "同一接口驱动不同实现。", short_en: "One interface driving many implementations.",
      detail: ["C++ 需 virtual；Java 实例方法默认就是虚的。"], vs: "鸭子类型是天然的多态。", vs_en: "Duck typing is polymorphism for free.", detail_en: ["C++ needs virtual; Java instance methods are virtual by default."] },
    { term: "泛型", term_en: "Generics", cat: "结构与抽象", short: "写一次，适配多种类型。", short_en: "Write once, use for many types.",
      detail: ["C++ 模板是编译期生成；Java 泛型是擦除式。"], vs: "泛型与模板的机制差异是面试常客。", vs_en: "The mechanism gap between generics and templates is an interview classic.", detail_en: ["C++ templates are generated at compile time; Java generics are erased."] },
    { term: "异常处理", term_en: "Exception Handling", cat: "工程与工具", short: "程序遇到意外时优雅退场。", short_en: "Exiting gracefully when something unexpected happens.",
      detail: ["Go 显式返回 error 不抛异常；Java 区分受检异常。"], vs: "C 没有异常机制，只有返回码。" },
    { term: "文件读写", term_en: "File IO", cat: "工程与工具", short: "把数据持久化到磁盘。", short_en: "Persisting data beyond memory.",
      detail: ["打开模式差异大：'w' 会截断，'a' 才追加。"], vs: "读写前必须判断打开是否成功。", vs_en: "Always check that the file opened successfully before reading or writing.", detail_en: ["Open modes differ a lot: 'w' truncates the file, 'a' appends."] },
    { term: "模块", term_en: "Modules", cat: "工程与工具", short: "把大程序拆成可维护的文件。", short_en: "Splitting a program into maintainable files.",
      detail: ["Python 是 import + 包目录；Go 的 import 路径即包路径。"], vs: "模块化是可维护性的前提。", vs_en: "Modularity is the prerequisite of maintainability.", detail_en: ["Python uses import plus package directories; in Go the import path is the package path."] },
    { term: "并发", term_en: "Concurrency", cat: "工程与工具", short: "多件事同时发生且不出错。", short_en: "Doing many things at once, without breaking things.",
      detail: ["线程/协程/事件循环是三种心智模型。"], vs: "Python 受 GIL 限制；Go 用 goroutine。", vs_en: "Python is limited by the GIL; Go uses goroutines.", detail_en: ["Threads / coroutines / event loops are three different mental models."] },
    { term: "内存管理", term_en: "Memory Management", cat: "工程与工具", short: "谁申请、谁释放、什么时候释放。", short_en: "Who allocates, who frees, and when.",
      detail: ["C/C++ 手动管理；Java/Python 由回收器代劳。"], vs: "学过 C 再看 GC，才明白它替你做了什么。", vs_en: "Only after C do you appreciate what a GC does for you.", detail_en: ["C/C++ manage memory manually; Java/Python hand it to a garbage collector."] }

];

window.WORLD_CONCEPT_MAP = {
  nodes: [
    { id: "程序", tier: 0 },
    { id: "数据", tier: 1 }, { id: "控制流", tier: 1 }, { id: "函数", tier: 1 },
    { id: "输入输出", tier: 1 }, { id: "调试", tier: 1 },
    { id: "变量与类型", tier: 2 }, { id: "循环", tier: 2 }, { id: "递归", tier: 2 },
    { id: "作用域", tier: 2 }, { id: "数组", tier: 2 }, { id: "字符串", tier: 2 },
    { id: "异常处理", tier: 2 },
    { id: "面向对象", tier: 3 }, { id: "继承", tier: 3 }, { id: "泛型", tier: 3 },
    { id: "集合", tier: 3 }, { id: "异常", tier: 2 }, { id: "模块", tier: 3 }, { id: "数据结构", tier: 3 }
  ],
  edges: [
    { a: "面向对象", b: "字符串", zh: "方法操作数据", en: "methods operate on data" },
    { a: "继承", b: "面向对象", zh: "类型的扩展契约", en: "extending types by contract" },
    { a: "泛型", b: "面向对象", zh: "类型参数化", en: "parameterised types" },
    { a: "集合", b: "数据", zh: "成组管理数据", en: "managing data in groups" },
    { a: "异常", b: "控制流", zh: "错误也是一条路径", en: "errors are control flow too" },
    { a: "数据", b: "程序", zh: "程序的原料", en: "the fuel" },
    { a: "控制流", b: "程序", zh: "执行的顺序", en: "the order" },
    { a: "函数", b: "程序", zh: "组织的单位", en: "the unit of organisation" },
    { a: "输入输出", b: "程序", zh: "与外界交换", en: "talks to the world" },
    { a: "调试", b: "程序", zh: "让它跑对", en: "makes it right" },

    { a: "变量与类型", b: "数据", zh: "数据的载体", en: "holds the data" },
    { a: "数组", b: "数据", zh: "成组的数据", en: "grouped data" },
    { a: "字符串", b: "数据", zh: "文本数据", en: "text data" },
    { a: "数据结构", b: "数组", zh: "更高层的组织", en: "higher-level organisation" },

    { a: "循环", b: "控制流", zh: "重复执行", en: "repeats" },
    { a: "递归", b: "函数", zh: "函数调用自己", en: "a function calling itself" },
    { a: "递归", b: "循环", zh: "可互相改写", en: "interchangeable" },
    { a: "作用域", b: "变量与类型", zh: "决定可见性", en: "decides visibility" },

    { a: "面向对象", b: "函数", zh: "把函数与数据绑定", en: "binds data to behaviour" },
    { a: "模块", b: "函数", zh: "把函数分组复用", en: "groups functions" },
    { a: "异常处理", b: "函数", zh: "函数出错的出口", en: "the error path" },
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
window.WORLD_LABEL_EN = { "程序": "Program", "数据": "Data", "数组": "Arrays", "模块": "Modules", "继承": "Inheritance", "泛型": "Generics", "集合": "Collections", "异常": "Exceptions" };
window.WORLD_CAT_EN = {
  "语言基础": "Language Fundamentals",
  "结构与抽象": "Structure & Abstraction",
  "工程与工具": "Engineering & Tools"
};

})();
