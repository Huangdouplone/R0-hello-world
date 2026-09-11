/* ============================================================
 * R0：从零开始的编程之路 · 课程数据：C 语言
 * 制作者 / Creator: Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * ============================================================ */
window.LANG_DATA = window.LANG_DATA || {};

const C_STAGES = [
{
  id:"c-s1", icon:"🚀", name:"启航与编译流程", desc:"认识 C、装好编译器、跑通第一个程序", lv:"basic",
  goal:"装好编译环境，理解「编辑 → 预处理 → 编译 → 汇编 → 链接 → 运行」的完整链路，能独立编译并运行一个 C 程序。",
  links:[["菜鸟教程 · C 语言入门","https://www.runoob.com/cprogramming/c-tutorial.html"],["C 语言中文网 · C 语言入门","https://c.biancheng.net/c/"]],
  lab:{t:"自我介绍程序 v2",req:["用 printf 输出 3 行：昵称、学 C 的目标、今天日期","使用至少两种格式控制（如 %s、%d、%5.2f）","给每个函数与关键行加注释，并用 -Wall 编译零警告"],starter:`#include <stdio.h>\n\nint main(void) {\n    // 1. 输出昵称\n    // 2. 输出学习目标\n    // 3. 输出今天的日期（年 月 日 三个整数）\n    return 0;\n}`,hint:"编译用 gcc -Wall -Wextra main.c -o main，打开警告能提前抓出大量隐藏 bug。",xp:20},
  lessons:[
  {id:"c-1-1",title:"认识 C：它适合做什么",min:8,summary:["C 是一门贴近硬件、可移植、效率极高的通用语言，1972 年诞生于贝尔实验室。","主战场：操作系统、嵌入式、驱动、数据库、编译器、高性能库——几乎所有现代软件的地基里都有 C。","C 的语法影响了 C++、Java、C#、JavaScript 等一大票语言，学好 C 等于掌握「编程语言的普通话」。"],code:`// C 的定位：给你近乎完全的控制权\n// 代价：内存、边界、类型安全都要你自己负责\n// 收获：你对计算机的理解会脱胎换骨`,pit:"别指望 C 帮你兜底：它几乎不做运行时检查，越界写内存不会报错，只会埋下一颗定时炸弹。",ex:{q:"C 和 Python 最大的区别是什么？",a:"参考：C 是编译型、静态类型、手动管理内存，贴近硬件性能高；Python 是解释型、动态类型、自动内存管理，开发效率高。两者是「控制力」与「效率」的取舍。"},target:"能用一句话说清 C 的定位与代价。"},
  {id:"c-1-2",title:"环境搭建：编译器与编辑器",min:15,summary:["Windows：安装 MinGW-w64 或 MSYS2（提供 gcc），或装 WSL 用 Linux 工具链；macOS 装 Xcode Command Line Tools；Linux 用包管理器装 gcc。","编辑器推荐 VS Code + C/C++ 插件，或 CLion；初学也可先用在线编译器（godbolt / onlinegdb）。","关键命令：gcc --version 验证安装，gcc main.c -o main 编译，./main 运行。"],code:`# 验证编译器\ngcc --version\n# 编译并运行\ngcc main.c -o main\n./main`,pit:"命令行报「gcc 不是内部或外部命令」说明没加入 PATH；重装时勾选添加环境变量，或手动把 bin 目录加进 PATH。",ex:{q:"在线编译器和本地环境各适合什么时候用？",a:"入门头几天用在线编译器零门槛验证语法；正式学习一定要装本地环境，因为多文件项目、调试器和工程工具都离不开它。"},target:"成功打印编译器版本号，并编译运行一个 .c 文件。"},
  {id:"c-1-3",title:"第一个程序：逐行解剖 Hello World",min:10,summary:["#include <stdio.h> 是预处理指令，把标准输入输出库的声明搬进来。","int main(void) 是程序入口，操作系统从这里开始执行；int 是返回给系统的退出码。","printf 输出内容，\\n 换行；return 0 表示正常结束（非 0 表示异常）。"],code:`#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C!\\n");\n    return 0;\n}`,pit:"C 区分大小写：Printf、Main 都会编译失败；语句末尾的分号漏掉会报一堆莫名其妙的错。",ex:{q:"把 main 写成 void main() 会怎样？",a:"在多数教学编译器上能跑，但它不是标准写法（标准规定返回 int）。养成写 int main(void) 的习惯，可移植性才有保障。"},target:"能独立写出 Hello World 并解释每一行的作用。"},
  {id:"c-1-4",title:"编译四步：预处理 → 编译 → 汇编 → 链接",min:12,summary:["预处理：处理 #include、#define，展开宏与头文件，生成 .i。","编译：把 C 源码翻译成汇编代码，做语法与语义检查，生成 .s。","汇编：把汇编翻译成机器指令，生成目标文件 .o；链接：把多个 .o 和库拼成可执行文件。"],code:`gcc -E main.c -o main.i    # 预处理\ngcc -S main.i -o main.s    # 编译\ngcc -c main.s -o main.o    # 汇编\ngcc main.o -o main         # 链接`,pit:"改了代码没生效？因为运行的还是上次编译出来的文件——务必重新编译再运行。",ex:{q:"为什么报错有时出现在头文件里？",a:"因为 #include 是「文本替换」，头文件内容被整段搬进你的源文件，错误位置自然指向头文件里的那一行。"},target:"能用分步命令生成 .i/.s/.o，理解报错来自哪一步。"}
  ],
  quiz:[
   {q:"C 程序的入口函数是？",o:["start()","main()","run()","begin()"],a:1,why:"操作系统从 main 函数开始执行 C 程序。"},
   {q:"引入标准输入输出库应写？",o:["import stdio","#include <stdio.h>","using stdio","require stdio"],a:1,why:"#include 是预处理指令，用于把头文件内容包含进来。"},
   {q:"gcc -c 的作用是？",o:["只预处理","只编译到目标文件 .o","直接生成可执行文件","只做链接"],a:1,why:"-c 表示编译并汇编但不链接，产物是 .o 目标文件。"}
  ]
},
{
  id:"c-s2", icon:"🔢", name:"数据类型与运算", desc:"变量、整数表示、浮点精度与类型转换", lv:"basic",
  goal:"能正确选择类型，理解整数溢出与浮点误差，掌握隐式转换规则与强制类型转换。",
  links:[["cppreference · C 基本类型","https://zh.cppreference.com/w/c/language/types"],["菜鸟教程 · C 数据类型","https://www.runoob.com/cprogramming/c-data-types.html"]],
  lab:{t:"数值探测器",req:["用 sizeof 打印 char/short/int/long/long long/float/double 在当前机器的字节数","用 <limits.h> 打印 int 的最大最小值，并演示一次溢出（INT_MAX + 1）","计算 1.0/3 并分别用 %f、%.2f、%e 输出，观察精度差异"],starter:`#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    printf("int: %zu 字节\\n", sizeof(int));\n    // 打印其他类型的大小\n    // 打印 int 范围与溢出结果\n    // 用不同格式输出 1.0/3\n    return 0;\n}`,hint:"sizeof 的结果用 %zu 打印；溢出是有符号整数的未定义行为，观察结果即可，不要依赖。",xp:20},
  lessons:[
  {id:"c-2-1",title:"变量与基本类型",min:10,summary:["变量必须先声明后使用：类型 名字 = 初值; 例如 int score = 0;","整数：char、short、int、long、long long；浮点：float、double；还有 _Bool 与枚举。","sizeof(类型) 得到占用字节数——C 只规定最小宽度，具体大小随平台而变。"],code:`int age = 18;\nlong long big = 9000000000LL;\ndouble pi = 3.14159;\nchar grade = 'A';\nprintf("%zu %zu\\n", sizeof(int), sizeof(double));`,pit:"局部变量不初始化就是垃圾值，读取它属于未定义行为——声明时顺手给初值是最省事的保命习惯。",ex:{q:"存「一个人的年龄」和「全球人口」分别选什么类型？",a:"年龄用 int 足够；全球人口约 80 亿，超出 32 位 int 的 21 亿上限，要用 long long。"},target:"能声明各类型变量并用 sizeof 观察它们的大小。"},
  {id:"c-2-2",title:"整数的表示、范围与溢出",min:12,summary:["整数以补码存储：最高位是符号位，负数 = 取反加一，加减法因此可统一处理。","<limits.h> 提供 INT_MAX、INT_MIN、UINT_MAX 等宏；<stdint.h> 提供 int32_t、int64_t 等定宽类型。","有符号整数溢出是未定义行为（UB），程序可能「正确地」给出错误答案，甚至被编译器优化掉判断。"],code:`#include <limits.h>\n#include <stdint.h>\n\nint32_t a = INT32_MAX;\nprintf("%d\\n", a + 1);   // 溢出：未定义行为\nuint32_t b = 0;\nprintf("%u\\n", b - 1);   // 无符号回绕，结果是 UINT32_MAX`,pit:"sizeof(int) 在不同平台可能是 2 或 4 字节；需要确定宽度请直接用 int32_t / int64_t。",ex:{q:"为什么用 size_t 表示数组下标和长度？",a:"它是无符号且能容纳当前平台最大对象尺寸的类型，与 sizeof、strlen 的返回类型一致，避免符号比较警告。"},target:"能说出常见整型范围，知道溢出的危害并会用定宽类型。"},
  {id:"c-2-3",title:"浮点数与精度",min:10,summary:["float 通常 4 字节（约 7 位有效数字），double 8 字节（约 15 位）；C 中浮点字面量默认是 double。","浮点遵循 IEEE 754：由符号位、指数、尾数组成，很多十进制小数无法精确表示。","比较浮点不能用 ==，应判断差值是否小于容差：fabs(a - b) < 1e-9。"],code:`#include <math.h>\n\nprintf("%.17g\\n", 0.1);        // 看真实存储值\nif (fabs(0.1 + 0.2 - 0.3) < 1e-9)\n    printf("视为相等\\n");`,pit:"float f = 3.14; 会触发 double→float 的隐式收窄，写 3.14f 更严谨；用 %f 打印 double、%Lf 打印 long double。",ex:{q:"0.1 * 3 == 0.3 为什么可能是假？",a:"0.1 与 0.3 在二进制中都是无限循环，只能近似存储，累积误差导致比较失败——金融计算请用整数分或专用库。"},target:"理解浮点误差来源，能用容差正确比较浮点数。"},
  {id:"c-2-4",title:"运算符、优先级与类型转换",min:12,summary:["算术 + - * / %，关系与逻辑（C 没有 bool 字面量时用 0/1），位运算 & | ^ ~ << >>。","整数除法会截断小数：5/2 得 2；只要一边是浮点就得到浮点结果。","隐式转换遵循「整型提升 +  usual arithmetic conversions」；显式转换写 (类型)值，并注意符号扩展。"],code:`int a = 5, b = 2;\nprintf("%d %f\\n", a / b, (double)a / b);   // 2 2.500000\nprintf("%d\\n", 5 % 2);                     // 1`,pit:"-7 / 2 的截断方向、以及 (unsigned)-1 变成巨大正数，是 C 里最经典的两个转换陷阱。",ex:{q:"怎么判断一个整数是奇数？",a:"x % 2 != 0 更直观；但 x & 1 对负数同样有效且更快——注意 == 1 的写法对负数会失效。"},target:"能正确写出混合类型表达式并预测其结果。"}
  ],
  quiz:[
   {q:"5 / 2 的结果（int 相除）是？",o:["2.5","2","3","2.0"],a:1,why:"两个整数相除结果仍是整数，小数部分被截断。"},
   {q:"有符号整数溢出属于？",o:["回绕","未定义行为","抛异常","自动转 long"],a:1,why:"标准规定有符号溢出是 UB，编译器可做任何事，绝不能依赖。"},
   {q:"获取类型占用字节数用？",o:["lengthof","sizeof","countof","bytes()"],a:1,why:"sizeof 是编译期运算符，返回 size_t 类型的字节数。"}
  ]
},
{
  id:"c-s3", icon:"⌨️", name:"标准输入输出", desc:"printf 格式化、scanf 输入、字符 IO 与缓冲区", lv:"basic",
  goal:"能完成带交互的小程序，理解格式控制符与输入缓冲区的工作原理。",
  links:[["cppreference · printf","https://zh.cppreference.com/w/c/io/fprintf"],["cppreference · scanf","https://zh.cppreference.com/w/c/io/fscanf"]],
  lab:{t:"单位换算小工具",req:["读入一个摄氏温度（double）与一个长度（cm，int）","输出华氏度（保留 1 位小数）与英寸（保留 2 位小数）","用 %5.1f 之类的宽度控制让输出对齐成表格","当输入非法（scanf 返回值不等于期望个数）时提示并退出"],starter:`#include <stdio.h>\n\nint main(void) {\n    double c; int cm;\n    printf("输入摄氏温度和厘米数: ");\n    if (scanf("%lf %d", &c, &cm) != 2) {\n        printf("输入格式错误\\n");\n        return 1;\n    }\n    // 换算并格式化输出\n    return 0;\n}`,hint:"scanf 返回成功读入的项数，判断它是最基本的输入校验；double 必须用 %lf 读入。",xp:25},
  lessons:[
  {id:"c-3-1",title:"printf 格式化输出",min:10,summary:["printf(\"格式串\", 参数...)；格式串里 %d 整数、%f 浮点、%c 字符、%s 字符串、%p 指针。","宽度与精度：%5d 占 5 字符宽、%.2f 保留两位小数、%-8s 左对齐、%05d 补零。","printf 返回成功输出的字符数，出错返回负值——调试输出时偶尔有用。"],code:`int n = 42;\ndouble x = 3.14159;\nprintf("[%5d]\\n", n);      // [   42]\nprintf("[%-5d]\\n", n);     // [42   ]\nprintf("[%.2f]\\n", x);     // [3.14]`,pit:"格式符与参数类型不匹配是 UB：用 %d 打印 double 会输出完全无意义的值，务必一一对应。",ex:{q:"printf(\"%d\", 3.14) 会怎样？",a:"未定义行为，通常打印出乱七八糟的整数；打开 -Wformat 警告可以让编译器提前帮你抓出来。"},target:"能用 printf 完成对齐、定宽、定精度的输出。"},
  {id:"c-3-2",title:"scanf 输入与取地址符",min:12,summary:["scanf(\"%d\", &x) 从标准输入读入；& 取地址，因为函数需要知道把值写到哪里。","scanf 返回成功读入的项数，用它判断输入是否合法。","读入 double 必须用 %lf，读入 float 用 %f；读入字符串用 %s（遇空白停止）。"],code:`int age;\nprintf("年龄: ");\nif (scanf("%d", &age) == 1)\n    printf("明年 %d 岁\\n", age + 1);\nelse\n    printf("输入不是整数\\n");`,pit:"忘写 & 是新手第一大坑——scanf 会把读入的值写到「age 的值当作地址」的地方，直接段错误。",ex:{q:"scanf(\"%d,%d\", &a, &b) 要求输入什么格式？",a:"格式串里的非格式字符必须原样匹配，所以要输入 3,4；输入 3 4 会匹配失败。"},target:"能读入整数与小数，并用返回值做基本校验。"},
  {id:"c-3-3",title:"字符 IO：getchar 与 putchar",min:8,summary:["getchar() 从标准输入读一个字符并返回 int（不是 char！），失败或到末尾返回 EOF。","putchar(c) 输出一个字符，比 printf(\"%c\") 更轻量。","标准输入是行缓冲：你敲的字符会先攒着，直到按下回车才送到程序。"],code:`int c;\nwhile ((c = getchar()) != EOF) {\n    if (c >= 'a' && c <= 'z') c -= 32;\n    putchar(c);\n}`,pit:"用 char 接收 getchar 的返回值无法区分 EOF(-1) 与合法字节 0xFF，必须用 int。",ex:{q:"为什么输入后没反应，按回车才执行？",a:"终端处于行缓冲模式（canonical mode），只有换行才把整行提交给程序；可用 setvbuf 或改终端模式调整。"},target:"能用 getchar 循环处理字符，理解 EOF 的含义。"},
  {id:"c-3-4",title:"行输入 fgets 与缓冲区陷阱",min:12,summary:["scanf 读完数字会把换行留在缓冲区，紧接着读字符串就会读到空行——这是经典 bug。","读一整行用 fgets(buf, sizeof buf, stdin)，它会保留末尾的 \\n，通常需要手动去掉。","混合输入时，要么统一用 fgets + sscanf 解析，要么在读字符前清空缓冲区。"],code:`char line[128];\nif (fgets(line, sizeof line, stdin)) {\n    line[strcspn(line, "\\n")] = '\\0';   // 去掉换行\n    printf("你输入了: %s\\n", line);\n}`,pit:"gets() 不检查缓冲区长度，早已被标准废弃——永远用 fgets 代替它。",ex:{q:"scanf 后紧跟 gets/fgets 为什么会读到空行？",a:"scanf 只读走了数字，把回车留在输入缓冲区；紧接着的行读入函数立刻读到一个只剩换行的空行。"},target:"能用 fgets 安全地读入一行文本，并绕开换行残留问题。"}
  ],
  quiz:[
   {q:"scanf 读入 int 变量时参数应写？",o:["x","&x","*x","(int)x"],a:1,why:"需要传变量地址，函数才能把值写回去。"},
   {q:"读入 double 类型应使用的格式符是？",o:["%f","%lf","%Lf","%d"],a:1,why:"scanf 中 double 用 %lf，float 才用 %f（printf 中两者都用 %f）。"},
   {q:"安全读入一整行的函数是？",o:["gets","fgets","scanf %s","getchar"],a:1,why:"gets 无法限制长度已废弃；fgets 需指定缓冲区大小，是安全替代。"}
  ]
},
{
  id:"c-s4", icon:"🔀", name:"控制流", desc:"分支、循环、跳转与常见模式", lv:"basic",
  goal:"能用分支与循环解决累加、查找、打印图案类问题，并写出边界正确的循环。",
  links:[["菜鸟教程 · C 判断与循环","https://www.runoob.com/cprogramming/c-decision.html"],["cppreference · if 语句","https://zh.cppreference.com/w/c/language/if"]],
  lab:{t:"九九乘法表与素数筛",req:["用双重 for 打印九九乘法表，用 \\t 对齐，只输出下三角","写 is_prime(int n) 判断素数（只需试除到 sqrt(n)）","打印 2~100 之间的所有素数，每行 5 个"],starter:`#include <stdio.h>\n\nint is_prime(int n) {\n    if (n < 2) return 0;\n    for (int i = 2; i * i <= n; i++)\n        if (n % i == 0) return 0;\n    return 1;\n}\n\nint main(void) {\n    // 1. 打印九九乘法表\n    // 2. 打印 2~100 的素数，每 5 个一行\n    return 0;\n}`,hint:"i * i <= n 比 i <= sqrt(n) 更快且无浮点误差；每 5 个换行用计数器取模判断。",xp:25},
  lessons:[
  {id:"c-4-1",title:"if / else 与 switch",min:10,summary:["if(条件) 条件为真（非 0）时执行；else 处理否则分支，可级联成 else if 链。","switch(整型表达式) 在多常量间选择，case 后必须是整型常量，default 兜底。","C99 起有 _Bool 类型，包含 <stdbool.h> 后可用 bool / true / false。"],code:`switch (day) {\n    case 1: printf("周一\\n"); break;\n    case 2: printf("周二\\n"); break;\n    default: printf("其他\\n");\n}`,pit:"case 后忘记 break 会「贯穿」执行下一个 case——偶尔被刻意利用，但多数时候是 bug。",ex:{q:"if (x = 0) 会发生什么？",a:"这是赋值而非比较，表达式值为 0（假），分支永远不执行。写成 if (0 == x) 可让编译器帮你抓出这个错。"},target:"能用 if 链与 switch 完成多分支选择。"},
  {id:"c-4-2",title:"for / while / do-while",min:10,summary:["for(初值; 条件; 步进) 适合已知次数的循环；C99 起可在 for 内定义循环变量。","while(条件) 先判断后执行，可能一次都不跑；do { } while(条件); 先跑一次再判断。","循环体只有一条语句时可省略大括号，但强烈建议永远写上。"],code:`int sum = 0;\nfor (int i = 1; i <= 100; i++) {\n    sum += i;\n}\nprintf("%d\\n", sum);   // 5050`,pit:"循环体内忘了更新循环变量就是死循环；for(;;) 是合法的无限循环写法，靠 break 退出。",ex:{q:"for(int i=0;i<5;i++) 结束后 i 的值能用吗？",a:"不能——C99 中 i 的作用域仅限循环体内，循环外不可见（这也是推荐写法）。"},target:"能写出正确的计数循环与条件循环。"},
  {id:"c-4-3",title:"break / continue / goto",min:8,summary:["break 跳出最内层循环或 switch；continue 跳过本轮剩余语句进入下一轮。","goto 可跳到同一函数内的标签，唯一被广泛认可的用途是出错时统一清理资源。","滥用 goto 会让控制流变成「意大利面」，日常逻辑请使用结构化语句。"],code:`for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;   // 跳过偶数\n    if (i > 7) break;           // 提前结束\n    printf("%d ", i);           // 1 3 5 7\n}`,pit:"在 while 里用 continue 要特别小心：如果更新语句在 continue 之后，会直接死循环。",ex:{q:"多重循环里想一次跳出怎么办？",a:"C 没有带标签的 break；通常用标志变量、把循环封装成函数用 return 返回，或（少数情况）用 goto。"},target:"理解三种跳转语句的适用场景与风险。"},
  {id:"c-4-4",title:"常见循环模式与边界",min:10,summary:["遍历数组：for (i = 0; i < n; i++)，n 是长度，注意「差一错误」。","累加/计数/找极值：初值的选择很关键（求和初值 0，求积初值 1，找最小初值用首元素）。","哨兵循环：读到特定值（如 -1 或 EOF）结束，适合输入数量未知的场景。"],code:`int a[] = {3, 1, 4, 1, 5};\nint n = sizeof(a) / sizeof(a[0]);\nint max = a[0];\nfor (int i = 1; i < n; i++)\n    if (a[i] > max) max = a[i];`,pit:"sizeof(数组名) 得到总字节数，sizeof(指针) 只得到指针大小——数组传参退化成指针后，这个技巧就失效了。",ex:{q:"为什么数组作为函数参数后算不出长度？",a:"数组传参会退化为指向首元素的指针，形参只拿到地址，所以必须额外传一个长度参数。"},target:"能写出边界正确的遍历、累加与哨兵循环。"}
  ],
  quiz:[
   {q:"先执行一次再判断的循环是？",o:["for","while","do-while","if"],a:2,why:"do-while 的循环体至少执行一次。"},
   {q:"switch 中 break 的作用是？",o:["结束程序","跳出 switch，防止贯穿","跳过下一次循环","返回函数"],a:1,why:"没有 break 会继续执行下一个 case 的语句。"},
   {q:"计算数组元素个数的常用写法是？",o:["sizeof(a)","sizeof(a)/sizeof(a[0])","length(a)","count(a)"],a:1,why:"总字节数除以单个元素字节数，且仅在数组未退化为指针时有效。"}
  ]
},
{
  id:"c-s5", icon:"🧩", name:"函数与作用域", desc:"原型、值传递、链接性与递归", lv:"adv",
  goal:"会把程序拆成函数，理解值传递与存储类别，能用递归解决问题。",
  links:[["cppreference · 函数声明","https://zh.cppreference.com/w/c/language/function_declaration"],["菜鸟教程 · C 函数","https://www.runoob.com/cprogramming/c-functions.html"]],
  lab:{t:"多文件计算器",req:["新建 calc.h 声明 add/sub/mul/div，calc.c 实现它们","main.c 读入两个数与运算符，调用 calc 里的函数并输出结果","除法时检查除数为 0，返回错误码而不是崩溃","用 gcc main.c calc.c -o calc 编译（体会多文件与头文件的作用）"],starter:`/* calc.h */\n#ifndef CALC_H\n#define CALC_H\nint add(int a, int b);\nint sub(int a, int b);\n// 声明其余函数\n#endif\n\n/* main.c */\n#include <stdio.h>\n#include "calc.h"\n\nint main(void) {\n    printf("%d\\n", add(3, 4));\n    return 0;\n}`,hint:"头文件里只放声明不放定义；#ifndef 守卫防止重复包含。",xp:30},
  lessons:[
  {id:"c-5-1",title:"函数的定义、声明与原型",min:10,summary:["定义 = 写出函数体；声明（原型）= 告诉编译器「有这么个函数」，形如 int add(int, int);。","调用前必须已有声明或定义，否则老标准会隐式声明导致类型推断错误。","参数列表写 void 表示无参数（int f(void)），空括号在 C 中含义模糊，别这么写。"],code:`#include <stdio.h>\n\nint add(int a, int b);        // 原型\n\nint main(void) {\n    printf("%d\\n", add(2, 3));\n    return 0;\n}\n\nint add(int a, int b) {       // 定义\n    return a + b;\n}`,pit:"函数定义在调用之后又没写原型，C99 之后是直接报错——这正是原型存在的意义。",ex:{q:"声明和定义的区别是什么？",a:"声明只说明「名字与签名」，可出现多次；定义分配代码/存储，只能有一次。"},target:"能用头文件 + 原型组织多函数程序。"},
  {id:"c-5-2",title:"参数传递：C 只有值传递",min:12,summary:["C 的参数传递一律是值传递：形参拿到的是实参的副本，修改形参不影响实参。","想让函数修改外部变量，就传它的地址（指针），在函数里用 *p 解引用修改——这是「模拟引用传递」。","数组作为参数时会退化为指针，所以函数内对数组元素的修改会反映到外部。"],code:`void swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint x = 1, y = 2;\nswap(&x, &y);   // 必须传地址`,pit:"void swap(int a, int b) 完全无效——交换的只是两个副本，调用结束后什么都没变。",ex:{q:"为什么数组不需要取地址就能在函数里被修改？",a:"数组名在传参时退化为指向首元素的指针，函数通过指针直接访问同一块内存。"},target:"能用指针参数实现 swap 与「多返回值」。"},
  {id:"c-5-3",title:"作用域、链接性与 static / extern",min:12,summary:["块作用域（{} 内）、文件作用域（函数外）、函数原型作用域三种。","static 修饰局部变量：延长生命周期到程序结束，但作用域不变；修饰全局变量/函数：把链接性限制为本文件（信息隐藏）。","extern 声明「这个变量/函数在别处定义」，用于跨文件共享全局变量。"],code:`static int count = 0;      // 文件作用域，仅本文件可见\n\nvoid hit(void) {\n    static int n = 0;      // 只初始化一次\n    n++;\n    count = n;\n}`,pit:"不要把 static 局部变量当成「线程安全」的计数器——多线程下需要原子或加锁。",ex:{q:"全局变量加 static 有什么用？",a:"把它变成文件私有，避免与其他文件的同名符号冲突，是 C 里实现模块封装的主要手段。"},target:"能用 static 隐藏模块内部符号，理解变量生命周期。"},
  {id:"c-5-4",title:"递归与存储类别",min:12,summary:["递归 = 函数调用自身，必须有基线条件，且每步向基线收敛。","每次调用都会在栈上创建新的栈帧，递归过深会导致栈溢出（stack overflow）。","存储类别：auto（默认，栈上）、static（静态区）、register（建议放寄存器）、extern（引用外部）。"],code:`int fact(int n) {\n    if (n <= 1) return 1;      // 基线条件\n    return n * fact(n - 1);\n}\nprintf("%d\\n", fact(5));   // 120`,pit:"别用递归算斐波那契：重复子问题导致指数级复杂度，改写为循环或记忆化。",ex:{q:"递归和循环如何取舍？",a:"树/图遍历、分治（快排、归并）用递归更自然；线性累加、简单遍历用循环更快更省栈。"},target:"能写出阶乘、斐波那契递归并说明其复杂度风险。"}
  ],
  quiz:[
   {q:"想在函数里修改调用方的 int 变量，参数应写成？",o:["int x","int *x","int &x","int x[]"],a:1,why:"C 只有值传递，必须传指针并通过解引用修改。"},
   {q:"static 修饰全局变量的效果是？",o:["只能本文件访问","只能本函数访问","程序结束才销毁","自动初始化为 1"],a:0,why:"把外部链接改为内部链接，实现文件级封装。"},
   {q:"递归函数缺少基线条件会导致？",o:["返回 0","栈溢出","编译错误","无限循环但不崩"],a:1,why:"每次调用都压栈，栈空间耗尽即崩溃。"}
  ]
},
{
  id:"c-s6", icon:"🧺", name:"数组与字符串", desc:"一维多维数组、字符数组与 string.h", lv:"adv",
  goal:"能熟练操作数组与字符串，理解数组名与指针的关系，会用标准字符串函数。",
  links:[["cppreference · 数组","https://zh.cppreference.com/w/c/language/array"],["cppreference · 字符串库","https://zh.cppreference.com/w/c/string/byte"]],
  lab:{t:"单词统计与字符串工具",req:["实现 my_strlen / my_strcpy / my_strcmp，不调用 string.h 的函数","实现 count_words(char *s)，统计以空白分隔的单词数","读入一行文本并输出字符数、单词数、以及反转后的字符串"],starter:`#include <stdio.h>\n\nsize_t my_strlen(const char *s) {\n    size_t n = 0;\n    while (s[n]) n++;\n    return n;\n}\n\nint main(void) {\n    char line[256];\n    // fgets 读入一行，去掉换行后统计\n    return 0;\n}`,hint:"字符串以 \\0 结尾，遍历到 \\0 即结束；注意缓冲区大小必须留一个字节给结尾符。",xp:30},
  lessons:[
  {id:"c-6-1",title:"一维数组与遍历",min:10,summary:["数组是相同类型元素的连续内存块：int a[5]; 下标从 0 到 4。","初始化：int a[5] = {1,2,3}; 未指定的元素自动为 0；int a[] = {1,2,3}; 长度由初值推导。","C 不检查下标越界，a[5] 会写到数组之外的内存——这是 C 最常见的安全漏洞来源。"],code:`int a[5] = {1, 2, 3};\nint n = sizeof(a) / sizeof(a[0]);\nfor (int i = 0; i < n; i++)\n    printf("%d ", a[i]);`,pit:"数组长度必须是编译期常量（变长数组 VLA 是 C99 可选特性，且 C11 后不强制支持），动态大小请用 malloc。",ex:{q:"int a[5] = {0}; 是什么意思？",a:"把首元素显式置 0，其余元素由编译器自动补 0——这是清零整个数组的标准写法。"},target:"能声明、初始化并安全遍历数组。"},
  {id:"c-6-2",title:"二维数组与多维数组",min:10,summary:["int a[3][4] 在内存中仍是按行连续存放的（行优先），a[i][j] 等价于 *(*(a+i)+j)。","初始化可写成 int a[2][3] = {{1,2,3},{4,5,6}};，内层大括号可省略但不建议。","作为函数参数时必须指定除第一维外的所有长度：void f(int a[][4], int rows)。"],code:`int m[2][3] = {{1, 2, 3}, {4, 5, 6}};\nfor (int i = 0; i < 2; i++)\n    for (int j = 0; j < 3; j++)\n        printf("%d ", m[i][j]);`,pit:"二维数组传参退化成「指向含有 4 个 int 的数组的指针」，写错列数会导致访问错位。",ex:{q:"为什么动态二维数组常用「指针数组」或「一维数组模拟」？",a:"因为真正的二维 VLA 支持不统一；用 malloc 分配 rows*cols 的一块连续内存，再手动算下标，兼容性最好。"},target:"能正确声明、遍历二维数组并作为函数参数传递。"},
  {id:"c-6-3",title:"字符数组与字符串",min:12,summary:["C 没有原生字符串类型，字符串就是「以 \\0 结尾的字符数组」。","char s[] = \"hi\" 会自动分配 3 字节（含结尾 \\0）；char *s = \"hi\" 指向只读字面量，修改它是 UB。","字符串长度 strlen 不包含结尾符，但存储需要 +1 字节——分配缓冲区时必须记得。"],code:`char s[] = "hi";\nprintf("%zu %zu\\n", sizeof(s), strlen(s));  // 3 2\ns[0] = 'H';        // OK：数组可写\n// char *p = "hi"; p[0] = 'H';  错误：字面量只读`,pit:"char *p = \"hello\"; 应写成 const char *p = \"hello\";，让编译器帮你拦住误写。",ex:{q:"char s[3] = \"abc\"; 有什么问题？",a:"数组没有空间放结尾的 \\0，strlen 等函数会一直往后读，产生越界。至少要 char s[4]。"},target:"理解 \\0 的作用，能安全声明与修改字符串。"},
  {id:"c-6-4",title:"常用字符串函数 string.h",min:12,summary:["长度与拷贝：strlen、strcpy、strncpy、memcpy（memcpy 不处理重叠，重叠用 memmove）。","比较与查找：strcmp、strncmp、strchr、strstr；拼接：strcat、strncat。","带 n 的版本会限制长度，显著更安全；strncpy 不保证补 \\0，需手动收尾。"],code:`char buf[32];\nstrncpy(buf, src, sizeof(buf) - 1);\nbuf[sizeof(buf) - 1] = '\\0';   // 手动收尾\nif (strcmp(buf, "quit") == 0) printf("再见\\n");`,pit:"strcmp 相等时返回 0（不是 1），写 if (strcmp(a,b)) 的逻辑正好是「不相等」。",ex:{q:"strcpy 和 memcpy 的区别？",a:"strcpy 遇到 \\0 停止且只用于字符串；memcpy 按字节数拷贝任意数据，不检查 \\0，也不处理内存重叠。"},target:"能安全使用带 n 的字符串函数完成拷贝与比较。"}
  ],
  quiz:[
   {q:"char s[] = \"hi\"; 的 sizeof(s) 是？",o:["2","3","4","取决于指针"],a:1,why:"字符串字面量含结尾空字符，共 3 字节。"},
   {q:"strcmp(a, b) 在两串相等时返回？",o:["1","0","-1","正数"],a:1,why:"返回 0 表示相等，非零表示不等。"},
   {q:"二维数组作为函数参数时？",o:["全部维度都可省略","只能省略第一维","必须写全所有维度","不能传参"],a:1,why:"除第一维外都必须给出，编译器才能计算行内偏移。"}
  ]
},
{
  id:"c-s7", icon:"👉", name:"指针：C 的核心", desc:"地址、解引用、指针运算与指针参数", lv:"hard",
  goal:"真正理解指针，能读写指针、做指针运算、用指针传参，并读懂 const 与指针的组合。",
  links:[["cppreference · 指针","https://zh.cppreference.com/w/c/language/pointer"],["C 语言中文网 · C 指针详解","https://c.biancheng.net/c/pointer/"]],
  lab:{t:"用指针实现数组工具",req:["用指针（不用下标）实现 sum_arr(const int *p, int n)","实现 reverse(int *p, int n)，原地反转数组（双指针法）","实现 my_strchr(const char *s, char c)，返回首次出现位置的指针，找不到返回 NULL","main 里测试以上三个函数并检查 NULL 情况"],starter:`#include <stdio.h>\n\nint sum_arr(const int *p, int n) {\n    int s = 0;\n    while (n--) s += *p++;\n    return s;\n}\n\nvoid reverse(int *p, int n) {\n    int *l = p, *r = p + n - 1;\n    while (l < r) {\n        int t = *l; *l = *r; *r = t;\n        l++; r--;\n    }\n}`,hint:"指针比较只在同一个数组内才有定义；const int *p 表示「不能通过 p 修改指向的值」。",xp:35},
  lessons:[
  {id:"c-7-1",title:"什么是指针：地址与解引用",min:10,summary:["指针是「存放地址的变量」：int *p = &x; 表示 p 存放 x 的地址。","& 取地址，* 解引用（取地址上的值）；声明里的 * 只是类型标记。","未初始化的指针（野指针）指向随机地址，解引用它几乎必崩——声明时即置 NULL。"],code:`int x = 10;\nint *p = &x;\nprintf("%p %d\\n", (void *)p, *p);\n*p = 20;            // 通过指针改 x\nprintf("%d\\n", x);  // 20`,pit:"int *p, q; 只把 p 声明成指针，q 仍是 int——一行声明多个指针要写 int *p, *q;",ex:{q:"指针变量自己占多大内存？",a:"同一平台上所有对象指针大小相同（64 位通常 8 字节），与它指向的类型无关。"},target:"能声明指针、取地址、解引用并解释每一步。"},
  {id:"c-7-2",title:"指针运算",min:12,summary:["p + 1 不是地址加 1，而是加「一个所指类型的大小」，这就是指针运算的类型感知。","两指针相减得到它们之间相差的元素个数（ptrdiff_t），但只有同一数组内才有定义。","指针支持 ++/--、比较、与整数加减；解引用 *(p+i) 等价于 p[i]。"],code:`int a[] = {10, 20, 30};\nint *p = a;\nprintf("%d %d\\n", *p, *(p + 2));   // 10 30\nprintf("%td\\n", (p + 2) - p);      // 2`,pit:"越界的指针运算（包括「刚好越过末尾一个」之外的）都是未定义行为，不能拿来做比较或解引用。",ex:{q:"为什么 void* 不能做指针运算？",a:"void 没有大小信息，编译器不知道该加几个字节；需要先转成具体类型指针。"},target:"能用指针运算遍历数组并理解其按类型缩放。"},
  {id:"c-7-3",title:"指针与数组的关系",min:12,summary:["数组名在多数表达式中退化为指向首元素的指针，所以 a[i] 等价于 *(a+i)。","区别在于：数组名不是变量（不能被赋值），sizeof(数组名) 得到整个数组大小。","传参时数组退化为指针，所以函数内 sizeof(参数) 只得到指针大小。"],code:`int a[3] = {1, 2, 3};\nint *p = a;            // 等价于 &a[0]\nprintf("%d %d\\n", a[1], *(p + 1));   // 2 2\n// a = p;  错误：数组名不可赋值`,pit:"&a 与 a 数值相同但类型不同：&a 是「指向含 3 个 int 的数组的指针」，&a + 1 会跳过整个数组。",ex:{q:"函数参数写 int a[] 和 int *a 有区别吗？",a:"完全等价，编译器都当作 int *a；写 [] 只是提示调用者「这里期望一个数组」。"},target:"能解释数组与指针的异同，并正确传参。"},
  {id:"c-7-4",title:"指针参数与 const 限定",min:12,summary:["想让函数改外部变量，就传指针；不希望被改就加 const，是最有力的文档与保护。","const int *p：指向的值不可改；int *const p：指针本身不可改；const int *const p：都不可改。","NULL 表示空指针，解引用 NULL 必然崩溃——函数返回指针时要用 NULL 表示失败。"],code:`void print_arr(const int *p, int n) {   // 承诺不修改\n    for (int i = 0; i < n; i++) printf("%d ", p[i]);\n}\n\nint *find(int *p, int n, int v) {\n    for (int i = 0; i < n; i++) if (p[i] == v) return p + i;\n    return NULL;\n}`,pit:"把 const 指针赋值给非 const 指针会警告；需要「只读入参」时务必加 const，能提前挡住一堆误改。",ex:{q:"如何记忆 const 的位置？",a:"看 const 修饰谁：const 在 * 左边修饰「指向的数据」，在 * 右边修饰「指针本身」。"},target:"能用 const 正确表达「只读参数」，用 NULL 表达失败。"}
  ],
  quiz:[
   {q:"int *p; p 存放的是？",o:["整数值","地址","数组","函数名"],a:1,why:"指针变量的值是另一个对象的地址。"},
   {q:"对 int 指针 p，p+1 实际地址增加？",o:["1 字节","sizeof(int) 字节","4 字节","8 字节"],a:1,why:"指针运算按所指类型大小缩放。"},
   {q:"const int *p 的含义是？",o:["指针不可改","指向的值不可改","两者都不可改","无意义"],a:1,why:"const 在 * 左侧，修饰指向的数据。"}
  ]
},
{
  id:"c-s8", icon:"🧠", name:"内存管理", desc:"栈与堆、malloc/free 与常见内存错误", lv:"hard",
  goal:"理解程序内存布局，能正确申请释放堆内存，识别并修复泄漏、越界、悬垂指针。",
  links:[["cppreference · malloc","https://zh.cppreference.com/w/c/memory/malloc"],["菜鸟教程 · C 内存管理","https://www.runoob.com/cprogramming/c-memory-management.html"]],
  lab:{t:"动态数组（可增长容器）",req:["用 struct 定义 DynArr { int *data; size_t size, cap; }","实现 init / push（满了就 realloc 扩容为 2 倍）/ free_all","push 时检查 malloc、realloc 返回值，失败要能优雅处理","main 里循环读入整数直到 EOF，最后打印元素个数与内容，退出前释放"],starter:`#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    size_t size;\n    size_t cap;\n} DynArr;\n\nint push(DynArr *a, int v) {\n    if (a->size == a->cap) {\n        size_t nc = a->cap ? a->cap * 2 : 4;\n        int *nd = realloc(a->data, nc * sizeof *nd);\n        if (!nd) return -1;\n        a->data = nd; a->cap = nc;\n    }\n    a->data[a->size++] = v;\n    return 0;\n}`,hint:"realloc 失败时返回 NULL 且原内存仍有效，所以要用临时指针接收，别直接覆盖原指针。",xp:40},
  lessons:[
  {id:"c-8-1",title:"程序的内存布局",min:10,summary:["典型布局（低地址到高地址）：代码段 → 已初始化数据段 → BSS → 堆 → 栈 → 内核区。","栈：函数调用自动分配，存放局部变量与返回地址，速度快、空间小、自动回收。","堆：手动申请释放，空间大、灵活；静态区：全局变量与 static 变量，程序整个生命周期有效。"],code:`int g;                 // BSS（未初始化，自动清零）\nstatic int s = 1;      // 数据段\nvoid f(void) {\n    int local;         // 栈\n    int *p = malloc(sizeof *p);  // 堆\n    free(p);\n}`,pit:"不要返回指向栈上局部变量的指针——函数返回后那块内存就失效了，这是悬垂指针的头号来源。",ex:{q:"大数组为什么要放堆或全局，而不是栈上？",a:"栈空间通常只有几 MB，大局部数组会直接栈溢出；堆的容量只受可用内存限制。"},target:"能画出内存布局并说明各区域生命周期。"},
  {id:"c-8-2",title:"malloc / calloc / realloc / free",min:12,summary:["malloc(size) 申请未初始化的内存；calloc(n, size) 申请并清零；realloc 调整大小；free 释放。","必须检查返回值：申请失败返回 NULL，不检查就会在 NULL 上解引用崩溃。","sizeof *p 的写法比 sizeof(int) 更好——改类型时不会漏改。"],code:`int *p = malloc(n * sizeof *p);\nif (!p) { /* 处理失败 */ }\nfree(p);\np = NULL;   // 释放后置空，避免悬垂`,pit:"free 之后指针值不变但内存已归系统，再访问就是悬垂指针；释放后置 NULL 是好习惯。",ex:{q:"calloc 相比 malloc 有什么额外好处？",a:"除了清零，calloc(n, size) 还会检查 n*size 是否溢出（部分实现），对大块分配更安全。"},target:"能正确申请、检查与释放堆内存。"},
  {id:"c-8-3",title:"四类经典内存错误",min:12,summary:["内存泄漏：申请后忘记释放，长时间运行的程序会逐渐吃光内存。","越界访问：写/读超出申请范围，可能破坏相邻数据或触发崩溃。","悬垂指针与重复释放：free 后再用、或对同一块内存 free 两次，都是未定义行为。"],code:`char *p = malloc(8);\nstrcpy(p, "太长了会越界");   // 越界写\nfree(p);\n// free(p);               // 重复释放：UB\n// printf("%s", p);       // 悬垂访问：UB`,pit:"free(NULL) 是安全的（什么都不做），所以释放后置 NULL 再 free 不会出问题。",ex:{q:"如何系统性地发现内存错误？",a:"用 AddressSanitizer（gcc -fsanitize=address）查越界与悬垂，用 Valgrind 查泄漏与未初始化读。"},target:"能识别四类内存错误并知道用什么工具排查。"},
  {id:"c-8-4",title:"动态数据结构实现",min:12,summary:["链表：节点含数据与指向下一节点的指针，插入删除 O(1)，查找 O(n)。","重点关注「谁拥有这块内存、谁负责释放」——所有权是 C 资源管理的核心问题。","栈/队列/哈希表都可以在动态数组或链表之上实现，先想清内存归属再动手。"],code:`typedef struct Node {\n    int val;\n    struct Node *next;\n} Node;\n\nNode *push_front(Node *h, int v) {\n    Node *n = malloc(sizeof *n);\n    if (!n) return h;\n    n->val = v; n->next = h;\n    return n;\n}`,pit:"自引用结构体里必须写 struct Node *next，不能写 Node *next——typedef 名此时还没生效。",ex:{q:"删除链表节点时最容易错在哪？",a:"先保存 next 再 free，否则释放后就拿不到后继节点了；还要处理「删除头节点」需要改头指针的特殊情况。"},target:"能实现链表的增删，并正确释放整条链表。"}
  ],
  quiz:[
   {q:"malloc 失败时返回？",o:["0 长度内存","NULL","抛出异常","自动退出"],a:1,why:"返回 NULL 表示申请失败，必须检查。"},
   {q:"calloc 与 malloc 的区别是？",o:["calloc 会清零","calloc 更快","calloc 只能申请数组","没有区别"],a:0,why:"calloc 在分配后把内存全部初始化为 0。"},
   {q:"free 之后正确的做法是？",o:["继续使用直到程序结束","把指针置 NULL","再 free 一次确保释放","无需处理"],a:1,why:"置 NULL 可避免悬垂指针与重复释放。"}
  ]
},
{
  id:"c-s9", icon:"🧱", name:"结构体、联合与预处理器", desc:"struct / typedef / union / enum / 宏与头文件", lv:"hard",
  goal:"能用复合类型建模，理解内存对齐，会用预处理指令与头文件组织多文件项目。",
  links:[["cppreference · struct","https://zh.cppreference.com/w/c/language/struct"],["cppreference · 预处理器","https://zh.cppreference.com/w/c/preprocessor"]],
  lab:{t:"学生信息管理（多文件）",req:["在 student.h 定义 struct Student（姓名、学号、3 门成绩）与函数声明","student.c 实现录入、求平均、按平均分排序（用 qsort 的比较函数）","main.c 读入 3 名学生并输出按平均分降序的表格","用 #ifndef 守卫写头文件，编译为三个文件"],starter:`/* student.h */\n#ifndef STUDENT_H\n#define STUDENT_H\n\ntypedef struct {\n    char name[32];\n    int id;\n    double score[3];\n} Student;\n\ndouble avg(const Student *s);\n\n#endif`,hint:"qsort 的比较函数签名是 int cmp(const void*, const void*)，内部要先转成具体类型再比较。",xp:40},
  lessons:[
  {id:"c-9-1",title:"结构体 struct",min:10,summary:["struct 把不同类型的数据打包成一个整体：struct Point { int x; int y; };","访问成员用 .（对象）或 ->（指针）；结构体可以整体赋值（按值拷贝）。","结构体变量作参数会整体拷贝，大结构体建议传指针（可加 const）。"],code:`struct Point { int x; int y; };\nstruct Point p = {1, 2};\nstruct Point *q = &p;\nprintf("%d %d\\n", p.x, q->y);\nstruct Point r = p;   // 整体拷贝`,pit:"结构体里有指针时，整体赋值只拷贝指针值（浅拷贝），两份数据会共享同一块内存。",ex:{q:"结构体传参用值还是指针？",a:"小结构体（几个字节）传值简单安全；大结构体或需要修改时传指针，并用 const 表明只读。"},target:"能定义结构体并用 . 与 -> 正确访问成员。"},
  {id:"c-9-2",title:"typedef、嵌套与自引用",min:10,summary:["typedef 给类型起别名：typedef struct Point Point; 之后可直接写 Point p;","结构体可嵌套（成员是另一个结构体），也可自引用（成员是指向自身类型的指针）。","自引用是链表、树等数据结构的基础；注意在 struct 内部只能用 struct 标签名。"],code:`typedef struct Node Node;\nstruct Node {\n    int val;\n    Node *next;      // 自引用必须用指针\n};\nNode a = {1, NULL}, b = {2, &a};`,pit:"不要用 typedef 无意义地隐藏指针（typedef char* str;）——它会让 const 语义变得混乱难懂。",ex:{q:"结构体里能放「自身类型的对象」吗？",a:"不能，会无限递归导致大小无法计算；只能放指向自身的指针。"},target:"能用 typedef 简化类型名，实现自引用结构。"},
  {id:"c-9-3",title:"联合、枚举与位域",min:12,summary:["union 的所有成员共享同一块内存，大小等于最大成员，用于节省空间或做类型双关。","enum 定义具名常量集合，比散落的 #define 更类型安全、调试信息更友好。","位域 struct { unsigned a : 3; }; 可精确控制位宽，常用于硬件寄存器与协议解析。"],code:`union Value {\n    int i;\n    float f;\n};\nunion Value v;\nv.i = 1;\nprintf("%d %.1f\\n", v.i, v.f);   // 共享内存，含义随解释变`,pit:"union 写入一个成员再读另一个是「类型双关」，标准未定义其可移植行为，别依赖它做转换。",ex:{q:"enum 相比 #define 有什么优势？",a:"有作用域与类型、调试器能显示名字、编译器可检查 switch 是否遗漏分支（-Wswitch）。"},target:"能使用 union/enum，理解位域的用途。"},
  {id:"c-9-4",title:"预处理器与头文件",min:12,summary:["#define 定义宏，#include 包含文件，#if/#ifdef/#endif 条件编译。","宏是纯文本替换，不做类型检查：参数务必加括号，整体也加括号：#define SQR(x) ((x)*(x))。","头文件放声明与宏，源文件放实现；用 #ifndef 守卫防止重复包含。"],code:`#ifndef CONFIG_H\n#define CONFIG_H\n#define MAX_N 100\n#define SQR(x) ((x) * (x))\n#endif\n\n// SQR(1 + 2) 展开为 ((1+2)*(1+2)) = 9`,pit:"SQR(i++) 会展开成 ((i++)*(i++))，i 被自增两次——带副作用的实参绝不能传给宏。",ex:{q:"头文件守卫为什么必要？",a:"多个源文件嵌套包含同一头文件时，没有守卫会导致类型重复定义，直接编译失败。"},target:"能写带守卫的头文件，能用宏与条件编译。"}
  ],
  quiz:[
   {q:"结构体成员访问，指针变量应使用？",o:[".","->","::","*"],a:1,why:"指针用 ->，等价于 (*p).member。"},
   {q:"union 的大小等于？",o:["各成员之和","最大成员的大小","固定 8 字节","由编译器随意定"],a:1,why:"所有成员共享同一块内存，取最大者并考虑对齐。"},
   {q:"#define SQR(x) x*x 调用 SQR(1+2) 得到？",o:["9","5","3","编译错误"],a:1,why:"宏只做文本替换：1+2*1+2 = 5，所以宏参数必须加括号。"}
  ]
},
{
  id:"c-s10", icon:"📁", name:"文件、标准库与纵深", desc:"文件 IO、errno/assert、函数指针与未定义行为", lv:"hard",
  goal:"能完成文件读写与错误处理，理解函数指针与复杂声明，认识未定义行为并掌握调试工具。",
  links:[["cppreference · 文件 IO","https://zh.cppreference.com/w/c/io"],["cppreference · 未定义行为","https://zh.cppreference.com/w/c/language/behavior"]],
  lab:{t:"文本文件的词频统计",req:["打开一个文本文件，逐行 fgets 读入","按空白切分单词（用 strtok 或手写），用结构体数组统计词频","结果按频次降序写入另一个文件 result.txt","处理打不开文件、内存不足等情况，用 perror 输出错误并正确关闭文件"],starter:`#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    FILE *fp = fopen("input.txt", "r");\n    if (!fp) { perror("fopen"); return 1; }\n    char line[512];\n    while (fgets(line, sizeof line, fp)) {\n        // 去掉换行，切词，统计\n    }\n    fclose(fp);\n    return 0;\n}`,hint:"strtok 会修改原串且不可重入，多次切分注意状态；文件用完后一定要 fclose。",xp:40},
  lessons:[
  {id:"c-10-1",title:"文本文件读写",min:12,summary:["FILE *fp = fopen(路径, 模式)：r 读、w 写（清空）、a 追加、r+ / w+ 读写。"," fprintf / fscanf 用法同 printf / scanf，只是多了文件指针参数。","用完必须 fclose；打开失败返回 NULL，务必检查。"],code:`FILE *fp = fopen("a.txt", "w");\nif (!fp) { perror("fopen"); return 1; }\nfprintf(fp, "%d %.2f\\n", 42, 3.14);\nfclose(fp);`,pit:"以 w 模式打开已有文件会直接清空内容；写之前想清楚要不要用 a。",ex:{q:"文本模式与二进制模式的区别？",a:"Windows 下文本模式会把 \\n 转成 \\r\\n，还会把 Ctrl+Z 当文件结束；读写非文本数据必须用 rb/wb。"},target:"能打开、读写、关闭文本文件并处理失败情况。"},
  {id:"c-10-2",title:"二进制 IO 与随机访问",min:12,summary:["fread / fwrite 按字节块读写，适合结构体与二进制数据；注意结构体对齐与字节序问题。","fseek 移动文件位置、ftell 获取当前位置、rewind 回到开头；SEEK_SET/CUR/END 三种基准。","二进制序列化要考虑大小端与结构体填充，跨平台传输通常要手动打包字段。"],code:`FILE *fp = fopen("data.bin", "wb");\nint arr[3] = {1, 2, 3};\nfwrite(arr, sizeof arr[0], 3, fp);\nfclose(fp);\n\nfp = fopen("data.bin", "rb");\nfseek(fp, sizeof(int), SEEK_SET);   // 跳到第 2 个`,pit:"fread 的第二个参数是「每个元素大小」、第三个是「元素个数」，写反了会得到错误的结果与返回值。",ex:{q:"为什么直接 fwrite 整个结构体不可移植？",a:"不同编译器的对齐填充、整数大小端可能不同；可靠做法是按字段逐个写入固定宽度数据。"},target:"能用 fread/fwrite 与 fseek 完成二进制读写与定位。"},
  {id:"c-10-3",title:"标准库工具与错误处理",min:12,summary:["<stdlib.h>：qsort、bsearch、atoi/strtol、rand（配合 srand）、exit。","<errno.h> 的 errno 记录最近的错误码，perror / strerror 转成可读信息。","<assert.h> 的 assert 用于调试期断言，定义 NDEBUG 后会被全部移除。"],code:`#include <errno.h>\n#include <string.h>\n\nFILE *fp = fopen("nope.txt", "r");\nif (!fp) {\n    fprintf(stderr, "失败: %s\\n", strerror(errno));\n    return 1;\n}`,pit:"errno 只在函数「确实失败」后才有意义，成功调用不会把它清零，别拿 errno 判断成功与否。",ex:{q:"atoi 和 strtol 该用哪个？",a:"优先 strtol：它能检测非法输入与溢出，atoi 遇到非法字符直接返回 0，无法区分错误。"},target:"能用 qsort/strtol，并用 errno/perror 做错误处理。"},
  {id:"c-10-4",title:"函数指针、复杂声明与未定义行为",min:15,summary:["函数指针：int (*cmp)(int, int)，可用于回调（如 qsort 的比较函数）。","复杂声明按「从标识符出发，先右后左、括号优先」的螺旋法则解读。","未定义行为（UB）：越界、有符号溢出、悬垂解引用、序列点内多次修改同一变量等，编译器可做任何事。"],code:`int add(int a, int b) { return a + b; }\nint (*f)(int, int) = add;    // 函数指针\nprintf("%d\\n", f(2, 3));    // 5\n\n// int *a[10];      数组：10 个 int*\n// int (*a)[10];    指针：指向含 10 个 int 的数组\n// int (*f)(int);   函数指针`,pit:"i = i++ + 1; 是经典 UB：在同一序列点内对 i 修改了两次，不同编译器结果不同。",ex:{q:"typdef 简化函数指针有什么好处？",a:"typedef int (*Cmp)(const void*, const void*); 之后参数、返回值、数组声明都变得可读，是工程里的通行做法。"},target:"能读懂并写出函数指针与复杂声明，能识别常见 UB。"}
  ],
  quiz:[
   {q:"fopen 打开失败返回？",o:["EOF","NULL","0 长度文件","崩溃"],a:1,why:"返回 NULL，需用 perror 或 strerror(errno) 报告原因。"},
   {q:"int (*a)[10] 声明的是？",o:["10 个 int 指针的数组","指向含 10 个 int 数组的指针","函数指针","二维数组"],a:1,why:"括号让 * 先与 a 结合，所以是指针，指向 int[10]。"},
   {q:"下列属于未定义行为的是？",o:["数组越界写","定义未使用变量","使用 // 注释","多次 include"],a:0,why:"越界写破坏内存，标准不规定后果，属于 UB。"}
  ]
}
];

window.LANG_DATA.c = {
  name: "C",
  icon: "🅲",
  color: "#5b8def",
  phases: [
    {icon:"🌱",name:"第一篇 · 入门奠基",range:[0,3],desc:"环境、类型与运算、输入输出、控制流",wk:4},
    {icon:"🧱",name:"第二篇 · 函数与数组",range:[4,6],desc:"函数与作用域、数组字符串、指针核心",wk:5},
    {icon:"⚙️",name:"第三篇 · 内存与结构",range:[7,8],desc:"堆内存管理、结构体、联合与预处理器",wk:5},
    {icon:"🚀",name:"第四篇 · 系统纵深",range:[9,9],desc:"文件 IO、标准库、函数指针与未定义行为",wk:4}
  ],
  stages: C_STAGES
};
