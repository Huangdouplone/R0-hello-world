/* ============================================================
 * 课程深化补充数据：Go
 * 挂载：window.LESSON_EXTRA[课程id] = {out, deep:[...], recap}
 * ============================================================ */
window.LESSON_EXTRA = window.LESSON_EXTRA || {};
Object.assign(window.LESSON_EXTRA, {
"go-1-1":{out:"Hello, Go!",deep:["Go 由 Google 的 Rob Pike、Ken Thompson、Robert Griesemer 于 2007 年设计，2009 开源。","设计目标：编译快、并发原生、部署简单——对抗 C++ 的复杂性和 Python 的性能。","只有 25 个关键字——比 Python(35) 少、比 C(32) 少，极简主义。"],recap:"Go = 简洁 + 原生并发 + 快速编译；云原生时代的语言。"},
"go-1-2":{out:"26\nHello Go",deep:[":= 短变量声明只能在函数内部使用；包级变量用 var。","Go 是静态强类型——类型不匹配编译错误。","零值：int=0, string=\"\", bool=false, nil——没有未初始化变量。"],recap:":= 声明局部变量；零值自动初始化。"},
"go-1-3":{out:"10\nHello",deep:["Go 没有 while/do-while——for 是唯一循环关键字。","for 三要素：初始化;条件;后置——都可省略变成 for {} 无限循环。","range 遍历数组/slice/map/channel——返回索引和值。"],recap:"for 是万能循环；range 遍历集合。"},
"go-1-4":{out:"及格",deep:["switch 不需要 break——Go 默认不穿透；fallthrough 显式穿透。","switch 可以没有表达式——相当于 if/else if 链。","类型 switch：switch v.(type) 对接口做类型分支。"],recap:"switch 自动 break；fallthrough 显式穿透；类型 switch。"},
"go-2-1":{out:"3",deep:["Go 函数可以返回多个值：func div(a,b int) (int, error)。","命名返回值：func f() (result int) { result = 42; return }。","defer 在函数返回前执行——LIFO 顺序执行多个 defer。"],recap:"多返回值；defer 延迟执行；错误作为返回值。"},
"go-2-2":{out:"1 2 3",deep:["闭包捕获变量引用——不是值拷贝；循环变量闭包是经典坑。","go func() 启动 goroutine——轻量级线程，初始栈仅 2KB。","goroutine 由 Go 运行时调度，不是 OS 线程——几万 goroutine 很正常。"],recap:"闭包 + goroutine 是 Go 并发的基础；注意闭包引用变量。"},
"go-2-3":{out:"3 4",deep:["数组是值类型——赋值和传参会复制整个数组。","slice 是动态数组——底层是指向数组的指针 + 长度 + 容量。","slice 截取 s[low:high:max] 第三个参数限制容量，防止扩容时影响原数组。"],recap:"数组定长值类型；slice 变长引用类型；注意扩容。"},
"go-2-4":{out:"map[age:25 name:Tom]",deep:["map 是引用类型——make 后才能用；nil map 只读不写。","map 遍历顺序随机——Go 故意打乱防止代码依赖顺序。","comma-ok 模式：v, ok := m[key] 检查键是否存在。"],recap:"map 键值对；comma-ok 检查存在；遍历无序。"},
"go-3-1":{out:"{Tom 25}",deep:["struct 是值类型——字段连续内存，无虚表指针。","匿名字段（嵌入）：type User struct { Person }——提升字段。","结构体比较：字段都是可比较类型时，== 可以直接比较。"],recap:"struct = 自定义数据类型；嵌入实现组合而非继承。"},
"go-3-2":{out:"汪汪汪",deep:["接口是隐式实现——只要方法集匹配就实现了接口，不需要 implements 关键字。","io.Reader/Writer 是 Go 最经典的接口——一切流都实现它。","空接口 interface{} 表示任意类型——Go 1.18+ 用 any 别名。"],recap:"接口隐式实现；小接口原则；io.Reader/Writer 是核心。"},
"go-3-3":{out:"200 OK",deep:["错误是值——error 接口，nil 表示无错误。","errors.Is/As 检查包装错误链——fmt.Errorf + %w 包装。","panic/recover 用于真正的异常——正常错误用 error 返回值。"],recap:"错误作为值返回；%w 包装；panic/recover 只用于异常。"},
"go-3-4":{out:"（结构体方法）",deep:["方法 = 带接收者的函数——值接收者和指针接收者语义不同。","指针接收者：修改接收者或避免拷贝；值接收者：小 struct 且只读。","同一个类型的方法必须在同一个包——不能给别的包类型加方法。"],recap:"方法接收者：指针改值，值只读；方法在包级定义。"},
"go-4-1":{out:"（goroutine 并发）",deep:["goroutine 初始栈 2KB，可动态增长——比线程轻量 1000 倍。","go 关键字启动——调度由 Go runtime 完成，不是 OS。","runtime.Gosched() 让出 CPU——一般不需要手动调用。"],recap:"goroutine = 轻量级协程；go 关键字启动。"},
"go-4-2":{out:"1 2 3",deep:["channel 是类型化管道——make(chan int) 创建。","无缓冲 channel 同步发送接收；缓冲 channel 异步。","关闭 channel 后：接收方拿到零值 + ok=false。"],recap:"channel 传递数据；无缓冲同步，缓冲异步。"},
"go-4-3":{out:"（select 多路复用）",deep:["select 同时监听多个 channel——就绪的分支执行。","default 分支让 select 非阻塞——但忙等会占 CPU。","time.After 配合 select 实现超时。"],recap:"select 监听多 channel；default 非阻塞；超时用 time.After。"},
"go-4-4":{out:"（并发安全的计数器）",deep:["sync.Mutex 互斥锁——Lock/Unlock 保护临界区。","sync.WaitGroup 等待一组 goroutine 完成。","sync/atomic 原子操作——比 mutex 更轻量但只支持基本类型。"],recap:"Mutex 保护共享；WaitGroup 等待；atomic 原子操作。"},
"go-5-1":{out:"（HTTP 请求）",deep:["net/http 标准库自带 HTTP 服务器——ListenAndServe 一行启动。","HandlerFunc 签名：func(w http.ResponseWriter, r *http.Request)。","middleware 模式：包装 HandlerFunc 实现日志/鉴权。"],recap:"net/http 标准库；Handler 接口；middleware 模式。"},
"go-5-2":{out:"（JSON 序列化）",deep:["struct 字段必须大写开头才能被 encoding/json 访问。","json:\"name\" tag 自定义 JSON 键名。","omitempty 标签：零值时省略该字段。"],recap:"字段大写导出；json tag 映射；omitempty 省略零值。"},
"go-5-3":{out:"（数据库查询）",deep:["database/sql 是接口层——驱动注册在 init() 中。","预编译语句 PreparedStatement 防 SQL 注入。","rows.Close() 必须调用——用 defer rows.Close()。"],recap:"sql.Open + QueryRow/Query；预编译防注入；defer Close。"},
"go-5-4":{out:"（模板渲染）",deep:["html/template 自动转义 HTML——防 XSS。","{{.Field}} 访问字段；{{range}} 遍历；{{if}} 条件。","模板缓存：template.ParseFiles 只解析一次。"],recap:"html/template 自动转义；{{.}} 访问；缓存模板。"},
"go-6-1":{out:"（测试通过）",deep:["测试文件必须 _test.go 结尾——go test 自动发现。","func TestXxx(t *testing.T) 是测试函数签名。","表驱动测试：定义 cases 切片，循环测试——Go 惯用模式。"],recap:"_test.go 文件；TestXxx；表驱动测试。"},
"go-6-2":{out:"（基准测试结果）",deep:["func BenchmarkXxx(b *testing.B) 基准测试。","b.N 是循环次数——框架自动调整直到结果稳定。","go test -bench=. -benchmem 看内存分配。"],recap:"Benchmark 性能测试；-benchmem 看分配。"},
"go-6-3":{out:"（文档输出）",deep:["go doc 查看文档——注释就是文档。","godoc 工具生成 HTML 文档。","包注释应该在 package 语句前。"],recap:"注释即文档；go doc 查看；包注释在 package 前。"},
"go-6-4":{out:"（静态分析结果）",deep:["go vet 官方静态检查——go vet ./...。","golint 检查代码风格；gofmt 自动格式化。","go build -race 检测数据竞争。"],recap:"go vet 静态检查；gofmt 格式化；-race 检测竞争。"},
"go-7-1":{out:"（模块初始化）",deep:["go mod init 创建 go.mod——模块路径即导入路径。","go get 下载依赖——go.sum 锁定版本。","go mod tidy 清理未用依赖、补全缺失依赖。"],recap:"go mod 管理依赖；go.mod/go.sum；go mod tidy 整理。"},
"go-7-2":{out:"（交叉编译成功）",deep:["GOOS/GOARCH 环境变量控制目标平台——go build 一行交叉编译。","GOOS=windows GOARCH=amd64 go build 编译 Windows 版。","Go 编译是静态链接——单二进制部署，无运行时依赖。"],recap:"GOOS/GOARCH 交叉编译；静态链接单二进制。"},
"go-7-3":{out:"（配置读取）",deep:["12-factor app：配置走环境变量——os.Getenv。","flag 包解析命令行参数——flag.String/Bool/Int。","viper 等库支持配置文件 + 环境变量合并。"],recap:"环境变量配置；flag 解析参数；12-factor 原则。"},
"go-7-4":{out:"（构建成功）",deep:["go build 编译——输出可执行文件。","go install 编译并安装到 $GOPATH/bin。","CGO_ENABLED=0 纯 Go 编译——静态链接，无 C 依赖。"],recap:"go build 编译；CGO_ENABLED=0 静态；单二进制部署。"}
});
