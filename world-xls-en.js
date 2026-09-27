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
  grp("字符串与文本处理", {
    n: "Strings and text handling",
    t: "How three more languages model text.",
    w: "JS strings are immutable with template-literal interpolation; C# strings are immutable but StringBuilder handles heavy concatenation; a Go string is a read-only byte slice." });
  grp("未定义行为与可移植性", {
    n: "Undefined behaviour and portability",
    t: "Does your code behave the same everywhere it runs?",
    w: "A subject unique to C and C++: the same code can behave differently across compilers or optimisation levels. The other languages trade some of that control for predictability." });
  grp("测试与调试", {
    n: "Testing and debugging",
    t: "How to confirm the code is right, and find out where it is wrong.",
    w: "All four languages push automated testing, but C and C++ add memory and UB detectors on top — valgrind and the sanitizers are part of the toolkit, not an optional extra." });
  grp("类型标注与静态检查", {
    n: "Type annotations and static checking",
    t: "Catch mistakes before the program ever runs.",
    w: "Python annotations are optional metadata checked by tools such as mypy or pyright; Java and C++ enforce types in the compiler; C++ concepts put constraints into the type system itself." });
  grp("项目结构与打包发布", {
    n: "Project layout and packaging",
    t: "Let other people install and use your code.",
    w: "Python packages into a wheel and publishes it; Java ships a jar; C and C++ must deal with headers, library files and ABI compatibility — the packaging story is the least standardised." });
  grp("运行时与虚拟机", {
    n: "Runtimes and virtual machines",
    t: "Who actually executes the code in the end?",
    w: "Python has an interpreter plus the GIL; Java has the JVM with class loading and JIT; C and C++ compile straight to machine code — there is no layer between your program and the CPU." });
  grp("垃圾回收", {
    n: "Garbage collection",
    t: "Who decides a piece of memory may be reclaimed?",
    w: "Java uses reachability analysis with generational collectors; Python leans on reference counting plus a cycle collector; C++ makes destruction deterministic through ownership and destructors; in C you are on your own." });
  grp("语言定位：JS/C#/Go", {
    n: "Language positioning: JS, C# and Go",
    t: "The design philosophy behind the three newer languages.",
    w: "JS lives in the browser, C# is Microsoft's enterprise-grade language, and Go was born for the cloud and concurrency — choosing a language is choosing an ecosystem." });
  grp("变量声明与类型系统", {
    n: "Variable declarations and type systems",
    t: "Dynamic versus static versus inferred.",
    w: "JS is dynamically typed and the most flexible; C# is statically typed and the strictest; Go is static too but keeps things terse with the := short declaration." });
  grp("并发模型对比", {
    n: "Concurrency models compared",
    t: "C# async/await vs Go goroutines vs the JS event loop.",
    w: "JS is single-threaded with an event loop plus microtask queue; C# builds on async/await and Task over a thread pool; Go runs goroutines with channels. All three avoid blocking threads, but who does the scheduling differs greatly." });
  grp("对象与类", {
    n: "Objects and classes",
    t: "Three flavours of object orientation.",
    w: "JS is prototype chains with class as syntactic sugar; C# has full type-safe OOP; Go has no classes at all — just structs, methods and implicit interfaces." });
  grp("集合与数据结构", {
    n: "Collections and data structures",
    t: "Dynamic arrays, key-value maps and sets.",
    w: "JS ships Array, Map and Set; C# has List<T>, Dictionary<K,V> and HashSet<T>; Go has slices and maps — and no built-in Set, idiomatically map[K]struct{}." });
  grp("错误处理", {
    n: "Error handling",
    t: "Three philosophies of failure.",
    w: "JS throws and catches; C# models errors as an exception class hierarchy; Go returns error values explicitly and never throws — if err != nil is the idiom." });
  grp("模块与包管理", {
    n: "Modules and package management",
    t: "How code is organised and dependencies installed.",
    w: "JS uses npm with ESM import/export; C# uses NuGet with using directives and .csproj; Go uses go mod, where the import path is the package path." });
  grp("接口与抽象", {
    n: "Interfaces and abstraction",
    t: "Interfaces define the contract.",
    w: "JS has no formal interfaces (duck typing); C# declares them with implements; Go satisfies interfaces implicitly — no keyword needed, the method set is the proof." });
  grp("测试与工程实践", {
    n: "Testing and engineering practice",
    t: "How do you know the code is correct?",
    w: "JS reaches for Jest or Mocha; C# for xUnit or NUnit; Go ships a native testing package where table-driven tests are the convention." });

  /* ---------- 格点拨（263 格 / 185 键，键「语言:课节id」，多组共享） ---------- */
  cell("py:py-1-1","Interpreted glue language: wins on development speed and ecosystem density; the price is that type errors only surface at run time.");
  cell("c:c-1-1","Portable assembly close to the hardware — the foundation of nearly every operating system; no runtime, no safety net.");
  cell("cpp:cpp-1-1","Modern C++ leans far less on macros, though conditional compilation still needs them.");
  cell("java:java-1-1","Bytecode plus the JVM buys portability; the JIT optimises the hot spots.");
  cell("py:py-1-2","Install the interpreter, then isolate dependencies in a venv so packages never pollute the system environment.");
  cell("c:c-1-2","Install a compiler (gcc/clang/MSVC) and learn to read command-line flags and error line numbers.");
  cell("cpp:cpp-1-2","Choosing static or dynamic libraries affects how the result deploys.");
  cell("java:java-1-2","The build tool resolves dependencies and handles compiling, testing and packaging.");
  cell("py:py-1-3","The interpreter runs line by line — cross-platform, but slower.");
  cell("c:c-1-3","Every symbol needs a declaration; main is the only entry point and returns int.");
  cell("cpp:cpp-1-3","Namespaces prevent name collisions; template definitions usually must live in headers.");
  cell("java:java-1-3","The class name must match the file name, all code lives inside classes, and main is a static entry point.");
  cell("py:py-1-4","Indentation is syntax, not style; comments use #, docstrings use triple quotes.");
  cell("c:c-1-4","Build output is bound to the platform — recompile when the platform changes.");
  cell("cpp:cpp-1-4","<< and >> are type safe; endl forces a flush, so don't overuse it.");
  cell("java:java-1-4","A clear package structure is the precondition of a maintainable project.");
  cell("py:py-2-1","A variable is just a name binding; the same name can point to objects of different types over time.");
  cell("c:c-2-1","The type fixes memory width and interpretation; a mistake yields wrong results, not an error.");
  cell("cpp:cpp-2-1","auto saves you typing but does not change the fundamentally static typing.");
  cell("java:java-2-1","Primitive widths are fixed by the language spec and identical everywhere; watch the Integer cache trap.");
  cell("py:py-2-2","int has arbitrary precision, float follows IEEE 754, and / always yields a float.");
  cell("c:c-2-2","Type width is implementation-defined; for exact widths use int32_t and friends from <stdint.h>.");
  cell("c:c-2-3","Floating point cannot represent 0.1 exactly — compare with an epsilon, never ==.");
  cell("py:py-2-3","and/or/not are keywords that return an operand rather than a bool; short-circuiting makes good guards.");
  cell("c:c-2-4","Integer promotions and usual arithmetic conversions quietly change signedness — unsigned operands are especially dangerous.");
  cell("cpp:cpp-3-1","Since C++17 you can write if (init; cond) to keep helper variables scoped.");
  cell("java:java-2-3","Narrowing conversions need an explicit cast; boxing and unboxing between wrappers and primitives happen automatically.");
  cell("py:py-4-2","tuple is lightweight; dataclass fits better when fields have names.");
  cell("c:c-7-4","const int *p and int * const p mean completely different things — read declarations from right to left.");
  cell("cpp:cpp-2-2","const means read-only at run time; constexpr demands evaluability at compile time.");
  cell("java:java-2-2","Locals are not default-initialised; static members belong to the class.");
  cell("py:py-10-4","Reference counting reclaims immediately; the generational collector handles reference cycles.");
  cell("c:c-7-1","A pointer is an explicit address — make sure it points at valid memory before dereferencing.");
  cell("cpp:cpp-2-3","References must be initialised and cannot rebind; there is no legal null reference.");
  cell("java:java-5-2","Swapping two object references inside a method has no effect — a classic interview question.");
  cell("py:py-2-4","f-strings are readable and fast; formatting and conversion usually happen in one step.");
  cell("cpp:cpp-2-4","enum class keeps names scoped — the preferred form.");
  cell("c:c-3-1","The format string must match argument types exactly: %d with a double is undefined behaviour.");
  cell("c:c-3-2","scanf needs addresses; a leftover newline will bite the next fgets.");
  cell("java:java-2-4","Scanner reads input; String.format or printf writes output.");
  cell("py:py-7-1","The with statement calls __enter__/__exit__ and closes even when an exception is raised.");
  cell("c:c-3-3","getchar returns int, not char — otherwise EOF cannot be received correctly.");
  cell("c:c-3-4","fgets keeps the trailing newline, and its return value must be checked.");
  cell("java:java-8-2","Character streams need an explicit charset — avoid the platform default encoding.");
  cell("py:py-3-1","elif avoids deep nesting; Python has no switch (a dict dispatch works as a substitute).");
  cell("c:c-4-1","A switch case without break falls through; always keep a default.");
  cell("java:java-3-1","switch accepts String and enum, but not long.");
  cell("py:py-3-2","for x in iterates an iterable; use enumerate when you need the index.");
  cell("c:c-4-2","The three-part for; watch boundaries and unsigned wrap-around in index loops.");
  cell("cpp:cpp-3-2","Range for: const auto& to read, auto& to modify — avoid accidental copies.");
  cell("java:java-3-2","Removing while iterating an enhanced for requires Iterator.remove.");
  cell("py:py-3-3","break/continue affect only the innermost loop; for-else runs its else when no break happened.");
  cell("c:c-4-3","goto belongs to unified error-exit handling only, never general flow control.");
  cell("cpp:cpp-3-3","Block scope + namespaces + class scope; RAII ties lifetime to scope.");
  cell("java:java-3-3","A labelled break exits precisely from nested loops — the sane replacement for goto.");
  cell("py:py-3-4","Comprehensions are readable and fast, but don't nest more than two levels.");
  cell("c:c-4-4","Hand-written loops must handle sentinels, boundaries and early exits.");
  cell("cpp:cpp-3-4","Structured bindings make iterating a map pleasant.");
  cell("java:java-3-4","IDE debugger plus unit tests is the daily routine.");
  cell("py:py-4-1","Nested lists are common but each row is separate; use a library or a comprehension to initialise numeric data.");
  cell("c:c-6-1","Array length information is lost in parameter passing — pass the length separately.");
  cell("cpp:cpp-8-1","For contiguous memory simulate 2D with a 1D array, or use vector<vector> knowing the cost.");
  cell("java:java-4-1","Arrays are fixed-length with a length field; Arrays adds sorting, filling and friends.");
  cell("c:c-6-2","A 2D array is row-major contiguous in memory; the column count must accompany the parameter.");
  cell("java:java-4-2","A 2D array is an array of arrays and may be ragged (rows of different lengths).");
  cell("py:py-4-4","set elements must be hashable — a list cannot go into a set.");
  cell("c:c-6-3","Strings end in '\\0'; sizeof and strlen differ by one; store literals in const char *.");
  cell("c:c-6-4","strcpy never checks the destination size and strncpy may not terminate — the classic overflow source.");
  cell("cpp:cpp-8-4","Algorithms plus lambdas replace the vast majority of hand-written loops.");
  cell("java:java-4-3","The string pool can make == on literals accidentally true; always use equals.");
  cell("java:java-4-4","Concatenate in loops with StringBuilder; String's + keeps producing new objects.");
  cell("py:py-4-3","dict preserves insertion order; get with a default avoids KeyError.");
  cell("cpp:cpp-8-2","An ordered set requires comparable elements; the unordered version requires hashable ones.");
  cell("java:java-7-3","The collections framework is the most-used part of everyday development.");
  cell("c:c-9-1","A struct holds data only; member functions are simulated with function pointers.");
  cell("cpp:cpp-5-1","class defaults to private, struct to public — otherwise identical.");
  cell("java:java-5-3","Constructors overload; this() and super() must both be the first statement.");
  cell("py:py-5-1","In-place mutation of a mutable object leaks out; rebinding does not.");
  cell("c:c-5-1","Declare a prototype before use; spell out parameters and return types.");
  cell("cpp:cpp-4-1","Tail recursion is not guaranteed optimisation — don't rely on the compiler.");
  cell("java:java-5-1","Recursion reads well, but deep recursion risks a stack overflow.");
  cell("c:c-5-2","To change a caller's variable you must pass its address.");
  cell("cpp:cpp-4-2","Pass large objects by const reference to avoid copies; use a non-const reference to modify.");
  cell("py:py-5-2","Closures remember free variables — beware late binding when creating them in loops.");
  cell("c:c-5-3","static gives internal linkage or extends lifetime; extern declares an external definition.");
  cell("py:py-5-4","@deco is just f = deco(f); functools.wraps preserves the metadata.");
  cell("c:c-5-4","Each call pushes a stack frame — mind the base case and convergence.");
  cell("py:py-5-3","Functions are first-class citizens; just pass them, the simplest option.");
  cell("cpp:cpp-4-3","The capture list decides by-value vs by-reference; capturing by reference risks dangling.");
  cell("cpp:cpp-4-4","std::function is general but type-erases; a template parameter is cheaper.");
  cell("java:java-10-1","Callbacks are expressed as functional interfaces plus lambdas.");
  cell("cpp:cpp-7-4","concepts turn template error messages into something readable.");
  cell("java:java-10-3","Annotations are metadata only — reflection or a processor makes them act.");
  cell("py:py-6-1","import executes the module's top-level code; use if __name__ to separate running from importing.");
  cell("py:py-6-2","Relative imports only work inside a package — don't run a package module as a script.");
  cell("c:c-9-4","#define is pure text substitution — parenthesise parameters; guard headers against double inclusion.");
  cell("py:py-6-3","Check the standard library before reaching for third-party code; the docs are the best textbook.");
  cell("c:c-10-3","Assertions plus return-code checks, paired with valgrind/ASan.");
  cell("py:py-6-4","Virtual environments isolate; requirements.txt pins the versions.");
  cell("c:c-10-1","Always null-check after fopen; 'w' truncates, 'a' appends.");
  cell("cpp:cpp-10-2","std::filesystem gives cross-platform file and directory operations.");
  cell("java:java-8-1","Byte and character streams have separate roles; buffered streams buy performance.");
  cell("py:py-7-2","pathlib joins paths with / — cross-platform and readable.");
  cell("java:java-8-4","Path and Files are the heart of NIO.2 — nicer than the legacy File class.");
  cell("c:c-10-2","fread/fwrite move raw bytes; watch struct alignment and endianness.");
  cell("java:java-8-3","transient fields are skipped by serialisation; mind serialVersionUID.");
  cell("py:py-7-3","try/except/else/finally; catch specifically — never a bare except.");
  cell("py:py-7-4","Write your own context managers to encapsulate paired operations.");
  cell("cpp:cpp-10-1","Exception safety rests on RAII; noexcept influences move-semantics choices.");
  cell("java:java-7-1","Checked exceptions must be caught or declared; Error is normally left alone.");
  cell("cpp:cpp-9-1","No GC — scope and smart pointers give deterministic release.");
  cell("java:java-7-2","Implement AutoCloseable and resources close automatically, avoiding exception masking.");
  cell("py:py-8-1","Abstract base classes or protocol conventions; in practice docs and duck typing carry the weight.");
  cell("cpp:cpp-5-2","Members are initialised before the constructor body runs — const and reference members require the list.");
  cell("cpp:cpp-5-3","Rule of Zero/Three/Five: define a destructor and you must think about copy and move.");
  cell("java:java-6-4","Object.clone has subtle semantics — prefer a copy constructor or copy factory.");
  cell("py:py-8-2","Duck typing: care about behaviour, not the type.");
  cell("cpp:cpp-6-1","The inheritance mode affects access; prefer composition over inheritance.");
  cell("java:java-6-1","extends is single inheritance; interfaces are the main tool for expressing capability.");
  cell("cpp:cpp-6-2","If deletion happens through a base pointer, the base destructor must be virtual.");
  cell("java:java-6-2","Fields don't participate in polymorphism — only method calls dispatch dynamically.");
  cell("cpp:cpp-6-3","A class with pure virtual functions cannot be instantiated — the main way to define interfaces.");
  cell("java:java-6-3","An enum can have constructors, fields and methods, and even implement interfaces.");
  cell("py:py-8-3","__len__, __getitem__, __add__ and friends weave custom types into the language.");
  cell("cpp:cpp-5-4","Operator overloads must keep semantic intuition — otherwise write a plain function.");
  cell("py:py-10-2","Annotations live in __annotations__; mypy/pyright do the checking.");
  cell("cpp:cpp-7-1","Templates generate code at instantiation; definitions usually belong in headers.");
  cell("cpp:cpp-7-2","using aliases can carry template parameters — stronger than typedef.");
  cell("java:java-7-4","Generics give compile-time type safety, limited by erasure.");
  cell("py:py-9-1","yield suspends the function state and produces lazily, saving memory.");
  cell("cpp:cpp-8-3","Iterators are the glue between algorithms and containers; know the invalidation rules.");
  cell("java:java-10-2","A Stream is consumed once — it cannot be reused.");
  cell("py:py-9-2","itertools makes permutations, combinations and infinite sequences easy.");
  cell("py:py-9-3","The GIL lets only one thread execute bytecode at a time; use multiprocessing for CPU-bound work.");
  cell("cpp:cpp-10-3","A thread must be joined or detached before destruction; guard shared data with a mutex.");
  cell("java:java-9-1","start() creates the thread; calling run() directly is just a normal method call.");
  cell("java:java-9-2","synchronized gives mutual exclusion and visibility; volatile does not make compound operations atomic.");
  cell("py:py-9-4","async/await define coroutines that only run when an event loop schedules them.");
  cell("java:java-9-3","Thread pools prevent unbounded thread creation; beware unbounded queues.");
  cell("java:java-9-4","CompletableFuture orchestrates async work with more control than raw threads.");
  cell("c:c-8-1","The layout of stack, heap, static area and code segment decides how long variables live.");
  cell("java:java-10-4","GC roots and reachability analysis; collectors trade throughput against pause times.");
  cell("c:c-8-2","Check malloc for null; free exactly once when done.");
  cell("c:c-8-3","Overflow, leaks, dangling pointers and double frees — detect with valgrind or ASan/UBSan.");
  cell("c:c-8-4","Building linked lists and stacks on dynamic memory is a rite of passage.");
  cell("cpp:cpp-9-4","ASan/LSan/UBSan should be standard equipment during development.");
  cell("cpp:cpp-9-2","std::move is only a cast — the actual moving happens in the move constructor.");
  cell("cpp:cpp-9-3","Perfect forwarding and reference folding let templates preserve value categories.");
  cell("py:py-8-4","Enum is a class; members can carry attributes and methods.");
  cell("c:c-9-3","union members share one memory block; bit fields and bit operations suit low-level protocols.");
  cell("c:c-9-2","typedef makes complex declarations readable — part of interface design.");
  cell("c:c-10-4","Signed overflow, out-of-bounds access and uninitialised reads are all UB — the program may quietly return wrong answers.");
  cell("cpp:cpp-10-4","The trio: unit tests + sanitizers + profiling.");
  cell("py:py-10-1","unittest or pytest; assertion and case design matter more than the framework.");
  cell("py:py-10-3","pyproject.toml plus a build backend; export the dependency list for reproducibility.");
  cell("js:js-1-1","The only choice for the web front end; Node.js carried it into backends and tooling.");
  cell("cs:cs-1-1","Type-safe, powering Unity games and enterprise backends; the .NET ecosystem widened after cross-platform support.");
  cell("go:go-1-1","Simple, natively concurrent, fast to compile — the language behind Docker and Kubernetes.");
  cell("js:js-1-2","let/const give block scope; types are decided at run time.");
  cell("cs:cs-1-3","var is compile-time inference, still statically typed.");
  cell("go:go-1-3",":= declares short variables with the compiler inferring types.");
  cell("js:js-5-1","Single thread + event loop; promise chains; async/await.");
  cell("js:js-5-2","A single-threaded event loop; async/await keeps async code readable.");
  cell("cs:cs-5-2","async/await plus Task over a thread pool; await holds no thread.");
  cell("go:go-5-1","Goroutines are lightweight concurrency with channel communication — share memory by communicating; select multiplexes.");
  cell("js:js-6-1","Duck typing: having the method is implementing it.");
  cell("cs:cs-4-1","Full OOP: classes, inheritance, interfaces, polymorphism.");
  cell("go:go-3-3","No classes or inheritance — structs, methods and implicit interfaces.");
  cell("js:js-1-4","Template literals use backticks + ${}; they can span multiple lines.");
  cell("cs:cs-1-4","$\" interpolation; StringBuilder for heavy concatenation.");
  cell("go:go-1-4","Double-quoted strings; fmt.Sprintf for formatting; a string is a read-only byte slice underneath.");
  cell("js:js-3-1","Array.map/filter/reduce; Map keys can be any type.");
  cell("cs:cs-3-1","List<T> generic collections; Dictionary is a hash table with O(1) lookup.");
  cell("go:go-3-1","A slice is the dynamic array; maps must be made; there is no Set.");
  cell("js:js-5-4","throw anything; try/catch/finally; Promise catch.");
  cell("cs:cs-5-1","Exceptions are classes: the Exception hierarchy; catch by type.");
  cell("go:go-4-2","The error interface with nil meaning success; if err != nil is the convention.");
  cell("js:js-6-3","ES Modules with static import/export; npm manages dependencies.");
  cell("cs:cs-3-3","using imports namespaces; NuGet installs packages; .csproj manages the project.");
  cell("go:go-7-1","go mod init; the import path is the package path; go mod tidy.");
  cell("cs:cs-4-4","Interfaces are declared explicitly; one class may implement many.");
  cell("go:go-4-1","Implicit satisfaction: a matching method set is implementing the interface.");
  cell("js:js-8-3","console.table for debugging; Jest for tests; npm test to run.");
  cell("cs:cs-7-1","xUnit [Fact]/[Theory]; the AAA pattern; DI makes testing easier.");
  cell("go:go-7-2","_test.go files; go test; table-driven tests are the convention.");
})();
