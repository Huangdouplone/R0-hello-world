/* ============================================================
 * 课程深化补充数据：C#
 * 挂载：window.LESSON_EXTRA[课程id] = {out, deep:[...], recap}
 * ============================================================ */
window.LESSON_EXTRA = window.LESSON_EXTRA || {};
Object.assign(window.LESSON_EXTRA, {
"cs-1-1":{out:"Hello, World!",deep:["C# 由 Anders Hejlsberg 于 2000 年设计，名字中的 # 是升半音的谐音——比 C 高半音。",".NET 是运行时和类库；C# 是语言。.NET Core（2016）跨平台，2020 年改名 .NET 5+。","dotnet new console 创建项目；dotnet run 编译并运行。"],recap:"C# = .NET 平台主力语言；dotnet CLI 是开发入口。"},
"cs-1-2":{out:"Hello, C#",deep:["var 是静态类型——编译器推断类型后固定，不是动态类型。","C# 8+ 支持 nullable 引用类型——string? 表示可能为 null。","字符串内插 $\"\" 是 C# 6 的特性，比 string.Format 更简洁。"],recap:"var 推断类型；$\"\" 内插；nullable 标注可空。"},
"cs-1-3":{out:"及格",deep:["switch 的模式匹配：case 可以匹配类型、范围、属性。","C# 9 的 switch 表达式：x switch { 1 => \"一\", _ => \"其他\" }。","if 必须有括号；switch 穿透用 goto case 显式声明。"],recap:"多分支用 switch；C# 8+ 模式匹配强大。"},
"cs-1-4":{out:"0 1 2",deep:["for 循环比 foreach 更灵活——可以控制步长和索引。","foreach 只读遍历——修改集合会 InvalidOperationException。","while/do-while 区别：do-while 至少执行一次。"],recap:"知道索引用 for；只遍历用 foreach。"},
"cs-2-1":{out:"30",deep:["参数传递默认是值传递——引用类型传的是引用的副本。","ref/out 参数传引用本身；in 参数只读引用。","params 可变参数必须是最后一个参数。"],recap:"方法 = 函数；ref/out 传引用；params 可变参数。"},
"cs-2-2":{out:"5",deep:["值类型（int/struct）存在栈上；引用类型（class）存在堆上。","string 是引用类型但行为像值类型（不可变）。","Nullable<T> 和 ? 语法：int? 可以为 null。"],recap:"值类型在栈，引用类型在堆；string 特殊。"},
"cs-2-3":{out:"1\n2 3",deep:["构造函数可以重载——不同参数列表。","静态构造函数在类第一次使用前执行，且只执行一次。","只读字段 readonly 只能在构造函数中赋值。"],recap:"构造函数初始化；静态构造函数只跑一次。"},
"cs-2-4":{out:"11",deep:["属性 = get/set 方法的语法糖——背后是编译后的方法。","自动属性：public int X { get; set; } 编译器生成后备字段。","init-only 属性（C# 9）：public int X { get; init; } 对象初始化后只读。"],recap:"属性封装字段；init 实现不可变对象。"},
"cs-3-1":{out:"[1,2,3,4,5]",deep:["List<T> 是动态数组——自动扩容，插入删除 O(n)。","数组 [] 是定长的；List<T> 是变长的。","foreach 遍历 List<T> 不需要知道长度。"],recap:"集合用 List<T>；数组定长，List 变长。"},
"cs-3-2":{out:"10",deep:["Dictionary<TKey,TValue> 哈希表——查找 O(1)。","TryGetValue 比 ContainsKey + 索引器更高效（只查一次）。","字典不保证顺序——需要顺序用 SortedDictionary。"],recap:"键值查找用 Dictionary；TryGetValue 防 KeyNotFound。"},
"cs-3-3":{out:"（编译错误：找不到类型）",deep:["using 指令导入命名空间；不需要在文件顶部写全路径。","using static 导入静态成员：using static System.Math。","全局 using（C# 10）：GlobalUsings.cs 中声明，全项目可用。"],recap:"using 导入命名空间；别名 using X = Longer.Namespace。"},
"cs-3-4":{out:"（泛型方法）",deep:["泛型避免装箱拆箱——List<int> 比 ArrayList 快。","where T : new() 约束 T 必须有无参构造函数。","泛型委托：Func<T,int>、Action<T> 是 BCL 内置的。"],recap:"泛型 = 类型安全 + 性能；where 约束类型参数。"},
"cs-4-1":{out:"我叫张三，今年 18",deep:["类是引用类型——赋值传递引用，不是复制。","构造函数可以链式调用：: this(...)。","字段优先用私有——通过属性暴露。"],recap:"class 是引用类型；封装 = 私有字段 + 公共属性。"},
"cs-4-2":{out:"学生考试中...\n我叫张三，今年 18",deep:["基类 object 是所有类型的终极基类。","base 调用父类成员；base() 调用父类构造函数。","sealed 类不能被继承——防止滥用继承。"],recap:"继承用 : 基类；base 调用父类；sealed 禁止继承。"},
"cs-4-3":{out:"汪汪汪\n喵喵喵",deep:["多态 = 父类引用指向子类实例，调用重写方法时执行子类版本。","virtual 标记可重写；override 重写；new 隐藏（非多态）。","abstract 类不能实例化；abstract 方法必须在子类重写。"],recap:"virtual/override 实现多态；abstract 强制子类实现。"},
"cs-4-4":{out:"（接口实现）",deep:["接口只定义契约——不包含实现（C# 8 默认方法除外）。","一个类可以实现多个接口——C# 不支持多继承但接口可以。","IDisposable.Dispose() 模式：释放非托管资源。"],recap:"接口 = 契约；面向接口编程便于替换和测试。"},
"cs-5-1":{out:"文件已保存",deep:["using 声明在结束时自动 Dispose——不用手动 try/finally。","File.ReadAllText 一次性读全文件——大文件用 StreamReader。","相对路径是相对于工作目录，不是源代码目录。"],recap:"using 自动释放；小文件用 File.* ，大文件用流。"},
"cs-5-2":{out:"（反序列化的对象）",deep:["System.Text.Json 是 .NET Core 3+ 内置的——比 Newtonsoft.Json 更快。","JsonPropertyName 属性控制 JSON 键名。","JsonSerializerOptions 配置大小写、枚举转换等。"],recap:"System.Text.Json 序列化/反序列化；属性名映射。"},
"cs-5-3":{out:"用户操作失败: ...",deep:["异常是类：Exception → IOException → FileNotFoundException。","catch 可以多次捕获不同类型异常。","throw 重新抛出保留堆栈；throw ex 会重置堆栈——用 throw。"],recap:"try/catch/finally；catch 按类型；throw 保留堆栈。"},
"cs-5-4":{out:"（异步操作完成）",deep:["async 方法返回 Task/Task<T>——void 只用于事件处理。","await 释放线程——不是阻塞，而是注册回调。","ConfigureAwait(false) 在库代码中避免捕获同步上下文。"],recap:"async/await 异步非阻塞；返回 Task 不是 void。"},
"cs-6-1":{out:"（LINQ 查询结果）",deep:["LINQ 方法语法 vs 查询语法——编译后等价，方法语法更灵活。","延迟执行：LINQ 查询在遍历时才执行，不是写时。","ToList/ToArray 立即执行并缓存结果。"],recap:"LINQ = 查询语法；延迟执行；ToXxx 立即执行。"},
"cs-6-2":{out:"（线程安全的计数器）",deep:["lock 块获取独占锁——同一时刻只有一个线程进入。","lock(typeof(T)) 危险——可能被其他代码也 lock 同一类型。","async 方法不能用 lock——用 SemaphoreSlim。"],recap:"lock 保护共享状态；async 中用 SemaphoreSlim。"},
"cs-6-3":{out:"（并发任务）",deep:["Task.Run 在线程池上执行——不要用 Task.Run 包装 CPU 密集以外的操作。","await Task.WhenAll(...) 并行等待多个任务。","CancellationToken 传递取消信号——cooperative cancellation。"],recap:"Task.Run 后台；WhenAll 并行；CancellationToken 取消。"},
"cs-6-4":{out:"（DI 解析成功）",deep:["DI 容器在启动时注册服务，运行时自动注入依赖。","生命周期：Singleton（一个实例）、Scoped（每个请求）、Transient（每次新建）。","依赖注入降低耦合——代码依赖抽象（接口）不是具体实现。"],recap:"DI = 控制反转；注册 → 解析 → 使用；生命周期三档。"},
"cs-7-1":{out:"（单元测试通过）",deep:["AAA 模式：Arrange（准备）、Act（执行）、Assert（断言）。","测试不依赖外部资源——用 mock 替换数据库/HTTP。","命名规范：方法名_Condition_ExpectedResult。"],recap:"xUnit/NUnit 写测试；AAA 模式；mock 外部依赖。"},
"cs-7-2":{out:"（性能提升结果）",deep:["GC 分代：Gen0（年轻，频繁回收）→ Gen1 → Gen2（老年代，少回收）。","IDisposable 模式 + using 释放非托管资源。","Span<T>/Memory<T> 避免堆分配——高性能场景用。"],recap:"GC 自动但不免费；减少分配；using 释放资源。"},
"cs-7-3":{out:"（调试信息输出）",deep:["Debug.WriteLine 在 Release 构建中不编译——条件编译。","Trace.WriteLine 在 Release 也输出——用于生产监控。","断点条件：在断点上右键设置条件表达式。"],recap:"Debug 只在 Debug 构建；Trace 生产可用；条件断点。"},
"cs-7-4":{out:"（部署成功）",deep:["dotnet publish -c Release 编译发布——输出独立可执行文件或框架依赖。","框架依赖部署小但需要目标机器装 .NET 运行时。","自包含部署大但不需要运行时——适合服务器。"],recap:"dotnet publish 发布；框架依赖 vs 自包含。"}
});
