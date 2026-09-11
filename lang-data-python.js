/* ============================================================
 * R0：从零开始的编程之路 · 课程数据：Python
 * 制作者 / Creator: Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * ------------------------------------------------------------
 * 数据结构（与主程序约定）：
 *   stages[i] = {
 *     id, icon, name, desc, lv("basic"|"adv"|"hard"), goal,
 *     links: [[名称, URL], ...],
 *     lab: {t, req:[...], starter, hint, xp},
 *     lessons: [{id, title, min, summary:[...], code, pit, ex:{q,a}, target}],
 *     quiz: [{q, o:[4个选项], a:正确下标, why}]
 *   }
 * ============================================================ */
window.LANG_DATA = window.LANG_DATA || {};

const PY_STAGES = [
{
  id:"py-s1", icon:"🚀", name:"启航与环境", desc:"认识 Python、装好环境、跑通第一行代码", lv:"basic",
  goal:"装好 Python 与虚拟环境，理解脚本与交互式两种运行方式，建立「写文件 → 运行 → 看结果」的心智模型。",
  links:[["Python 官方中文文档 · 教程","https://docs.python.org/zh-cn/3/tutorial/index.html"],["菜鸟教程 · Python3 基础","https://www.runoob.com/python3/python3-basic-syntax.html"]],
  lab:{t:"环境自检与自我介绍",req:["新建 intro.py，用三引号 docstring 在文件开头写一句说明","打印当前 Python 版本（sys.version）","打印你的昵称、学 Python 的目标、今天的日期（datetime.date.today()）"],starter:`import sys\nfrom datetime import date\n\n"""第一行写一句：这个脚本做什么"""\n\ndef main():\n    # 1. 打印 Python 版本\n    # 2. 打印昵称 / 目标 / 今天日期\n    pass\n\nif __name__ == "__main__":\n    main()`,hint:"if __name__ == \"__main__\": 让文件既能直接运行，也能被别的模块 import 而不执行测试代码。",xp:20},
  lessons:[
  {id:"py-1-1",title:"认识 Python：它适合做什么",min:8,summary:["Python 是一门解释型、动态类型的高级语言，语法接近自然语言，读起来像伪代码。","主战场：数据处理与分析、人工智能、Web 后端、自动化脚本与运维工具。","学习顺序：先跑起来 → 掌握核心语法 → 用标准库做小工具 → 再谈框架与工程。"],code:`# 你的第一行 Python\nprint("Hello, Python!")\n# 解释执行：写完就能跑，不需要编译步骤`,pit:"别陷入「Python 太慢」的焦虑——它通常是你把想法变成现实最快的路径，真遇到性能瓶颈再局部优化。",ex:{q:"举一件你身边能用 Python 自动化的事？",a:"参考：批量重命名文件、整理 Excel 报表、自动下载课件、定时提醒——凡是「重复且有规则」的事都值得自动化。"},target:"能说清 Python 是什么、擅长什么，并跑通第一行代码。"},
  {id:"py-1-2",title:"安装 Python 与虚拟环境",min:15,summary:["从 python.org 或 Miniconda 安装 Python 3.x；Windows 安装时务必勾选 Add python.exe to PATH。","用 python --version 验证安装，用 pip 安装第三方包。","每个项目建独立虚拟环境 python -m venv .venv，激活后再装包，避免版本互相污染。"],code:`python -m venv .venv\n# Windows 激活： .venv\\Scripts\\activate\n# macOS/Linux： source .venv/bin/activate\npip install requests\npip list`,pit:"系统里装了多个 Python 时，python 和 pip 可能指向不同版本；用 python -m pip install 最稳妥。",ex:{q:"为什么每个项目要单独建虚拟环境？",a:"不同项目可能依赖同一个包的不同版本。隔离后互不干扰，也方便用 requirements.txt 精确复现环境。"},target:"装好 Python，建一个虚拟环境并成功安装一个第三方包。"},
  {id:"py-1-3",title:"两种运行方式：交互式与脚本",min:10,summary:["交互式 REPL：命令行输入 python 进入 >>>，适合验证一小段代码、当计算器用。","脚本式：把代码写进 .py 文件，用 python hello.py 运行，这是可复用、可分享的正式方式。","编辑器推荐 VS Code（装 Python 插件）或 PyCharm。"],code:`# hello.py\nname = "Python"\nprint("Hello,", name)\n# 终端运行： python hello.py`,pit:"在 >>> 里写完复合语句要连按两次回车才执行；交互式里的变量名会残留，测结果不放心就重启。",ex:{q:"什么时候用 REPL，什么时候写脚本？",a:"验证语法、试一个函数效果用 REPL；要复用、要分享、要长期维护的代码一定写成 .py 文件。"},target:"能用 REPL 验证一行代码，也能新建 .py 文件并运行它。"},
  {id:"py-1-4",title:"缩进、注释与代码风格",min:8,summary:["Python 用缩进（4 个空格）表示代码块，取代其他语言的 {}，缩进错误直接报错。","注释用 #；模块/函数开头的三引号字符串是 docstring，可被 help() 读取。","遵循 PEP 8：变量小写加下划线、常量全大写、运算符两侧留空格、一行不超过 79~100 字符。"],code:`PI = 3.14159   # 常量习惯全大写\n\ndef area(r):\n    """计算圆面积——这就是文档字符串"""\n    return PI * r ** 2\n\nprint(area(2))`,pit:"不要混用空格和 Tab 缩进，会报 TabError；把编辑器设为「Tab 自动转 4 空格」。",ex:{q:"把 if 下面那行代码的缩进删掉会怎样？",a:"会报 IndentationError 或产生逻辑错误——缩进本身就是 Python 语法的一部分，不是排版习惯。"},target:"写出缩进正确、命名规范、带注释的小脚本。"}
  ],
  quiz:[
   {q:"Python 划分代码块依靠什么？",o:["大括号 {}","缩进","end 关键字","分号"],a:1,why:"Python 用缩进而非大括号划分代码块，这是它最标志性的语法。"},
   {q:"创建虚拟环境的命令是？",o:["python -m venv .venv","pip new env","python -m env","virtual python"],a:0,why:"venv 是标准库自带的虚拟环境模块，用 python -m venv 调用最可靠。"},
   {q:"运行脚本 hello.py 的正确命令是？",o:["run hello.py","python hello.py","python -c hello.py","exec hello"],a:1,why:"python 后面直接跟文件名即可执行脚本。"}
  ]
},
{
  id:"py-s2", icon:"🔢", name:"变量、类型与运算", desc:"名字与对象的绑定、数字字符串、真假判定", lv:"basic",
  goal:"理解动态类型与引用的本质，能正确做类型转换、格式化输出与条件判断。",
  links:[["Python 官方 · 内置类型","https://docs.python.org/zh-cn/3/library/stdtypes.html"],["菜鸟教程 · Python3 数字与字符串","https://www.runoob.com/python3/python3-number.html"]],
  lab:{t:"个人信息卡与 BMI 计算",req:["用 input 读入昵称、身高(m)、体重(kg)，转成 float","计算 BMI = 体重 / 身高²，输出保留 1 位小数","根据 BMI 输出一句评价（<18.5 偏瘦 / <24 正常 / 否则偏重）"],starter:`name = input("昵称: ")\nh = float(input("身高(m): "))\nw = float(input("体重(kg): "))\n\n# 计算 bmi 并按区间输出评价\nbmi = 0.0\nprint(f"{name} 的 BMI: {bmi:.1f}")`,hint:"f-string 里写 {bmi:.1f} 表示保留一位小数；多个条件用 if / elif / else。",xp:20},
  lessons:[
  {id:"py-2-1",title:"变量与动态类型",min:8,summary:["变量是「名字到对象的绑定」，不需要声明类型，赋值即创建。","同一个变量可以随时指向不同类型的对象——这就是动态类型。","用 type(x) 查看类型，id(x) 查看对象身份。"],code:`x = 10\nx = "十"      # 同一名字可以重新绑定到别的对象\nprint(type(x))    # <class 'str'>\nprint(id(x))`,pit:"动态不等于「没有类型」：类型依然真实存在，\"1\" + 1 会直接抛 TypeError，需要显式转换。",ex:{q:"a = 1; b = a; a = 2 之后 b 是几？",a:"b 仍是 1。变量保存的是对象的引用，给 a 重新赋值只是让 a 指向新对象，不影响 b 指向的旧对象。"},target:"能创建变量、重新赋值，并用 type() 查看类型。"},
  {id:"py-2-2",title:"数字与字符串基础",min:10,summary:["数字有 int（任意精度）、float（双精度）、complex；常用 + - * / // ** %。","字符串单双引号都行，三引号可跨行；支持 + 拼接、* 重复、按下标取字符。","字符串是不可变对象：任何看似「修改」的操作其实都在生成新字符串。"],code:`print(7 // 2, 7 % 2, 2 ** 10)   # 3 1 1024\ns = "Py" + "thon" * 2\nprint(s, len(s), s[0])          # PythonPython 8 P`,pit:"0.1 + 0.2 == 0.3 结果是 False——浮点二进制精度问题，比较请用 abs(a-b) < 1e-9 或 decimal 模块。",ex:{q:"0.1+0.2 为什么不等于 0.3？",a:"十进制小数在二进制里多为无限循环，只能近似存储。因此浮点比较要用容差，金融计算用 Decimal。"},target:"会用数值运算符计算，会拼接、取长度、按下标取字符。"},
  {id:"py-2-3",title:"布尔、比较与逻辑运算",min:8,summary:["比较运算返回 bool：== != < <= > >=；Python 支持链式写法 18 <= age < 60。","逻辑运算用 and / or / not（不是 && || !）。","假值包括：False、0、0.0、\"\"、[]、{}、None，其余对象默认为真。"],code:`age = 20\nprint(18 <= age < 60)            # True\nname = input("名字: ") or "匿名"  # 空输入时给默认值\nprint(bool([]), bool("0"))       # False True`,pit:"判断空值要写 if x is None，不要写 if x == None；判断真假直接 if x，不要 if x == True。",ex:{q:"[] 和 None 在 if 里都是假，那它们一样吗？",a:"不一样。空列表是「有容器但没内容」，None 是「什么都没有」。需要区分时必须用 is None 判断。"},target:"能写出「年龄在 18 到 60 之间」的条件，理解假值规则。"},
  {id:"py-2-4",title:"类型转换与格式化输出",min:10,summary:["int() / float() / str() / bool() 做显式转换；注意 input() 读到的永远是字符串。","转换失败会抛 ValueError，可配合异常处理或先做合法性判断。","格式化首选 f-string：f\"{name} 今年 {age} 岁\"，支持 {x:.2f} 控制小数位。"],code:`age = int(input("年龄: "))\nprint(f"明年你 {age + 1} 岁")\nprint(f"{3.14159:.2f}")     # 3.14\nprint(f"{1234567:,}")       # 1,234,567`,pit:"input 拿到的是字符串，直接和整数比较会报 TypeError；一定要先 int() 转换再比较。",ex:{q:"int(\"3.14\") 会发生什么？",a:"抛 ValueError。带小数点的字符串要先 float(\"3.14\") 再 int()，或者直接用 round()。"},target:"能读入数字参与计算，能用 f-string 控制小数位与千分位。"}
  ],
  quiz:[
   {q:"7 // 2 的结果是？",o:["3.5","3","4","3.0"],a:1,why:"// 是整除（向下取整），7//2 得 3。"},
   {q:"input() 读到的数据类型是？",o:["int","float","str","取决于输入"],a:2,why:"input 永远返回字符串，需要数字必须手动转换。"},
   {q:"下列哪个在 if 判断中视为假？",o:["\"0\"","[]","1","-1"],a:1,why:"空列表是假值；字符串 \"0\" 非空，被视为真。"}
  ]
},
{
  id:"py-s3", icon:"🔀", name:"控制流", desc:"条件分支、循环、break/continue 与推导式", lv:"basic",
  goal:"能用分支与循环解决累加、过滤、查找类问题，并写出简洁的推导式。",
  links:[["Python 官方 · 控制流","https://docs.python.org/zh-cn/3/tutorial/controlflow.html"],["菜鸟教程 · 循环语句","https://www.runoob.com/python3/python3-loop.html"]],
  lab:{t:"成绩统计小工具",req:["用一个列表存放若干成绩（至少 5 个）","用循环算出平均分、最高分、最低分（可用内置函数）","用推导式筛出及格的成绩，并统计及格人数"],starter:`scores = [88, 72, 55, 91, 63, 40]\n\navg = 0\npassed = []\n\nprint(f"平均 {avg:.1f} 最高 {max(scores)} 最低 {min(scores)}")\nprint(f"及格 {len(passed)} 人: {passed}")`,hint:"推导式写法：[s for s in scores if s >= 60]；平均分用 sum(scores)/len(scores)。",xp:25},
  lessons:[
  {id:"py-3-1",title:"if / elif / else 分支",min:8,summary:["if 条件: 后面必须有冒号，代码块靠缩进界定。","elif 可以有多个，else 可选；多个条件从上往下只执行第一个成立的分支。","条件不必是 bool，任何对象都会按真假规则判定。"],code:`score = 85\nif score >= 90:\n    print("优秀")\nelif score >= 60:\n    print("及格")\nelse:\n    print("再接再厉")`,pit:"不能写 if 60 <= score < 90 and >= 80 这种省略；Python 每个比较都要写全，或用链式 60 <= score < 90。",ex:{q:"多个 elif 同时成立时会执行几个分支？",a:"只执行第一个成立的分支，之后直接跳出整个 if 链——所以条件顺序要从严格到宽松排列。"},target:"能写出「优良中差」多档评级。"},
  {id:"py-3-2",title:"for 循环与 range",min:10,summary:["for x in 可迭代对象: 遍历元素，这是 Python 循环的主要形式。","range(a, b, s) 生成 [a, b) 步长为 s 的整数序列。","enumerate 同时拿下标和值，zip 并行遍历多个序列。"],code:`for i in range(1, 4):\n    print(i)                      # 1 2 3\nfor i, ch in enumerate("abc"):\n    print(i, ch)                  # 0 a / 1 b / 2 c`,pit:"range(5) 是 0~4 不含 5；需要倒序用 range(4, -1, -1)。",ex:{q:"求 1 到 100 的和，最 Pythonic 的写法是？",a:"sum(range(1, 101))。能用内置函数就不要手写累加循环，更短也更快。"},target:"能用 for + range 完成计数循环与序列遍历。"},
  {id:"py-3-3",title:"while 与循环控制",min:8,summary:["while 条件: 用于次数未知、靠条件结束的循环。","break 跳出整个循环，continue 跳过本轮剩余语句。","for/while 都可以带 else：只有循环没被 break 打断时才执行（经典考点）。"],code:`n = 0\nwhile n < 3:\n    n += 1\n    if n == 2:\n        continue\n    print(n)      # 1 3`,pit:"while True 必须保证有 break 出口，否则死循环；真卡住了用 Ctrl+C 中断。",ex:{q:"循环的 else 子句什么时候执行？",a:"循环条件自然变假、正常结束时执行；被 break 跳出时不执行——常用于「找不到的情况」。"},target:"能用 while 做「输入 0 结束」的交互，会用 break/continue。"},
  {id:"py-3-4",title:"推导式与常见循环模式",min:10,summary:["列表推导式 [expr for x in seq if cond] 一行生成列表，简洁且通常更快。","还有字典推导式、集合推导式；嵌套循环也能写在一行，但别超过两层。","常见模式：累加、过滤、找极值、分组计数（配合 dict 或 Counter）。"],code:`squares = [x * x for x in range(5)]\nevens = [x for x in range(10) if x % 2 == 0]\nwords = {w: len(w) for w in ["hi", "hello"]}`,pit:"别为了「能写成一行」硬塞复杂逻辑，可读性优先；超过两层嵌套就改回普通 for 循环。",ex:{q:"怎么统计一段文字里每个字符的出现次数？",a:"collections.Counter(text) 最省事；手写可用字典累加 d[c] = d.get(c, 0) + 1。"},target:"能用推导式替代「建空列表 + append」的循环。"}
  ],
  quiz:[
   {q:"range(2, 6) 生成的序列是？",o:["2 3 4 5","2 3 4 5 6","1 2 3 4 5","2 5"],a:0,why:"range 左闭右开，不含终点 6。"},
   {q:"跳出整个循环用哪个关键字？",o:["continue","break","pass","exit"],a:1,why:"break 结束整个循环；continue 只跳过本轮剩余语句。"},
   {q:"[x*2 for x in range(3)] 的结果是？",o:["[0,2,4]","[2,4,6]","[0,1,2]","[0,2,4,6]"],a:0,why:"对 0、1、2 分别乘 2，得到 [0, 2, 4]。"}
  ]
},
{
  id:"py-s4", icon:"🧺", name:"内置数据结构", desc:"list / tuple / dict / set / str 五件套", lv:"adv",
  goal:"能根据场景选对容器，熟练完成增删改查、切片、去重与统计。",
  links:[["Python 官方 · 数据结构","https://docs.python.org/zh-cn/3/tutorial/datastructures.html"],["Real Python · Lists and Tuples","https://realpython.com/python-lists-tuples/"]],
  lab:{t:"单词频率统计器",req:["给定一段英文文本，统一转小写并按空格切分","用字典（或 Counter）统计每个单词出现次数","按频次从高到低输出前 5 个单词及次数"],starter:`text = "hello world hello python world python python"\nwords = text.lower().split()\n\nfreq = {}\n\n# 按频次降序取前 5\ntop = []\nfor w, c in top:\n    print(w, c)`,hint:"统计用 freq[w] = freq.get(w, 0) + 1；排序用 sorted(freq.items(), key=lambda kv: -kv[1])[:5]。",xp:25},
  lessons:[
  {id:"py-4-1",title:"列表 list：有序可变序列",min:10,summary:["列表用 [] 定义，元素类型可以不同，是有序可变序列。","常用方法：append / pop / insert / remove / sort / reverse / extend。","下标从 0 开始，支持负数下标；切片 a[1:4:2] 取 [起:止:步)，产生新列表。"],code:`nums = [3, 1, 2]\nnums.append(4)\nnums.sort()\nprint(nums[0], nums[-1], nums[1:3])   # 1 4 [2, 3]`,pit:"列表赋值是引用：b = a 之后修改 b 也会改 a。要副本请用 a.copy()、list(a) 或 a[:]。",ex:{q:"a=[1,2]; b=a; b.append(3) 之后 a 是什么？",a:"a 变成 [1, 2, 3]。b 和 a 指向同一个列表对象，想要独立副本必须显式复制。"},target:"能熟练增删改查列表元素并灵活使用切片。"},
  {id:"py-4-2",title:"元组 tuple 与拆包",min:8,summary:["元组是有序不可变序列，用 () 定义，常用来表示结构固定的记录。","拆包 a, b = (1, 2) 与 *rest 收集剩余元素，是 Python 的特色写法。","因为不可变，元组可以作字典键，也能安全地跨函数传递。"],code:`point = (3, 4)\nx, y = point\nfirst, *rest = [1, 2, 3]     # first=1 rest=[2, 3]\na, b = b, a                  # 交换变量不需要临时变量`,pit:"单元素元组必须写成 (1,)，(1) 只是加了括号的整数 1。",ex:{q:"元组「不可变」，但里面放个列表会怎样？",a:"元组自身不能换元素，但列表里的内容可以改。不可变指的是引用关系不变，不是对象内容冻结。"},target:"会用元组表示坐标/记录，会用拆包交换变量。"},
  {id:"py-4-3",title:"字典 dict：键值映射",min:10,summary:["字典是基于哈希表的键值对映射，查找平均 O(1)，用 {} 定义。","增删改查：d[k] = v、d.get(k, 默认值)、pop、in 判断键是否存在。","遍历用 keys() / values() / items()；Python 3.7+ 保证保持插入顺序。"],code:`d = {"a": 1, "b": 2}\nd["c"] = 3\nfor k, v in d.items():\n    print(k, v)\nprint(d.get("x", 0))    # 键不存在返回默认值 0`,pit:"直接 d[\"x\"] 取不存在的键会 KeyError；拿不准就用 get()，或先判断 if k in d。",ex:{q:"怎么统计列表里每个元素出现的次数？",a:"用字典累加 d[x] = d.get(x, 0) + 1，或者直接 collections.Counter(lst)。"},target:"能用字典做计数器与映射表，并能安全取值。"},
  {id:"py-4-4",title:"集合 set 与字符串方法",min:12,summary:["集合是无序不重复容器，支持交并差：& | - ^，常用于去重和快速判重。","字符串是不可变序列，常用方法：split / join / strip / replace / find / upper / startswith。","格式化三件套：f-string（推荐）、str.format、%（老式）。"],code:`s = {1, 2, 2, 3}\nprint(s, 1 in s)              # {1, 2, 3} True\nprint("a,b,c".split(","))     # ['a', 'b', 'c']\nprint("-".join(["a", "b"]))   # a-b`,pit:"空集合必须写 set()，{} 创建的是空字典；集合元素必须可哈希，列表不能放进去。",ex:{q:"给含重复元素的列表去重并保持原顺序？",a:"list(dict.fromkeys(lst))——利用字典键唯一且保持插入顺序的特性。"},target:"能用集合去重与快速判重，能熟练切分、拼接字符串。"}
  ],
  quiz:[
   {q:"创建空集合的正确写法是？",o:["{}","set()","[]","()"],a:1,why:"{} 创建的是空字典，空集合只能用 set()。"},
   {q:"nums[-1] 表示？",o:["第一个元素","最后一个元素","倒数第二个","报错"],a:1,why:"负数下标从末尾开始，-1 即最后一个元素。"},
   {q:"字典安全取值（不存在不报错）用？",o:["d[k]","d.get(k)","d.find(k)","d[k] or 0"],a:1,why:"get 在键不存在时返回 None 或指定默认值，不会抛 KeyError。"}
  ]
},
{
  id:"py-s5", icon:"🧩", name:"函数与作用域", desc:"参数、LEGB、闭包、高阶函数与装饰器", lv:"adv",
  goal:"会把逻辑拆成可复用函数，理解作用域与闭包，能用 key/lambda 与装饰器简化代码。",
  links:[["Python 官方 · 定义函数","https://docs.python.org/zh-cn/3/tutorial/controlflow.html#defining-functions"],["Real Python · Decorators","https://realpython.com/primer-on-python-decorators/"]],
  lab:{t:"可复用的工具函数库",req:["写 avg(nums) 求平均值，空列表返回 0","写 unique_sorted(items) 去重后升序返回","写 timing(func) 装饰器，打印函数运行耗时并保留原函数元信息","用 if __name__ == \"__main__\": 写三个自测调用"],starter:`import time\nfrom functools import wraps\n\ndef timing(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        # 计时并调用原函数\n        pass\n    return wrapper\n\nif __name__ == "__main__":\n    print(avg([1, 2, 3]))`,hint:"functools.wraps 保留 __name__ 和 __doc__；计时用 time.perf_counter() 比 time.time() 更精确。",xp:30},
  lessons:[
  {id:"py-5-1",title:"定义函数与参数形态",min:10,summary:["def 函数名(参数): 定义函数，return 返回结果；没有 return 默认返回 None。","参数形态：位置参数、默认参数、关键字参数、*args、**kwargs。","默认参数必须是不可变对象，否则会掉进「可变默认参数」的经典陷阱。"],code:`def greet(name, prefix="你好"):\n    return f"{prefix}, {name}!"\n\ndef total(*nums, **opts):\n    return sum(nums), opts\n\nprint(greet("小明"), total(1, 2, tax=0.1))`,pit:"千万别写 def f(x, lst=[])：默认列表在定义时就创建一次，多次调用会不断累积元素。用 None 作哨兵值。",ex:{q:"f(1, b=2) 用了哪两种传参方式？",a:"1 是位置参数，b=2 是关键字参数。关键字参数可读性更好，也不容易因参数顺序变动而出错。"},target:"能定义带默认参数与可变参数的函数。"},
  {id:"py-5-2",title:"作用域 LEGB 与闭包",min:10,summary:["名字查找顺序：Local → Enclosing → Global → Built-in（LEGB）。","函数内想改外层变量用 nonlocal，改全局变量用 global（尽量少用）。","闭包：内层函数记住了外层变量，即使外层函数已经返回。"],code:`def make_adder(n):\n    def add(x):\n        return x + n      # 记住了外层的 n\n    return add\n\nadd5 = make_adder(5)\nprint(add5(3))    # 8`,pit:"在循环里批量创建闭包捕获循环变量，会全部拿到最后一个值——用默认参数固化：lambda x, i=i: ...",ex:{q:"函数里只读取全局变量需要 global 吗？",a:"不需要。读取可以，只有「重新绑定这个变量名」时才需要 global 声明。"},target:"理解变量查找顺序，能写出一个闭包。"},
  {id:"py-5-3",title:"高阶函数与 lambda",min:10,summary:["函数是一等对象：可以赋值给变量、作为参数传递、作为返回值。","lambda 参数: 表达式 写匿名小函数，常用于排序键和回调。","常用高阶函数：map / filter / sorted(key=) / min / max(key=) 都接收函数。"],code:`words = ["banana", "pie", "apple"]\nprint(sorted(words, key=len))\nprint(list(map(str.upper, words)))`,pit:"lambda 只能写一个表达式，塞不下就老老实实用 def；过长的 lambda 会严重拖垮可读性。",ex:{q:"按字符串长度排序怎么写？",a:"sorted(words, key=len)。key 接收一个函数，用它对每个元素的返回值排序，不改变原列表。"},target:"能用 key / lambda 定制排序与过滤。"},
  {id:"py-5-4",title:"递归与装饰器",min:12,summary:["递归 = 函数调用自身，必须有基线条件和向基线收敛的步骤。","Python 默认递归深度约 1000，深递归应改写为循环或调整 sys.setrecursionlimit。","装饰器是「接收函数、返回函数」的语法糖，用 @ 标记，用来加日志、计时、鉴权等横切逻辑。"],code:`def log(func):\n    def wrapper(*a, **kw):\n        print("call", func.__name__)\n        return func(*a, **kw)\n    return wrapper\n\n@log\ndef hello():\n    print("hi")`,pit:"装饰器会遮住原函数的名字和文档字符串，记得用 functools.wraps 保留元信息。",ex:{q:"递归求阶乘的基线条件怎么写？",a:"if n <= 1: return 1。没有基线条件就会无限递归，直到 RecursionError。"},target:"能写出阶乘递归，能给函数加一个计时装饰器。"}
  ],
  quiz:[
   {q:"没有 return 的函数调用后返回什么？",o:["0","None","空字符串","报错"],a:1,why:"Python 函数默认返回 None。"},
   {q:"下面哪一个是危险的默认参数写法？",o:["def f(x=0)","def f(lst=None)","def f(lst=[])","def f(s=\"\")"],a:2,why:"可变对象作默认值会在多次调用间共享，产生累积副作用。"},
   {q:"装饰器本质是？",o:["一种类","接收函数并返回函数的可调用对象","一种循环","编译期注解"],a:1,why:"装饰器就是一个高阶函数，@ 只是调用它的语法糖。"}
  ]
},
{
  id:"py-s6", icon:"📦", name:"模块、包与标准库", desc:"import 机制、包结构、常用标准库与依赖管理", lv:"adv",
  goal:"能把代码拆成模块与包，会用常用标准库，能导出并复现依赖清单。",
  links:[["Python 官方 · 模块","https://docs.python.org/zh-cn/3/tutorial/modules.html"],["Python 官方 · 标准库一览","https://docs.python.org/zh-cn/3/library/index.html"]],
  lab:{t:"拆分一个单词计数工具",req:["建包 wordkit/：__init__.py、counter.py、cli.py","counter.py 实现 count_words(text) 返回字典","cli.py 里用 if __name__ == \"__main__\": 读取一段文本并打印词频前 5","用 python -m wordkit.cli 运行它"],starter:`# wordkit/counter.py\ndef count_words(text):\n    words = text.lower().split()\n    freq = {}\n    # 统计频次\n    return freq\n\n# wordkit/cli.py\nfrom .counter import count_words\n\nif __name__ == "__main__":\n    print(count_words("a b a c b a"))`,hint:"包内互相导入用相对导入 from .counter import ...；运行要回到包外层目录用 python -m。",xp:30},
  lessons:[
  {id:"py-6-1",title:"模块与 import",min:10,summary:["一个 .py 文件就是一个模块，用 import 模块 或 from 模块 import 名字 引入。","导入时会执行模块顶层的所有代码，所以脚本入口要放进 if __name__ == \"__main__\":。","用 as 起别名避免名字冲突，例如 import numpy as np。"],code:`import math\nfrom math import sqrt, pi as PI\nprint(sqrt(16), PI)\nprint(__name__)    # 直接运行时是 __main__`,pit:"别用 from xxx import *：污染命名空间且看不出名字来源；自己的文件也别起 random.py 这种和_stdlib_重名的名字。",ex:{q:"if __name__ == \"__main__\": 有什么用？",a:"让文件被 import 时不执行演示/测试代码，只有直接运行才执行——这是模块可复用的关键约定。"},target:"能拆分出自己的模块并正确导入使用。"},
  {id:"py-6-2",title:"包、相对导入与 __init__",min:10,summary:["包是含 __init__.py 的目录，用点号层级导入：from pkg.sub import mod。","包内部用相对导入 from . import mod / from ..pkg import x，只能在包内使用。","__all__ 定义 from pkg import * 时对外暴露的名字列表。"],code:`# 目录结构： myapp/__init__.py, myapp/utils.py\n# 外部使用： from myapp import utils\n# 包内使用： from . import utils\n__all__ = ["utils"]`,pit:"直接运行包内某个 .py 会报「attempted relative import with no known parent package」，要用 python -m myapp.mod。",ex:{q:"相对导入里一个点和两个点分别表示什么？",a:"一个点是当前包，两个点是上一级包；相对导入只能在包内部使用，顶层脚本里不能用。"},target:"能搭出包结构并在包内互相导入。"},
  {id:"py-6-3",title:"常用标准库速览",min:12,summary:["os / pathlib 处理路径与文件系统，sys 访问解释器参数（argv、path、exit）。","datetime 处理日期时间，time 处理计时与睡眠，random 生成随机数。","json 做序列化，re 做正则，collections / itertools 提供高级数据结构。"],code:`from pathlib import Path\nfrom datetime import datetime, timedelta\nimport json\n\nprint(Path.cwd())\nprint((datetime.now() + timedelta(days=1)).date())\nprint(json.dumps({"a": 1}, ensure_ascii=False))`,pit:"os.path 与 pathlib 别混着写，新项目优先 pathlib，路径拼接直接用 / 运算符。",ex:{q:"生成 1~10 的随机整数怎么写？",a:"random.randint(1, 10)（闭区间）。注意 random 是伪随机，涉及密码请用 secrets 模块。"},target:"能用 pathlib / datetime / json 完成路径、时间与数据存取。"},
  {id:"py-6-4",title:"虚拟环境与依赖管理",min:10,summary:["pip install / uninstall / list / show；用 requirements.txt 固化依赖版本。","pip freeze > requirements.txt 导出，pip install -r requirements.txt 复现。","更现代的选择：Poetry、uv、pip-tools，能锁定依赖树并区分开发依赖。"],code:`pip freeze > requirements.txt\npip install -r requirements.txt\npip show requests`,pit:"装包前先确认虚拟环境已激活（命令行前缀显示 (.venv)），否则会装进全局环境。",target:"能导出并复现一个项目的依赖清单。",ex:{q:"为什么要写 requirements.txt？",a:"让任何人（包括部署机器）都能精确复现同一套依赖版本，避免「我这儿能跑」的经典问题。"}}
  ],
  quiz:[
   {q:"模块被直接运行时 __name__ 等于？",o:["模块名","__main__","None","空字符串"],a:1,why:"直接运行的模块其 __name__ 被设为 __main__，被导入时则是模块名。"},
   {q:"下面导入方式中不推荐的是？",o:["import os","from os import path","from os import *","import os.path"],a:2,why:"星号导入会污染命名空间，无法看出名字来源。"},
   {q:"生成 requirements.txt 的常用命令是？",o:["pip list > requirements.txt","pip freeze > requirements.txt","pip save","pip export"],a:1,why:"pip freeze 会列出当前环境已安装包及精确版本。"}
  ]
},
{
  id:"py-s7", icon:"📄", name:"文件与异常", desc:"读写文件、pathlib、异常处理与上下文管理器", lv:"adv",
  goal:"能正确读写文本与二进制文件，能捕获并处理异常，会用上下文管理器管理资源。",
  links:[["Python 官方 · 读写文件","https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#reading-and-writing-files"],["Python 官方 · 错误与异常","https://docs.python.org/zh-cn/3/tutorial/errors.html"]],
  lab:{t:"待办清单持久化",req:["用 list 存放待办事项，支持添加、完成（删除）、列出","退出时用 json.dump 保存到 todo.json，启动时用 json.load 读回","文件不存在或内容损坏时给出友好提示而不是崩溃"],starter:`import json\nfrom pathlib import Path\n\nFILE = Path("todo.json")\n\ndef load():\n    # 文件不存在或损坏时返回 []\n    pass\n\ndef save(todos):\n    # 用 json.dump 写入（ensure_ascii=False, indent=2）\n    pass\n\nif __name__ == "__main__":\n    todos = load()\n    print(todos)`,hint:"读取用 try/except json.JSONDecodeError 兜底；写入用 FILE.write_text(json.dumps(...), encoding=\"utf-8\")。",xp:30},
  lessons:[
  {id:"py-7-1",title:"文件读写与 with 语句",min:10,summary:["open(路径, 模式, encoding=\"utf-8\") 打开文件，模式 r / w / a / b / +。","用 with 语句自动关闭文件，即使中途出错也不会泄漏文件句柄。","读取方式：read() 全部、readline() 一行、readlines() 列表，或直接 for 逐行迭代。"],code:`with open("note.txt", "w", encoding="utf-8") as f:\n    f.write("第一行\\n")\n\nwith open("note.txt", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())`,pit:"Windows 默认编码可能是 gbk，读写中文务必显式写 encoding=\"utf-8\"，否则乱码或 UnicodeDecodeError。",ex:{q:"为什么要用 with 而不是手动 close？",a:"with 在离开代码块时（包括抛异常）自动关闭文件；手动 close 一旦前面出错就执行不到，造成资源泄漏。"},target:"能用 with 正确读写文本文件。"},
  {id:"py-7-2",title:"路径操作与 pathlib",min:8,summary:["Path 对象用 / 拼接路径，跨平台自动处理分隔符。","常用方法：exists() / is_file() / mkdir(parents=True) / glob() / read_text() / write_text()。","递归查找用 rglob(\"*.py\")，比 os.walk 简洁得多。"],code:`from pathlib import Path\n\np = Path("data") / "a.txt"\np.parent.mkdir(parents=True, exist_ok=True)\np.write_text("hi", encoding="utf-8")\nprint(list(Path(".").glob("*.py")))`,pit:"mkdir 不加 parents=True 时父目录不存在会报错；已存在时加 exist_ok=True 避免异常。",ex:{q:"如何找出目录里所有 .txt 文件（含子目录）？",a:"Path(\".\").rglob(\"*.txt\")，返回生成器，需要列表就套 list()。"},target:"能用 pathlib 完成建目录、写文件、批量查找。"},
  {id:"py-7-3",title:"异常捕获与处理",min:10,summary:["try / except / else / finally：except 捕获，else 无异常时执行，finally 一定执行。","捕获要具体（如 FileNotFoundError），不要裸写 except Exception 吞掉所有错误。","用 raise 主动抛异常，raise ... from e 保留原始异常链。"],code:`try:\n    n = int(input("数字: "))\nexcept ValueError as e:\n    print("不是合法数字:", e)\nelse:\n    print("收到", n)\nfinally:\n    print("结束")`,pit:"空的 except: pass 会掩盖真正的 bug，调试时极难定位；至少要记录日志或给出提示。",ex:{q:"finally 一般用来做什么？",a:"释放资源——关闭文件、连接、锁等无论成功失败都必须执行的清理动作。"},target:"能捕获指定异常并给出友好提示，用 finally 做清理。"},
  {id:"py-7-4",title:"自定义异常与上下文管理器",min:10,summary:["class MyError(Exception): 定义业务异常，配合 raise 使用。","上下文管理器协议：实现 __enter__ / __exit__ 的类，或用 @contextmanager 装饰器快速创建。","可用于封装计时、临时切换目录、数据库事务等「成对出现」的操作。"],code:`from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer():\n    t = time.perf_counter()\n    yield\n    print("耗时", round(time.perf_counter() - t, 4))\n\nwith timer():\n    sum(range(10 ** 6))`,pit:"自定义异常要继承 Exception 而不是 BaseException，否则连 KeyboardInterrupt 都会被你捕获，Ctrl+C 都停不下来。",ex:{q:"什么时候该自定义异常？",a:"当内置异常无法表达业务含义时（如余额不足、参数非法），让调用方能精确区分并处理不同错误。"},target:"能定义自己的异常并用 @contextmanager 写上下文管理器。"}
  ],
  quiz:[
   {q:"以 UTF-8 写文本文件应写成？",o:["open(p, w)","open(p, \"w\", encoding=\"utf-8\")","open(p, \"wb\")","open(p, \"w+\")"],a:1,why:"显式指定 encoding 才能避免平台默认编码带来的乱码。"},
   {q:"finally 块的执行时机是？",o:["只在成功时","只在异常时","无论是否异常都执行","从不执行"],a:2,why:"finally 用于必须执行的清理动作，异常也会被传播出去。"},
   {q:"自定义异常通常继承？",o:["BaseException","Exception","Error","object"],a:1,why:"继承 Exception 可被常规 except 捕获，又不会误捕 KeyboardInterrupt 等系统级异常。"}
  ]
},
{
  id:"py-s8", icon:"🧬", name:"面向对象", desc:"类与实例、继承与 MRO、魔术方法、数据类", lv:"hard",
  goal:"能用类组织代码，理解继承与多态，掌握常用魔术方法与数据类。",
  links:[["Python 官方 · 类","https://docs.python.org/zh-cn/3/tutorial/classes.html"],["Real Python · OOP in Python","https://realpython.com/python3-object-oriented-programming/"]],
  lab:{t:"用类实现一个栈与队列",req:["Stack 类：push / pop / peek / __len__ / __repr__，空栈 pop 抛自定义 EmptyError","Queue 类用 collections.deque 实现 enqueue / dequeue","用继承抽出一个公共基类 Container，并在子类中重写方法","写 3 条断言自测"],starter:`from collections import deque\n\nclass EmptyError(Exception):\n    pass\n\nclass Container:\n    def __len__(self):\n        raise NotImplementedError\n\nclass Stack(Container):\n    def __init__(self):\n        self._items = []\n    def push(self, x):\n        self._items.append(x)\n    def pop(self):\n        if not self._items:\n            raise EmptyError("栈为空")\n        return self._items.pop()`,hint:"__repr__ 用于调试显示；继承时保持方法签名一致（里氏替换原则）。",xp:35},
  lessons:[
  {id:"py-8-1",title:"类与实例",min:10,summary:["class 定义类，__init__ 是初始化方法，self 指向当前实例。","属性分实例属性（每个对象一份）和类属性（所有对象共享一份）。","方法就是第一个参数为 self 的函数，调用时 self 由解释器自动传入。"],code:`class Dog:\n    species = "Canis"      # 类属性，所有实例共享\n\n    def __init__(self, name):\n        self.name = name   # 实例属性\n\n    def bark(self):\n        return f"{self.name}: 汪!"\n\nprint(Dog("小黑").bark())`,pit:"把可变对象（如列表）当类属性会让所有实例共享同一份数据，多半是 bug，应放到 __init__ 里。",target:"能定义类、初始化属性并调用方法。",ex:{q:"self 是什么，能改名吗？",a:"self 就是实例自己，只是约定俗成的名字。改成 this 也能跑，但会让所有人都读不懂，强烈不建议。"}}
  ,
  {id:"py-8-2",title:"继承与 MRO",min:10,summary:["class B(A) 表示继承，子类自动获得父类的方法与属性。","super().__init__() 调用父类初始化；同名方法即为重写（override）。","多重继承按 MRO（C3 线性化）查找方法顺序，用 类名.__mro__ 查看。"],code:`class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "汪!"\n\nprint(Dog().speak(), Dog.__mro__)`,pit:"子类 __init__ 里忘记 super().__init__()，父类属性就没初始化，调用时报 AttributeError。",ex:{q:"什么情况下该用继承？",a:"表达「是一种」（is-a）关系且需要复用或扩展行为时；只是想复用代码，优先考虑组合而不是继承。"},target:"能用继承复用代码并用 super 正确初始化。"},
  {id:"py-8-3",title:"魔术方法与运算符重载",min:12,summary:["双下划线方法（dunder）让自定义类支持内置语法：__str__ / __repr__ / __len__ / __eq__ / __lt__。","运算符重载：__add__ 对应 +，__getitem__ 对应 []，__call__ 让对象可被调用。","__repr__ 面向开发者、__str__ 面向用户；至少实现 __repr__ 便于调试。"],code:`class Vec:\n    def __init__(self, x):\n        self.x = x\n    def __add__(self, o):\n        return Vec(self.x + o.x)\n    def __repr__(self):\n        return f"Vec({self.x})"\n\nprint(Vec(1) + Vec(2))    # Vec(3)`,pit:"定义了 __eq__ 通常也要定义 __hash__，否则对象变成不可哈希，不能放进 set 或当字典键。",ex:{q:"__str__ 和 __repr__ 有什么区别？",a:"print/str() 优先用 __str__；交互式回显、容器元素显示用 __repr__；没定义 __str__ 时退回 __repr__。"},target:"能让自己的类支持 print、比较与 + 运算。"},
  {id:"py-8-4",title:"dataclass、property 与枚举",min:10,summary:["@dataclass 自动生成 __init__ / __repr__ / __eq__，适合纯数据模型。","@property 把方法伪装成属性，可在赋值时做校验（配合 @x.setter）。","Enum 定义具名常量，比散落的字符串和数字更不易写错。"],code:`from dataclasses import dataclass, field\nfrom enum import Enum\n\nclass Color(Enum):\n    RED = 1\n\n@dataclass\nclass Team:\n    name: str\n    members: list = field(default_factory=list)\n\nprint(Team("A"), Color.RED)`,pit:"dataclass 的默认字段同样不能用可变对象，要用 field(default_factory=list)。",ex:{q:"用 property 的好处是什么？",a:"对外仍是属性访问语法，但内部可加校验、惰性计算，日后改实现也不会破坏调用方。"},target:"能用 dataclass 定义数据模型，用 property 做校验。"}
  ],
  quiz:[
   {q:"子类调用父类初始化应写？",o:["Animal.__init__(self)","super().__init__()","parent.init()","self.__super__()"],a:1,why:"super() 按 MRO 找到下一个类，是多重继承下唯一安全的写法。"},
   {q:"让对象支持 len(obj) 需实现？",o:["__len__","__size__","__length__","__count__"],a:0,why:"__len__ 是长度协议方法。"},
   {q:"dataclass 的主要作用是？",o:["加速运行","自动生成样板方法","强制类型检查","实现继承"],a:1,why:"它自动生成 __init__、__repr__、__eq__ 等重复样板代码。"}
  ]
},
{
  id:"py-s9", icon:"⚡", name:"迭代、生成器与并发", desc:"迭代器协议、itertools、线程进程与 asyncio", lv:"hard",
  goal:"理解惰性求值，能按场景选择线程、进程或协程实现并发。",
  links:[["Python 官方 · itertools","https://docs.python.org/zh-cn/3/library/itertools.html"],["Python 官方 · asyncio","https://docs.python.org/zh-cn/3/library/asyncio.html"]],
  lab:{t:"并发下载模拟器",req:["用生成器写一个惰性产生的任务序列 tasks(n)","用 ThreadPoolExecutor 并发「下载」（用 time.sleep 模拟），打印完成顺序","改写为 asyncio 版本，用 asyncio.gather 并发执行并比较耗时"],starter:`import time, asyncio\nfrom concurrent.futures import ThreadPoolExecutor\n\ndef task(i):\n    time.sleep(0.2)\n    return i * i\n\n# 线程池版本\nwith ThreadPoolExecutor(max_workers=4) as ex:\n    print(list(ex.map(task, range(8))))\n\n# asyncio 版本：把 time.sleep 换成 await asyncio.sleep\nasync def atask(i):\n    await asyncio.sleep(0.2)\n    return i`,hint:"asyncio 里不能用阻塞的 time.sleep，会卡死整个事件循环；计时用 time.perf_counter()。",xp:40},
  lessons:[
  {id:"py-9-1",title:"迭代器与生成器",min:10,summary:["迭代器协议：实现 __iter__ 和 __next__，耗尽时抛 StopIteration。","生成器函数含 yield，调用返回惰性迭代器，每次 next 推进到下一个 yield。","生成器表达式 (x*x for x in r) 与列表推导式语法相似但省内存。"],code:`def count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nprint(list(count_up(3)))    # [0, 1, 2]`,pit:"生成器只能遍历一次，消费完再遍历是空的；要多次使用就转 list 或重新调用生成函数。",ex:{q:"生成器相比列表有什么好处？",a:"惰性计算、不一次性占用内存，还能表达无限序列；代价是只能消费一次、不能随机访问。"},target:"能用 yield 写一个惰性序列生成器。"},
  {id:"py-9-2",title:"itertools 与 functools",min:10,summary:["itertools 提供高效迭代工具：count / cycle / chain / zip_longest / combinations / groupby / accumulate。","functools：reduce 累积、lru_cache 缓存、partial 固定部分参数、wraps 保留元信息。","这些多为 C 实现，比手写 Python 循环更快更省内存。"],code:`from itertools import combinations, accumulate\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(50), list(accumulate([1, 2, 3])))`,pit:"lru_cache 装饰的函数参数必须可哈希；被缓存的函数若有副作用，第二次调用不会执行副作用。",ex:{q:"用 groupby 之前必须先做什么？",a:"先按同一个键排序，否则只会对相邻的同键元素分组，结果看起来像漏数据。"},target:"能用 combinations / accumulate / lru_cache 简化代码。"},
  {id:"py-9-3",title:"线程、进程与 GIL",min:12,summary:["GIL 保证同一时刻只有一个线程执行 Python 字节码，所以 CPU 密集任务用多线程不加速。","I/O 密集（网络、磁盘）用线程或 asyncio；CPU 密集用多进程或 numpy / C 扩展。","线程间共享可变数据要加锁（Lock），否则产生数据竞争。"],code:`from concurrent.futures import ThreadPoolExecutor\nimport time\n\ndef job(i):\n    time.sleep(0.2)\n    return i * i\n\nwith ThreadPoolExecutor(max_workers=4) as ex:\n    print(list(ex.map(job, range(8))))`,pit:"多线程对同一变量做 count += 1 并不安全，必须加锁或改用队列传递数据。",ex:{q:"为什么 CPU 密集任务要用多进程？",a:"每个进程有独立的解释器和 GIL，能真正利用多核；代价是内存占用大、进程间通信有序列化开销。"},target:"能区分 I/O 密集与 CPU 密集场景并选对并发方式。"},
  {id:"py-9-4",title:"asyncio 入门",min:12,summary:["async def 定义协程，await 挂起等待；事件循环在单线程内调度多个协程并发。","适合大量 I/O 等待的场景（爬虫、API 调用），可同时跑成百上千个任务。","用 asyncio.run() 启动，asyncio.gather() 并发收集结果。"],code:`import asyncio\n\nasync def fetch(i):\n    await asyncio.sleep(0.1)\n    return i\n\nasync def main():\n    print(await asyncio.gather(*[fetch(i) for i in range(5)]))\n\nasyncio.run(main())`,pit:"协程里不能调用阻塞函数（time.sleep、requests），会卡住整个事件循环；要用 asyncio.sleep、aiohttp。",ex:{q:"await 到底在等什么？",a:"把控制权交回事件循环，让其他协程先跑，等这个 awaitable 完成后再回来继续——这就是并发的来源。"},target:"能用 asyncio 并发执行多个异步任务。"}
  ],
  quiz:[
   {q:"生成器函数的标志是？",o:["return","yield","async","lambda"],a:1,why:"含 yield 的函数调用后返回生成器对象。"},
   {q:"CPU 密集任务在 Python 中通常选？",o:["多线程","多进程","asyncio","单线程"],a:1,why:"GIL 让多线程无法并行执行字节码，多进程才能真正利用多核。"},
   {q:"协程里应该用哪个睡眠函数？",o:["time.sleep","asyncio.sleep","os.sleep","threading.sleep"],a:1,why:"time.sleep 会阻塞整个事件循环，asyncio.sleep 会把控制权交回循环。"}
  ]
},
{
  id:"py-s10", icon:"🛠️", name:"工程与深入", desc:"测试、类型标注、项目结构与对象模型", lv:"hard",
  goal:"能为代码写测试与类型标注，能把脚本组织成项目，并理解引用、拷贝与内存管理。",
  links:[["Python 官方 · typing","https://docs.python.org/zh-cn/3/library/typing.html"],["Real Python · Python 内存管理","https://realpython.com/python-memory-management/"]],
  lab:{t:/把一个脚本升级成项目/,req:["整理成 src/ 与 tests/ 目录，写 pyproject.toml 声明包名与依赖","为两个核心函数补上类型标注，并用 mypy 检查通过","写 3 条 pytest 用例覆盖正常值、边界值与异常路径","用 pip install -e . 本地安装后命令行运行"],starter:`# pyproject.toml\n[project]\nname = "mytool"\nversion = "0.1.0"\ndependencies = []\n\n[build-system]\nrequires = ["setuptools>=61"]\nbuild-backend = "setuptools.build_meta"\n\n# 终端： pip install -e . && pytest -q && mypy src`,hint:"类型标注写 def f(x: int) -> str；异常路径测试用 pytest.raises(ValueError)。",xp:40},
  lessons:[
  {id:"py-10-1",title:"测试与调试",min:10,summary:["unittest 是内置方案；pytest 更简洁，用 assert 直接断言（pip install pytest）。","测试要覆盖三类：正常值、边界值、异常路径。","调试除了 print，用 breakpoint() / pdb 或 IDE 断点单步更高效。"],code:`# test_math.py\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(1, 2) == 3\n    assert add(-1, 1) == 0\n\n# 终端运行： pytest -q`,pit:"测试要能重复运行且互不影响：别依赖真实网络、当前时间和全局状态，用 fixture / mock 隔离。",ex:{q:"为什么要写测试？",a:"它是重构时的安全网、需求的活文档、回归 bug 的第一道防线；省下的调试时间远超写测试的时间。"},target:"能为自己的函数写一组 pytest 测试。"},
  {id:"py-10-2",title:"类型标注与静态检查",min:10,summary:["可以给变量与函数加类型提示：def f(x: int) -> str，运行时不强制但工具能检查。","typing 提供 Optional / Union / Callable / TypeVar / Protocol；3.9+ 推荐内置 list[int]、dict[str, int]。","mypy / pyright / IDE 能在运行前发现类型不匹配的错误。"],code:`from typing import Optional\n\ndef find(name: str, table: dict[str, int]) -> Optional[int]:\n    return table.get(name)\n\nprint(find("a", {"a": 1}))`,pit:"类型提示是「承诺」不是「强制」——运行时不做校验，必须配合 mypy 之类的工具才有意义。",ex:{q:"Optional[int] 是什么意思？",a:"等价于 int | None，表示「可能是整数，也可能是 None」，提醒调用方必须处理空值情况。"},target:"能给函数加类型标注并用 mypy 通过检查。"},
  {id:"py-10-3",title:"项目结构、打包与发布",min:10,summary:["标准结构：src/ 放代码、tests/ 放测试、pyproject.toml 声明元数据与依赖。","本地可编辑安装 pip install -e .，改代码立即生效，适合开发期。","打包用 python -m build，发布到 PyPI 用 twine；内部项目可直接分发 wheel。"],code:`# pyproject.toml 片段\n[project]\nname = "mytool"\nversion = "0.1.0"\ndependencies = ["requests>=2.0"]\n\n# 构建： python -m build\n# 上传： python -m twine upload dist/*`,pit:"包名与目录名冲突、忘记加 __init__.py、依赖没写进 dependencies，是打包失败的三大常见原因。",ex:{q:"为什么用 pyproject.toml 替代手写 setup.py？",a:"它是 PEP 518 定义的标准配置文件，统一声明构建后端与依赖，pip / build / poetry 等工具都能识别。"},target:"能把脚本整理成标准项目并本地安装运行。"},
  {id:"py-10-4",title:"对象模型、拷贝与内存管理",min:12,summary:["一切皆对象：变量只是名字，指向对象；is 比较身份，== 比较值。","浅拷贝只复制一层，深拷贝递归复制所有嵌套对象。","内存管理以引用计数为主，配合分代 GC 解决循环引用；del 只减少引用，不保证立刻释放。"],code:`import copy\n\na = [[1], [2]]\nb = copy.copy(a)       # 浅拷贝\nc = copy.deepcopy(a)   # 深拷贝\nb[0].append(9)\nprint(a)   # [[1, 9], [2]] —— 浅拷贝影响了原对象`,pit:"小整数（-5~256）和短字符串会被驻留复用，用 is 比较它们「看起来对」但绝对不能依赖这个行为。",ex:{q:"什么时候必须深拷贝？",a:"嵌套了可变容器（列表套列表、字典套对象），且改动副本绝不能影响原数据时。"},target:"能说清引用、浅拷贝与深拷贝的差异并选对用法。"}
  ],
  quiz:[
   {q:"运行 pytest 测试的命令是？",o:["python -m test","pytest","run tests","python test"],a:1,why:"安装 pytest 后在项目根目录执行 pytest 即可自动收集 test_*.py。"},
   {q:"Optional[int] 等价于？",o:["int","int | None","list[int]","任意类型"],a:1,why:"Optional[T] 就是 Union[T, None]，Python 3.10+ 可写 T | None。"},
   {q:"copy.copy 与 copy.deepcopy 的区别是？",o:["没有区别","浅拷贝只复制一层，深拷贝递归复制","deepcopy 更快","copy 只用于字典"],a:1,why:"浅拷贝的嵌套对象仍与原对象共享，深拷贝会完整复制所有层级。"}
  ]
}
];

window.LANG_DATA.py = {
  name: "Python",
  icon: "🐍",
  color: "#2f7ed8",
  phases: [
    {icon:"🌱",name:"第一篇 · 入门奠基",range:[0,2],desc:"环境、类型与运算、控制流——先把语言跑顺",wk:3},
    {icon:"🧱",name:"第二篇 · 核心数据结构",range:[3,5],desc:"五件套容器、函数与作用域——写出像样的脚本",wk:4},
    {icon:"⚙️",name:"第三篇 · 工程能力",range:[6,7],desc:"模块包管理、文件 IO 与异常——能交付小工具",wk:4},
    {icon:"🚀",name:"第四篇 · 深入与实战",range:[8,9],desc:"面向对象、迭代器与并发、测试与运行时机制",wk:6}
  ],
  stages: PY_STAGES
};
