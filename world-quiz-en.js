/* ================================================================
 * R0:hello world · D33：阶段测评英文侧表（三章新课 27 题 + 三语言历史章节 66 题，共 93 题）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 通道本来就存在（不是「缺机制」）：qzQ / qzO / qzWhy 读 I18N.stage_en[阶段id].quiz[原题下标]，
 * 所以这里只补数据、不动渲染器；判断题的选项由 judgeOpts() 按语言生成，不必给 o。
 * 下标必须与中文 quiz 数组逐项对齐 —— 错位会让英文态显示成另一道题，比不译更糟，
 * 所以本文件每条都抄了中文题干作注释，由 world-quiz-en-gate.js 校验覆盖与选项数。
 * ================================================================ */
(function () {
  var I = window.I18N;
  if (!I || !I.stage_en) return;
  function quiz(id, arr) {
    /* 历史章节在 stage_en 里根本没有条目（只有新课是 depth 层建好的），所以要能新建；
       新建的条目只有 quiz，因此 stEn 的每个消费者都必须按字段兜底（stGoal 已补）。 */
    var e = I.stage_en[id] || (I.stage_en[id] = {});
    e.quiz = (e.quiz && e.quiz.length) ? e.quiz : [];
    arr.forEach(function (x, i) { if (!e.quiz[i] || !e.quiz[i].q) e.quiz[i] = x; });   /* 只补缺失，不覆盖已有译文 */
  }

  /* ---------------- go-s8 运行机制纵深 ---------------- */
  quiz("go-s8", [
    { q: "Where does a Go generic type constraint go?", o: ["In the parameter list", "In the type-parameter list", "In the return type", "In a comment"], why: "It reads func F[T any](...), so the constraint lives in the square-bracketed type-parameter list." },
    { q: "Which command shows whether a variable escapes to the heap?", o: ["go vet ./...", "go build -gcflags=\"-m\" ./...", "go test -race", "go fmt ./..."], why: "-gcflags=\"-m\" prints the compiler's escape-analysis decisions." },
    { q: "What does GOMAXPROCS control?", o: ["Operating-system thread count", "The number of Ps (logical processors)", "The goroutine limit", "GC frequency"], why: "It sets how many Ps exist; Ms and goroutines are managed separately by the runtime." },
    { q: "An interface value equals nil only when both its type and its value are nil.", o: ["True", "False"], why: "A nil pointer stored in an interface still yields a non-nil interface — the classic emptiness trap." },
    { q: "When a P's local queue runs empty, what does it do at the tail of another P's queue?", o: ["Steal half of the work", "Wait for new work", "Hand its thread to the OS", "Trigger a GC"], why: "Work stealing takes half of the victim's queue, which levels load fastest." },
    { q: "What does Go's comparable constraint allow a type parameter to do?", o: ["Compare with < and >", "Compare with == and be used as a map key", "Call any method reflectively", "Do arithmetic"], why: "comparable only guarantees equality; ordering needs your own union constraint such as ~int | ~float64." },
    { q: "What usually happens when a value is stored into interface{}?", o: ["It definitely stays on the stack", "It is likely to escape to the heap", "Compilation fails", "It is boxed at no cost"], why: "Boxing needs a heap object, which is one of the most common escape routes." },
    { q: "Go interfaces require an explicit implements declaration.", o: ["True", "False"], why: "Go implements interfaces implicitly: matching method sets are enough, and that is also why you must design narrow interfaces and test them." },
    { q: "What does GOMEMLIMIT do?", o: ["Hard-stops the program", "Gives the runtime a soft memory ceiling that changes how hard GC works", "Caps the goroutine count", "Sets the initial stack size"], why: "It is a target the collector tries to respect by working harder, not a wall that kills the process." }
  ]);

  /* ---------------- js-s9 底层机制 ---------------- */
  quiz("js-s9", [
    { q: "In the same turn, which runs first: Promise.resolve().then or setTimeout(fn, 0)?", o: ["The then callback, because microtasks drain before the next macrotask", "The setTimeout callback", "Whichever was registered last", "They run together"], why: "After the synchronous code finishes, the microtask queue is drained before the next macrotask." },
    { q: "What does awaiting an already-settled promise do?", o: ["Blocks the thread until the next frame", "Moves the continuation to the microtask queue with no delay", "Throws", "Skips to the next macrotask"], why: "Code after await behaves like a .then callback, so it resumes on the microtask queue." },
    { q: "Where do class methods actually live?", o: ["On each instance", "On the constructor's prototype", "In the global scope", "In a private heap"], why: "Instances delegate to Fn.prototype, so there is only one copy of each method." },
    { q: "What is the third step of new F()?", o: ["Create an empty object", "Link it to F.prototype", "Bind this and run the constructor", "Return undefined"], why: "Order: create, link, run the constructor with this bound, then use the returned object if there is one." },
    { q: "Can a Worker touch document directly?", o: ["Yes", "No", "Only in a module worker", "After requesting permission"], why: "A Worker has no window or DOM, only self plus a restricted API set." },
    { q: "A closure captures the value of a variable rather than the binding.", o: ["True", "False"], why: "It captures the binding, so later writes are visible inside the closure." },
    { q: "SharedArrayBuffer can be used on any page without further setup.", o: ["True", "False"], why: "It requires a cross-origin isolated document, i.e. COOP/COEP response headers." },
    { q: "Assigning this.f = () => {} inside a constructor gives every instance its own copy.", o: ["True", "False"], why: "Correct — shared behaviour belongs on the prototype, which is what class does for you." },
    { q: "for...in also enumerates enumerable properties inherited through the prototype chain.", o: ["True", "False"], why: "Use for...of over Object.keys, or add a hasOwnProperty check, to iterate own properties only." }
  ]);

  /* ---------------- 第二批：三语言历史章节（js-s1 ~ js-s8） ---------------- */
  quiz("js-s1", [
    { q: "Which keyword should declare a variable you never reassign?", o: ["var", "let", "const", "function"], why: "const declares a binding that cannot be rebound, which rules out accidental reassignment." },
    { q: "Which operator is strict equality?", o: ["=", "==", "===", "!=="], why: "=== compares value and type together, avoiding implicit coercion traps." },
    { q: "Which quoting form delimits a template string?", o: ["Single quotes", "Double quotes", "Backticks", "Parentheses"], why: "Backticks enable ${} interpolation and multi-line literals." }
  ]);
  quiz("js-s2", [
    { q: "Which loop is the recommended way to walk over array elements?", o: ["for...in", "for...of", "for(;;)", "while"], why: "for...of iterates the values directly, which is both safer and shorter." },
    { q: "What characterises an arrow function?", o: ["It has its own this", "It has no this of its own", "It cannot take parameters", "It must be named"], why: "It inherits this from the enclosing scope, which is why it suits callbacks." },
    { q: "Which keyword exits the loop you are currently in?", o: ["return", "break", "continue", "exit"], why: "break ends the loop at once; continue only skips this iteration." }
  ]);
  quiz("js-s3", [
    { q: "Which array method returns a version with every element doubled?", o: ["forEach", "map", "filter", "reduce"], why: "map builds a new array from each transformed element." },
    { q: "What does const {name} = user read out?", o: ["user.name", "user[0]", "user.name()", "new user"], why: "Destructuring extracts the property of the same name." },
    { q: "Which call turns an object into a JSON string?", o: ["JSON.parse", "JSON.stringify", "toString", "stringify"], why: "JSON.stringify serialises; JSON.parse goes the other way." }
  ]);
  quiz("js-s4", [
    { q: "How do you select the element whose id is title?", o: ["getElementById", "querySelectorAll", "querySelector('#title')", "Both the first and the third work"], why: "Either call can resolve an element by id." },
    { q: "Which call cancels a form's default submission?", o: ["stop()", "preventDefault()", "return false is enough", "cancel()"], why: "e.preventDefault() cancels the browser's default action." },
    { q: "Which API runs a task repeatedly on a fixed interval?", o: ["setTimeout", "setInterval", "repeat", "loop"], why: "setInterval fires on every interval; setTimeout fires once." }
  ]);
  quiz("js-s5", [
    { q: "Which of these is NOT a Promise state?", o: ["pending", "fulfilled", "rejected", "running"], why: "A Promise only has pending, fulfilled and rejected." },
    { q: "Inside which kind of function may await appear?", o: ["An ordinary function", "An async function", "Any arrow function", "A constructor"], why: "await is only legal inside an async function." },
    { q: "What does fetch do when the server answers 404?", o: ["It jumps into catch", "It resolves, but res.ok is false", "It rejects", "It throws synchronously"], why: "HTTP error statuses do not reject the promise, so check res.ok yourself." }
  ]);
  quiz("js-s6", [
    { q: "What must a subclass constructor call before touching this?", o: ["this()", "super()", "parent()", "init()"], why: "super() runs the base constructor; only afterwards is this usable." },
    { q: "Which syntax declares a module's default export?", o: ["export", "export default", "module.exports", "exports"], why: "export default provides the single default binding of a module." },
    { q: "What is a class fundamentally in JavaScript?", o: ["A brand-new type system", "Syntax sugar over prototype inheritance", "An interface", "A struct"], why: "Under the surface it is still the prototype chain." }
  ]);
  quiz("js-s7", [
    { q: "What is needed to store an object in localStorage?", o: ["Store it as is", "JSON.stringify it first", "toString", "String()"], why: "localStorage only holds strings, so objects must be serialised." },
    { q: "Which API should drive an animation?", o: ["setInterval", "setTimeout", "requestAnimationFrame", "a while loop"], why: "requestAnimationFrame follows the display refresh rate, so it stays smooth." },
    { q: "When POSTing JSON, what must the request body be?", o: ["The object itself", "A string produced by JSON.stringify", "FormData", "URLSearchParams"], why: "The body has to be a string, so serialise the object first." }
  ]);
  quiz("js-s8", [
    { q: "Should node_modules be committed to the repository?", o: ["Yes", "No", "Yes for small projects", "It depends"], why: "It can be reinstalled from package.json and is enormous." },
    { q: "What is the advantage of a declarative UI?", o: ["It is always faster", "State drives the view, so you stop manipulating the DOM by hand", "It needs less CSS", "It works in every browser"], why: "You describe what the state looks like and the framework patches the DOM." },
    { q: "Which optimisation belongs on a search-as-you-type input?", o: ["Throttling", "Debouncing", "Caching", "Compression"], why: "Debouncing waits until typing stops, which removes most of the requests." }
  ]);

  /* ---------------- 第二批：三语言历史章节（cs-s1 ~ cs-s7） ---------------- */
  quiz("cs-s1", [
    { q: "On which platform does C# run?", o: ["The JVM", ".NET", "V8", "CPython"], why: "C# compiles to IL and executes on the .NET runtime." },
    { q: "Which command creates a console project?", o: ["dotnet create", "dotnet new console", "dotnet init", "new c#"], why: "dotnet new console instantiates the console template." },
    { q: "Which prefix turns on string interpolation?", o: ["@", "$", "#", "&"], why: "The $ prefix lets expressions appear inside the literal." }
  ]);
  quiz("cs-s2", [
    { q: "Which loop is recommended for walking an array?", o: ["for", "foreach", "while", "do-while"], why: "foreach is the concise, safe default for read-only traversal." },
    { q: "What does a ref parameter require of the caller?", o: ["The argument must be null", "It must already be assigned before being passed", "It cannot be modified", "It must be a reference type"], why: "A ref argument has to be definitely assigned before the call." },
    { q: "Which token introduces an expression-bodied member?", o: ["->", "=>", "::", "??"], why: "=> defines expression-bodied methods and properties." }
  ]);
  quiz("cs-s3", [
    { q: "Which method adds an element to a List<int>?", o: ["push", "Add", "insert", "append"], why: "List<T>.Add appends at the end." },
    { q: "Which call reads a dictionary without risking an exception?", o: ["dict[key]", "dict.Get", "TryGetValue", "dict.Find"], why: "TryGetValue reports a miss through its return value instead of throwing." },
    { q: "Which LINQ operator filters a sequence?", o: ["Select", "Where", "Filter", "Map"], why: "Where keeps the elements matching the predicate." }
  ]);
  quiz("cs-s4", [
    { q: "Which token declares inheritance in C#?", o: ["extends", ":", "implements", "->"], why: "C# uses a colon before the base type and interface list." },
    { q: "Which keyword replaces a base class method?", o: ["new", "override", "virtual", "overwrite"], why: "override replaces a virtual or abstract member; virtual marks it as overridable." },
    { q: "What does a member of a traditional interface declare?", o: ["A body", "Only a signature", "It must be static", "No parameters"], why: "Interfaces describe a contract; the implementation comes from the type." }
  ]);
  quiz("cs-s5", [
    { q: "What does an async method normally return?", o: ["void", "Task or Task<T>", "int", "async"], why: "async methods hand back a Task; async void is reserved for event handlers." },
    { q: "Which call waits for several tasks to finish without blocking a thread?", o: ["WaitAll", "Task.WhenAll", "WhenAll", "Task.WaitAll"], why: "await Task.WhenAll awaits them concurrently and returns one awaitable." },
    { q: "What is a using block for?", o: ["Importing a namespace", "Releasing a resource automatically", "Declaring a variable", "A compiler directive"], why: "It disposes an IDisposable deterministically, even on the exception path." }
  ]);
  quiz("cs-s6", [
    { q: "Which API writes a small text file most conveniently?", o: ["File.WriteAllText", "StreamWriter", "FileStream", "WriteFile"], why: "File.WriteAllText is the shortest path when the whole content fits in memory." },
    { q: "Which call deserialises JSON into a typed object?", o: ["Deserialize", "Deserialize<T>", "Parse", "FromJson"], why: "JsonSerializer.Deserialize<T>(json) is the generic form." },
    { q: "Which type represents an elapsed duration?", o: ["DateTime", "TimeSpan", "Date", "Interval"], why: "TimeSpan is an interval; DateTime marks a point in time." }
  ]);
  quiz("cs-s7", [
    { q: "What is a record compared by?", o: ["Reference equality", "Value equality", "It is never equal", "A compile error"], why: "records generate value equality for their members automatically." },
    { q: "Which pattern is the fallback arm of a switch expression?", o: ["default:", "_", "else", "*"], why: "The discard pattern _ catches everything left over." },
    { q: "What does string? declare?", o: ["It must be null", "It may be null", "A nullable value type", "An array"], why: "The ? annotates that this reference may hold null." }
  ]);

  /* ---------------- 第二批：三语言历史章节（go-s1 ~ go-s7） ---------------- */
  quiz("go-s1", [
    { q: "Which company developed Go?", o: ["Microsoft", "Google", "Amazon", "Meta"], why: "Go was designed at Google, starting in 2007." },
    { q: "Which command initialises a module?", o: ["go init", "go mod init", "go new", "go create"], why: "go mod init with the module path creates go.mod." },
    { q: "Which token is the short variable declaration?", o: ["=", "==", ":=", "->"], why: ":= declares and initialises in a single statement." }
  ]);
  quiz("go-s2", [
    { q: "How do you write a while loop in Go?", o: ["while condition", "for condition", "loop condition", "until"], why: "Go has only for, and for with a single condition is the while form." },
    { q: "How many values can a Go function return?", o: ["Exactly one", "At most two", "Any number of results", "None"], why: "Multiple results are standard, conventionally paired as (result, error)." },
    { q: "When does a deferred call actually run?", o: ["Immediately", "As the enclosing function is returning", "At compile time", "At a random moment"], why: "defer registers the call for the function's exit path, in reverse order." }
  ]);
  quiz("go-s3", [
    { q: "Which built-in adds an element to a slice?", o: ["push", "append", "add", "insert"], why: "append returns the extended slice, so the result must be reassigned." },
    { q: "What happens when you write into a map that was never made?", o: ["It initialises itself", "It panics", "It returns an error", "The write is dropped"], why: "A nil map accepts reads but writing to it panics, so make it first." },
    { q: "What does an uppercase first letter on a struct field mean?", o: ["Private", "Exported, therefore visible outside the package", "A constant", "Static"], why: "Visibility is decided by the first letter alone; there is no public keyword." }
  ]);
  quiz("go-s4", [
    { q: "Does satisfying a Go interface need an implements keyword?", o: ["Yes", "No", "Optionally", "Only for abstract types"], why: "Interfaces are satisfied implicitly as soon as the method set matches." },
    { q: "How do you perform a type assertion safely?", o: ["x.(T)", "v, ok := x.(T)", "x.type(T)", "typeof x"], why: "The comma-ok form reports failure instead of panicking." },
    { q: "Which method does io.Reader consist of?", o: ["Read", "ReadLine", "Get", "Fetch"], why: "Read(p []byte) is the entire interface, which is why it composes so well." }
  ]);
  quiz("go-s5", [
    { q: "Which keyword starts a goroutine?", o: ["thread f()", "go f()", "async f()", "goroutine f()"], why: "The go keyword schedules the call onto the runtime." },
    { q: "Which syntax sends a value on a channel?", o: ["ch.send(v)", "ch <- v", "<- ch", "ch(v)"], why: "The arrow points into the channel; <- ch receives." },
    { q: "What do you use to wait for a group of goroutines?", o: ["thread.Join", "sync.WaitGroup", "channel.wait", "time.Sleep"], why: "Wait blocks until every Add'd counter has been Done'd back to zero." }
  ]);
  quiz("go-s6", [
    { q: "Which call starts an HTTP server?", o: ["http.Start", "http.ListenAndServe", "http.Serve", "http.Run"], why: "http.ListenAndServe takes the address and the handler." },
    { q: "Which syntax carries a JSON field name on a struct field?", o: ["// json", "# json", "`json:\"...\"`", "/* json */"], why: "A backquoted tag between the field name and its type sets the JSON key." },
    { q: "What must you always do with an HTTP response body?", o: ["Read it to the end", "Close it", "Flush it", "Copy it"], why: "deferring resp.Body.Close() releases the connection for reuse." }
  ]);
  quiz("go-s7", [
    { q: "What suffix does a Go test file use?", o: ["_test.go", ".test.go", "test.go", "_spec.go"], why: "Files named xxx_test.go are compiled only during go test." },
    { q: "Which command runs the tests of a package?", o: ["go run test", "go test", "go check", "go verify"], why: "go test discovers and runs the TestXxx functions." },
    { q: "What is an internal/ package?", o: ["Public", "Private: importable only inside its parent tree", "Reserved for tests", "Reserved for docs"], why: "The toolchain enforces the boundary, so internal really is private." }
  ]);

  /* ---------------- cs-s8 底层机制 ---------------- */
  quiz("cs-s8", [
    { q: "What happens when a struct is assigned to an object?", o: ["Only the reference is copied", "Boxing: a heap allocation plus a copy", "It fails to compile", "It becomes a class automatically"], why: "Putting a value type into object must box it, which allocates on the heap." },
    { q: "Why is List<int> faster than ArrayList?", o: ["Bigger capacity", "Generics specialise per type argument, so elements are stored inline without boxing", "It has a cache", "It is thread-safe"], why: "ArrayList boxes every int, paying both an allocation and a slower comparison." },
    { q: "Where do large objects (85KB and above) go?", o: ["Gen0", "The LOH, outside the normal generations", "The stack", "A pinned region"], why: "The Large Object Heap is collected on its own schedule and is not compacted by default." },
    { q: "What is the correct entry point for releasing unmanaged resources?", o: ["A finaliser", "IDisposable.Dispose together with using", "GC.Collect()", "The constructor"], why: "Finalisers run at an unpredictable time; Dispose is what gives deterministic release." },
    { q: "What is the main advantage of a source generator over reflection?", o: ["More runtime flexibility", "Code is generated at compile time: no runtime cost, and trimming/AOT still work", "Less code to write", "Supports more types"], why: "Expanding known patterns at build time removes both the runtime cost and the opacity to static analysis." },
    { q: "An async method blocks the current thread when it hits an incomplete await.", o: ["True", "False"], why: "It does not: the method returns at that split point and the continuation runs later." },
    { q: "CPU-bound computation should be moved to the thread pool with Task.Run.", o: ["True", "False"], why: "async/await alone creates no parallelism; pure computation has to be offloaded explicitly." },
    { q: "A ValueTask may be awaited more than once.", o: ["True", "False"], why: "ValueTask may be consumed exactly once (or turned into a Task once); awaiting twice is a bug." },
    { q: "In WinForms, what can happen when you call .Result on an incomplete task?", o: ["A NullReferenceException", "A deadlock", "It silently becomes async", "Nothing"], why: "The continuation needs the UI sync context that your thread is currently blocking." }
  ]);
})();
