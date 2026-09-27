/* ================================================================
 * R0:hello world · R6 W2 第三批：csharp 语言「底层机制」新章（cs-s8，4 节双语）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 与 world-depth-go.js / world-depth-js.js 同一套模式：
 *   英文只走 I18N 按 id 查表；加一章同时加一个 phase（cs 原有 7 章 → 新章下标 7）；
 *   stages / phases 原地 push；中文侧纵深与回顾写进 LESSON_EXTRA。
 * ================================================================ */
(function () {
  var C = window.LANG_DATA && window.LANG_DATA.cs;
  if (!C || !C.stages || !window.I18N) return;
  var IDX = C.stages.length;

  C.stages.push({
    id: "cs-s8", icon: "🧠", name: "底层机制", lv: "hard",
    desc: "值类型与装箱、GC 分代、反射与 async 状态机",
    goal: "能从内存布局、GC、编译期与线程池四层解释 C# 的性能与行为。",
    links: [[".NET GC docs", "https://learn.microsoft.com/dotnet/standard/garbage-collection/"], ["C# spec", "https://learn.microsoft.com/dotnet/csharp/language-reference/"]],
    lab: {
      t: "量一次装箱与一次零分配",
      req: ["把 int 装进 object 循环一百万次，用 Stopwatch 计时", "改用泛型 List<int> 再测一次，比较耗时", "用 ArrayPool<int>.Shared 改写一个临时大数组，打印 Rent 与 Return 的顺序"],
      starter: "using System.Diagnostics;\nusing System.Buffers;\n\nvar sw = Stopwatch.StartNew();\nobject boxed = 0;\nfor (int i = 0; i < 1_000_000; i++) boxed = i;   // 每次装箱都分配\nConsole.WriteLine(boxed);\nConsole.WriteLine(sw.ElapsedMilliseconds);\n\nvar pool = ArrayPool<int>.Shared;\nint[] buf = pool.Rent(4096);\n// ... 用 buf 做事 ...\npool.Return(buf);",
      hint: "装箱那一段换成了 List<int>.Add 就应该几乎不掉时间；ArrayPool 的 Rent 可能返回比请求更长的数组，别假设长度。",
      xp: 26
    },
    lessons: [
      {
        id: "cs-8-1", title: "值类型、装箱与泛型", min: 16,
        summary: [
          "值类型（struct、enum、数值类型）通常内联在容器里：局部变量在栈上，作为字段则内嵌在所属对象中。",
          "引用类型（class）总在堆上，变量持有的是引用；赋值只复制引用，不复制对象。",
          "装箱把值类型包成堆上的对象，拆箱再拷回来：热路径上每次装箱都是一次分配加一次 GC 记账。",
          "泛型按类型参数生成专门代码，值类型参数不会被装箱，这也是 List<int> 比 ArrayList 快得多的根本原因。",
          "ref struct（如 Span<T>、ReadOnlySpan<T>）只能待在栈上，不能装箱、不能进堆、不能跨 await，用来写零分配的高性能代码。",
          "struct 是值语义：默认按位复制、null 不适用、相等比较默认走逐字段（可能被反射拖慢，最好自己实现 IEquatable<T>）。"
        ],
        code: "struct Point { public int X, Y; }        // inline storage\n\nobject boxed = new Point(1, 2);      // boxing: heap allocation + copy\nvar back = (Point)boxed;             // unboxing copies it back\n\nvar list = new List<Point>();        // generic: stored inline, no boxing\nlist.Add(new Point { X = 1, Y = 2 });\nSpan<int> span = stackalloc int[64]; // ref struct, zero heap allocation",
        pit: "给 struct 只写属性不实现 IEquatable<T>，Equals 会走反射式逐字段比较；装箱比较更是雪上加霜。",
        ex: { q: "为什么泛型能避免装箱？", a: "JIT/编译器按具体类型参数生成专用代码，值类型直接内联存储，不需要包成 object。" },
        target: "能判断一段代码会不会装箱，并说清 ref struct 的限制与用途。"
      },
      {
        id: "cs-8-2", title: "GC 分代与资源释放", min: 16,
        summary: [
          "服务器/桌面 GC 分三代：新对象进 Gen0，存活一次升一代；Gen0 回收最频繁也最便宜。",
          "大对象（默认 ≥85KB）直接进 LOH，LOH 默认只做压缩式整理，碎片会影响后续大数组分配。",
          "终结器（Finalizer）让对象至少多活一轮 GC，且执行时机不可控：它不是释放资源的通道，Dispose 才是。",
          "using / await using 是 try-finally 的语法糖，确定性释放；模式是 Dispose 里托管资源顺手释放、非托管资源必须释放、并 SuppressFinalize。",
          "分配压力大时的常规解法是复用而不是加速 GC：ArrayPool、对象池、Span、stackalloc、struct 化。",
          "Server GC 每逻辑核一个堆与一个 GC 线程，吞吐高但内存占用大；Workstation GC 适合客户端与容器小内存场景。"
        ],
        code: "public sealed class DbHandle : IDisposable\n{\n    private SafeHandle _h;                       // unmanaged resource\n    public void Dispose()\n    {\n        _h?.Dispose();                           // deterministic release\n        _h = null;\n        GC.SuppressFinalize(this);               // stop the long lifetime\n    }\n}\n\nusing var handle = new DbHandle();               // disposed at scope end",
        pit: "把 Dispose 写成 ~Finalizer 依赖：终结器顺序未定义，可能拿到已被回收的依赖对象，而且资源什么时候释放完全不可控。",
        ex: { q: "为什么终结器会延长对象生命周期？", a: "有终结器的对象在第一次回收时只被移到终结队列，等终结器跑完才能在下一轮被真正回收。" },
        target: "能说出分代与 LOH 的回收代价，并按标准模式实现 IDisposable。"
      },
      {
        id: "cs-8-3", title: "反射、Source Generator 与 AOT", min: 15,
        summary: [
          "反射在运行时按名字查类型与成员：灵活但慢（查找、参数装箱、无法内联），还会让裁剪器与 AOT 看不清真实使用。",
          "依赖注入、序列化、ORM 早期都靠反射，代价是启动慢与不可裁剪；现代做法是把这部分移到编译期。",
          "Source Generator（Roslyn）在编译时读语法树并生成 C# 文件：序列化契约、映射代码、参数检查都能生成出来，运行时零反射。",
          "System.Text.Json 的 source-generated context、Minimal API、Mapperly 都是这个思路：编译期换运行时。",
          "Trimming 与 Native AOT 要求「静态可分析」：动态 Assembly.LoadFrom、按字符串反射会破坏它，需要 DynamicDependency 等显式保留声明。",
          "AOT 的收益是启动快、体积小、内存低；代价是没有运行时 JIT 的峰值优化，热点循环可能略慢于 JIT。"
        ],
        code: "[JsonSerializable(typeof(User))]                      // source generator emits\ninternal partial class UserContext : JsonSerializerContext { }   // the (de)serialize code\n\nvar u = JsonSerializer.Deserialize<User>(json, UserContext.Default.User); // no runtime reflection",
        pit: "在需要裁剪或 AOT 的项目里用 Assembly.GetType(\"X\") 按字符串反射，编译期不报错，运行时才炸——这类调用必须显式保留类型。",
        ex: { q: "Source Generator 与反射各自解决什么？", a: "反射解决运行时未知类型，代价是慢与不可静态分析；生成器把已知模式在编译期展开成直写代码，两者常互为替代。" },
        target: "能判断一处反射能否换成编译期生成，并说清它对裁剪与 AOT 的影响。"
      },
      {
        id: "cs-8-4", title: "async 状态机与 Task", min: 17,
        summary: [
          "async 方法被编译成状态机：每个 await 是一个切分点，方法同步跑到第一个未完成处即返回 Task。",
          "await 挂起时不占线程：续体（continuation）被登记，IO 完成后由线程池线程恢复执行。",
          "Task 是「未来结果的句柄」，不等于线程：CPU 密集任务才需要 Task.Run 把它丢到线程池。",
          "在库代码里用 ConfigureAwait(false) 避免把续体调度回原同步上下文；ASP.NET Core 与控制台没有传统同步上下文，但 WinForms/WPF 有，忘记它会造成死锁。",
          "sync-over-async（.Result / .Wait()）会占住线程等续体，线程池可能耗尽并死锁；异步要从入口一路贯到出口（\"brown function\"）。",
          "ValueTask 用于「大多同步完成」的高频场景以减少分配，但只能 await 一次，重复 await 或并发 await 是错误用法。"
        ],
        code: "public async Task<int> CountAsync(HttpClient http)\n{\n    using var resp = await http.GetAsync(url).ConfigureAwait(false);\n    var body = await resp.Content.ReadAsStringAsync().ConfigureAwait(false);\n    return body.Length;               // no thread blocked while awaiting\n}\n\n// CPU-bound work: offload explicitly\nvar n = await Task.Run(() => HeavyCompute(input));",
        pit: "在 UI 或老 ASP.NET 里对未完成的 Task 调 .Result：续体要回到被阻塞的同步上下文，两边互等成死锁。",
        ex: { q: "await 期间线程在做什么？", a: "IO 等待期间没有任何线程为该操作驻留；续体在 IO 完成后由线程池（或同步上下文）挑一个线程继续跑。" },
        target: "能画出 async 方法的切分点与续体流转，并解释 Task.Run 与 ConfigureAwait 各自的适用场景。"
      }
    ],
    quiz: [
      { q: "把 struct 赋给 object 会发生什么？", o: ["只是复制引用", "装箱：在堆上分配并拷贝值", "编译失败", "自动转成 class"], a: 1, why: "值类型进 object 接口必须装箱，产生一次堆分配。" },
      { q: "为什么 List<int> 比 ArrayList 快？", o: ["容量更大", "泛型按类型生成专用代码，元素内联存储不装箱", "有缓存", "线程安全"], a: 1, why: "ArrayList 每个 int 都要装箱，既分配又比较慢。" },
      { q: "大对象（≥85KB）会被放到哪里？", o: ["Gen0", "Gen2 之外的 LOH", "栈上", "固定区"], a: 1, why: "大对象堆（LOH）默认不进常规分代回收流程。" },
      { q: "释放非托管资源的正确入口是什么？", o: ["Finalizer", "IDisposable.Dispose + using", "GC.Collect()", "构造函数"], a: 1, why: "终结器时机不可控且延长生命周期，Dispose 才提供确定性释放。" },
      { q: "Source Generator 相对反射的主要优势是什么？", o: ["运行时更灵活", "编译期生成代码，无运行时开销且可裁剪/AOT", "代码更少", "支持更多类型"], a: 1, why: "把已知模式在编译期展开，既省运行时成本也让静态分析看得见。" },
      { q: "async 方法遇到未完成的 await 时会阻塞当前线程。", o: ["正确", "错误"], a: 1, why: "方法在此切分并返回 Task，续体稍后由线程池或同步上下文恢复。" },
      { q: "CPU 密集计算应该用 Task.Run 移到线程池。", o: ["正确", "错误"], a: 0, why: "async/await 本身不产生并行；纯计算需要显式让出到线程池。" },
      { q: "ValueTask 可以被多次 await。", o: ["正确", "错误"], a: 1, why: "ValueTask 只允许 await（或 AsTask 之一）一次，重复使用是错误用法。" },
      { q: "在 WinForms 里对未完成 Task 调 .Result 可能怎样？", o: ["抛 NullReference", "死锁", "自动异步", "无影响"], a: 1, why: "续体要回到被阻塞的 UI 同步上下文，形成互等。" }
    ]
  });

  C.phases.push({
    icon: "🧠", name: "第四篇 · 底层机制", range: [IDX, IDX],
    desc: "值类型与装箱、GC 分代、编译期生成与 async", wk: 2
  });

  /* ---------- 英文侧表 ---------- */
  var I = window.I18N;
  I.stages["cs-s8"] = { n: "Under the Hood", d: "Value types and boxing, generational GC, code generation and async" };
  I.stage_en["cs-s8"] = {
    goal: "Explain C# performance and behaviour from four angles: memory layout, the GC, compile-time code generation and the thread pool.",
    links: [[".NET GC docs", "https://learn.microsoft.com/dotnet/standard/garbage-collection/"], ["C# spec", "https://learn.microsoft.com/dotnet/csharp/language-reference/"]],
    lab: {
      t: "Measure One Boxing Run and One Zero-Allocation Run",
      req: ["Box an int into an object a million times in a loop and time it with Stopwatch",
        "Switch to a generic List<int> and measure again, comparing the elapsed time",
        "Rewrite a temporary large array using ArrayPool<int>.Shared and print the order of Rent and Return"],
      hint: "Replacing the boxing loop with List<int>.Add should cost almost nothing extra; ArrayPool's Rent may hand back a longer array than you asked for, so never assume the length."
    }
  };
  I.lessons["cs-8-1"] = "Value Types, Boxing and Generics";
  I.lessons["cs-8-2"] = "Generational GC and Resource Release";
  I.lessons["cs-8-3"] = "Reflection, Source Generators and AOT";
  I.lessons["cs-8-4"] = "The async State Machine and Task";

  I.lesson_en["cs-8-1"] = {
    summary: [
      "Value types (struct, enum, numeric types) live inline in their container: on the stack for locals, embedded in the owning object as a field.",
      "Reference types always live on the heap and the variable holds a reference; assignment copies the reference, not the object.",
      "Boxing wraps a value into a heap object and unboxing copies it back: on a hot path every box is an allocation plus GC bookkeeping.",
      "Generics are compiled per type argument, so value arguments are never boxed — the root reason List<int> beats ArrayList.",
      "ref struct types (Span<T>, ReadOnlySpan<T>) may only live on the stack: no boxing, no heap fields, no crossing await — that is what makes zero-allocation code possible.",
      "struct means value semantics: bitwise copy by default, no null, and default equality can fall back to slow reflection-based comparison unless you implement IEquatable<T>."
    ],
    pit: "A struct with properties but no IEquatable<T> gets reflective field-by-field Equals, and comparing boxed values makes it worse.",
    ex: { q: "Why do generics avoid boxing?", a: "The compiler emits specialised code per type argument, so values are stored inline instead of wrapped as object." },
    target: "Tell whether a piece of code will box, and explain the limits and purpose of ref struct.",
    deep: ["Pinning (GCHandle / fixed) is needed when handing buffers to native code.", "out parameters and in modifiers exist to avoid copying large structs.", "Nullable<T> is a struct, and its HasValue check is cheaper than a reference null check on the heap."],
    recap: "Value types are inline storage; boxing pays an allocation; generics and ref struct keep that cost away."
  };
  I.lesson_en["cs-8-2"] = {
    summary: [
      "The desktop/server GC uses three generations: new objects start in Gen0, surviving a collection promotes them, and Gen0 collects most often and cheapest.",
      "Large objects (85KB and above by default) go to the LOH, which is not compacted by default, so fragmentation affects later large allocations.",
      "A finaliser keeps an object alive for at least one extra collection and runs at an unpredictable time: it is not the channel for releasing resources — Dispose is.",
      "using / await using are try-finally sugar for deterministic release; the pattern disposes managed members, always releases unmanaged ones, and calls SuppressFinalize.",
      "When allocation pressure hurts, the fix is usually reuse rather than faster collection: ArrayPool, object pools, Span, stackalloc, struct-ifying.",
      "Server GC gives each logical core its own heap and GC thread — higher throughput, more memory; Workstation GC suits clients and small container heaps."
    ],
    pit: "Relying on ~Finalizer instead of Dispose: finaliser order is undefined, dependencies may already be gone, and release timing is out of your control.",
    ex: { q: "Why does a finaliser extend an object's lifetime?", a: "Finalisable objects survive the first collection into the finalisation queue and are only reclaimed on a later pass." },
    target: "State the collection cost of each generation and LOH, and implement IDisposable in the standard shape.",
    deep: ["GC.GetTotalAllocatedBytes and dotnet-counters show allocation, which predicts GC pressure better than live size.", "Pooled arrays may contain stale data — clear what you must not leak.", "SOH and LOH can be configured separately (retained, compacted modes) in runtimeconfig."],
    recap: "Gen0 is cheap and frequent; LOH is about size and fragmentation; Dispose is deterministic, finalisers are not."
  };
  I.lesson_en["cs-8-3"] = {
    summary: [
      "Reflection looks up types and members by name at runtime: flexible but slow (lookup, argument boxing, no inlining) and it hides real usage from the trimmer and AOT.",
      "DI containers, serializers and ORMs historically leaned on reflection, paying startup cost and un-trimmability; the modern answer moves that work to compile time.",
      "Roslyn source generators read the syntax tree during build and emit C# files: serialisation contracts, mappers and argument checks can all be generated with zero runtime reflection.",
      "System.Text.Json source-generated contexts, minimal APIs and Mapperly follow the same idea — trade compile time for runtime cost.",
      "Trimming and Native AOT require statically analysable code: dynamic Assembly.LoadFrom and string-based reflection break them unless you add explicit preservation such as DynamicDependency.",
      "AOT buys fast startup, small footprint and low memory; the price is no runtime JIT, so hot loops can be slightly slower than JIT-compiled code."
    ],
    pit: "String-based reflection in a project that must trim or AOT compiles clean and fails at runtime; such types need explicit preservation attributes.",
    ex: { q: "What does each approach actually solve?", a: "Reflection handles types unknown until runtime, at the cost of speed and static analysis; generators expand known patterns into written-out code at compile time. They are often substitutes for each other." },
    target: "Judge whether a reflection site can become compile-time generation, and explain the trimming and AOT consequences.",
    deep: ["IL2xxx warnings are the trimmer telling you where analysis broke.", "Generators run in the compiler, so they cannot read the filesystem freely without breaking determinism.", "Dynamic code emit sits between the two: still runtime, but faster than pure reflection."],
    recap: "Reflection is flexible but slow and opaque to analysis; source generators move the work to build time, which is what AOT needs."
  };
  I.lesson_en["cs-8-4"] = {
    summary: [
      "An async method compiles into a state machine: every await is a split point, and the method runs synchronously until the first incomplete await, then returns a Task.",
      "Suspending at await occupies no thread: the continuation is registered and, once the I/O completes, a thread-pool thread resumes it.",
      "A Task is a handle to a future result, not a thread; only CPU-bound work needs Task.Run to move onto the pool.",
      "Use ConfigureAwait(false) in library code so the continuation is not marshalled back to a captured sync context; ASP.NET Core and consoles have no classic sync context, but WinForms and WPF do, and forgetting this deadlocks.",
      "Sync-over-async (.Result / .Wait()) holds a thread waiting for a continuation; the pool can exhaust and deadlock. Keep async all the way from entry point to exit.",
      "ValueTask reduces allocation for the common already-complete case, but it may be awaited exactly once — awaiting twice or concurrently is a bug."
    ],
    pit: "Calling .Result on an incomplete task in UI or classic ASP.NET deadlocks: the continuation needs the very context your thread is blocking.",
    ex: { q: "What is the thread doing while awaiting?", a: "Nothing on this operation's behalf: no thread is parked for the I/O; after completion a pool thread (or the sync context) runs the continuation." },
    target: "Draw the split points and continuation flow of an async method, and say when Task.Run and ConfigureAwait each apply.",
    deep: ["Async streams (IAsyncEnumerable) extend the same machinery with await foreach.", "Cancellation must be propagated explicitly via CancellationToken; it is cooperative.", "The state machine is a struct on the async method builder's pool, so hot paths still allocate less than you fear."],
    recap: "await splits the method and frees the thread; Task is a promise not a thread; never block on a task you need to complete."
  };

  /* 同 world-depth-js：phases_en 按篇章下标取，不是章（stage）下标 */
  (I.phases_en.cs = I.phases_en.cs || [])[C.phases.length - 1] = {
    n: "Part 4 · Under the Hood",
    d: "Value types and boxing, generational GC, code generation and async"
  };

  /* 中文侧纵深与回顾（LESSON_EXTRA / extraOf） */
  var X = (window.LESSON_EXTRA = window.LESSON_EXTRA || {});
  X["cs-8-1"] = {
    deep: ["把缓冲交给非托管代码需要固定（GCHandle / fixed），否则 GC 搬动对象会让指针失效。", "in / out 参数的存在就是为了避免复制大 struct。", "Nullable<T> 也是 struct，HasValue 判断比堆上引用判空更省。"],
    recap: "值类型内联存储；装箱要付一次分配；泛型与 ref struct 就是为了让这笔钱不发生。"
  };
  X["cs-8-2"] = {
    deep: ["用 GC.GetTotalAllocatedBytes 与 dotnet-counters 看分配量，它比存活大小更能预测 GC 压力。", "池化数组可能残留旧数据，敏感内容要自己清。", "SOH 与 LOH 的回收模式可以在 runtimeconfig 里分别配置。"],
    recap: "Gen0 便宜且频繁；LOH 关心大小与碎片；Dispose 是确定的，终结器不是。"
  };
  X["cs-8-3"] = {
    deep: ["IL2xxx 警告就是裁剪器在告诉你静态分析在哪里断了。", "生成器跑在编译器里，随意读文件系统会破坏可重现构建。", "运行时 Emit 介于两者之间：仍是运行时，但比纯反射快。"],
    recap: "反射灵活但慢且不可静态分析；生成器把已知模式挪到编译期，这正是 AOT 需要的。"
  };
  X["cs-8-4"] = {
    deep: ["IAsyncEnumerable 用 await foreach 把同一套机制扩展到流。", "取消是协作式的，必须显式传 CancellationToken。", "状态机是 async 方法构建器池上的 struct，热路径的分配比想象中小。"],
    recap: "await 切分方法并释放线程；Task 是承诺不是线程；永远不要阻塞等你需要它完成的 Task。"
  };
})();
