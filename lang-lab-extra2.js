/*
 * R0:hello world · 编程实战扩容层（第二批：每阶段再 +2 道）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 *
 * 目的：把每阶段的实战题从 3 道（原 1 + lang-lab-extra.js 2）提升到 5 道，
 *       提高「动手写代码」在整站学习量中的比重。
 *
 * 合并方式（零侵入，不改 lang-data-*.js / lang-lab-extra.js）：
 *   本文件在 index.html 中于 lang-lab-extra.js 之后、合并 IIFE 之前加载，
 *   直接把 L 折进 window.LAB_EXTRA，既有合并逻辑照常 concat 进 stage.labs
 *   （labs[0] 始终是原 stage.lab，旧进度键不受影响）。
 *
 * 字段与原实战完全一致：{ t, req:[], starter, hint, xp, t_en, req_en, hint_en }
 */
(function () {
  var L = {};
/* ==================== Python ==================== */
L["py-s1"] = [
 {t:"用 REPL 做一台计算器",t_en:"A Calculator in the REPL",
  req:["在交互式解释器里依次算出 2**10、17%5、7//2 三个结果并记下输出","把 (1+2)*3 与 1+2*3 都算一遍，比较优先级差异","解释为什么 0.1+0.2 的结果不是 0.3"],
  req_en:["In the interactive shell compute 2**10, 17%5 and 7//2, and record the outputs","Evaluate (1+2)*3 and 1+2*3, and compare how precedence changes the result","Explain why 0.1+0.2 does not equal 0.3"],
  starter:"# 在终端运行 python 进入 REPL，逐行输入：\n# 2**10\n# 17 % 5\n# 7 // 2\n# (1+2)*3\n# 1+2*3\nprint(\"把每次的输出抄到这里做对比\")",
  hint:"// 是整除、% 是取余、** 是幂；浮点误差来自二进制无法精确表示 0.1。",
  hint_en:"// is floor division, % is modulo, ** is power; the float error comes from binary representation.",
  xp:25},
 {t:"一键切换的解释器选择器",t_en:"Interpreter Picker Script",
  req:["写一个脚本，用 sys.version_info 判断当前主版本是 3 还是 2","若主版本小于 3，打印一句提示并退出（sys.exit(1)）","把判断逻辑放进函数，并在 __main__ 保护块里调用"],
  req_en:["Write a script that checks sys.version_info to tell whether the major version is 3","If the major version is below 3, print a hint and exit with sys.exit(1)","Put the logic in a function and call it inside a __main__ guard"],
  starter:"import sys\n\ndef check():\n    # 判断 sys.version_info.major\n    pass\n\nif __name__ == \"__main__\":\n    check()",
  hint:"sys.version_info 是具名元组，可以直接取 .major；sys.exit(数字) 用非零表示异常退出。",
  hint_en:"sys.version_info is a named tuple, so .major works directly; sys.exit(nonzero) signals failure.",
  xp:25}
];
L["py-s2"] = [
 {t:"类型转换踩坑实录",t_en:"Type Conversion Traps",
  req:["把 int('7')、int(7.9)、float('3.5') 的结果都打印出来并说明","尝试 int('7.5') 并捕获异常，打印友好提示","用 bool([]) 与 bool('0') 各打印一次，解释为什么结果相反"],
  req_en:["Print int('7'), int(7.9) and float('3.5'), and explain each result","Try int('7.5'), catch the exception and print a friendly hint","Print bool([]) and bool('0') and explain why they differ"],
  starter:"print(int('7'))\nprint(int(7.9))\nprint(float('3.5'))\n\ntry:\n    print(int('7.5'))\nexcept Exception as e:\n    print(\"转换失败:\", e)\n\nprint(bool([]), bool('0'))",
  hint:"int(7.9) 直接截断小数而不是四舍五入；非空字符串一律为真，哪怕内容是 '0'。",
  hint_en:"int(7.9) truncates rather than rounds; any non-empty string is truthy, even '0'.",
  xp:25},
 {t:"成绩单格式化输出",t_en:"Formatted Report Card",
  req:["用字典存 3 门课的成绩，计算总分与平均分","用 f-string 输出对齐的表格，分数右对齐、宽度固定","百分比保留 1 位小数，并用 :>6 之类的格式控制对齐"],
  req_en:["Store 3 subject scores in a dict and compute total and average","Print an aligned table with f-strings, right-aligning the numbers","Keep one decimal place for the percentage and align fields with :>6"],
  starter:"scores = {\"数学\": 92, \"英语\": 78, \"物理\": 85}\ntotal = 0\n# 累加 + 输出对齐表格\nprint(f\"{'科目':<6}{'分数':>6}\")",
  hint:"f-string 的格式说明符写在冒号后：{x:>6} 右对齐宽度 6，{y:.1f} 保留一位小数。",
  hint_en:"Format specifiers follow the colon: {x:>6} right-aligns in width 6, {y:.1f} keeps one decimal.",
  xp:25}
];
L["py-s3"] = [
 {t:"猜数字游戏（带次数限制）",t_en:"Number Guessing with Limited Tries",
  req:["用 random.randint 生成 1~100 的答案，最多允许猜 7 次","每次都提示「偏大」或「偏小」，用 break 在猜中时结束","用 for-else 结构在循环正常结束时输出「次数用完了」"],
  req_en:["Pick a secret number in 1..100 with random.randint and allow at most 7 guesses","Hint higher or lower each time and break out when guessed correctly","Use a for-else block to print a out-of-tries message when the loop ends normally"],
  starter:"import random\ntarget = random.randint(1, 100)\n\nfor i in range(7):\n    guess = int(input(\"猜一个数: \"))\n    # 比较并给出提示\n    pass\nelse:\n    print(\"次数用完了\")",
  hint:"猜中就直接 break，这样 else 分支不会被触发，恰好表达「没猜中」的情况。",
  hint_en:"Breaking on a correct guess skips the else branch, which naturally means it was not guessed.",
  xp:25},
 {t:"用推导式筛出及格名单",t_en:"Pass List with Comprehensions",
  req:["给定姓名与分数两个列表，用 zip 配对后用字典推导式建成映射","用列表推导式筛出分数不低于 60 的姓名","再用字典推导式筛出不及格的同学及其分数并打印"],
  req_en:["Given name and score lists, pair them with zip and build a dict via comprehension","Use a list comprehension to filter names scoring at least 60","Use a dict comprehension to list the failing students with their scores"],
  starter:"names = [\"小北\", \"小西\", \"小南\", \"小东\"]\nscores = [88, 52, 73, 45]\n\nmapping = {}\npassed = []\nfailed = {}\nprint(passed, failed)",
  hint:"字典推导式写法是 {k: v for k, v in ... if 条件}，条件写在末尾。",
  hint_en:"Dict comprehension syntax is {k: v for k, v in ... if cond} with the condition at the end.",
  xp:25}
];
L["py-s4"] = [
 {t:"用集合做两班共同好友分析",t_en:"Common Friends with Sets",
  req:["用两个集合表示两个班级的学生名单","分别打印交集（共同）、并集（全部）、差集（A 独有）","去掉重复报名后用 len 报告实际人数"],
  req_en:["Represent two class rosters as sets","Print the intersection, union and difference of the two sets","Deduplicate the registrations and report the real headcount with len"],
  starter:"a = {\"小明\", \"小红\", \"小刚\", \"小明\"}\nb = {\"小红\", \"小丽\"}\n\nprint(a)\n# 交集 / 并集 / 差集\nprint(len(a))",
  hint:"集合字面量的重复元素会自动去重；交集是 &，并集是 |，差集是 -。",
  hint_en:"Set literals deduplicate automatically; & is intersection, | union and - difference.",
  xp:25},
 {t:"列表切片与排序实战",t_en:"Slicing and Sorting Drill",
  req:["构造一个含 10 个随机整数的列表","分别用 sorted 与 .sort 排序并观察原列表是否被改动","取出前 3 名与后 3 名，用切片一次性完成"],
  req_en:["Build a list of 10 random integers","Sort with both sorted() and .sort() and observe whether the original list changes","Take the top 3 and bottom 3 in one slicing expression each"],
  starter:"import random\nnums = [random.randint(0, 100) for _ in range(10)]\nprint(nums)\n\nasc = sorted(nums)\nnums.sort(reverse=True)\nprint(nums)\n# 切片取前 3 / 后 3",
  hint:"sorted 返回新列表、原列表不动；list.sort 原地排序并返回 None。",
  hint_en:"sorted() returns a new list and leaves the original intact; list.sort() sorts in place and returns None.",
  xp:25},
 {t:"字典选课系统小实验",t_en:"Course Enrollment with Dicts",
  req:["用嵌套字典存 3 名学生各自的选课列表","安全地查询某个学生是否选了某门课（用 get 与 in）","删除一名学生的某门课后重新打印全部选课情况"],
  req_en:["Store three students and their enrolled courses in a nested dict","Safely check whether a student took a course using get and in","Drop one course for one student and print the updated enrollment"],
  starter:"data = {\"小明\": [\"数学\", \"英语\"], \"小红\": [\"物理\"], \"小刚\": []}\n\n# 查询 / 删除 / 打印\nfor name, courses in data.items():\n    print(name, courses)",
  hint:"删除列表元素可用 remove 或 pop；data.get('小明', []) 能避免键不存在时报错。",
  hint_en:"Remove list items with remove or pop; data.get('x', []) avoids KeyError when the key is missing.",
  xp:25}
];
L["py-s5"] = [
 {t:"给工具函数加上参数校验",t_en:"Adding Argument Validation",
  req:["写一个 divide(a, b) 函数，除数为零时抛出自定义异常","写一个 average(nums) 函数，空列表时返回 None 而不是报错","用 assert 给一个内部辅助函数加上前置条件检查"],
  req_en:["Write divide(a, b) that raises a custom exception when b is zero","Write average(nums) that returns None for an empty list instead of failing","Add precondition checks to a helper function with assert"],
  starter:"class ZeroDivisorError(Exception):\n    pass\n\ndef divide(a, b):\n    # 校验 b\n    return a / b\n\ndef average(nums):\n    # 处理空列表\n    return sum(nums) / len(nums)",
  hint:"自定义异常继承 Exception 即可；assert 只应用于「本不该发生」的内部假设。",
  hint_en:"A custom exception only needs to inherit from Exception; assert is for internal invariants.",
  xp:25},
 {t:"用闭包做计数器工厂",t_en:"Counter Factory via Closures",
  req:["写 make_counter(start) 返回一个每次调用自增 1 的内部函数","创建两个计数器，验证它们各自独立、互不影响","再用 nonlocal 实现一个带重置功能的重置计数器"],
  req_en:["Write make_counter(start) returning an inner function that increments by one per call","Create two counters and verify they are fully independent","Use nonlocal to build a second factory whose counter can be reset"],
  starter:"def make_counter(start=0):\n    count = start\n    def step():\n        # 需要 nonlocal count\n        pass\n    return step\n\nc1 = make_counter(0)\nc2 = make_counter(100)",
  hint:"内层函数要修改外层变量必须写 nonlocal count，否则只会创建一个新的局部变量。",
  hint_en:"Inner functions must declare nonlocal count to rebind the outer variable.",
  xp:25}
];
L["py-s6"] = [
 {t:"把单文件脚本拆成包",t_en:"Splitting a Script into a Package",
  req:["建立 mypkg/ 目录，放入 __init__.py、calc.py、text.py 三个文件","在 __init__.py 里显式导出两个函数，保证 from mypkg import add 可用","写一个 main.py 从包外调用，验证包与脚本分离"],
  req_en:["Create a mypkg/ directory with __init__.py, calc.py and text.py","Re-export two functions in __init__.py so `from mypkg import add` works","Write main.py outside the package to verify the split"],
  starter:"# mypkg/__init__.py\n# from .calc import add\n# from .text import slugify\n\n# mypkg/calc.py\ndef add(a, b):\n    return a + b\n\n# main.py\n# from mypkg import add",
  hint:"包内模块之间用相对导入（from .calc import ...）；__init__.py 决定包对外暴露什么。",
  hint_en:"Use relative imports inside a package; __init__.py controls what the package exposes.",
  xp:25},
 {t:"用标准库重写三件小事",t_en:"Three Tasks with the Standard Library",
  req:["用 collections.Counter 统计一段文本的词频并取前 3","用 pathlib.Path 列出当前目录下的 .py 文件","用 json 把一个字典写入文件再读回来，验证数据一致"],
  req_en:["Use collections.Counter to get the top 3 words in a text","Use pathlib.Path to list the .py files in the current directory","Write a dict to a file with json and read it back to verify round-tripping"],
  starter:"from collections import Counter\nfrom pathlib import Path\nimport json\n\ntext = \"to be or not to be that is the question\"\nprint(Counter(text.split()).most_common(3))\nprint(sorted(p.name for p in Path('.').glob('*.py'))[:5])",
  hint:"Counter.most_common(n) 直接给出前 n 名；pathlib 的 glob 返回生成器，注意惰性。",
  hint_en:"Counter.most_common(n) yields the top n; pathlib's glob is lazy.",
  xp:25}
];
L["py-s7"] = [
 {t:"健壮的日志追加器",t_en:"Robust Log Appender",
  req:["写一个 log(msg, level) 函数，把带时间戳的一行追加写入 app.log","文件不存在时自动创建；目录不存在时先创建目录","用 with 保证文件句柄被正确释放，并在异常时打印友好信息"],
  req_en:["Write log(msg, level) that appends a timestamped line to app.log","Create the file and its parent directory automatically when missing","Use with to guarantee the handle is released and print a friendly message on failure"],
  starter:"from datetime import datetime\nfrom pathlib import Path\n\ndef log(msg, level=\"INFO\"):\n    ts = datetime.now().strftime(\"%Y-%m-%d %H:%M:%S\")\n    # 追加写入 logs/app.log\n    pass\n\nlog(\"程序启动\")",
  hint:"Path('logs').mkdir(parents=True, exist_ok=True) 可以一次建好目录且重复调用不报错。",
  hint_en:"Path('logs').mkdir(parents=True, exist_ok=True) creates the directory and is idempotent.",
  xp:25},
 {t:"异常分类统计器",t_en:"Exception Classifier",
  req:["写一个 safe_int(s) 函数，把非法输入统一转成 0 并记录一次失败计数","在主程序里对 5 个不同输入逐个调用，最后报告成功与失败次数","用一个自定义异常类区分「空字符串」与「格式错误」两种情况"],
  req_en:["Write safe_int(s) that turns invalid input into 0 and counts a failure","Call it on five different inputs and report the success and failure counts","Use a custom exception class to distinguish empty input from malformed input"],
  starter:"fail = 0\n\ndef safe_int(s):\n    global fail\n    # 空字符串 / 格式错误分别处理\n    try:\n        return int(s)\n    except ValueError:\n        fail += 1\n        return 0\n\nfor v in [\"12\", \"\", \"abc\", \"-3\", \" 7 \"]:\n    print(repr(v), safe_int(v))\nprint(\"失败次数:\", fail)",
  hint:"int(' 7 ') 其实是合法的（会忽略首尾空白），而 int('') 会抛 ValueError。",
  hint_en:"int(' 7 ') is legal (surrounding whitespace is ignored) while int('') raises ValueError.",
  xp:25}
];
L["py-s8"] = [
 {t:"用类实现学生成绩单",t_en:"A Student Report Class",
  req:["定义 Student 类，属性有姓名与成绩列表，方法有 average 与 best","实现 __str__ 让 print(obj) 输出可读的一行摘要","用 @property 暴露 average，外部读取时不需要加括号"],
  req_en:["Define a Student class with a name and a score list plus average() and best()","Implement __str__ so print(obj) gives a readable one-line summary","Expose average through @property so callers do not need parentheses"],
  starter:"class Student:\n    def __init__(self, name, scores):\n        self.name = name\n        self.scores = list(scores)\n\n    def average(self):\n        return sum(self.scores) / len(self.scores)\n\n    def __str__(self):\n        return f\"{self.name}: 共 {len(self.scores)} 门课\"",
  hint:"@property 把方法变成只读属性；__str__ 的返回值必须全是字符串。",
  hint_en:"@property turns a method into a read-only attribute; __str__ must return a string.",
  xp:25},
 {t:"继承与多态：图形面积",t_en:"Shapes: Inheritance and Polymorphism",
  req:["定义基类 Shape，含 area() 方法（默认抛 NotImplementedError）","派生 Circle 与 Rectangle，各自重写 area()","把多个图形放进列表统一调用 area()，观察多态效果"],
  req_en:["Define a Shape base class with area() raising NotImplementedError by default","Derive Circle and Rectangle, each overriding area()","Put several shapes in one list and call area() uniformly to see polymorphism"],
  starter:"import math\n\nclass Shape:\n    def area(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n\nshapes = [Circle(1), ]\nfor s in shapes:\n    print(type(s).__name__, round(s.area(), 2))",
  hint:"子类用 super().__init__() 调用父类初始化；统一接口 + 不同实现就是多态。",
  hint_en:"Subclasses call super().__init__(); one interface with many implementations is polymorphism.",
  xp:25}
];
L["py-s9"] = [
 {t:"用生成器读大文件",t_en:"Streaming a Large File with Generators",
  req:["写一个生成器函数逐行读取文件，每次 yield 一行（去掉换行符）","用生成器表达式统计文件中长度超过 20 的行数","对比 readlines() 与生成器的内存占用差异并说明原因"],
  req_en:["Write a generator that yields one stripped line at a time from a file","Use a generator expression to count lines longer than 20 characters","Compare memory use of readlines() versus the generator and explain why"],
  starter:"from pathlib import Path\n\nPath(\"demo.txt\").write_text(\"\\n\".join(f\"第{i}行内容\" for i in range(1000)), encoding=\"utf-8\")\n\ndef lines(path):\n    # with open ... yield\n    pass\n\nprint(sum(1 for ln in lines(\"demo.txt\") if len(ln) > 20))",
  hint:"生成器一次只在内存里保留一行；readlines 会把整个文件读进列表。",
  hint_en:"A generator keeps only one line in memory at a time; readlines loads everything.",
  xp:25},
 {t:"线程与进程的取舍实验",t_en:"Threads vs Processes Experiment",
  req:["写一个 CPU 密集任务（累加求和）与一个模拟 I/O 的 sleep 任务","分别用 ThreadPoolExecutor 与 ProcessPoolExecutor 跑同一批任务并计时","根据结果说明为什么两类任务的结论不同"],
  req_en:["Write one CPU-bound task (summation) and one simulated I/O task (sleep)","Run both batches with ThreadPoolExecutor and ProcessPoolExecutor, and time them","Explain from the results why the two task types behave differently"],
  starter:"import time\nfrom concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\n\ndef cpu(n):\n    return sum(i * i for i in range(n))\n\ndef io_task(sec):\n    time.sleep(sec)\n    return sec\n\n# 分别用两种池跑一遍并计时\nprint(cpu(10 ** 5))",
  hint:"CPU 密集受 GIL 限制、用多进程；I/O 密集在等待时会释放 GIL，多线程即可。",
  hint_en:"CPU-bound work is limited by the GIL so use processes; I/O-bound work releases the GIL so threads suffice.",
  xp:25}
];
L["py-s10"] = [
 {t:"给已有函数补齐类型标注",t_en:"Adding Type Hints to Existing Code",
  req:["为一个含默认参数与可变参数的工具函数补齐参数与返回值标注","使用 Optional 与 Union 表达「可能为空」与「多类型」","用 mypy 或 IDE 提示检查一遍，确认没有明显类型错误"],
  req_en:["Add parameter and return type hints to a helper with default and variadic parameters","Use Optional and Union for possibly-empty and multi-type values","Run mypy or your IDE checker to confirm there are no obvious type errors"],
  starter:"from typing import Optional\n\ndef summarize(scores, scale=1.0, *extra):\n    # 补全类型标注\n    pass\n\ndef find_student(name):\n    # 返回 Optional[...]\n    pass",
  hint:"Optional[int] 等价于 Union[int, None]；Python 3.10+ 可以直接写 int | None。",
  hint_en:"Optional[int] equals Union[int, None]; Python 3.10+ allows int | None.",
  xp:25},
 {t:"写第一个 pytest 测试集",t_en:"Your First pytest Suite",
  req:["把两个纯函数放进 utils.py，在 tests/test_utils.py 里写至少 4 个用例","用 pytest.raises 验证异常分支，用 parametrize 覆盖多组输入","运行 pytest -v，确认全部通过并观察用例命名"],
  req_en:["Put two pure functions in utils.py and write at least four cases in tests/test_utils.py","Use pytest.raises for the error branch and parametrize for multiple inputs","Run pytest -v, confirm all pass and observe how tests are named"],
  starter:"# utils.py\ndef safe_div(a, b):\n    if b == 0:\n        raise ValueError(\"除数不能为 0\")\n    return a / b\n\n# tests/test_utils.py\n# import pytest\n# from utils import safe_div",
  hint:"测试文件与被测模块需能被导入，通常在项目根目录执行 pytest 即可自动找到。",
  hint_en:"Run pytest from the project root so both the tests and the module under test are importable.",
  xp:25}
];
/* ==================== C ==================== */
L["c-s1"] = [
 {t:"手动走一遍编译四阶段",t_en:"Walk Through the Four Compile Stages",
  req:["对同一个 .c 文件依次执行 gcc -E、-S、-c，观察三种产物的差别","用 file 或 ls -l 确认 .i、.s、.o 的文件类型与大小","最后链接成可执行文件并运行，检查输出是否正确"],
  req_en:["Run gcc -E, -S and -c on the same .c file and compare the three outputs","Use file or ls -l to describe the .i, .s and .o artifacts","Link to an executable and run it to confirm the output is right"],
  starter:"# gcc -E hello.c -o hello.i   # 只看预处理结果\n# gcc -S hello.c -o hello.s   # 生成汇编\n# gcc -c hello.c -o hello.o   # 生成目标文件\n# gcc hello.o -o hello        # 链接\n#include <stdio.h>\nint main(void){ printf(\"hello\\n\"); return 0; }",
  hint:"-E 只做预处理、-S 停在汇编、-c 停在目标文件；不加参数则一路链接到可执行文件。",
  hint_en:"-E stops after preprocessing, -S after assembly, -c after object code; no flag links all the way.",
  xp:25},
 {t:"多文件编译的最小工程",t_en:"Minimal Multi-file Build",
  req:["拆成 main.c 与 math_utils.c 两个源文件，配一个头文件声明函数","用 gcc main.c math_utils.c -o app 一次编译两个文件","故意删掉头文件里的分号，观察报错并说明为什么必须包含头文件"],
  req_en:["Split into main.c and math_utils.c plus a header declaring the functions","Compile both sources at once with gcc main.c math_utils.c -o app","Delete a semicolon in the header, observe the error and explain why headers matter"],
  starter:"/* math_utils.h */\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\n#endif\n\n/* math_utils.c 实现 add，main.c 调用它 */",
  hint:"头文件用 include guard 防止重复包含；它只放声明，实现留在 .c 里。",
  hint_en:"Headers use include guards and hold declarations only; implementations live in .c files.",
  xp:25}
];
L["c-s2"] = [
 {t:"整数与浮点的精度实验",t_en:"Integer and Float Precision Lab",
  req:["用 sizeof 打印 int、long、float、double 的字节数","用 printf 的 %.20f 输出 0.1 与 0.1+0.2，观察误差累积","测试 INT_MAX 加 1 的行为（在注释里记录现象并说明这是 UB）"],
  req_en:["Print the byte sizes of int, long, float and double with sizeof","Print 0.1 and 0.1+0.2 with %.20f and observe accumulated error","Test INT_MAX + 1, record what happens and explain that it is undefined behaviour"],
  starter:"#include <stdio.h>\n#include <limits.h>\n\nint main(void){\n    printf(\"int=%zu double=%zu\\n\", sizeof(int), sizeof(double));\n    printf(\"%.20f\\n\", 0.1 + 0.2);\n    printf(\"INT_MAX=%d\\n\", INT_MAX);\n    return 0;\n}",
  hint:"%.20f 能看清二进制浮点的真实值；想安全处理极值可以用 long long 或做溢出前判断。",
  hint_en:"%.20f reveals the true binary value; use long long or pre-checks to stay safe near the limits.",
  xp:25},
 {t:"显式转换与隐式转换对照",t_en:"Explicit vs Implicit Conversions",
  req:["把 int 与 double 混合运算的结果分别打印，观察提升规则","用强制转换 (int) 截断一个负数浮点，记录结果并解释","把 char 与 int 相互转换，打印字符与其编码"],
  req_en:["Mix int and double in expressions and observe the usual arithmetic conversions","Cast a negative double to int, record the result and explain it","Convert between char and int, printing both the character and its code"],
  starter:"#include <stdio.h>\n\nint main(void){\n    int a = 7; double b = 2.0;\n    printf(\"%f\\n\", a / b);\n    printf(\"%d\\n\", (int)-2.9);\n    printf(\"%c %d\\n\", 'A', 'A');\n    return 0;\n}",
  hint:"(int)-2.9 是向零截断，得到 -2 而不是 -3；char 本质是小整数，可与 int 互转。",
  hint_en:"(int)-2.9 truncates toward zero giving -2, not -3; char is really a small integer.",
  xp:25}
];
L["c-s3"] = [
 {t:"安全读入一整行的输入器",t_en:"Safe Line Reader",
  req:["用 fgets 读入最多 79 个字符的一整行，并把末尾换行去掉","输入超长时提示「过长已截断」，不要读崩溃","用 sscanf 把这一行按空格拆成两个整数并打印它们的和"],
  req_en:["Read a whole line of at most 79 characters with fgets and strip the trailing newline","Warn about truncation when the input is too long instead of crashing","Split the line into two integers with sscanf and print their sum"],
  starter:"#include <stdio.h>\n#include <string.h>\n\nint main(void){\n    char line[80];\n    if (!fgets(line, sizeof line, stdin)) return 0;\n    size_t n = strlen(line);\n    if (n && line[n-1] == '\\n') line[n-1] = 0;\n    int a = 0, b = 0;\n    printf(\"sum=%d\\n\", a + b);\n    return 0;\n}",
  hint:"fgets 会把换行也读进来，所以要先判断并去掉；sscanf 的返回值是用成功解析的项数。",
  hint_en:"fgets keeps the newline so strip it first; sscanf returns the number of successfully parsed items.",
  xp:25},
 {t:"成绩表的对齐输出",t_en:"Aligned Score Table",
  req:["用 printf 输出一张三列成绩表：姓名左对齐、两门分数右对齐","表头与分隔线也要对齐，宽度自定但需一致","最后输出一行平均分，保留两位小数"],
  req_en:["Print a three-column score table with the name left-aligned and scores right-aligned","Align the header and a separator row consistently","Print an average row keeping two decimals"],
  starter:"#include <stdio.h>\n\nint main(void){\n    printf(\"%-8s%8s%8s\\n\", \"姓名\", \"数学\", \"英语\");\n    printf(\"-------- -------- --------\\n\");\n    printf(\"%-8s%8d%8d\\n\", \"小明\", 92, 78);\n    return 0;\n}",
  hint:"%-8s 表示左对齐宽度 8，%8d 表示右对齐宽度 8，宽度不足时会自动扩宽不会截断。",
  hint_en:"%-8s left-aligns in width 8 and %8d right-aligns; fields widen rather than truncate.",
  xp:25}
];
L["c-s4"] = [
 {t:"用嵌套循环打印图形",t_en:"Drawing Shapes with Nested Loops",
  req:["用两层循环打印直角三角形、倒直角三角形各一个","再打印一个居中的等腰三角形（思考前面空格的规律）","把三个图形分别写成一个函数，main 里依次调用"],
  req_en:["Use nested loops to print a right triangle and an inverted right triangle","Print a centred isosceles triangle, working out the leading spaces","Wrap each shape in its own function and call them all from main"],
  starter:"#include <stdio.h>\n\nvoid right_triangle(int n){\n    for (int i = 1; i <= n; i++){\n        for (int j = 0; j < i; j++) putchar('*');\n        putchar('\\n');\n    }\n}\n\nint main(void){ right_triangle(5); return 0; }",
  hint:"等腰三角形的第 i 行有 (n-i) 个空格和 (2i-1) 个星号，先算空格再算星号。",
  hint_en:"Row i of an isosceles triangle has (n-i) spaces and (2i-1) stars.",
  xp:25},
 {t:"do-while 写的输入校验器",t_en:"Input Validator with do-while",
  req:["用 do-while 循环反复要求输入 1~100 之间的整数，直到合法为止","输入非数字时清空输入缓冲区，避免死循环","用一个 is_valid 函数封装合法性判断，main 只负责交互"],
  req_en:["Loop with do-while until the user enters an integer in 1..100","Clear the input buffer when a non-number is entered to avoid an infinite loop","Encapsulate validation in is_valid so main only handles interaction"],
  starter:"#include <stdio.h>\n\nint is_valid(int v){ return v >= 1 && v <= 100; }\n\nint main(void){\n    int v = 0;\n    do {\n        printf(\"请输入 1~100：\");\n        if (scanf(\"%d\", &v) != 1){ int ch; while ((ch = getchar()) != '\\n' && ch != EOF) {} }\n    } while (!is_valid(v));\n    printf(\"接受：%d\\n\", v);\n    return 0;\n}",
  hint:"scanf 解析失败时该字符仍留在缓冲区，必须手动吃掉，否则会被反复读到。",
  hint_en:"On parse failure scanf leaves the offending character buffered, so consume it manually.",
  xp:25}
];
L["c-s5"] = [
 {t:"用指针实现交换与统计",t_en:"Swap and Statistics via Pointers",
  req:["写 swap(int *a, int *b) 交换两个整数，main 里验证生效","写 minmax 一次求出数组的最小值与最大值（通过指针参数返回）","统计数组元素之和与平均值，全部用一个函数完成"],
  req_en:["Write swap(int *a, int *b) and verify it works from main","Write minmax that returns both the minimum and maximum through pointer parameters","Compute sum and average in a single function"],
  starter:"#include <stdio.h>\n\nvoid swap(int *a, int *b){ int t = *a; *a = *b; *b = t; }\n\nvoid minmax(const int *a, int n, int *mn, int *mx){\n    /* 遍历并写回结果 */\n}\n\nint main(void){ int x = 1, y = 2; swap(&x, &y); printf(\"%d %d\\n\", x, y); return 0; }",
  hint:"用 const int * 明确「只读」意图，既保护数据又让调用方放心。",
  hint_en:"const int * documents read-only intent, protecting the data and reassuring callers.",
  xp:25},
 {t:"递归实现阶乘与斐波那契",t_en:"Factorial and Fibonacci by Recursion",
  req:["分别用递归写出 factorial 与 fibonacci","统计 fib(10) 的递归调用次数（加一个静态或全局计数器）","对比带记忆化的版本，说明调用次数的差别"],
  req_en:["Implement factorial and fibonacci recursively","Count the number of recursive calls for fib(10) with a counter","Compare with a memoised version and explain the difference in call counts"],
  starter:"#include <stdio.h>\n\nlong long fib(int n){\n    if (n < 2) return n;\n    return fib(n-1) + fib(n-2);\n}\n\nint main(void){ printf(\"%lld\\n\", fib(10)); return 0; }",
  hint:"朴素斐波那契是 O(2^n)，记忆化（数组或静态表）后降到 O(n)。",
  hint_en:"Naive Fibonacci is O(2^n); memoising with an array brings it down to O(n).",
  xp:25}
];
L["c-s6"] = [
 {t:"手写三个字符串函数",t_en:"Three String Functions by Hand",
  req:["不用标准库，自己实现 my_strlen、my_strcpy、my_strcmp","my_strcmp 需要返回负数/0/正数，语义与 strcmp 一致","写测试用例覆盖空串、等长不等内容、前缀三种情况"],
  req_en:["Implement my_strlen, my_strcpy and my_strcmp without the standard library","Make my_strcmp return negative/zero/positive with the same semantics as strcmp","Cover empty strings, equal-length different content and prefix cases"],
  starter:"#include <stdio.h>\n\nsize_t my_strlen(const char *s){\n    size_t n = 0;\n    while (s[n]) n++;\n    return n;\n}\n\nint main(void){ printf(\"%zu\\n\", my_strlen(\"hello\")); return 0; }",
  hint:"C 字符串以空字符结束，所有手写实现都要以 s[i] == 0 作为循环终止条件。",
  hint_en:"C strings end with a null character, so every hand-written loop should stop at s[i] == 0.",
  xp:25},
 {t:"单词计数与最长单词",t_en:"Word Count and Longest Word",
  req:["读入一行文本，统计其中单词个数（以空白分隔）","找出最长的那个单词并打印，长度相同取第一个","把结果同时打印到屏幕和写入一个 result.txt"],
  req_en:["Read one line of text and count the words separated by whitespace","Find and print the longest word, taking the first on ties","Print the result to the screen and also write it to result.txt"],
  starter:"#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\n\nint main(void){\n    char line[256];\n    if (!fgets(line, sizeof line, stdin)) return 0;\n    int words = 0, in_word = 0;\n    /* 逐字符扫描，遇到空白切分单词 */\n    printf(\"words=%d\\n\", words);\n    return 0;\n}",
  hint:"用 in_word 标志判断是否处于单词内部，只在从 0 变 1 时给计数加一。",
  hint_en:"Use an in_word flag and increment the counter only on the 0-to-1 transition.",
  xp:25}
];
L["c-s7"] = [
 {t:"用指针遍历数组的三种写法",t_en:"Three Ways to Walk an Array",
  req:["分别用下标、指针自增、指针相减求长度三种方式遍历同一数组","用 *(p + i) 与 p[i] 各打印一遍，确认两者等价","写一个只用指针参数（无长度参数）的函数统计正数个数"],
  req_en:["Traverse the same array by index, by incrementing a pointer, and by pointer difference","Print once with *(p + i) and once with p[i] to confirm they are equivalent","Write a function with only a pointer parameter that counts positive values"],
  starter:"#include <stdio.h>\n\nint main(void){\n    int a[] = {3, -1, 4, -1, 5};\n    int *p = a, *end = a + sizeof a / sizeof a[0];\n    for (; p < end; p++) printf(\"%d \", *p);\n    printf(\"\\ncount=%zu\\n\", (size_t)(end - a));\n    return 0;\n}",
  hint:"指针相减得到的是元素个数；p < end 比 p != end 更安全，遇到越界也不会死循环。",
  hint_en:"Pointer subtraction yields an element count; p < end is safer than p != end.",
  xp:25},
 {t:"二级指针与字符串数组",t_en:"Double Pointers and String Arrays",
  req:["定义一个字符串数组（char *names[]）并用 sizeof 算出元素个数","写一个函数接收 char ** 打印全部名字","用 const char *const * 版本再写一次，说明每层 const 的含义"],
  req_en:["Define a string array (char *names[]) and compute its length with sizeof","Write a function taking char ** that prints every name","Rewrite it with const char *const * and explain what each const protects"],
  starter:"#include <stdio.h>\n\nvoid print_all(char **names, int n){\n    for (int i = 0; i < n; i++) printf(\"%s\\n\", names[i]);\n}\n\nint main(void){\n    char *names[] = {\"Ann\", \"Bob\", \"Cid\"};\n    print_all(names, sizeof names / sizeof names[0]);\n    return 0;\n}",
  hint:"const char *const * 表示「指针本身不可改」且「它指向的字符不可改」，两层保护都要写在 const 的位置上。",
  hint_en:"const char *const * protects both the outer pointers and the characters they point to.",
  xp:25}
];
L["c-s8"] = [
 {t:"手写可增长的动态数组",t_en:"Hand-written Dynamic Array",
  req:["实现 init/push/free 三个操作，容量不足时按 2 倍扩容","每扩容一次打印新容量，观察增长曲线","用 valgrind 或手动统计确认没有泄漏与越界"],
  req_en:["Implement init/push/free, doubling capacity when full","Print the new capacity on each reallocation to see the growth curve","Confirm there are no leaks or out-of-bounds writes with valgrind or careful counting"],
  starter:"#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct { int *data; size_t len, cap; } Vec;\n\nvoid vec_init(Vec *v){ v->data = NULL; v->len = v->cap = 0; }\nvoid vec_push(Vec *v, int x){ /* 必要时 2 倍扩容 */ }\nvoid vec_free(Vec *v){ free(v->data); v->data = NULL; v->len = v->cap = 0; }\n\nint main(void){ Vec v; vec_init(&v); for (int i = 0; i < 20; i++) vec_push(&v, i); vec_free(&v); return 0; }",
  hint:"扩容时要用 realloc 返回的新指针覆盖旧指针，并检查返回值是否为 NULL。",
  hint_en:"Overwrite the old pointer with realloc's return value and always check it for NULL.",
  xp:25},
 {t:"内存泄漏与悬垂指针现场复现",t_en:"Reproduce Leaks and Dangling Pointers",
  req:["写一个函数申请内存后提前 return，制造一处泄漏并说明成因","再写一段 free 之后仍继续使用该指针的代码，指出这是 UB","用 AddressSanitizer（-fsanitize=address）跑一遍，观察报错输出"],
  req_en:["Write a function that returns early after allocating, creating a leak, and explain why","Write code that keeps using a pointer after free and flag it as undefined behaviour","Run with -fsanitize=address and observe the reported error"],
  starter:"#include <stdio.h>\n#include <stdlib.h>\n\nint *make(int n){ return malloc(n * sizeof(int)); }\n\nint main(void){\n    int *p = make(4);\n    /* 使用后忘记 free */\n    printf(\"%p\\n\", (void *)p);\n    return 0;\n}",
  hint:"编译时加 -g -fsanitize=address，运行后 ASan 会直接指出泄漏点或非法访问的行号。",
  hint_en:"Compile with -g -fsanitize=address; ASan then points at the leaking or invalid line.",
  xp:25}
];
L["c-s9"] = [
 {t:"结构体数组的成绩管理",t_en:"Score Management with a Struct Array",
  req:["定义含姓名、数学、英语三个字段的结构体","用结构体数组存 4 名学生，按总分从高到低排序","写一个 find 函数按姓名查找，找到返回下标、否则返回 -1"],
  req_en:["Define a struct with name plus two score fields","Store four students in a struct array and sort by total score descending","Write find() returning the index by name, or -1 when absent"],
  starter:"#include <stdio.h>\n#include <string.h>\n\ntypedef struct { char name[16]; int math, english; } Student;\n\nint total(const Student *s){ return s->math + s->english; }\n\nint main(void){\n    Student all[4] = {{\"Ann\", 90, 80}, {\"Bob\", 70, 95}, {\"Cid\", 60, 60}, {\"Dan\", 88, 88}};\n    /* 按 total 排序并输出 */\n    return 0;\n}",
  hint:"字符串比较用 strcmp，字符串赋值用 strcpy；排序用 qsort 加比较函数即可。",
  hint_en:"Use strcmp for comparison and strcpy for assignment; qsort with a comparator does the sorting.",
  xp:25},
 {t:"用宏与条件编译做调试开关",t_en:"Debug Switch via Macros",
  req:["定义带参数的宏 MAX(a,b) 与 SQUARE(x)，参数都加括号","定义 DEBUG 开关，用 #ifdef 控制调试日志是否编译进程序","故意写一个不加括号的宏，演示展开后的错误结果"],
  req_en:["Define MAX(a,b) and SQUARE(x) macros with fully parenthesised parameters","Add a DEBUG switch and guard debug logging with #ifdef","Write a macro without parentheses and show the wrong expansion result"],
  starter:"#include <stdio.h>\n\n#define MAX(a,b) ((a) > (b) ? (a) : (b))\n#define SQUARE(x) ((x) * (x))\n/* #define DEBUG 1 */\n\nint main(void){\n    printf(\"%d\\n\", MAX(3, 5));\n#ifdef DEBUG\n    printf(\"debug: ok\\n\");\n#endif\n    return 0;\n}",
  hint:"宏只做文本替换，所有参数与整体都要加括号，否则运算符优先级会破坏语义。",
  hint_en:"Macros are pure text substitution, so parenthesise every parameter and the whole body.",
  xp:25}
];
L["c-s10"] = [
 {t:"文件词频统计（带错误处理）",t_en:"File Word Frequency with Error Handling",
  req:["用 fopen 打开命令行传入的文件，失败时 perror 并返回非零退出码","逐行读取并统计每个单词出现次数（用固定大小散列表或简单数组）","按出现次数从高到低输出前 10 个单词"],
  req_en:["Open the file given on the command line, calling perror and exiting non-zero on failure","Read line by line and count occurrences using a simple hash table or array","Print the top 10 words by count, descending"],
  starter:"#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char **argv){\n    if (argc < 2){ fprintf(stderr, \"用法: %s <file>\\n\", argv[0]); return 1; }\n    FILE *fp = fopen(argv[1], \"r\");\n    if (!fp){ perror(\"fopen\"); return 1; }\n    /* 逐行读取并统计 */\n    fclose(fp);\n    return 0;\n}",
  hint:"COUNT 用一个足够大的表并处理冲突，或者只统计固定的几个关键字以降低难度。",
  hint_en:"Use a table large enough with collision handling, or restrict counting to a few known keywords.",
  xp:25},
 {t:"函数指针实现小型计算器",t_en:"Calculator with Function Pointers",
  req:["把加减乘除写成四个函数，用函数指针数组存放它们","根据输入的操作符字符选择对应函数并调用","加入除零检查，非法操作符时打印可用列表"],
  req_en:["Write four arithmetic functions and store pointers to them in an array","Select and call the right function from the operator character","Add a divide-by-zero check and print available operators for invalid input"],
  starter:"#include <stdio.h>\n\ndouble add(double a, double b){ return a + b; }\ndouble mul(double a, double b){ return a * b; }\n\ntypedef double (*BinOp)(double, double);\n\nint main(void){\n    BinOp ops[2] = { add, mul };\n    printf(\"%.2f\\n\", ops[0](1.5, 2.5));\n    return 0;\n}",
  hint:"typedef 能把函数指针类型写成可读的名字；调用时直接 ops[i](a, b) 即可。",
  hint_en:"typedef makes function-pointer types readable; call them directly as ops[i](a, b).",
  xp:25}
];
/* ==================== C++ ==================== */
L["cpp-s1"] = [
 {t:"探明 sizeof 与作用域的边界",t_en:"Probing sizeof and Scope",
  req:["分别用 sizeof 打印内置类型、指针在 32/64 位下的理论大小并解释差异","写一个同名变量的全局与局部版本，打印以确认作用域遮蔽","在代码块内定义同名变量，退出块后再次打印，观察取值变化"],
  req_en:["Print sizeof for builtin types and pointers and explain 32/64-bit differences","Declare one global and one local variable with the same name and confirm shadowing","Shadow inside an inner block, then print again after leaving the block"],
  starter:"#include <iostream>\nint g = 10;\nint main(){\n    int g = 20;\n    std::cout << g << \" \" << ::g << std::endl;\n    { int g = 30; std::cout << g << std::endl; }\n    std::cout << sizeof(void*) << std::endl;\n    return 0;\n}",
  hint:"::g 表示全局作用域；同名变量在内层会遮蔽外层，出块即恢复。",
  hint_en:"::g refers to the global scope; inner declarations shadow outer ones until the block ends.",
  xp:25},
 {t:"用 std::string 重写 C 风格字符串处理",t_en:"Rewriting C-style String Code with std::string",
  req:["把一段用 char[] 与 strcpy 写的拼接、比较、求长逻辑改用 std::string","用 substr、find、append 各完成一个操作并对比代码量","统计两版代码的行数与出错风险点差异"],
  req_en:["Rewrite concatenation, comparison and length logic from char[]/strcpy to std::string","Use substr, find and append for three operations and compare the amount of code","Compare line counts and failure modes of both versions"],
  starter:"#include <iostream>\n#include <string>\nint main(){\n    std::string a = \"hello\", b = \"world\";\n    std::string c = a + \" \" + b;\n    std::cout << c.size() << \" \" << c.find(\"world\") << std::endl;\n    return 0;\n}",
  hint:"std::string 自己管理内存与长度，不需要再关心缓冲区大小与结尾空字符。",
  hint_en:"std::string manages memory and length itself, so no buffer sizes or terminators are needed.",
  xp:25}
];
L["cpp-s2"] = [
 {t:"const 与 constexpr 的取舍",t_en:"const vs constexpr",
  req:["定义三个量：运行期只读（const）、编译期常量（constexpr）、函数返回的只读引用","把 constexpr 变量用作数组长度，把 const 变量也试一次并观察报错","写一个 constexpr 函数并在编译期求值，打印结果"],
  req_en:["Define three values: a run-time read-only const, a compile-time constexpr, and a read-only reference returned from a function","Use a constexpr value as an array length, then try with a const and observe the error","Write a constexpr function, evaluate it at compile time and print the result"],
  starter:"#include <iostream>\nconstexpr int kN = 4;\nconstexpr int square(int x){ return x * x; }\nint main(){\n    int a[kN] = {1, 2, 3, 4};\n    std::cout << sizeof a / sizeof a[0] << \" \" << square(5) << std::endl;\n    return 0;\n}",
  hint:"const 只保证不可修改，不等于编译期常量；constexpr 才要求编译期可求值。",
  hint_en:"const only prevents modification; constexpr additionally requires compile-time evaluation.",
  xp:25},
 {t:"引用与指针的对照实验",t_en:"References vs Pointers",
  req:["写一个函数分别用引用与指针交换两个数，比较调用写法","写一个返回引用的函数（返回容器内元素），并说明不能返回局部变量的引用","用 const 引用接收大对象参数，观察是否发生拷贝"],
  req_en:["Swap two numbers via reference and via pointer, then compare the call sites","Write a function returning a reference into a container and explain why a local reference is illegal","Take a large object by const reference and observe whether a copy happens"],
  starter:"#include <iostream>\n#include <vector>\nvoid byRef(int &a, int &b){ int t = a; a = b; b = t; }\nvoid byPtr(int *a, int *b){ int t = *a; *a = *b; *b = t; }\nint main(){ int x = 1, y = 2; byRef(x, y); byPtr(&x, &y); std::cout << x << y; }",
  hint:"返回局部变量的引用是悬垂引用，属于未定义行为；返回容器元素的引用则安全。",
  hint_en:"Returning a reference to a local is dangling and undefined; a reference into a container is fine.",
  xp:25}
];
L["cpp-s3"] = [
 {t:"范围 for 与结构化绑定实战",t_en:"Range-for and Structured Bindings",
  req:["用 range-for 遍历 map<string,int> 并打印键值对","用结构化绑定把 pair 与结构体成员一次拆开","同一段逻辑用 const auto& 与 auto 各写一次，说明差别"],
  req_en:["Iterate a map<string,int> with range-for and print each pair","Destructure a pair and a struct's members in one binding statement","Write the same loop with const auto& and with auto, then explain the difference"],
  starter:"#include <iostream>\n#include <map>\nint main(){\n    std::map<std::string,int> m{{\"a\",1},{\"b\",2}};\n    for (const auto& [k, v] : m) std::cout << k << \"=\" << v << std::endl;\n    return 0;\n}",
  hint:"auto 会拷贝元素；写 const auto& 才能避免不必要的拷贝。",
  hint_en:"auto copies the element; const auto& avoids the copy.",
  xp:25},
 {t:"用初始化列表拦住窄化",t_en:"Stopping Narrowing with Braces",
  req:["用花括号初始化一个 int、一个 double、一个 vector","故意用花括号把 double 塞进 int，观察编译错误","把同一份数据用圆括号初始化再试一次，比较结果并解释"],
  req_en:["Brace-initialise an int, a double and a vector","Deliberately brace-initialise an int from a double and observe the compile error","Repeat with parentheses and compare, then explain the difference"],
  starter:"#include <iostream>\n#include <vector>\nint main(){\n    int a{42};\n    std::vector<int> v{1, 2, 3};\n    // int bad{3.7};  // 编译错误：窄化\n    std::cout << a << v.size() << std::endl;\n    return 0;\n}",
  hint:"花括号初始化禁止窄化转换，这是它在编译期就能拦住精度丢失的原因。",
  hint_en:"Brace initialisation forbids narrowing, catching precision loss at compile time.",
  xp:25}
];
L["cpp-s4"] = [
 {t:"用 lambda 写一套排序比较器",t_en:"Sorting Comparators with Lambdas",
  req:["对一个结构体 vector 分别按分数降序、按姓名升序排序","其中一版用捕获列表捕获外部阈值，实现「只排及格的」","把 lambda 存进 std::function 变量并在需要时复用"],
  req_en:["Sort a struct vector by score descending and by name ascending","Use one version that captures an external threshold and sorts only passing entries","Store a lambda in a std::function and reuse it later"],
  starter:"#include <algorithm>\n#include <vector>\n#include <string>\nstruct S { std::string n; int p; };\nint main(){\n    std::vector<S> v{{\"a\", 60}, {\"b\", 90}};\n    std::sort(v.begin(), v.end(), [](const S& x, const S& y){ return x.p > y.p; });\n    return 0;\n}",
  hint:"比较器必须满足严格弱序，写成 <= 会在相等元素上触发未定义行为。",
  hint_en:"Comparators must be a strict weak ordering; using <= causes undefined behaviour on ties.",
  xp:25},
 {t:"统计函数的多种传参对比",t_en:"Argument Passing Compared",
  req:["同一个统计函数分别写成传值、传 const 引用、传指针三个版本","用一段较大的 vector 计时，比较三种写法的耗时差异","总结分别在什么场景下选择哪种传参方式"],
  req_en:["Write the same statistics function taking by value, by const reference and by pointer","Time all three on a large vector and compare the cost","Summarise when each form should be used"],
  starter:"#include <chrono>\n#include <iostream>\n#include <vector>\n#include <numeric>\ndouble sumByValue(std::vector<int> v){ return std::accumulate(v.begin(), v.end(), 0.0); }\ndouble sumByRef(const std::vector<int>& v){ return std::accumulate(v.begin(), v.end(), 0.0); }\nint main(){ std::vector<int> v(1000000, 1); std::cout << sumByRef(v) << std::endl; return 0; }",
  hint:"传值会复制整个容器；大对象一律用 const 引用，小内置类型传值反而更快。",
  hint_en:"By-value copies the whole container; use const reference for large objects and by-value for small scalars.",
  xp:25}
];
L["cpp-s5"] = [
 {t:"用 Rule of Zero 写一个资源类",t_en:"A Resource Class by Rule of Zero",
  req:["写一个持有 std::vector 的类，不写任何拷贝/移动/析构函数","验证它仍能安全拷贝、移动并在作用域结束时释放资源","显式 = delete 掉一个不该有的成员函数，说明理由"],
  req_en:["Write a class owning a std::vector without declaring copy/move/destructor","Verify it can still be copied and moved safely and frees its resource at scope exit","Explicitly = delete a member function that should not exist and explain why"],
  starter:"#include <vector>\n#include <string>\nclass Buffer {\n    std::vector<char> data_;\n    std::string name_;\npublic:\n    Buffer(std::string n, std::size_t n_bytes) : name_(std::move(n)), data_(n_bytes) {}\n};\nint main(){ Buffer a{\"a\", 16}; Buffer b = a; return 0; }",
  hint:"把资源交给标准库类型管理，编译器生成的拷贝/移动/析构就都是正确的，这就是 Rule of Zero。",
  hint_en:"Letting standard types own the resources makes the compiler-generated special members correct.",
  xp:25},
 {t:"运算符重载：一个可比较的复数类",t_en:"Operator Overloading: a Comparable Complex Type",
  req:["实现 Complex 类，重载 + 与 - 运算","重载 == 与 !=，再重载 << 让它能直接 cout","重载 += 作为成员函数，比较与自由函数的写法差异"],
  req_en:["Implement a Complex class overloading + and -","Overload == and !=, then << so it prints with cout","Overload += as a member and compare with the free-function style"],
  starter:"#include <iostream>\nstruct Complex {\n    double re = 0, im = 0;\n    Complex operator+(const Complex& o) const { return {re + o.re, im + o.im}; }\n};\nstd::ostream& operator<<(std::ostream& os, const Complex& c){ return os << c.re << (c.im >= 0 ? \"+\" : \"\") << c.im << \"i\"; }\nint main(){ std::cout << (Complex{1,2} + Complex{3,4}) << std::endl; }",
  hint:"<< 必须写成非成员函数并把流作为第一个参数，否则无法链式书写 cout << a << b。",
  hint_en:"<< must be a free function taking the stream first so that chaining works.",
  xp:25}
];
L["cpp-s6"] = [
 {t:"接口 + 多态的商品结算系统",t_en:"Polymorphic Checkout with an Interface",
  req:["定义抽象基类 Item，含纯虚函数 price() 与 name()","派生 Book 与 Food，各自实现 price()（Food 带折扣）","用 unique_ptr<Item> 容器统一结算并打印小票"],
  req_en:["Define an abstract base Item with pure virtual price() and name()","Derive Book and Food, each implementing price() (Food applies a discount)","Keep unique_ptr<Item> in a container, compute the total and print a receipt"],
  starter:"#include <iostream>\n#include <memory>\n#include <vector>\nstruct Item {\n    virtual ~Item() = default;\n    virtual double price() const = 0;\n    virtual std::string name() const = 0;\n};\nint main(){\n    std::vector<std::unique_ptr<Item>> cart;\n    return 0;\n}",
  hint:"抽象基类必须有虚析构，否则通过基类指针删除派生对象会漏掉派生部分的析构。",
  hint_en:"An abstract base needs a virtual destructor so deleting through a base pointer runs the full chain.",
  xp:25},
 {t:"用 override 捕获签名不匹配",t_en:"Catching Signature Mismatches with override",
  req:["写一个基类虚函数与一个「看起来重写了」但参数类型不同的派生函数","给派生函数加上 override，记录编译器的报错信息","改正签名后重新编译，确认报错消失"],
  req_en:["Write a base virtual function and a derived one that looks like an override but has a different parameter type","Add override to the derived one and record the compiler error","Fix the signature, rebuild and confirm the error is gone"],
  starter:"#include <iostream>\nstruct Base { virtual void show(int) const { std::cout << \"base\\n\"; } };\nstruct Derived : Base {\n    // void show(double) const override { }  // 会报错\n    void show(int) const override { std::cout << \"derived\\n\"; }\n};\nint main(){ Derived d; Base* p = &d; p->show(1); }",
  hint:"override 让「以为重写了其实没有」这类隐患在编译期就暴露出来，应当尽量写上。",
  hint_en:"override surfaces accidental non-overrides at compile time, so use it whenever possible.",
  xp:25}
];
L["cpp-s7"] = [
 {t:"写一个简易泛型栈",t_en:"A Small Generic Stack",
  req:["用类模板实现 push/pop/top/empty 四个操作","用 int、std::string 两种类型各实例化一次并运行","为 pop 增加空栈保护，抛出 std::out_of_range"],
  req_en:["Implement push/pop/top/empty with a class template","Instantiate it for int and std::string and run both","Add empty-stack protection to pop that throws std::out_of_range"],
  starter:"#include <iostream>\n#include <vector>\n#include <stdexcept>\ntemplate <typename T>\nclass Stack {\n    std::vector<T> v_;\npublic:\n    void push(const T& x){ v_.push_back(x); }\n    T pop(){ if (v_.empty()) throw std::out_of_range(\"empty\"); T t = v_.back(); v_.pop_back(); return t; }\n    bool empty() const { return v_.empty(); }\n};\nint main(){ Stack<int> s; s.push(1); std::cout << s.pop(); }",
  hint:"模板的定义要放在头文件里；成员函数只有被使用时才会实例化。",
  hint_en:"Template definitions belong in headers; members are instantiated only when used.",
  xp:25},
 {t:"用变参模板写一个 print_all",t_en:"Variadic print_all",
  req:["写一个函数模板 print_all(args...)，把每个参数打印在同一行","用折叠表达式实现，不需要递归展开","尝试传入混合类型（int、double、string）并确认都能打印"],
  req_en:["Write a function template print_all(args...) printing every argument on one line","Implement it with a fold expression instead of recursion","Pass mixed types (int, double, string) and confirm all print"],
  starter:"#include <iostream>\ntemplate <typename... Ts>\nvoid print_all(const Ts&... xs){\n    ((std::cout << xs << ' '), ...);\n    std::cout << std::endl;\n}\nint main(){ print_all(1, 2.5, \"hi\"); }",
  hint:"折叠表达式 ((expr), ...) 用逗号把每个参数展开的表达式从左到右求值，非常简洁。",
  hint_en:"The fold expression ((expr), ...) evaluates each expansion left to right, very concise.",
  xp:25}
];
L["cpp-s8"] = [
 {t:"用 STL 做词频统计与排行",t_en:"Word Frequency and Ranking with STL",
  req:["用 istringstream 逐个读出单词，用 map 计数","把结果搬到 vector 里按次数降序、次数相同按字典序排序","只输出前 5 名并统计不重复单词数"],
  req_en:["Read words with istringstream and count them in a map","Move the pairs into a vector and sort by count descending, then alphabetically","Print the top 5 and report the number of distinct words"],
  starter:"#include <algorithm>\n#include <iostream>\n#include <map>\n#include <sstream>\n#include <vector>\nint main(){\n    std::istringstream in(\"to be or not to be\");\n    std::map<std::string,int> m;\n    std::string w;\n    while (in >> w) m[w]++;\n    std::vector<std::pair<std::string,int>> v(m.begin(), m.end());\n    std::sort(v.begin(), v.end(), [](auto& a, auto& b){ return a.second != b.second ? a.second > b.second : a.first < b.first; });\n    return 0;\n}",
  hint:"比较器里必须先比次数再比名字，才能保证排序结果稳定可预期。",
  hint_en:"Compare count first, then the key, so the ordering is fully determined.",
  xp:25},
 {t:"迭代器失效复现实验",t_en:"Reproducing Iterator Invalidation",
  req:["写一段在 range-for 中给 vector push_back 的代码，复现迭代器失效","改成先收集待添加元素、遍历结束后统一插入，验证问题消失","把容器换成 std::list 再试一次，解释为什么它不会失效"],
  req_en:["Write a range-for that push_backs into the same vector and reproduce iterator invalidation","Collect the new items first and insert after the loop, confirming the problem disappears","Repeat with std::list and explain why invalidation does not occur there"],
  starter:"#include <vector>\n#include <iostream>\nint main(){\n    std::vector<int> v{1, 2, 3};\n    // for (int x : v) v.push_back(x);  // 危险：迭代器可能失效\n    std::vector<int> add;\n    for (int x : v) add.push_back(x * 10);\n    v.insert(v.end(), add.begin(), add.end());\n    std::cout << v.size() << std::endl;\n}",
  hint:"vector 扩容会重新分配整块内存，之前拿到的迭代器、指针、引用全部作废。",
  hint_en:"Growing a vector reallocates its storage, invalidating every iterator, pointer and reference.",
  xp:25}
];
L["cpp-s9"] = [
 {t:"用智能指针重写一段裸指针代码",t_en:"Rewriting Raw Pointers with Smart Pointers",
  req:["把一段 new/delete 的手工管理代码改为 unique_ptr","再写一版 shared_ptr 版本，打印 use_count 的变化过程","用 weak_ptr 观察对象，验证它不会阻止对象销毁"],
  req_en:["Convert a manual new/delete snippet to unique_ptr","Write a shared_ptr version and print how use_count changes","Observe the object with weak_ptr and confirm it does not keep the object alive"],
  starter:"#include <iostream>\n#include <memory>\nint main(){\n    auto p = std::make_shared<int>(7);\n    std::cout << p.use_count() << std::endl;\n    std::weak_ptr<int> w = p;\n    std::cout << p.use_count() << \" \" << w.expired() << std::endl;\n    p.reset();\n    std::cout << w.expired() << std::endl;\n}",
  hint:"weak_ptr 不增加引用计数，所以 use_count 不变；expired() 用来判断对象是否已经销毁。",
  hint_en:"weak_ptr does not bump the count, so use_count stays put; expired() tells you whether it is gone.",
  xp:25},
 {t:"移动语义带来的性能差异",t_en:"Performance Gain from Move Semantics",
  req:["写一个持有大数组的类，分别实现并打印拷贝构造与移动构造的日志","在 vector 里装入多个对象，观察拷贝与移动各发生多少次","对比 return 局部对象时是否触发移动（或 NRVO）"],
  req_en:["Write a class owning a big array and log copy vs move construction","Push several objects into a vector and count how many copies and moves happen","Check whether returning a local triggers a move or NRVO"],
  starter:"#include <iostream>\n#include <vector>\nstruct Big {\n    std::vector<int> data;\n    Big() : data(100000, 1) {}\n    Big(const Big& o) : data(o.data) { std::cout << \"copy\\n\"; }\n    Big(Big&& o) noexcept : data(std::move(o.data)) { std::cout << \"move\\n\"; }\n};\nint main(){ std::vector<Big> v; v.push_back(Big{}); v.push_back(Big{}); }",
  hint:"移动构造标记 noexcept 后，vector 扩容时才会选择移动而不是拷贝。",
  hint_en:"Marking the move constructor noexcept lets vector move instead of copy on reallocation.",
  xp:25}
];
L["cpp-s10"] = [
 {t:"自定义异常体系与 RAII 守卫",t_en:"Custom Exception Hierarchy and an RAII Guard",
  req:["定义继承 std::runtime_error 的两种异常，区分「参数错误」与「状态错误」","写一个 RAII 守卫类，构造时加锁标志、析构时还原，验证异常路径也能还原","在 main 里分别触发两种异常并捕获，打印各自的错误信息"],
  req_en:["Define two exceptions deriving from std::runtime_error for bad arguments and bad state","Write an RAII guard that sets a flag on construction and restores it on destruction, even on exceptions","Throw and catch both from main, printing each message"],
  starter:"#include <iostream>\n#include <stdexcept>\nstruct BadArg : std::runtime_error { using std::runtime_error::runtime_error; };\nstruct BadState : std::runtime_error { using std::runtime_error::runtime_error; };\nint main(){\n    try { throw BadArg(\"参数不能为负\"); }\n    catch (const std::exception& e) { std::cout << e.what() << std::endl; }\n}",
  hint:"捕获时按 const std::exception& 接住即可，RTTI 会保留派生类型，不会发生切片。",
  hint_en:"Catching by const std::exception& keeps the derived type intact thanks to RTTI.",
  xp:25},
 {t:"多线程累加并验证正确性",t_en:"Multithreaded Summation and Correctness Check",
  req:["把一个大数组分给 4 个线程分别累加，最后汇总结果","先不加锁跑一遍，观察结果与单线程是否一致（大概率不一致）","改用 std::atomic 或分块汇总（每线程独立局部和）再跑一遍"],
  req_en:["Split a large array across four threads, each summing its own slice","Run without synchronisation first and compare with the single-threaded result","Switch to std::atomic or per-thread partial sums and run again"],
  starter:"#include <atomic>\n#include <iostream>\n#include <thread>\n#include <vector>\nint main(){\n    std::vector<int> v(100000, 1);\n    std::atomic<long long> total{0};\n    std::vector<std::thread> ts;\n    for (int t = 0; t < 4; t++) ts.emplace_back([&]{ long long s = 0; for (int x : v) s += x; total += s; });\n    for (auto& t : ts) t.join();\n    std::cout << total.load() << std::endl;\n}",
  hint:"共享变量上做读-改-写必须原子化；更快的做法是每线程算局部和、最后只汇总一次。",
  hint_en:"Read-modify-write on shared data must be atomic; per-thread partial sums are even faster.",
  xp:25}
];
/* ==================== Java ==================== */
L["java-s1"] = [
 {t:"用一个源文件装多个类",t_en:"Multiple Classes in One Source File",
  req:["在同一个 .java 文件中写一个 public 类和一个包级私有类","让 public 类调用非 public 类的方法，验证同包内可直接访问","实验把非 public 类改成 public，观察编译器报错并说明原因"],
  req_en:["Write one public class and one package-private class in the same .java file","Have the public class call a method on the non-public one to confirm same-package access","Change the second class to public and explain the compiler error"],
  starter:"public class Multi {\n    public static void main(String[] args){\n        Helper h = new Helper();\n        System.out.println(h.greet(\"同学\"));\n    }\n}\n\nclass Helper {\n    String greet(String n){ return \"你好，\" + n; }\n}",
  hint:"一个源文件最多一个 public 类且必须同名；其余类可以是包级私有，方便组织小工具。",
  hint_en:"One public class per file and it must match the filename; other classes stay package-private.",
  xp:25},
 {t:"用 java 命令直接运行单文件源码",t_en:"Running a Single Source File Directly",
  req:["写一个只有一个 public 类的小程序，不用 javac 直接用 java 文件名.java 运行","打印 System.getProperty 里的 java.version 与 os.name","对比先 javac 再 java 的流程，说明两种方式的产物差异"],
  req_en:["Write a single-class program and run it with java File.java without javac","Print java.version and os.name from System.getProperty","Compare with the javac-then-java flow and explain the artifact differences"],
  starter:"public class OneFile {\n    public static void main(String[] args){\n        System.out.println(System.getProperty(\"java.version\"));\n        System.out.println(System.getProperty(\"os.name\"));\n    }\n}",
  hint:"单文件源码模式在内存中编译并直接运行，不会在磁盘上留下 .class 文件。",
  hint_en:"Single-file source mode compiles in memory and leaves no .class files behind.",
  xp:25}
];
L["java-s2"] = [
 {t:"基本类型与包装类的边界",t_en:"Primitives and Wrappers at the Edges",
  req:["测试 Integer 的缓存范围：分别用 127 与 128 比较两个包装对象是否 == 相等","打印 int 的最大最小值，并让最大值加一观察溢出结果","把 null 赋给 Integer 再自动拆箱，捕获 NullPointerException 并说明原因"],
  req_en:["Test Integer caching: compare two boxed values with == at 127 and 128","Print the int limits and watch what happens when you add one to MAX_VALUE","Assign null to an Integer, unbox it and explain the resulting NullPointerException"],
  starter:"public class Boxed {\n    public static void main(String[] args){\n        Integer a = 127, b = 127;\n        Integer c = 128, d = 128;\n        System.out.println((a == b) + \" \" + (c == d));\n        System.out.println(Integer.MAX_VALUE + 1);\n    }\n}",
  hint:"小整数缓存让 127 的 == 为真、128 为假；比较包装类值必须用 equals。",
  hint_en:"The small-integer cache makes == true at 127 and false at 128; always use equals for values.",
  xp:25},
 {t:"精确的金额计算",t_en:"Exact Money Arithmetic",
  req:["用 double 累加 0.1 十次，打印结果暴露浮点误差","改用 BigDecimal 的字符串构造方式重算，确认结果精确","把结果按四舍五入保留两位输出，说明为什么金额不能用 double"],
  req_en:["Sum 0.1 ten times with double to expose the floating point error","Redo it with BigDecimal built from String and confirm exactness","Round the result to two decimals and explain why money must not use double"],
  starter:"import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\npublic class Money {\n    public static void main(String[] args){\n        double d = 0;\n        for (int i = 0; i < 10; i++) d += 0.1;\n        System.out.println(d);\n        BigDecimal b = BigDecimal.ZERO;\n        for (int i = 0; i < 10; i++) b = b.add(new BigDecimal(\"0.1\"));\n        System.out.println(b.setScale(2, RoundingMode.HALF_UP));\n    }\n}",
  hint:"BigDecimal 必须用字符串构造，用 double 构造会把误差原样带进来。",
  hint_en:"Always construct BigDecimal from a String; from double carries the error in.",
  xp:25}
];
L["java-s3"] = [
 {t:"用标签跳出多层循环",t_en:"Breaking Out of Nested Loops with Labels",
  req:["写一个双层循环查找二维数组中的目标值","用带标签的 break 一次性跳出两层，找到后立即结束","改成用方法 return 实现同样效果，比较两种写法的可读性"],
  req_en:["Write a nested loop searching a 2D array for a target value","Use a labelled break to exit both loops at once","Refactor into a method with return and compare readability"],
  starter:"public class Labeled {\n    public static void main(String[] args){\n        int[][] m = {{1,2,3},{4,5,6}};\n        int target = 5;\n        outer:\n        for (int i = 0; i < m.length; i++)\n            for (int j = 0; j < m[i].length; j++)\n                if (m[i][j] == target){ System.out.println(i + \",\" + j); break outer; }\n    }\n}",
  hint:"标签写在循环前一行、以冒号结尾；实际项目中把查找抽成方法往往更清晰。",
  hint_en:"The label goes on the line before the loop, ending with a colon; extracting a method is often cleaner.",
  xp:25},
 {t:"switch 表达式写一个等级转换器",t_en:"Grade Converter with a switch Expression",
  req:["写一个分数到等级（A/B/C/D/F）的转换方法","分别用传统 switch 与箭头式 switch 表达式各实现一次","用 yield 在箭头式分支里返回计算结果（带区间判断）"],
  req_en:["Write a method converting a score to a grade (A/B/C/D/F)","Implement it twice: classic switch and arrow switch expression","Use yield inside an arrow branch that performs a range check"],
  starter:"public class Grade {\n    static String of(int s){\n        return switch (s / 10) {\n            case 10, 9 -> \"A\";\n            case 8 -> \"B\";\n            case 7 -> \"C\";\n            case 6 -> \"D\";\n            default -> \"F\";\n        };\n    }\n    public static void main(String[] args){ for (int s : new int[]{95, 85, 72, 61, 30}) System.out.print(of(s)); }\n}",
  hint:"箭头式 switch 不会贯穿，分支要么是表达式要么用 yield 返回值。",
  hint_en:"Arrow switches do not fall through; each branch is an expression or uses yield.",
  xp:25}
];
L["java-s4"] = [
 {t:"字符串比较与常量池实验",t_en:"String Comparison and the Constant Pool",
  req:["对比 new String(\"abc\") 与字面量 \"abc\" 的 == 结果并解释","用 intern() 把堆上的字符串放进常量池，再次比较","用 equalsIgnoreCase 与 compareTo 各完成一次比较"],
  req_en:["Compare new String(\"abc\") with the literal \"abc\" using == and explain","Call intern() to put the heap string into the pool and compare again","Use equalsIgnoreCase and compareTo for two more comparisons"],
  starter:"public class StrPool {\n    public static void main(String[] args){\n        String a = \"abc\", b = new String(\"abc\");\n        System.out.println(a == b);\n        System.out.println(a == b.intern());\n        System.out.println(a.equalsIgnoreCase(\"ABC\"));\n    }\n}",
  hint:"字面量进常量池、new 出来的在堆上；== 比引用，equals 才比内容。",
  hint_en:"Literals live in the pool and new objects on the heap; == compares references, equals compares content.",
  xp:25},
 {t:"文本统计与 StringBuilder 优化",t_en:"Text Statistics and StringBuilder",
  req:["统计一段文本的字符数、单词数、出现次数最多的字符","先用字符串加法拼接统计结果，再用 StringBuilder 重写同一段逻辑","统计并打印两次拼接在长循环下的耗时差异"],
  req_en:["Count characters, words and the most frequent character of a text","Build the report with string concatenation first, then rewrite with StringBuilder","Time both approaches in a long loop and print the difference"],
  starter:"public class TextStat {\n    public static void main(String[] args){\n        String s = \"to be or not to be that is the question\";\n        int words = s.split(\"\\\\s+\").length;\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"chars=\").append(s.length()).append(\" words=\").append(words);\n        System.out.println(sb);\n    }\n}",
  hint:"循环内用 + 拼接会不断创建新 String 对象，StringBuilder 才是正道。",
  hint_en:"Concatenating in a loop creates a new String each time; StringBuilder is the right tool.",
  xp:25}
];
L["java-s5"] = [
 {t:"用构造方法重载与静态工厂写一个坐标类",t_en:"Constructors and Static Factory for a Point Class",
  req:["写 Point 类，提供 (x,y) 与 (x) 两个构造方法","加一个静态工厂 of(int x, int y) 与 origin()","用 toString 与 equals 让对象可打印、可比较"],
  req_en:["Write a Point class with (x,y) and (x) constructors","Add static factories of(int x, int y) and origin()","Implement toString and equals so instances print and compare correctly"],
  starter:"public class Point {\n    private final int x, y;\n    public Point(int x, int y){ this.x = x; this.y = y; }\n    public Point(int v){ this(v, v); }\n    public static Point origin(){ return new Point(0, 0); }\n    public String toString(){ return \"(\" + x + \",\" + y + \")\"; }\n    public static void main(String[] args){ System.out.println(Point.origin()); }\n}",
  hint:"this(...) 可以在构造方法里调用另一个构造方法，但必须是第一条语句。",
  hint_en:"this(...) delegates to another constructor and must be the first statement.",
  xp:25},
 {t:"封装带来的边界校验",t_en:"Encapsulation with Boundary Checks",
  req:["写 BankAccount 类，余额与账号都设为 private final/private","实现 deposit 与 withdraw，金额非法时抛 IllegalArgumentException","提供只读的 getter，不提供任何直接修改余额的方法"],
  req_en:["Write BankAccount with private balance and private final account number","Implement deposit and withdraw, throwing IllegalArgumentException on invalid amounts","Expose read-only getters and never a direct balance setter"],
  starter:"public class BankAccount {\n    private final String id;\n    private long balance;\n    public BankAccount(String id, long init){ this.id = id; this.balance = init; }\n    public void deposit(long amount){\n        if (amount <= 0) throw new IllegalArgumentException(\"金额必须为正\");\n        balance += amount;\n    }\n    public long getBalance(){ return balance; }\n    public static void main(String[] a){ BankAccount b = new BankAccount(\"A1\", 100); b.deposit(50); System.out.println(b.getBalance()); }\n}",
  hint:"封装的价值就在于所有改动都必须经过带校验的公开接口，不变式才守得住。",
  hint_en:"Encapsulation forces every change through validated public methods, preserving invariants.",
  xp:25}
];
L["java-s6"] = [
 {t:"接口 + 多态的支付系统",t_en:"Polymorphic Payment with an Interface",
  req:["定义 Payable 接口，含 pay(double) 与 name() 两个方法","用匿名内部类与 Lambda（若可用）各实现一次","把多个实现放进 List<Payable> 统一结算并打印明细"],
  req_en:["Define a Payable interface with pay(double) and name()","Implement it once with an anonymous class and once with a lambda where possible","Put several implementations into a List<Payable>, settle them and print details"],
  starter:"import java.util.*;\n\ninterface Payable { String name(); double pay(double amount); }\n\npublic class Pay {\n    public static void main(String[] args){\n        List<Payable> list = new ArrayList<>();\n        list.add(new Payable(){\n            public String name(){ return \"现金\"; }\n            public double pay(double a){ return a; }\n        });\n        double total = 0;\n        for (Payable p : list) total += p.pay(100);\n        System.out.println(total);\n    }\n}",
  hint:"接口只定义契约，具体实现可以有多种；用接口类型的集合就能统一处理。",
  hint_en:"Interfaces define contracts; a collection of the interface type handles every implementation uniformly.",
  xp:25},
 {t:"正确实现 equals / hashCode / toString",t_en:"Implementing equals, hashCode and toString Correctly",
  req:["写一个含学号与姓名的 Student 类","实现 equals 与 hashCode，保证学号相同即相等","把两个相等对象放进 HashSet，验证集合里只有一个元素"],
  req_en:["Write a Student class with an id and a name","Implement equals and hashCode so equal ids mean equal objects","Put two equal objects into a HashSet and verify only one remains"],
  starter:"import java.util.*;\n\npublic class Student {\n    private final String id, name;\n    public Student(String id, String name){ this.id = id; this.name = name; }\n    public boolean equals(Object o){\n        if (this == o) return true;\n        if (!(o instanceof Student)) return false;\n        return id.equals(((Student) o).id);\n    }\n    public int hashCode(){ return id.hashCode(); }\n    public static void main(String[] a){ Set<Student> s = new HashSet<>(); s.add(new Student(\"1\",\"甲\")); s.add(new Student(\"1\",\"甲\")); System.out.println(s.size()); }\n}",
  hint:"equals 与 hashCode 必须成对重写：相等对象哈希值也要相同，否则哈希集合会找不到它。",
  hint_en:"equals and hashCode must be overridden together; equal objects need equal hash codes.",
  xp:25}
];
L["java-s7"] = [
 {t:"自定义异常 + try-with-resources",t_en:"Custom Exceptions with try-with-resources",
  req:["写一个实现 AutoCloseable 的资源类，close 时打印一行日志","定义自定义受检异常，在资源使用中可能抛出","用 try-with-resources 包裹，验证即使异常抛出 close 也被调用"],
  req_en:["Write a resource class implementing AutoCloseable that logs on close","Define a custom checked exception that may be thrown during use","Wrap it in try-with-resources and confirm close runs even when the exception fires"],
  starter:"class Res implements AutoCloseable {\n    public void close(){ System.out.println(\"closed\"); }\n}\nclass MyErr extends Exception {\n    MyErr(String m){ super(m); }\n}\npublic class Twr {\n    public static void main(String[] args){\n        try (Res r = new Res()){\n            throw new MyErr(\"出错了\");\n        } catch (MyErr e){\n            System.out.println(e.getMessage());\n        }\n    }\n}",
  hint:"try-with-resources 会在离开块时自动 close，顺序与声明顺序相反。",
  hint_en:"try-with-resources closes automatically on exit, in reverse order of declaration.",
  xp:25},
 {t:"集合选型对比实验",t_en:"Choosing the Right Collection",
  req:["分别用 ArrayList 与 LinkedList 在头部插入 10 万个元素并计时","用 HashSet 与 ArrayList 各判断一次某元素是否存在并计时","用 HashMap 统计词频，再用 TreeMap 输出有序结果"],
  req_en:["Insert 100k elements at the head with ArrayList and LinkedList and time both","Check membership once with HashSet and once with ArrayList and time both","Count word frequencies in a HashMap and print ordered results via TreeMap"],
  starter:"import java.util.*;\n\npublic class CollDemo {\n    public static void main(String[] args){\n        List<Integer> al = new ArrayList<>();\n        long t = System.nanoTime();\n        for (int i = 0; i < 100000; i++) al.add(0, i);\n        System.out.println(\"ArrayList head insert: \" + (System.nanoTime() - t) / 1000000 + \" ms\");\n    }\n}",
  hint:"头部插入 ArrayList 需要整体搬移，LinkedList 只改指针；但随机访问反过来。",
  hint_en:"Head inserts shift the whole ArrayList while a LinkedList just relinks; random access is the opposite.",
  xp:25}
];
L["java-s8"] = [
 {t:"文件读写与编码一致性",t_en:"File IO and Encoding Consistency",
  req:["用 Files.writeString 写入一段中文，指定 StandardCharsets.UTF_8","用 Files.readAllLines 读回并按行打印，确认无乱码","故意用 GBK 读取同一文件，观察乱码并解释原因"],
  req_en:["Write Chinese text with Files.writeString specifying UTF_8","Read it back with Files.readAllLines and print each line to confirm no mojibake","Read the same file as GBK, observe the garbling and explain why"],
  starter:"import java.io.IOException;\nimport java.nio.charset.StandardCharsets;\nimport java.nio.file.*;\nimport java.util.List;\n\npublic class IoDemo {\n    public static void main(String[] args) throws IOException {\n        Path p = Paths.get(\"demo.txt\");\n        Files.writeString(p, \"第一行\\n第二行\\n\", StandardCharsets.UTF_8);\n        List<String> lines = Files.readAllLines(p, StandardCharsets.UTF_8);\n        lines.forEach(System.out::println);\n    }\n}",
  hint:"读写两端使用同一字符集是避免乱码的唯一可靠做法，务必显式指定。",
  hint_en:"Using the same charset on both ends with an explicit argument is the only reliable way.",
  xp:25},
 {t:"遍历目录树统计文件类型",t_en:"Walking a Directory Tree",
  req:["用 Files.walk 遍历当前目录，统计 .java 与 .txt 文件数量","用 try-with-resources 包住返回的 Stream，防止句柄泄漏","打印最深的目录层级与文件总数"],
  req_en:["Use Files.walk to count .java and .txt files in the current directory","Wrap the returned Stream in try-with-resources to avoid leaking handles","Print the deepest directory level and the total file count"],
  starter:"import java.io.IOException;\nimport java.nio.file.*;\nimport java.util.stream.Stream;\n\npublic class Walk {\n    public static void main(String[] args) throws IOException {\n        try (Stream<Path> s = Files.walk(Paths.get(\".\"))){\n            long n = s.filter(p -> p.toString().endsWith(\".java\")).count();\n            System.out.println(\"java files: \" + n);\n        }\n    }",
  hint:"Files.walk 返回的 Stream 持有目录句柄，必须关闭；try-with-resources 最省心。",
  hint_en:"The Stream from Files.walk holds directory handles and must be closed.",
  xp:25}
];
L["java-s9"] = [
 {t:"三种方式实现线程安全计数器",t_en:"Three Thread-Safe Counters",
  req:["用 synchronized 方法实现一个计数器","用 AtomicInteger 实现一版并对比代码量","用 LongAdder 实现一版，说明高并发下它的优势"],
  req_en:["Implement a counter with a synchronized method","Implement one with AtomicInteger and compare the code","Implement one with LongAdder and explain its advantage under contention"],
  starter:"import java.util.concurrent.atomic.*;\n\npublic class Counters {\n    static int plain = 0;\n    static AtomicInteger atomic = new AtomicInteger();\n    static synchronized void incSync(){ plain++; }\n    public static void main(String[] args) throws InterruptedException {\n        Thread[] ts = new Thread[4];\n        for (int i = 0; i < 4; i++) ts[i] = new Thread(() -> { for (int j = 0; j < 100000; j++){ incSync(); atomic.incrementAndGet(); } });\n        for (Thread t : ts) t.start();\n        for (Thread t : ts) t.join();\n        System.out.println(plain + \" \" + atomic.get());\n    }\n}",
  hint:"synchronized 与原子类都能保证正确性；LongAdder 通过分散热点在超高并发下更快。",
  hint_en:"Both synchronized and atomics are correct; LongAdder spreads contention and scales better.",
  xp:25},
 {t:"阻塞队列实现生产者消费者",t_en:"Producer-Consumer with a Blocking Queue",
  req:["用 ArrayBlockingQueue 容量 3 实现一个生产者与两个消费者","生产者生产 10 个任务后发送结束信号","消费者收到结束信号后退出，主线程等待全部结束"],
  req_en:["Use an ArrayBlockingQueue of capacity 3 with one producer and two consumers","The producer submits 10 tasks then sends a stop signal","Consumers exit on the stop signal and the main thread waits for both"],
  starter:"import java.util.concurrent.*;\n\npublic class PC {\n    public static void main(String[] args) throws InterruptedException {\n        BlockingQueue<Integer> q = new ArrayBlockingQueue<>(3);\n        Thread p = new Thread(() -> { try { for (int i = 0; i < 10; i++) q.put(i); q.put(-1); q.put(-1); } catch (InterruptedException e){} });\n        p.start(); p.join();\n    }\n}",
  hint:"put 在队列满时阻塞、take 在空时阻塞，这正是天然的背压机制。",
  hint_en:"put blocks when full and take blocks when empty, giving natural back-pressure.",
  xp:25}
];
L["java-s10"] = [
 {t:"用 Stream 做一条数据处理流水线",t_en:"A Stream Data Pipeline",
  req:["对一个学生列表做筛选题分不低于 60、按分数降序、取前 3 名","把结果收集成 List，并用 joining 拼成一行字符串","统计人数、总分与平均分，全部用收集器完成"],
  req_en:["Filter students scoring at least 60, sort by score descending and take the top 3","Collect into a List and join into one line with joining","Compute count, total and average entirely with collectors"],
  starter:"import java.util.*;\nimport java.util.stream.*;\n\nrecord Stu(String name, int score){}\n\npublic class Pipeline {\n    public static void main(String[] args){\n        List<Stu> all = List.of(new Stu(\"甲\", 90), new Stu(\"乙\", 55), new Stu(\"丙\", 72), new Stu(\"丁\", 88));\n        String top = all.stream().filter(s -> s.score() >= 60).sorted(Comparator.comparingInt(Stu::score).reversed()).limit(3).map(Stu::name).collect(Collectors.joining(\", \"));\n        System.out.println(top);\n    }\n}",
  hint:"中间操作惰性、终止操作才触发；sorted 的比较器用 Comparator.comparingInt 更清晰。",
  hint_en:"Intermediate ops are lazy and terminals trigger them; comparingInt reads better than a raw lambda.",
  xp:25},
 {t:"观察 JVM 内存与 GC 日志",t_en:"Observing JVM Memory and GC Logs",
  req:["用 Runtime 或 ManagementFactory 打印可用内存与最大堆","打印 -Xmx 与 -Xms 生效后的实际值（用运行时参数查看）","在循环里创建大量临时对象，观察 GC 次数与堆回收前后差异"],
  req_en:["Print free and max heap via Runtime or ManagementFactory","Check the effective -Xmx and -Xms values at run time","Allocate many short-lived objects in a loop and observe GC counts and heap before/after"],
  starter:"public class Mem {\n    public static void main(String[] args){\n        Runtime r = Runtime.getRuntime();\n        System.out.println(\"max=\" + r.maxMemory() / 1024 / 1024 + \"MB free=\" + r.freeMemory() / 1024 / 1024 + \"MB\");\n        for (int i = 0; i < 1000; i++){ byte[] b = new byte[1024 * 100]; }\n        System.out.println(\"free after=\" + r.freeMemory() / 1024 / 1024 + \"MB\");\n    }\n}",
  hint:"加 -Xlog:gc 或 -verbose:gc 可以在控制台看到每次 GC 的耗时与回收量。",
  hint_en:"Add -Xlog:gc or -verbose:gc to see each collection's duration and reclaimed memory.",
  xp:25}
];
/* ==================== JavaScript ==================== */
L["js-s1"] = [
 {t:"用变量作用域做对照实验",t_en:"Variable Scope Experiments",
  req:["分别用 var、let、const 在块内声明变量，块外访问观察差异","在声明前访问 let 变量，复现暂时性死区错误并说明原因","用 const 声明一个对象后修改它的属性，确认可以修改"],
  req_en:["Declare with var, let and const inside a block, then access outside to compare","Access a let variable before its declaration to reproduce the TDZ error and explain it","Declare a const object and mutate a property to confirm it is allowed"],
  starter:"// 在浏览器控制台或 node 里依次运行\n{\n  var a = 1;\n  let b = 2;\n  const c = 3;\n}\nconsole.log(a);\n// console.log(b);  // ReferenceError\nconst obj = { n: 1 };\nobj.n = 2;\nconsole.log(obj.n);",
  hint:"var 提升到函数作用域并初始化为 undefined；let/const 有块级作用域与暂时性死区。",
  hint_en:"var hoists to function scope as undefined; let/const are block-scoped with a temporal dead zone.",
  xp:25},
 {t:"写一个安全的类型检查工具",t_en:"A Safe Type Inspection Helper",
  req:["写 typeOf(v) 正确区分 null、数组与普通对象","对 8 种不同类型的值调用并打印结果","用 Object.prototype.toString.call 解释它为何比 typeof 更可靠"],
  req_en:["Write typeOf(v) that correctly distinguishes null, arrays and plain objects","Call it on eight values of different types and print the results","Use Object.prototype.toString.call to explain why it beats typeof"],
  starter:"function typeOf(v){\n  if (v === null) return 'null';\n  if (Array.isArray(v)) return 'array';\n  return typeof v;\n}\nfor (const v of [null, [], {}, 1, 'a', true, undefined, () => {}]) console.log(v, '->', typeOf(v));",
  hint:"typeof null 会返回 'object'，这是历史遗留问题；数组也要用 Array.isArray 单独判断。",
  hint_en:"typeof null returns 'object' for historical reasons; arrays need Array.isArray.",
  xp:25}
];
L["js-s2"] = [
 {t:"用闭包写一个防抖函数",t_en:"A Debounce Function via Closures",
  req:["实现 debounce(fn, wait)，在连续调用停止 wait 毫秒后只执行一次","用 console.log 模拟高频输入，验证只打印最后一次","再实现 throttle(fn, interval)，比较两者触发次数的差别"],
  req_en:["Implement debounce(fn, wait) that fires once after calls stop for wait ms","Simulate rapid input with console.log and verify only the last call runs","Implement throttle(fn, interval) and compare trigger counts"],
  starter:"function debounce(fn, wait){\n  let timer = null;\n  return function(...args){\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), wait);\n  };\n}\nconst run = debounce(x => console.log('run', x), 300);\nfor (let i = 0; i < 10; i++) run(i);",
  hint:"闭包让 timer 在多次调用之间保持记忆，这正是防抖能生效的关键。",
  hint_en:"The closure keeps timer alive across calls, which is exactly what makes debounce work.",
  xp:25},
 {t:"用 reduce 写一组统计函数",t_en:"Statistics with reduce",
  req:["用 reduce 实现 sum、max、countBy（按条件计数）三个函数","对同一组数据分别调用并打印结果","不用 reduce 只用 for 循环再写一遍，比较代码量"],
  req_en:["Implement sum, max and countBy with reduce","Call all three on one dataset and print the results","Rewrite without reduce using a plain for loop and compare the code size"],
  starter:"const nums = [3, 7, 1, 9, 4];\nconst sum = nums.reduce((a, b) => a + b, 0);\nconst max = nums.reduce((a, b) => (b > a ? b : a), -Infinity);\nconsole.log(sum, max);",
  hint:"reduce 的第二个参数是初始值，传它才能正确处理空数组与累加类型。",
  hint_en:"reduce's second argument is the initial value; passing it handles empty arrays and typing safely.",
  xp:25}
];
L["js-s3"] = [
 {t:"不可变地更新嵌套对象",t_en:"Immutably Updating Nested Objects",
  req:["有一个两层嵌套的对象，用展开运算符实现「只改内层一个字段」","验证原对象没有被改动（用 console.log 对比）","再用 structuredClone 做一次深拷贝后修改，比较两种方式"],
  req_en:["Given a two-level nested object, change one inner field using spread syntax","Verify the original object is unchanged by logging both","Do it again after structuredClone and compare the two approaches"],
  starter:"const user = { name: 'a', profile: { city: '北京', tags: ['x'] } };\nconst next = { ...user, profile: { ...user.profile, city: '上海' } };\nconsole.log(user.profile.city, next.profile.city);",
  hint:"展开只做浅拷贝，所以每一层被修改的对象都要重新展开一次。",
  hint_en:"Spread is shallow, so every level you modify must be spread again.",
  xp:25},
 {t:"数组方法流水线做数据清洗",t_en:"A Data-cleaning Pipeline with Array Methods",
  req:["给一组含缺项与重复项的对象数组，依次 filter、map、去重","用 Set 或 find 做去重，并保留原始顺序","把结果按某个字段排序并输出为表格形式的字符串"],
  req_en:["Given records with missing and duplicate entries, chain filter, map and dedupe","Deduplicate with a Set or find while preserving order","Sort by one field and print a table-like string"],
  starter:"const raw = [\n  { id: 1, name: 'A', score: 80 },\n  { id: 2, name: 'B', score: null },\n  { id: 1, name: 'A', score: 80 },\n];\nconst clean = raw.filter(r => r.score != null).filter((r, i, a) => a.findIndex(x => x.id === r.id) === i);\nconsole.log(clean.length);",
  hint:"findIndex 比较是 O(n²)，数据量大时应该用 Set 记录已见过的 id。",
  hint_en:"findIndex is O(n^2); for larger data track seen ids in a Set instead.",
  xp:25}
];
L["js-s4"] = [
 {t:"用事件委托实现动态列表",t_en:"Event Delegation for a Dynamic List",
  req:["在容器上绑一个 click 监听，处理所有子项（含后来新增的）的删除","用 e.target.closest 找到被点击的条目","对比给每个条目单独绑监听与事件委托的代码量差异"],
  req_en:["Bind one click listener on the container that handles deletes for all children, including new ones","Use e.target.closest to find the clicked item","Compare the code size of per-item listeners versus delegation"],
  starter:"const list = document.createElement('ul');\ndocument.body.appendChild(list);\nlist.addEventListener('click', e => {\n  const li = e.target.closest('li');\n  if (li) li.remove();\n});\nfor (let i = 0; i < 3; i++){ const li = document.createElement('li'); li.textContent = 'item ' + i; list.appendChild(li); }",
  hint:"事件冒泡让容器的监听器能收到子元素的事件，因此新增的子项无需重新绑定。",
  hint_en:"Bubbling delivers child events to the container, so new children need no new listeners.",
  xp:25},
 {t:"做一个带键盘支持的计数器",t_en:"A Counter with Keyboard Support",
  req:["写一个计数器界面，含加减按钮与当前值显示","让键盘的 + / - 键也能操作，并阻止页面滚动","把值存到 localStorage，刷新页面后能恢复"],
  req_en:["Build a counter UI with plus and minus buttons and a value display","Support the + and - keys while preventing page scroll","Persist the value in localStorage so a refresh restores it"],
  starter:"let n = Number(localStorage.getItem('n') || 0);\nconst out = document.createElement('div');\nout.textContent = n;\ndocument.body.appendChild(out);\ndocument.addEventListener('keydown', e => {\n  if (e.key === '+' || e.key === '=') n++;\n  else if (e.key === '-') n--;\n  out.textContent = n;\n  localStorage.setItem('n', n);\n});",
  hint:"监听在 document 上才能收到键盘事件；用 e.key 判断具体按键比 keyCode 更直观。",
  hint_en:"Listen on document to catch key events; e.key reads better than the legacy keyCode.",
  xp:25}
];
L["js-s5"] = [
 {t:"手写 Promise 化的延时器",t_en:"Promisifying a Delay",
  req:["写 sleep(ms) 返回 Promise，并用 await 顺序打印 1 2 3","在同一个循环里发起三个并发请求（用假的异步函数），比较顺序执行与并发执行的总耗时","用 Promise.all 汇总结果，并处理其中一个失败的情况"],
  req_en:["Write sleep(ms) returning a Promise and await it to print 1 2 3 in order","In one loop, compare sequential versus concurrent execution of three fake async tasks","Aggregate with Promise.all and handle one failing task"],
  starter:"const sleep = ms => new Promise(r => setTimeout(r, ms));\nconst task = (n, ms) => sleep(ms).then(() => { console.log('done', n); return n; });\n\n(async () => {\n  console.time('seq');\n  await task(1, 300); await task(2, 300); await task(3, 300);\n  console.timeEnd('seq');\n  console.time('all');\n  await Promise.all([task(1, 300), task(2, 300), task(3, 300)]);\n  console.timeEnd('all');\n})();",
  hint:"顺序 await 的总耗时是累加，Promise.all 的总耗时取决于最慢的一个。",
  hint_en:"Sequential awaits add up; Promise.all finishes with the slowest task.",
  xp:25},
 {t:"带超时与重试的请求封装",t_en:"Fetch Wrapper with Timeout and Retry",
  req:["封装 request(url, {retries, timeout})，超时用 Promise.race 实现","失败（网络错误或非 2xx）时自动重试，最多 retries 次","全部失败后抛出带最后一次错误信息的异常"],
  req_en:["Wrap request(url, {retries, timeout}) using Promise.race for the timeout","Retry automatically on network errors or non-2xx responses up to retries times","Throw with the last error message once every attempt fails"],
  starter:"function withTimeout(p, ms){\n  return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);\n}\n\nasync function request(url, retries = 2, timeout = 1000, attempt = 0){\n  try {\n    const res = await withTimeout(fetch(url), timeout);\n    if (!res.ok) throw new Error('HTTP ' + res.status);\n    return await res.json();\n  } catch (e) {\n    if (attempt < retries) return request(url, retries, timeout, attempt + 1);\n    throw e;\n  }\n}",
  hint:"fetch 对 4xx/5xx 不会 reject，必须自己检查 res.ok；重试要限制次数避免死循环。",
  hint_en:"fetch does not reject on 4xx/5xx, so check res.ok; always cap retries.",
  xp:25}
];
L["js-s6"] = [
 {t:"用 class + 私有字段写一个栈",t_en:"A Stack with class and Private Fields",
  req:["用 #items 私有字段实现 push/pop/peek/size","用 getter 暴露 size，外部直接读取而不用加括号","尝试在类外访问 #items，确认语法上不可访问"],
  req_en:["Implement push/pop/peek/size with a #items private field","Expose size through a getter so callers skip parentheses","Try accessing #items outside the class and confirm it is impossible"],
  starter:"class Stack {\n  #items = [];\n  push(x){ this.#items.push(x); return this; }\n  pop(){ return this.#items.pop(); }\n  peek(){ return this.#items[this.#items.length - 1]; }\n  get size(){ return this.#items.length; }\n}\nconst s = new Stack().push(1).push(2);\nconsole.log(s.peek(), s.size);",
  hint:"链式返回 this 可以让多个操作写在一行；# 私有字段是真私有，不是命名约定。",
  hint_en:"Returning this enables chaining; # fields are truly private rather than a naming convention.",
  xp:25},
 {t:"模块化拆分一个小工具库",t_en:"Splitting a Utility Library into Modules",
  req:["拆成 format.js（格式化）与 validate.js（校验）两个模块","用具名导出与默认导出各暴露一次，并在 main.js 里分别导入","把 main.js 配成 type=module 用浏览器或 node 直接运行"],
  req_en:["Split into format.js and validate.js modules","Expose one with named exports and one as a default export, then import both in main.js","Run main.js directly with type=module in the browser or Node"],
  starter:"// validate.js\nexport const isEmail = s => /^\\S+@\\S+\\.\\S+$/.test(s);\n\n// format.js\nexport default function money(n){ return '¥' + n.toFixed(2); }\n\n// main.js\n// import money from './format.js';\n// import { isEmail } from './validate.js';\n// console.log(money(3.5), isEmail('a@b.co'));",
  hint:"ES 模块是静态的，导入导出必须在顶层；用 <script type=module> 才能在浏览器里生效。",
  hint_en:"ES modules are static: import/export live at the top level and need script type=module.",
  xp:25}
];
L["js-s7"] = [
 {t:"主题切换器并记住偏好",t_en:"Theme Switcher that Remembers",
  req:["用一个按钮在浅色与深色之间切换，通过切换 data-theme 属性实现","把选择写入 localStorage，刷新后仍然生效","首次访问时读取 prefers-color-scheme 作为默认值"],
  req_en:["Toggle between light and dark by flipping a data-theme attribute","Persist the choice in localStorage so it survives a refresh","Read prefers-color-scheme as the default on first visit"],
  starter:"const saved = localStorage.getItem('theme');\nconst prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;\ndocument.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');\n\ndocument.addEventListener('click', () => {\n  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';\n  document.documentElement.dataset.theme = next;\n  localStorage.setItem('theme', next);\n});",
  hint:"dataset.theme 对应 HTML 上的 data-theme 属性，用它挂 CSS 变量最方便。",
  hint_en:"dataset.theme maps to the data-theme attribute, ideal for switching CSS variables.",
  xp:25},
 {t:"用 IntersectionObserver 做懒加载",t_en:"Lazy Loading with IntersectionObserver",
  req:["页面放 10 个占位块，进入视口时把 data-src 写入 src（或填充内容）","用 IntersectionObserver 监听，加载完成后停止观察该元素","统计并打印一共触发了多少次加载"],
  req_en:["Place ten placeholders and move data-src into src (or fill content) when they enter the viewport","Use IntersectionObserver and unobserve each element once loaded","Count and print how many loads fired"],
  starter:"let loaded = 0;\nconst ob = new IntersectionObserver((entries, obs) => {\n  for (const e of entries){\n    if (!e.isIntersecting) continue;\n    e.target.textContent = 'loaded';\n    loaded++;\n    obs.unobserve(e.target);\n  }\n}, { rootMargin: '100px' });\nfor (let i = 0; i < 10; i++){ const d = document.createElement('div'); d.style.height = '200px'; document.body.appendChild(d); ob.observe(d); }",
  hint:"加载后 unobserve 可以避免重复触发；rootMargin 用来提前预加载。",
  hint_en:"Unobserve after loading to avoid repeat triggers; rootMargin pre-loads early.",
  xp:25}
];
L["js-s8"] = [
 {t:"用纯函数 + 状态机组织一个小应用",t_en:"A Small App as Pure Functions plus a State Machine",
  req:["定义一个含 status 的状态对象，写出 add/done/clear 三个纯函数","每个函数返回新状态而不修改旧状态，验证原状态不变","把状态渲染成 HTML 字符串，用一次 innerHTML 更新界面"],
  req_en:["Define a state object with a status field and write pure add/done/clear functions","Each function returns a new state without mutating the old one; verify the original is intact","Render the state into an HTML string and update the UI with a single innerHTML write"],
  starter:"const init = { todos: [], filter: 'all' };\nconst add = (s, t) => ({ ...s, todos: [...s.todos, { text: t, done: false }] });\nconst toggle = (s, i) => ({ ...s, todos: s.todos.map((x, j) => j === i ? { ...x, done: !x.done } : x) });\nconst render = s => '<ul>' + s.todos.map(t => '<li>' + (t.done ? '[x] ' : '[ ] ') + t.text + '</li>').join('') + '</ul>';\nconsole.log(render(add(init, '写代码')));",
  hint:"纯函数 + 单向数据流让状态变化可预测，也是所有现代框架的共同思想。",
  hint_en:"Pure functions with one-way data flow make state changes predictable, the core idea of modern frameworks.",
  xp:25},
 {t:"给项目加上开发脚本与构建流程",t_en:"Adding Dev Scripts and a Build Step",
  req:["写一个 package.json，配置 dev、build、test 三个脚本","用 esbuild 或 vite 把源码打包成一个可发布的文件","在 README 里写清安装、开发、构建三条命令"],
  req_en:["Write a package.json with dev, build and test scripts","Bundle the sources into one publishable file with esbuild or vite","Document the install, dev and build commands in the README"],
  starter:"{\n  \"name\": \"mini-app\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"test\": \"node --test\"\n  }\n}",
  hint:"把常用命令固化成 npm script，团队里每个人就都能用同一套口令做事。",
  hint_en:"Freezing common commands into npm scripts gives everyone one shared vocabulary.",
  xp:25}
];
/* ==================== C# ==================== */
L["cs-s1"] = [
 {t:"从模板到可运行：走一遍 dotnet 流程",t_en:"From Template to Run: the dotnet Flow",
  req:["用 dotnet new console 建项目，用 dotnet run 直接运行","用 dotnet build 生成产物，找到 bin/Debug 下的可执行文件","用 dotnet run -- 传一个命令行参数，并在程序里读出来"],
  req_en:["Create a project with dotnet new console and run it with dotnet run","Build with dotnet build and locate the executable under bin/Debug","Pass a command-line argument with dotnet run -- and read it in code"],
  starter:"// Program.cs\nforeach (var a in args) Console.WriteLine($\"参数: {a}\");\nConsole.WriteLine($\"共 {args.Length} 个\");\n\n// 终端里执行：dotnet run -- hello",
  hint:"-- 之后的内容才会传给程序本身，否则会被 dotnet 自己解析掉。",
  hint_en:"Only arguments after -- reach your program; otherwise dotnet consumes them.",
  xp:25},
 {t:"用顶级语句与命名空间组织代码",t_en:"Top-level Statements and Namespaces",
  req:["用顶级语句写一个最小程序（不写 class Program）","把辅助逻辑放进一个独立命名空间下的静态类","用 using 引入该命名空间并调用，确认编译通过"],
  req_en:["Write a minimal program using top-level statements (no class Program)","Move helper logic into a static class inside its own namespace","Bring it in with using and call it, confirming it compiles"],
  starter:"using Utils;\nConsole.WriteLine(Calc.Add(2, 3));\n\nnamespace Utils {\n    public static class Calc {\n        public static int Add(int a, int b) => a + b;\n    }\n}",
  hint:"顶级语句会自动被包进一个隐式的 Program 类，所以一个项目只能有一个文件用它。",
  hint_en:"Top-level statements are wrapped in an implicit Program class, so only one file may use them.",
  xp:25}
];
L["cs-s2"] = [
 {t:"值类型与引用类型的行为差异",t_en:"Value vs Reference Types",
  req:["写一个 struct 与一个 class，各含一个 int 字段","把它们的实例赋给新变量并修改新变量的字段，观察原对象是否变化","把 struct 作为方法参数传入并修改，确认调用方不受影响"],
  req_en:["Write a struct and a class each with one int field","Assign instances to new variables, mutate the copies and see which original changes","Pass the struct to a method, mutate it there and confirm the caller is unaffected"],
  starter:"struct P { public int X; }\nclass Q { public int X; }\n\nvar p1 = new P { X = 1 };\nvar p2 = p1; p2.X = 99;\nvar q1 = new Q { X = 1 };\nvar q2 = q1; q2.X = 99;\nConsole.WriteLine($\"struct {p1.X} class {q1.X}\");",
  hint:"struct 赋值是整体复制，class 赋值只复制引用，因此一个改的副本、一个改的是同一个对象。",
  hint_en:"Structs copy on assignment while classes copy only the reference, hence the different outcomes.",
  xp:25},
 {t:"用 out 与 ref 改造一个解析函数",t_en:"Parsing with out and ref",
  req:["写 TryParseScore(string, out int) 返回是否解析成功","用 ref 参数实现一个累加器方法，在循环里反复调用","对比返回元组 (bool, int) 的写法，说出各自适用场景"],
  req_en:["Write TryParseScore(string, out int) returning success","Implement an accumulator taking a ref parameter and call it in a loop","Compare with returning a tuple (bool, int) and say when each style fits"],
  starter:"static bool TryParseScore(string s, out int score) => int.TryParse(s, out score) && score >= 0 && score <= 100;\n\nvar ok = TryParseScore(\"88\", out var v);\nConsole.WriteLine($\"{ok} {v}\");",
  hint:"out 参数必须在所有返回路径上被赋值；调用处可用 out var 直接声明变量。",
  hint_en:"out parameters must be assigned on every path, and out var declares the variable inline.",
  xp:25}
];
L["cs-s3"] = [
 {t:"用 Dictionary 做词频统计并排序",t_en:"Word Frequency with Dictionary",
  req:["读入一段文本，用 Dictionary<string,int> 统计词频","用 LINQ 按次数降序输出前 5 个词","用 TryGetValue 安全累加，避免两次查表"],
  req_en:["Count word frequencies with a Dictionary<string,int>","Use LINQ to print the top 5 words by count","Accumulate safely with TryGetValue to avoid double lookups"],
  starter:"var text = \"to be or not to be that is the question\";\nvar freq = new Dictionary<string, int>();\nforeach (var w in text.Split(' ', StringSplitOptions.RemoveEmptyEntries))\n{\n    freq.TryGetValue(w, out var c);\n    freq[w] = c + 1;\n}\nforeach (var kv in freq.OrderByDescending(k => k.Value).Take(3)) Console.WriteLine($\"{kv.Key} {kv.Value}\");",
  hint:"TryGetValue 一次调用同时完成「判断存在」与「取值」，比 ContainsKey + 索引更高效。",
  hint_en:"TryGetValue checks and reads in one call, faster than ContainsKey plus indexing.",
  xp:25},
 {t:"用泛型约束封装一个缓存类",t_en:"A Generic Cache with Constraints",
  req:["写 Cache<TKey,TValue>，含 GetOrAdd、Remove、Count 三个成员","给 TKey 加 notnull 约束，避免把 null 当键","用一个字典作为内部存储，并用可空性注解表达 GetOrAdd 的返回值"],
  req_en:["Write Cache<TKey,TValue> with GetOrAdd, Remove and Count","Constrain TKey to notnull so null cannot be used as a key","Back it with a dictionary and annotate GetOrAdd's return for nullability"],
  starter:"public class Cache<TKey, TValue> where TKey : notnull\n{\n    private readonly Dictionary<TKey, TValue> _map = new();\n    public int Count => _map.Count;\n    public TValue GetOrAdd(TKey key, Func<TKey, TValue> factory)\n    {\n        if (_map.TryGetValue(key, out var v)) return v;\n        v = factory(key);\n        _map[key] = v;\n        return v;\n    }\n}",
  hint:"泛型约束让编译器能在编译期帮你排除一类错误，比运行时才发现问题好得多。",
  hint_en:"Generic constraints let the compiler rule out whole classes of errors at compile time.",
  xp:25}
];
L["cs-s4"] = [
 {t:"用抽象类与接口搭一个支付体系",t_en:"Payment System with Abstract Class and Interface",
  req:["定义抽象类 Payment 含抽象方法 Pay(decimal)，并提供共用的日志方法","定义接口 IRefundable 含 Refund 方法，让信用卡实现它、现金不实现","用基类列表统一结算，再用 is/as 判断哪些支持退款"],
  req_en:["Define an abstract Payment class with abstract Pay(decimal) plus a shared logging method","Define IRefundable with Refund and implement it for credit card only","Settle via a base-class list, then use is/as to detect refund support"],
  starter:"abstract class Payment {\n    protected void Log(string m) => Console.WriteLine($\"[log] {m}\");\n    public abstract decimal Pay(decimal amount);\n}\ninterface IRefundable { decimal Refund(decimal amount); }\n\nclass Card : Payment, IRefundable {\n    public override decimal Pay(decimal a) { Log(\"card\"); return a; }\n    public decimal Refund(decimal a) => a;\n}",
  hint:"抽象类表达 is-a 并复用代码，接口表达 can-do 并允许多实现，两者并不冲突。",
  hint_en:"Abstract classes express is-a with shared code; interfaces express can-do and allow many.",
  xp:25},
 {t:"属性、索引器与初始化器",t_en:"Properties, Indexers and Initializers",
  req:["写一个类，含只读属性、可读写属性与一个带校验的 setter","加一个索引器 indexer，让对象可以用 obj[i] 访问内部列表","用对象初始化器创建实例，并尝试用 init 属性赋初值"],
  req_en:["Write a class with a read-only property, a read-write property and a validated setter","Add an indexer so instances can be read with obj[i]","Create an instance with an object initializer and assign an init-only property"],
  starter:"public class Bag {\n    private readonly List<string> _items = new();\n    public int Count => _items.Count;\n    public string? Owner { get; init; }\n    public string this[int i] => _items[i];\n    public void Add(string s) => _items.Add(s);\n}\n\nvar b = new Bag { Owner = \"小明\" };\nb.Add(\"书\");\nConsole.WriteLine($\"{b.Owner} {b[0]} {b.Count}\");",
  hint:"init 访问器只能在对象初始化时赋值，之后只读，非常适合不可变配置对象。",
  hint_en:"An init accessor is assignable only during initialisation, perfect for immutable configuration.",
  xp:25}
];
L["cs-s5"] = [
 {t:"并发下载并汇总结果",t_en:"Concurrent Downloads and Aggregation",
  req:["写一个返回 Task<string> 的模拟下载方法（内部用 Task.Delay）","用 Task.WhenAll 并发跑 5 个任务并汇总结果","给单个任务加取消支持（CancellationToken），演示取消一个任务"],
  req_en:["Write a simulated download returning Task<string> using Task.Delay","Run five of them concurrently with Task.WhenAll and aggregate the results","Add cancellation support via CancellationToken and cancel one task"],
  starter:"async Task<string> DownloadAsync(int i, CancellationToken ct = default)\n{\n    await Task.Delay(200, ct);\n    return $\"data-{i}\";\n}\n\nvar results = await Task.WhenAll(Enumerable.Range(1, 5).Select(i => DownloadAsync(i)));\nConsole.WriteLine(string.Join(\",\", results));",
  hint:"Task.WhenAll 不阻塞线程，等全部完成后一次性返回结果数组；任一失败会抛出第一个异常。",
  hint_en:"Task.WhenAll does not block a thread and throws the first exception if any task fails.",
  xp:25},
 {t:"用 using 与 IAsyncDisposable 管理资源",t_en:"Resource Management with using and IAsyncDisposable",
  req:["写一个实现 IAsyncDisposable 的资源类，DisposeAsync 里打印日志","用 await using 包裹它，验证退出时被释放","在释放过程中抛出异常，观察 using 是否仍能完成释放"],
  req_en:["Write a resource implementing IAsyncDisposable that logs in DisposeAsync","Wrap it with await using and verify disposal on exit","Throw during the body and check that disposal still completes"],
  starter:"class Conn : IAsyncDisposable {\n    public async ValueTask DisposeAsync()\n    {\n        await Task.Delay(10);\n        Console.WriteLine(\"released\");\n    }\n}\n\nawait using (var c = new Conn())\n{\n    Console.WriteLine(\"in use\");\n}",
  hint:"await using 与 using 的语义一致，只是释放动作是异步的，适合网络与文件句柄。",
  hint_en:"await using behaves like using but disposal is asynchronous, ideal for network and file handles.",
  xp:25}
];
L["cs-s6"] = [
 {t:"JSON 配置的读写与增量更新",t_en:"Reading and Updating JSON Config",
  req:["用 JsonSerializer 把一个配置对象写入 settings.json（带缩进）","读回来后在内存里修改某个字段，再写回文件","故意写一段格式错误的 JSON，捕获 JsonException 并给出友好提示"],
  req_en:["Write a settings object to settings.json with indented JSON","Read it back, modify a field in memory and write it out again","Feed malformed JSON, catch JsonException and print a friendly message"],
  starter:"using System.Text.Json;\n\nvar cfg = new { Theme = \"dark\", FontSize = 14 };\nFile.WriteAllText(\"settings.json\", JsonSerializer.Serialize(cfg, new JsonSerializerOptions { WriteIndented = true }));\nvar back = JsonSerializer.Deserialize<Dictionary<string, object>>(File.ReadAllText(\"settings.json\"));\nConsole.WriteLine(back!.Count);",
  hint:"WriteIndented 决定是否输出可读的缩进格式；生产环境的小写命名策略可用 JsonNamingPolicy.CamelCase。",
  hint_en:"WriteIndented controls readable output; JsonNamingPolicy.CamelCase matches typical JSON naming.",
  xp:25},
 {t:"目录遍历与文件统计",t_en:"Directory Scanning and File Statistics",
  req:["用 Directory.EnumerateFiles 递归统计某个目录下文件总数与总字节数","按扩展名分组统计各类型的数量与占比","跳过无权限的目录，避免整个程序抛异常退出"],
  req_en:["Use Directory.EnumerateFiles to count files and total bytes under a directory","Group by extension and report each type's count and share","Skip directories you cannot access instead of letting the program crash"],
  starter:"var root = Directory.GetCurrentDirectory();\nlong total = 0; int count = 0;\nforeach (var f in Directory.EnumerateFiles(root, \"*\", SearchOption.AllDirectories))\n{\n    total += new FileInfo(f).Length;\n    count++;\n}\nConsole.WriteLine($\"{count} files, {total / 1024} KB\");",
  hint:"EnumerateFiles 是惰性的，比 GetFiles 更省内存，适合大目录。",
  hint_en:"EnumerateFiles is lazy and far lighter than GetFiles on large trees.",
  xp:25}
];
L["cs-s7"] = [
 {t:"用 record 建模并做表单校验",t_en:"Modelling with record and Validating Input",
  req:["用 record 定义一个不可变的学生类型（姓名 + 分数）","写一个静态校验方法返回 (bool, string) 报告第一个错误","用 with 表达式基于一个实例生成「只改分数」的新实例"],
  req_en:["Define an immutable student record with a name and a score","Write a static validator returning (bool, string) for the first error","Use a with expression to derive a new instance that only changes the score"],
  starter:"record Student(string Name, int Score);\n\nstatic (bool ok, string msg) Validate(Student s) => s switch\n{\n    { Name.Length: 0 } => (false, \"姓名不能为空\"),\n    { Score: < 0 or > 100 } => (false, \"分数需在 0~100\"),\n    _ => (true, \"ok\")\n};\n\nvar s = new Student(\"小明\", 88);\nConsole.WriteLine(Validate(s));\nConsole.WriteLine(s with { Score = 95 });",
  hint:"with 表达式做的是浅拷贝再覆盖指定属性，是修改不可变数据的标准手法。",
  hint_en:"The with expression shallow-copies then overrides the named properties.",
  xp:25},
 {t:"可空引用类型带来的编译期保护",t_en:"Nullable Reference Types as Compile-time Safety",
  req:["在项目里开启 <Nullable>enable</Nullable>","写一个可能返回 null 的方法，用 string? 标注并处理警告","用 ?? 与 ?. 各消除一处可空警告，说明各自的语义"],
  req_en:["Enable <Nullable>enable</Nullable> in the project file","Write a method that may return null, annotate it string? and address the warnings","Remove two warnings using ?? and ?., explaining the semantics of each"],
  starter:"static string? Find(Dictionary<string, string> map, string key)\n{\n    map.TryGetValue(key, out var v);\n    return v;\n}\n\nvar m = new Dictionary<string, string> { [\"a\"] = \"A\" };\nvar v = Find(m, \"a\") ?? \"默认值\";\nConsole.WriteLine(v.Length);",
  hint:"?. 是空值短路访问，?? 是空值合并取值；开启可空引用类型后编译器会盯着你处理这两种情况。",
  hint_en:"?. short-circuits on null and ?? supplies a fallback; nullable reference types make the compiler enforce it.",
  xp:25}
];
/* ==================== Go ==================== */
L["go-s1"] = [
 {t:"从 go run 到交叉编译",t_en:"From go run to Cross-compilation",
  req:["用 go run 与 go build 各跑一次，比较产物差异","设置 GOOS/GOARCH 交叉编译一个 Windows 或 Linux 二进制","用 go env 查看当前的关键环境变量并说明各自作用"],
  req_en:["Compare outputs of go run and go build","Cross-compile a Windows or Linux binary by setting GOOS/GOARCH","Inspect key environment variables with go env and explain them"],
  starter:"// main.go\npackage main\n\nimport (\n    \"fmt\"\n    \"runtime\"\n)\n\nfunc main() {\n    fmt.Println(runtime.GOOS, runtime.GOARCH)\n}",
  hint:"交叉编译只需环境变量：GOOS=linux GOARCH=amd64 go build，无需额外工具链。",
  hint_en:"Cross-compiling is just environment variables: GOOS=linux GOARCH=amd64 go build.",
  xp:25},
 {t:"用 go mod 管理一个小依赖",t_en:"Managing a Dependency with go mod",
  req:["用 go mod init 初始化模块并查看生成的 go.mod","用 go get 引入一个第三方库，在代码里调用一次","用 go mod tidy 清理未使用的依赖，观察 go.mod 与 go.sum 的变化"],
  req_en:["Initialise a module with go mod init and inspect go.mod","Add a third-party library with go get and call it once","Run go mod tidy and observe how go.mod and go.sum change"],
  starter:"// go mod init demo\n// go get github.com/google/uuid\npackage main\n\nimport (\n    \"fmt\"\n    \"github.com/google/uuid\"\n)\n\nfunc main() {\n    fmt.Println(uuid.New().String())\n}",
  hint:"go.sum 记录依赖的校验和，用于保证构建可复现，不要手工修改。",
  hint_en:"go.sum records checksums so builds are reproducible; never edit it by hand.",
  xp:25}
];
L["go-s2"] = [
 {t:"用多返回值与命名返回值写解析函数",t_en:"Multi-return and Named Returns",
  req:["写一个函数把字符串转成整数，返回 (int, error)","用命名返回值实现一个统计函数，并在 defer 里修正返回值","对比两种写法在可读性上的差异"],
  req_en:["Write a function parsing a string into an int, returning (int, error)","Implement a statistics function with named returns and adjust it inside defer","Compare the readability of both styles"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"strconv\"\n)\n\nfunc toInt(s string) (n int, err error) {\n    n, err = strconv.Atoi(s)\n    return\n}\n\nfunc main() {\n    v, err := toInt(\"42\")\n    fmt.Println(v, err)\n}",
  hint:"裸 return 会返回命名返回值的当前值，配合 defer 可以在返回前统一加工结果。",
  hint_en:"A bare return sends the current named values, letting defer post-process them.",
  xp:25},
 {t:"用 defer 做资源清理与耗时统计",t_en:"defer for Cleanup and Timing",
  req:["写一个函数，用 defer 统计自身耗时并打印","在同一个函数里开两个 defer，验证后进先出的执行顺序","用 defer 关闭一个模拟资源，并在关闭失败时打印错误"],
  req_en:["Write a function that times itself using defer","Open two defers in one function and verify last-in-first-out order","Use defer to close a simulated resource and log an error if closing fails"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc work() {\n    defer func(t time.Time) { fmt.Println(\"elapsed\", time.Since(t)) }(time.Now())\n    defer fmt.Println(\"first defer registered\")\n    time.Sleep(50 * time.Millisecond)\n}\n\nfunc main() { work() }",
  hint:"defer 的参数在注册时就求值，所以要把 time.Now() 作为参数传进去，否则统计的是结束时间。",
  hint_en:"defer arguments are evaluated at registration, so pass time.Now() in to capture the start.",
  xp:25}
];
L["go-s3"] = [
 {t:"slice 扩容与共享底层数组",t_en:"slice Growth and Shared Backing Arrays",
  req:["用 append 连续添加元素，打印每一步的 len 与 cap","切出一个子 slice 后修改它，验证父 slice 是否被影响","用 copy 或三索引切片 s[a:b:c] 切断共享"],
  req_en:["Append repeatedly and print len and cap at each step","Take a sub-slice, mutate it and check whether the parent changes","Break the sharing with copy or a three-index slice s[a:b:c]"],
  starter:"package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := make([]int, 0, 1)\n    for i := 0; i < 6; i++ {\n        s = append(s, i)\n        fmt.Println(len(s), cap(s))\n    }\n    sub := s[:2]\n    sub[0] = 99\n    fmt.Println(s[0])\n}",
  hint:"cap 不足时 append 会分配新数组，这与「仍在同一底层数组」的情况要分开理解。",
  hint_en:"When cap is exceeded append reallocates; otherwise the arrays stay shared.",
  xp:25},
 {t:"map 的判存、删除与并发保护",t_en:"map Lookup, Delete and Concurrency",
  req:["用 comma-ok 判断键是否存在，用 delete 删除一个键","尝试向 nil map 写入，捕获 panic 并说明原因","用 sync.RWMutex 包一层实现并发安全的读取"],
  req_en:["Use comma-ok to test existence and delete a key","Write to a nil map, recover the panic and explain why","Wrap it with sync.RWMutex for safe concurrent reads"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    m := make(map[string]int)\n    m[\"a\"] = 1\n    if v, ok := m[\"a\"]; ok { fmt.Println(v) }\n    delete(m, \"a\")\n    var mu sync.RWMutex\n    mu.RLock()\n    _ = m[\"a\"]\n    mu.RUnlock()\n}",
  hint:"map 未初始化时写入会 panic；并发读写内置 map 会被运行时检测并直接报错。",
  hint_en:"Writing to a nil map panics, and concurrent map access is detected and crashes at run time.",
  xp:25}
];
L["go-s4"] = [
 {t:"用隐式接口做多态",t_en:"Polymorphism with Implicit Interfaces",
  req:["定义 Shape 接口含 Area() 与 Name() 两个方法","实现 Circle 与 Rect，把它们放进 []Shape 统一遍历","写一个函数只接受 interface{ Area() float64 } 的窄接口"],
  req_en:["Define a Shape interface with Area() and Name()","Implement Circle and Rect, then iterate them as []Shape","Write a function accepting the narrower interface{ Area() float64 }"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\ntype Shape interface {\n    Area() float64\n    Name() string\n}\n\ntype Circle struct{ R float64 }\n\nfunc (c Circle) Area() float64 { return math.Pi * c.R * c.R }\nfunc (c Circle) Name() string  { return \"circle\" }\n\nfunc main() {\n    shapes := []Shape{Circle{R: 1}}\n    for _, s := range shapes { fmt.Println(s.Name(), s.Area()) }\n}",
  hint:"接口由使用方定义、实现方无需声明，这就是 Go 常说的「鸭子类型」。",
  hint_en:"Interfaces are declared by the consumer and satisfied implicitly, the Go duck-typing story.",
  xp:25},
 {t:"错误包装与 errors.Is / errors.As",t_en:"Error Wrapping with errors.Is and As",
  req:["定义一个哨兵错误 ErrNotFound 与一个自定义错误类型","用 fmt.Errorf 的 %w 包装底层错误并返回","用 errors.Is 判断哨兵错误、errors.As 取出自定义类型"],
  req_en:["Define a sentinel ErrNotFound plus a custom error type","Wrap the underlying error with fmt.Errorf and %w","Use errors.Is for the sentinel and errors.As to extract the custom type"],
  starter:"package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n)\n\nvar ErrNotFound = errors.New(\"not found\")\n\ntype QueryErr struct{ Key string }\n\nfunc (e *QueryErr) Error() string { return \"query failed: \" + e.Key }\n\nfunc find(k string) error {\n    return fmt.Errorf(\"find(%s): %w\", k, ErrNotFound)\n}\n\nfunc main() {\n    err := find(\"a\")\n    fmt.Println(errors.Is(err, ErrNotFound))\n}",
  hint:"%w 会保留错误链，errors.Is / As 才能沿着链条逐层匹配。",
  hint_en:"%w preserves the error chain so errors.Is and errors.As can walk it.",
  xp:25}
];
L["go-s5"] = [
 {t:"用 channel 做任务分发",t_en:"Task Distribution over Channels",
  req:["开 3 个 worker goroutine，从同一个 channel 消费任务","用另一个 channel 收集结果，主协程汇总打印","用 WaitGroup 等待全部 worker 退出后再关闭结果通道"],
  req_en:["Start three worker goroutines consuming from one channel","Collect results on a second channel and aggregate in main","Wait for all workers with a WaitGroup before closing the result channel"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    jobs := make(chan int, 10)\n    results := make(chan int, 10)\n    var wg sync.WaitGroup\n    for w := 0; w < 3; w++ {\n        wg.Add(1)\n        go func() { defer wg.Done(); for j := range jobs { results <- j * j } }()\n    }\n    for i := 1; i <= 5; i++ { jobs <- i }\n    close(jobs)\n    wg.Wait()\n    close(results)\n    sum := 0\n    for r := range results { sum += r }\n    fmt.Println(sum)\n}",
  hint:"关闭 channel 由发送方负责；接收方用 for range 会一直读到通道关闭为止。",
  hint_en:"Only the sender closes a channel; for range keeps receiving until it is closed.",
  xp:25},
 {t:"用 select 与超时控制并发",t_en:"select with Timeout",
  req:["用 select 在「结果就绪」与「超时」两个 case 之间做选择","给超时分支打印提示，说明任务未在限定时间内完成","用 default 写一次非阻塞读取，观察它立刻返回的行为"],
  req_en:["Use select to choose between a ready result and a timeout","Print a message in the timeout branch explaining the deadline was missed","Add a non-blocking read with default and observe it returning immediately"],
  starter:"package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    ch := make(chan string, 1)\n    go func() {\n        time.Sleep(120 * time.Millisecond)\n        ch <- \"done\"\n    }()\n    select {\n    case v := <-ch:\n        fmt.Println(v)\n    case <-time.After(200 * time.Millisecond):\n        fmt.Println(\"timeout\")\n    }\n}",
  hint:"select 会在多个就绪分支中随机选一个；time.After 是超时控制最常用的写法。",
  hint_en:"select picks randomly among ready branches, and time.After is the usual timeout idiom.",
  xp:25}
];
L["go-s6"] = [
 {t:"用标准库写一个带路由的 HTTP 服务",t_en:"An HTTP Service with Routing",
  req:["用 http.NewServeMux 注册两个路径：一个返回文本、一个返回 JSON","解析查询参数并做最简单的校验，非法时返回 400","给处理器加上请求计时中间件，打印每个请求的耗时"],
  req_en:["Register two routes with http.NewServeMux: one text, one JSON","Parse a query parameter, validate it and return 400 on bad input","Add timing middleware that logs each request's duration"],
  starter:"package main\n\nimport (\n    \"encoding/json\"\n    \"net/http\"\n)\n\nfunc main() {\n    mux := http.NewServeMux()\n    mux.HandleFunc(\"/ping\", func(w http.ResponseWriter, r *http.Request) { w.Write([]byte(\"pong\")) })\n    mux.HandleFunc(\"/api\", func(w http.ResponseWriter, r *http.Request) {\n        json.NewEncoder(w).Encode(map[string]any{\"ok\": true})\n    })\n    http.ListenAndServe(\":8080\", mux)\n}",
  hint:"中间件本质是「接收 Handler 返回 Handler」的函数，用闭包把额外逻辑包在外面。",
  hint_en:"Middleware is a function taking and returning a Handler, wrapping extra logic in a closure.",
  xp:25},
 {t:"写一个 HTTP 客户端并处理错误",t_en:"An HTTP Client with Proper Error Handling",
  req:["用 http.Get 请求一个接口，defer 关闭 Body","设置超时的 http.Client 替代默认客户端","把响应体解码成结构体，并处理状态码非 200 的情况"],
  req_en:["Request an endpoint with http.Get and defer closing the body","Replace the default client with one configured with a timeout","Decode the body into a struct and handle non-200 status codes"],
  starter:"package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n    \"net/http\"\n    \"time\"\n)\n\ntype Resp struct{ Origin string }\n\nfunc main() {\n    c := &http.Client{Timeout: 3 * time.Second}\n    r, err := c.Get(\"https://httpbin.org/get\")\n    if err != nil { fmt.Println(err); return }\n    defer r.Body.Close()\n    if r.StatusCode != 200 { fmt.Println(\"bad status\", r.StatusCode); return }\n    var out Resp\n    json.NewDecoder(r.Body).Decode(&out)\n    fmt.Println(out.Origin)\n}",
  hint:"默认的 http.Client 没有超时，生产代码必须显式设置，否则请求可能永久挂起。",
  hint_en:"The default client has no timeout, so production code must set one explicitly.",
  xp:25}
];
L["go-s7"] = [
 {t:"为已有函数补齐表驱动测试",t_en:"Table-driven Tests for Existing Code",
  req:["为一个字符串处理函数写 xxx_test.go，使用表驱动写法","覆盖正常、边界与错误三类输入，用 t.Run 给每个用例命名","运行 go test -v 并统计覆盖率（go test -cover）"],
  req_en:["Write xxx_test.go for a string function using table-driven style","Cover normal, boundary and error cases, naming each with t.Run","Run go test -v and measure coverage with go test -cover"],
  starter:"package main\n\nimport \"testing\"\n\nfunc reverse(s string) string {\n    r := []rune(s)\n    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 { r[i], r[j] = r[j], r[i] }\n    return string(r)\n}\n\nfunc TestReverse(t *testing.T) {\n    for _, c := range []struct{ in, want string }{\n        {\"abc\", \"cba\"},\n        {\"\", \"\"},\n        {\"中文\", \"文中\"},\n    } {\n        t.Run(c.in, func(t *testing.T) {\n            if got := reverse(c.in); got != c.want { t.Errorf(\"got %q want %q\", got, c.want) }\n        })\n    }\n}",
  hint:"表驱动让新增用例只需加一行数据；用 []rune 处理中文才不会把字符切碎。",
  hint_en:"Table-driven tests add cases with one line each, and []rune keeps multibyte characters intact.",
  xp:25},
 {t:"用基准测试对比两种实现",t_en:"Benchmarking Two Implementations",
  req:["写两个实现同一功能的函数（如字符串拼接：+ 与 strings.Builder）","各写一个 Benchmark 函数，用 b.N 自动决定循环次数","运行 go test -bench=. -benchmem，比较 ns/op 与 B/op"],
  req_en:["Write two functions doing the same job (string concatenation with + versus strings.Builder)","Add a Benchmark function for each, relying on b.N for iteration count","Run go test -bench=. -benchmem and compare ns/op and B/op"],
  starter:"package main\n\nimport (\n    \"strings\"\n    \"testing\"\n)\n\nfunc concatPlus(n int) string {\n    s := \"\"\n    for i := 0; i < n; i++ { s += \"x\" }\n    return s\n}\n\nfunc concatBuilder(n int) string {\n    var b strings.Builder\n    for i := 0; i < n; i++ { b.WriteString(\"x\") }\n    return b.String()\n}\n\nfunc BenchmarkPlus(b *testing.B)  { for i := 0; i < b.N; i++ { concatPlus(100) } }\nfunc BenchmarkBuilder(b *testing.B) { for i := 0; i < b.N; i++ { concatBuilder(100) } }",
  hint:"-benchmem 会同时报告每次操作分配的内存，能直观看出「+ 拼接」的额外开销。",
  hint_en:"-benchmem reports allocations per operation, exposing the extra cost of + concatenation.",
  xp:25}
];

  Object.keys(L).forEach(function (k) {
    window.LAB_EXTRA = window.LAB_EXTRA || {};
    window.LAB_EXTRA[k] = (window.LAB_EXTRA[k] || []).concat(L[k]);
  });
})();
