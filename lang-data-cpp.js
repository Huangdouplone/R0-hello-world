/* ============================================================
 * R0：从零开始的编程之路 · 课程数据：C++
 * 制作者 / Creator: Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * ============================================================ */
window.LANG_DATA = window.LANG_DATA || {};

const CPP_STAGES = [
{
  id:"cpp-s1", icon:"🚀", name:"现代 C++ 启航", desc:"认识 C++、搭好工具链、跑通第一个程序", lv:"basic",
  goal:"装好编译环境，理解 C++ 与 C 的关系及标准演进，能独立编译运行并使用标准输入输出。",
  links:[["cppreference 中文 · C++ 参考","https://zh.cppreference.com/w/cpp"],["菜鸟教程 · C++ 教程","https://www.runoob.com/cplusplus/cpp-tutorial.html"]],
  lab:{t:"个人信息卡",req:["用 std::cout 输出昵称、目标语言、今天日期三行","用 std::cin 读入一个整数年龄并回显（做基本的输入失败处理）","用 <iomanip> 让其中一列按宽度 10 左对齐输出"],starter:`#include <iostream>\n#include <iomanip>\n#include <string>\n\nint main() {\n    std::string name;\n    int age = 0;\n    std::cout << "昵称: ";\n    std::cin >> name;\n    // 读入年龄并回显，注意输入失败的处理\n    std::cout << std::left << std::setw(10) << name << age << std::endl;\n    return 0;\n}`,hint:"判断输入失败用 if (!(std::cin >> age))；失败后要 clear() 并 ignore() 才能继续读。",xp:20},
  lessons:[
  {id:"cpp-1-1",title:"认识 C++：从 C 到现代 C++",min:8,summary:["C++ 是 C 的超集（大体上），在保留底层控制力的同时加入了面向对象、泛型与标准库。","标准演进：C++98 → C++11（现代 C++ 起点）→ 14/17 → 20（概念、协程、范围库）→ 23。","主战场：游戏引擎、高频交易、浏览器与数据库内核、嵌入式、高性能服务。"],code:`// 同一件事，C 与 C++ 的写法对比\n// C:   int* p = (int*)malloc(n * sizeof(int));\n// C++: std::vector<int> v(n);\n// C++ 把「正确且高效」变成默认选项`,pit:"不要把 C++ 当成「带类的 C」：现代 C++ 推崇 RAII、值语义与标准库，手写 new/delete 反而是反模式。",ex:{q:"学 C++ 之前要不要先学 C？",a:"不必。C++ 有自己的一套惯用法；先学 C 反而容易养成手动管理内存的习惯，而现代 C++ 恰恰要你忘掉它。"},target:"能说清 C++ 的定位、应用领域与标准版本脉络。"},
  {id:"cpp-1-2",title:"环境搭建与编译工具链",min:15,summary:["编译器：g++（GCC）、clang++（LLVM）、MSVC（Windows）；用 g++ --version 验证。","单文件编译：g++ -std=c++17 -Wall -Wextra main.cpp -o main。","多文件与工程：用 CMake 描述构建（cmake -S . -B build && cmake --build build）。"],code:`g++ -std=c++17 -Wall -Wextra main.cpp -o main\n./main\n\n# CMakeLists.txt 最小示例\ncmake_minimum_required(VERSION 3.16)\nproject(hello)\nadd_executable(hello main.cpp)`,pit:"一定要加 -std=c++17（或更高），否则编译器可能按老标准编译，导致结构化绑定等新特性报错。",ex:{q:"为什么要打开 -Wall -Wextra？",a:"大量潜在 bug（未初始化、符号比较、类型窄化）会在编译期被警告出来，是最便宜的质量保险。"},target:"能编译运行单文件程序，并看懂最小 CMake 工程。"},
  {id:"cpp-1-3",title:"第一个程序与命名空间",min:10,summary:["#include <iostream> 引入输入输出库；int main() 是入口，return 0 表示正常结束。","namespace 用来隔离名字，标准库全在 std 中；用 std::cout 或 using 声明。","不要在头文件里写 using namespace std;——它会把名字污染带给所有包含者。"],code:`#include <iostream>\n\n// using namespace std;  // 小练习可以，工程里别在头文件用\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}`,pit:"main 函数省略 return 是合法的（编译器补 return 0），但显式写出更清晰。",ex:{q:"std::endl 和 \\n 有什么区别？",a:"endl 除了换行还会强制刷新缓冲区，频繁使用会明显拖慢输出；一般情况用 \\n 即可。"},target:"能写出 Hello World 并解释 iostream 与命名空间的作用。"},
  {id:"cpp-1-4",title:"输入输出 iostream",min:10,summary:["std::cout << 输出，std::cin >> 输入，都可链式拼接。","cin >> 遇到空白停止，读整行用 std::getline(cin, s)；混用两者要注意清掉残留换行。","格式化用 <iomanip>：setw 宽度、setprecision 精度、fixed 定点、hex/oct 进制。"],code:`#include <iostream>\n#include <iomanip>\n\nint n = 255;\nstd::cout << std::hex << n << " " << std::dec << n << "\\n";\nstd::cout << std::fixed << std::setprecision(2) << 3.14159 << "\\n";`,pit:"cin >> x 失败后流会进入失效状态，后续所有读取都直接失败——要 clear() 恢复并 ignore() 丢弃错误内容。",ex:{q:"读入一行带空格的姓名该怎么做？",a:"std::getline(std::cin, name)；如果前面用过 >>，先 std::cin.ignore() 吃掉残留换行。"},target:"能完成带输入校验与格式化的控制台交互。"}
  ],
  quiz:[
   {q:"C++ 标准库所在的命名空间是？",o:["std","cpp","standard","lib"],a:0,why:"标准库的所有名字都在 std 命名空间内。"},
   {q:"读入一整行（含空格）应使用？",o:["cin >> s","getline(cin, s)","cin.get()","scanf"],a:1,why:"getline 读到换行符为止，可以包含空格。"},
   {q:"开启 C++17 标准的编译参数是？",o:["-std=c17","-std=c++17","-std=gnu99","-Wall"],a:1,why:"-std=c++17 指定语言标准版本。"}
  ]
},
{
  id:"cpp-s2", icon:"🔢", name:"类型、const 与引用", desc:"auto、const/constexpr、引用与转换", lv:"basic",
  goal:"理解 C++ 类型系统与值/引用语义，能正确使用 const 与 constexpr，掌握四种命名转换。",
  links:[["cppreference · 类型","https://zh.cppreference.com/w/cpp/language/types"],["cppreference · const 与 constexpr","https://zh.cppreference.com/w/cpp/language/cv"]],
  lab:{t:"类型与转换实验",req:["用 auto 与 decltype 推导若干表达式的类型并打印 typeid(...).name()","演示 const 与 constexpr 的区别：一个用运行期变量初始化，一个用编译期常量","把 double→int 分别用隐式转换、static_cast 与 C 风格转换，观察差异"],starter:`#include <iostream>\n#include <typeinfo>\n\nint main() {\n    auto x = 3.14;          // double\n    decltype(x) y = 2.0;\n    const int a = 10;\n    constexpr int b = 10;\n    double d = 3.99;\n    std::cout << static_cast<int>(d) << "\\n";\n    return 0;\n}`,hint:"typeid 的 name() 输出是编译器相关的缩写；constexpr 要求初值在编译期可求。",xp:20},
  lessons:[
  {id:"cpp-2-1",title:"基本类型与 auto",min:10,summary:["内置类型：bool、char、int、long long、float、double；<cstdint> 提供 int32_t 等定宽类型。","auto 让编译器推导类型：auto i = 0;（int）、auto d = 0.0;（double）。","auto 必初始化，且会剥掉引用与顶层 const；想保留用 const auto& 或 decltype。"],code:`auto i = 42;              // int\nauto d = 3.14;            // double\nconst auto &r = i;        // const int&\ndecltype(i) j = i + 1;    // int`,pit:"auto 在循环里拷贝元素（for (auto x : v)），遍历大对象要写 const auto& 避免拷贝。",ex:{q:"什么时候不该用 auto？",a:"当类型本身就是你想表达的信息时（如 auto x = get_size() 看不出单位），或需要隐式类型转换的场合。"},target:"能用 auto/decltype 简化声明并理解推导规则。"},
  {id:"cpp-2-2",title:"const 与 constexpr",min:10,summary:["const 表示「这个对象不可被修改」，是编译期契约，也帮助编译器优化。","constexpr 表示「值在编译期就能算出来」，可用于数组长度、模板参数等编译期上下文。","const 成员函数（void f() const;）承诺不修改对象状态，const 对象只能调用它们。"],code:`const int n = 10;\nconstexpr int m = 10;\nint arr[m];            // OK：编译期常量\n\nstruct S {\n    int v;\n    int get() const { return v; }   // const 成员函数\n};`,pit:"const 变量未必是编译期常量（如用函数返回值初始化），需要编译期常量必须用 constexpr。",ex:{q:"const int *p、int *const p 的区别？",a:"前者指向的值不可改（pointer to const），后者指针本身不可改（const pointer）。"},target:"能正确区分并用好 const 与 constexpr。"},
  {id:"cpp-2-3",title:"引用与指针",min:12,summary:["引用是对象的别名：int &r = x; 必须初始化，且一旦绑定不可改指向。","优先用引用而非指针表达「不为空、不转移所有权」的关系；指针表达「可选 / 可为空 / 可重定向」。","返回引用时绝不能返回局部变量的引用——函数返回后对象已销毁。"],code:`int x = 1;\nint &r = x;\nr = 2;                 // x 变成 2\nvoid f(int &v);        // 想修改实参就用引用\nvoid g(const std::string &s);  // 只读大对象，避免拷贝`,pit:"别返回局部变量的引用或指针，这是悬垂引用，行为未定义；需要返回就按值返回，依靠移动语义优化。",ex:{q:"传参时何时用值、何时用 const 引用？",a:"小对象（int、指针、迭代器）传值；大对象（std::string、容器）用 const 引用；需要修改用非常量引用。"},target:"能正确使用引用参数与 const 引用避免拷贝。"},
  {id:"cpp-2-4",title:"类型转换与枚举",min:10,summary:["C++ 提供四种命名转换：static_cast（常规）、const_cast（去 const）、reinterpret_cast（位重解释）、dynamic_cast（多态下行转换）。","优先用 static_cast 替代 C 风格转换，语义清晰且能被搜索到。","enum class（限定作用域枚举）不会泄漏名字到外层，也不会隐式转成 int，比传统 enum 更安全。"],code:`enum class Color { Red, Green, Blue };\nColor c = Color::Red;\n// int x = c;              错误：不会隐式转换\nint x = static_cast<int>(c);   // 显式转换\ndouble d = static_cast<double>(5) / 2;   // 2.5`,pit:"reinterpret_cast 几乎只在与底层硬件/序列化打交道时使用，滥用会带来移植灾难。",ex:{q:"为什么推荐 enum class 而不是 enum？",a:"它有作用域（Color::Red 而非 Red）、不会污染外层命名空间、不隐式转为整数，类型更安全。"},target:"能用 static_cast 与 enum class 写出类型安全的代码。"}
  ],
  quiz:[
   {q:"auto 推导时会保留？",o:["引用与顶层 const","什么都不保留","只保留 const","只保留引用"],a:1,why:"auto 会剥掉引用和顶层 const，需要时显式写 const auto&。"},
   {q:"编译期常量应使用？",o:["const","constexpr","static","volatile"],a:1,why:"constexpr 保证值在编译期可求，可用于数组长度等场合。"},
   {q:"引用一旦绑定后？",o:["可以改指向","不能改指向","自动为空","需要解引用"],a:1,why:"引用是别名，绑定后不可重新绑定到别的对象。"}
  ]
},
{
  id:"cpp-s3", icon:"🔀", name:"控制流与结构化", desc:"分支、循环、范围 for 与结构化绑定", lv:"basic",
  goal:"掌握现代 C++ 的循环写法与作用域控制，能用范围 for 与结构化绑定简化代码。",
  links:[["cppreference · 语句","https://zh.cppreference.com/w/cpp/language/statements"],["cppreference · 范围 for","https://zh.cppreference.com/w/cpp/language/range-for"]],
  lab:{t:"成绩单统计",req:["用 std::vector<std::pair<std::string,int>> 存若干姓名与成绩","用范围 for + 结构化绑定遍历，求平均分与最高分","用范围 for 打印表格，姓名左对齐宽 10、成绩右对齐宽 4"],starter:`#include <iostream>\n#include <vector>\n#include <string>\n#include <iomanip>\n\nint main() {\n    std::vector<std::pair<std::string, int>> v = {{"Ann", 88}, {"Bob", 72}};\n    double sum = 0;\n    for (const auto &[name, score] : v) {\n        sum += score;\n    }\n    std::cout << "平均 " << sum / v.size() << "\\n";\n    return 0;\n}`,hint:"结构化绑定 for (const auto& [k, v] : map) 是 C++17 语法，编译要加 -std=c++17。",xp:25},
  lessons:[
  {id:"cpp-3-1",title:"分支：if 与 switch",min:8,summary:["if / else if / else 与其他语言一致；C++17 起支持带初始化的 if (auto it = m.find(k); it != m.end())。","switch 支持整型与枚举；case 后忘 break 会贯穿（编译器可警告 [[fallthrough]] 表明是有意为之）。","条件表达式的类型必须能转换为 bool；指针与整数在条件里会隐式转 bool。"],code:`int score = 85;\nif (score >= 90)      std::cout << "优";\nelse if (score >= 60) std::cout << "及格";\nelse                  std::cout << "再努力";`,pit:"把 == 写成 = 是经典 bug：if (x = 0) 恒为假，且 x 被改成 0；用 -Wparentheses 可警告。",ex:{q:"if 里声明的变量作用域是？",a:"仅限 if/else 的语句块内，包括 else 分支——这是 C++17 带初始化 if 的常见用法。"},target:"能写出多分支判断与带初始化的条件语句。"},
  {id:"cpp-3-2",title:"循环与范围 for",min:10,summary:["for / while / do-while 与 C 一致；C++11 起推荐范围 for：for (auto &x : container)。","范围 for 本质是迭代器语法糖，可用于数组、标准容器及任何有 begin/end 的类型。","遍历时不修改用 const auto&，要修改用 auto&，基础类型小对象可用 auto。"],code:`std::vector<int> v{1, 2, 3};\nfor (const auto &x : v) std::cout << x << " ";\nfor (auto &x : v) x *= 2;          // 修改元素\nfor (int i : {10, 20, 30}) std::cout << i << " ";`,pit:"在范围 for 里增删容器元素会使迭代器失效，导致未定义行为——需要增删请改用下标或显式迭代器循环。",ex:{q:"范围 for 能用在哪？",a:"任何提供 begin()/end() 的类型：数组、std 容器、std::string，以及自定义实现这两个函数的类型。"},target:"能用范围 for 遍历各类容器并选对引用形式。"},
  {id:"cpp-3-3",title:"跳转语句与作用域",min:8,summary:["break / continue / return / goto，用法与 C 相同，但现代 C++ 中 goto 极少需要。","RAII 保证了无论以何种方式离开作用域（包括 return 与异常），局部对象的析构都会执行。","尽量缩小变量作用域：用到再声明，能让代码更易读也让资源更早释放。"],code:`for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 7) break;\n    std::cout << i << " ";   // 1 3 5 7\n}\n{\n    std::lock_guard<std::mutex> lk(m);  // 出作用域自动解锁\n}`,pit:"别用 goto 跳进（而非跳出）变量的作用域，会跳过初始化导致编译错误。",ex:{q:"RAII 为什么让 C++ 的错误处理更安全？",a:"资源获取即初始化：对象的析构函数负责释放，任何退出路径都会自动执行，不会像手动 free/close 那样遗漏。"},target:"理解作用域与 RAII 的协作，写出资源安全的代码。"},
  {id:"cpp-3-4",title:"结构化绑定与初始化",min:10,summary:["C++17 结构化绑定：auto [a, b] = pair; 或 for (const auto& [k, v] : map)。","可用于 pair/tuple/数组/聚合结构体；绑定的是副本还是引用取决于 auto 后的 &。","列表初始化（花括号）会禁止窄化转换：int x{3.14}; 直接编译报错。"],code:`std::map<std::string, int> m{{"a", 1}, {"b", 2}};\nfor (const auto &[k, v] : m)\n    std::cout << k << ":" << v << " ";\n\nauto [it, ok] = m.insert({"c", 3});   // 解包 insert 的返回 pair`,pit:"结构化绑定默认拷贝，遍历大对象时记得写 const auto& [k, v]，否则悄悄多一次拷贝。",ex:{q:"int x{3.14} 与 int x(3.14) 有何不同？",a:"花括号初始化禁止窄化，编译器直接报错；圆括号会静默截断为 3。"},target:"能用结构化绑定简化容器遍历，理解列表初始化的安全优势。"}
  ],
  quiz:[
   {q:"范围 for 遍历 vector<string> 且只读，最佳写法是？",o:["for (auto x : v)","for (const auto &x : v)","for (auto &x : v)","for (int i...) "],a:1,why:"const 引用避免拷贝，同时保证不修改元素。"},
   {q:"结构化绑定是哪一版标准引入的？",o:["C++11","C++14","C++17","C++20"],a:2,why:"结构化绑定是 C++17 的特性。"},
   {q:"花括号初始化的特点是？",o:["允许窄化","禁止窄化转换","只能用于数组","必须显式类型"],a:1,why:"列表初始化禁止隐式窄化，能在编译期拦住精度丢失。"}
  ]
},
{
  id:"cpp-s4", icon:"🧩", name:"函数与 lambda", desc:"重载、默认参数、传递方式与 lambda", lv:"adv",
  goal:"能设计函数接口，理解重载决议与传参方式，熟练使用 lambda 与可调用对象。",
  links:[["cppreference · 函数","https://zh.cppreference.com/w/cpp/language/functions"],["cppreference · lambda","https://zh.cppreference.com/w/cpp/language/lambda"]],
  lab:{t:"通用统计函数 + lambda 练习",req:["写函数模板 sum_if(v, pred)，对满足谓词的元素求和","用 lambda 分别实现「求偶数和」「求大于 10 的数之和」两种调用","写 make_counter() 返回带状态（捕获变量）的 lambda，连续调用返回递增计数"],starter:`#include <vector>\n#include <iostream>\n\ntemplate <typename T, typename Pred>\nT sum_if(const std::vector<T> &v, Pred pred) {\n    T s{};\n    for (const auto &x : v) if (pred(x)) s += x;\n    return s;\n}\n\nint main() {\n    std::vector<int> v{1, 2, 3, 4, 11, 12};\n    std::cout << sum_if(v, [](int x) { return x % 2 == 0; }) << "\\n";\n    return 0;\n}`,hint:"带状态的 lambda 用 mutable 才能修改按值捕获的变量：auto c = [n = 0]() mutable { return ++n; };",xp:30},
  lessons:[
  {id:"cpp-4-1",title:"函数基础、重载与默认参数",min:10,summary:["函数由返回类型、名字、参数列表、函数体组成；可先声明后定义（头文件里放声明）。","重载：同名函数参数列表不同，编译器按实参做重载决议（注意隐式转换可能引起歧义）。","默认参数必须从右往左连续给出，且通常只在声明处写一次。"],code:`int add(int a, int b);\ndouble add(double a, double b);      // 重载\nvoid log(const std::string &msg, bool flush = false);\n\nadd(1, 2);        // 调 int 版\nadd(1.0, 2.0);    // 调 double 版`,pit:"仅靠返回值不同不能构成重载；默认参数与重载同时使用时容易产生二义性调用。",ex:{q:"add(1, 2.0) 会调用哪个重载？",a:"若只有 (int,int) 与 (double,double) 两个版本，这个调用是二义的，编译报错——重载设计要避免这种情况。"},target:"能设计合理的重载与默认参数接口。"},
  {id:"cpp-4-2",title:"参数传递与返回值",min:12,summary:["传值：拷贝一份；传引用：不拷贝可修改；const 引用：不拷贝且只读。","返回局部变量是靠移动/拷贝语义（或 NRVO 优化），不要返回局部对象的引用。","C++17 起有保证的复制消除（返回纯右值时），返回大对象的成本很低。"],code:`void by_value(std::string s);          // 拷贝\nvoid by_ref(std::string &s);           // 可修改原对象\nvoid by_cref(const std::string &s);    // 只读、无拷贝\nstd::string make() { return "hi"; }    // 返回值，安全`,pit:"不要为了避免拷贝而返回引用：返回局部变量的引用是悬垂引用，属于未定义行为。",ex:{q:"输出参数该用引用还是返回值？",a:"现代 C++ 优先返回值（配合移动语义与结构化绑定更清晰）；引用输出参数只在需要多个输出或性能敏感时保留。"},target:"能为不同场景选对传参与返回方式。"},
  {id:"cpp-4-3",title:"lambda 表达式",min:12,summary:["语法：[捕获](参数) -> 返回类型 { 函数体 }，返回类型常可省略由编译器推导。","捕获：[] 无捕获、[=] 按值、[&] 按引用、[x, &y] 混合、[n = 0] 初始化捕获（C++14）。","lambda 常用于 STL 算法的谓词、回调与局部小函数，是 C++11 之后最常用的特性之一。"],code:`int base = 10;\nauto add_base = [base](int x) { return x + base; };\nstd::cout << add_base(5);   // 15\n\nstd::vector<int> v{3, 1, 2};\nstd::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });`,pit:"[&] 捕获局部变量后，若 lambda 的生命周期超过该变量（如存起来异步执行），会产生悬垂引用。",ex:{q:"按值捕获的变量想在 lambda 内修改怎么办？",a:"加 mutable：[n = 0]() mutable { return ++n; }; 否则按值捕获的变量在 operator() 中是 const 的。"},target:"能写出捕获外部变量并用作算法谓词的 lambda。"},
  {id:"cpp-4-4",title:"函数对象与 std::function",min:10,summary:["函数对象（仿函数）是重载了 operator() 的类，可携带状态，且能被内联优化。","std::function<签名> 是类型擦除的可调用包装器，可存 lambda、函数指针、仿函数。","传参给模板算法时直接用泛型参数（或 C++20 的 auto）比 std::function 更快（无类型擦除开销）。"],code:`struct Adder {\n    int base;\n    int operator()(int x) const { return x + base; }\n};\nAdder a{10};\nstd::cout << a(5);            // 15\n\nstd::function<int(int)> f = [](int x) { return x * 2; };`,pit:"std::function 有类型擦除与可能的堆分配开销，热路径（内层循环）应优先用模板参数接收可调用对象。",ex:{q:"什么时候必须用 std::function？",a:"需要把可调用对象存进容器、作为成员变量或在非模板接口中传递时（类型无法在编译期确定）。"},target:"能区分 lambda、仿函数与 std::function 的适用场景。"}
  ],
  quiz:[
   {q:"下列不能构成函数重载的是？",o:["参数个数不同","参数类型不同","仅返回类型不同","const 修饰不同"],a:2,why:"重载只看参数列表，返回类型不参与重载决议。"},
   {q:"lambda 按值捕获外部变量并修改，需要？",o:["什么都不加","加 mutable","加 const","用 [=] 即可"],a:1,why:"按值捕获的变量在 operator() 中默认 const，需 mutable 才能修改副本。"},
   {q:"只读大对象作参数，最佳形式是？",o:["按值传","const 引用","指针","全局变量"],a:1,why:"const 引用避免拷贝又保证不修改。"}
  ]
},
{
  id:"cpp-s5", icon:"🧱", name:"类与对象", desc:"封装、构造析构、拷贝控制与运算符重载", lv:"adv",
  goal:"能设计类的接口与生命周期，掌握 Rule of Zero/Three/Five 与常用运算符重载。",
  links:[["cppreference · 类","https://zh.cppreference.com/w/cpp/language/classes"],["cppreference · 三/五法则","https://zh.cppreference.com/w/cpp/language/rule_of_three"]],
  lab:{t:"实现一个字符串类 MyString",req:["成员用 std::unique_ptr<char[]>，构造时深拷贝","实现析构、拷贝构造、拷贝赋值、移动构造、移动赋值（Rule of Five）","重载 operator[]、operator<<（友元）、operator+ 与 operator==","写 5 条断言自测（构造、拷贝、移动、拼接、比较）"],starter:`#include <cstring>\n#include <memory>\n#include <iostream>\n\nclass MyString {\n    std::unique_ptr<char[]> data_;\n    std::size_t size_ = 0;\npublic:\n    MyString() = default;\n    MyString(const char *s) : size_(std::strlen(s)) {\n        data_ = std::make_unique<char[]>(size_ + 1);\n        std::memcpy(data_.get(), s, size_ + 1);\n    }\n    // 补充：拷贝构造 / 拷贝赋值 / 移动构造 / 移动赋值 / operator[]\n};`,hint:"拷贝赋值要处理自赋值与异常安全，可用 copy-and-swap 惯用法；移动操作记得标 noexcept。",xp:35},
  lessons:[
  {id:"cpp-5-1",title:"类的定义与封装",min:10,summary:["class 默认成员私有，struct 默认公有；用 public / private / protected 控制访问。","构造函数负责建立类不变式，析构函数负责清理；没有自定义构造时可聚合初始化。","成员初始化列表比在函数体里赋值更高效（直接构造而非先默认构造再赋值）。"],code:`class Point {\n    double x_ = 0, y_ = 0;      // 私有成员 + 类内初值\npublic:\n    Point() = default;\n    Point(double x, double y) : x_(x), y_(y) {}\n    double x() const { return x_; }\n};`,pit:"构造函数里用成员初始化列表的顺序要与声明顺序一致，否则 -Wreorder 会警告（初始化按声明顺序进行）。",ex:{q:"class 与 struct 的区别？",a:"仅默认访问权限不同（class 私有、struct 公有）与默认继承方式不同；习惯上 struct 用于纯数据聚合。"},target:"能定义封装良好的类并用初始化列表构造。"},
  {id:"cpp-5-2",title:"构造、析构与生命周期",min:10,summary:["构造顺序：先基类、再成员（按声明顺序）、最后执行构造函数体；析构顺序完全相反。","析构函数负责释放资源；多态基类的析构函数必须是 virtual，否则通过基类指针删除派生类对象是 UB。","=default 让编译器生成，=delete 显式禁用（如禁止拷贝）。"],code:`class Buffer {\n    char *p_;\n    std::size_t n_;\npublic:\n    Buffer(std::size_t n) : p_(new char[n]), n_(n) {}\n    ~Buffer() { delete[] p_; }\n    Buffer(const Buffer &) = delete;          // 禁止拷贝\n    Buffer &operator=(const Buffer &) = delete;\n};`,pit:"new[] 必须配对 delete[]，new 配对 delete，混用是未定义行为——用 std::vector 就不会有这个烦恼。",ex:{q:"为什么基类析构要 virtual？",a:"否则 delete 基类指针时只会调用基类析构，派生部分的资源永远不会释放。"},target:"能正确管理对象生命周期与资源释放。"},
  {id:"cpp-5-3",title:"拷贝控制：Rule of Zero / Three / Five",min:12,summary:["Rule of Three：若需要自定义析构、拷贝构造、拷贝赋值之一，通常三者都需要。","C++11 后扩展为 Rule of Five，再加上移动构造与移动赋值。","Rule of Zero（推荐）：用标准库容器与智能指针管理资源，让编译器自动生成所有特殊成员函数。"],code:`class Owner {                 // Rule of Zero\n    std::vector<int> data_;   // 标准库自己会拷贝/移动\n    std::string name_;\npublic:\n    Owner(std::string n) : name_(std::move(n)) {}\n    // 不需要手写析构、拷贝、移动\n};`,pit:"自定义了析构函数会抑制移动构造/赋值的隐式生成，让本该移动的对象退化成拷贝，悄悄损失性能。",ex:{q:"什么时候必须写拷贝构造？",a:"当类直接持有裸资源（裸指针、文件句柄）时；更好的做法是把裸资源换成 RAII 包装，回到 Rule of Zero。"},target:"能判断该用哪条法则，并优先使用 Rule of Zero。"},
  {id:"cpp-5-4",title:"静态成员、友元与运算符重载",min:12,summary:["静态成员属于类而非对象，静态成员函数没有 this 指针，只能访问静态成员。","友元（friend）授予外部函数/类访问私有成员的权限，常用于 operator<< 的输出重载。","运算符重载：+ - == [] () 等可重载；注意保持一致语义（如 == 与 != 成对实现）。"],code:`class Vec {\n    int x_;\npublic:\n    Vec(int x) : x_(x) {}\n    Vec operator+(const Vec &o) const { return Vec(x_ + o.x_); }\n    bool operator==(const Vec &o) const { return x_ == o.x_; }\n    friend std::ostream &operator<<(std::ostream &os, const Vec &v) {\n        return os << "Vec(" << v.x_ << ")";\n    }\n};`,pit:"重载 && || 会失去短路求值语义，逗号运算符同理——除非有特殊理由，不要重载它们。",ex:{q:"operator<< 为什么要写成友元？",a:"因为左操作数是 ostream 而不是你的类，无法作为成员函数（成员函数要求左操作数是自身）。"},target:"能重载常用运算符并保持语义一致。"}
  ],
  quiz:[
   {q:"class 的默认成员访问级别是？",o:["public","private","protected","取决于编译器"],a:1,why:"class 默认私有，struct 默认公有。"},
   {q:"多态基类的析构函数应？",o:["是 private","是 virtual","是 static","不需要定义"],a:1,why:"虚析构保证通过基类指针删除派生对象时调用完整析构链。"},
   {q:"Rule of Zero 的含义是？",o:["什么都不学","用 RAII 成员让编译器自动生成特殊成员函数","禁用所有构造","不用写析构注释"],a:1,why:"资源管理交给标准库类型，自己就不必手写拷贝/移动/析构。"}
  ]
},
{
  id:"cpp-s6", icon:"🧬", name:"继承与多态", desc:"继承、虚函数、抽象类与接口设计", lv:"hard",
  goal:"能用继承表达 is-a 关系，理解虚函数表与动态绑定，正确设计抽象基类与接口。",
  links:[["cppreference · 派生类","https://zh.cppreference.com/w/cpp/language/derived_class"],["cppreference · 虚函数","https://zh.cppreference.com/w/cpp/language/virtual"]],
  lab:{t:"图形多态系统",req:["定义抽象基类 Shape，含纯虚函数 area() 与 clone()","派生 Circle、Rect、Triangle，各自实现面积计算","用 std::vector<std::unique_ptr<Shape>> 存放不同图形，多态调用 area() 求总面积","验证 clone() 能产生独立副本（修改副本不影响原对象）"],starter:`#include <memory>\n#include <vector>\n\nclass Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;\n    virtual std::unique_ptr<Shape> clone() const = 0;\n};\n\nclass Circle : public Shape {\n    double r_;\npublic:\n    explicit Circle(double r) : r_(r) {}\n    double area() const override { return 3.14159 * r_ * r_; }\n    std::unique_ptr<Shape> clone() const override {\n        return std::make_unique<Circle>(*this);\n    }\n};`,hint:"基类析构加 virtual；override 让编译器帮你检查是否真的重写了虚函数。",xp:35},
  lessons:[
  {id:"cpp-6-1",title:"继承与访问控制",min:10,summary:["class Derived : public Base 表示公有继承，表达「是一种」关系。","访问级别：public 继承保持基类接口；private 继承表示「根据……实现」，几乎只在特殊场合使用。","派生类构造时先调基类构造（用初始化列表指定参数），析构顺序相反。"],code:`class Animal {\npublic:\n    explicit Animal(std::string n) : name_(std::move(n)) {}\n    virtual ~Animal() = default;\nprivate:\n    std::string name_;\n};\nclass Dog : public Animal {\npublic:\n    Dog() : Animal("dog") {}\n};`,pit:"基类没有默认构造时，派生类必须在初始化列表里显式调用基类构造函数，否则编译失败。",ex:{q:"公有继承和组合如何选择？",a:"表达 is-a 且需要多态时用继承；只是想复用实现请用组合（成员对象），耦合更低、更灵活。"},target:"能正确使用继承并理解构造析构顺序。"},
  {id:"cpp-6-2",title:"虚函数与动态绑定",min:12,summary:["virtual 成员函数启用动态绑定：通过基类指针/引用调用时，实际执行派生类版本。","实现机制通常是虚函数表（vtable）+ 虚指针（vptr），代价是一次间接寻址与无法内联。","非虚函数调用在编译期就决定了，通过基类指针调用只会执行基类版本。"],code:`struct Base {\n    virtual void f() { std::cout << "Base"; }\n    void g() { std::cout << "g"; }\n};\nstruct D : Base {\n    void f() override { std::cout << "D"; }\n};\nBase *p = new D;\np->f();   // D（动态绑定）\np->g();   // g（静态绑定）`,pit:"在构造函数里调用虚函数不会多态：构造派生类时基类部分先构造，此时对象还「不是」派生类。",ex:{q:"虚函数的性能代价是什么？",a:"每个对象多一个 vptr、调用多一次间接跳转，且通常无法内联；但绝大多数业务场景中这点开销可以忽略。"},target:"理解动态绑定的原理与代价，能正确使用虚函数。"},
  {id:"cpp-6-3",title:"抽象类与纯虚函数",min:10,summary:["纯虚函数：virtual void f() = 0; 含纯虚函数的类是抽象类，不能实例化。","抽象类用于定义接口契约，派生类必须实现所有纯虚函数才能被实例化。","纯虚析构也需要定义（= 0 的同时给出函数体），否则派生类析构链不完整。"],code:`class Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;    // 纯虚\n};\n\nclass Square : public Shape {\n    double s_;\npublic:\n    explicit Square(double s) : s_(s) {}\n    double area() const override { return s_ * s_; }\n};`,pit:"只有纯虚函数没有虚析构的基类是设计缺陷——用户通过基类指针删除对象时会泄漏派生部分资源。",ex:{q:"抽象类与「接口」的关系？",a:"C++ 没有 interface 关键字；全部成员都是纯虚且无数据成员的抽象类，就等价于其他语言里的接口。"},target:"能用抽象基类定义清晰的接口契约。"},
  {id:"cpp-6-4",title:"override / final 与 RTTI",min:10,summary:["override 明确表达「我要重写虚函数」，写错签名时编译器直接报错（强烈建议总是加上）。","final 修饰类表示不可被继承，修饰虚函数表示不可再被重写。","RTTI：typeid 获取类型信息，dynamic_cast 做安全的下行转换（失败返回 nullptr 或抛异常）。"],code:`struct B { virtual void f(); virtual ~B() = default; };\nstruct D : B {\n    void f() override;      // 正确：签名匹配\n    // void f(int) override;  错误：B 中没有 f(int)\n};\n\nB *b = new D;\nif (auto *d = dynamic_cast<D *>(b)) { /* 转换成功 */ }`,pit:"dynamic_cast 需要类有多态（至少一个虚函数），否则编译报错；频繁使用 dynamic_cast 往往暗示设计需要重构。",ex:{q:"dynamic_cast 转换引用失败会怎样？",a:"抛 std::bad_cast 异常（指针版本返回 nullptr）。所以引用转换要放在 try 里。"},target:"能用 override/final 保证重写正确，理解 RTTI 的用途与代价。"}
  ],
  quiz:[
   {q:"实现运行时多态必须？",o:["使用模板","使用虚函数","使用重载","使用宏"],a:1,why:"虚函数配合基类指针/引用才能实现动态绑定。"},
   {q:"含纯虚函数的类？",o:["可以实例化","是抽象类，不能实例化","只能作成员","必须 final"],a:1,why:"抽象类只能作为基类被继承。"},
   {q:"override 关键字的作用是？",o:["提高性能","让编译器检查是否真的重写了虚函数","允许重载","隐藏基类函数"],a:1,why:"签名不匹配时会编译报错，避免「以为重写了其实没有」的 bug。"}
  ]
},
{
  id:"cpp-s7", icon:"📐", name:"模板与泛型", desc:"函数模板、类模板、特化与概念", lv:"hard",
  goal:"能写出可复用的泛型代码，理解模板实例化与类型推导，会用 concepts 约束模板参数。",
  links:[["cppreference · 模板","https://zh.cppreference.com/w/cpp/language/templates"],["cppreference · 约束与概念","https://zh.cppreference.com/w/cpp/language/constraints"]],
  lab:{t:"泛型容器工具库",req:["写函数模板 max_of(const std::vector<T>&) 返回最大元素（要求 T 可比较）","写类模板 Stack<T>，支持 push/pop/top/size，底层用 std::vector<T>","为 Stack<const char*> 提供一个打印专用的成员特化（或改用 std::string 特化）","用 C++20 requires 或 enable_if 约束：只允许数值类型调用"],starter:`#include <vector>\n#include <concepts>\n\ntemplate <typename T>\nconst T &max_of(const std::vector<T> &v) {\n    const T *best = &v[0];\n    for (const auto &x : v) if (*best < x) best = &x;\n    return *best;\n}\n\ntemplate <std::totally_ordered T>\nT min_of(std::vector<T> v) { /* ... */ }`,hint:"C++20 可用 std::totally_ordered 等概念约束；模板定义通常要放在头文件里（编译期实例化需要可见定义）。",xp:40},
  lessons:[
  {id:"cpp-7-1",title:"函数模板与类型推导",min:12,summary:["template <typename T> T max(T a, T b); 定义函数模板，编译器按实参推导 T。","模板不是函数，而是一张「生成函数的图纸」；实例化时才真正生成代码并检查类型。","推导规则复杂：数组/函数会退化成指针，顶层 const 被忽略；可用 decltype(auto) 精确保留。"],code:`template <typename T>\nT max_of(T a, T b) { return a > b ? a : b; }\n\nmax_of(1, 2);        // T = int\nmax_of(1.0, 2.0);    // T = double\nmax_of<int>(1, 2.5); // 显式指定，2.5 被转 int`,pit:"模板定义必须在使用处可见（通常放头文件），否则链接时报错「undefined reference」。",ex:{q:"模板编译报错为什么那么长？",a:"因为错误发生在实例化之后，编译器会打印整条实例化栈；先看第一条错误与「required from here」附近的信息。"},target:"能写函数模板并理解实例化时机。"},
  {id:"cpp-7-2",title:"类模板",min:12,summary:["template <typename T> class Stack { ... }; 定义类模板，使用时写 Stack<int>。","类模板的成员函数只有被用到才会实例化（惰性实例化）。","非类型模板参数（如 template <typename T, std::size_t N>）可把值作为模板参数，如 std::array<int, 10>。"],code:`template <typename T>\nclass Stack {\n    std::vector<T> data_;\npublic:\n    void push(const T &v) { data_.push_back(v); }\n    T pop() { T v = data_.back(); data_.pop_back(); return v; }\n    bool empty() const { return data_.empty(); }\n};\nStack<int> s;`,pit:"类模板的成员函数定义若放在 .cpp 里，会导致链接错误；要么放头文件，要么显式实例化所需类型。",ex:{q:"std::array 与 std::vector 的核心区别？",a:"array 的大小是类型的一部分（编译期固定、栈上存储），vector 大小运行期可变、堆上分配。"},target:"能实现类模板与非类型模板参数。"},
  {id:"cpp-7-3",title:"特化与可变参数模板",min:12,summary:["全特化：template<> class Stack<bool> { ... }; 为特定类型提供完全不同的实现。","偏特化：只对部分参数特化（函数模板不支持偏特化，用重载代替）。","可变参数模板：template <typename... Args>，配合折叠表达式 (args + ...) 处理参数包。"],code:`template <typename... Args>\nauto sum(Args... args) {\n    return (args + ...);        // 折叠表达式（C++17）\n}\nstd::cout << sum(1, 2, 3, 4);   // 10\n\ntemplate <typename T, typename... Rest>\nvoid print(T first, Rest... rest);`,pit:"空参数包时一元折叠表达式可能无初值，需要提供初值：(args + ... + 0)。",ex:{q:"函数模板不能偏特化怎么办？",a:"用重载：为特定类型写一个同名的普通函数或更特化的模板，重载决议会优先选中它。"},target:"能使用特化与可变参数模板编写通用工具。"},
  {id:"cpp-7-4",title:"SFINAE 与 Concepts",min:12,summary:["SFINAE：替换失败不是错误，编译器在重载决议时丢弃不匹配的候选（C++11 起用 enable_if）。","C++20 Concepts：用 requires 表达式与具名概念（std::integral、std::totally_ordered）约束模板参数。","Concepts 让报错信息变得可读，并把约束写进接口，是替代 SFINAE 的现代做法。"],code:`#include <concepts>\n\ntemplate <std::integral T>\nT gcd(T a, T b) { while (b) { T t = a % b; a = b; b = t; } return a; }\n\ngcd(12, 18);      // OK\ngcd(1.5, 2.5);    // 编译错误：double 不满足 integral`,pit:"概念约束过严会拒绝本该支持的类型；优先用标准库提供的概念，语义清晰且可复用。",ex:{q:"Concepts 相比 enable_if 的最大好处？",a:"错误信息从几十行模板栈变成一句「约束未满足」，而且约束可以命名、组合、复用。"},target:"能用 requires/概念约束模板参数并读懂约束错误。"}
  ],
  quiz:[
   {q:"模板代码通常放在？",o:[".cpp 文件","头文件","静态库","链接脚本"],a:1,why:"实例化需要看到完整定义，所以模板一般写在头文件中。"},
   {q:"可变参数模板的参数包展开方式是？",o:["递归或折叠表达式","宏展开","运行时循环","无法展开"],a:0,why:"C++17 起推荐折叠表达式，之前常用递归展开。"},
   {q:"C++20 中约束模板参数使用？",o:["enable_if","concepts / requires","static_assert","#ifdef"],a:1,why:"concepts 是 C++20 引入的官方约束机制。"}
  ]
},
{
  id:"cpp-s8", icon:"📚", name:"STL 容器与算法", desc:"序列容器、关联容器、迭代器与算法", lv:"hard",
  goal:"能根据场景选对容器，熟练使用迭代器与 <algorithm>，理解复杂度与迭代器失效规则。",
  links:[["cppreference · 容器","https://zh.cppreference.com/w/cpp/container"],["cppreference · 算法库","https://zh.cppreference.com/w/cpp/algorithm"]],
  lab:{t:"词频统计与排行榜",req:["读入若干单词，用 std::unordered_map<std::string,int> 统计频次","用 std::sort + lambda 按频次降序、频次相同按字典序升序输出前 N","用 std::accumulate 求总词数，用 std::max_element 找最高频词","比较 map 与 unordered_map 在本任务下的取舍并写注释说明"],starter:`#include <unordered_map>\n#include <algorithm>\n#include <vector>\n#include <string>\n#include <iostream>\n\nint main() {\n    std::unordered_map<std::string, int> freq;\n    // 读入单词并统计\n    std::vector<std::pair<std::string, int>> v(freq.begin(), freq.end());\n    std::sort(v.begin(), v.end(), [](const auto &a, const auto &b) {\n        return a.second != b.second ? a.second > b.second : a.first < b.first;\n    });\n    return 0;\n}`,hint:"unordered_map 平均 O(1) 但不保序；需要有序遍历用 std::map。sort 的谓词要满足严格弱序。",xp:40},
  lessons:[
  {id:"cpp-8-1",title:"序列容器：vector / array / deque / list",min:12,summary:["vector：连续内存，尾增删 O(1)，随机访问 O(1)，是默认首选容器。","array：编译期固定大小，栈上分配；deque：双端增删高效；list：任意位置插入 O(1) 但不连续、缓存不友好。","vector 扩容会重新分配并搬移元素，导致所有迭代器与引用失效；可用 reserve 预分配减少搬移。"],code:`std::vector<int> v;\nv.reserve(1000);            // 预分配，避免反复扩容\nv.push_back(1);\nstd::cout << v.size() << " " << v.capacity() << "\\n";\nstd::array<int, 3> a{1, 2, 3};`,pit:"vector<bool> 是特化的位压缩容器，行为与 vector<T> 不同（返回代理对象），需要真正的 bool 容器时用 vector<char> 或 deque<bool>。",ex:{q:"什么时候不用 vector？",a:"需要频繁在头部/中间插入且已有迭代器不能失效时用 list；需要双端高效增删用 deque。"},target:"能选对序列容器并管理容量与迭代器失效。"},
  {id:"cpp-8-2",title:"关联容器：map / set / unordered",min:12,summary:["map/set 基于红黑树，有序，操作 O(log n)；unordered_map/set 基于哈希表，平均 O(1)，无序。","map 的 operator[] 会在键不存在时插入默认值，只查找请用 find 或 C++20 的 contains。","multimap / multiset 允许重复键；需要按值排序时把 pair 放进 vector 再 sort。"],code:`std::map<std::string, int> m;\nm["a"] = 1;                  // 不存在则插入\nif (auto it = m.find("b"); it != m.end())\n    std::cout << it->second;\nfor (const auto &[k, v] : m) std::cout << k << v;`,pit:"用 m[k] 判断存在性是错的：它会悄悄插入一个默认元素，改变容器内容（也可能导致意外的内存增长）。",ex:{q:"map 与 unordered_map 怎么选？",a:"需要有序遍历或键的比较语义选 map；只做精确查找且追求均摊 O(1) 选 unordered_map（注意自定义类型要提供 hash）。"},target:"能正确使用关联容器并避免 operator[] 的陷阱。"},
  {id:"cpp-8-3",title:"迭代器与范围",min:10,summary:["迭代器是容器的「泛化指针」：begin() 指向首元素，end() 是尾后哨兵（不可解引用）。","分类：输入/输出、前向、双向、随机访问；vector 是随机访问，list 是双向。","C++20 Ranges 提供管道式组合：views::filter | views::transform，惰性求值、可读性更高。"],code:`std::vector<int> v{1, 2, 3, 4, 5};\nfor (auto it = v.begin(); it != v.end(); ++it) std::cout << *it;\nauto it2 = std::find(v.begin(), v.end(), 3);   // 算法返回迭代器\n\n// C++20: for (int x : v | std::views::filter([](int n){return n%2==0;}))`,pit:"end() 是尾后位置，对它解引用是未定义行为；算法找不到目标时返回 end()，必须先判断再使用。",ex:{q:"迭代器失效是怎么回事？",a:"插入/删除可能使容器重新分配或元素移动，此前获得的迭代器不再有效；不同容器的失效规则不同，需查文档。"},target:"能使用迭代器与算法配合，理解失效规则。"},
  {id:"cpp-8-4",title:"常用算法与 string",min:12,summary:["<algorithm> 提供 sort / find / count / accumulate / transform / min_element / binary_search 等上百个算法。","sort 要求随机访问迭代器且谓词满足严格弱序；stable_sort 保持相等元素相对顺序。","std::string 是可变字符串，string_view（C++17）是非拥有的只读视图，作参数可避免拷贝。"],code:`std::vector<int> v{3, 1, 2};\nstd::sort(v.begin(), v.end());\nint s = std::accumulate(v.begin(), v.end(), 0);\nauto n = std::count_if(v.begin(), v.end(), [](int x) { return x > 1; });\n\nvoid print(std::string_view sv) { std::cout << sv; }`,pit:"string_view 不拥有数据，指向的字符串被销毁或改动后它就是悬垂视图——只用于临时只读参数。",ex:{q:"用算法还是手写循环？",a:"优先用算法：语义明确、经过充分测试、不易写错边界；只有需要特殊控制流时才手写循环。"},target:"能熟练组合使用标准算法与 string / string_view。"}
  ],
  quiz:[
   {q:"默认首选的顺序容器是？",o:["list","vector","deque","array"],a:1,why:"vector 内存连续、缓存友好，绝大多数场景性能最好。"},
   {q:"map::operator[] 在键不存在时会？",o:["返回 0","插入默认值元素","抛异常","返回 end()"],a:1,why:"它会默认构造一个值并插入，只查找应用 find 或 contains。"},
   {q:"string_view 的特点是？",o:["拥有字符串","非拥有的只读视图","自动分配内存","线程安全"],a:1,why:"它只是 ptr+len 的视图，不负责生命周期，使用时必须保证原串有效。"}
  ]
},
{
  id:"cpp-s9", icon:"🔒", name:"内存与资源管理", desc:"RAII、智能指针、移动语义与完美转发", lv:"hard",
  goal:"掌握现代 C++ 资源管理范式，理解值类别、移动语义与完美转发的原理与用法。",
  links:[["cppreference · 智能指针","https://zh.cppreference.com/w/cpp/memory"],["cppreference · 移动语义","https://zh.cppreference.com/w/cpp/language/move_constructor"]],
  lab:{t:"资源安全的资源管理类",req:["用 unique_ptr 封装一个 FILE* 的 RAII 类 FileGuard（自定义删除器调用 fclose）","实现一个简单的 UniqueBuffer：支持移动、禁止拷贝、越界访问抛异常","用 shared_ptr + weak_ptr 构造一个带父子引用的树节点，验证 weak_ptr 能打破循环引用","用 std::move 演示把大 vector 高效转移进函数"],starter:`#include <memory>\n#include <cstdio>\n\nusing FilePtr = std::unique_ptr<FILE, decltype(&fclose)>;\n\nFilePtr open_file(const char *path, const char *mode) {\n    FILE *f = std::fopen(path, mode);\n    if (!f) throw std::runtime_error("open failed");\n    return FilePtr(f, &fclose);\n}\n// 调用方无需 fclose，离开作用域自动关闭`,hint:"make_shared 比 shared_ptr(new T) 更高效（一次分配）且异常安全；父子互相引用时一方用 weak_ptr。",xp:40},
  lessons:[
  {id:"cpp-9-1",title:"RAII 与智能指针",min:12,summary:["RAII：资源获取即初始化，把资源生命周期绑定到对象作用域，析构时自动释放。","unique_ptr：独占所有权，不可拷贝只可移动，几乎零开销，是默认选择。","shared_ptr：共享所有权，引用计数；weak_ptr：不增加计数的观察者，用于打破循环引用。"],code:`auto p = std::make_unique<int>(42);      // 独占\nauto q = std::move(p);                   // 转移所有权，p 变空\n\nauto s = std::make_shared<Node>();       // 共享\nstd::weak_ptr<Node> w = s;               // 观察，不增计数\nif (auto locked = w.lock()) { /* 还活着 */ }`,pit:"用同一个裸指针构造两个 shared_ptr 会导致双重释放；始终用 make_shared 创建。",ex:{q:"什么时候该用 shared_ptr？",a:"确实存在共享所有权且生命周期不确定时；多数情况下 unique_ptr 加上清晰的归属关系就足够了。"},target:"能用 RAII 与智能指针消除手动资源管理。"},
  {id:"cpp-9-2",title:"值类别与移动语义",min:12,summary:["值类别：lvalue（有名字可取地址）、xvalue（将亡值）、prvalue（纯右值）。","右值引用 T&& 只能绑定右值；移动构造/赋值「窃取」资源，把昂贵的深拷贝变成指针转移。","std::move 只是把左值转成右值引用（不移动任何东西），真正的搬移发生在移动构造/赋值里。"],code:`std::vector<int> a(1000000);\nstd::vector<int> b = std::move(a);   // O(1) 转移指针\na.size();   // 合法但内容未指定（通常为空）\n\nstd::string s1 = "hi";\nstd::string s2 = s1;             // 拷贝\nstd::string s3 = std::move(s1);  // 移动`,pit:"移动后源对象处于「有效但未指定」状态，除了重新赋值或销毁外不要依赖它的内容。",ex:{q:"为什么移动构造要标 noexcept？",a:"vector 扩容等场景只有在移动不抛异常时才敢用移动，否则会退回拷贝；不标 noexcept 会白白损失性能。"},target:"能实现移动构造/赋值并理解 std::move 的语义。"},
  {id:"cpp-9-3",title:"完美转发与引用折叠",min:12,summary:["万能引用：模板参数 T&& 配合推导，可绑定左值与右值（也称转发引用）。","std::forward<T>(arg) 保留实参的值类别，实现完美转发。","引用折叠规则：T& & → T&，T&& & → T&，T& && → T&，T&& && → T&&。"],code:`template <typename T>\nvoid wrapper(T &&arg) {\n    target(std::forward<T>(arg));   // 保留左/右值属性\n}\n\nwrapper(42);        // 转发为右值\nint x = 1;\nwrapper(x);         // 转发为左值`,pit:"转发引用只在「模板参数推导 + T&&」时成立；写 void f(int &&x) 里的 x 是普通右值引用，且 x 本身是左值。",ex:{q:"为什么函数内的右值引用变量是左值？",a:"因为它有名字、可取地址，按定义就是左值；想继续按右值传递必须 std::move 或 std::forward。"},target:"能写出完美转发的包装函数并理解引用折叠。"},
  {id:"cpp-9-4",title:"循环引用、自定义删除器与检测",min:10,summary:["两个 shared_ptr 互相持有会形成循环引用，谁都无法释放——用 weak_ptr 打断环。","自定义删除器：unique_ptr<T, Deleter> 可管理 FILE*、malloc 内存、系统句柄等任意资源。","检测工具：AddressSanitizer（-fsanitize=address）、LeakSanitizer、Valgrind 与 IDE 诊断工具。"],code:`struct Node {\n    std::shared_ptr<Node> child;\n    std::weak_ptr<Node> parent;   // 用 weak 打断循环\n};\n\nauto fp = std::unique_ptr<FILE, decltype(&fclose)>(\n    std::fopen("a.txt", "r"), &fclose);`,pit:"enable_shared_from_this 能让对象安全地拿到指向自己的 shared_ptr，避免在成员函数中用 this 构造新的 shared_ptr。",ex:{q:"如何判断该用 weak_ptr？",a:"当关系是「观察但不拥有」时（父子中的父指针、缓存、观察者列表），用 weak_ptr 既不延长生命周期又能安全访问。"},target:"能用 weak_ptr 与自定义删除器管理复杂资源关系。"}
  ],
  quiz:[
   {q:"独占所有权的智能指针是？",o:["shared_ptr","unique_ptr","weak_ptr","auto_ptr"],a:1,why:"unique_ptr 禁止拷贝、只可移动，零额外开销。"},
   {q:"std::move 的实际作用是？",o:["移动数据","把实参转为右值引用","释放内存","拷贝数据"],a:1,why:"它只是类型转换，真正的移动由移动构造/赋值完成。"},
   {q:"打破 shared_ptr 循环引用应使用？",o:["shared_ptr 置空","weak_ptr","裸指针","unique_ptr"],a:1,why:"weak_ptr 不增加引用计数，可安全观察而不延长生命周期。"}
  ]
},
{
  id:"cpp-s10", icon:"🚀", name:"异常、并发与纵深", desc:"异常处理、文件系统、并发与对象模型", lv:"hard",
  goal:"能进行健壮的错误处理，编写基本并发程序，并理解 C++ 对象模型与性能要点。",
  links:[["cppreference · 异常","https://zh.cppreference.com/w/cpp/language/exceptions"],["cppreference · 线程支持库","https://zh.cppreference.com/w/cpp/thread"]],
  lab:{t:"并发词频统计器",req:["用 std::filesystem 递归遍历目录，收集所有 .txt 文件路径","用 std::thread 或 std::async 分片统计多个文件的词频，用 std::mutex 合并结果","用 try/catch 处理打不开的文件，保证程序不崩且所有线程都 join","输出总词数与 Top10 单词，并统计耗时"],starter:`#include <filesystem>\n#include <future>\n#include <mutex>\n#include <unordered_map>\n\nstd::mutex g_mu;\nstd::unordered_map<std::string, int> g_freq;\n\nvoid count_file(const std::filesystem::path &p) {\n    try {\n        // 读文件、统计\n        std::lock_guard<std::mutex> lk(g_mu);\n        // 合并到 g_freq\n    } catch (const std::exception &e) {\n        // 记录错误，继续处理其他文件\n    }\n}`,hint:"线程对象析构前必须 join 或 detach；用 std::async + future 可简化结果收集。",xp:45},
  lessons:[
  {id:"cpp-10-1",title:"异常处理与异常安全",min:12,summary:["throw 抛出异常，try/catch 捕获；按引用捕获（catch (const std::exception &e)）。","异常安全三级别：基本保证（不泄漏、状态有效）、强保证（失败则回滚）、不抛保证（noexcept）。","RAII 是异常安全的基石：析构函数负责清理，任何退出路径都不会泄漏资源。"],code:`try {\n    auto v = load(path);\n} catch (const std::filesystem::filesystem_error &e) {\n    std::cerr << "文件错误: " << e.what() << "\\n";\n} catch (const std::exception &e) {\n    std::cerr << "其他错误: " << e.what() << "\\n";\n}`,pit:"析构函数不应抛出异常（默认 noexcept），否则在栈展开时抛异常会直接 terminate。",ex:{q:"什么时候用异常，什么时候用错误码？",a:"异常用于「罕见且无法就地处理」的错误；可预期的高频失败（如解析用户输入）用 optional/expected 或错误码性能更好。"},target:"能写出异常安全的代码并合理选择错误处理策略。"},
  {id:"cpp-10-2",title:"文件系统与实用工具",min:10,summary:["<filesystem>（C++17）：path、exists、create_directories、递归目录迭代、copy/rename。","<chrono> 处理时间点与时长，steady_clock 适合计时，system_clock 适合墙钟时间。","<random> 提供高质量随机数（mt19937 + 分布），替代有偏的 rand()。"],code:`namespace fs = std::filesystem;\nfor (const auto &entry : fs::recursive_directory_iterator("."))\n    if (entry.path().extension() == ".txt")\n        std::cout << entry.path() << "\\n";\n\nauto t0 = std::chrono::steady_clock::now();\n// ...\nauto ms = std::chrono::duration_cast<std::chrono::milliseconds>(\n    std::chrono::steady_clock::now() - t0).count();`,pit:"filesystem 的很多函数有两个版本：抛异常的与接受 error_code 的版本，性能敏感或预期会失败时用后者。",ex:{q:"为什么用 steady_clock 而不是 system_clock 计时？",a:"system_clock 会被系统时间调整影响（可能倒退），steady_clock 单调递增，适合测时长。"},target:"能用 filesystem / chrono / random 完成实用功能。"},
  {id:"cpp-10-3",title:"并发：thread、互斥与原子",min:12,summary:["std::thread 创建线程，join 等待结束；用 std::async + future 获取返回值更方便。","数据竞争：多个线程同时读写同一数据；用 std::mutex + lock_guard 或原子类型保护。","std::atomic 提供无锁原子操作，适合计数器与标志位；条件变量用于线程间等待通知。"],code:`std::mutex mu;\nint counter = 0;\nvoid work() {\n    for (int i = 0; i < 1000; i++) {\n        std::lock_guard<std::mutex> lk(mu);   // 出作用域自动解锁\n        ++counter;\n    }\n}\nstd::thread t1(work), t2(work);\nt1.join(); t2.join();`,pit:"忘记 join 就销毁 thread 对象会调用 terminate；用 jthread（C++20）或 RAII 包装可以避免。",ex:{q:"死锁的四个必要条件？",a:"互斥、占有且等待、不可抢占、循环等待；破坏任意一个即可避免，实践中常用「按固定顺序加锁」。"},target:"能写多线程程序并用互斥/原子保证线程安全。"},
  {id:"cpp-10-4",title:"对象模型与性能纵深",min:12,summary:["对象模型：非静态成员按声明顺序布局，虚函数引入 vptr，多重继承可能产生多个虚表指针。","性能要点：减少拷贝（移动/引用）、关注缓存局部性（连续容器优于链表）、避免过早优化。","工具链：编译器优化 -O2、profiler（perf / VTune）、ASan/UBSan、编译期计算（constexpr/模板）。"],code:`// 缓存友好：连续内存的顺序遍历远快于随机跳转\nfor (const auto &x : vector_of_structs) sum += x.a;   // 快\nfor (const auto &p : vector_of_pointers) sum += p->a; // 慢\n\n// 编译期计算：把工作移到编译期\nconstexpr int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nstatic_assert(fib(10) == 55);`,pit:"虚函数不是免费的：vptr 间接跳转 + 无法内联。热路径上可用静态多态（模板/CRTP）替代。",ex:{q:"如何判断该不该优化某段代码？",a:"先测量（profiler），再优化。绝大多数性能问题集中在极少数热点，凭直觉优化往往白费功夫。"},target:"理解对象布局与常见性能权衡，掌握基本优化思路。"}
  ],
  quiz:[
   {q:"捕获异常时应？",o:["按值捕获","按引用捕获","按指针捕获","不捕获"],a:1,why:"按引用可避免对象切片，正确保留派生异常的类型信息。"},
   {q:"保护共享数据最常用的手段是？",o:["volatile","std::mutex","static","const"],a:1,why:"互斥量保证同一时刻只有一个线程访问临界区；volatile 不提供线程同步。"},
   {q:"递归遍历目录（C++17）使用？",o:["opendir","std::filesystem::recursive_directory_iterator","system(ls)","glob"],a:1,why:"filesystem 库提供跨平台的标准目录遍历接口。"}
  ]
}
];

window.LANG_DATA.cpp = {
  name: "C++",
  icon: "⚙️",
  color: "#8a63d2",
  phases: [
    {icon:"🌱",name:"第一篇 · 现代语法入门",range:[0,3],desc:"环境、类型系统、控制流与函数/lambda",wk:4},
    {icon:"🧱",name:"第二篇 · 面向对象",range:[4,6],desc:"类与对象、继承多态、模板泛型",wk:5},
    {icon:"⚙️",name:"第三篇 · 标准库与内存",range:[7,8],desc:"STL 容器算法、RAII 与智能指针、移动语义",wk:6},
    {icon:"🚀",name:"第四篇 · 现代特性与纵深",range:[9,9],desc:"异常、文件系统、并发与对象模型",wk:4}
  ],
  stages: CPP_STAGES
};
