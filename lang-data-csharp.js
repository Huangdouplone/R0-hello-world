/* C# curriculum for R0:hello world */
window.LANG_DATA = window.LANG_DATA || {};
window.LANG_DATA.cs = {
stages:[
{id:"cs-s1",icon:"🚀",name:"启航与环境",desc:"认识 C# 与 .NET、装好 IDE",lv:"basic",
goal:"装好 .NET SDK，跑通第一个 C# 控制台程序。",
links:[["C# 官方文档","https://learn.microsoft.com/zh-cn/dotnet/csharp/"],[".NET 教程","https://dotnet.microsoft.com/learn"]],
lab:{t:"环境自检",req:["dotnet new console 创建项目","修改 Program.cs 打印自我介绍","dotnet run 运行"],starter:`// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, C#!");`,hint:"dotnet new console -n MyApp 创建项目；cd MyApp && dotnet run 运行。",xp:20},
lessons:[
{id:"cs-1-1",title:"认识 C#：类型安全的现代语言",min:8,summary:["C# 由微软开发，运行在 .NET 上，类型安全、语法优雅。","应用领域：Unity 游戏、Windows 桌面、Web（ASP.NET Core）、云服务。","现代 C#（C# 10+）支持顶级语句、可空引用类型、记录类型。"],code:`// 顶级语句（C# 9+），无需写 class 和 Main
Console.WriteLine("Hello, C#!");
// 传统写法需 class Program { static void Main() {} }`,pit:"C# 是静态类型语言——变量类型在编译时确定，很多错误在编译期就能发现。",ex:{q:"C# 常用于哪些领域？",a:"Unity 游戏开发、企业级后端、Windows 桌面应用。"},target:"能说清 C# 是什么并跑通 Hello World。"},
{id:"cs-1-2",title:"安装 .NET SDK 与 IDE",min:15,summary:["从 dot.net 下载 .NET SDK（含运行时和编译器）。","验证：dotnet --version。","IDE 推荐 Visual Studio（Windows/Mac）或 VS Code + C# Dev Kit。"],code:`# 命令行验证安装
dotnet --version
dotnet new console -n HelloApp
cd HelloApp
dotnet run`,pit:"Visual Studio 和 VS Code 是两个不同产品——VS 是完整 IDE（Windows 推荐），VS Code 是轻量编辑器。",ex:{q:"dotnet new console 做了什么？",a:"创建一个新的控制台项目模板，包含 .csproj 和 Program.cs。"},target:"装好 .NET SDK 并创建第一个项目。"},
{id:"cs-1-3",title:"变量与类型",min:10,summary:["int 整数、double 浮点、bool 布尔、string 字符串、char 字符。","var 让编译器推断类型（仍然是静态类型）。","字符串用双引号，可插值：$\"{name}\"。"],code:`int age = 25;
double price = 19.99;
string name = "Alice";
bool isActive = true;
var inferred = "hello"; // 编译器推断为 string
Console.WriteLine($"{name} is {age} years old");`,pit:"var 不是动态类型——编译后类型就固定了，不能把 int 改成 string。",ex:{q:"var 和动态类型有什么区别？",a:"var 是编译期推断，仍是静态类型；dynamic 才是运行时动态。"},target:"能声明各种类型的变量。"},
{id:"cs-1-4",title:"可空类型与字符串插值",min:8,summary:["引用类型默认可空；值类型加 ? 变可空：int? n = null。","字符串插值：$\"...{var}...\" 比 string.Format 简洁。","null 条件运算符：name?.Length 防止 NullReferenceException。"],code:`int? maybeNumber = null;
Console.WriteLine(maybeNumber?.ToString() ?? "无值");
string firstName = "张";
string lastName = "三";
Console.WriteLine($"{firstName}{lastName}");`,pit:"?? 运算符：左边为 null 时返回右边；??= 仅在 null 时赋值。",ex:{q:"int? 和 int 的区别？",a:"int? 可以为 null，int 不能。判断用 .HasValue 或 != null。"},target:"能用可空类型和字符串插值。"}
],
quiz:[
{q:"C# 运行在什么平台？",o:["JVM",".NET","V8","Python"],a:1,why:"C# 编译为 IL，运行在 .NET 运行时上。"},
{q:"创建控制台项目的命令是？",o:["dotnet create","dotnet new console","dotnet init","new c#"],a:1,why:"dotnet new console 创建控制台项目模板。"},
{q:"字符串插值用什么前缀？",o:["@","$","#","&"],a:1,why:"$ 前缀启用字符串插值。"},
]},
{id:"cs-s2",icon:"🔢",name:"控制流与方法",desc:"条件、循环、方法定义",lv:"basic",
goal:"能写条件分支、循环和自定义方法。",
links:[["C# 方法","https://learn.microsoft.com/zh-cn/dotnet/csharp/methods"]],
lab:{t:"BMI 计算方法",req:["写一个 CalculateBMI 方法接收身高体重","返回 BMI 值","Main 中调用并输出评价"],starter:`double CalculateBMI(double h, double w) {
  return w / (h * h);
}
// 在 Main 中调用`,hint:"方法签名：返回类型 方法名(参数列表)。",xp:20},
lessons:[
{id:"cs-2-1",title:"if/else 与 switch",min:8,summary:["if/else if/else 做条件分支。","switch 模式匹配支持类型和值模式。","三元运算符 condition ? a : b。"],code:`int score = 85;
if(score >= 90) Console.WriteLine("A");
else if(score >= 80) Console.WriteLine("B");
else Console.WriteLine("C");

switch(score) {
  case >= 90: Console.WriteLine("优秀"); break;
  default: Console.WriteLine("继续努力"); break;
}`,pit:"C# 8+ switch 支持关系模式 case >= 90，比传统 switch 强大。",ex:{q:"switch 和 if 怎么选？",a:"多值匹配用 switch；区间判断用 if 更直观。"},target:"能写条件分支逻辑。"},
{id:"cs-2-2",title:"循环：for、while、foreach",min:10,summary:["for 循环已知次数；while 条件满足时。","foreach 遍历集合（数组、List）。","break 跳出，continue 跳过本次。"],code:`for(int i=0; i<3; i++) Console.WriteLine(i);
int[] nums = {1,2,3};
foreach(int n in nums) Console.WriteLine(n);
int j=0; while(j<3){ Console.WriteLine(j++); }`,pit:"foreach 不能修改集合元素——要修改用 for 循环。",ex:{q:"遍历数组用 for 还是 foreach？",a:"只读遍历用 foreach；需要索引或修改元素用 for。"},target:"能根据场景选循环。"},
{id:"cs-2-3",title:"方法定义与参数",min:10,summary:["方法签名：返回类型 方法名(参数)。","void 表示无返回值。","参数可选：给默认值；params 可变参数。"],code:`int Add(int a, int b) => a + b;
void Greet(string name = "朋友") => Console.WriteLine($"Hi, {name}");
int Sum(params int[] numbers) {
  int total = 0;
  foreach(var n in numbers) total += n;
  return total;
}
Console.WriteLine(Add(1,2));
Console.WriteLine(Sum(1,2,3,4));`,pit:"表达式-bodied 方法 => 适合单行方法；可选参数必须在参数列表末尾。",ex:{q:"params 关键字的作用？",a:"让方法接收任意数量的同类型参数，内部当作数组处理。"},target:"能定义有返回值和无返回值的方法。"},
{id:"cs-2-4",title:"ref/out 与值引用",min:10,summary:["值类型传参是拷贝；引用类型传引用。","ref 按引用传递（必须先赋值）。","out 输出参数（方法内必须赋值）。"],code:`void Swap(ref int a, ref int b) {
  int t = a; a = b; b = t;
}
int x=1, y=2;
Swap(ref x, ref y);
Console.WriteLine(x + "," + y); // 2,1

bool TryParse(string s, out int result) => int.TryParse(s, out result);`,pit:"int、double、bool 是值类型；string、数组、类是引用类型。这是 C# 最重要的概念之一。",ex:{q:"值类型和引用类型传参有什么区别？",a:"值类型传副本，方法内修改不影响原变量；引用类型传地址，修改会影响原对象。"},target:"理解值类型和引用类型的区别。"}
],
quiz:[
{q:"遍历数组推荐用？",o:["for","foreach","while","do-while"],a:1,why:"foreach 简洁安全，只读遍历首选。"},
{q:"ref 参数要求？",o:["必须为 null","传入前必须赋值","不能修改","必须是引用类型"],a:1,why:"ref 参数传入前必须明确赋值。"},
{q:"表达式-bodied 方法用？",o:["->","=>","::","=>"],a:1,why:"=> 用于表达式-bodied 成员。"}
]},
{id:"cs-s3",icon:"📦",name:"集合与泛型",desc:"List、Dictionary、数组",lv:"basic",
goal:"能用 List<T> 和 Dictionary<K,V>。",
links:[["C# 集合类型","https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/concepts/collections"]],
lab:{t:"成绩管理器",req:["用 List<double> 存储成绩","添加、删除、计算平均分","用 Dictionary 存储学生名和成绩"],starter:`var scores = new List<double>();
scores.Add(90);
// 计算平均分`,hint:"List<T>.Average() 可直接算平均值。",xp:20},
lessons:[
{id:"cs-3-1",title:"数组与 List<T>",min:10,summary:["数组长度固定；List<T> 动态扩容。","List<T> 是泛型集合：List<int>、List<string>。","Add/Remove/Contains/Count 常用方法。"],code:`var nums = new List<int> {1,2,3};
nums.Add(4);
nums.Remove(2);
Console.WriteLine(nums.Count); // 3
foreach(var n in nums) Console.WriteLine(n);
int[] arr = nums.ToArray();`,pit:"数组和 List 转换：list.ToArray()，new List<T>(arr)。",ex:{q:"什么时候用数组，什么时候用 List？",a:"大小固定用数组（更省内存）；需要增删用 List<T>。"},target:"能使用 List<T> 增删改查。"},
{id:"cs-3-2",title:"Dictionary<K,V>",min:10,summary:["字典存储键值对，按键快速查找。","Add/索引器 [] 写入；TryGetValue 安全读取。","键必须唯一，常用 string 或 int 作键。"],code:`var dict = new Dictionary<string, int>();
dict["Alice"] = 95;
dict.Add("Bob", 87);
if(dict.TryGetValue("Alice", out int score))
    Console.WriteLine($"Alice: {score}");
foreach(var kv in dict)
    Console.WriteLine($"{kv.Key}: {kv.Value}");`,pit:"直接 dict[key] 在键不存在时会抛 KeyNotFoundException——用 TryGetValue 更安全。",ex:{q:"如何安全读取字典？",a:"用 TryGetValue，避免键不存在时抛异常。"},target:"能用 Dictionary 存储键值对。"},
{id:"cs-3-3",title:"LINQ 入门",min:12,summary:["LINQ 用 SQL 风格查询集合。","Where 筛选、Select 投影、OrderBy 排序。","Min/Max/Average/Sum 聚合。"],code:`var nums = new List<int>{1,2,3,4,5,6};
var evens = nums.Where(n => n%2==0).ToList();
var doubled = nums.Select(n => n*2).ToList();
Console.WriteLine(nums.Average());
Console.WriteLine(nums.Max());`,pit:"LINQ 延迟执行——ToList() 或 foreach 才真正执行查询。",ex:{q:"LINQ 解决了什么？",a:"统一了对数组、集合、数据库等各种数据源的查询语法。"},target:"能用 LINQ 做筛选和投影。"},
{id:"cs-3-4",title:"可空集合与初始化",min:8,summary:["集合初始化器简化创建。","var 局部变量让代码更简洁。","?. 空条件访问防止 NullReferenceException。"],code:`var list = new List<string>{"a","b","c"};
var dict = new Dictionary<int,string>{
  [1]="one", [2]="two"
};
int? maybe = null;
int len = maybe?.ToString().Length ?? 0;`,pit:"集合初始化器和对象初始化器让代码更紧凑——但不要过度嵌套影响可读性。",ex:{q:"var 在集合中怎么用？",a:"var list = new List<int>(); 编译器推断类型为 List<int>。"},target:"能用初始化器快速创建集合。"}
],
quiz:[
{q:"List<int> 添加元素用？",o:["push","Add","insert","append"],a:1,why:"List<T>.Add 添加到末尾。"},
{q:"字典安全读取用？",o:["dict[key]","dict.Get","TryGetValue","dict.Find"],a:2,why:"TryGetValue 不抛异常。"},
{q:"LINQ 筛选用？",o:["Select","Where","Filter","Map"],a:1,why:"Where 按条件筛选元素。"}
]},
{id:"cs-s4",icon:"🏗️",name:"面向对象编程",desc:"类、继承、接口",lv:"adv",
goal:"能用类和接口设计面向对象程序。",
links:[["C# 面向对象","https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/object-oriented"]],
lab:{t:"银行账户类",req:["创建 Account 类，有余额","Deposit/Withdraw 方法","Withdraw 余额不足时报错"],starter:`class Account {
  public decimal Balance { get; private set; }
  public void Deposit(decimal amount) { ... }
}`,hint:"decimal 适合金额；属性 get/set 控制访问。",xp:30},
lessons:[
{id:"cs-4-1",title:"类与对象",min:10,summary:["类是蓝图，对象是实例。","字段存数据，方法定义行为。","new 关键字创建实例。"],code:`class Person {
  public string Name;
  public int Age;
  public void Greet() => Console.WriteLine($"Hi, I'm {Name}");
}
var p = new Person { Name = "Alice", Age = 25 };
p.Greet();`,pit:"C# 中字段和属性不同——字段是私有变量，属性是带 get/set 的成员。",ex:{q:"类和对象的关系？",a:"类是模板，对象是按模板创建的具体实例。"},target:"能定义类并实例化。"},
{id:"cs-4-2",title:"属性与封装",min:10,summary:["属性 get/set 封装字段。","自动属性：public string Name {get;set;}。","构造函数初始化对象。"],code:`class Account {
  public decimal Balance { get; private set; }
  public Account(decimal initial) => Balance = initial;
  public void Deposit(decimal amount) => Balance += amount;
}
var acc = new Account(100);
acc.Deposit(50);
// acc.Balance = 0; // 编译错误——private set`,pit:"用属性而非公开字段——set 可以加验证逻辑，防止非法状态。",ex:{q:"为什么用属性而不是公开字段？",a:"属性可以在 set 中加验证、通知、计算，更安全灵活。"},target:"能用属性封装数据。"},
{id:"cs-4-3",title:"继承与多态",min:10,summary:[": 实现继承。","virtual 标记可重写方法，override 重写。","base 调用父类。"],code:`class Animal {
  public virtual void Speak() => Console.WriteLine("...");
}
class Dog : Animal {
  public override void Speak() => Console.WriteLine("Woof!");
}
Animal a = new Dog();
a.Speak(); // Woof!（多态）`,pit:" sealed 阻止类被继承；base.Method() 调用父类方法。",ex:{q:"多态是什么？",a:"父类引用指向子类实例，调用方法时执行子类的版本。"},target:"能用继承和多态。"},
{id:"cs-4-4",title:"接口",min:10,summary:["接口定义契约，类实现接口。","接口只包含签名，不包含实现。","一个类可实现多个接口。"],code:`interface IShape {
  double Area();
}
class Circle : IShape {
  public double Radius {get;set;}
  public double Area() => Math.PI * Radius * Radius;
}
IShape shape = new Circle { Radius = 5 };
Console.WriteLine(shape.Area());`,pit:"C# 类只支持单继承，但可以实现多个接口——这是解决多重继承的方式。",ex:{q:"接口和抽象类的区别？",a:"接口是纯契约（多实现）；抽象类可包含部分实现（单继承）。"},target:"能定义和实现接口。"}
],
quiz:[
{q:"C# 继承用什么符号？",o:["extends",":","implements","->"],a:1,why:"C# 用冒号 : 实现继承。"},
{q:"重写父类方法用？",o:["new","override","virtual","overwrite"],a:1,why:"override 重写 virtual/abstract 方法。"},
{q:"接口中的方法？",o:["有实现","只有签名","必须静态","不能有参数"],a:1,why:"接口只定义签名，不提供实现。"}
]},
{id:"cs-s5",icon:"⚡",name:"异步与异常",desc:"async/await、try/catch",lv:"adv",
goal:"能写异步代码并处理异常。",
links:[["C# 异步编程","https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/"]],
lab:{t:"异步数据加载",req:["写一个 async 方法模拟延迟","用 await Task.Delay 模拟","try/catch 包裹"],starter:`async Task LoadDataAsync() {
  await Task.Delay(1000);
  Console.WriteLine("加载完成");
}`,hint:"async 方法返回 Task 或 Task<T>；调用时 await。",xp:30},
lessons:[
{id:"cs-5-1",title:"异常处理 try/catch",min:8,summary:["try 包裹可能出错的代码。","catch 捕获异常。","finally 无论是否异常都执行。"],code:`try {
    int.Parse("abc");
} catch(FormatException e) {
    Console.WriteLine("格式错误: " + e.Message);
} finally {
    Console.WriteLine("清理");
}`,pit:"catch 不带类型捕获所有异常——不推荐，要捕获具体异常类型。",ex:{q:"finally 什么时候执行？",a:"无论 try 成功还是 catch 捕获异常，finally 都执行。"},target:"能用 try/catch 处理异常。"},
{id:"cs-5-2",title:"async/await",min:12,summary:["async 标记异步方法。","await 等待 Task 完成，不阻塞线程。","异步方法返回 Task 或 Task<T>。"],code:`async Task<string> FetchDataAsync() {
  await Task.Delay(1000); // 模拟异步操作
  return "数据";
}
async Task Main() {
  var data = await FetchDataAsync();
  Console.WriteLine(data);
}`,pit:"async void 只能用于事件处理——其他情况返回 Task，否则异常无法捕获。",ex:{q:"async/await 解决了什么？",a:"让异步代码像同步代码一样易读，避免回调地狱。"},target:"能写 async/await 方法。"},
{id:"cs-5-3",title:"Task 与并行",min:8,summary:["Task 表示一个异步操作。","Task.WhenAll 等待多个任务并行完成。","Task.Run 把 CPU 密集操作放到线程池。"],code:`async Task RunParallel() {
  var t1 = Task.Delay(1000);
  var t2 = Task.Delay(2000);
  await Task.WhenAll(t1, t2);
  Console.WriteLine("两个都完成了");
}`,pit:"异步不等于多线程——async 主要用于 I/O 密集操作（网络、文件），CPU 密集用 Task.Run。",ex:{q:"Task.WhenAll 和 await 一个个等的区别？",a:"WhenAll 并行等待，总时间是最长的那个；逐个 await 是串行。"},target:"理解 Task 和并行。"},
{id:"cs-5-4",title:"using 与资源管理",min:8,summary:["using 声明自动释放 IDisposable 资源。","文件、网络流等用完即释放。","using 变量在作用域结束自动 Dispose。"],code:`using var reader = new StreamReader("file.txt");
string content = await reader.ReadToEndAsync();
// 离开作用域自动关闭文件`,pit:"不释放文件/网络资源会导致资源泄漏——using 是 C# 的 RAII。",ex:{q:"using 语句的作用？",a:"确保 IDisposable 资源在作用域结束时自动释放。"},target:"能用 using 管理资源。"}
],
quiz:[
{q:"async 方法通常返回？",o:["void","Task/Task<T>","int","async"],a:1,why:"async 方法返回 Task，async void 仅限事件。"},
{q:"等待多个任务并行完成用？",o:["WaitAll","Task.WhenAll","WhenAll","Task.WaitAll"],a:1,why:"await Task.WhenAll 异步等待所有任务。"},
{q:"using 的作用？",o:["导入命名空间","自动释放资源","声明变量","编译指令"],a:1,why:"using 确保 IDisposable 资源自动释放。"}
]},
{id:"cs-s6",icon:"🗄️",name:"文件与数据",desc:"文件 I/O、JSON、集合查询",lv:"adv",
goal:"能读写文件和 JSON 数据。",
links:[["C# 文件 I/O","https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/file-system/"]],
lab:{t:"成绩保存到 JSON",req:["创建成绩列表","用 System.Text.Json 序列化到文件","从文件读取并反序列化"],starter:`var scores = new List<int>{90,85,95};
string json = JsonSerializer.Serialize(scores);
File.WriteAllText("scores.json", json);`,hint:"System.Text.Json 是 .NET 内置 JSON 库。",xp:30},
lessons:[
{id:"cs-6-1",title:"文件读写",min:10,summary:["File.ReadAllText/WriteAllText 简单读写。","File 类静态方法方便小文件。","大文件用 StreamReader/StreamWriter 流式读取。"],code:`File.WriteAllText("hello.txt", "Hello!");
string content = File.ReadAllText("hello.txt");
// 追加
File.AppendAllText("log.txt", "新日志\n");`,pit:"路径用 Path.Combine 拼接，避免硬编码斜杠。",ex:{q:"大文件用什么读取？",a:"用 StreamReader 逐行读取，避免一次性加载全部到内存。"},target:"能读写文本文件。"},
{id:"cs-6-2",title:"JSON 序列化",min:10,summary:["System.Text.Json 内置 JSON 库。","JsonSerializer.Serialize 转 JSON 字符串。","JsonSerializer.Deserialize<T> 转回对象。"],code:`var person = new { Name = "Alice", Age = 25 };
string json = JsonSerializer.Serialize(person);
Console.WriteLine(json);
var back = JsonSerializer.Deserialize<Person>(json);`,pit:"属性必须是 public；命名策略默认 PascalCase，可配置 camelCase。",ex:{q:"反序列化时类型不匹配会？",a:"JsonException——确保 JSON 结构和目标类型一致。"},target:"能用 JSON 序列化和反序列化。"},
{id:"cs-6-3",title:"正则表达式",min:8,summary:["Regex 类处理文本模式匹配。","IsMatch 检查是否匹配。","Replace/Matches 替换和提取。"],code:`using System.Text.RegularExpressions;
bool isEmail = Regex.IsMatch("test@example.com", @"^\w+@\w+\.\w+$");
string cleaned = Regex.Replace("a1b2c3", @"\d", "");`,pit:"正则性能较差——验证邮箱等用专门库；简单查找替换用正则。",ex:{q:"@\"...\" 字符串什么意思？",a:"Verbatim 字符串，不转义反斜杠，适合正则和路径。"},target:"能用正则做简单验证。"},
{id:"cs-6-4",title:"DateTime 与时间",min:8,summary:["DateTime 表示日期时间。","DateTime.Now 当前时间。","TimeSpan 表示时间间隔。"],code:`DateTime now = DateTime.Now;
Console.WriteLine(now.ToString("yyyy-MM-dd HH:mm:ss"));
DateTime tomorrow = now.AddDays(1);
TimeSpan span = tomorrow - now;`,pit:"DateTime.Now 是本地时间；DateTime.UtcNow 是 UTC——跨系统用 UTC。",ex:{q:"为什么推荐存储 UTC？",a:"UTC 无时区歧义，显示时再转本地时间。"},target:"能处理日期时间。"}
],
quiz:[
{q:"写小文本文件用？",o:["File.WriteAllText","StreamWriter","FileStream","WriteFile"],a:1,why:"File.WriteAllText 最便捷。"},
{q:"JSON 反序列化用？",o:["Deserialize","Deserialize<T>","Parse","FromJson"],a:1,why:"JsonSerializer.Deserialize<T>(json)。"},
{q:"时间间隔用什么类型？",o:["DateTime","TimeSpan","Date","Interval"],a:1,why:"TimeSpan 表示时间间隔。"}
]},
{id:"cs-s7",icon:"🎯",name:"高级特性",desc:"记录、模式匹配、可空引用",lv:"hard",
goal:"了解现代 C# 的高级特性。",
links:[["C# 新特性","https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/"]],
lab:{t:"用 record 表示数据",req:["定义一个 record 表示点","记录两个点并比较相等性","用 with 表达式复制修改"],starter:`record Point(double X, double Y);
var p1 = new Point(1, 2);
var p2 = p1 with { Y = 3 };`,hint:"record 自动实现值相等和 ToString。",xp:40},
lessons:[
{id:"cs-7-1",title:"record 类型",min:10,summary:["record 是不可止数据类型，自动实现值相等。","适合纯数据载体（DTO、模型）。","with 表达式创建修改副本。"],code:`record Point(double X, double Y);
var p1 = new Point(1, 2);
var p2 = p1 with { Y = 3 };
Console.WriteLine(p1 == new Point(1,2)); // True（值相等）`,pit:"record 默认不可变——属性 init 只能在构造时设置。",ex:{q:"record 和 class 的区别？",a:"record 是值相等（内容相同就相等）；class 是引用相等。"},target:"能用 record 表示数据。"},
{id:"cs-7-2",title:"模式匹配",min:10,summary:["is 类型模式检查并转换。","switch 表达式支持属性模式、位置模式。","逻辑模式 and/or/not。"],code:`object obj = "Hello";
if(obj is string s) Console.WriteLine(s.Length);
string Describe(object o) => o switch {
  0 => "零",
  int n when n > 0 => "正数",
  string s => $"字符串长度 {s.Length}",
  _ => "其他"
};`,pit:"模式匹配让类型检查和转换一步完成，比 is+as 更安全。",ex:{q:"switch 表达式和传统 switch 的区别？",a:"表达式直接返回值，支持模式匹配，不需要 break。"},target:"能用模式匹配简化代码。"},
{id:"cs-7-3",title:"可空引用类型",min:8,summary:["启用可空引用类型后，编译器帮助发现 null 引用错误。","string? 表示可能为 null；string 表示不为 null。","在 .csproj 中启用 <Nullable>enable</Nullable>。"],code:`string? name = GetName();
Console.WriteLine(name.Length); // 警告：可能为 null
Console.WriteLine(name!.Length); // 抑制警告（确认不为 null）
if(name != null) Console.WriteLine(name.Length); // 安全`,pit:"可空引用类型是编译时检查，不影响运行时——它帮你提前发现 bug。",ex:{q:"string? 和 string 的区别？",a:"string? 标注可能为 null，编译器会警告解引用；string 承诺不为 null。"},target:"理解可空引用类型。"},
{id:"cs-7-4",title:"依赖注入入门",min:8,summary:["DI 容器自动创建和注入依赖。","ASP.NET Core 内置 DI。","服务注册：AddSingleton/AddScoped/AddTransient。"],code:`// Startup.cs
builder.Services.AddSingleton<ILogger, ConsoleLogger>();
// 构造函数注入
class Service {
  private readonly ILogger _logger;
  public Service(ILogger logger) => _logger = logger;
}`,pit:"DI 让代码解耦——不直接 new 依赖，而是注入，方便测试和替换。",ex:{q:"为什么用依赖注入？",a:"解耦组件，便于单元测试和替换实现。"},target:"理解 DI 的基本思想。"}
],
quiz:[
{q:"record 的相等性是？",o:["引用相等","值相等","不相等","编译错误"],a:1,why:"record 自动实现值相等。"},
{q:"switch 表达式的 default 用？",o:["default:","_","else","*"],a:1,why:"弃元 _ 表示默认分支。"},
{q:"string? 表示？",o:["必须为 null","可能为 null","字符串可空类型","数组"],a:1,why:"string? 标注引用可能为 null。"}
]}
]
};
