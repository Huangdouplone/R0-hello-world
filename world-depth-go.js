/* ================================================================
 * R0:hello world · R6 W2 第一批：go 语言「运行机制纵深」新章（go-s8，4 节双语）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 为什么单独成文件：world 的课程数据按语言分成 7 份 lang-data-*.js，
 * 直接改原文件会让「新增章节」和「原有内容」混在一次 diff 里，回滚与核对都难。
 *
 * 三条必须记住的机制（与 AGI 站不同，照搬会踩坑）：
 *   ① 英文**不写在课节对象上**：渲染时按 id 查 I18N.lesson_en / stages / lessons / stage_en / phases_en，
 *      且查表结果优先级高于课节对象的 *_en 字段 —— 只往对象上写英文不会生效；
 *   ② phases[].range 是**按 stage 下标**取区间的，追加一章必须同时追加一个 phase，
 *      否则新章在「大篇章」条里没有归属（renderPhases 只遍历 PHASES）；
 *   ③ 数组必须**原地 push**：langStages()/langPhases() 把数组按引用交出去，重新赋值等于白做。
 * ================================================================ */
(function () {
  var G = window.LANG_DATA && window.LANG_DATA.go;
  if (!G || !G.stages || !window.I18N) return;
  var IDX = G.stages.length;                 /* 新章下标，供 phase.range 使用 */

  G.stages.push({
    id: "go-s8", icon: "🧩", name: "运行机制纵深", lv: "hard",
    desc: "泛型、接口底层、GC 与调度器",
    goal: "能说清 Go 的泛型约束、接口值结构、逃逸分析与 GMP 调度。",
    links: [["Go memory model", "https://go.dev/ref/mem"], ["Go runtime docs", "https://pkg.go.dev/runtime"]],
    lab: {
      t: "读一次逃逸分析与调度器转储",
      req: ["用 -gcflags=\"-m\" 编译一个返回局部变量指针的函数", "用 ReadMemStats 打印 Mallocs", "设置 GOMAXPROCS 并打印实际并发跑完一批任务的时间"],
      starter: "package main\n\nimport (\n\t\"fmt\"\n\t\"runtime\"\n)\n\nfunc leak() *int { x := 42; return &x }\n\nfunc main() {\n\t_ = leak()\n\tvar m runtime.MemStats\n\truntime.ReadMemStats(&m)\n\tfmt.Println(\"mallocs:\", m.Mallocs, \"GOMAXPROCS:\", runtime.GOMAXPROCS(0))\n}",
      hint: "编译加 -gcflags=\"-m\" 会打印哪一行 moved to heap；MemStats 的 Mallocs 是累计分配次数，不是字节。",
      xp: 26
    },
    lessons: [
      {
        id: "go-8-1", title: "泛型与类型参数", min: 14,
        summary: [
          "Go 1.18 起支持泛型：用类型参数写一份逻辑服务多种类型，如 func Map[T, U any](s []T, f func(T) U) []U。",
          "约束写在类型参数表里：[T any] 最宽，[T constraints.Ordered] 要求可比较大小，[T comparable] 要求可作 map 键。",
          "调用处通常不必显式写类型参数（类型推断），只有推断不出来或要固定类型时才写 Sum[int](xs)。",
          "泛型不是接口的替代品：要「不同行为」用接口，要「同一逻辑作用于不同类型」才用泛型。",
          "底层是类型字典（dict）+ 单一实例化：不会为每个类型生成一份代码，代价是访问类型信息要经一次间接。",
          "联合类型约束可以用 ~：~int | ~int64 表示「底层类型是 int 或 int64」的所有命名类型。"
        ],
        code: "type Number interface{ ~int | ~int64 | ~float64 }\n\nfunc Sum[T Number](xs []T) T {\n\tvar total T\n\tfor _, x := range xs {\n\t\ttotal += x\n\t}\n\treturn total\n}\n\n// Sum([]int{1, 2, 3}) -> 6",
        pit: "约束写成 any 等于放弃约束：函数体内不能对 T 做 + 或 > ，只能赋值和传参；要运算就必须给出更窄的约束。",
        ex: { q: "~int 里的波浪号是什么意思？", a: "匹配所有底层类型为 int 的类型，不只是 int 本身；没有 ~ 就只匹配 int 这一个类型。" },
        target: "能写一个带约束的泛型函数，并说清它和接口的分工。"
      },
      {
        id: "go-8-2", title: "接口底层：itab 与方法集", min: 16,
        summary: [
          "非空接口值是一个二元组：(具体类型指针, 数据指针)，类型部分指向一张 itab。",
          "itab 按「接口 + 具体类型」组合全局缓存，第一次赋值时生成方法地址表，之后复用。",
          "方法集规则：T 的方法集只含值接收者方法，*T 的方法集含值与指针接收者方法。",
          "因此指针接收者实现接口时，值类型往往不满足该接口，编译期就会报错。",
          "空接口 any 不需要 itab，装箱更轻，但取回具体值必须类型断言或 type switch。",
          "接口是隐式实现的：没有 implements 声明，「实现了什么」要靠文档、测试和窄接口设计约束。"
        ],
        code: "type Stringer interface{ String() string }\n\ntype User struct{ Name string }\n\nfunc (u User) String() string { return \"User:\" + u.Name }\n\nvar s Stringer = User{\"Ann\"}   // value receiver: both User and *User satisfy Stringer\nfmt.Println(s)",
        pit: "把值为 nil 的指针装进接口，接口本身并不等于 nil：判空要判具体类型，或者一开始就别装 nil 指针。",
        ex: { q: "接口调用为什么比直接调用慢一点？", a: "要经 itab 里的方法地址做一次间接跳转，且通常无法内联；但表是缓存的，不是每次动态查找类型。" },
        target: "能画出接口值的二元结构，并解释方法集与 nil 接口两个常见坑。"
      },
      {
        id: "go-8-3", title: "GC 与逃逸分析", min: 16,
        summary: [
          "Go 的 GC 是三色标记 + 写屏障的并发标记清除，STW 只出现在标记开始与结束的两个短阶段。",
          "逃逸分析在编译期决定变量放栈还是放堆：go build -gcflags=\"-m\" 会逐行打印 moved to heap。",
          "常见逃逸原因：返回局部变量指针、装进 interface{}/any、被逃逸的闭包捕获、slice 扩容后超出栈空间。",
          "栈分配近乎零成本（移动栈指针），堆分配要 GC 记账：热路径上每次 new 都在给 GC 加活。",
          "GOGC 默认 100 表示堆翻倍时触发；GOMEMLIMIT 是软上限。调低 GOGC 是用 CPU 换内存。",
          "观测用 runtime.ReadMemStats 与 pprof 的 alloc / heap profile；先看分配次数再看字节数，高频小对象往往更伤。"
        ],
        code: "func newPoint() *int {\n\tx := 42\n\treturn &x            // escapes to heap\n}\n\n// go build -gcflags=\"-m\" ./...\nvar m runtime.MemStats\nruntime.ReadMemStats(&m)\nfmt.Println(m.Mallocs, m.TotalAlloc, m.NumGC)",
        pit: "为了「不让它逃逸」把返回指针改成返回大结构体，结果拷了更多内存。逃逸不是唯一成本，要用 benchmark 和 profile 判定。",
        ex: { q: "GOGC=50 会发生什么？", a: "堆增长到上次活堆的 1.5 倍就触发 GC：内存峰值更低，但 GC 占用的 CPU 更多。" },
        target: "能读逃逸分析输出，说清 GOGC 与 GOMEMLIMIT 的取舍，并用 pprof 找到分配热点。"
      },
      {
        id: "go-8-4", title: "调度器：G、M、P 与抢占", min: 15,
        summary: [
          "G 是 goroutine（自带可增长栈），M 是操作系统线程，P 是持有本地可运行队列的逻辑处理器；GOMAXPROCS 决定 P 的个数。",
          "goroutine 阻塞在系统调用时，运行时会把 M 与 P 解绑并把 P 交给别的 M，所以一个线程卡住不等于一个核闲置。",
          "P 的本地队列空了会先取全局队列，再随机去别的 P 队尾偷一半（work stealing），负载因此自动拉平。",
          "sysmon 是后台监控线程：发现某个 G 连续运行超过约 10ms 就发信号做异步抢占，Go 1.14 起对纯计算循环也有效。",
          "goroutine 初始栈只有几 KB，可增长也可搬移，代价是函数序言要检查栈空间——这是「开十万个也没事」的原因。",
          "channel 与 mutex 等待会把 G 挂到 sudog 上并让出 P，所以并发度看的是 P 数与阻塞结构，不是线程数。"
        ],
        code: "runtime.GOMAXPROCS(4)  // number of P; defaults to NumCPU\n\nfor i := 0; i < 100000; i++ {\n\tgo work(i)       // 100k goroutines, not 100k threads\n}\nfmt.Println(runtime.NumGoroutine())",
        pit: "把 GOMAXPROCS 调到大于核数不会让计算更快，只会增加切换；真正拖住调度器的通常是没走 await 的阻塞调用或忙等循环。",
        ex: { q: "为什么一个死循环的 goroutine 不会饿死其他 goroutine？", a: "sysmon 检测到运行超时后向该 M 发信号做异步抢占，把 G 换下；Go 1.14 之前对没有函数调用点的循环确实抢不下来。" },
        target: "能用 GMP 模型解释并发行为，并说清阻塞系统调用、work stealing 与异步抢占各解决什么。"
      }
    ],
    quiz: [
      { q: "Go 泛型的类型约束写在哪里？", o: ["函数参数列表里", "类型参数表里", "返回类型里", "注释里"], a: 1, why: "形如 func F[T any](...)，约束写在方括号的类型参数表中。" },
      { q: "查看变量是否逃逸到堆，用哪条命令？", o: ["go vet ./...", "go build -gcflags=\"-m\" ./...", "go test -race", "go fmt ./..."], a: 1, why: "-gcflags=\"-m\" 会打印编译期的逃逸分析结果。" },
      { q: "GOMAXPROCS 控制的是什么？", o: ["操作系统线程数", "P（逻辑处理器）的个数", "goroutine 数量上限", "GC 触发频率"], a: 1, why: "它设定 P 的数量；M 与 goroutine 数由运行时另行管理。" },
      { q: "接口值只有在类型和值都为 nil 时才等于 nil。", o: ["正确", "错误"], a: 0, why: "装了值为 nil 的指针的接口仍非 nil，这是最常见的判空坑。" },
      { q: "本地队列空了，P 会去别的 P 的队列尾部做什么？", o: ["偷一半任务", "等待新任务", "把线程交给系统", "触发 GC"], a: 0, why: "work stealing 一次取一半，能最快把负载拉平。" },
      { q: "Go 的 comparable 约束允许对类型参数做什么？", o: ["用 < 和 > 比较大小", "用 == 判等，并可用作 map 的键", "反射调用任意方法", "做算术运算"], a: 1, why: "comparable 只保证可判等；大小比较要自己写联合约束（如 ~int | ~float64）。" },
      { q: "把值放进 interface{} 会导致什么？", o: ["必然留在栈上", "很可能逃逸到堆", "编译失败", "自动装箱为指针但无开销"], a: 1, why: "装进空接口需要确定的堆对象，是常见的逃逸原因之一。" },
      { q: "Go 的接口需要显式声明 implements 才能实现。", o: ["正确", "错误"], a: 1, why: "Go 是隐式实现：只要方法集匹配就满足接口，没有 implements 关键字。" },
      { q: "GOMEMLIMIT 的作用是什么？", o: ["硬停止程序", "给运行时一个软内存上限，影响 GC 力度", "限制 goroutine 数", "设置栈初始大小"], a: 1, why: "它是软上限，运行时会更积极地 GC 去逼近这个目标。" }
    ]
  });

  G.phases.push({
    icon: "🧩", name: "第四篇 · 运行机制纵深", range: [IDX, IDX],
    desc: "泛型、接口底层、GC 与调度器", wk: 2
  });

  /* ---------- 英文侧表：渲染时按 id 查表，优先级高于课节对象字段 ---------- */
  var I = window.I18N;
  I.stages["go-s8"] = { n: "Runtime Internals in Depth", d: "Generics, interface internals, GC and the scheduler" };
  I.stage_en["go-s8"] = {
    goal: "Explain Go's generic constraints, the structure of an interface value, escape analysis and GMP scheduling.",
    links: [["Go memory model", "https://go.dev/ref/mem"], ["Go runtime docs", "https://pkg.go.dev/runtime"]],
    lab: {
      t: "Read an Escape-Analysis Report and a Scheduler Dump",
      req: ["Compile a function that returns a pointer to its own local variable with -gcflags=\"-m\"",
        "Print Mallocs through ReadMemStats",
        "Set GOMAXPROCS and print how long a batch of tasks really takes to finish concurrently"],
      hint: "Building with -gcflags=\"-m\" prints which line moved to the heap; Mallocs in MemStats is a cumulative allocation count, not a byte total."
    }
  };
  I.lessons["go-8-1"] = "Generics and Type Parameters";
  I.lessons["go-8-2"] = "Interface Internals: itab and Method Sets";
  I.lessons["go-8-3"] = "Garbage Collection and Escape Analysis";
  I.lessons["go-8-4"] = "The Scheduler: G, M, P and Preemption";

  I.lesson_en["go-8-1"] = {
    summary: [
      "Generics landed in Go 1.18: write one piece of logic for many types, e.g. func Map[T, U any](s []T, f func(T) U) []U.",
      "Constraints live in the type-parameter list: [T any] is widest, [T constraints.Ordered] requires ordering, [T comparable] requires map-key usability.",
      "Call sites usually omit type arguments thanks to inference; write Sum[int](xs) only when inference fails or you must pin the type.",
      "Generics do not replace interfaces: reach for an interface when behaviour differs, for a type parameter when the logic is identical.",
      "Under the hood it is dictionaries plus one instantiation, so no per-type code copies; the price is one indirection when type info is needed.",
      "Union constraints accept ~: ~int | ~int64 matches every named type whose underlying type is int or int64."
    ],
    pit: "Constraining to any gives up the constraint: inside the body you cannot use + or > on T, only assign and pass it along.",
    ex: { q: "What does the tilde in ~int mean?", a: "It matches every type whose underlying type is int, not just the type int itself." },
    target: "Write a constrained generic function and explain how it divides labour with interfaces.",
    deep: ["Type dictionaries are passed implicitly as hidden arguments.", "Generic code cannot use methods that are not in the constraint.", "Over-generic helpers hurt readability; two concrete functions often beat one tangled type parameter list."],
    recap: "Constraints sit in the type-parameter list; use ~ for underlying-type matching; interfaces for behaviour, generics for shared logic."
  };
  I.lesson_en["go-8-2"] = {
    summary: [
      "A non-empty interface value is a pair: (pointer to the concrete type, pointer to the data), with the type slot pointing at an itab.",
      "itab is cached globally per (interface, concrete type) pair: built on first assignment, reused afterwards.",
      "Method-set rule: T's method set holds value-receiver methods only; *T's holds both value and pointer receivers.",
      "So when a method uses a pointer receiver, the value type may not satisfy the interface and the compiler says so.",
      "The empty interface any needs no itab, so boxing is cheaper, but you must type-assert or type-switch to get the value back.",
      "Interfaces are implemented implicitly: no implements keyword, so what a type satisfies is documented by tests and narrow interfaces, not by the compiler."
    ],
    pit: "An interface holding a nil pointer is not nil itself: compare the concrete value, or stop stuffing nil pointers into interfaces.",
    ex: { q: "Why is an interface call slightly slower than a direct call?", a: "It jumps through the method address in the itab and usually cannot be inlined; the table itself is cached, not looked up reflectively each time." },
    target: "Draw the two-word structure of an interface value and explain the method-set and nil-interface traps.",
    deep: ["itab lookups are memoised, so repeated assignment of the same pair is cheap.", "Narrow interfaces (one or two methods) are easier to satisfy and to mock.", "Interface conversion between interfaces also walks the itab."],
    recap: "Interface = type pointer + data pointer; itab caches method addresses; method sets differ between T and *T."
  };
  I.lesson_en["go-8-3"] = {
    summary: [
      "Go's collector is concurrent tri-colour mark and sweep with write barriers; STW happens only in two short phases at mark start and end.",
      "Escape analysis runs at compile time and decides stack versus heap: go build -gcflags=\"-m\" prints each moved to heap line.",
      "Usual escape routes: returning a pointer to a local, storing into interface{}/any, capture by an escaping closure, slice growth past the stack.",
      "Stack allocation is nearly free (move the stack pointer); heap allocation adds GC bookkeeping, so every new in a hot loop feeds the collector.",
      "GOGC defaults to 100, i.e. collect when the heap doubles; GOMEMLIMIT is a soft ceiling. Lowering GOGC trades CPU for memory.",
      "Observe with runtime.ReadMemStats and pprof alloc/heap profiles; look at allocation counts before bytes — many small objects usually hurt more."
    ],
    pit: "Switching a returned pointer to a returned big structure to dodge escaping can copy far more memory. Escape is not the only cost; measure.",
    ex: { q: "What does GOGC=50 change?", a: "GC triggers when the heap grows to 1.5x the live heap: lower peak memory, more CPU spent collecting." },
    target: "Read escape-analysis output, reason about GOGC vs GOMEMLIMIT, and locate allocation hot spots with pprof.",
    deep: ["Stack growth copies the stack and rewrites pointers, which is why pointers to locals are taken carefully.", "sync.Pool exists to cut high-frequency small allocations.", "Finalisers are not guaranteed to run before exit; treat them as a backstop."],
    recap: "Tri-colour concurrent GC; -gcflags=\"-m\" shows escapes; GOGC trades CPU for memory; profile before tuning."
  };
  I.lesson_en["go-8-4"] = {
    summary: [
      "G is a goroutine (with a growable stack), M an OS thread, P a logical processor owning a local run queue; GOMAXPROCS sets how many P exist.",
      "When a goroutine blocks in a syscall the runtime detaches M from P and hands P to another M, so one blocked thread does not idle a core.",
      "An empty local queue first drains the global queue, then steals half of a random peer's queue (work stealing), which levels load automatically.",
      "sysmon is a background monitor thread: after roughly 10ms of continuous execution it signals asynchronous preemption, which since Go 1.14 also works on pure compute loops.",
      "A goroutine starts with a few KB of stack that can grow and move, at the cost of a stack check in the prologue — that is why 100k goroutines are affordable.",
      "Channel and mutex waits park the G on a sudog and release the P, so concurrency is about P count and blocking structure, not thread count."
    ],
    pit: "Raising GOMAXPROCS above the core count adds context switches without speed. What really stalls the scheduler is un-awaited blocking calls and busy loops.",
    ex: { q: "Why does one looping goroutine not starve the others?", a: "sysmon notices the long run and preempts asynchronously by signalling that M; before Go 1.14 loops without call sites could not be preempted." },
    target: "Explain observed concurrency behaviour with the GMP model, including syscall blocking, work stealing and preemption.",
    deep: ["cgo calls pin their M, which can exhaust the thread limit.", "GOMAXPROCS is also the parallelism limit for GC assist work.", "go tool trace visualises G/M/P timelines and shows where goroutines waited."],
    recap: "P count = parallelism; blocking syscalls release the P; idle Ps steal work; sysmon preempts long runs."
  };

  /* 同 world-depth-js：phases_en 按篇章下标取，不是章（stage）下标 */
  (I.phases_en.go = I.phases_en.go || [])[G.phases.length - 1] = {
    n: "Part 4 · Runtime Internals",
    d: "Generics, interface internals, GC and the scheduler"
  };

  /* 中文侧的「纵深 / 回顾」走 LESSON_EXTRA（openLesson 里 x.deep、x.recap）。
     只写进英文侧表会让中文态比英文态少三块内容 —— 双语对称不只是「英文有没有」，
     也包括「中文有没有被落下」。 */
  var X = (window.LESSON_EXTRA = window.LESSON_EXTRA || {});
  X["go-8-1"] = {
    deep: ["类型字典是作为隐藏参数传递的，所以泛型函数签名比看上去更长。", "约束里没有的方法就不能调，编译器不会替你把 T 当具体类型看。", "两个具体函数常常好过一份套了五层类型参数的「万能」实现——泛型不是越少越好也不是越多越好。"],
    recap: "约束写在类型参数表里；~ 匹配底层类型；行为不同用接口，逻辑相同用泛型。"
  };
  X["go-8-2"] = {
    deep: ["itab 按（接口, 具体类型）全局缓存，重复赋值同一种类型不会重建表。", "接口越窄越好用：一两个方法既容易满足，也容易在测试里替换。", "接口之间的转换同样要查表，不是零成本。"],
    recap: "接口值 = 类型指针 + 数据指针；itab 缓存方法地址；T 与 *T 的方法集不同，nil 指针装进接口后接口非 nil。"
  };
  X["go-8-3"] = {
    deep: ["栈增长会拷贝栈并重写指针，所以「取局部变量地址」这件事运行时是认真对待的。", "高频小对象用 sync.Pool 复用，比反复 new 更省 GC 记账。", "Finalizer 不保证在退出前执行，只能当兜底，不能当正确性依赖。"],
    recap: "三色并发标记清除；-gcflags=\"-m\" 看逃逸；GOGC 是 CPU 与内存的交换比；先 profile 再调参。"
  };
  X["go-8-4"] = {
    deep: ["cgo 调用会把 M 钉住，极端情况下会撞上系统线程上限。", "GOMAXPROCS 同时也是 GC assist 的并行度上限。", "go tool trace 能直接看到 G 在等待什么，比猜「是不是并发不够」有效得多。"],
    recap: "P 的个数就是并行度；阻塞系统调用会释放 P；空闲 P 去偷一半任务；sysmon 抢占跑太久的 G。"
  };
})();
