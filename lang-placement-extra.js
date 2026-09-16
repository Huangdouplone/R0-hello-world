/* ============================================================
 * lang-placement-extra.js —— 分班（摸底）测试题库扩容层
 *
 * 目的：把「分班测试题量 ≥ 35 题」定为固定标准后，
 *       35 题需按 5 个难度档分层抽取（每档 7 题），
 *       要求每门语言每个难度档 ≥ 10 题，才能保证分层均衡且每次抽题有变化。
 *       原题库各档题量不均（最弱档仅 5 题），故在此补齐。
 *
 * 合并方式（见 index.html 内联脚本）：
 *   PLACEMENT[dk].qs = PLACEMENT[dk].qs.concat(PLACEMENT_EXTRA[dk])
 *
 * 字段与主题库完全一致：
 *   q 题干 / o 四个选项 / a 正确下标 / why 解析
 *   st 关联阶段序号（用于薄弱阶段分析）
 *   d  难度档位 1..5（py/c/cpp/java 省略，由 diffOf(st) 推导；js/cs/go 显式给出）
 *
 * 难度档 ↔ 阶段序号（diffOf 规则 ceil(st/2)，封顶 5）：
 *   d1 → st∈{1,2}   d2 → st∈{3,4}   d3 → st∈{5,6}   d4 → st∈{7,8}   d5 → st∈{9,10}
 * ============================================================ */
window.PLACEMENT_EXTRA = {

/* ===== Python（+7：d1 +1 / d3 +2 / d4 +2 / d5 +2）===== */
py: [
 {q:"Python 属于哪一类语言？",o:["编译型：需先整体编译成机器码再运行","解释型：由解释器读取源码并逐行执行","汇编语言：直接对应 CPU 指令","标记语言：只描述文档结构"],a:1,why:"Python 由解释器直接执行源码，属于解释型语言。",st:1},
 {q:"print(1, 2, sep='-') 的输出是？",o:["1 2","1-2","1,2","报错"],a:1,why:"sep 指定多个参数之间的分隔符，默认为空格。",st:5},
 {q:"import random 之后，取 0~9 之间的随机整数应写？",o:["random.randint(0,9)","random.rand(9)","random.int(0,9)","random(9)"],a:0,why:"randint(a,b) 返回闭区间 [a,b] 内的随机整数。",st:6},
 {q:"读取一个很大的文本文件时，为了节省内存应？",o:["用 readlines() 一次全部读入","用 for line in f: 逐行迭代","改用 'rb' 模式","把内容转成 list"],a:1,why:"文件对象本身可迭代，逐行读取不会一次把整个文件载入内存。",st:7},
 {q:"想让一个类支持 with 语句，需要实现哪一对方法？",o:["__init__ 与 __del__","__enter__ 与 __exit__","__iter__ 与 __next__","__str__ 与 __repr__"],a:1,why:"with 依赖 __enter__ 进入、__exit__ 退出并负责清理资源。",st:8},
 {q:"函数体中出现 yield，那么调用这个函数会得到？",o:["一次算完的结果列表","一个生成器对象","None","一个普通函数对象"],a:1,why:"含 yield 的函数是生成器函数，调用后返回生成器对象，按需惰性产出。",st:9},
 {q:"用 pytest 为一组输入喂多组测试数据，应使用哪个装饰器？",o:["@pytest.mark.parametrize","@pytest.fixture","@pytest.mark.skip","@pytest.raises"],a:0,why:"parametrize 把多组参数依次喂给同一个测试函数，避免重复代码。",st:10}
],

/* ===== C（+9：d1 +1 / d2 +2 / d3 +2 / d4 +2 / d5 +2）===== */
c: [
 {q:"C 源码编译后得到的中间目标文件，常见扩展名是？",o:[".o（Linux）或 .obj（Windows）",".py",".class",".jar"],a:0,why:"编译阶段产出目标文件，再由链接器把它们与库组合成可执行文件。",st:1},
 {q:"printf(\"%c\", 'A') 会输出？",o:["字符 A","数字 65","字符串 \"A\"","报错"],a:0,why:"%c 按字符输出；要输出 65 需用 %d。",st:3},
 {q:"int i = 3; while (i--) { /* 循环体 */ } 循环体执行几次？",o:["2 次","3 次","4 次","0 次"],a:1,why:"i 为 3、2、1 时条件为真各执行一次，共 3 次；i 变 0 时退出。",st:4},
 {q:"函数原型声明 int f(int); 的作用是？",o:["定义函数体","向编译器声明返回类型与参数类型，使调用可出现在定义之前","声明一个整型变量","引入一个头文件"],a:1,why:"原型让编译器在编译调用点时就知道该函数的签名。",st:5},
 {q:"char s[10]; strcpy(s, \"hello\"); 之后 strlen(s) 的值是？",o:["5","6","10","未定义"],a:0,why:"strlen 统计 '\\0' 之前的字符数，不包含结束符本身。",st:6},
 {q:"int a[5], *p = a; 表达式 p[2] 等价于？",o:["*(a+2)","a+2","&a[2]","*a+2"],a:0,why:"p[i] 等价于 *(p+i)，而 p 指向首元素，故 p[2] 即 *(a+2)。",st:7},
 {q:"realloc 扩容失败时会？",o:["自动复制并把原指针返回","返回 NULL，原内存块保持不变","直接结束程序","返回原指针但内容已丢失"],a:1,why:"失败时返回 NULL 且不释放原内存，务必先把返回值存到临时变量再判断，避免丢失旧指针。",st:8},
 {q:"sizeof(struct S) 常常大于各成员 sizeof 之和，原因是？",o:["结构体有额外头部","内存对齐会插入填充字节","编译器预留了扩展空间","成员被复制了一份"],a:1,why:"为满足各成员的对齐要求，编译器会在成员之间插入填充字节。",st:9},
 {q:"声明 int (*fp[3])(int); 表示的是？",o:["一个返回数组的函数","3 个元素的数组，每个元素都是「参数 int、返回 int」的函数指针","指向数组的指针","一个返回函数指针的函数"],a:1,why:"fp 先与 [3] 结合成为数组，元素类型是函数指针。",st:10}
],

/* ===== C++（+8：d1 +1 / d2 +3 / d3 +3 / d4 +1）===== */
cpp: [
 {q:"C++ 的 <iostream> 相比 C 的 <stdio.h>，输入输出依靠的是？",o:["流对象 std::cin / std::cout","printf / scanf","系统调用","CPU 寄存器"],a:0,why:"C++ 用流式 I/O 对象取代 printf/scanf，类型更安全、可扩展。",st:1},
 {q:"范围 for 中 for (auto &x : v) 与 for (auto x : v) 的区别是？",o:["前者是引用，可修改容器元素；后者是副本，修改无效","两者完全等价","后者一定更快","前者无法通过编译"],a:0,why:"auto& 绑定元素的引用，auto 则拷贝一份副本。",st:3},
 {q:"结构化绑定 auto [a, b] = pair; 是哪一版标准引入的？",o:["C++11","C++14","C++17","C++20"],a:2,why:"结构化绑定是 C++17 的特性，可一次性拆解 pair/tuple/结构体。",st:3},
 {q:"lambda 按值捕获外部变量后还想在函数体内修改它，需要加什么？",o:["const","mutable","static","volatile"],a:1,why:"按值捕获的变量在 lambda 内默认是 const，加 mutable 才允许修改。",st:4},
 {q:"为什么 const 成员必须放在构造函数的初始化列表里？",o:["因为 const 成员只能在初始化时赋值，不能随后再赋值","因为初始化列表更快","因为语法规定必须写","其实可以放在函数体内赋值"],a:0,why:"const 与引用成员没有「先默认构造再赋值」的机会，只能在初始化列表中初始化。",st:5},
 {q:"在派生类中写 void f() override; 要求基类的 f 是？",o:["static 函数","virtual 函数","inline 函数","const 函数"],a:1,why:"override 只能用于重写基类的虚函数，编译器会校验签名是否真的匹配。",st:6},
 {q:"运行时多态的调用开销主要来自？",o:["额外的内存分配","通过虚函数表（vtable）间接跳转，通常无法内联","异常处理机制","模板实例化"],a:1,why:"虚调用需经 vtable 间接寻址，编译器无法在编译期确定目标函数。",st:6},
 {q:"std::vector<int> v(5); 之后 v.size() 的值是？",o:["0","5","未定义","5 * sizeof(int)"],a:1,why:"该构造创建含 5 个默认值（0）元素的 vector，size 为 5。",st:8}
],

/* ===== Java（+7：d1 +2 / d2 +5）===== */
java: [
 {q:"运行已编译好的 Java 类 App（含 main）应使用？",o:["java App","javac App","run App","App.class"],a:0,why:"java 命令启动 JVM 并加载指定类；javac 用于把源码编译为字节码。",st:1},
 {q:"Java 中基本类型 char 的大小是？",o:["8 位","16 位","32 位","由平台决定"],a:1,why:"Java 的 char 固定为 16 位无符号，表示一个 UTF-16 代码单元。",st:2},
 {q:"double d = 1 / 2; 之后 d 的值是？",o:["0.5","0.0","1.0","编译错误"],a:1,why:"两个 int 相除先得到 0，再赋给 double；要得到 0.5 应写 1.0 / 2。",st:3},
 {q:"for (int i = 0; i < 5; i++) 的循环体执行几次？",o:["4","5","6","无限次"],a:1,why:"i 取 0、1、2、3、4，共 5 次。",st:3},
 {q:"int[] a = new int[3]; 之后 a[0] 的值是？",o:["0","null","未定义","随机垃圾值"],a:0,why:"Java 会给数组元素填默认值，int 的默认值是 0。",st:4},
 {q:"String s = \"a\" + 1 + 2; 之后 s 是？",o:["\"a12\"","\"a3\"","\"3a\"","编译错误"],a:0,why:"+ 从左到右结合，遇到字符串后变成拼接，结果为 \"a12\"。",st:4},
 {q:"StringBuilder sb = new StringBuilder(); sb.append(\"a\").append(\"b\"); 结果是？",o:["\"ab\"","\"a,b\"","\"ba\"","编译错误"],a:0,why:"append 返回 StringBuilder 自身，因此可以链式调用，最终内容为 \"ab\"。",st:4}
],

/* ===== JavaScript（+11：d1 +2 / d2 +5 / d3 +2 / d5 +2）===== */
js: [
 {q:"在浏览器里即时查看一段 JS 的运行结果，最常用的是？",o:["开发者工具的 Console","记事本","任务管理器","文件资源管理器"],a:0,why:"按 F12 打开 DevTools 的 Console，可直接执行代码并查看输出。",st:1,d:1},
 {q:"typeof 42 的结果是？",o:["\"int\"","\"number\"","\"int32\"","\"double\""],a:1,why:"JS 只有 number 一种数值类型，整数与小数同属 number。",st:1,d:1},
 {q:"let x = 5; x += 3; 之后 x 的值是？",o:["8","53","3","报错"],a:0,why:"+= 是复合赋值，等价于 x = x + 3。",st:2,d:2},
 {q:"for...of 与 for...in 的区别是？",o:["for...of 遍历可迭代对象的值，for...in 遍历对象的键（含数组索引）","两者完全等价","for...in 只能用于数组","for...of 只能用于对象"],a:0,why:"for...of 取元素值，for...in 取属性名或索引字符串。",st:2,d:2},
 {q:"箭头函数相比普通函数的一个关键区别是？",o:["箭头函数没有自己的 this，沿用外层作用域","箭头函数不能被调用","普通函数没有 arguments","两者完全等价"],a:0,why:"箭头函数不绑定自己的 this，因此常用于回调以避免 this 丢失。",st:2,d:2},
 {q:"const arr = [1,2,3]; const r = arr.map(x => x * 2); r 是？",o:["[2,4,6]","[1,2,3]","6","undefined"],a:0,why:"map 返回一个由回调结果组成的新数组，不修改原数组。",st:3,d:2},
 {q:"const {a, b} = {a: 1, b: 2, c: 3}; 之后 a 的值是？",o:["1","2","undefined","报错"],a:0,why:"对象解构按属性名取值，a 对应 1。",st:3,d:2},
 {q:"element.textContent 与 element.innerHTML 的区别是？",o:["textContent 按纯文本处理，innerHTML 会把字符串当 HTML 解析","两者完全等价","textContent 会解析 HTML 标签","innerHTML 只能设置纯文本"],a:0,why:"textContent 不解析标签，可避免 XSS；innerHTML 会解析并生成 DOM 节点。",st:4,d:3},
 {q:"await fetch('/api') 得到的是？",o:["已经解析好的 JSON 对象","Response 对象，需要再调用 .json() 解析","字符串","Promise 的拒绝原因"],a:1,why:"await fetch 只完成网络请求，响应体要再用 .json() / .text() 读取。",st:5,d:3},
 {q:"Promise.all([p1, p2]) 的行为是？",o:["任一完成就返回其值","全部成功才 resolve；其中任一失败则整体 reject","只返回第一个结果","按顺序串行执行"],a:1,why:"Promise.all 等待全部成功，任一失败即整体拒绝，适合并行且缺一不可的场景。",st:6,d:5},
 {q:"动态 import('./mod.js') 相比文件顶部的静态 import 的特点是？",o:["返回 Promise，可在运行时按需加载模块","必须写在文件顶部","不能加载 JSON","同步阻塞主线程"],a:0,why:"动态 import 返回 Promise，常用于代码分割与按需加载。",st:8,d:5}
],

/* ===== C#（+10：d1 +4 / d2 +3 / d3 +3）===== */
cs: [
 {q:"C# 控制台应用的入口一般是？",o:["static void Main(string[] args) 或顶层语句","static void Start()","Program.Run()","App()"],a:0,why:"运行时从 Main 或顶层语句开始执行。",st:1,d:1},
 {q:"Console.WriteLine 与 Console.ReadLine 的分工是？",o:["前者输出一行，后者读取一行输入","前者读入，后者输出","两者都用于输出","两者都用于读取"],a:0,why:"WriteLine 输出并换行，ReadLine 从标准输入读取一行。",st:1,d:1},
 {q:"string s = $\"{1 + 1}\"; 之后 s 是？",o:["\"{1 + 1}\"","\"2\"","\"11\"","编译错误"],a:1,why:"$ 前缀启用字符串插值，{} 内的表达式会被求值后嵌入。",st:1,d:1},
 {q:"C# 中 int 属于？",o:["引用类型","值类型","接口","委托"],a:1,why:"int 是值类型（System.Int32 的别名），赋值时复制值本身。",st:1,d:1},
 {q:"for (int i = 0; i < 3; i++) Console.Write(i); 输出是？",o:["012","123","0123","111"],a:0,why:"i 取 0、1、2，共输出三次，拼成 \"012\"。",st:2,d:2},
 {q:"static int Add(int a, int b) => a + b; 中的 => 表示？",o:["Lambda 表达式","表达式主体成员定义","命名空间分隔","泛型约束"],a:1,why:"表达式主体成员用 => 直接给出返回值，省去花括号与 return。",st:2,d:2},
 {q:"List<string> names = new(); names.Add(\"a\"); 之后 names.Count 是？",o:["0","1","2","运行时报错"],a:1,why:"Add 追加一个元素，Count 随之变为 1。",st:3,d:2},
 {q:"子类构造函数中 base(...) 的用途是？",o:["调用父类的构造函数","调用父类的静态方法","声明一个字段","实现一个接口"],a:0,why:"base(...) 显式调用父类构造，常用于把参数向上传递。",st:4,d:3},
 {q:"接口中声明的成员（传统写法）默认是？",o:["public 的抽象成员，实现类必须提供实现","private 方法","static 字段","protected 属性"],a:0,why:"接口成员默认公开且抽象，由实现类给出具体实现。",st:4,d:3},
 {q:"await Task.Delay(1000) 与 Thread.Sleep(1000) 的关键区别是？",o:["前者不阻塞线程，后者会阻塞当前线程","两者完全等价","后者只能用于异步方法","前者会额外创建并阻塞一条线程"],a:0,why:"await Task.Delay 把控制权交还调用方，不占用线程；Thread.Sleep 会占住线程。",st:5,d:3}
],

/* ===== Go（+14：d1 +2 / d2 +5 / d3 +4 / d4 +3）===== */
go: [
 {q:"要编译出可执行程序，Go 源文件的包名必须是？",o:["main","app","prog","run"],a:0,why:"只有 package main 且包含 func main() 的包会被编译为可执行程序。",st:1,d:1},
 {q:"fmt.Println(\"hi\") 的作用是？",o:["读取一行输入","输出各参数并在末尾换行","声明一个变量","导入 fmt 包"],a:1,why:"fmt.Println 打印参数并以换行结束。",st:1,d:1},
 {q:"x := 10 与 var x int = 10 的关系是？",o:["在函数内基本等价，:= 属于短变量声明并自动推断类型",":= 声明的是字符串","var 不能用于局部变量",":= 只能用于常量"],a:0,why:":= 只能在函数内使用，声明并推断类型。",st:2,d:2},
 {q:"Go 的 switch 中，case 执行完会默认贯穿（fall-through）吗？",o:["会，需要 break 阻止","不会，默认自动跳出","取决于表达式的类型","会，需要 continue 阻止"],a:1,why:"Go 的 case 编译期自动 break；需要贯穿时要显式写 fallthrough。",st:2,d:2},
 {q:"func f() (int, error) 表示？",o:["返回 int 与 error 两个值的函数","返回一个结构体","返回一个接口","语法错误"],a:0,why:"Go 支持多返回值，惯用法是把 error 放在最后一个返回值。",st:2,d:2},
 {q:"defer fmt.Println(\"done\") 会在什么时候执行？",o:["声明处立即执行","所在函数返回之前执行","程序启动时","永远不执行"],a:1,why:"defer 把调用推迟到外围函数返回前执行，常用于释放资源。",st:2,d:2},
 {q:"var s []int; 之后 len(s) 的值是？",o:["0","nil","panic","未定义"],a:0,why:"nil slice 的长度为 0，可以安全地 len/cap/range。",st:3,d:2},
 {q:"m := map[string]int{}; m[\"a\"]++; 之后 m[\"a\"] 的值是？",o:["0","1","panic（键不存在）","未定义"],a:1,why:"读取不存在的键返回该类型的零值（0），再自增即为 1；只有向未初始化的 map 写入才会 panic。",st:3,d:3},
 {q:"v, ok := x.(string) 中 ok 的含义是？",o:["类型断言是否成功","x 是否为空","x 是否为指针","x 与 string 是否相等"],a:0,why:"带 ok 的类型断言不会 panic，ok 表示断言是否成立。",st:4,d:3},
 {q:"向一个已关闭的 channel 发送数据会？",o:["正常发送并被缓存","触发 panic","自动重新打开 channel","被静默忽略"],a:1,why:"向已关闭的 channel 发送会 panic；从已关闭的 channel 接收则得到零值且不阻塞。",st:5,d:3},
 {q:"sync.Mutex 的正确用法是？",o:["先 Unlock 再 Lock","Lock 之后紧跟 defer mu.Unlock()，保证任何路径都能解锁","单 goroutine 场景也必须加锁","Lock 之后可以不解锁"],a:1,why:"Lock 后立即 defer Unlock 是惯用法，可避免中途 return/panic 时忘记解锁。",st:5,d:3},
 {q:"http.ListenAndServe(\":8080\", nil) 中第二个参数为 nil 时？",o:["服务器无法启动","使用 http.DefaultServeMux 作为默认多路复用器","立即 panic","只监听 localhost"],a:1,why:"handler 为 nil 表示使用默认的 DefaultServeMux。",st:6,d:4},
 {q:"json.Marshal 与 json.Unmarshal 分别用于？",o:["把 Go 值编码为 JSON 字节、把 JSON 解码为 Go 值","解码、编码","都用于编码","都用于解码"],a:0,why:"Marshal 是编码（Go→JSON），Unmarshal 是解码（JSON→Go）。",st:6,d:4},
 {q:"go test -run TestAdd 的作用是？",o:["只运行名称匹配 TestAdd 的测试","生成覆盖率报告","只编译不运行","运行基准测试"],a:0,why:"-run 接受正则表达式，用于筛选要执行的测试函数。",st:7,d:4}
]

};
