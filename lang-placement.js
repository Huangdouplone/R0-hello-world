/* ============================================================
 * lang-placement.js —— 分班（摸底）测试题库
 * 每门语言一套独立题库（每门 ≥50 题，且每个难度档 ≥10 题），用于：
 *   1) 评估使用者当前水平
 *   2) 定位薄弱阶段（st 字段标记该题所属阶段）
 *   3) 据此推荐起始阶段与免修范围（unlock / start point）
 * 固定标准：每次至少抽取 35 题（5 档 × 7 题），见 index.html 的 PT_COUNT。
 *   为保证分层均衡与随机性，各语言每档需 ≥10 题；不足部分由
 *   lang-placement-extra.js 在启动时合并补齐。
 * 字段：
 *   q   题干 / o 四个选项 / a 正确下标 / why 解析
 *   st  关联阶段序号（用于薄弱阶段分析）
 *   d   难度档位 1..5（运行时按 d 升序出题，保证「难度逐渐加深」）
 * 内部量化指标（对用户隐藏）：难度加权正确率 weighted，
 * 由它 + 最薄弱阶段共同决定起始阶段；原始分不展示给用户。
 * 版权：bilibili 黄豆666 / huangdouplone
 * ============================================================ */
window.PLACEMENT = window.PLACEMENT || {};

/* ---------------- Python ---------------- */
window.PLACEMENT.py = { name: "Python", icon: "🐍", qs: [
{q:"Python 源文件的常见扩展名与执行方式，正确的是？",o:[".py，用 python xxx.py 执行"," .pt，用 pyrun 执行"," .python，直接双击即编译"," .p，需先链接成 exe"],a:0,why:"源码是 .py，由解释器逐行执行；.pyc 是字节码缓存，不是你写的文件。",st:1},
{q:"下面哪条是合法的 Python 注释？",o:["// 注释"," # 注释"," /* 注释 */"," -- 注释"],a:1,why:"Python 用 # 单行注释；多行通常用三引号字符串充当文档字符串。",st:1},
{q:"关于缩进，下列说法正确的是？",o:["缩进只为好看，可随意"," 缩进是语法的一部分，决定代码块归属"," 必须用 Tab"," 必须用 8 个空格"],a:1,why:"Python 用缩进表达块结构，同级别必须一致；PEP8 推荐 4 空格。",st:1},
{q:"在交互式环境里查看某个对象的帮助文档，应该用？",o:["help(obj)"," man(obj)"," doc(obj)"," info(obj)"],a:0,why:"help() 进入帮助系统；dir() 列出属性名。",st:1},
{q:"type(3/2) 的结果是？",o:["int，值为 1"," float，值为 1.5"," int，值为 2"," 报错"],a:1,why:"Python 3 的 / 永远返回 float；要整数商用 //。",st:2},
{q:"表达式 7 // 2 与 7 % 2 的结果分别是？",o:["3 和 1"," 3.5 和 1"," 4 和 1"," 3 和 0.5"],a:0,why:"// 是向下取整除法，% 是取模，满足 a == (a//b)*b + a%b。",st:2},
{q:"执行 a = [1,2]; b = a; b.append(3) 后，a 的值是？",o:["[1,2]"," [1,2,3]"," 报错"," [1,2,3,3]"],a:1,why:"赋值是绑定同一个对象（引用语义），list 可变，所以 a 也被改。",st:2},
{q:"bool('') 与 bool('0') 分别是？",o:["False 与 False"," False 与 True"," True 与 True"," 报错"],a:1,why:"空字符串为假；非空字符串一律为真，'0' 也是非空字符串。",st:2},
{q:"下列哪个循环会打印 0,1,2？",o:["for i in range(3): print(i)"," for i in range(1,3): print(i)"," for i in 3: print(i)"," for (i=0;i<3;i++): print(i)"],a:0,why:"range(3) 产生 0..2；range 是左闭右开的。",st:3},
{q:"while 循环中 continue 的作用是？",o:["结束整个循环"," 跳过本次迭代剩余语句，进入下一轮"," 暂停 1 秒"," 退出程序"],a:1,why:"break 终止整个循环，continue 只跳过本轮剩余部分。",st:3},
{q:"if x: 这种写法判定的是？",o:["x 是否为数字"," x 的布尔真假值"," x 是否为 None"," 语法错误"],a:1,why:"会调用 bool(x)；0/''/[]/{}/None 等为假。",st:3},
{q:"要实现「条件成立才循环」，最贴近的写法是？",o:["while cond: ..."," do ... while cond"," loop while cond"," repeat until cond"],a:0,why:"Python 没有 do-while，通常用 while True + break 模拟。",st:3},
{q:"下面哪种创建的是不可变序列？",o:["[1,2,3]"," (1,2,3)"," {1,2,3}"," {'a':1}"],a:1,why:"tuple 不可变；注意单元素元组要写 (1,)。",st:4},
{q:"d = {}; d.get('x', 0) 在键不存在时返回？",o:["None"," 0"," 报 KeyError"," False"],a:1,why:"get 的第二个参数是默认值，可避免 KeyError。",st:4},
{q:"列表推导式 [x*x for x in range(4) if x%2==0] 的结果是？",o:["[0,4]"," [0,1,4,9]"," [0,2,4]"," [4]"],a:0,why:"先过滤偶数 0,2，再平方得到 0 与 4。",st:4},
{q:"s = {1,2,2,3}; len(s) 等于？",o:["4"," 3"," 2"," 报错"],a:1,why:"set 自动去重且无序，结果是 {1,2,3}。",st:4},
{q:"函数参数默认值写成 def f(x, lst=[]): 的隐患是？",o:["语法错误"," 默认列表在函数定义时创建一次，会被多次调用共享"," 每次调用都新建列表"," 不能传参"],a:1,why:"可变默认值是经典陷阱，正确写法是 lst=None 再在函数内新建。",st:5},
{q:"def f(*args, **kw) 中 args 与 kw 的类型是？",o:["list 与 dict"," tuple 与 dict"," tuple 与 set"," list 与 list"],a:1,why:"*args 收集位置参数为 tuple，**kw 收集关键字参数为 dict。",st:5},
{q:"在函数内想修改外层（非全局）变量，应使用？",o:["global"," nonlocal"," extern"," static"],a:1,why:"global 指向模块全局，nonlocal 指向最近的外层函数作用域。",st:5},
{q:"闭包指的是？",o:["函数返回函数并记住外层变量"," 把代码编译成 .exe"," 类的私有方法"," 多线程同步"],a:0,why:"闭包让内层函数在外部调用时仍能访问定义时的自由变量。",st:5},
{q:"import 与 from m import * 的主要区别是？",o:["没有区别"," 后者把名字直接灌进当前命名空间，易冲突且难追踪来源"," 前者更快"," 后者不支持标准库"],a:1,why:"星号导入污染命名空间，PEP8 不推荐在生产代码使用。",st:6},
{q:"if __name__ == '__main__': 的作用是？",o:["定义主类"," 让该文件被直接运行时才执行，被导入时不执行"," 声明程序入口目录"," 设置编码"],a:1,why:"__name__ 在被导入时是模块名，直接运行时才是 '__main__'。",st:6},
{q:"创建隔离依赖环境的标准做法是？",o:["pip install 到全局"," python -m venv .venv 后激活再装"," 复制 site-packages"," 改 PYTHONHOME"],a:1,why:"虚拟环境避免不同项目的依赖版本互相打架。",st:6},
{q:"导出依赖清单的常用命令是？",o:["pip freeze > requirements.txt"," pip list --save"," python -m pip export"," pip pack"],a:0,why:"requirements.txt 让别人能 pip install -r 复现同样的环境。",st:6},
{q:"读取文本文件推荐写法是？",o:["open(f).read()"," with open(f, encoding='utf-8') as fp: fp.read()"," f = open(f); read(f)"," load(f)"],a:1,why:"with 保证异常时也会关闭文件；显式指定编码避免平台差异。",st:7},
{q:"打开模式 'w' 会怎样？",o:["追加到末尾"," 存在则清空后写入"," 只读"," 读写且不清空"],a:1,why:"'w' 会截断原文件；追加用 'a'，读写不截断用 'r+'。",st:7},
{q:"try/except/else/finally 中，finally 的执行时机是？",o:["仅成功时"," 无论是否异常都会执行"," 仅异常时"," 仅 else 之后"],a:1,why:"finally 用于释放资源，即便遇到 return 或异常也会先执行。",st:7},
{q:"捕获多个异常的正确写法是？",o:["except A and B:"," except (A, B):"," except A, B:"," except [A, B]:"],a:1,why:"用元组列出多个异常类型；顺序应从子类到父类。",st:7},
{q:"class A: 中 __init__ 的作用是？",o:["析构"," 构造后初始化实例属性"," 定义类属性"," 声明接口"],a:1,why:"对象由 __new__ 创建，随后 __init__ 负责初始化。",st:8},
{q:"类中的 self 代表什么？",o:["类本身"," 当前实例对象"," 父类"," 模块"],a:1,why:"self 只是约定的名字（可改但不建议），由解释器自动传入实例。",st:8},
{q:"想让实例能被 len() 调用，需要实现？",o:["__len__"," __size__"," __length__"," __count__"],a:0,why:"实现魔法（dunder）方法可让自定义类型接入内置函数与语法。",st:8},
{q:"class C: xs=[] 然后在实例上 c.xs.append(1)，会怎样？",o:["只影响 c"," 所有实例共享同一个列表"," 报错"," 自动转成实例属性"],a:1,why:"xs 是类属性，被所有实例共享；需要每实例独立就放 __init__。",st:8},
{q:"生成器与普通函数的关键区别是？",o:["用 yield，调用后返回迭代器，惰性产出"," 用 return 多次"," 不能传参"," 只能循环一次"],a:0,why:"yield 会挂起函数状态，下次 next 从暂停处继续，节省内存。",st:9},
{q:"能触发 for 循环的对象需满足？",o:["实现 __iter__ 返回迭代器"," 实现 __add__"," 继承 object"," 实现 __call__"],a:0,why:"迭代器还需 __next__；耗尽后抛 StopIteration。",st:9},
{q:"async def 定义的函数调用后得到什么？",o:["立即执行的结果"," 协程对象，需 await 或交给事件循环"," 线程"," None"],a:1,why:"协程不会自己跑，必须由事件循环调度（asyncio.run 等）。",st:9},
{q:"GIL 的含义与影响是？",o:["全局解释锁，同一时刻只有一个线程执行字节码"," 垃圾回收锁，只影响内存"," 图形接口层"," 全局导入锁"],a:0,why:"CPU 密集任务要用多进程或释放 GIL 的扩展库，IO 密集可用线程/协程。",st:9},
{q:"为函数添加类型注解后，运行时会？",o:["强制类型检查并报错"," 只记录元数据，不自动检查"," 提升运行速度"," 禁止传其他类型"],a:1,why:"注解存在 __annotations__，需要 mypy 之类工具做静态检查。",st:10},
{q:"装饰器的本质是？",o:["接收函数并返回函数的高阶函数"," 类的语法糖"," 编译指令"," 注释"],a:0,why:"@deco 等价于 f = deco(f)；用 functools.wraps 保留元信息。",st:10},
{q:"单元测试常用框架与断言写法是？",o:["unittest / pytest：self.assertEqual(a, b)"," assert.equal 内置"," testlib 模块"," 只能手写 if"],a:0,why:"pytest 可用裸 assert；unittest 提供丰富的 assert* 方法。",st:10},
{q:"__slots__ 的主要作用是？",o:["限制实例属性并节省内存"," 定义静态方法"," 加速导入"," 声明常量"],a:0,why:"去掉每实例的 __dict__，属性多、实例多时省内存，但失去动态加属性能力。",st:10},
{q:"列表 list 的 append 与 extend 区别是？",o:["append 加一个元素，extend 迭代并入多个"," 完全一样"," extend 只能加字符串"," append 更快但只能加数字"],a:0,why:"append([1,2]) 会形成嵌套列表；extend([1,2]) 会摊平一层。",st:4},
{q:"s = 'abc'; s[0] = 'A' 的结果是？",o:["s 变成 'Abc'"," 抛出 TypeError，字符串不可变"," 静默失败"," 变成字节串"],a:1,why:"str 不可变，任何「修改」都会创建新字符串。",st:2},
{q:"sorted([3,1,2], reverse=True) 返回？",o:["[1,2,3]"," [3,2,1]"," 原地排序原列表"," None"],a:1,why:"sorted 返回新列表；list.sort() 才是原地排序并返回 None。",st:4},
{q:"下面哪种方式能安全地「复制」一个嵌套列表？",o:["b = a[:]"," b = copy.deepcopy(a)"," b = list(a)"," b = a.copy()"],a:1,why:"前三种都是浅拷贝，内层仍共享；深拷贝才递归复制所有层级。",st:4}
]};

/* ---------------- C ---------------- */
window.PLACEMENT.c = { name: "C", icon: "🔧", qs: [
{q:"C 程序从源码到可执行文件，正确顺序是？",o:["预处理 → 编译 → 汇编 → 链接"," 编译 → 预处理 → 链接 → 汇编"," 链接 → 编译 → 汇编"," 汇编 → 预处理 → 编译"],a:0,why:"gcc -E/-S/-c 可分别停在预处理、编译、汇编阶段。",st:1},
{q:"#include <stdio.h> 与 #include \"my.h\" 的查找顺序区别是？",o:["前者先查系统目录，后者先查当前目录"," 完全一样"," 前者不查系统目录"," 后者不能用于标准库"],a:0,why:"尖括号走系统头文件路径，引号先查当前目录再回退系统路径。",st:1},
{q:"main 函数的标准写法是？",o:["int main(void)"," void main()"," main()"," int main[]"],a:0,why:"标准规定 main 返回 int；void main 不是标准写法。",st:1},
{q:"gcc 编译时打开警告的推荐选项是？",o:["-w"," -Wall -Wextra"," -O0"," -nowarn"],a:1,why:"警告往往就是潜在 bug，建议再配合 -Werror 在项目中强制清零。",st:1},
{q:"int 在常见 32/64 位平台上通常是？",o:["固定 32 位"," 至少 16 位，实际常为 32 位，由实现决定"," 固定 64 位"," 与指针等宽"],a:1,why:"C 只规定最小宽度；需要确定宽度用 <stdint.h> 的 int32_t 等。",st:2},
{q:"表达式 5 / 2 与 5 / 2.0 的结果分别是？",o:["2 与 2.5"," 2.5 与 2.5"," 2 与 2"," 2.5 与 2"],a:0,why:"整数除法截断小数；只要有一个操作数是浮点就转为浮点运算。",st:2},
{q:"signed char 的取值范围是（常见实现）？",o:["0..255"," -128..127"," -127..128"," 0..127"],a:1,why:"char 的符号性由实现定义，做数值运算时建议显式 signed/unsigned。",st:2},
{q:"unsigned int u = 0; u - 1 的结果是？",o:["-1"," 一个很大的正数（回绕）"," 0"," 未定义行为"],a:1,why:"无符号数回绕是定义良好的，常导致 for 循环下标判断出错。",st:2},
{q:"printf(\"%d\", 3.14) 属于？",o:["正常输出 3.14"," 未定义行为，格式串与实参类型必须匹配"," 输出 3"," 编译错误"],a:1,why:"可变参数不做类型检查，格式串写错是典型的 UB。",st:3},
{q:"scanf(\"%d\", &x) 中 & 的作用是？",o:["取地址，让 scanf 能写回变量"," 位与运算"," 取引用"," 声明指针"],a:0,why:"C 是值传递，必须把地址交给 scanf 才能修改调用者的变量。",st:3},
{q:"scanf(\"%d\", &n) 之后再 fgets 读一行，常见问题是？",o:["读不到内容，因为换行残留在缓冲区"," 缓冲区溢出"," 编码错误"," 没有问题"],a:0,why:"scanf 留下 '\\n'，fgets 立刻读到空行；可统一用 fgets + sscanf。",st:3},
{q:"puts(s) 与 printf(s) 的安全差别是？",o:["printf(s) 会把 s 当格式串解析，含 % 会出错"," 没有差别"," puts 不换行"," printf 不能输出字符串"],a:0,why:"永远写成 printf(\"%s\", s)，避免格式串漏洞。",st:3},
{q:"switch 语句中忘记 break 会？",o:["编译报错"," 贯穿执行下一个 case"," 自动跳出"," 死循环"],a:1,why:"贯穿有时是有意设计，务必写注释说明，否则视为 bug。",st:4},
{q:"for(;;) 表示？",o:["语法错误"," 无限循环"," 循环 0 次"," 循环 1 次"],a:1,why:"三个表达式都可省略，条件为空视为真。",st:4},
{q:"if (a = b) 这种写法？",o:["是比较，推荐"," 是赋值，条件取赋值结果，常见笔误"," 编译错误"," 等价于 a == b 且更快"],a:1,why:"把常量写左边（if (3 == a)）可让编译器帮你抓这个错。",st:4},
{q:"C 语言中 else 与哪个 if 配对？",o:["最近的未配对 if"," 最外层 if"," 由缩进决定"," 随机"],a:0,why:"悬空 else 由语法规则决定，与缩进无关，所以要写花括号。",st:4},
{q:"函数内定义的局部变量存储在？",o:["栈上，函数返回即失效"," 堆上，需手动释放"," 静态区，全程有效"," 寄存器，不能取地址"],a:0,why:"返回局部变量地址是典型悬垂指针错误。",st:5},
{q:"static 修饰函数内的局部变量会？",o:["延长生命周期到程序结束，但作用域不变"," 让变量可被其他文件访问"," 变成常量"," 存到堆上"],a:0,why:"static 局部变量只初始化一次，常用于计数或缓存。",st:5},
{q:"函数声明（原型）的作用是？",o:["让编译器在调用点知道参数与返回类型"," 定义函数体"," 分配内存"," 声明变量"],a:0,why:"缺少原型时 C99 起会报错，旧规则下会产生隐式声明的隐患。",st:5},
{q:"C 语言参数传递方式是？",o:["一律值传递"," 一律引用传递"," 数组按引用、其余按值"," 由编译器决定"],a:0,why:"传指针也是「把地址这个值」拷一份，本质仍是值传递。",st:5},
{q:"int a[5]; 数组名 a 在多数表达式中会？",o:["退化为指向首元素的指针"," 保持数组类型"," 变成 int"," 报错"],a:0,why:"例外：sizeof(a)、&a、字符串字面量初始化时不退化。",st:6},
{q:"char s[] = \"hi\"; 与 char *s = \"hi\"; 的区别是？",o:["前者是可修改的数组副本，后者指向只读字面量"," 完全等价"," 后者可修改"," 前者在堆上"],a:0,why:"修改字符串字面量是未定义行为，应写成 const char *。",st:6},
{q:"strlen(\"abc\") 与 sizeof(\"abc\") 分别是？",o:["3 与 4"," 4 与 3"," 3 与 3"," 4 与 4"],a:0,why:"sizeof 计入结尾的 '\\0'，strlen 不计。",st:6},
{q:"越界访问数组 a[10]（数组长度 5）会？",o:["自动扩容"," 未定义行为，可能崩溃或静默出错"," 返回 0"," 编译报错"],a:1,why:"C 不做边界检查，这是安全漏洞的主要来源之一。",st:6},
{q:"int *p; *p = 5; 的问题是？",o:["p 未初始化，是野指针"," 语法错误"," 会自动分配内存"," 等价于 int 5"],a:0,why:"指针必须先指向有效对象（取已有变量地址或 malloc）再解引用。",st:7},
{q:"int a=1; int *p=&a; 执行 (*p)++ 后 a 是？",o:["1"," 2"," 未定义"," 地址加一"],a:1,why:"(*p)++ 修改指向的对象；p++ 才是指针自增，注意运算符优先级。",st:7},
{q:"指针 p 指向 int，p+1 实际地址增加？",o:["1 字节"," sizeof(int) 字节"," 4 字节固定"," 由对齐决定，随机"],a:1,why:"指针算术以「指向类型的大小」为单位。",st:7},
{q:"int *p = malloc(n * sizeof *p); 这样写的好处是？",o:["用 sizeof *p 避免写错类型"," 更快"," 自动初始化"," 不需要 free"],a:0,why:"sizeof *p 与 p 的类型绑定，改类型时不会漏改。",st:8},
{q:"malloc 之后必须？",o:["检查返回是否为 NULL，并在用完后 free 一次"," 直接强转即可"," 不用释放，程序结束会回收"," 用 delete 释放"],a:0,why:"C 用 free；delete 是 C++ 的。释放后置空可避免重复释放与野指针。",st:8},
{q:"free(p) 之后再使用 p 属于？",o:["使用已释放内存（悬垂指针），未定义行为"," 安全，内存还在"," 自动重新分配"," 只是变慢"],a:0,why:"free 后应立即 p = NULL，并把释放责任写进接口文档。",st:8},
{q:"内存泄漏指的是？",o:["分配的内存失去引用且未释放"," 内存被越界写"," 栈溢出"," 指针为空"],a:0,why:"长跑程序里泄漏会累积；可用 valgrind / ASan 检测。",st:8},
{q:"struct S { int a; }; 访问成员用？",o:["s.a（对象）与 p->a（指针）"," s->a 与 p.a"," s:a"," s#a"],a:0,why:"-> 等价于 (*p).a，是语法糖。",st:9},
{q:"union 与 struct 的区别是？",o:["union 所有成员共享同一块内存"," union 更快"," struct 不能嵌套"," 没有区别"],a:0,why:"union 大小等于最大成员，同一时刻只有一个成员有效。",st:9},
{q:"#define SQR(x) x*x 调用 SQR(1+2) 得到？",o:["9"," 5"," 6"," 编译错误"],a:1,why:"宏只做文本替换：1+2*1+2 = 5；应写成 ((x)*(x)) 或改用函数。",st:9},
{q:"头文件里防止重复包含的标准做法是？",o:["#pragma once 或 include guard 宏"," 每处手写 #undef"," 不需要处理"," 用 #ifndef 包住整个源文件"],a:0,why:"两种都可行，include guard 兼容性最好。",st:9},
{q:"fopen(\"a.txt\", \"r\") 失败时返回？",o:["NULL"," 0 长度文件"," 负数"," 抛出信号"],a:0,why:"任何 fopen 后都应判空，否则后续读写是空指针解引用。",st:10},
{q:"文本模式 \"r\" 与二进制模式 \"rb\" 的差别在？",o:["Windows 下文本模式会做 \\n 与 \\r\\n 转换"," 二进制模式更快"," 文本模式不能读"," 没有差别"],a:0,why:"跨平台读写二进制数据必须用 \"rb\"/\"wb\"。",st:10},
{q:"strcpy 的主要风险是？",o:["不检查目标缓冲区大小导致溢出"," 太慢"," 不能拷贝中文"," 需要手动加 \\0"],a:0,why:"改用 snprintf / strncpy（注意不保证结尾）或平台安全函数。",st:10},
{q:"典型的「未定义行为」不包括？",o:["有符号整数溢出"," 数组越界"," 使用未初始化变量"," 两个 int 相加赋值给 long"],a:3,why:"前三项都是 UB，程序可能「看似正常」地给出错误结果。",st:10},
{q:"const int *p 表示？",o:["指向常量的指针，不能通过 p 改值"," 指针本身不可改"," 指针和值都不可改"," 语法错误"],a:0,why:"int * const p 才是指针本身不可改；const int * const p 两者都不可改。",st:7},
{q:"size_t 通常用于？",o:["表示对象大小与数组下标，无符号类型"," 表示负数下标"," 存指针"," 存字符"],a:0,why:"与 int 混用比较会触发符号转换规则，是现代 C 的常见坑。",st:2}
]};
/* ---------------- C++ ---------------- */
window.PLACEMENT.cpp = { name: "C++", icon: "⚙️", qs: [
{q:"C++ 源文件常见扩展名与标准编译命令是？",o:[".cpp，用 g++ -std=c++17 main.cpp -o main",".c，用 gcc",".cs，用 csc",".cx，用 cxxrun"],a:0,why:".cpp/.cc/.cxx 都常见；务必显式指定 -std 版本以启用对应标准特性。",st:1},
{q:"auto 关键字在 C++11 之后的含义是？",o:["自动存储期变量"," 让编译器根据初始化表达式推导类型"," 声明全局变量"," 自动释放内存"],a:1,why:"C++11 起 auto 是类型占位符，不再是 C 里的存储类说明符。",st:1},
{q:"范围 for 循环 for (auto& x : v) 的好处是？",o:["避免手写下标与越界，且 & 可原地修改元素"," 必定更快"," 只能用于 map"," 会复制一份容器"],a:0,why:"只读时用 const auto&，需修改用 auto&，需拷贝才用 auto。",st:1},
{q:"std::cout << x << '\\n'; 与 std::endl 的区别是？",o:["'\\n' 只换行，endl 还会强制刷新缓冲区"," 完全一样"," endl 更快"," '\\n' 不换行"],a:0,why:"频繁 endl 会拖慢 IO，通常只在需要立即刷新时用。",st:1},
{q:"引用与指针的关键区别是？",o:["引用必须初始化且不能改绑，指针可以为 null 并重新指向"," 引用可以为空"," 指针更安全"," 两者完全相同"],a:0,why:"引用是对象的别名；没有「空引用」这种合法状态。",st:2},
{q:"const int& r = 5; 能成立的原因是？",o:["常量引用可绑定到临时量并延长其生命周期"," 5 是左值"," 编译器报错"," 引用可以为空"],a:0,why:"非常量左值引用不能绑定字面量，常量引用可以。",st:2},
{q:"constexpr 与 const 的核心差别是？",o:["constexpr 要求编译期可求值"," const 只能用于指针"," 二者等价"," constexpr 不能用于函数"],a:0,why:"const 只表示「不可改」，不一定在编译期可知。",st:2},
{q:"int x = 3.9; 的结果是？",o:["3（截断）"," 4（四舍五入）"," 3.9"," 编译错误"],a:0,why:"浮点转整型直接截断小数部分；可用 std::round 显式取整。",st:2},
{q:"结构化绑定 auto [k, v] = pair 需要的最低标准是？",o:["C++11"," C++14"," C++17"," C++20"],a:2,why:"C++17 引入结构化绑定，配合 if-init 写法可收窄作用域。",st:3},
{q:"if (init; cond) 这种带初始化器的 if 来自？",o:["C++17"," C++98"," C++11"," C++03"],a:0,why:"把辅助变量的作用域限制在 if 内，避免污染外层。",st:3},
{q:"switch 支持的条件类型是？",o:["整型或枚举等可转换类型"," 任意类型"," 只能 int"," 字符串"],a:0,why:"std::string 不能用于 switch，需用 if/else 或查表。",st:3},
{q:"异常安全最常依靠的机制是？",o:["RAII：用对象生命周期管理资源"," 手动 close"," 全局变量"," 宏"],a:0,why:"构造获取、析构释放，异常栈展开时自动回收。",st:10},
{q:"class 与 struct 的默认访问区别是？",o:["class 默认 private，struct 默认 public"," struct 不能有成员函数"," class 不能继承"," 没有区别"],a:0,why:"除默认访问权限与默认继承方式外，二者能力相同。",st:5},
{q:"构造函数初始化列表的必要性体现在？",o:["成员是 const、引用或无默认构造时必须用"," 只是风格问题"," 会让代码变慢"," 只能在模板里用"],a:0,why:"进入函数体前成员已初始化，列表可避免先默认构造再赋值。",st:5},
{q:"拷贝构造与拷贝赋值的区别是？",o:["前者用已有对象创建新对象，后者给已存在对象赋值"," 完全一样"," 前者返回值"," 后者不能重载"],a:0,why:"Rule of Three/Five 要求二者与析构函数一起正确实现。",st:5},
{q:"Rule of Five 指的是？",o:["析构、拷贝构造、拷贝赋值、移动构造、移动赋值"," 五个继承方式"," 五种循环"," 五个命名空间"],a:0,why:"自定义析构或拷贝语义时，通常要把五个都显式定义或 =default。",st:9},
{q:"虚函数实现多态依赖的是？",o:["vtable 与运行期动态绑定"," 编译期模板"," 宏替换"," 函数重载"],a:0,why:"基类析构函数若可能被多态删除，必须声明为 virtual。",st:6},
{q:"纯虚函数与抽象类的关系是？",o:["含纯虚函数的类不能实例化"," 纯虚函数可有默认实现但不能被继承"," 抽象类可以实例化"," 纯虚函数就是空函数"],a:0,why:"= 0 表示接口由派生类实现，是定义接口的常用手段。",st:6},
{q:"override 关键字的作用是？",o:["让编译器检查是否真的重写了虚函数"," 提高性能"," 允许重载"," 隐藏基类函数"],a:0,why:"写错签名时 override 会直接报错，避免「假重写」。",st:6},
{q:"函数重载与重写的区别是？",o:["重载是编译期同名不同参，重写是运行期覆盖虚函数"," 二者相同"," 重写必须同参数不同名"," 重载只能用于构造函数"],a:0,why:"名字隐藏规则常让派生类重载意外屏蔽基类同名函数。",st:6},
{q:"函数模板的写法是？",o:["template <typename T> T max(T a, T b)"," template T max(T a)"," generic <T> T max(T a)"," T max<T>(T a)"],a:0,why:"模板在实例化时生成具体代码，错误信息往往较长。",st:7},
{q:"模板定义通常要放在？",o:["头文件里，因为实例化需要看到定义"," .cpp 里"," 动态库里"," 只能放在 main 前"],a:0,why:"分离编译会导致链接期找不到实例化符号。",st:7},
{q:"C++20 concepts 的作用是？",o:["约束模板参数，让错误信息可读并支持重载选择"," 定义类"," 替代命名空间"," 加速编译"],a:0,why:"concepts 把 SFINAE 的晦涩写法变成可读的约束。",st:7},
{q:"typename 与 class 在模板参数里？",o:["多数场景等价，typename 更准确地表达「任意类型」"," class 只能传类"," typename 只能传内置类型"," 完全不同"],a:0,why:"嵌套依赖类型前必须用 typename 告诉编译器那是类型。",st:7},
{q:"std::vector 与 std::array 的区别是？",o:["vector 大小运行期可变，array 大小编译期固定"," array 在堆上"," vector 不能扩容"," 二者都可动态增长"],a:0,why:"array 无额外开销，vector 有扩容与容量概念。",st:8},
{q:"vector 扩容时已有元素的迭代器会？",o:["失效"," 保持有效"," 变成 nullptr"," 自动修正"],a:0,why:"这也是先用 reserve 预分配再 push_back 的原因。",st:8},
{q:"std::map 与 std::unordered_map 的区别是？",o:["前者有序（红黑树），后者哈希平均 O(1) 但无序"," 二者完全相同"," 后者有序"," 前者更快"],a:0,why:"需要自定义键做 unordered_map 时要提供 hash 与==。",st:8},
{q:"<algorithm> 中排序函数的用法是？",o:["std::sort(v.begin(), v.end())"," v.sort()"," sort(v)"," std::order(v)"],a:0,why:"list 有自己的成员函数 sort，因为迭代器不支持随机访问。",st:8},
{q:"RAII 的含义是？",o:["资源获取即初始化，用对象管理资源生命周期"," 运行期自动内联"," 递归抽象接口"," 引用计数"],a:0,why:"智能指针、锁、文件流都遵循 RAII。",st:9},
{q:"unique_ptr 的语义是？",o:["独占所有权，不可拷贝，可移动"," 引用计数共享"," 可以随意拷贝"," 只能指向数组"],a:0,why:"需要共享时用 shared_ptr，注意循环引用要用 weak_ptr 打破。",st:9},
{q:"std::move 的真实作用是？",o:["把左值转为右值引用以启用移动语义，本身不移动数据"," 立刻搬运内存"," 删除对象"," 复制对象"],a:0,why:"移动后源对象处于有效但未指定状态，不应再依赖其值。",st:9},
{q:"右值引用声明为？",o:["T&&"," T&"," const T&"," T*"],a:0,why:"T&& 可绑定临时量与 std::move 后的对象。",st:9},
{q:"创建线程并等待其结束的写法是？",o:["std::thread t(f); t.join();"," std::thread t(f); 不 join"," t.start()"," pthread(f)"],a:0,why:"线程对象析构前必须 join 或 detach，否则 std::terminate。",st:10},
{q:"数据竞争时应使用？",o:["std::mutex 配合 lock_guard / unique_lock"," volatile"," static"," const"],a:0,why:"volatile 不提供原子性与内存序保证，不能替代互斥。",st:10},
{q:"std::atomic 解决的问题是？",o:["无锁地安全读写单个变量并提供内存序控制"," 让对象自动加锁"," 加速容器"," 替代线程"],a:0,why:"复合操作（读-改-写）即便原子变量也可能需 compare_exchange。",st:10},
{q:"lambda 捕获列表 [=] 表示？",o:["按值捕获用到的外部变量"," 按引用捕获全部"," 捕获 this 指针"," 不捕获"],a:0,why:"[&] 是按引用；按引用捕获要小心悬垂引用。",st:4},
{q:"泛型 lambda 使用什么参数类型？",o:["auto"," T"," void*"," template T"],a:0,why:"C++14 起 lambda 参数可用 auto，等价于模板化的调用运算符。",st:4},
{q:"std::function 的主要代价是？",o:["类型擦除带来一定开销与可能的堆分配"," 不能使用 lambda"," 不能存函数指针"," 编译期展开"],a:0,why:"热路径可改用模板参数或函数指针以去掉开销。",st:4},
{q:"尾置返回类型 auto f() -> int 的用途是？",o:["返回类型依赖参数时写在参数之后"," 必须写"," 提高性能"," 声明为内联"],a:0,why:"配合 decltype 可推导依赖参数的复杂返回类型。",st:4},
{q:"nullptr 相比 NULL 的优势是？",o:["有明确指针类型，避免重载决议歧义"," 更快"," 等价于 0 但更短"," 只能在 C 用"],a:0,why:"NULL 常是 0，f(int) 与 f(char*) 重载时会选错。",st:2},
{q:"std::string 的 c_str() 返回？",o:["以 '\\0' 结尾的 const char*，指针在修改或析构后失效"," 可写缓冲区"," std::string 副本"," 长度"],a:0,why:"传给 C API 时注意生命周期，不要保存该指针长期使用。",st:8},
{q:"异常规范 noexcept 的作用是？",o:["承诺不抛异常，违反会直接终止，便于优化与移动语义"," 捕获所有异常"," 禁止函数被调用"," 声明为虚函数"],a:0,why:"移动构造若非 noexcept，vector 扩容可能退回拷贝。",st:10}
]};

/* ---------------- Java ---------------- */
window.PLACEMENT.java = { name: "Java", icon: "☕", qs: [
{q:"Java 程序执行流程是？",o:["javac 编译为字节码，再由 JVM 执行"," 直接编译为机器码执行"," 逐行解释源码"," 先链接再解释"],a:0,why:".java → .class 字节码 → JVM 解释/JIT 编译执行。",st:1},
{q:"程序入口方法的标准签名是？",o:["public static void main(String[] args)"," public void main()"," static main(String a)"," void main(String[] a)"],a:0,why:"必须是 public static void 且参数为 String[]，JVM 才能识别。",st:1},
{q:"JDK、JRE、JVM 的关系是？",o:["JDK 包含 JRE，JRE 包含 JVM"," JVM 包含 JDK"," 三者互不相干"," JRE 包含 JDK"],a:0,why:"开发需要 JDK（含编译器），仅运行用 JRE 即可。",st:1},
{q:"一个 .java 文件中可以有几个 public 类？",o:["最多一个，且文件名必须与之相同"," 任意多个"," 必须两个"," 不能有 public 类"],a:0,why:"编译后每个类生成一个 .class 文件。",st:1},
{q:"Java 基本类型中不属于整型的是？",o:["boolean"," byte"," short"," long"],a:0,why:"八种基本类型：byte/short/int/long/float/double/char/boolean。",st:2},
{q:"Integer 与 int 的关系是？",o:["Integer 是包装类，可自动装箱拆箱"," 完全相同"," Integer 更快"," int 可以为 null"],a:0,why:"Integer 可为 null，拆箱时会抛 NullPointerException。",st:2},
{q:"Integer a=127, b=127; a==b 的结果是？",o:["true（-128..127 有缓存）"," false"," 编译错误"," 运行异常"],a:0,why:"超出缓存范围应一律用 equals 比较值。",st:2},
{q:"字符串比较内容应使用的正确方式是？",o:["s1.equals(s2)"," s1 == s2"," s1 = s2"," s1.compare(s2)"],a:0,why:"== 比较引用地址；字面量因常量池才可能偶然相等。",st:2},
{q:"String 不可变，频繁拼接应使用？",o:["StringBuilder（单线程）或 StringBuffer（多线程）"," String + 最快"," char[] 拼接"," LinkedList"],a:0,why:"循环内用 + 会不断创建新对象，应显式用 StringBuilder。",st:4},
{q:"switch 支持的类型不包括？",o:["long"," int"," String（Java 7+）"," enum"],a:0,why:"switch 支持整型系、枚举与字符串，不支持 long。",st:3},
{q:"增强 for 循环 for (int x : arr) 适用于？",o:["数组与实现了 Iterable 的对象"," 仅 List"," 仅数组"," 任意对象"],a:0,why:"遍历中删除元素要用 Iterator.remove，否则 ConcurrentModificationException。",st:3},
{q:"标签 break 的用途是？",o:["跳出指定的外层循环"," 结束程序"," 跳过一次迭代"," 抛出异常"],a:0,why:"多重循环可用标签精确控制跳出层级。",st:3},
{q:"数组长度获取方式是？",o:["arr.length"," arr.length()"," arr.size()"," sizeof(arr)"],a:0,why:"length 是属性；String 用 length()，集合用 size()。",st:4},
{q:"ArrayList 与 LinkedList 的取舍是？",o:["随机访问多则 ArrayList，频繁中间插入删除则 LinkedList"," 总是用 ArrayList"," 总是 LinkedList"," 二者性能相同"],a:0,why:"实际业务中 ArrayList 因缓存友好通常是默认选择。",st:7},
{q:"HashMap 的键必须正确实现？",o:["hashCode 与 equals"," compareTo"," clone"," toString"],a:0,why:"二者约定必须一致：相等对象必须有相同哈希码。",st:7},
{q:"HashMap 在 Java 8 中哈希冲突严重时？",o:["链表长度超过阈值会转为红黑树"," 直接抛异常"," 扩容为无限大"," 丢弃元素"],a:0,why:"树化把最坏查找从 O(n) 改善到 O(log n)。",st:7},
{q:"泛型的主要作用是？",o:["编译期类型安全并消除强制转换"," 运行期检查"," 提高性能"," 支持多继承"],a:0,why:"Java 泛型是擦除式，运行期无法拿到具体类型实参。",st:7},
{q:"List<?> 与 List<Object> 的区别是？",o:["前者是未知类型通配符，不能随意添加元素"," 二者相同"," 后者更安全"," 前者不能读"],a:0,why:"PECS 原则：生产者用 extends，消费者用 super。",st:7},
{q:"方法参数传递方式是？",o:["一律值传递，对象传的是引用的副本"," 对象按引用传递"," 基本类型按引用"," 由方法决定"],a:0,why:"因此交换两个对象的封装类在方法内无效。",st:5},
{q:"方法重载的判定依据是？",o:["参数列表（类型、个数、顺序），与返回类型无关"," 返回类型"," 方法体"," 修饰符"],a:0,why:"仅返回类型不同不构成重载，会编译报错。",st:5},
{q:"static 方法中可以？",o:["直接访问静态成员，不能直接访问实例成员"," 直接访问实例成员"," 使用 this"," 使用 super"],a:0,why:"静态方法属于类，没有 this，不能调用实例成员。",st:5},
{q:"final 修饰变量表示？",o:["引用不可改（内容可变）"," 对象不可变"," 必须是常量表达式"," 线程私有"],a:0,why:"final List 可以 add，只是不能重新赋值指向别的对象。",st:5},
{q:"类与对象的关系是？",o:["类是模板，对象是实例"," 对象是类的模板"," 二者相同"," 类不能被实例化"],a:0,why:"new 时在堆上分配对象并返回引用。",st:5},
{q:"继承使用的关键字是？",o:["extends"," implements"," inherits"," derive"],a:0,why:"Java 单继承类、多实现接口。",st:6},
{q:"super 关键字的作用是？",o:["访问父类成员或调用父类构造器"," 访问子类"," 声明静态方法"," 定义接口"],a:0,why:"子类构造器中 super(...) 必须是第一条语句。",st:6},
{q:"接口与抽象类的区别是？",o:["接口强调能力契约且可多实现，抽象类强调 is-a 与代码复用"," 接口不能有默认方法"," 抽象类不能含实现"," 二者相同"],a:0,why:"Java 8 起接口可有 default 与 static 方法。",st:6},
{q:"方法重写与重载的注解分别是？",o:["@Override 用于重写，重载无注解"," @Overload 与 @Override"," 都用 @Override"," 不需要注解"],a:0,why:"重写要求签名一致、访问权限不能更严格且不抛更宽的检查异常。",st:6},
{q:"多态的运行时表现是？",o:["调用被重写方法时执行实际对象类型的方法"," 执行父类方法"," 编译期决定全部"," 随机"],a:0,why:"字段不参与多态，只有方法调用才动态分派。",st:6},
{q:"异常体系中必须捕获或声明的是？",o:["受检异常（Exception 非 RuntimeException 子类）"," Error"," RuntimeException"," 所有 Throwable"],a:0,why:"Error 表示严重错误，通常不捕获；运行时异常可不声明。",st:7},
{q:"try-with-resources 的要求是？",o:["资源实现 AutoCloseable，自动关闭"," 资源必须实现 Serializable"," 只能用于文件"," 需手动 close"],a:0,why:"替代 finally 手工关闭，避免异常掩盖。",st:8},
{q:"读文本文件的 NIO.2 便捷方式是？",o:["Files.readAllLines(Paths.get(p))"," new FileReader(p).read()"," System.read(p)"," File.load(p)"],a:0,why:"NIO.2 的 Files/Paths 提供更简洁的 API 与更好的异常处理。",st:8},
{q:"字节流与字符流的区别是？",o:["字节流处理二进制，字符流处理文本并涉及编码"," 字节流更快"," 字符流不能读文件"," 二者相同"],a:0,why:"读文本务必指定字符集（如 StandardCharsets.UTF_8）。",st:8},
{q:"序列化时不想让某字段被写出，应？",o:["用 transient 修饰"," 用 final"," 用 static"," 用 volatile"],a:0,why:"static 属于类也不会被序列化；transient 后反序列化得到默认值。",st:8},
{q:"创建线程的正确方式是？",o:["实现 Runnable 或继承 Thread，推荐前者"," 只能继承 Thread"," 用 new Thread().run() 启动"," 用 start(Runnable)"],a:0,why:"必须调用 start() 才会新建线程，直接 run() 只是普通调用。",st:9},
{q:"synchronized 的作用是？",o:["保证互斥与可见性"," 保证顺序但不互斥"," 让方法变快"," 替代 volatile 的一切"],a:0,why:"修饰实例方法锁 this，静态方法锁 Class 对象。",st:9},
{q:"volatile 能保证的是？",o:["可见性与禁止重排序，不保证复合操作原子性"," 一切线程安全"," 互斥"," 原子自增"],a:0,why:"i++ 即便 volatile 也不安全，用 AtomicInteger 或锁。",st:9},
{q:"线程池推荐使用？",o:["ExecutorService / ThreadPoolExecutor"," 每次 new Thread"," ThreadGroup"," Runnable 池"],a:0,why:"避免无节制创建线程导致资源耗尽，注意勿用无界队列。",st:9},
{q:"Callable 与 Runnable 的区别是？",o:["Callable 可返回结果并抛出受检异常"," 二者相同"," Runnable 有返回值"," Callable 不能用于线程池"],a:0,why:"配合 Future 获取异步结果，Future.get 会阻塞。",st:9},
{q:"Lambda 表达式可用的前提是？",o:["目标类型是函数式接口（单一抽象方法）"," 任意接口"," 任意类"," 必须是抽象类"],a:0,why:"@FunctionalInterface 注解可让编译器帮你校验。",st:10},
{q:"Stream 的特性是？",o:["惰性求值，终端操作才触发执行，且不能重复使用"," 立即执行"," 可重复消费"," 修改原集合"],a:0,why:"中间操作返回新流，终端操作后流即关闭。",st:10},
{q:"Optional 的正确用法是？",o:["表达可能缺失的返回值，避免 null 判断"," 用于字段序列化"," 替代所有 null"," 提高性能"],a:0,why:"不要用它做参数或字段，主要用于返回值的链式处理。",st:10},
{q:"方法引用 String::valueOf 属于？",o:["类名引用静态方法"," 实例方法引用"," 构造器引用"," 数组引用"],a:0,why:"还有 对象::实例方法、类::实例方法、类::new 三种形式。",st:10},
{q:"JVM 内存中存放对象实例的是？",o:["堆（Heap）"," 虚拟机栈"," 方法区"," 程序计数器"],a:0,why:"栈存局部变量与栈帧；方法区/元空间存类元数据。",st:10},
{q:"GC 判断对象可回收的常用算法是？",o:["可达性分析（GC Roots）"," 引用计数"," 随机回收"," 时间戳"],a:0,why:"引用计数难处理循环引用，Java 主用可达性分析。",st:10},
{q:"== 与 equals 的默认关系是？",o:["Object.equals 默认等价于 ==，需重写才能比较内容"," equals 永远比地址"," == 比内容"," 二者都是内容比较"],a:0,why:"重写 equals 必须同时重写 hashCode。",st:6}
]};

/* ---------------- JavaScript ---------------- */
window.PLACEMENT.js = { name: "JavaScript", icon: "🟨", qs: [
/* 阶段1 入门基础（d1） */
{q:"console.log(\"hi\") 的内容会出现在哪里？",o:["浏览器控制台或 Node.js 终端"," 只会变成浏览器弹窗"," 自动写入文件"," 存入数据库"],a:0,why:"JS 的打印输出到运行环境的控制台；浏览器按 F12 打开，Node 在终端显示。",st:1,d:1},
{q:"用 Node.js 运行一个名为 app.js 的文件，正确命令是？",o:["node app.js"," node run app.js"," js app.js"," run app.js"],a:0,why:"node 后接文件路径即可执行脚本。",st:1,d:1},
{q:"JavaScript 最早被设计运行在哪种环境？",o:["浏览器"," 操作系统内核"," 数据库引擎"," 显卡驱动"],a:0,why:"JS 为网页交互而生，后来 Node.js 才让它跑在服务器端。",st:1,d:1},
{q:"浏览器里按 F12 打开的「开发者工具」包含？",o:["控制台、元素审查、网络等面板"," 仅下载管理器"," 仅浏览历史"," 仅系统设置"],a:0,why:"DevTools 是调试 JS 的核心工具。",st:1,d:1},
{q:"alert(\"hi\") 会做什么？",o:["弹出一个浏览器对话框"," 在控制台打印"," 抛出一个异常"," 跳转到新页面"],a:0,why:"alert 是阻塞式的原生对话框，调试时可临时用，正式代码少用。",st:1,d:1},
/* 阶段2 控制流与函数（d1-d2） */
{q:"声明一个不应再重新赋值的变量，应该用？",o:["var"," let"," const"," function"],a:2,why:"const 绑定不可重赋值，默认优先用 const。",st:2,d:1},
{q:"严格相等（值和类型都比较）的运算符是？",o:["="," =="," ==="," !==="],a:2,why:"=== 同时比较值与类型，避免隐式转换陷阱；!= 用 !==。",st:2,d:1},
{q:"模板字符串用哪种符号包裹？",o:["单引号 '"," 双引号 \""," 反引号 `"," 圆括号 ()"],a:2,why:"反引号支持 ${} 插值和多行字符串。",st:2,d:1},
{q:"「2~3 个区间判断」与「固定值的多分支」分别适合？",o:["都用 if"," 都用 switch"," 区间用 if，固定多值用 switch"," 随便选"],a:2,why:"switch 适合离散值匹配（记得 break），区间判断用 if 更自然。",st:2,d:2},
{q:"for...of 遍历数组时拿到的是？",o:["字符串索引 \"0\""," 元素的值"," 对象的键"," 数组长度"],a:1,why:"for...of 直接取元素；for...in 取到的才是字符串索引，且会遍历原型链。",st:2,d:2},
/* 阶段3 数组与对象（d2-d3） */
{q:"数组的 map(fn) 会？",o:["原地修改原数组"," 返回一个由 fn 映射出的新数组"," 返回 undefined"," 返回原数组引用"],a:1,why:"map 是纯函数式转换，不改动原数组。",st:3,d:2},
{q:"const [a,b]=arr 这种写法称为？",o:["展开"," 解构赋值，取出前两个元素"," 深拷贝"," 闭包"],a:1,why:"解构可按位置/键名提取，常配合剩余运算符 ...rest。",st:3,d:2},
{q:"JSON.stringify(obj) 的作用是？",o:["把对象转成 JSON 字符串"," 把字符串解析成对象"," 克隆对象"," 压缩对象"],a:0,why:"与 JSON.parse 互逆，用于本地存储与网络传输。",st:3,d:2},
{q:"给对象新增一个属性 obj.x=1，结果是？",o:["语法错误"," 直接为对象添加该属性"," 必须用 Object.add"," 需先冻结对象"],a:1,why:"JS 普通对象可动态增删属性；用 Object.freeze 才能禁止。",st:3,d:3},
{q:"arr.filter(x=>x>0) 返回？",o:["原数组中大于 0 的元素个数"," 由满足条件的元素组成的新数组"," 布尔值"," 修改原数组"],a:1,why:"filter 返回新数组，不改变原数组。",st:3,d:3},
/* 阶段4 DOM 与事件（d3） */
{q:"document.getElementById(\"box\") 返回？",o:["id 为 box 的那个元素"," 所有元素组成的数组"," 第一个 div"," null 永远"],a:0,why:"按 id 精确定位唯一元素；找不到时返回 null。",st:4,d:3},
{q:"给按钮绑定点击事件，推荐写法是？",o:["btn.onclick=fn（只能绑一个）"," btn.addEventListener('click', fn)"," btn.click=fn"," btn.bind('click', fn)"],a:1,why:"addEventListener 可绑多个监听且更易解绑。",st:4,d:3},
{q:"要修改元素的可见文本，应使用？",o:["el.text"," el.textContent 或 el.innerHTML"," el.value"," el.innerText 只读"],a:1,why:"textContent 设纯文本（不被解析为 HTML），innerHTML 会解析标签。",st:4,d:3},
{q:"document.querySelector('.cls') 选中？",o:["所有 .cls 元素"," 第一个匹配 .cls 的元素"," 最后一个匹配元素"," 父元素"],a:1,why:"querySelector 返回首个；querySelectorAll 返回全部（NodeList）。",st:4,d:3},
{q:"在事件处理里想阻止链接跳转等默认行为，应调用？",o:["e.stop()"," e.preventDefault()"," e.block()"," return false 必须"],a:1,why:"preventDefault 取消浏览器默认动作；stopPropagation 才是阻止冒泡。",st:4,d:3},
/* 阶段5 异步编程（d3-d4） */
{q:"「回调层层嵌套」的痛点通常用什么解决？",o:["更多回调"," Promise / async-await"," goto"," 全局变量"],a:1,why:"Promise 与 async/await 把异步流程写成近似同步的形态。",st:5,d:3},
{q:"Promise 的三种状态不包括？",o:["pending（进行中）"," fulfilled（已成功）"," rejected（已失败）"," running（运行中）"],a:3,why:"Promise 只有 pending/fulfilled/rejected；resolved 是统称。",st:5,d:4},
{q:"async function foo() 调用后返回？",o:["函数的直接返回值"," 一个 Promise 对象"," 一个线程"," undefined"],a:1,why:"async 函数体返回值会被包进 Promise 自动 resolve。",st:5,d:4},
{q:"await 表达式只能写在？",o:["任意普通函数"," async 函数内部"," 全局作用域"," 构造函数里"],a:1,why:"await 必须处于 async 函数中，否则语法报错。",st:5,d:4},
{q:"fetch('/api') 返回的是？",o:["响应体字符串"," 一个 Promise<Response>"," 一个对象（已解析）"," 状态码数字"],a:1,why:"fetch 返回 Promise，需 await 后再 .json()/text() 解析。",st:5,d:4},
/* 阶段6 面向对象与模块（d4） */
{q:"ES6 中定义类用？",o:["function C(){} 是唯一方式"," class C {}"," struct C {}"," def C"],a:1,why:"class 是原型继承的语法糖，仍有原型机制。",st:6,d:4},
{q:"子类继承父类用关键字？",o:["implements"," extends"," inherit"," derive"],a:1,why:"extends 建立原型链；方法重写时 super 调用父类版本。",st:6,d:4},
{q:"类里的 constructor 负责？",o:["销毁对象"," 创建对象后初始化实例属性"," 声明静态方法"," 定义接口"],a:1,why:"new 时自动调用 constructor 完成初始化。",st:6,d:4},
{q:"在 ES Module 中导出成员用？",o:["export 与 export default"," require"," module.exports 仅"," pub"],a:0,why:"export 命名导出，export default 默认导出；import 对应引入。",st:6,d:4},
{q:"static method() 属于？",o:["每个实例各自一份"," 类本身，无需实例化即可调用"," 原型链末端"," window 对象"],a:1,why:"静态方法挂在类上，常用于工具函数，不能访问 this 实例。",st:6,d:4},
/* 阶段7 Web API 与浏览器（d4-d5） */
{q:"localStorage 用来？",o:["存同源下的字符串键值对，关闭页面仍在"," 存服务端数据库"," 存 cookie 并自动随请求发送"," 存临时变量于内存"],a:0,why:"localStorage 持久、仅同源可访问、容量约 5MB；只能存字符串。",st:7,d:4},
{q:"setTimeout(fn, 1000) 的效果是？",o:["立即执行 fn"," 约 1 秒后执行一次 fn"," 每 1 秒循环执行"," 阻塞 1 秒"],a:1,why:"setTimeout 延时一次；setInterval 才反复执行。",st:7,d:4},
{q:"浏览器的「同源策略」主要限制？",o:["同页面内脚本运行"," 跨源（不同域/协议/端口）读写资源"," 本地文件读取"," CSS 加载"],a:1,why:"同源策略是安全基石；跨域需 CORS / 代理等机制。",st:7,d:5},
{q:"防抖（debounce）与节流（throttle）常用于？",o:["控制搜索框、滚动等高频事件的触发频率"," 加快循环"," 压缩图片"," 加密数据"],a:0,why:"防抖合并末次触发，节流限制单位时间次数，提升性能。",st:7,d:5},
{q:"用 fetch 发送 JSON 的 POST 请求，必须？",o:["只写 URL"," 设置 method:'POST'、headers 的 Content-Type 与 body 字符串"," 用 GET 也能发 body"," 不需要 body"],a:1,why:"POST 要显式 method、声明 application/json、把对象 JSON.stringify 进 body。",st:7,d:5},
/* 阶段8 现代工程与实战（d5） */
{q:"现代前端常用的打包/构建工具是？",o:["webpack / Vite"," 仅记事本"," gcc"," npm 本身"],a:0,why:"Vite/webpack 处理模块打包、热更新与优化。",st:8,d:5},
{q:"TypeScript 相比 JS 的主要优势是？",o:["运行更快"," 静态类型，编译期发现错误"," 不需要浏览器"," 语法完全不同"],a:1,why:"TS 是 JS 的超集，类型在编译期检查，提升大型项目可维护性。",st:8,d:5},
{q:"单页应用（SPA）的特点是？",o:["每次跳转都整页刷新"," 前端路由、局部更新视图，不整页刷新"," 不能用 JS"," 必须是服务端渲染"],a:1,why:"SPA 靠前端路由切换视图，体验更流畅，首屏需加载更多 JS。",st:8,d:5},
{q:"给 JS 代码写单元测试，常用框架是？",o:["Jest / Vitest"," 只有 console.log"," Excel"," Photoshop"],a:0,why:"Jest/Vitest 提供断言、mock 与覆盖率。",st:8,d:5},
{q:"ES Module 与 CommonJS 的根本区别是？",o:["没区别"," import/export（静态、编译期） vs require/module.exports（动态、运行期）"," 后者更快"," 前者只用于浏览器"],a:1,why:"ESM 是语言标准、支持静态分析与 tree-shaking；CJS 是 Node 传统方案。",st:8,d:5}
]};

/* ---------------- C#（dk=cs） ---------------- */
window.PLACEMENT.cs = { name: "C#", icon: "🟣", qs: [
/* 阶段1 启航与环境（d1） */
{q:"C# 控制台程序的标准入口方法是？",o:["static void Main(string[] args)"," void main()"," public run()"," static Start()"],a:0,why:"Main 是 CLR 调用的入口，签名需为 static 且返回 void/int。",st:1,d:1},
{q:"把 C# 源代码编译运行的官方工具链是？",o:["gcc"," csc / dotnet"," javac"," node"],a:1,why:"传统用 csc，现代用 dotnet CLI（build/run）。",st:1,d:1},
{q:"在控制台打印一行文本用？",o:["print()"," Console.WriteLine"," echo"," System.out.println"],a:1,why:"Console 是 System 命名空间下的标准输出类。",st:1,d:1},
{q:"C# 中的字符串关键字是？",o:["String（仅）"," string（C# 关键字，等价于 System.String）"," str"," text"],a:1,why:"小写 string 是关键字 alias，编译后就是 System.String。",st:1,d:1},
{q:"C# 的注释写法正确的是？",o:["// 单行，/* */ 多行"," # 单行"," -- 单行"," <!-- --> 多行"],a:0,why:"// 单行注释，/* */ 块注释；文档注释用 ///。",st:1,d:1},
/* 阶段2 控制流与方法（d1-d2） */
{q:"声明一个 32 位整数应写？",o:["int x = 5;"," integer x = 5;"," var x:int;"," let x = 5;"],a:0,why:"int 是 32 位有符号整数关键字。",st:2,d:1},
{q:"var x = 3.14; 中的 var 表示？",o:["动态类型，运行时可变"," 编译期根据右值推断类型"," 任意类型（弱类型）"," 必须后续再指定类型"],a:1,why:"var 仍是强静态类型，只是省去显式书写，类型在编译期确定。",st:2,d:2},
{q:"C# 的 for 循环标准写法是？",o:["for (int i = 0; i < n; i++)"," for i in range(n)"," repeat n"," loop (i<n)"],a:0,why:"三段式：初始化、条件、迭代。",st:2,d:2},
{q:"遍历 List<T> 用？",o:["for-each 用 foreach (var x in list)"," 只能下标遍历"," 用 each do"," 用 iterate"],a:0,why:"foreach 配合 IEnumerable 遍历，语义清晰。",st:2,d:2},
{q:"方法的返回类型写在？",o:["方法名之后"," 方法名之前"," 参数列表里"," 任意位置都行"],a:1,why:"C# 是「返回类型 方法名(参数)」的声明顺序。",st:2,d:2},
/* 阶段3 集合与泛型（d2-d3） */
{q:"List<int> 本质是？",o:["泛型动态数组"," 单向链表"," 固定长度数组"," 键值字典"],a:0,why:"List<T> 是泛型、可增长、按索引访问的序列。",st:3,d:2},
{q:"键值对集合用？",o:["Dictionary<K,V>"," HashSet<T>"," Queue<T>"," ArrayList"],a:0,why:"Dictionary 以哈希表实现 O(1) 查找。",st:3,d:2},
{q:"LINQ 主要用来？",o:["查询与转换集合"," 发起网络请求"," 读写文件"," 捕获异常"],a:0,why:"LINQ 用统一语法（方法链或查询表达式）处理集合。",st:3,d:3},
{q:"数组的长度属性是？",o:["arr.Length"," arr.length()"," arr.size"," arr.len"],a:0,why:"C# 数组与大多数集合用 Length（属性），不是方法。",st:3,d:3},
{q:"统计集合中元素个数用？",o:["Count"," Size"," length"," Len"],a:0,why:"LINQ 的 Count() 或集合的 Count 属性（List 等）给出元素数。",st:3,d:3},
/* 阶段4 面向对象编程（d3-d4） */
{q:"定义类用？",o:["class C { }"," struct 只"," interface C"," def C"],a:0,why:"class 是引用类型；struct 是值类型，用途不同。",st:4,d:3},
{q:"public / private / protected 控制的是？",o:["变量名长度"," 成员的可访问范围"," 性能"," 垃圾回收"],a:1,why:"访问修饰符决定类内外谁能访问该成员。",st:4,d:3},
{q:"用属性 property 的主要目的是？",o:["给字段加 get/set 封装与校验"," 替代所有方法"," 提高运行速度"," 声明常量"],a:0,why:"属性在字段外包裹访问逻辑，保持 API 稳定。",st:4,d:4},
{q:"C# 的类继承写法用？",o:["extends Base"," : Base"," inherits Base"," implements Base"],a:1,why:"C# 用冒号表示继承（类单继承）与实现接口。",st:4,d:4},
{q:"重写父类的虚方法用关键字？",o:["override"," overload"," virtual 仅"," new 强制"],a:0,why:"基类用 virtual，子类用 override 形成多态。",st:4,d:4},
/* 阶段5 异步与异常（d4） */
{q:"捕获异常的标准结构是？",o:["try / catch / finally"," guard / else"," onError"," catch-all 自动"],a:0,why:"finally 无论是否异常都会执行（释放资源）。",st:5,d:4},
{q:"主动抛出一个异常用？",o:["raise new Exception()"," throw new Exception()"," error(\"...\")"," emit"],a:1,why:"throw 后跟异常实例。",st:5,d:4},
{q:"用 async 标记的方法，其返回类型通常是？",o:["void"," Task 或 Task<T>"," int"," object"],a:1,why:"async 方法返回 Task（无值）或 Task<T>（有值），由 await 解包。",st:5,d:4},
{q:"await someTask 的作用是？",o:["阻塞整个线程"," 异步等待完成且不阻塞调用线程"," 创建新线程"," 取消任务"],a:1,why:"await 挂起当前方法直到任务完成，期间线程可去干别的。",st:5,d:4},
{q:"using 语句的主要用途是？",o:["引入命名空间"," 自动释放实现 IDisposable 的资源"," 定义别名"," 异常处理"],a:1,why:"using 块结束自动调用 Dispose，避免资源泄漏。",st:5,d:4},
/* 阶段6 文件与数据（d4-d5） */
{q:"一次性读取文本文件内容用？",o:["File.ReadAllText(path)"," fopen(path)"," readFile.sync"," cat path"],a:0,why:"System.IO.File 提供便捷静态方法。",st:6,d:4},
{q:"写入整个文本文件用？",o:["File.WriteAllText(path, text)"," echo > "," fwrite"," save(text)"],a:0,why:"WriteAllText 覆盖写入；追加用 AppendAllText。",st:6,d:4},
{q:"跨平台拼接路径应使用？",o:["\"dir\" + \"\\\\\" + \"file\""," Path.Combine(a, b)"," a + \"/\" + b 永远"," string.Format"],a:1,why:"Path.Combine 按当前系统使用正确的分隔符。",st:6,d:5},
{q:"把对象序列化为 JSON，官方方案是？",o:["System.Text.Json 或 Newtonsoft.Json"," toString()"," eval"," JSON.stringify 是 JS 的"],a:0,why:".NET 用 System.Text.Json（内置）或 Newtonsoft.Json 库。",st:6,d:5},
{q:"字符串插值（嵌入变量）用？",o:["\"Hello \" + name"," $\"Hello {name}\""," \"Hello %s\" % name"," format(name)"],a:1,why:"$ 前缀字符串支持 {表达式} 插值。",st:6,d:5},
/* 阶段7 高级特性（d5） */
{q:"声明接口用关键字？",o:["interface"," abstract"," protocol"," trait"],a:0,why:"interface 定义能力契约，类可多实现。",st:7,d:5},
{q:"不能实例化的、用作基类的类型是？",o:["sealed 类"," abstract 抽象类"," static 类"," record"],a:1,why:"abstract 类含抽象成员，必须由子类实现后才能实例化。",st:7,d:5},
{q:"事件（event）通常建立在什么之上？",o:["委托 delegate"," 接口"," 结构体"," 枚举"],a:0,why:"event 是受限的委托，对外只暴露 +=/-= 订阅。",st:7,d:5},
{q:"为泛型参数加约束（如必须是引用类型）用？",o:["where T : class"," constraint T"," T extends class"," require T"],a:0,why:"where 子句约束 T 的基类、接口或 new() 等。",st:7,d:5},
{q:"可空的值类型（如可能无成绩的 int）写作？",o:["int?"," NullableInt"," int!"," optional<int>"],a:0,why:"int? 是 Nullable<int> 的语法糖，HasValue/Value 或 ?? 取值。",st:7,d:5},
{q:"C# 9 引入的 record 主要解决？",o:["不可变数据模型与基于值的相等"," 更快循环"," 替代 class 全部场景"," 多线程锁"],a:0,why:"record 默认不可变且按值比较相等，适合 DTO/模型。",st:7,d:5},
{q:"模式匹配 is/switch 常用于？",o:["替代繁琐的 type 判断与解构"," 加快编译"," 字符串加密"," 网络请求"],a:0,why:"is 模式与 switch 表达式让类型判断更简洁安全。",st:7,d:5},
{q:"sealed 修饰类的含义是？",o:["可被继承"," 禁止被继承"," 线程安全"," 自动释放"],a:1,why:"sealed 防止进一步派生，常用于封闭实现或性能优化。",st:7,d:5},
{q:"用 + 拼接多个字符串时，正确的理解是？",o:["string 不可变，每次 + 都会生成新字符串"," 原地修改原字符串"," 自动改用 StringBuilder"," 编译报错"],a:0,why:"循环内大量拼接应显式用 StringBuilder 避免频繁分配。",st:2,d:2},
{q:"struct 与 class 的根本区别是？",o:["struct 是值类型（赋值拷贝），class 是引用类型"," struct 一定在堆上"," class 不能含方法"," 二者完全相同"],a:0,why:"值类型赋值时复制整个值；引用类型复制的是引用。",st:4,d:3},
{q:"as 运算符（如 obj as T）用于？",o:["安全类型转换，失败返回 null 而非抛异常"," 强制转换且必然成功"," 声明类型别名"," 比较两对象相等"],a:0,why:"as 只用于引用/可空类型；无法转换时给 null，比强转更安全。",st:4,d:4},
{q:"空合并运算符 x ?? y 的含义是？",o:["x 非 null 取 x，否则取 y"," x 与 y 相加"," x 为 null 时抛异常"," 判断 x 是否等于 y"],a:0,why:"?? 提供默认值，配合 ?. 能写出更安全的链式访问。",st:3,d:3}
]};

/* ---------------- Go ---------------- */
window.PLACEMENT.go = { name: "Go", icon: "🐹", qs: [
/* 阶段1 启航与环境（d1） */
{q:"Go 程序执行的入口函数是？",o:["func main() 位于 main 包"," func start()"," init() 即可"," run()"],a:0,why:"main 包里的 main 函数是可执行程序的起点。",st:1,d:1},
{q:"短变量声明并赋值的写法是？",o:["x := 10"," var x = 10 之外不支持"," x = 10（未声明）"," let x = 10"],a:0,why:":= 在函数内声明并初始化，类型自动推断。",st:1,d:1},
{q:"Go 用哪个命令运行单个源码文件？",o:["go run main.go"," go start main.go"," run main.go"," gcc main.go"],a:0,why:"go run 编译并运行；go build 生成可执行文件。",st:1,d:1},
{q:"打印到标准输出常用？",o:["fmt.Println"," print()"," echo"," console.log"],a:0,why:"fmt 包提供格式化输入输出；Println 自动加换行。",st:1,d:1},
{q:"Go 的注释写法是？",o:["// 单行，/* */ 多行"," # 单行"," -- 单行"," <!-- -->"],a:0,why:"与 C 系一致，// 单行、/* */ 块注释。",st:1,d:1},
/* 阶段2 控制流与函数（d1-d2） */
{q:"Go 没有 while 关键字，如何用循环？",o:["用 for 充当（for 条件 {}）"," 用 loop"," 用 repeat"," 无法循环"],a:0,why:"Go 只有 for：可写条件循环、for-range、无限循环。",st:2,d:1},
{q:"声明有符号 32 位整数用？",o:["int32"," int（大小随平台）"," Integer"," number"],a:0,why:"int32 固定 32 位；int 长度取决于平台（通常 64）。",st:2,d:2},
{q:"函数返回多个值的标准写法？",o:["return a, b"," 用数组返回"," 用全局变量"," 只能返回一个"],a:0,why:"Go 原生支持多返回值，常用来返回 (结果, error)。",st:2,d:2},
{q:"defer 语句的作用是？",o:["提前返回"," 延迟到函数返回前执行（常用于关闭资源）"," 定义常量"," 启动协程"],a:1,why:"defer 按后进先出顺序在函数退出时执行，适合释放资源。",st:2,d:2},
{q:"for i, v := range arr 中的 i 和 v 分别是？",o:["键与值"," 索引与元素值"," 两个值拷贝"," 类型与值"],a:1,why:"range 对切片/数组给出索引与元素；对 map 给出键与值。",st:2,d:2},
/* 阶段3 slice 与 map（d2-d3） */
{q:"Go 中动态的、可增长的序列类型是？",o:["array（固定长度）"," slice（切片）"," list"," vector"],a:1,why:"slice 基于底层数组、可动态扩容，是日常最常用的序列。",st:3,d:2},
{q:"用 make 创建切片可指定？",o:["长度与容量"," 仅类型"," 仅容量"," 线程数"],a:0,why:"make([]T, len, cap) 分配底层数组；append 超出容量会重新分配。",st:3,d:3},
{q:"Go 中的键值集合类型是？",o:["map[K]V"," dict"," hash"," set"],a:0,why:"map 是哈希表，零值为 nil，使用前需 make 或字面量初始化。",st:3,d:3},
{q:"从 map 取值并判断是否存在的惯用法是？",o:["v = m[k] 然后猜"," v, ok := m[k]（ok 表示是否存在）"," m.get(k)"," m.has(k)"],a:1,why:"逗号 ok  idiom 区分「不存在」与「值为零值」。",st:3,d:3},
{q:"append(s, x) 的结果是？",o:["原地修改 s"," 返回新的切片（s 本身不一定被改动）"," 报错"," 返回长度"],a:1,why:"append 可能触发扩容返回新底层数组，务必接收返回值。",st:3,d:3},
/* 阶段4 接口与错误（d3-d4） */
{q:"Go 的接口满足方式是？",o:["显式 implements 声明"," 隐式：只要实现了接口的方法集即自动满足"," 继承接口"," 注册实现"],a:1,why:"Go 用结构化（鸭子）类型，无需声明实现了哪个接口。",st:4,d:3},
{q:"Go 处理错误的惯用模式是？",o:["抛异常并在别处捕获"," 返回 (value, error)，调用方显式判断 err != nil"," 用 try/catch"," 忽略错误"],a:1,why:"Go 鼓励把 error 作为普通返回值显式处理。",st:4,d:4},
{q:"errors.New(\"msg\") 用来？",o:["创建一条错误"," 抛出异常"," 打印日志"," 终止程序"],a:0,why:"errors.New 构造简单错误；复杂错误用 fmt.Errorf。",st:4,d:4},
{q:"空接口 interface{} 可以？",o:["只能存整数"," 存放任意类型的值（类似泛型出现前的 any）"," 不能赋值"," 仅用于错误"],a:1,why:"空接口没有任何方法约束，可承载任意类型，但取出需类型断言。",st:4,d:4},
{q:"类型断言 v, ok := x.(T) 中 ok 表示？",o:["x 是否为 nil"," x 的动态类型是否能转为 T"," 转换是否成功自动"," 是否报错"],a:1,why:"类型断言失败时 ok 为 false，不会 panic（若不用 ok 形式则会）。",st:4,d:4},
/* 阶段5 并发编程（d4-d5） */
{q:"Go 中启动一个并发执行体用？",o:["go func()"," thread()"," async()"," spawn()"],a:0,why:"go 关键字启动 goroutine，由运行时调度在少量线程上多路复用。",st:5,d:4},
{q:"goroutine 之间通信与同步的推荐方式是？",o:["全局变量"," channel（通道）"," 直接共享内存随意读写"," 文件锁"],a:1,why:"Go 哲学「不要通过共享内存来通信，要通过通信来共享内存」。",st:5,d:5},
{q:"带缓冲与不带缓冲的 channel 的区别是？",o:["无区别"," 无缓冲需收发双方同时就绪；有缓冲可暂存若干元素"," 有缓冲更快总是更好"," 无缓冲会丢数据"],a:1,why:"无缓冲是同步交接；带缓冲在未满/未空时可异步。",st:5,d:5},
{q:"select 语句用于？",o:["选择函数重载"," 在多个 channel 操作间等待第一个就绪的"," 数据库查询"," 条件分支替代 if"],a:1,why:"select 像多路 switch，处理多个 channel 的收发与 default。",st:5,d:5},
{q:"sync.WaitGroup 通常用来？",o:["让主 goroutine 等待一组 goroutine 完成"," 加锁"," 计时"," 创建 channel"],a:0,why:"Add/Done/Wait 协同等待并发任务结束。",st:5,d:4},
/* 阶段6 Web 与标准库（d5） */
{q:"启动一个最简单的 HTTP 服务用？",o:["net/http 的 http.ListenAndServe"," 仅 fmt"," 外部框架强制"," socket 手写"],a:0,why:"标准库 net/http 自带路由与服务器，无需框架即可起步。",st:6,d:5},
{q:"Go 的模块化依赖管理用？",o:["GOPATH 唯一"," go.mod / go mod 命令"," package.json"," pom.xml"],a:1,why:"go modules（go.mod）是现代依赖版本管理方案。",st:6,d:5},
{q:"从标准库读取 JSON 用？",o:["json.Marshal / json.Unmarshal"," toJSON"," eval"," serde"],a:0,why:"encoding/json 提供结构体与 JSON 的互转（字段加 json tag）。",st:6,d:5},
{q:"time.Now() 返回的是？",o:["时间戳字符串"," time.Time 类型（可格式化、计算差值）"," int 秒"," 毫秒数"],a:1,why:"time.Time 提供格式化（如 2006-01-02 布局）与加减。",st:6,d:5},
{q:"处理命令行参数用？",o:["os.Args / flag 包"," argv 全局"," sys.args"," args()"],a:0,why:"flag 包解析 -name=value 形式的参数，os.Args 是原始切片。",st:6,d:5},
/* 阶段7 工程化与测试（d5） */
{q:"Go 的单元测试文件与函数命名约定是？",o:["test_*.go 与 def test_*"," xxx_test.go 与 func TestXxx(t *testing.T)"," *.spec.go"," check*.go"],a:1,why:"测试文件以 _test.go 结尾，测试函数以 Test 开头、接收 *testing.T。",st:7,d:5},
{q:"运行当前包全部测试的命令是？",o:["go test ./..."," go run test"," npm test"," pytest"],a:0,why:"go test 编译并运行测试；./... 表示递归所有包。",st:7,d:5},
{q:"Go 的格式化工具（统一代码风格）是？",o:["gofmt / gofmt -w"," prettier"," black"," eslint"],a:0,why:"gofmt 强制统一缩进与排版，是 Go 社区约定。",st:7,d:5},
{q:"为函数打基准测试（性能）用？",o:["func BenchmarkXxx(b *testing.B)"," func PerfXxx"," func TestPerf"," func SpeedXxx"],a:0,why:"Benchmark 函数接收 *testing.B，go test -bench 运行。",st:7,d:5},
{q:"context.Context 常用于？",o:["传递截止时间、取消信号与请求范围值（尤其跨 goroutine/网络）"," 替代变量"," 字符串拼接"," 日志着色"],a:0,why:"context 是控制超时与取消的标准手段，避免 goroutine 泄漏。",st:7,d:5},
{q:"引入其他包用关键字？",o:["import \"path/to/pkg\""," using"," require(\"pkg\")"," include <pkg>"],a:0,why:"Go 用 import 引入包，未使用的导入会导致编译失败。",st:1,d:1},
{q:"Go 中声明常量用？",o:["const Pi = 3.14"," 不支持常量，只用 var"," 用 #define"," let 代替"],a:0,why:"const 声明编译期常量，常用于枚举式 iota。",st:1,d:1},
{q:"slice 的内部结构包含？",o:["指向底层数组的指针、长度 len、容量 cap"," 纯链表节点"," 哈希桶"," 红黑树节点"],a:0,why:"理解指针/len/cap 才能搞懂 append 扩容与切片共享底层数组的陷阱。",st:3,d:3},
{q:"Go 的接口设计哲学是？",o:["小接口组合优于大而全的继承"," 必须显式声明 implements"," 接口不能嵌套"," 只用于错误"],a:0,why:"如 io.Reader/io.Writer 这种小接口可被广泛组合复用。",st:4,d:4},
{q:"sync.Mutex 用来？",o:["为共享资源加互斥锁，防止并发读写竞争"," 在 goroutine 间传值"," 计时器"," 创建新的 goroutine"],a:0,why:"多 goroutine 访问同一变量时需加锁，或改用 channel。",st:5,d:5}
]};

