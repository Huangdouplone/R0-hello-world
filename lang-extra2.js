/* ============================================================
 * R0:hello world · 题型扩容层（判断 / 填空）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 *
 * 目的：在原有「选择题」之外，为章节测评题库与分班测试题库补充
 *       judge（判断题）与 fill（填空题）两类题型，配合抽题时的题型保底
 *       与选项乱序，让每次测评的题型不再单一。
 *
 * 合并方式（零侵入，不改 lang-data-*.js / lang-quiz-extra.js / lang-placement-extra.js）：
 *   本文件在 index.html 中于这些叠加层之后、合并 IIFE 之前加载，
 *   直接把 S 折进 window.QUIZ_EXTRA、P 折进 window.PLACEMENT_EXTRA，
 *   既有的合并逻辑照常把它们 concat 进 stage.quiz 与 PLACEMENT[dk].qs。
 *
 * 字段：
 *   judge → { type:"judge", q, a, why }        a：0=正确 / 1=错误
 *   fill  → { type:"fill",  q, ans:[...], why } ans：可接受答案（判分时归一化）
 * ============================================================ */
(function () {
  var S = {};   // 章节测评扩容：stageId -> [题...]
  var P = {};   // 分班测试扩容：dk -> [题...]
/* ==================== Python ==================== */
S["py-s1"] = [
 {type:"judge",q:"用 python -m venv venv 建好的虚拟环境，激活之后 pip 安装的包会装进该项目目录，而不是全局环境。",a:0,why:"虚拟环境的意义就在于把依赖隔离到项目内，避免不同项目互相污染。"},
 {type:"judge",q:"Python 源文件必须使用 .py 扩展名，否则解释器无法运行它。",a:1,why:"解释器只按内容解析，把脚本改名成 hello.txt 后用 python hello.txt 一样能跑。"},
 {type:"fill",q:"创建虚拟环境（标准库自带）所使用的模块名是 ______。",ans:["venv"],why:"venv 是标准库自带的虚拟环境模块，用法为 python -m venv 目录名。"},
 {type:"fill",q:"Python 不用大括号划分代码块，而是依靠 ______（写中文即可）。",ans:["缩进","缩近","indent","indentation"],why:"缩进是 Python 的语法组成部分，同一块代码缩进必须一致。"}
];
S["py-s2"] = [
 {type:"judge",q:"Python 的变量本身带有固定类型，把一个字符串赋给它之后就不能再赋整数了。",a:1,why:"Python 是动态类型：变量只是名字，类型跟随它当前绑定的对象。"},
 {type:"judge",q:"表达式 1 == 1.0 的结果是 True。",a:0,why:"== 比较的是数值是否相等，1 与 1.0 数值相等，类型不影响比较结果。"},
 {type:"fill",q:"把字符串 '3' 转成整数的内置函数是 ______()。",ans:["int"],why:"int('3') 得到整数 3；转浮点用 float()，转字符串用 str()。"},
 {type:"fill",q:"表达式 3 ** 4 的结果是 ______。",ans:["81"],why:"** 是幂运算，3 的 4 次方等于 81。"}
];
S["py-s3"] = [
 {type:"judge",q:"while 循环的 else 子句会在循环被 break 打断时执行。",a:1,why:"循环的 else 只在循环「正常跑完」时执行，被 break 打断则不执行。"},
 {type:"judge",q:"for...else 中的 else 只有在循环没被 break 打断时才会执行。",a:0,why:"这正是「查找类循环」的惯用法：找到就 break，else 里处理没找到的情况。"},
 {type:"fill",q:"跳过本轮循环剩余语句、直接进入下一轮的关键字是 ______。",ans:["continue"],why:"continue 只结束本轮；break 才是终止整个循环。"},
 {type:"fill",q:"range(1, 10, 3) 生成的最后一个数是 ______。",ans:["7"],why:"步长为 3：1、4、7，再加 3 是 10 已达到终点（左闭右开），故最后一个是 7。"}
];
S["py-s4"] = [
 {type:"judge",q:"元组（tuple）创建之后，就不能再修改其中的元素。",a:0,why:"元组不可变，正因如此它才能作为字典的键、也能被放入集合。"},
 {type:"judge",q:"列表可以直接作为字典的键使用。",a:1,why:"字典的键必须可哈希，列表可变因而不行；要当键得先转成元组。"},
 {type:"fill",q:"对列表 a 取切片 a[1:4]，得到的元素个数是 ______。",ans:["3"],why:"切片左闭右开，取下标 1、2、3 共 3 个元素。"},
 {type:"fill",q:"字典 d = {'a': 1, 'b': 2} 中 len(d) 的值是 ______。",ans:["2"],why:"len 对字典返回键值对的数量。"}
];
S["py-s5"] = [
 {type:"judge",q:"函数内部要给全局变量赋值时，若不加 global 声明，改动会直接作用到全局变量上。",a:1,why:"不加 global 只会创建一个同名局部变量，全局那份不受影响。"},
 {type:"judge",q:"lambda 的函数体只能是一条表达式，不能包含语句。",a:0,why:"所以 lambda 里写不了赋值、循环等语句，复杂逻辑仍需 def。"},
 {type:"fill",q:"定义函数所使用的关键字是 ______。",ans:["def"],why:"def 是 Python 定义函数的关键字，如 def add(a, b): ..."},
 {type:"fill",q:"把可变对象（如列表）用作默认参数时，这个默认值会在多次调用之间被 ______（填「共享」或「复制」）。",ans:["共享","分享","共用"],why:"默认值只在函数定义时求值一次，因此多次调用共用同一个列表，会累积副作用。"}
];
S["py-s6"] = [
 {type:"judge",q:"传统上，一个 Python 包就是包含 __init__.py 文件的目录。",a:0,why:"__init__.py 让解释器把这个目录当作包来处理（命名空间包是后来的补充机制）。"},
 {type:"judge",q:"执行 import math 之后，直接写 sqrt(4) 就能调用平方根函数。",a:1,why:"必须写 math.sqrt(4)；只有 from math import sqrt 之后才能直接写 sqrt。"},
 {type:"fill",q:"列出当前环境已安装包及精确版本、常用于生成依赖清单的 pip 子命令是 pip ______。",ans:["freeze"],why:"pip freeze 输出已安装包及版本，重定向到 requirements.txt 即可复现环境。"},
 {type:"fill",q:"查看某个对象帮助文档的内置函数是 ______()。",ans:["help"],why:"help(obj) 会打印它的文档字符串；dir() 则可列出它的属性名。"}
];
S["py-s7"] = [
 {type:"judge",q:"with open(...) 语句块结束时文件会自动关闭，即使中途抛出异常也一样。",a:0,why:"with 依赖上下文管理器，无论正常结束还是异常退出都会执行清理。"},
 {type:"judge",q:"写一个裸的 except: 捕获所有异常是官方推荐的最佳实践。",a:1,why:"裸 except 会连 KeyboardInterrupt、SystemExit 一起吞掉，掩盖真正的错误。"},
 {type:"fill",q:"以追加模式打开文件（在末尾写入）时，mode 参数写作 '______'。",ans:["a","a+"],why:"a 表示追加，文件不存在则新建，写入不会覆盖原有内容。"},
 {type:"fill",q:"try 语句中无论是否发生异常都一定会执行的部分是 ______ 块。",ans:["finally"],why:"finally 用于释放资源等必须完成的收尾动作。"}
];
S["py-s8"] = [
 {type:"judge",q:"Python 支持多重继承，方法查找顺序由 MRO 决定。",a:0,why:"MRO 用 C3 线性化算法算出，super() 正是沿这条顺序找到下一个类。"},
 {type:"judge",q:"实例属性定义在 __init__ 中，因此直接用类名就能访问到它的值。",a:1,why:"实例属性属于具体对象，必须通过实例访问；类名只能访问类属性。"},
 {type:"fill",q:"定义类所使用的关键字是 ______。",ans:["class"],why:"写法为 class 类名(基类): ..."},
 {type:"fill",q:"想让对象支持 with 语句管理资源，需要实现 __enter__ 与 ______ 两个特殊方法。",ans:["__exit__","exit"],why:"进入 with 时调用 __enter__，离开时调用 __exit__ 完成清理，即使发生异常也会调用。"}
];
S["py-s9"] = [
 {type:"judge",q:"生成器函数执行到 yield 会暂停并保存现场，下次取值时从暂停处继续。",a:0,why:"这正是惰性求值的实现方式，值是一个一个产出的。"},
 {type:"judge",q:"因为存在 GIL，Python 多线程在任何场景下都毫无意义。",a:1,why:"GIL 只限制字节码不能并行执行；I/O 密集任务在等待时会释放 GIL，多线程依然有效。"},
 {type:"fill",q:"在生成器中「产出一个值并暂停」所使用的关键字是 ______。",ans:["yield"],why:"函数体里出现 yield，它就从普通函数变成生成器函数。"},
 {type:"fill",q:"在协程中做非阻塞休眠，应写 await asyncio.______(1)。",ans:["sleep"],why:"asyncio.sleep 会把控制权交回事件循环；用 time.sleep 会阻塞整个循环。"}
];
S["py-s10"] = [
 {type:"judge",q:"把可变对象作为参数传入函数，函数内修改它会影响到调用方。",a:0,why:"Python 传的是对象引用，修改对象内容两边都能看到（重新赋值则不会）。"},
 {type:"judge",q:"在 Python 中，is 与 == 完全等价，可以互相替换。",a:1,why:"== 比值，is 比身份（是不是同一个对象），对小整数和驻留字符串才会碰巧一致。"},
 {type:"fill",q:"函数参数的类型标注中，参数名与类型之间使用的符号中文名是 ______。",ans:["冒号","colon","："],why:"写法如 def f(x: int) -> int:，冒号把参数名与类型标注分开。"},
 {type:"fill",q:"自动收集 test_*.py 并运行全部测试的常用命令是 ______。",ans:["pytest","python -m pytest"],why:"在项目根目录执行 pytest 即可，无需手写测试驱动。"}
];
/* ==================== C ==================== */
S["c-s1"] = [
 {type:"judge",q:"执行 gcc hello.c -o hello 会生成一个名为 hello 的可执行文件。",a:0,why:"-o 用来指定输出文件名，不写则默认叫 a.out。"},
 {type:"judge",q:"编译产生的 .o 目标文件已经是可以直接运行的完整程序。",a:1,why:".o 只是编译并汇编后的中间产物，还要经过链接才能得到可执行文件。"},
 {type:"fill",q:"只编译并汇编、不链接，生成 .o 目标文件的 gcc 选项是 -______。",ans:["c"],why:"-c 就是 compile 的意思；它只做前三个阶段，最后一步链接留给链接器。"},
 {type:"fill",q:"C 程序执行的入口函数名是 ______。",ans:["main"],why:"操作系统把控制权交给 main，程序从这里开始执行。"}
];
S["c-s2"] = [
 {type:"judge",q:"在 C 语言中，有符号整数溢出属于未定义行为，其结果不可预测。",a:0,why:"标准把有符号溢出列为 UB，编译器可以假设它不会发生并据此优化。"},
 {type:"judge",q:"float 与 double 的精度完全相同，区别只在写法。",a:1,why:"double 位数更多、精度更高，这也是 scanf 中 double 必须用 %lf 的原因。"},
 {type:"fill",q:"获取类型或变量占用字节数的编译期运算符是 ______。",ans:["sizeof"],why:"sizeof 在编译期求值，返回 size_t 类型；对数组还能算出总字节数。"},
 {type:"fill",q:"在 C 中，0.1 + 0.2 == 0.3 这个比较的结果是 ______（填 true 或 false）。",ans:["false","0","假"],why:"二进制浮点无法精确表示 0.1 与 0.2，相加后与 0.3 存在极小误差，比较不成立。"}
];
S["c-s3"] = [
 {type:"judge",q:"在 printf 中，用 %lf 输出 double 也是合法的，效果与 %f 相同。",a:0,why:"printf 的 %f 本身就接受 double；%lf 写法被接受，但只在 scanf 中才是必须的。"},
 {type:"judge",q:"scanf(\"%d\", x) 可以直接把读到的数字写进变量 x，不需要取地址。",a:1,why:"scanf 需要变量地址才能把值写回，必须写 &x。"},
 {type:"fill",q:"从标准输入读取一个字符、返回 int 的标准函数是 ______()。",ans:["getchar"],why:"返回 int 是为了能用 EOF（通常为 -1）区分文件结束。"},
 {type:"fill",q:"printf 中输出换行使用的转义字符写作反斜杠加字母 ______。",ans:["n"],why:"\\n 是换行符，把它放在字符串里即可换行。"}
];
S["c-s4"] = [
 {type:"judge",q:"switch 的 case 标签必须是整型常量表达式，不能是变量。",a:0,why:"case 的值要在编译期确定，因此只能用常量（含字符常量和枚举）。"},
 {type:"judge",q:"写出 for(;;) 是语法错误，循环头部至少要保留一个条件。",a:1,why:"for(;;) 三个部分都能省略，等价于无限循环，常与 break 配合使用。"},
 {type:"fill",q:"只跳过本轮循环剩余语句、进入下一轮的关键字是 ______。",ans:["continue"],why:"continue 结束本轮；break 则直接终止整个循环。"},
 {type:"fill",q:"1 到 100 全部自然数之和是 ______。",ans:["5050"],why:"首尾配对：(1+100)×100÷2 = 5050，这正是循环累加的经典练习。"}
];
S["c-s5"] = [
 {type:"judge",q:"C 语言的函数参数全部是值传递，想在函数里修改调用方的变量必须传指针。",a:0,why:"值传递只复制一份，改副本对原变量无效；传指针再解引用才能写回原对象。"},
 {type:"judge",q:"register 是一个强制命令，编译器必须把该变量放进 CPU 寄存器。",a:1,why:"register 只是建议，编译器有权忽略，取地址等情形更是无法放进寄存器。"},
 {type:"fill",q:"表示函数没有返回值所使用的关键字是 ______。",ans:["void"],why:"void 作为返回类型表示函数不返回任何值。"},
 {type:"fill",q:"计算 5 的阶乘（即 5!）的结果是 ______。",ans:["120"],why:"5! = 5×4×3×2×1 = 120，是递归章节的入门练习。"}
];
S["c-s6"] = [
 {type:"judge",q:"数组名在大多数表达式中会退化为指向首元素的指针。",a:0,why:"正因为会退化，sizeof 在函数内部算不出数组真实长度，必须另传长度。"},
 {type:"judge",q:"strlen(\"abc\") 的值是 4，因为它把结尾的空字符也算进去了。",a:1,why:"strlen 不计结尾空字符，返回 3；把空字符算进去的是 sizeof。"},
 {type:"fill",q:"求字符串长度（不含结尾空字符）的标准库函数是 ______()。",ans:["strlen"],why:"需要包含 <string.h>，它逐个字符数到 '\\0' 为止。"},
 {type:"fill",q:"C 字符串以空字符结尾，这个空字符写作反斜杠加数字 ______。",ans:["0"],why:"'\\0' 的编码值为 0，是 C 字符串的结束标志。"}
];
S["c-s7"] = [
 {type:"judge",q:"对空指针 NULL 进行解引用会导致未定义行为，通常直接崩溃。",a:0,why:"解引用必须先保证指向有效对象，使用前判断是否为 NULL 是基本功。"},
 {type:"judge",q:"两个同类型指针相减，得到的是它们之间相差的字节数。",a:1,why:"指针相减得到的是元素个数，不是字节数；要字节数得先转成 char*。"},
 {type:"fill",q:"指针变量里存放的，是另一个对象的 ______（填「地址」或「内容」）。",ans:["地址","位址"],why:"指针的值就是一个地址，用 * 解引用后才得到该地址上的内容。"},
 {type:"fill",q:"当 int 占 4 字节时，int *p 让 p 加 1，地址值实际增加 ______ 字节。",ans:["4"],why:"指针运算按所指类型的大小缩放，int 指针加 1 就是前进 4 字节。"}
];
S["c-s8"] = [
 {type:"judge",q:"用 malloc 申请的内存需要用 free 释放，否则会造成内存泄漏。",a:0,why:"堆内存的生命周期由程序员负责，缺失 free 就会一直占着不放。"},
 {type:"judge",q:"调用 free(p) 之后，p 会自动变成 NULL。",a:1,why:"free 只归还内存，不会修改指针变量本身，所以要手动置 NULL 防悬垂。"},
 {type:"fill",q:"在堆上申请指定字节数内存的标准函数是 ______()。",ans:["malloc"],why:"malloc(size) 返回 void*，可能返回 NULL，使用前必须检查。"},
 {type:"fill",q:"当 int 占 4 字节时，calloc(4, sizeof(int)) 一共申请 ______ 字节。",ans:["16"],why:"calloc(个数, 每个的大小) 会乘起来，并把这块内存全部初始化为 0。"}
];
S["c-s9"] = [
 {type:"judge",q:"结构体的实际大小会受内存对齐影响，可能大于各成员大小之和。",a:0,why:"为了访问效率，编译器会插入填充字节，所以 sizeof 常常比手算的大。"},
 {type:"judge",q:"#include <stdio.h> 与 #include \"stdio.h\" 的头文件查找顺序完全相同。",a:1,why:"尖括号只查系统目录；双引号先查当前目录再查系统目录。"},
 {type:"fill",q:"给已有类型起别名所使用的关键字是 ______。",ans:["typedef"],why:"typedef 旧类型 新名; 常用于简化结构体与函数指针的写法。"},
 {type:"fill",q:"宏定义 #define PI 3.14 的展开发生在「预处理 / 编译 / 链接」三个阶段中的 ______阶段。",ans:["预处理","预编译","preprocess"],why:"宏替换属于预处理，此时还没有生成任何机器指令。"}
];
S["c-s10"] = [
 {type:"judge",q:"fclose 的返回值也应当检查，否则可能悄悄丢掉缓冲区里没写进文件的数据。",a:0,why:"数据先写进缓冲区，fclose 才真正落盘，失败时它会返回 EOF，必须处理。"},
 {type:"judge",q:"int *a[10] 声明的是一个指向 int[10] 数组的指针。",a:1,why:"[] 优先级更高，所以 a 是 10 个 int* 组成的数组；指向数组的指针要写成 int (*a)[10]。"},
 {type:"fill",q:"fopen 打开文件失败时返回的值是 ______。",ans:["null","0"],why:"返回 NULL 表示失败，可用 perror 或 strerror(errno) 查看具体原因。"},
 {type:"fill",q:"sprintf 把格式化结果写入字符串，对应的把结果写入 ______ 的函数是 fprintf。",ans:["文件","文件流","file"],why:"fprintf 的第一个参数就是 FILE* 流对象。"}
];
/* ==================== C++ ==================== */
S["cpp-s1"] = [
 {type:"judge",q:"std::cout 通过 << 运算符把数据送到标准输出，可以与 printf 混用。",a:0,why:"两者可以混用，但混用时要注意缓冲区刷新顺序，一般建议统一用一种。"},
 {type:"judge",q:"C++ 源文件只能用 .cpp 扩展名，写成 .cc 或 .cxx 就会编译失败。",a:1,why:"扩展名只是惯例，.cc/.cxx/.c++ 都被主流编译器接受，加 -x c++ 还能强制指定。"},
 {type:"fill",q:"C++ 标准库中所有名字所在的命名空间是 ______。",ans:["std"],why:"所以要么写 std::，要么用 using 声明引入具体名字。"},
 {type:"fill",q:"读取一整行（允许包含空格）应写 std::______(std::cin, line)。",ans:["getline"],why:"getline 一直读到换行为止，配合 std::string 使用比 >> 更安全。"}
];
S["cpp-s2"] = [
 {type:"judge",q:"引用必须在定义时初始化，并且之后不能再绑定到别的对象。",a:0,why:"引用是别名，一旦绑定就固定了；想要可改绑的语义得用指针。"},
 {type:"judge",q:"constexpr 变量要等到程序运行时才能求出它的值。",a:1,why:"constexpr 要求编译期可求值，所以能用来做数组长度、模板参数等。"},
 {type:"fill",q:"声明编译期常量、可用于数组长度的关键字是 ______。",ans:["constexpr"],why:"constexpr 保证在编译期求值，比单纯的 const 约束更强。"},
 {type:"fill",q:"C++11 起取代 NULL 的类型安全空指针字面量是 ______。",ans:["nullptr","null pointer"],why:"nullptr 有独立类型 std::nullptr_t，不会误匹配整数重载。"}
];
S["cpp-s3"] = [
 {type:"judge",q:"用范围 for 遍历容器时，元素类型写成 const 引用可以避免一次多余的拷贝。",a:0,why:"const 引用既省拷贝又防止意外修改，是只读遍历的推荐写法。"},
 {type:"judge",q:"C++ 的 switch 允许直接用 std::string 作为分支条件。",a:1,why:"switch 只接受可隐式转换为整型的表达式，字符串要用 if-else 链或哈希。"},
 {type:"fill",q:"把 pair 拆成两个变量时，结构化绑定写作 auto [a, ______] = p。",ans:["b"],why:"方括号里按顺序列出要绑定的名字，数量必须与成员数一致。"},
 {type:"fill",q:"C++11 引入的、可简写为「范围 ______ 循环」的遍历写法，能直接遍历容器元素。",ans:["for"],why:"写法为 for (const auto& x : c)，会自动处理首尾迭代器。"}
];
S["cpp-s4"] = [
 {type:"judge",q:"函数重载只看参数列表，返回类型不同不构成重载。",a:0,why:"重载决议依据参数个数与类型，仅返回类型不同会报重复定义。"},
 {type:"judge",q:"按值捕获的外部变量，在 lambda 体内默认就可以直接修改。",a:1,why:"按值捕获的副本默认是 const，要改必须给 lambda 加 mutable。"},
 {type:"fill",q:"lambda 表达式以一对 ______ 开头，其中写捕获列表（填中文名）。",ans:["方括号","中括号","方块括号"],why:"写法如 [&x](int a){ return a + x; }，捕获方式决定了能访问哪些外部变量。"},
 {type:"fill",q:"在函数声明末尾加上关键字 ______，表示该函数不抛出异常。",ans:["noexcept"],why:"noexcept 既是承诺也是可被检测的性质，对移动构造等场景影响很大。"}
];
S["cpp-s5"] = [
 {type:"judge",q:"构造函数没有返回值，连 void 也不能写。",a:0,why:"构造函数与类同名且不写返回类型，写 void 是语法错误。"},
 {type:"judge",q:"析构函数可以像普通函数一样被重载，允许存在多个不同版本的析构函数。",a:1,why:"析构函数唯一且无参数、无返回值，不可以重载。"},
 {type:"fill",q:"在成员函数中指向「当前对象自身地址」的指针名是 ______。",ans:["this","this指针"],why:"this 是隐式传入的、指向调用对象的常量指针。"},
 {type:"fill",q:"C++ 中 struct 的成员默认访问级别是 ______（填 public 或 private）。",ans:["public","公有","公开"],why:"struct 默认公有，class 默认私有，这是两者唯一实质差别。"}
];
S["cpp-s6"] = [
 {type:"judge",q:"通过基类指针调用虚函数时，虚函数表让实际调用到派生类的实现。",a:0,why:"这就是动态绑定：运行期依据对象的真实类型查表决定调用哪个版本。"},
 {type:"judge",q:"把派生类对象赋值给基类对象会产生切片，但多态依然能够生效。",a:1,why:"切片只保留了基类部分，派生类的数据与重写都丢了，多态自然失效。"},
 {type:"fill",q:"为了让通过基类指针删除派生对象时析构链完整，基类析构函数应声明为 ______ 函数。",ans:["虚","virtual"],why:"虚析构才能触发动态绑定，否则只调用基类析构造成资源泄漏。"},
 {type:"fill",q:"在派生类中显式标注「这是重写基类虚函数」的关键字是 ______。",ans:["override"],why:"签名不匹配时会立刻编译报错，避免「以为重写了其实没有」。"}
];
S["cpp-s7"] = [
 {type:"judge",q:"调用函数模板时通常不需要显式写出类型，编译器能从实参推导。",a:0,why:"这正是泛型的便利之处，只有推导不出来时才需要写 <int> 之类。"},
 {type:"judge",q:"模板的声明与实现应当像普通函数那样分离到 .h 与 .cpp 两个文件里。",a:1,why:"实例化需要看到完整定义，所以模板一般直接写在头文件中。"},
 {type:"fill",q:"声明模板所使用的关键字是 ______。",ans:["template"],why:"写法为 template<typename T> 后紧跟函数或类的定义。"},
 {type:"fill",q:"C++20 引入的、用于约束模板参数类型要求的关键字是 ______。",ans:["concepts","concept","requires"],why:"concepts 把「类型必须满足什么」写成可复用的具名约束。"}
];
S["cpp-s8"] = [
 {type:"judge",q:"一边遍历 vector 一边 push_back，可能导致迭代器失效。",a:0,why:"扩容会重新分配内存，原有迭代器与引用全部作废。"},
 {type:"judge",q:"std::map 中的元素是按照插入顺序存放的。",a:1,why:"map 按键有序（默认升序），要保持插入顺序得用别的容器。"},
 {type:"fill",q:"给容器整体排序使用的标准算法是 std::______。",ans:["sort"],why:"std::sort(v.begin(), v.end()) 默认升序，可传比较器改变规则。"},
 {type:"fill",q:"返回容器首元素迭代器的成员函数是 ______()。",ans:["begin"],why:"begin()/end() 构成左闭右开区间，是所有标准算法的输入形式。"}
];
S["cpp-s9"] = [
 {type:"judge",q:"unique_ptr 不能拷贝，但可以用 std::move 把所有权转移出去。",a:0,why:"独占所有权决定了它只可移动不可拷贝，转移后原指针变为空。"},
 {type:"judge",q:"std::move 会把对象里的数据真正搬运到目标对象去。",a:1,why:"std::move 只是把左值转换成右值引用，真正的搬运由移动构造/赋值完成。"},
 {type:"fill",q:"表示独占所有权的智能指针是 std::______。",ans:["unique_ptr"],why:"它零额外开销，离开作用域自动释放资源。"},
 {type:"fill",q:"用于打破 shared_ptr 循环引用的弱引用智能指针是 std::______。",ans:["weak_ptr"],why:"weak_ptr 不增加引用计数，只观察不持有，可安全检测对象是否还活着。"}
];
S["cpp-s10"] = [
 {type:"judge",q:"捕获异常时按引用捕获，可以避免对象切片并保留派生类型的完整信息。",a:0,why:"按值捕获会把派生异常切成基类对象，catch 就再也拿不到派生信息了。"},
 {type:"judge",q:"volatile 关键字能够保证多线程之间的内存可见性与操作的原子性。",a:1,why:"volatile 只约束编译器不要优化掉读写，与线程同步无关，必须用互斥量或原子类型。"},
 {type:"fill",q:"保护临界区、保证同一时刻只有一个线程进入的同步原语是 std::______。",ans:["mutex"],why:"配合 std::lock_guard 使用可自动加解锁，避免忘记解锁。"},
 {type:"fill",q:"C++11 起创建线程使用的标准类是 std::______。",ans:["thread"],why:"std::thread t(f, args...); 构造即启动，析构前必须 join 或 detach。"}
];
/* ==================== Java ==================== */
S["java-s1"] = [
 {type:"judge",q:"javac 编译 Java 源文件后产生的是 .class 字节码文件。",a:0,why:"字节码与平台无关，再由各平台的 JVM 翻译执行，这就是「一次编写，到处运行」。"},
 {type:"judge",q:"JVM 只能运行 Java 语言写出的程序，其他语言无法编译到 JVM 之上。",a:1,why:"只要编译成合法的字节码就能跑，Kotlin、Scala、Groovy 都是 JVM 语言。"},
 {type:"fill",q:"Java 源文件编译后产生的字节码文件扩展名是 .______。",ans:["class"],why:"javac Hello.java 会生成 Hello.class，再用 java Hello 运行。"},
 {type:"fill",q:"同时包含编译器与运行环境、开发时必须安装的工具包简称是 ______。",ans:["jdk"],why:"JDK 包含 JRE 与 javac 等开发工具；只跑程序装 JRE 就够。"}
];
S["java-s2"] = [
 {type:"judge",q:"Java 的 int 类型在所有平台上都是 32 位，长度不会随操作系统改变。",a:0,why:"基本类型大小固定是 Java 跨平台一致性的重要基础。"},
 {type:"judge",q:"两个 Integer 对象用 == 比较与用 equals 比较，结果一定相同。",a:1,why:"== 比的是引用地址，只有 -128~127 的缓存对象才碰巧相等，值比较必须用 equals。"},
 {type:"fill",q:"Java 中表示单个 16 位 Unicode 字符的基本类型是 ______。",ans:["char"],why:"char 占 2 字节，用单引号书写字符字面量。"},
 {type:"fill",q:"把字符串转换成整数使用的包装类方法是 Integer.______(\"42\")。",ans:["parseint","parseInt","valueof"],why:"parseInt 返回 int，valueOf 返回 Integer 对象。"}
];
S["java-s3"] = [
 {type:"judge",q:"Java 14 之后的 switch 表达式使用 case X -> 写法，不会发生穿透。",a:0,why:"箭头写法不再需要 break，而且可以直接作为表达式返回一个值。"},
 {type:"judge",q:"Java 的增强 for 可以在遍历的同时安全地删除集合中的元素。",a:1,why:"增强 for 底层用迭代器，边遍历边改会抛 ConcurrentModificationException。"},
 {type:"fill",q:"立即终止整个循环所使用的关键字是 ______。",ans:["break"],why:"break 结束循环；继续下一轮用 continue。"},
 {type:"fill",q:"Java 中比较两个字符串内容是否相同，应调用字符串的 ______ 方法。",ans:["equals"],why:"== 比引用，equals 比内容；忽略大小写则用 equalsIgnoreCase。"}
];
S["java-s4"] = [
 {type:"judge",q:"String 对象一旦创建，它的内容就不能被修改。",a:0,why:"String 不可变，每次拼接都会产生新对象，因此循环拼接要用 StringBuilder。"},
 {type:"judge",q:"StringBuilder 是线程安全的，而 StringBuffer 不是。",a:1,why:"恰好相反：StringBuffer 的方法加锁因而线程安全，StringBuilder 不加锁所以更快。"},
 {type:"fill",q:"获取数组长度的属性名是 ______。",ans:["length"],why:"数组用 length 属性，String 用 length() 方法，集合用 size() 方法。"},
 {type:"fill",q:"循环中拼接大量字符串时，应优先使用 ______ 类。",ans:["stringbuilder"],why:"它内部维护可变字符数组，避免产生成千上万的临时 String。"}
];
S["java-s5"] = [
 {type:"judge",q:"Java 的参数传递方式只有值传递一种。",a:0,why:"引用类型传的也是引用的副本，所以方法内重新赋值不会影响调用方。"},
 {type:"judge",q:"static 方法内部可以直接使用 this 关键字。",a:1,why:"static 方法属于类、不依赖具体对象，因此没有 this。"},
 {type:"fill",q:"Java 中一个源文件里最多只能有一个用 ______ 修饰的公有类，且文件名必须与它同名。",ans:["public"],why:"这是编译器的硬性要求，其他非公有类可以并存于同一文件。"},
 {type:"fill",q:"在 Java 中创建对象所使用的运算符是 ______。",ans:["new"],why:"new 负责分配内存并调用构造方法，返回对象的引用。"}
];
S["java-s6"] = [
 {type:"judge",q:"接口中的方法默认是 public abstract 的，即使不写修饰符也一样。",a:0,why:"接口方法默认公开抽象；Java 8 起还允许 default 与 static 方法提供实现。"},
 {type:"judge",q:"Java 支持一个类同时继承多个父类。",a:1,why:"类只能单继承，多继承的诉求用实现多个接口来表达。"},
 {type:"fill",q:"子类构造方法中调用父类构造方法使用的关键字是 ______。",ans:["super"],why:"super(...) 必须是子类构造的第一条语句。"},
 {type:"fill",q:"重写 equals 之后，通常还要一起重写 ______ 方法以维持契约一致。",ans:["hashcode"],why:"相等对象的哈希值必须相同，否则放进 HashSet/HashMap 会找不到。"}
];
S["java-s7"] = [
 {type:"judge",q:"受检异常必须被捕获，或者在方法签名上声明抛出。",a:0,why:"这是编译器的强制检查，也是它与 RuntimeException 的根本区别。"},
 {type:"judge",q:"声明为 List<? extends Number> 的集合，可以往里面添加 Integer 元素。",a:1,why:"extends 只保证「读出来是 Number」，写入被禁止（PECS 中的生产者）。"},
 {type:"fill",q:"捕获异常所使用的代码块关键字是 ______。",ans:["catch"],why:"try 负责监视，catch 负责处理，finally 负责收尾。"},
 {type:"fill",q:"try-with-resources 在代码块结束时，会自动调用资源的 ______() 方法。",ans:["close"],why:"只要资源实现了 AutoCloseable 接口就能被自动关闭，无需手写 finally。"}
];
S["java-s8"] = [
 {type:"judge",q:"用 BufferedReader 包装输入流逐行读取，比逐字节读取 FileInputStream 效率高得多。",a:0,why:"缓冲减少系统调用次数；逐行读取还免去了自己处理换行符的麻烦。"},
 {type:"judge",q:"Files.readAllLines 返回的对象持有文件句柄，使用后必须显式关闭。",a:1,why:"它返回的是 List<String>，读取时已全部载入内存并关闭了流；返回 Stream 的 Files.lines 才必须关闭。"},
 {type:"fill",q:"Java 中读取二进制数据的基础输入流类名是 File______Stream。",ans:["input"],why:"FileInputStream 面向字节，适合图片、压缩包等任意二进制数据。"},
 {type:"fill",q:"NIO.2 中表示文件路径的接口名是 ______。",ans:["path"],why:"Path 由 Paths.get 或 Path.of 创建，配合 Files 工具类完成读写。"}
];
S["java-s9"] = [
 {type:"judge",q:"volatile 能保证可见性，但不能保证 i++ 这类复合操作的原子性。",a:0,why:"可见性靠内存屏障实现，原子性还得靠 synchronized 或 AtomicInteger。"},
 {type:"judge",q:"直接调用 Thread 的 run() 方法就会开启一个新线程。",a:1,why:"run() 只是普通方法调用，必须用 start() 才会创建并调度新线程。"},
 {type:"fill",q:"向线程池提交任务并拿到 Future 的方法名是 ______。",ans:["submit"],why:"submit 返回 Future 可取回结果；execute 只提交无返回值的任务。"},
 {type:"fill",q:"等待某个线程执行结束所调用的是 Thread 的 ______() 方法。",ans:["join"],why:"join 让当前线程阻塞，直到目标线程终止。"}
];
S["java-s10"] = [
 {type:"judge",q:"Stream 的中间操作是惰性的，只有遇到终止操作才会真正执行整个管道。",a:0,why:"这使 map/filter 可以合并成一趟遍历，效率更高。"},
 {type:"judge",q:"只要接口里有方法，就可以用 Lambda 表达式实现它。",a:1,why:"Lambda 只能对应「函数式接口」——有且仅有一个抽象方法。"},
 {type:"fill",q:"Java 8 引入的不可变日期时间类型的包名是 java.______。",ans:["time"],why:"java.time 下的 LocalDate、Instant 等类型线程安全且不可变。"},
 {type:"fill",q:"JVM 中负责回收不再被引用对象的机制，英文缩写是 ______。",ans:["gc"],why:"GC 通过可达性分析判断对象存活，回收堆中不可达对象。"}
];
/* ==================== JavaScript ==================== */
S["js-s1"] = [
 {type:"judge",q:"用 const 声明的对象，之后仍然可以修改它的属性。",a:0,why:"const 锁定的是「不能重新赋值给别的对象」，对象内部属性并不受限制。"},
 {type:"judge",q:"let 与 var 的行为完全一样，只是名字不同。",a:1,why:"let 有块级作用域且存在暂时性死区，var 是函数作用域且会提升为 undefined。"},
 {type:"fill",q:"声明一个不会重新赋值的变量所使用的关键字是 ______。",ans:["const"],why:"需要重新赋值时用 let，彻底不用 var。"},
 {type:"fill",q:"JS 中严格相等运算符由三个 ______ 组成（填中文名）。",ans:["等号","等于号"],why:"=== 同时比较值与类型，能避开隐式转换陷阱。"}
];
S["js-s2"] = [
 {type:"judge",q:"箭头函数没有自己的 this，它会捕获外层作用域的 this。",a:0,why:"因此它非常适合做回调，不必再写 var self = this 之类的变通。"},
 {type:"judge",q:"遍历数组元素时推荐使用 for...in，它直接给出对应位置的元素值。",a:1,why:"for...in 遍历的是键（对数组即下标），遍历值应该用 for...of。"},
 {type:"fill",q:"遍历数组元素值（而不是下标）推荐使用 for...______ 语法。",ans:["of"],why:"for (const v of arr) 直接拿到值，也支持 break/continue。"},
 {type:"fill",q:"调用函数时把数组展开为独立参数的运算符，是三个 ______（填中文名）。",ans:["点","点号"],why:"fn(...arr) 就是展开运算符最常用的场景之一，它也能浅拷贝数组。"}
];
S["js-s3"] = [
 {type:"judge",q:"展开运算符 ... 用来复制对象时执行的是浅拷贝。",a:0,why:"嵌套对象仍是同一个引用，需要深拷贝得用 structuredClone 等手段。"},
 {type:"judge",q:"调用数组的 map 方法后，原数组里的元素也会被改成新值。",a:1,why:"map 返回新数组，不改动原数组；会改原数组的是 forEach 里的手动赋值。"},
 {type:"fill",q:"把数组每个元素变换成新元素、并返回新数组的方法是 ______。",ans:["map"],why:"map 一对一映射；筛选要用 filter，累计要用 reduce。"},
 {type:"fill",q:"把 JavaScript 对象转成 JSON 字符串的方法是 JSON.______。",ans:["stringify"],why:"反向操作是 JSON.parse，两者常配合 localStorage 使用。"}
];
S["js-s4"] = [
 {type:"judge",q:"事件冒泡使子元素触发的事件同样能被祖先元素上的监听器捕获。",a:0,why:"正是靠冒泡才能做事件委托；不想要冒泡可用 stopPropagation 阻止。"},
 {type:"judge",q:"document.querySelector 返回的是所有匹配元素组成的数组。",a:1,why:"它只返回第一个匹配元素；要全部匹配必须用 querySelectorAll。"},
 {type:"fill",q:"阻止元素默认行为（例如链接跳转）应调用事件的 ______() 方法。",ans:["preventdefault"],why:"在处理表单提交或链接点击时几乎必用。"},
 {type:"fill",q:"按 ID 选择单个元素的方法是 document.getElement______Id。",ans:["by"],why:"写成 document.getElementById('title')，也可用 querySelector('#title') 代替。"}
];
S["js-s5"] = [
 {type:"judge",q:"Promise 一旦从 pending 变为 fulfilled，状态就再也不会改变。",a:0,why:"状态不可逆，且 resolve 与 reject 只有先到的那一个生效。"},
 {type:"judge",q:"用 fetch 请求接口收到 500 响应时，会直接进入 catch 分支。",a:1,why:"HTTP 错误状态不算网络异常，必须自己检查 res.ok 再抛错。"},
 {type:"fill",q:"等待 Promise 结果所使用的关键字是 ______。",ans:["await"],why:"await 只能写在 async 函数内部，它会把后续代码挂起等待结果。"},
 {type:"fill",q:"用 async 声明的函数，调用后总会返回一个 ______ 对象。",ans:["promise"],why:"即使函数里直接 return 值，也会被自动包成已完成的 Promise。"}
];
S["js-s6"] = [
 {type:"judge",q:"JS 的 class 本质上是基于原型链继承的语法糖。",a:0,why:"方法仍然挂在 prototype 上，class 只是让写法更接近传统面向对象。"},
 {type:"judge",q:"JS 的 class 支持真正的多继承。",a:1,why:"一个类只能 extends 一个父类；复用多个来源要用 mixin 组合。"},
 {type:"fill",q:"ES 模块中把某个名字对外暴露所使用的关键字是 ______。",ans:["export"],why:"export const a = 1 或 export default 都可以，导入用 import。"},
 {type:"fill",q:"ES 模块中引入其他模块所使用的关键字是 ______。",ans:["import"],why:"import { a } from './m.js' 引入具名导出，import x from 引入默认导出。"}
];
S["js-s7"] = [
 {type:"judge",q:"localStorage 只能保存字符串，存对象前必须先序列化。",a:0,why:"直接存对象会被强制转成 '[object Object]'，要先 JSON.stringify。"},
 {type:"judge",q:"localStorage 里的数据会在关闭浏览器后自动清除。",a:1,why:"localStorage 是长期存储，关闭浏览器后仍然存在；会话级的存储用 sessionStorage。"},
 {type:"fill",q:"让动画跟随屏幕刷新率执行、比 setInterval 更流畅的函数是 ______AnimationFrame。",ans:["request"],why:"requestAnimationFrame 会在每帧渲染前回调，页面不可见时自动暂停。"},
 {type:"fill",q:"现代浏览器中发起网络请求的 API 函数名是 ______()。",ans:["fetch"],why:"fetch 返回 Promise，比老式的 XMLHttpRequest 简洁得多。"}
];
S["js-s8"] = [
 {type:"judge",q:"package-lock.json 记录了依赖树的精确版本，应当提交到版本库。",a:0,why:"它保证团队成员与 CI 装到完全一致的依赖版本。"},
 {type:"judge",q:"防抖与节流说的是同一个概念，只是叫法不同。",a:1,why:"防抖是等停止触发后才执行一次；节流是固定间隔内最多执行一次。"},
 {type:"fill",q:"现代前端工程中用于快速启动与打包的开发构建工具之一是 ______（如 vite、webpack）。",ans:["vite"],why:"vite 基于原生 ESM 提供极快的冷启动，生产构建则用 Rollup。"},
 {type:"fill",q:"安装项目依赖最常用的包管理器命令是 ______ install。",ans:["npm","yarn","pnpm"],why:"npm install 会读取 package.json 并安装全部依赖到 node_modules。"}
];
/* ==================== C# ==================== */
S["cs-s1"] = [
 {type:"judge",q:"C# 代码会被编译成 IL 中间语言，再由 .NET 运行时执行。",a:0,why:"运行时在首次执行时把 IL 即时编译（JIT）成本机指令。"},
 {type:"judge",q:"C# 只能在 Windows 上开发和运行。",a:1,why:"现代 .NET 是跨平台的，Linux 与 macOS 都能开发和部署。"},
 {type:"fill",q:"创建控制台项目的命令是 dotnet new ______。",ans:["console"],why:"dotnet new console 会生成含 Program.cs 的项目骨架。"},
 {type:"fill",q:"C# 控制台程序的入口方法名是 ______。",ans:["main"],why:"通常写作 static void Main(string[] args)。"}
];
S["cs-s2"] = [
 {type:"judge",q:"ref 参数在调用前必须先被明确赋值。",a:0,why:"因为 ref 表示「传入并可能被修改」，编译器要求调用方先给它一个值。"},
 {type:"judge",q:"使用 foreach 遍历集合时，可以在循环体内修改当前元素。",a:1,why:"foreach 的迭代变量是只读的，要修改得改用 for 并通过下标访问。"},
 {type:"fill",q:"让参数按引用传递、方法内可以修改调用方变量的关键字是 ______。",ans:["ref","out"],why:"ref 与 out 都按引用传递，区别是 out 不要求传入前初始化。"},
 {type:"fill",q:"比较两个字符串内容，推荐调用实例方法 ______(\"abc\")。",ans:["equals"],why:"== 在 C# 中虽是值比较，但显式用 Equals 表达更清晰，也可指定比较规则。"}
];
S["cs-s3"] = [
 {type:"judge",q:"Dictionary<TKey, TValue> 中不允许出现重复的键。",a:0,why:"重复添加同一个键会抛 ArgumentException，覆盖要用索引器赋值。"},
 {type:"judge",q:"List<T>.Add 方法会返回刚刚被添加进去的那个元素。",a:1,why:"Add 返回 void，它只是把元素追加到末尾。"},
 {type:"fill",q:"List<T> 中移除首个匹配元素的方法是 ______。",ans:["remove"],why:"Remove 按值移除；RemoveAt 按下标移除。"},
 {type:"fill",q:"LINQ 中按条件筛选元素所使用的方法是 ______。",ans:["where"],why:"用法如 nums.Where(n => n > 0)，返回的是惰性序列。"}
];
S["cs-s4"] = [
 {type:"judge",q:"C# 的类只能继承一个父类，但可以实现多个接口。",a:0,why:"单继承 + 多接口是 C# 平衡简洁与灵活性的折中。"},
 {type:"judge",q:"接口中可以声明实例字段。",a:1,why:"接口只描述契约，不能有实例字段；可以声明属性、方法、事件。"},
 {type:"fill",q:"C# 中表示继承所使用的符号是 ______。",ans:["冒号","colon"],why:"写法为 class Dog : Animal，接口同样用冒号分隔。"},
 {type:"fill",q:"C# 中禁止某个类被继承所使用的关键字是 ______。",ans:["sealed"],why:"sealed class 不能被继承，sealed override 则禁止进一步重写。"}
];
S["cs-s5"] = [
 {type:"judge",q:"异步方法应返回 Task 或 Task<T>，async void 只应留给事件处理器。",a:0,why:"async void 无法被 await、异常也无处捕获，容易造成进程崩溃。"},
 {type:"judge",q:"await Task.WhenAll 会阻塞当前线程，直到所有任务都完成。",a:1,why:"它是异步等待：交出控制权而非占用线程，等全部完成后继续。"},
 {type:"fill",q:"确保 IDisposable 资源在使用后自动释放的语句关键字是 ______。",ans:["using"],why:"using 块结束时会自动调用 Dispose，等价于 try/finally。"},
 {type:"fill",q:"异步方法若不返回结果，其返回类型写 ______。",ans:["task"],why:"返回 Task 表示「将来会完成」；需要值时用 Task<T>。"}
];
S["cs-s6"] = [
 {type:"judge",q:"File.WriteAllText 会覆盖目标文件原有的全部内容。",a:0,why:"要追加内容应使用 File.AppendAllText，否则原数据会被清空。"},
 {type:"judge",q:"调用 JsonSerializer.Serialize 时必须显式写出要序列化的类型参数。",a:1,why:"泛型可以从传入的对象参数推断出来，多数情况无需手写类型。"},
 {type:"fill",q:"一次性把全部文本写入文件的方法是 File.______Text。",ans:["writeall"],why:"同理还有 ReadAllText 用于一次性读取。"},
 {type:"fill",q:".NET 中表示一段时间间隔的类型名是 ______。",ans:["timespan"],why:"TimeSpan.FromMinutes(5) 之类的写法比直接算秒数清晰得多。"}
];
S["cs-s7"] = [
 {type:"judge",q:"record 会自动实现基于值的相等性比较。",a:0,why:"两个 record 只要各属性相等就判定为相等，省去了手写 Equals 与 GetHashCode。"},
 {type:"judge",q:"record 实例的属性默认可被任意修改。",a:1,why:"位置 record 生成的是 init-only 属性，创建后不可修改，天然适合不可变数据。"},
 {type:"fill",q:"在 switch 表达式中表示默认分支的弃元符号中文名是 ______。",ans:["下划线"],why:"写作 _ => 默认值，表示不关心具体是什么值。"},
 {type:"fill",q:"C# 9 引入的、用于声明不可变数据类型的引用类型关键字是 ______。",ans:["record"],why:"record 自带值语义与字符串化的 ToString，非常适合传数据。"}
];
/* ==================== Go ==================== */
S["go-s1"] = [
 {type:"judge",q:"go build 会生成可执行文件，而 go run 编译后直接运行、不留下可执行文件。",a:0,why:"开发调试常用 go run，发布交付则用 go build 得到二进制。"},
 {type:"judge",q:"Go 允许声明了却不使用的变量，编译不会报错。",a:1,why:"Go 对未使用的变量和导入都视为编译错误，强制保持代码整洁。"},
 {type:"fill",q:"初始化模块所使用的命令是 go mod ______。",ans:["init"],why:"go mod init 模块名 会生成 go.mod 记录模块路径与依赖。"},
 {type:"fill",q:"Go 程序入口所在的包名是 ______。",ans:["main"],why:"package main 加上 func main() 才是可执行程序的入口。"}
];
S["go-s2"] = [
 {type:"judge",q:"Go 的函数可以返回多个值，最典型的是同时返回结果与 error。",a:0,why:"多返回值让错误处理变成显式的第二返回值，而不是异常。"},
 {type:"judge",q:"defer 在函数返回之后才执行，所以它无法修改命名返回值。",a:1,why:"defer 在返回值确定之后、函数真正返回之前执行，因此可以修改命名返回值。"},
 {type:"fill",q:"Go 中唯一用于循环的关键字是 ______。",ans:["for"],why:"go 没有 while，写 for 条件 就等价于 while。"},
 {type:"fill",q:"把某个调用推迟到函数即将返回时执行的关键字是 ______。",ans:["defer"],why:"常用来关闭文件、解锁，多个 defer 按后进先出顺序执行。"}
];
S["go-s3"] = [
 {type:"judge",q:"未初始化的 map 直接写入会触发 panic。",a:0,why:"nil map 没有底层哈希表，必须先用 make 创建。"},
 {type:"judge",q:"Go 的 slice 与数组完全等价，长度都是固定的。",a:1,why:"数组长度是类型的一部分且固定；slice 是可变长的、含底层数组指针的描述符。"},
 {type:"fill",q:"向 slice 末尾追加元素所使用的内置函数是 ______。",ans:["append"],why:"append 可能触发扩容并返回新的 slice，所以必须接收返回值。"},
 {type:"fill",q:"Go 中创建 slice、map 或 channel 所使用的内置函数是 ______。",ans:["make"],why:"make 只用于 slice/map/channel，其他类型要用 new。"}
];
S["go-s4"] = [
 {type:"judge",q:"Go 的接口是隐式实现的，不需要写 implements 关键字。",a:0,why:"只要类型实现了接口要求的全部方法就自动满足该接口，这就是鸭子类型。"},
 {type:"judge",q:"Go 中 panic 之后可以用 try/catch 语句捕获。",a:1,why:"Go 没有 try/catch，用 recover 配合 defer 来拦截 panic。"},
 {type:"fill",q:"Go 中表示错误的内置接口类型名是 ______。",ans:["error"],why:"实现 Error() string 方法即满足 error 接口。"},
 {type:"fill",q:"安全类型断言 v, ok := x.(T) 这种双返回值形式常被称为 comma-______ 形式。",ans:["ok"],why:"comma-ok 形式断言失败时不会 panic，而是把 ok 置为 false。"}
];
S["go-s5"] = [
 {type:"judge",q:"channel 应当由发送方调用 close 关闭。",a:0,why:"由发送方关闭是惯例；向已关闭的 channel 发送会 panic，接收则立即返回零值。"},
 {type:"judge",q:"多个 goroutine 同时读写同一个 map 是安全的。",a:1,why:"Go 的内置 map 不是并发安全的，必须加锁或用 sync.Map，否则运行时报错。"},
 {type:"fill",q:"启动一个 goroutine 所使用的关键字是 ______。",ans:["go"],why:"go f(x) 立即返回，f 在后台的新 goroutine 中执行。"},
 {type:"fill",q:"等待一组 goroutine 全部完成的同步原语是 sync.______。",ans:["waitgroup"],why:"Add 计数、Done 减一、Wait 阻塞到计数归零。"}
];
S["go-s6"] = [
 {type:"judge",q:"http.ListenAndServe 需要传入监听地址与处理器。",a:0,why:"第二个参数传 nil 时使用默认的 DefaultServeMux。"},
 {type:"judge",q:"Go 标准库的 net/http 无法单独启动 Web 服务，必须依赖第三方框架。",a:1,why:"net/http 本身就提供了完整的服务器实现，框架只是封装了路由等便利功能。"},
 {type:"fill",q:"给结构体字段附加元信息（如 JSON 字段名）使用的是反引号包裹的 ______。",ans:["tag","标签"],why:"写法如 Name string `json:\"name\"`，由反射读取。"},
 {type:"fill",q:"启动 HTTP 服务的标准库函数是 http.______(addr, handler)。",ans:["listenandserve"],why:"它监听并阻塞，出错时返回 error。"}
];
S["go-s7"] = [
 {type:"judge",q:"Go 的测试文件必须以 _test.go 结尾。",a:0,why:"go test 只收集这种命名的文件，函数则以 Test 开头并接收 *testing.T。"},
 {type:"judge",q:"go vet 命令的作用是运行单元测试。",a:1,why:"go vet 做静态检查；运行测试用 go test，覆盖率用 go test -cover。"},
 {type:"fill",q:"运行当前包全部测试所使用的命令是 go ______。",ans:["test"],why:"加 -v 可看到每个用例的详细输出。"},
 {type:"fill",q:"Go 中用于强制包私有、只允许同模块内部导入的特殊目录名是 ______。",ans:["internal"],why:"放在 internal/ 下的包无法被模块外的代码导入。"}
];
/* ============ 分班（摸底）测试题型扩容：每门语言每个难度档 +1 判断 +1 填空 ============ */
P["py"] = [
 {type:"judge",d:1,st:1,q:"Python 代码里的缩进只是为了让代码好看，写不写都不影响运行。",a:1,why:"缩进是 Python 语法的一部分，同一代码块缩进不一致会直接报错。"},
 {type:"fill",d:1,st:1,q:"把内容输出到终端所使用的内置函数是 ______()。",ans:["print"],why:"print 是 Python 最基础的输出函数。"},
 {type:"judge",d:2,st:3,q:"Python 中用引号包裹起来的内容都是字符串类型。",a:0,why:"单引号、双引号、三引号包裹的内容统一都是 str 类型。"},
 {type:"fill",d:2,st:3,q:"获取列表 a 中元素个数的内置函数是 ______(a)。",ans:["len"],why:"len 对字符串、列表、字典、集合等都能返回长度。"},
 {type:"judge",d:3,st:5,q:"for i in range(5) 会让循环体一共执行 5 次。",a:0,why:"range(5) 生成 0 到 4，共 5 个值，循环体执行 5 次。"},
 {type:"fill",d:3,st:5,q:"求列表 a 中最小值的内置函数是 ______(a)（求最大值用 max）。",ans:["min"],why:"min 与 max 都接受可迭代对象，也能配合 key 参数自定义比较规则。"},
 {type:"judge",d:4,st:7,q:"参数传入函数后，在函数内部对参数的修改一定能让调用方看到。",a:1,why:"要看改的是对象内容还是重新绑定名字：重新绑定只影响函数内部的局部名字。"},
 {type:"fill",d:4,st:7,q:"把任意可迭代对象转换成列表所使用的内置函数是 ______()。",ans:["list"],why:"list(range(3)) 得到 [0, 1, 2]。"},
 {type:"judge",d:5,st:9,q:"生成器表达式写作 (x for x in data)，它是惰性求值、逐个产出的。",a:0,why:"用圆括号包起来的推导式即为生成器表达式，不会一次生成整个列表。"},
 {type:"fill",d:5,st:9,q:"以二进制模式打开文件时，mode 参数写作 '______'。",ans:["rb"],why:"rb 表示只读二进制，处理图片等非文本内容时必须用它。"}
];
P["c"] = [
 {type:"judge",d:1,st:1,q:"printf 输出的内容必须以换行结尾，否则程序会出错。",a:1,why:"输出格式完全自由，不换行只是下一行输出会紧接着显示而已。"},
 {type:"fill",d:1,st:1,q:"C 语言中把内容输出到终端所使用的函数是 ______()。",ans:["printf"],why:"printf 是标准输入输出库中的格式化输出函数。"},
 {type:"judge",d:2,st:3,q:"在 C 语言中，char 类型通常占 1 个字节。",a:0,why:"标准规定 sizeof(char) 恒为 1，它也是 C 中的最小可寻址单位。"},
 {type:"fill",d:2,st:3,q:"求两个整数相除余数的运算符是 %，这个运算读作取______运算。",ans:["模","余","余数"],why:"% 只能用于整数，常用于判断整除与奇偶。"},
 {type:"judge",d:3,st:5,q:"在 if 的条件表达式中，0 表示假，非 0 表示真。",a:0,why:"C 没有专门的布尔类型（C99 的 _Bool 也是按 0/1 实现的），条件判断基于零值。"},
 {type:"fill",d:3,st:5,q:"从键盘读入一个整数并写入变量所使用的函数是 ______()。",ans:["scanf"],why:"scanf(\"%d\", &x) 注意必须传变量地址。"},
 {type:"judge",d:4,st:7,q:"函数内部定义的局部数组，在函数返回之后仍然可以继续访问。",a:1,why:"局部数组在栈上，函数返回即销毁，访问它就是访问悬垂内存。"},
 {type:"fill",d:4,st:7,q:"把字符串转换成整数的标准库函数是 ______()。",ans:["atoi","strtol"],why:"atoi 最简单但不报错；strtol 能通过 endptr 与 errno 检测失败。"},
 {type:"judge",d:5,st:9,q:"在 C 语言中，void* 可以隐式转换成任意对象指针类型，不需要强制转换。",a:0,why:"这正是 C 的特点；C++ 要求显式转换，两者在这方面有区别。"},
 {type:"fill",d:5,st:9,q:"在堆上把已分配内存调整为更大或更小，所使用的标准函数是 ______()。",ans:["realloc"],why:"realloc 可能搬移内存，返回值必须重新接收，否则会丢指针。"}
];
P["cpp"] = [
 {type:"judge",d:1,st:1,q:"C++ 程序总是从 main 函数开始执行。",a:0,why:"main 是标准规定的入口，返回 0 表示正常结束。"},
 {type:"fill",d:1,st:1,q:"C++ 中向标准输出写数据的流对象是 std::______。",ans:["cout"],why:"cout 配合 << 运算符输出，std::endl 用于换行并刷新缓冲。"},
 {type:"judge",d:2,st:3,q:"std::string 的 size() 返回字符个数，不包含结尾的空字符。",a:0,why:"std::string 自己管理长度，不做 C 风格的末尾空字符计数。"},
 {type:"fill",d:2,st:3,q:"C++ 中「资源获取即初始化」这一设计思想的缩写是 ______。",ans:["raii"],why:"RAII 把资源交给对象生命周期管理，离开作用域自动释放。"},
 {type:"judge",d:3,st:5,q:"std::vector 的 at() 会做边界检查并在越界时抛异常，而 [] 不做检查。",a:0,why:"要安全访问用 at()，追求极致性能且确定不越界时才用 []。"},
 {type:"fill",d:3,st:5,q:"向 vector 尾部追加元素的成员函数是 ______。",ans:["push_back"],why:"push_back 会在必要时扩容；emplace_back 可以直接原地构造。"},
 {type:"judge",d:4,st:7,q:"一个 C++ 类可以定义多个构造函数，只要参数列表不同。",a:0,why:"这就是构造函数重载，用于支持不同的初始化方式。"},
 {type:"fill",d:4,st:7,q:"为了让基类指针在运行期调用到派生类的实现，成员函数要声明为 ______ 函数。",ans:["虚","virtual"],why:"虚函数启用动态绑定，是 C++ 运行时多态的基础。"},
 {type:"judge",d:5,st:9,q:"std::shared_ptr 只有在引用计数归零时才会真正释放所管理的对象。",a:0,why:"每多一次拷贝计数加一，最后一个持有者销毁时才 delete。"},
 {type:"fill",d:5,st:9,q:"把左值转换成可被移动的右值引用，所使用的标准函数是 std::______。",ans:["move"],why:"std::move 本身不搬数据，只是把表达式转成右值以触发移动语义。"}
];
P["java"] = [
 {type:"judge",d:1,st:1,q:"Java 源文件中如果有 public 类，文件名必须与这个类名一致。",a:0,why:"这是编译器强制要求，否则报 public class 应定义在同名文件中。"},
 {type:"fill",d:1,st:1,q:"向控制台打印一行文本的方法是 System.out.______ln()。",ans:["print"],why:"println 输出后换行；print 不换行。"},
 {type:"judge",d:2,st:3,q:"Java 的 boolean 类型可以与 int 相互转换。",a:1,why:"boolean 是独立类型，不参与任何数值转换，也不能用 0/1 代替。"},
 {type:"fill",d:2,st:3,q:"Java 中声明常量所使用的关键字组合是 static ______。",ans:["final"],why:"final 表示不可再赋值，配合 static 成为类级常量。"},
 {type:"judge",d:3,st:5,q:"Java 的 switch 可以用于 byte、short、int、char、String 和枚举类型。",a:0,why:"long、float、double、boolean 不能作为 switch 的条件。"},
 {type:"fill",d:3,st:5,q:"Java 中表示「跳过本轮、进入下一次循环」的关键字是 ______。",ans:["continue"],why:"continue 结束当前轮；break 结束整个循环。"},
 {type:"judge",d:4,st:7,q:"Java 的 String 是不可变类，任何修改操作都会返回新对象。",a:0,why:"正因不可变，它才线程安全、可安全共享与缓存哈希值。"},
 {type:"fill",d:4,st:7,q:"把字符串按分隔符切分成字符串数组的方法是 ______(\",\")。",ans:["split"],why:"split 接受正则表达式，返回 String[]。"},
 {type:"judge",d:5,st:9,q:"Java 的泛型在运行期会被类型擦除，因此不能直接创建泛型数组。",a:0,why:"擦除后只知道原始类型，new T[] 非法；要数组得用 List 或反射。"},
 {type:"fill",d:5,st:9,q:"Java 8 引入的、支持链式惰性求值的集合操作 API 是 ______ API。",ans:["stream"],why:"stream() 之后可接 filter/map/sorted，最后用终止操作收集结果。"}
];
P["js"] = [
 {type:"judge",d:1,st:1,q:"在 JavaScript 中，null 与 undefined 是完全相同的东西。",a:1,why:"undefined 表示「未定义」，null 表示「刻意的空值」；typeof 结果也不同。"},
 {type:"fill",d:1,st:1,q:"向浏览器控制台输出内容所使用的函数是 console.______()。",ans:["log"],why:"console.log 是最常用的调试输出方式。"},
 {type:"judge",d:2,st:3,q:"在 JavaScript 中，typeof null 的结果是 \"object\"。",a:0,why:"这是历史遗留 bug，判断 null 要用 x === null。"},
 {type:"fill",d:2,st:3,q:"获取数组元素个数所使用的属性名是 ______。",ans:["length"],why:"arr.length 既表示长度，也可以赋值来截断数组。"},
 {type:"judge",d:3,st:5,q:"== 比较会做隐式类型转换，=== 不会。",a:0,why:"所以 '1' == 1 为真，而 '1' === 1 为假；日常应优先用 ===。"},
 {type:"fill",d:3,st:5,q:"把字符串转成浮点数的函数是 parseInt 的姊妹函数 parse______。",ans:["float"],why:"parseInt 取整、parseFloat 取浮点，都会从开头解析到非法字符为止。"},
 {type:"judge",d:4,st:7,q:"用 const 声明一个数组之后，就不能再用 push 往里面加元素了。",a:1,why:"const 只禁止重新赋值整个变量，数组内容依然可以修改。"},
 {type:"fill",d:4,st:7,q:"遍历对象自身可枚举属性所使用的循环写法是 for...______。",ans:["in"],why:"for...in 遍历键名；遍历数组值则应该用 for...of。"},
 {type:"judge",d:5,st:9,q:"JavaScript 是单线程的，但它能借助事件循环处理大量异步任务。",a:0,why:"异步 I/O 由宿主环境完成，回调通过任务队列回到主线程执行。"},
 {type:"fill",d:5,st:9,q:"构造 Promise 时，用 resolve 表示成功，用 ______ 表示失败。",ans:["reject"],why:"两者都是函数，调用后 Promise 状态即被固定。"}
];
P["cs"] = [
 {type:"judge",d:1,st:1,q:"C# 中顶层 class 的默认访问级别是 internal。",a:0,why:"不加修饰符的顶层类只能被同一程序集访问；类成员默认则是 private。"},
 {type:"fill",d:1,st:1,q:"向控制台输出一行文本使用 Console.______Line()。",ans:["write"],why:"WriteLine 输出并换行；Write 输出后不换行。"},
 {type:"judge",d:2,st:3,q:"C# 的 int 是值类型，未显式赋值时默认值为 0。",a:0,why:"值类型字段会被自动初始化为零值，局部变量则需要显式赋值才能使用。"},
 {type:"fill",d:2,st:3,q:"C# 中声明编译期常量的关键字是 ______。",ans:["const"],why:"const 必须在声明时初始化，且只能是编译期可确定的字面量。"},
 {type:"judge",d:3,st:5,q:"C# 的 List<T> 位于 System.Collections.Generic 命名空间下。",a:0,why:"泛型集合统一放在这个命名空间，需要 using 引入。"},
 {type:"fill",d:3,st:5,q:"C# 中让基类成员可以被派生类重写，需要在基类成员上标记 ______。",ans:["virtual","abstract"],why:"只有 virtual 或 abstract 成员才能在派生类被 override。"},
 {type:"judge",d:4,st:7,q:"C# 的属性（property）本质上是一对 get/set 访问器方法。",a:0,why:"编译器把属性展开为 get_XXX 与 set_XXX 两个方法，因此可以只写 get 实现只读。"},
 {type:"fill",d:4,st:7,q:"C# 中实现接口所使用的符号与继承相同，都是 ______。",ans:["冒号","colon"],why:"写法为 class Foo : IFoo, IBar。"},
 {type:"judge",d:5,st:9,q:"异步方法中如果完全没有 await，编译器会给出警告。",a:0,why:"这种写法会同步执行完整个方法，失去了异步的意义，编译器会提醒。"},
 {type:"fill",d:5,st:9,q:"C# 中用于 LINQ 查询的命名空间是 System.______。",ans:["linq"],why:"引入后才有 Where/Select/OrderBy 等扩展方法可用。"}
];
P["go"] = [
 {type:"judge",d:1,st:1,q:"Go 的源文件必须放在 GOPATH 或模块目录下才能编译运行。",a:1,why:"go run 可以直接运行单个文件；当然参与模块构建时才需要模块环境。"},
 {type:"fill",d:1,st:1,q:"Go 中输出内容到终端使用的是 fmt 包的 ______ln 函数。",ans:["print"],why:"fmt.Println 自动在参数之间加空格并换行。"},
 {type:"judge",d:2,st:3,q:"Go 的 for 循环可以省略初始化、条件和递增三个部分中的任意部分。",a:0,why:"省略条件就是无限循环，for {} 也是合法的。"},
 {type:"fill",d:2,st:3,q:"Go 中定义函数所使用的关键字是 ______。",ans:["func"],why:"写法为 func 名(参数) 返回值 { ... }。"},
 {type:"judge",d:3,st:5,q:"Go 的 slice 是引用类型，把它传给函数后共享同一份底层数组。",a:0,why:"所以函数内修改元素会影响调用方；但函数内 append 造成的扩容不会。"},
 {type:"fill",d:3,st:5,q:"获取 slice 或 map 元素个数的内置函数是 ______。",ans:["len"],why:"len 对数组、slice、map、string、channel 都适用；cap 则看容量。"},
 {type:"judge",d:4,st:7,q:"Go 的错误处理惯例是把 error 作为最后一个返回值。",a:0,why:"调用方立刻检查 if err != nil，错误路径与正常路径一目了然。"},
 {type:"fill",d:4,st:7,q:"Go 中快速创建一个简单错误的常用函数是 errors.______(\"出错了\")。",ans:["new"],why:"errors.New 返回一个只含消息的 error；需要包装则用 fmt.Errorf 带 %w。"},
 {type:"judge",d:5,st:9,q:"无缓冲 channel 的发送操作会一直阻塞，直到有接收方准备好。",a:0,why:"这种会合语义正是 goroutine 之间同步的常用手段。"},
 {type:"fill",d:5,st:9,q:"Go 中用于保护共享数据、等价于互斥锁的类型是 sync.______。",ans:["mutex","rwmutex"],why:"Mutex 提供 Lock/Unlock；RWMutex 还支持读锁并行。"}
];
/* ---------- 折进既有叠加层（不新增全局名，接入零改动） ---------- */
  Object.keys(S).forEach(function (k) {
    window.QUIZ_EXTRA = window.QUIZ_EXTRA || {};
    window.QUIZ_EXTRA[k] = (window.QUIZ_EXTRA[k] || []).concat(S[k]);
  });
  Object.keys(P).forEach(function (k) {
    window.PLACEMENT_EXTRA = window.PLACEMENT_EXTRA || {};
    window.PLACEMENT_EXTRA[k] = (window.PLACEMENT_EXTRA[k] || []).concat(P[k]);
  });
})();
