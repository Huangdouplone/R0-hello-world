/* ================================================================
 * R0:hello world · 第二十四批：代码块英文（lesson_en[*].code）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 为什么单独一层：`codeBlock()` 只加版权行与高亮，**不翻译注释**，所以英文态要的是整块英文示例。
 * 通道本来就是 I18N.lesson_en[id].code（leContent 读它，优先级高于课节对象的 l.code），
 * 只是从来没人往里写过 code —— 于是弹窗里"要点是英文、代码是中文"。
 * 只补缺失（if (!e.code)），不覆盖已有译文；语义与中文示例逐行一致，只换注释与字符串字面量。
 * ================================================================ */
(function () {
  var I = window.I18N;
  if (!I) return;
  I.lesson_en = I.lesson_en || {};
  function code(id, en) {
    var e = I.lesson_en[id] || (I.lesson_en[id] = {});
    if (!e.code) e.code = en;
  }
  function out(id, en) {
    var e = I.lesson_en[id] || (I.lesson_en[id] = {});
    if (!e.out) e.out = en;
  }

  /* ---------------- Python：18 节 ---------------- */
  code("py-2-1", 'x = 10\nx = "ten"      # the same name can be rebound to another object\nprint(type(x))    # <class \'str\'>\nprint(id(x))');
  code("py-2-3", 'age = 20\nprint(18 <= age < 60)            # True\nname = input("Name: ") or "Anonymous"  # fall back to a default on empty input\nprint(bool([]), bool("0"))       # False True');
  code("py-2-4", 'age = int(input("Age: "))\nprint(f"Next year you will be {age + 1}")\nprint(f"{3.14159:.2f}")     # 3.14\nprint(f"{1234567:,}")       # 1,234,567');
  code("py-3-1", 'score = 85\nif score >= 90:\n    print("Excellent")\nelif score >= 60:\n    print("Pass")\nelse:\n    print("Keep going")');
  code("py-4-2", 'point = (3, 4)\nx, y = point\nfirst, *rest = [1, 2, 3]     # first=1 rest=[2, 3]\na, b = b, a                  # swapping needs no temporary variable');
  code("py-4-3", 'd = {"a": 1, "b": 2}\nd["c"] = 3\nfor k, v in d.items():\n    print(k, v)\nprint(d.get("x", 0))    # returns the default 0 when the key is missing');
  code("py-5-1", 'def greet(name, prefix="Hello"):\n    return f"{prefix}, {name}!"\n\ndef total(*nums, **opts):\n    return sum(nums), opts\n\nprint(greet("Ann"), total(1, 2, tax=0.1))');
  code("py-5-2", 'def make_adder(n):\n    def add(x):\n        return x + n      # remembers n from the enclosing scope\n    return add\n\nadd5 = make_adder(5)\nprint(add5(3))    # 8');
  code("py-6-1", 'import math\nfrom math import sqrt, pi as PI\nprint(sqrt(16), PI)\nprint(__name__)    # running the file directly prints __main__');
  code("py-6-2", '# layout: myapp/__init__.py, myapp/utils.py\n# from outside: from myapp import utils\n# from inside the package: from . import utils\n__all__ = ["utils"]');
  code("py-7-1", 'with open("note.txt", "w", encoding="utf-8") as f:\n    f.write("first line\\n")\n\nwith open("note.txt", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())');
  code("py-7-3", 'try:\n    n = int(input("Number: "))\nexcept ValueError as e:\n    print("Not a valid number:", e)\nelse:\n    print("Got", n)\nfinally:\n    print("Done")');
  code("py-7-4", 'from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer():\n    t = time.perf_counter()\n    yield\n    print("elapsed", round(time.perf_counter() - t, 4))\n\nwith timer():\n    sum(range(10 ** 6))');
  code("py-8-1", 'class Dog:\n    species = "Canis"      # class attribute, shared by every instance\n\n    def __init__(self, name):\n        self.name = name   # instance attribute\n\n    def bark(self):\n        return f"{self.name}: Woof!"\n\nprint(Dog("Rex").bark())');
  code("py-8-2", 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"\n\nprint(Dog().speak(), Dog.__mro__)');
  code("py-10-1", '# test_math.py\ndef add(a, b):\n    return a + b\n\ndef test_add():\n    assert add(1, 2) == 3\n    assert add(-1, 1) == 0\n\n# run in the terminal: pytest -q');
  code("py-10-3", '# pyproject.toml fragment\n[project]\nname = "mytool"\nversion = "0.1.0"\ndependencies = ["requests>=2.0"]\n\n# build: python -m build\n# upload: python -m twine upload dist/*');
  code("py-10-4", 'import copy\n\na = [[1], [2]]\nb = copy.copy(a)       # shallow copy\nc = copy.deepcopy(a)   # deep copy\nb[0].append(9)\nprint(a)   # [[1, 9], [2]] - the shallow copy reached into the original');

  /* ---------------- C：27 节 ---------------- */
  code("c-1-2", '# verify the compiler\ngcc --version\n# compile and run\ngcc main.c -o main\n./main');
  code("c-1-4", 'gcc -E main.c -o main.i    # preprocess\ngcc -S main.i -o main.s    # compile\ngcc -c main.s -o main.o    # assemble\ngcc main.o -o main         # link');
  code("c-2-2", '#include <limits.h>\n#include <stdint.h>\n\nint32_t a = INT32_MAX;\nprintf("%d\\n", a + 1);   // overflow: undefined behaviour\nuint32_t b = 0;\nprintf("%u\\n", b - 1);   // unsigned wrap-around, result is UINT32_MAX');
  code("c-2-3", '#include <math.h>\n\nprintf("%.17g\\n", 0.1);        // the value as really stored\nif (fabs(0.1 + 0.2 - 0.3) < 1e-9)\n    printf("treated as equal\\n");');
  code("c-3-2", 'int age;\nprintf("Age: ");\nif (scanf("%d", &age) == 1)\n    printf("Next year %d\\n", age + 1);\nelse\n    printf("Not an integer\\n");');
  code("c-3-4", 'char line[128];\nif (fgets(line, sizeof line, stdin)) {\n    line[strcspn(line, "\\n")] = \'\\0\';   // strip the newline\n    printf("You typed: %s\\n", line);\n}');
  code("c-4-1", 'switch (day) {\n    case 1: printf("Mon\\n"); break;\n    case 2: printf("Tue\\n"); break;\n    default: printf("Other\\n");\n}');
  code("c-4-3", 'for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;   // skip evens\n    if (i > 7) break;           // stop early\n    printf("%d ", i);           // 1 3 5 7\n}');
  code("c-5-1", '#include <stdio.h>\n\nint add(int a, int b);        // prototype\n\nint main(void) {\n    printf("%d\\n", add(2, 3));\n    return 0;\n}\n\nint add(int a, int b) {       // definition\n    return a + b;\n}');
  code("c-5-2", 'void swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint x = 1, y = 2;\nswap(&x, &y);   // addresses are mandatory');
  code("c-5-3", 'static int count = 0;      // file scope, visible only in this file\n\nvoid hit(void) {\n    static int n = 0;      // initialised only once\n    n++;\n    count = n;\n}');
  code("c-5-4", 'int fact(int n) {\n    if (n <= 1) return 1;      // base case\n    return n * fact(n - 1);\n}\nprintf("%d\\n", fact(5));   // 120');
  code("c-6-3", 'char s[] = "hi";\nprintf("%zu %zu\\n", sizeof(s), strlen(s));  // 3 2\ns[0] = \'H\';        // OK: the array is writable\n// char *p = "hi"; p[0] = \'H\';  wrong: the literal is read-only');
  code("c-6-4", 'char buf[32];\nstrncpy(buf, src, sizeof(buf) - 1);\nbuf[sizeof(buf) - 1] = \'\\0\';   // terminate by hand\nif (strcmp(buf, "quit") == 0) printf("Bye\\n");');
  code("c-7-1", 'int x = 10;\nint *p = &x;\nprintf("%p %d\\n", (void *)p, *p);\n*p = 20;            // change x through the pointer\nprintf("%d\\n", x);  // 20');
  code("c-7-3", 'int a[3] = {1, 2, 3};\nint *p = a;            // same as &a[0]\nprintf("%d %d\\n", a[1], *(p + 1));   // 2 2\n// a = p;  wrong: the array name is not assignable');
  code("c-7-4", 'void print_arr(const int *p, int n) {   // promises not to modify\n    for (int i = 0; i < n; i++) printf("%d ", p[i]);\n}\n\nint *find(int *p, int n, int v) {\n    for (int i = 0; i < n; i++) if (p[i] == v) return p + i;\n    return NULL;\n}');
  code("c-8-1", 'int g;                 // BSS (uninitialised, zero-filled)\nstatic int s = 1;      // data segment\nvoid f(void) {\n    int local;         // stack\n    int *p = malloc(sizeof *p);  // heap\n    free(p);\n}');
  code("c-8-2", 'int *p = malloc(n * sizeof *p);\nif (!p) { /* handle failure */ }\nfree(p);\np = NULL;   // null it after freeing to avoid dangling');
  code("c-8-3", 'char *p = malloc(8);\nstrcpy(p, "too long, out of bounds");   // out-of-bounds write\nfree(p);\n// free(p);               // double free: UB\n// printf("%s", p);       // dangling access: UB');
  code("c-9-1", 'struct Point { int x; int y; };\nstruct Point p = {1, 2};\nstruct Point *q = &p;\nprintf("%d %d\\n", p.x, q->y);\nstruct Point r = p;   // whole-struct copy');
  code("c-9-2", 'typedef struct Node Node;\nstruct Node {\n    int val;\n    Node *next;      // self-reference requires a pointer\n};\nNode a = {1, NULL}, b = {2, &a};');
  code("c-9-3", 'union Value {\n    int i;\n    float f;\n};\nunion Value v;\nv.i = 1;\nprintf("%d %.1f\\n", v.i, v.f);   // shared memory, meaning depends on interpretation');
  code("c-9-4", '#ifndef CONFIG_H\n#define CONFIG_H\n#define MAX_N 100\n#define SQR(x) ((x) * (x))\n#endif\n\n// SQR(1 + 2) expands to ((1+2)*(1+2)) = 9');
  code("c-10-2", 'FILE *fp = fopen("data.bin", "wb");\nint arr[3] = {1, 2, 3};\nfwrite(arr, sizeof arr[0], 3, fp);\nfclose(fp);\n\nfp = fopen("data.bin", "rb");\nfseek(fp, sizeof(int), SEEK_SET);   // skip to the 2nd int');
  code("c-10-3", '#include <errno.h>\n#include <string.h>\n\nFILE *fp = fopen("nope.txt", "r");\nif (!fp) {\n    fprintf(stderr, "failed: %s\\n", strerror(errno));\n    return 1;\n}');
  code("c-10-4", 'int add(int a, int b) { return a + b; }\nint (*f)(int, int) = add;    // function pointer\nprintf("%d\\n", f(2, 3));    // 5\n\n// int *a[10];      array of 10 int*\n// int (*a)[10];    pointer to an array of 10 int\n// int (*f)(int);   function pointer');

  /* ---------------- C++：30 节 ---------------- */
  code("cpp-1-2", 'g++ -std=c++17 -Wall -Wextra main.cpp -o main\n./main\n\n# minimal CMakeLists.txt\ncmake_minimum_required(VERSION 3.16)\nproject(hello)\nadd_executable(hello main.cpp)');
  code("cpp-1-3", '#include <iostream>\n\n// using namespace std;  // fine for small exercises, avoid it in headers\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}');
  code("cpp-2-2", 'const int n = 10;\nconstexpr int m = 10;\nint arr[m];            // OK: compile-time constant\n\nstruct S {\n    int v;\n    int get() const { return v; }   // const member function\n};');
  code("cpp-2-3", 'int x = 1;\nint &r = x;\nr = 2;                 // x becomes 2\nvoid f(int &v);        // take a reference to modify the argument\nvoid g(const std::string &s);  // read-only large object, no copy');
  code("cpp-2-4", 'enum class Color { Red, Green, Blue };\nColor c = Color::Red;\n// int x = c;              wrong: no implicit conversion\nint x = static_cast<int>(c);   // explicit conversion\ndouble d = static_cast<double>(5) / 2;   // 2.5');
  code("cpp-3-1", 'int score = 85;\nif (score >= 90)      std::cout << "Excellent";\nelse if (score >= 60) std::cout << "Pass";\nelse                  std::cout << "Keep trying";');
  code("cpp-3-2", 'std::vector<int> v{1, 2, 3};\nfor (const auto &x : v) std::cout << x << " ";\nfor (auto &x : v) x *= 2;          // modify elements\nfor (int i : {10, 20, 30}) std::cout << i << " ";');
  code("cpp-3-3", 'for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 7) break;\n    std::cout << i << " ";   // 1 3 5 7\n}\n{\n    std::lock_guard<std::mutex> lk(m);  // unlocks automatically at scope exit\n}');
  code("cpp-3-4", 'std::map<std::string, int> m{{"a", 1}, {"b", 2}};\nfor (const auto &[k, v] : m)\n    std::cout << k << ":" << v << " ";\n\nauto [it, ok] = m.insert({"c", 3});   // unpack insert\'s returned pair');
  code("cpp-4-1", 'int add(int a, int b);\ndouble add(double a, double b);      // overloading\nvoid log(const std::string &msg, bool flush = false);\n\nadd(1, 2);        // calls the int version\nadd(1.0, 2.0);    // calls the double version');
  code("cpp-4-2", 'void by_value(std::string s);          // copies\nvoid by_ref(std::string &s);           // may modify the original\nvoid by_cref(const std::string &s);    // read-only, no copy\nstd::string make() { return "hi"; }    // return value, safe');
  code("cpp-5-1", 'class Point {\n    double x_ = 0, y_ = 0;      // private members + in-class initialisers\npublic:\n    Point() = default;\n    Point(double x, double y) : x_(x), y_(y) {}\n    double x() const { return x_; }\n};');
  code("cpp-5-2", 'class Buffer {\n    char *p_;\n    std::size_t n_;\npublic:\n    Buffer(std::size_t n) : p_(new char[n]), n_(n) {}\n    ~Buffer() { delete[] p_; }\n    Buffer(const Buffer &) = delete;          // no copying\n    Buffer &operator=(const Buffer &) = delete;\n};');
  code("cpp-5-3", 'class Owner {                 // Rule of Zero\n    std::vector<int> data_;   // the standard library copies/moves it for you\n    std::string name_;\npublic:\n    Owner(std::string n) : name_(std::move(n)) {}\n    // no hand-written destructor, copy or move needed\n};');
  code("cpp-6-2", 'struct Base {\n    virtual void f() { std::cout << "Base"; }\n    void g() { std::cout << "g"; }\n};\nstruct D : Base {\n    void f() override { std::cout << "D"; }\n};\nBase *p = new D;\np->f();   // D (dynamic binding)\np->g();   // g (static binding)');
  code("cpp-6-3", 'class Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;    // pure virtual\n};\n\nclass Square : public Shape {\n    double s_;\npublic:\n    explicit Square(double s) : s_(s) {}\n    double area() const override { return s_ * s_; }\n};');
  code("cpp-6-4", 'struct B { virtual void f(); virtual ~B() = default; };\nstruct D : B {\n    void f() override;      // correct: signature matches\n    // void f(int) override;  wrong: B has no f(int)\n};\n\nB *b = new D;\nif (auto *d = dynamic_cast<D *>(b)) { /* conversion succeeded */ }');
  code("cpp-7-1", 'template <typename T>\nT max_of(T a, T b) { return a > b ? a : b; }\n\nmax_of(1, 2);        // T = int\nmax_of(1.0, 2.0);    // T = double\nmax_of<int>(1, 2.5); // explicit: 2.5 converts to int');
  code("cpp-7-3", 'template <typename... Args>\nauto sum(Args... args) {\n    return (args + ...);        // fold expression (C++17)\n}\nstd::cout << sum(1, 2, 3, 4);   // 10\n\ntemplate <typename T, typename... Rest>\nvoid print(T first, Rest... rest);');
  code("cpp-7-4", '#include <concepts>\n\ntemplate <std::integral T>\nT gcd(T a, T b) { while (b) { T t = a % b; a = b; b = t; } return a; }\n\ngcd(12, 18);      // OK\ngcd(1.5, 2.5);    // compile error: double is not integral');
  code("cpp-8-1", 'std::vector<int> v;\nv.reserve(1000);            // pre-allocate, avoid repeated growth\nv.push_back(1);\nstd::cout << v.size() << " " << v.capacity() << "\\n";\nstd::array<int, 3> a{1, 2, 3};');
  code("cpp-8-2", 'std::map<std::string, int> m;\nm["a"] = 1;                  // inserts when absent\nif (auto it = m.find("b"); it != m.end())\n    std::cout << it->second;\nfor (const auto &[k, v] : m) std::cout << k << v;');
  code("cpp-8-3", 'std::vector<int> v{1, 2, 3, 4, 5};\nfor (auto it = v.begin(); it != v.end(); ++it) std::cout << *it;\nauto it2 = std::find(v.begin(), v.end(), 3);   // algorithms return iterators\n\n// C++20: for (int x : v | std::views::filter([](int n){return n%2==0;}))');
  code("cpp-9-1", 'auto p = std::make_unique<int>(42);      // exclusive\nauto q = std::move(p);                   // transfer ownership, p becomes null\n\nauto s = std::make_shared<Node>();       // shared\nstd::weak_ptr<Node> w = s;               // observes without raising the count\nif (auto locked = w.lock()) { /* still alive */ }');
  code("cpp-9-2", 'std::vector<int> a(1000000);\nstd::vector<int> b = std::move(a);   // O(1) pointer transfer\na.size();   // legal but the content is unspecified (usually empty)\n\nstd::string s1 = "hi";\nstd::string s2 = s1;             // copy\nstd::string s3 = std::move(s1);  // move');
  code("cpp-9-3", 'template <typename T>\nvoid wrapper(T &&arg) {\n    target(std::forward<T>(arg));   // preserves the lvalue/rvalue category\n}\n\nwrapper(42);        // forwarded as an rvalue\nint x = 1;\nwrapper(x);         // forwarded as an lvalue');
  code("cpp-9-4", 'struct Node {\n    std::shared_ptr<Node> child;\n    std::weak_ptr<Node> parent;   // use weak to break the cycle\n};\n\nauto fp = std::unique_ptr<FILE, decltype(&fclose)>(\n    std::fopen("a.txt", "r"), &fclose);');
  code("cpp-10-1", 'try {\n    auto v = load(path);\n} catch (const std::filesystem::filesystem_error &e) {\n    std::cerr << "file error: " << e.what() << "\\n";\n} catch (const std::exception &e) {\n    std::cerr << "other error: " << e.what() << "\\n";\n}');
  code("cpp-10-3", 'std::mutex mu;\nint counter = 0;\nvoid work() {\n    for (int i = 0; i < 1000; i++) {\n        std::lock_guard<std::mutex> lk(mu);   // unlocks automatically at scope exit\n        ++counter;\n    }\n}\nstd::thread t1(work), t2(work);\nt1.join(); t2.join();');
  code("cpp-10-4", '// cache friendly: sequential traversal of contiguous memory beats random jumps\nfor (const auto &x : vector_of_structs) sum += x.a;   // fast\nfor (const auto &p : vector_of_pointers) sum += p->a; // slow\n\n// compile-time computation: move work to the compiler\nconstexpr int fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nstatic_assert(fib(10) == 55);');

  /* ---------------- Java：25 节 ---------------- */
  code("java-1-2", '# verify the install\njava -version\njavac -version\n\n# compile and run\njavac Main.java\njava Main');
  code("java-1-4", 'package com.example.demo;\n\n/**\n * One line saying what this class does (doc comment)\n */\npublic class App {\n    static final int MAX_SIZE = 100;   // constants in ALL_CAPS\n    public static void main(String[] args) {\n        System.out.println(MAX_SIZE);\n    }\n}');
  code("java-2-1", 'int i = 10;\nInteger boxed = i;        // boxing\nint unboxed = boxed;      // unboxing\nSystem.out.println(Integer.MAX_VALUE);\nSystem.out.println(Integer.parseInt("42"));');
  code("java-2-2", 'final int MAX = 100;\nfinal List<String> names = new ArrayList<>();\nnames.add("a");        // OK: the object\'s contents stay mutable\n// names = null;       wrong: the reference cannot rebind\n// MAX = 200;          wrong');
  code("java-2-4", 'Scanner sc = new Scanner(System.in);\nif (sc.hasNextInt()) {\n    int n = sc.nextInt();\n    System.out.printf("Got %d%n", n);\n}\nString line = sc.nextLine();   // mind the leftover newline\nsc.close();');
  code("java-3-2", 'int[] a = {1, 2, 3};\nint sum = 0;\nfor (int x : a) sum += x;       // enhanced for\nfor (int i = 0; i < a.length; i++) a[i] *= 2;   // when you need the index');
  code("java-3-3", 'outer:\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i * j > 2) break outer;   // exits both loops at once\n        System.out.println(i + "," + j);\n    }\n}');
  code("java-3-4", 'int[] a = {3, 1, 4, 1, 5};\nint max = a[0];\nfor (int x : a) if (x > max) max = x;\n\n// debugging tip: print intermediate state\nSystem.out.println("max=" + max);');
  code("java-4-1", 'int[] a = {3, 1, 2};\nArrays.sort(a);\nSystem.out.println(Arrays.toString(a));   // [1, 2, 3]\nint[] b = Arrays.copyOf(a, 5);            // grow-and-copy\nSystem.out.println(Arrays.binarySearch(a, 2));');
  code("java-4-3", 'String a = "hi";\nString b = "hi";\nString c = new String("hi");\nSystem.out.println(a == b);        // true (pool reuse)\nSystem.out.println(a == c);        // false\nSystem.out.println(a.equals(c));   // true');
  code("java-5-1", 'static int add(int a, int b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }   // overloading\nstatic int sum(int... nums) {\n    int s = 0;\n    for (int n : nums) s += n;\n    return s;\n}');
  code("java-5-2", 'static void reset(StringBuilder sb) {\n    sb = new StringBuilder("new");   // only rebinds the copy; the caller is unaffected\n}\nstatic void append(StringBuilder sb) {\n    sb.append("!");                  // mutates the object, visible outside\n}\nStringBuilder s = new StringBuilder("hi");\nappend(s);   // s becomes hi!\nreset(s);    // s is still hi!');
  code("java-5-3", 'class Point {\n    private int x, y;\n    public Point(int x, int y) { this.x = x; this.y = y; }\n    public Point() { this(0, 0); }        // delegates to the other constructor\n    public int getX() { return x; }\n}');
  code("java-6-1", 'class Animal {\n    String name;\n    Animal(String name) { this.name = name; }\n    void speak() { System.out.println("..."); }\n}\nclass Dog extends Animal {\n    Dog(String name) { super(name); }\n    @Override void speak() { System.out.println(name + ": Woof!"); }\n}');
  code("java-6-2", 'Animal a = new Dog("Hei");\na.speak();          // decided at run time: Woof!\n// a.bark();        compile error: the compile-time type is Animal\na.getClass().getName();   // Dog');
  code("java-6-3", 'interface Flyable {\n    void fly();\n    default void land() { System.out.println("landing"); }   // default method\n}\n\nabstract class Bird implements Flyable {\n    protected String name;\n    public abstract void sing();\n}');
  code("java-7-1", 'try {\n    int n = Integer.parseInt(input);\n} catch (NumberFormatException e) {\n    System.out.println("not a number: " + e.getMessage());\n} catch (Exception e) {\n    e.printStackTrace();\n} finally {\n    System.out.println("cleanup");\n}');
  code("java-7-2", 'class InsufficientFundsException extends RuntimeException {\n    InsufficientFundsException(String msg) { super(msg); }\n}\n\ntry (BufferedReader br = Files.newBufferedReader(path)) {\n    return br.readLine();\n}   // closed automatically, no finally needed');
  code("java-7-3", 'List<String> list = new ArrayList<>();\nSet<String> set = new HashSet<>();\nMap<String, Integer> map = new HashMap<>();\nmap.merge("a", 1, Integer::sum);        // counting idiom\nmap.getOrDefault("b", 0);\nlist.removeIf(s -> s.isEmpty());');
  code("java-8-3", 'class User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    private transient String password;   // not serialised\n}\n\ntry (ObjectOutputStream oos = new ObjectOutputStream(\n        new FileOutputStream("u.bin"))) {\n    oos.writeObject(new User("Tom"));\n}');
  code("java-9-1", 'Thread t = new Thread(() -> System.out.println("running"));\nt.start();\nt.join();          // wait for completion\n\nCallable<Integer> task = () -> 42;\nFuture<Integer> f = pool.submit(task);');
  code("java-9-2", 'class Counter {\n    private int n = 0;\n    public synchronized void inc() { n++; }      // mutual exclusion\n    public synchronized int get() { return n; }\n}\nprivate volatile boolean running = true;   // visibility');
  code("java-9-3", 'ConcurrentHashMap<String, Integer> m = new ConcurrentHashMap<>();\nm.merge("k", 1, Integer::sum);        // atomic update\n\nBlockingQueue<String> q = new ArrayBlockingQueue<>(100);\nq.put("task");        // blocks when full\nString s = q.take();  // blocks when empty');
  code("java-9-4", 'CompletableFuture.supplyAsync(() -> fetchUser())\n    .thenApply(user -> enrich(user))\n    .exceptionally(ex -> fallback())\n    .thenAccept(System.out::println);\n\nCompletableFuture.allOf(f1, f2).join();   // wait for all');
  code("java-10-4", '# common JVM flags and tools\njava -Xms256m -Xmx1g -XX:+UseG1GC Main\njps -l            # list Java processes\njstat -gc <pid>   # GC statistics\njmap -heap <pid>  # heap overview\njstack <pid>      # thread stacks (deadlock hunting)');
  /* ---- B29 收尾：4 节的输出示例（out 槽） ---- */
  out("js-7-2", "(URL parameter)");
  out("cs-3-4", "(generic method)");
  out("cs-7-3", "(debug output)");
  out("cs-7-4", "(deployment succeeded)");
})();
