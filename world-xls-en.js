/* ================================================================
 * R0:hello world · D36：跨语言对照面板的英文侧表
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 通道：index.html 的 xlGrp(g) 按**中文组标题**查 groups，xlNote(e) 按「语言:课节 id」查 cells。
 * 面板只在展开后出现，所以这面以前从没被审计抓到（D36）。
 * 只补缺失：查不到就回落中文，回落会被 en-audit.js 的 xls.* 槽当场测出来。
 * ================================================================ */
(function () {
  var I = window.I18N;
  if (!I) return;
  var X = I.xls_en = I.xls_en || {};
  X.groups = X.groups || {};
  X.cells = X.cells || {};
  function grp(k, v) { if (!X.groups[k]) X.groups[k] = v; }
  function cell(k, v) { if (!X.cells[k]) X.cells[k] = v; }

  grp("语言定位与生态", {
    n: "Positioning and ecosystem",
    t: "Work out what problem each language was designed to solve before arguing about syntax.",
    w: "Do not confuse what a language can do with what it is for: C can drive a web server, but nobody does; Python can write drivers, but that is not its home ground." });
  grp("环境搭建与工具链", {
    n: "Setting up the toolchain",
    t: "Getting something to compile and run matters more than memorising syntax.",
    w: "The mental model of the toolchain differs completely: Python is an interpreter plus a virtual environment, C and C++ are a compiler plus a linker, Java is a JDK plus a build tool." });
  grp("第一个程序与运行模型", {
    n: "First program and execution model",
    t: "The real value of Hello World is seeing how code becomes a result.",
    w: "The biggest conceptual gap is the execution model: Python interprets line by line, C and C++ compile to machine code first, Java compiles to bytecode that the JVM then runs." });
  grp("源码组织与编译/运行单元", {
    n: "Source layout and compilation units",
    t: "How code is split, named and put together.",
    w: "Python expresses blocks with indentation; C relies on preprocessing and linking; C++ adds a namespace layer; Java binds packages to directories." });
  grp("类型系统总览", {
    n: "Type systems at a glance",
    t: "Dynamic versus static typing decides when mistakes surface.",
    w: "Python is dynamically and strongly typed (types settle at run time, with no silent coercion); C is statically weakly typed (lots of implicit conversion); C++ and Java are statically typed, and Java adds wrapper classes on top." });
  grp("数值表示、范围与溢出", {
    n: "Number representation, range and overflow",
    t: "The same 1+1 hides very different machinery in each language.",
    w: "Integer overflow in C and C++ really wraps, or is undefined behaviour when signed; Python's int has arbitrary precision and can never overflow." });
  grp("布尔、比较与逻辑运算", {
    n: "Booleans, comparison and logical operators",
    t: "How truth is decided is the foundation of every conditional.",
    w: "In Python empty containers, 0 and None are all falsy; C has no bool at all (C99 used int) where 0 is false; Java's boolean cannot be mixed with ints." });
  grp("常量与不可变性", {
    n: "Constants and immutability",
    t: "'Cannot be changed' attaches to a different object in each language.",
    w: "The easiest thing to mix up: C and C++ const qualifies whether you may modify through this path, Java final qualifies whether the reference can be rebound, and the object's contents stay mutable either way." });
  grp("引用、指针与值语义", {
    n: "References, pointers and value semantics",
    t: "Is what gets passed a value, an address or an alias?",
    w: "C, C++ and Java all claim pass-by-value, but the value differs: C passes a copy of the pointer, a C++ reference is an alias, Java passes a copy of the object reference. Python also passes a copy of the reference." });
  grp("类型转换", {
    n: "Type conversion",
    t: "Implicit conversion is convenient and also where accidents start.",
    w: "C's implicit integer promotions are the most intricate and the most error-prone; Java forbids converting between booleans and numbers; Python requires an explicit constructor; C++ offers four named casts instead of C-style ones." });
  grp("格式化输入输出", {
    n: "Formatted input and output",
    t: "Turning data into text a person can read, and reading it back.",
    w: "A printf format string that disagrees with the argument types is undefined behaviour in C; C++ iostreams are type safe; Java uses Scanner and format strings; Python uses f-strings." });
  grp("字符与行 IO", {
    n: "Character and line IO",
    t: "Reading by character and reading by line are the two basic granularities of text.",
    w: "C's getchar and fgets work on the buffer directly; Python and Java offer higher-level line iteration, but encoding and buffering still bite." });
  grp("分支结构", {
    n: "Branching",
    t: "Letting the program take different paths under different conditions.",
    w: "Python's elif versus else if in C, C++ and Java is only spelling; the real traps are C and C++ switch fall-through and Python's indentation-delimited blocks." });
  grp("循环结构", {
    n: "Loops",
    t: "Repeating work is one of the most central capabilities of a program.",
    w: "Python's for iterates an iterable; the classic for in C, C++ and Java is a counting loop; range-based for only arrived with C++11 and Java 5." });
  grp("循环控制与跳转", {
    n: "Loop control and jumps",
    t: "Where break, continue and goto stop.",
    w: "C has goto, Python and Java do not (Java keeps the keyword reserved but unusable); Java's labelled break can exit a named outer loop." });
  grp("循环惯用法与模式", {
    n: "Loop idioms and patterns",
    t: "Translate common needs into a fixed loop shape.",
    w: "Python uses comprehensions, C++ uses the algorithm library, Java uses Stream; C makes you write the loop by hand, which is exactly why learning C is worth it: you see what others were doing for you." });
  grp("数组与序列容器", {
    n: "Arrays and sequence containers",
    t: "The most basic 'a run of same-typed data'.",
    w: "A C array decays to a pointer with no bounds check; a C++ vector grows and invalidates iterators; Java arrays are fixed length and ArrayList is not; Python's list is a dynamic array that may hold mixed types." });
  grp("多维结构", {
    n: "Multidimensional data",
    t: "Matrices, tables and nested data.",
    w: "The memory layout differs outright: a 2D array in C is one genuinely contiguous block, while the '2D' array in Java and Python is an array of arrays with each row allocated separately." });
  grp("字符串与文本处理", {
    n: "Strings and text handling",
    t: "Text is where the standard libraries differ most.",
    w: "C has no string type at all, only char arrays plus a terminator; C++ and Java give you a real string class; Python's str is immutable and its f-strings carry formatting inline." });
  grp("字典、集合与映射", {
    n: "Dicts, sets and maps",
    t: "Key-value lookup is the workhorse structure of everyday code.",
    w: "Python's dict and set are built into the language; Java needs the Collections framework with boxing costs; C++ uses unordered_map or map with very different ordering guarantees; in C you build it yourself." });
  grp("字符串", {
    n: "Strings",
    t: "The most used and most misunderstood type.",
    w: "Python and Java strings are immutable; a C string is a char array ending in '\\0', and modifying a literal is undefined behaviour; C++ std::string is mutable and manages memory for you." });
  grp("映射 / 字典", {
    n: "Maps and dicts",
    t: "Storing and reading key-value pairs.",
    w: "Python's dict is a language-level core structure; C++ uses map or unordered_map; Java uses HashMap; the C standard library has nothing of the sort, so you build it or import a third-party one." });
  grp("集合与去重", {
    n: "Sets and de-duplication",
    t: "Caring about whether something is present, not how many times.",
    w: "Python's set is a built-in type; C++ has set and unordered_set; Java has HashSet, where the hashability of elements matters." });
  grp("记录类型与复合数据", {
    n: "Record types and compound data",
    t: "Packing several fields into one whole.",
    w: "Python uses dataclass or NamedTuple, C uses struct, C++ uses struct and class which are nearly equivalent, Java uses class or record. This is also where object orientation begins." });
  grp("函数 / 方法的定义与参数", {
    n: "Defining functions and their parameters",
    t: "Name a piece of logic so it can be reused.",
    w: "The rules for defaults, overloading and variadic arguments all differ: a Python default is evaluated once, C++ supports both overloading and defaults, Java uses overloading plus varargs, and C has neither." });
  grp("参数传递语义", {
    n: "Argument-passing semantics",
    t: "Can a function reach out and change the caller's world?",
    w: "All four languages pass by value, but the value differs: C passes a copy of a pointer, a C++ reference is an alias, and Java and Python pass a copy of the object reference." });
  grp("作用域与生命周期", {
    n: "Scope and lifetime",
    t: "Where a name is visible, and how long an object lives.",
    w: "C has block scope plus linkage (static/extern); C++ adds namespaces and class scope; Java uses packages and access modifiers; Python resolves through the four LEGB layers." });
  grp("递归", {
    n: "Recursion",
    t: "A function calling itself to shrink the problem.",
    w: "Recursion is paid for in stack: C and C++ have a limited stack that crashes on overflow, Python caps the recursion depth, and Java can throw StackOverflowError too." });
  grp("高阶函数、lambda 与闭包", {
    n: "Higher-order functions, lambdas and closures",
    t: "Passing functions around as values.",
    w: "Python and C++ lambdas are both expressions, but C++ requires an explicit capture list; a Java lambda must target a functional interface; C has no closures at all, only function pointers plus a context struct." });
  grp("装饰器与元编程", {
    n: "Decorators and metaprogramming",
    t: "Enhance existing code without editing it.",
    w: "A Python decorator is a run-time function wrapper; C++ constrains at compile time with templates and concepts; Java combines annotations with reflection; C does text-level substitution with macros." });
  grp("模块、包与代码复用", {
    n: "Modules, packages and reuse",
    t: "Splitting a large program into maintainable files.",
    w: "Python uses import plus package directories; C uses headers plus source files plus linking; C++ adds namespaces on top of C, and templates require visible definitions; Java uses packages and the class path." });
  grp("标准库与常用工具", {
    n: "Standard library and common tools",
    t: "Do not reinvent the wheel; check the standard library first.",
    w: "The Python standard library is famous for batteries included; the C standard library is tiny (strings, IO, memory, time); C++ shines with STL containers and algorithms; Java's strength is its collections and concurrency libraries." });
  grp("依赖管理与构建", {
    n: "Dependency management and building",
    t: "Making the project runnable for other people too.",
    w: "Python uses venv plus requirements; C and C++ manage compilation and linking through a build system; Java manages dependencies and lifecycle with Maven or Gradle." });
  grp("文件读写", {
    n: "Reading and writing files",
    t: "Persisting data to disk.",
    w: "Open modes differ a lot: Python's 'w' truncates as well; C distinguishes text from binary modes; C++ uses fstream with RAII; Java stacks several layers of IO streams." });
  grp("路径与文件系统", {
    n: "Paths and the file system",
    t: "Directories, path joining and file attributes.",
    w: "Python has the object-oriented pathlib abstraction; C++17 added std::filesystem; Java's NIO.2 offers Path and Files; C is left with plain string paths." });
  grp("二进制 IO 与序列化", {
    n: "Binary IO and serialisation",
    t: "Writing an in-memory structure out and reading it back.",
    w: "C can fwrite a struct directly, but alignment and byte order make it unportable; Java has a language-level serialisation mechanism; Python usually reaches for pickle, struct or json." });
  grp("异常处理", {
    n: "Exception handling",
    t: "How a program exits gracefully when something unexpected happens.",
    w: "C has no exceptions at all and relies on return codes plus errno; C++ has them but you may choose not to use them; Java separates checked from runtime exceptions and forces you to handle the former; Python uses exceptions constantly." });
  grp("资源自动管理", {
    n: "Automatic resource management",
    t: "Give it back when you are done, and make sure it goes back on the exception path too.",
    w: "Three spellings of one idea: Python's with, C++ RAII and destructors, Java's try-with-resources. The principle is identical: bind release to a scope." });
  grp("类与对象基础", {
    n: "Classes and objects",
    t: "Keep data together with the behaviour that acts on it.",
    w: "Python requires self to be written explicitly; C++ has an implicit this; Java puts everything in a class, even main." });
  grp("构造与初始化", {
    n: "Construction and initialisation",
    t: "What should happen the moment an object is born.",
    w: "C++ has initializer lists, delegating and move constructors; Java has constructors plus instance initialisers, and super() must be the first statement; Python splits the work between __new__ and __init__." });
  grp("拷贝语义与对象复制", {
    n: "Copy semantics and cloning",
    t: "What exactly did copying an object copy?",
    w: "One of the biggest divergences: C++ separates deep copying from moving, Python separates shallow from deep copies, and Java by default copies nothing but the reference." });
  grp("继承与代码复用", {
    n: "Inheritance and reuse",
    t: "Extending an existing type into a new one.",
    w: "Python supports multiple inheritance and orders it with the MRO; C++ also allows it but composition is preferred; Java has single class inheritance plus multiple interfaces." });
  grp("多态与动态绑定", {
    n: "Polymorphism and dynamic binding",
    t: "One piece of code driving many concrete types.",
    w: "Python is duck typed and therefore naturally polymorphic; C++ needs virtual to bind dynamically; Java instance methods are virtual by default and can be overridden." });
  grp("抽象与接口", {
    n: "Abstraction and interfaces",
    t: "Agree on the contract before discussing the implementation.",
    w: "C++ expresses an abstract class with pure virtual functions; Java uses interface, which may carry default methods since Java 8; Python reaches for abstract base classes or simply a convention." });
  grp("运算符重载与魔术方法", {
    n: "Operator overloading and magic methods",
    t: "Make a user-defined type feel built-in.",
    w: "Python hooks syntax through dunder methods (len, +, [], iteration); C++ overloads most operators; Java forbids operator overload entirely, with + on strings the single exception." });
  grp("泛型与模板", {
    n: "Generics and templates",
    t: "Write it once, use it for many types.",
    w: "C++ templates generate code at compile time and allow specialisation and compile-time computation; Java generics erase, so the concrete type is gone at run time; Python type annotations are only metadata." });
  grp("迭代器与惰性求值", {
    n: "Iterators and lazy evaluation",
    t: "Produce one at a time instead of preparing everything up front.",
    w: "Python generators use yield; C++ uses iterator ranges; Java uses Iterator and Stream. All three aim for computing only what is needed." });
  grp("函数式数据处理", {
    n: "Functional data processing",
    t: "Turn how it is done into what you want.",
    w: "Python has itertools, functools and comprehensions; C++ uses <algorithm> and ranges; Java uses the Stream API. The readability of declarative style takes practice." });
  grp("并发：线程与同步", {
    n: "Concurrency: threads and synchronisation",
    t: "Make several things happen at once without making mistakes.",
    w: "The differences are large: Python is limited by the GIL and needs multiprocessing for CPU work; C++ uses thread, mutex and atomic; Java has a full memory model plus synchronized." });
  grp("并发：高级工具与异步", {
    n: "Concurrency: higher-level tools and async",
    t: "Thread pools, async orchestration and coroutines.",
    w: "Python's asyncio runs coroutines concurrently on one thread, which suits I/O-bound work; Java's JUC offers thread pools, concurrent collections and Future; C++ concurrency facilities are lower level." });
  grp("内存布局", {
    n: "Memory layout",
    t: "Where data actually lives while the program runs.",
    w: "C shows you the whole picture: stack, heap, static area and code segment; C++ layers object lifetimes on top; the JVM manages heap and stack for Java; in Python everything is an object managed by the interpreter." });
  grp("动态内存与手动管理", {
    n: "Dynamic memory and manual management",
    t: "Ask the system for memory yourself, and give it back yourself.",
    w: "This is C's central subject and exactly what the other three hide from you. After learning C, going back to Python or Java makes clear what the collector was doing on your behalf." });
  grp("智能指针与所有权", {
    n: "Smart pointers and ownership",
    t: "Automate release without giving up performance.",
    w: "One of C++'s biggest steps over C: unique_ptr expresses exclusive ownership, shared_ptr shared ownership, and weak_ptr breaks reference cycles." });
  grp("值类别与移动语义", {
    n: "Value categories and move semantics",
    t: "Separate a temporary whose resources you may take from a named object you may not.",
    w: "A concept unique to C++ and central to its performance. The other three languages spare you this mental load, at the price of losing that layer of control." });
  grp("内存错误与检测", {
    n: "Memory errors and tooling",
    t: "How to find errors you cannot see.",
    w: "Many C and C++ errors do not crash immediately; they quietly produce wrong results. Reaching for a detector is far more efficient than debugging afterwards." });
  grp("枚举、联合与位运算", {
    n: "Enums, unions and bit operations",
    t: "Express a finite set of values, reuse memory, and work at the bit level.",
    w: "A C enum is really an integer and mixes easily with int; C++ enum class adds scope and type safety; Python has the Enum class; Java's enum is a fully featured class." });
  grp("预处理器与宏", {
    n: "Preprocessor and macros",
    t: "Text substitution before compilation.",
    w: "Macros expand before any type checking, so the diagnostics are often baffling. The C++ consensus: prefer constants, inline functions and templates over macros." });
  grp("类型别名", {
    n: "Type aliases",
    t: "Give a complicated type a shorter name.",
    w: "C uses typedef; C++ prefers using aliases, which work with templates; Python and Java have no direct equivalent, and Java expresses it through classes or type parameters." });
  grp("函数指针与回调", {
    n: "Function pointers and callbacks",
    t: "Hand a piece of behaviour to someone else to invoke at the right moment.",
    w: "C uses function pointers; C++ accepts pointers, function objects, lambdas or std::function; Java uses an interface or a lambda; Python simply passes the function." });
  grp("未定义行为与可移植性", {
    n: "Undefined behaviour and portability",
    t: "Does your code behave the same everywhere it runs?",
    w: "A subject unique to C and C++: the same code can behave differently across compilers or optimisation levels. The other languages trade some of that control for predictability." });
})();
