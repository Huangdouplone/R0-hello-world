/* Go curriculum for R0:hello world */
window.LANG_DATA = window.LANG_DATA || {};
window.LANG_DATA.go = {
stages:[
{id:"go-s1",icon:"🚀",name:"启航与环境",desc:"认识 Go、安装、第一个程序",lv:"basic",
goal:"装好 Go，跑通 Hello World，理解 go run/build。",
links:[["Go 官方文档","https://go.dev/doc/"],["Go 教程","https://go.dev/tour/"]],
lab:{t:"环境自检",req:["go version 验证安装","创建 hello.go 打印自我介绍","go run hello.go 和 go build 各试一次"],starter:`package main
import "fmt"
func main() {
    fmt.Println("Hello, Go!")
}`,hint:"go run 直接运行；go build 编译成二进制文件。",xp:20},
lessons:[
{id:"go-1-1",title:"认识 Go：简洁高效的后端语言",min:8,summary:["Go（Golang）由 Google 开发，语法简洁、并发原生、编译快。","应用：Docker、Kubernetes、微服务、云原生、CLI 工具。","设计哲学：少即是多——只有 25 个关键字，没有类和继承。"],code:`package main
import "fmt"
func main() {
    fmt.Println("Hello, Go!")
}`,pit:"Go 不是面向对象语言——它有结构体和接口，但没有类和继承。",ex:{q:"Go 最擅长什么？",a:"高并发网络服务、云原生基础设施、命令行工具。"},target:"能说清 Go 是什么并跑通 Hello World。"},
{id:"go-1-2",title:"安装 Go 与 GOPATH",min:12,summary:["从 go.dev 下载安装包。","go version 验证。","Go Modules（go mod init）管理依赖——现代 Go 不再需要 GOPATH。"],code:`go version
mkdir myproject && cd myproject
go mod init example.com/myproject
# 生成 go.mod 文件`,pit:"Go 1.11+ 默认使用 Modules——不要再用旧的 GOPATH 模式。",ex:{q:"go.mod 文件的作用？",a:"记录模块路径和依赖版本，类似 package.json。"},target:"装好 Go 并初始化模块。"},
{id:"go-1-3",title:"变量与类型",min:10,summary:["var 声明变量；:= 短变量声明（函数内）。","基本类型：int、float64、string、bool、byte、rune。","Go 是静态类型，但类型推断让代码简洁。"],code:`var name string = "Go"
age := 15  // 短变量声明，自动推断为 int
var (
    x = 1
    y = 2.5
)
const Pi = 3.14
fmt.Println(name, age, x, y)`,pit:"Go 要求变量必须使用——声明但未使用的变量会编译错误；:= 不能在函数外使用。",ex:{q:"var 和 := 的区别？",a:"var 可在包级和函数内使用，可指定类型；:= 只能在函数内，自动推断类型。"},target:"能声明变量和常量。"},
{id:"go-1-4",title:"基本输入输出",min:8,summary:["fmt.Print/Println/Printf 输出。","fmt.Scan 读取输入。","字符串用双引号，反引号表示原始字符串。"],code:`var name string
fmt.Print("你叫什么？")
fmt.Scan(&name)
fmt.Printf("你好, %s! 你今年 %d 岁\n", name, 25)
raw := \`多行
字符串\``,pit:"fmt.Scan 需要传指针 &name；Printf 用 %s/%d/%v 格式化。",ex:{q:"%v 和 %s 的区别？",a:"%v 通用格式（适合调试）；%s 专门格式化字符串。"},target:"能用 fmt 做输入输出。"}
],
quiz:[
{q:"Go 由哪家公司开发？",o:["Microsoft","Google","Amazon","Meta"],a:1,why:"Go 由 Google 于 2007 年设计。"},
{q:"初始化模块的命令？",o:["go init","go mod init","go new","go create"],a:1,why:"go mod init <module-name>。"},
{q:"短变量声明用？",o:["=","==",":=","->"],a:2,why:":= 声明并初始化变量。"}
]},
{id:"go-s2",icon:"🔢",name:"控制流与函数",desc:"if/for、函数、多返回值",lv:"basic",
goal:"掌握 Go 的控制流和函数特性。",
links:[["Go 流程控制","https://go.dev/doc/effective_go.html#control-structures"]],
lab:{t:"BMI 计算器",req:["读取身高体重","计算 BMI","根据区间输出评价"],starter:`package main
import "fmt"
func main() {
    var h, w float64
    fmt.Scan(&h, &w)
    // 计算 BMI
}`,hint:"Go 没有 while——for 同时承担所有循环。",xp:20},
lessons:[
{id:"go-2-1",title:"if/else 与条件",min:8,summary:["if 后不需要小括号，但需要大括号。","if 可带初始化语句：if x := f(); x > 0 {}。","Go 没有三元运算符。"],code:`age := 20
if age >= 18 {
    fmt.Println("成年")
} else if age >= 13 {
    fmt.Println("青少年")
} else {
    fmt.Println("儿童")
}
// 带初始化
if n := 42; n > 0 {
    fmt.Println("正数")
}`,pit:"Go 的大括号必须和 if 同行——else 也必须在 } 同一行。",ex:{q:"Go 有三元运算符吗？",a:"没有——必须用 if/else。"},target:"能写条件分支。"},
{id:"go-2-2",title:"for：唯一的循环",min:10,summary:["Go 只有 for，没有 while/until。","标准 for：for i:=0; i<10; i++ {}。","while 风格：for condition {}；无限循环：for {}。"],code:`for i := 0; i < 3; i++ { fmt.Println(i) }
n := 0
for n < 3 { n++ }  // while 风格
// range 遍历
nums := []int{1,2,3}
for idx, v := range nums { fmt.Println(idx, v) }`,pit:"for range 遍历数组/slice 返回索引和值；不要的用 _ 忽略。",ex:{q:"Go 的 while 怎么写？",a:"for condition {}——for 省略初始化和后置就是 while。"},target:"能用 for 写各种循环。"},
{id:"go-2-3",title:"函数与多返回值",min:12,summary:["函数可以返回多个值——Go 的特色。","命名返回值和 defer。","可变参数 ...int。"],code:`func div(a, b float64) (float64, error) {
    if b == 0 { return 0, fmt.Errorf("除数为零") }
    return a / b, nil
}
result, err := div(10, 3)
if err != nil {
    fmt.Println("错误:", err)
} else {
    fmt.Println(result)
}
func sum(nums ...int) int {
    total := 0
    for _, n := range nums { total += n }
    return total
}`,pit:"Go 惯例：error 作为最后一个返回值，调用方必须检查 err != nil。",ex:{q:"为什么 Go 用多返回值而不是异常？",a:"显式错误处理让控制流清晰，调用方必须处理错误。"},target:"能写多返回值函数并处理 error。"},
{id:"go-2-4",title:"defer 延迟执行",min:8,summary:["defer 把函数调用延迟到 return 前执行。","常用于关闭文件、解锁资源。","多个 defer 按 LIFO（后进先出）执行。"],code:`func readFile() {
    f, err := os.Open("file.txt")
    if err != nil { return }
    defer f.Close() // 函数返回前自动关闭
    // 读取文件...
}`,pit:"defer 的参数在 defer 语句时就求值，不是执行时——注意闭包陷阱。",ex:{q:"defer 有什么用？",a:"确保资源释放（文件关闭、锁释放），即使函数提前 return。"},target:"能用 defer 管理资源。"}
],
quiz:[
{q:"Go 的 while 怎么写？",o:["while condition","for condition","loop condition","until"],a:1,why:"Go 只有 for，for condition 就是 while。"},
{q:"Go 函数可以返回几个值？",o:["一个","最多两个","多个","不能返回"],a:2,why:"Go 支持多返回值，常用于 (result, error)。"},
{q:"defer 什么时候执行？",o:["立即","函数返回前","编译时","随机"],a:1,why:"defer 延迟到函数即将返回时执行。"}
]},
{id:"go-s3",icon:"📦",name:"slice 与 map",desc:"动态数组、字典",lv:"basic",
goal:"掌握 Go 的 slice 和 map。",
links:[["Go Slices","https://go.dev/blog/slices-intro"]],
lab:{t:"学生成绩管理",req:["用 slice 存储成绩","用 map 存储姓名到成绩","计算平均分和最高分"],starter:`scores := []float64{90, 85, 95}
grades := map[string]float64{"Alice": 90}
// 计算平均分`,hint:"len(slice) 取长度；range 遍历 map。",xp:20},
lessons:[
{id:"go-3-1",title:"slice：动态数组",min:12,summary:["slice 是动态长度的序列，基于数组。","make([]T, len, cap) 创建。","append 添加元素（可能分配新数组）。","slice 是引用类型——共享底层数组。"],code:`nums := []int{1,2,3}
nums = append(nums, 4, 5)
s := make([]string, 3, 10) // len=3, cap=10
fmt.Println(nums, len(nums), cap(nums))
// 切片
sub := nums[1:3] // [2,3]`,pit:"slice 切片 s[i:j] 共享底层数组——修改 sub 会影响原 slice，容易出隐蔽 bug。",ex:{q:"数组和 slice 的区别？",a:"数组长度固定是值类型；slice 动态长度是引用类型。"},target:"能创建和操作 slice。"},
{id:"go-3-2",title:"map：键值对",min:10,summary:["map[K]V 键值对。","make(map[K]V) 创建。","删除用 delete(map, key)。","读取返回 (value, ok) 检查键是否存在。"],code:`ages := map[string]int{"Alice": 25, "Bob": 30}
ages["Carol"] = 35
delete(ages, "Bob")
age, ok := ages["Alice"]
if ok {
    fmt.Println("Alice:", age)
}
for name, age := range ages {
    fmt.Println(name, age)
}`,pit:"map 是引用类型，未初始化的 map(nil) 写入会 panic——必须 make。",ex:{q:"如何安全读取 map？",a:"v, ok := m[key]；ok 为 false 表示键不存在。"},target:"能用 map 存储键值对。"},
{id:"go-3-3",title:"struct 结构体",min:10,summary:["struct 是字段的集合——Go 的面向对象基础。","字段首字母大写表示导出（公开）。","点号访问字段。"],code:`type Person struct {
    Name string
    Age  int
}
p := Person{Name: "Alice", Age: 25}
fmt.Println(p.Name)
p.Age = 26
// 指针
pp := &p
pp.Age = 27`,pit:"Go 的大小写决定可见性：大写开头导出（公开），小写开头包内私有。这是 Go 没有 public/private 关键字的原因。",ex:{q:"struct 和 class 的区别？",a:"struct 只有数据，方法通过接收者定义；没有继承和构造函数。"},target:"能定义和使用 struct。"},
{id:"go-3-4",title:"方法与接收者",min:10,summary:["方法是带接收者的函数。","值接收者操作副本；指针接收者修改原值。","可以为任何类型定义方法（不限于 struct）。"],code:`type Rectangle struct {
    Width, Height float64
}
func (r Rectangle) Area() float64 {  // 值接收者
    return r.Width * r.Height
}
func (r *Rectangle) Scale(f float64) {  // 指针接收者
    r.Width *= f
    r.Height *= f
}
rect := Rectangle{3, 4}
fmt.Println(rect.Area())
rect.Scale(2)`,pit:"修改接收者必须用指针接收者；值接收者操作的是副本。",ex:{q:"值接收者和指针接收者怎么选？",a:"需要修改原值或大 struct 用指针接收者；只读用值接收者。"},target:"能定义和调用方法。"}
],
quiz:[
{q:"slice 添加元素用？",o:["push","append","add","insert"],a:1,why:"append 向 slice 末尾添加元素。"},
{q:"map 未 make 就写入会？",o:["自动初始化","panic","返回错误","忽略"],a:1,why:"nil map 写入会 panic，必须 make。"},
{q:"struct 字段大写开头表示？",o:["私有","导出（公开）","常量","静态"],a:1,why:"Go 大小写决定可见性，大写导出。"}
]},
{id:"go-s4",icon:"🔌",name:"接口与错误",desc:"隐式接口、error 处理",lv:"adv",
goal:"理解 Go 的隐式接口和错误处理。",
links:[["Go 接口","https://go.dev/tour/methods/9"]],
lab:{t:"形状面积计算器",req:["定义 Shape 接口含 Area 方法","Circle 和 Rectangle 实现接口","计算所有形状面积"],starter:`type Shape interface {
    Area() float64
}
type Circle struct{ R float64 }
func (c Circle) Area() float64 { ... }`,hint:"Go 接口是隐式实现——不需要 implements 关键字。",xp:30},
lessons:[
{id:"go-4-1",title:"接口与隐式实现",min:12,summary:["接口定义方法集合。","类型实现接口只需实现其方法——无需声明 implements。","空接口 interface{} 可以接收任何类型。"],code:`type Speaker interface {
    Speak() string
}
type Dog struct{}
func (d Dog) Speak() string { return "Woof!" }
type Cat struct{}
func (c Cat) Speak() string { return "Meow!" }
func MakeSpeak(s Speaker) {
    fmt.Println(s.Speak())
}
MakeSpeak(Dog{})`,pit:"Go 接口是隐式的——这意味着你可以为别人的类型（甚至标准库类型）定义并实现接口。",ex:{q:"Go 接口和 Java 接口的区别？",a:"Go 隐式实现（鸭子类型），不需要显式 implements。"},target:"能定义和实现接口。"},
{id:"go-4-2",title:"error 接口",min:10,summary:["error 是内置接口，有 Error() string 方法。","函数返回 error 表示错误。","errors.New 和 fmt.Errorf 创建错误。"],code:`func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("除数不能为零")
    }
    return a / b, nil
}
result, err := divide(10, 0)
if err != nil {
    fmt.Println("错误:", err)
}`,pit:"Go 的错误是值——不是异常。调用方必须显式检查 err，没有 try/catch。",ex:{q:"Go 为什么不用异常？",a:"显式错误处理让错误路径清晰可见，避免隐藏的控制流。"},target:"能正确返回和处理错误。"},
{id:"go-4-3",title:"类型断言与类型开关",min:8,summary:["类型断言：x.(T) 检查接口值的具体类型。","类型开关：switch v := x.(type)。","空接口接收任意类型。"],code:`var i interface{} = "hello"
// 类型断言
s, ok := i.(string)
if ok {
    fmt.Println("字符串:", s)
}
// 类型开关
switch v := i.(type) {
case int:
    fmt.Println("整数:", v)
case string:
    fmt.Println("字符串:", v)
default:
    fmt.Println("未知类型")
}`,pit:"类型断言不带 ok 形式在类型不匹配时会 panic——用 comma-ok 形式更安全。",ex:{q:"interface{} 是什么？",a:"空接口，可以接收任何类型——类似 Java 的 Object。"},target:"能用类型断言和类型开关。"},
{id:"go-4-4",title:"io.Reader 与 io.Writer",min:8,summary:["io.Reader 接口：Read(p []byte) (n int, err error)。","io.Writer 接口：Write(p []byte) (n int, err error)。","Go 的标准库大量基于这两个接口——文件、网络、字符串都实现它们。"],code:`import "io"
// 任何实现了 Read 的都可以当作 Reader
var r io.Reader = os.Stdin
buf := make([]byte, 1024)
n, _ := r.Read(buf)
fmt.Println(string(buf[:n]))`,pit:"理解 io.Reader/Writer 就能理解 Go 标准库的 I/O 设计——数据流是可组合的。",ex:{q:"为什么 Go 的 I/O 这么优雅？",a:"基于 Reader/Writer 接口，内存、文件、网络都用同一套 API。"},target:"理解 Reader/Writer 接口。"}
],
quiz:[
{q:"Go 接口需要 implements 关键字吗？",o:["需要","不需要","可选","只有抽象类需要"],a:1,why:"Go 接口隐式实现，鸭子类型。"},
{q:"如何安全做类型断言？",o:["x.(T)","x.(T) 返回 (v, ok)","x.type(T)","typeof x"],a:1,why:"comma-ok 形式避免 panic。"},
{q:"io.Reader 的核心方法？",o:["Read","ReadLine","Get","Fetch"],a:0,why:"Read(p []byte) 是 Reader 接口。"}
]},
{id:"go-s5",icon:"⚡",name:"并发编程",desc:"goroutine 与 channel",lv:"hard",
goal:"理解 Go 的并发模型。",
links:[["Go 并发","https://go.dev/tour/concurrency/1"]],
lab:{t:"并发下载器",req:["启动多个 goroutine 并发下载","用 channel 收集结果","等待所有完成"],starter:`results := make(chan string, 3)
for _, url := range urls {
    go func(u string) {
        results <- fetch(u)
    }(url)
}
// 收集结果`,hint:"<-channel 接收；go 启动 goroutine。",xp:40},
lessons:[
{id:"go-5-1",title:"goroutine 轻量级线程",min:10,summary:["go f() 启动一个 goroutine——由 Go 运行时管理。","goroutine 初始栈仅 2KB，可轻松启动上万个。","比操作系统线程轻量得多。"],code:`func say(s string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}
go say("world")
say("hello") // 主线程也跑
// 注意：main 结束会杀死所有 goroutine`,pit:"main 函数返回时程序立即退出，不管 goroutine 是否完成——需要 sync.WaitGroup 等待。",ex:{q:"goroutine 和线程的区别？",a:"goroutine 由 Go 运行时调度，初始 2KB 栈，可轻松万级；线程由 OS 调度，MB 级栈。"},target:"能启动 goroutine。"},
{id:"go-5-2",title:"channel 通信",min:12,summary:["channel 是 goroutine 间通信的管道。","ch <- v 发送；v := <-ch 接收。","无缓冲 channel 同步发送接收；有缓冲异步。","Go 哲学：不要通过共享内存通信，要通过通信共享内存。"],code:`ch := make(chan string)
go func() {
    ch <- "你好" // 发送
}()
msg := <-ch // 接收
fmt.Println(msg)
// 带缓冲
bufCh := make(chan int, 2)
bufCh <- 1
bufCh <- 2
close(bufCh)
for n := range bufCh { fmt.Println(n) }`,pit:"无缓冲 channel 发送和接收必须同时就绪——否则阻塞；这是 Go 并发同步的核心。",ex:{q:"有缓冲和无缓冲 channel 的区别？",a:"无缓冲同步（收发同时就绪）；有缓冲异步（缓冲区未满即可发送）。"},target:"能用 channel 发送和接收。"},
{id:"go-5-3",title:"select 多路复用",min:10,summary:["select 同时等待多个 channel 操作。","default 分支实现非阻塞操作。","time.After 实现超时。"],code:`select {
case msg := <-ch1:
    fmt.Println("从 ch1:", msg)
case msg := <-ch2:
    fmt.Println("从 ch2:", msg)
case <-time.After(time.Second):
    fmt.Println("超时")
}`,pit:"select 随机选择就绪的 case——如果有多个就绪，随机选一个。",ex:{q:"select 怎么实现超时？",a:"加一个 <-time.After(timeout) 分支。"},target:"能用 select 等待多个 channel。"},
{id:"go-5-4",title:"sync.WaitGroup 与 Mutex",min:10,summary:["WaitGroup 等待一组 goroutine 完成。","Add(n) 增加计数，Done() 减一，Wait() 阻塞到零。","Mutex 保护共享数据。"],code:`var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println("工作", n)
    }(i)
}
wg.Wait() // 等待全部完成

var mu sync.Mutex
mu.Lock(); counter++; mu.Unlock()`,pit:"WaitGroup.Done() 必须在 goroutine 中调用——用 defer wg.Done() 确保执行。",ex:{q:"什么时候用 channel，什么时候用 Mutex？",a:"传递数据用 channel；纯保护共享状态用 Mutex（更高效）。"},target:"能用 WaitGroup 等待 goroutine。"}
],
quiz:[
{q:"启动 goroutine 用？",o:["thread f()","go f()","async f()","goroutine f()"],a:1,why:"go f() 启动 goroutine。"},
{q:"channel 发送用？",o:["ch.send(v)","ch <- v","<- ch","ch(v)"],a:1,why:"ch <- v 发送到 channel。"},
{q:"等待 goroutine 完成用？",o:["thread.Join","sync.WaitGroup","channel.wait","time.Sleep"],a:1,why:"WaitGroup.Wait() 阻塞直到计数归零。"}
]},
{id:"go-s6",icon:"🌐",name:"Web 与标准库",desc:"net/http、JSON",lv:"adv",
goal:"能用标准库写一个 Web 服务。",
links:[["net/http","https://pkg.go.dev/net/http"]],
lab:{t:"HTTP API 服务器",req:["用 net/http 写一个 /hello 接口","返回 JSON 响应","用 curl 测试"],starter:`func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello!")
    })
    http.ListenAndServe(":8080", nil)
}`,hint:"http.HandleFunc 注册路由；http.ListenAndServe 启动服务器。",xp:40},
lessons:[
{id:"go-6-1",title:"net/http 服务器",min:12,summary:["http.HandleFunc 注册路由处理函数。","处理函数签名：func(w http.ResponseWriter, r *http.Request)。","http.ListenAndServe 启动服务器。"],code:`func main() {
    http.HandleFunc("/hello", helloHandler)
    http.HandleFunc("/api/users", usersHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Query().Get("name"))
}`,pit:"ListenAndServe 返回 error——用 log.Fatal 确保错误被记录。",ex:{q:"r.URL.Query() 获取什么？",a:"URL 查询参数（?key=value）。"},target:"能写一个 HTTP 服务器。"},
{id:"go-6-2",title:"JSON 编码解码",min:10,summary:["encoding/json 标准库。","json.Marshal 编码为 JSON。","json.Unmarshal 解码到 struct。","字段必须大写开头才能被 JSON 包访问。"],code:`type User struct {
    Name string \`json:"name"\`
    Age  int    \`json:"age"\`
}
u := User{Name: "Alice", Age: 25}
data, _ := json.Marshal(u)
fmt.Println(string(data)) // {"name":"Alice","age":25}
var u2 User
json.Unmarshal(data, &u2)`,pit:"struct tag \`json:\"name\"\` 指定 JSON 字段名；字段必须导出（大写）。",ex:{q:"为什么 JSON 序列化要求字段大写？",a:"json 包只能访问导出字段——小写字段无法被反射读取。"},target:"能用 JSON 编码解码。"},
{id:"go-6-3",title:"HTTP 客户端",min:8,summary:["http.Get 发起 GET 请求。","http.Post 发起 POST。","响应体必须 defer resp.Body.Close()。"],code:`resp, err := http.Get("https://api.example.com/data")
if err != nil { log.Fatal(err) }
defer resp.Body.Close()
body, err := io.ReadAll(resp.Body)
fmt.Println(string(body))`,pit:"resp.Body 必须 Close——否则资源泄漏。defer resp.Body.Close()。",ex:{q:"http.Get 返回的 resp.Body 是什么？",a:"io.ReadCloser——读取后必须 Close。"},target:"能发起 HTTP 请求。"},
{id:"go-6-4",title:"context 超时控制",min:8,summary:["context.Context 传递请求作用域值和取消信号。","context.WithTimeout 设置超时。","HTTP 请求用 context 控制取消。"],code:`ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
resp, err := http.DefaultClient.Do(req)`,pit:"context 必须传——不能在 goroutine 中忽略它。超时后 ctx.Done() 关闭。",ex:{q:"context 的作用？",a:"传递取消信号、超时范围和请求作用域数据。"},target:"能用 context 控制超时。"}
],
quiz:[
{q:"启动 HTTP 服务器用？",o:["http.Start","http.ListenAndServe","http.Serve","http.Run"],a:1,why:"http.ListenAndServe(addr, handler)。"},
{q:"JSON struct tag 用？",o:["// json","# json","`json:\"...\"","/* json */"],a:2,why:"反引号 tag 指定 JSON 字段名。"},
{q:"HTTP 响应体必须？",o:["读完","Close","Flush","Copy"],a:1,why:"defer resp.Body.Close() 释放资源。"}
]},
{id:"go-s7",icon:"🚀",name:"工程化与测试",desc:"go mod、测试、性能",lv:"hard",
goal:"了解 Go 的工程实践。",
links:[["Go 测试","https://go.dev/doc/tutorial/add-a-test"]],
lab:{t:"为函数写测试",req:["写一个 Add 函数","写 TestAdd 函数","go test 运行"],starter:`func Add(a, b int) int { return a + b }
func TestAdd(t *testing.T) {
    if Add(2,3) != 5 { t.Error("期望5") }
}`,hint:"测试文件 _test.go；go test 运行。",xp:40},
lessons:[
{id:"go-7-1",title:"go mod 依赖管理",min:8,summary:["go get 下载依赖。","go mod tidy 整理 go.mod。","go mod vendor 复制依赖到 vendor/。"],code:`go get github.com/gin-gonic/gin
go mod tidy
go build`,pit:"go.sum 记录依赖哈希——必须提交，确保构建可复现。",ex:{q:"go mod tidy 做了什么？",a:"添加缺失的依赖，移除未用的依赖。"},target:"能用 go mod 管理依赖。"},
{id:"go-7-2",title:"单元测试",min:10,summary:["测试文件 _test.go。","TestXxx(t *testing.T) 函数。","go test 运行所有测试。","表驱动测试：一组输入输出。"],code:`func Add(a, b int) int { return a + b }
func TestAdd(t *testing.T) {
    tests := []struct{ a, b, want int }{
        {1, 2, 3}, {0, 0, 0}, {-1, 1, 0},
    }
    for _, tt := range tests {
        if got := Add(tt.a, tt.b); got != tt.want {
            t.Errorf("Add(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.want)
        }
    }
}`,pit:"Go 推荐表驱动测试——一个函数覆盖多组输入输出。",ex:{q:"测试文件命名规则？",a:"xxx_test.go，和被测文件同目录。"},target:"能写表驱动测试。"},
{id:"go-7-3",title:"Go 工程惯例",min:8,summary:["项目布局：cmd/ 入口、internal/ 私有包、pkg/ 公开包。","错误处理：包装错误用 fmt.Errorf + %w。","日志：用 log/slog 结构化日志。"],code:`if err != nil {
    return fmt.Errorf("查询用户 %s: %w", id, err)
}
// log/slog
slog.Info("用户登录", "user", name, "ip", ip)`,pit:"Go 代码风格由 gofmt 强制——不需要争论花括号和缩进。",ex:{q:"internal/ 目录的作用？",a:"internal 包只能被父目录树内的代码导入——强制私有性。"},target:"了解 Go 项目布局。"},
{id:"go-7-4",title:"性能与 pprof",min:8,summary:["Go 编译为原生机器码，启动快、内存小。","pprof 分析 CPU/内存性能。","benchmark 测试：BenchmarkXxx(b *testing.B)。"],code:`func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}
// go test -bench . -benchmem`,pit:"先正确再快速——Go 的垃圾回收已经足够好，大多数场景不需要手动优化。",ex:{q:"什么时候需要性能优化？",a:"用 pprof/profiling 定位到瓶颈后——不要凭感觉优化。"},target:"了解 Go 性能工具。"}
],
quiz:[
{q:"测试文件后缀？",o:["_test.go",".test.go","test.go","_spec.go"],a:0,why:"xxx_test.go。"},
{q:"运行测试用？",o:["go run test","go test","go check","go verify"],a:1,why:"go test 运行测试。"},
{q:"internal/ 包？",o:["公开","私有（仅父树内导入）","测试用","文档用"],a:1,why:"internal 强制包私有性。"}
]}
]
};
