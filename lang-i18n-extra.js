/* ============================================================
 * lang-i18n-extra.js —— 阶段级英文对照补全（JavaScript / C# / Go）
 * 背景：lang-i18n-content.js 的 I18N.stage_en 只覆盖 Python / C / C++ / Java
 *       这 4 门老语言；后加的 js / cs / go 共 22 个阶段没有英文词条，
 *       导致 EN 模式下「阶段目标」「实战题（标题 / 要求 / 提示）」「延伸阅读标签」
 *       回落成中文，而其他语言是英文 —— 同一功能表现不一致。
 * 做法：沿用覆盖层模式，把自己的词条并入 window.I18N.stage_en，
 *       不改动 lang-i18n-content.js，易回退。
 * 字段与既有 stage_en 完全一致：{goal, links, lab:{t, req, hint}}
 * 版权：bilibili 黄豆666 / huangdouplone
 * ============================================================ */
(function () {
  var EN = {

  /* ==================== JavaScript ==================== */
  "js-s1": {
    goal: "Run your first line of JavaScript and understand the two runtimes: the browser console and Node.js.",
    links: [["MDN · JavaScript", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"], ["Modern JavaScript Tutorial", "https://zh.javascript.info/"]],
    lab: {
      t: "Environment Check & Self-Introduction",
      req: ["Print your nickname in the browser console", "Print the current version with console.log in Node.js", "Write a .js file and run it from the terminal"],
      hint: "Press F12 for the browser console; run a file in Node.js with node intro.js."
    }
  },
  "js-s2": {
    goal: "Write conditionals and loops, and understand how function declarations differ from arrow functions.",
    links: [["MDN · Control flow", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"]],
    lab: {
      t: "BMI Calculator",
      req: ["Read height and weight with prompt", "Compute BMI and print a verdict for the matching range", "Assemble the output with template literals"],
      hint: "parseFloat converts a string to a number; toFixed(1) keeps one decimal place."
    }
  },
  "js-s3": {
    goal: "Work with arrays and objects, and use destructuring plus the spread operator.",
    links: [["MDN · Array", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array"]],
    lab: {
      t: "Todo List Manager",
      req: ["Create a todo array", "Add tasks with push and remove them with splice", "Render an HTML list with map"],
      hint: "Array.map returns a new array; Array.filter selects by predicate."
    }
  },
  "js-s4": {
    goal: "Select elements, change their content, and bind events.",
    links: [["MDN · DOM guide", "https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model"]],
    lab: {
      t: "Interactive Counter",
      req: ["Create a div that displays a number", "Add plus and minus buttons that update the number on click", "Update the page display whenever the number changes"],
      hint: "document.getElementById('count').textContent = newValue."
    }
  },
  "js-s5": {
    goal: "Write asynchronous code and call APIs with fetch.",
    links: [["MDN · Promise", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise"]],
    lab: {
      t: "Weather Lookup",
      req: ["Request a public API with fetch", "Await the data with async/await", "Render the result on the page"],
      hint: "fetch returns a Promise and await waits for it; remember to handle errors."
    }
  },
  "js-s6": {
    goal: "Write object-oriented code with class and understand the module system.",
    links: [["MDN · Classes", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes"]],
    lab: {
      t: "Encapsulation: a Shopping Cart Class",
      req: ["Create a Cart class holding an items array", "Implement addItem, removeItem and getTotal", "Instantiate it and test the behaviour"],
      hint: "this refers to the instance; constructor initialises its state."
    }
  },
  "js-s7": {
    goal: "Get to know the APIs the browser provides.",
    links: [["MDN · Web APIs", "https://developer.mozilla.org/zh-CN/docs/Web/API"]],
    lab: {
      t: "Theme Switcher",
      req: ["Persist the user's choice with localStorage", "Toggle CSS variables to change the page colours", "Restore the saved choice after a refresh"],
      hint: "localStorage persists data; set CSS variables with document.documentElement.style.setProperty."
    }
  },
  "js-s8": {
    goal: "Get an overview of the modern JavaScript ecosystem.",
    links: [["npm", "https://www.npmjs.com/"]],
    lab: {
      t: "Complete Todo Application",
      req: ["Create, read, update and delete todos", "Persist them to localStorage", "Add light styling"],
      hint: "Use event delegation, template literals and localStorage."
    }
  },

  /* ==================== C# ==================== */
  "cs-s1": {
    goal: "Install the .NET SDK and run your first C# console program.",
    links: [["C# official documentation", "https://learn.microsoft.com/zh-cn/dotnet/csharp/"], [".NET tutorials", "https://dotnet.microsoft.com/learn"]],
    lab: {
      t: "Environment Check",
      req: ["Create a project with dotnet new console", "Edit Program.cs to print a self-introduction", "Run it with dotnet run"],
      hint: "dotnet new console -n MyApp creates the project; cd MyApp then dotnet run runs it."
    }
  },
  "cs-s2": {
    goal: "Write conditionals, loops and your own methods.",
    links: [["C# · Methods", "https://learn.microsoft.com/zh-cn/dotnet/csharp/methods"]],
    lab: {
      t: "BMI Calculator Method",
      req: ["Write a CalculateBMI method taking height and weight", "Return the BMI value", "Call it from Main and print a verdict"],
      hint: "Method signature: return type, name, then the parameter list."
    }
  },
  "cs-s3": {
    goal: "Use List<T> and Dictionary<K,V> confidently.",
    links: [["C# · Collection types", "https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/concepts/collections"]],
    lab: {
      t: "Grade Manager",
      req: ["Store grades in a List<double>", "Add, remove and compute the average", "Store student names mapped to grades in a Dictionary"],
      hint: "List<T>.Average() computes the mean directly."
    }
  },
  "cs-s4": {
    goal: "Design object-oriented programs with classes and interfaces.",
    links: [["C# · Object-oriented programming", "https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/object-oriented"]],
    lab: {
      t: "Bank Account Class",
      req: ["Create an Account class holding a balance", "Implement Deposit and Withdraw", "Make Withdraw raise an error when funds are insufficient"],
      hint: "decimal suits monetary amounts; get/set properties control access."
    }
  },
  "cs-s5": {
    goal: "Write asynchronous code and handle exceptions.",
    links: [["C# · Asynchronous programming", "https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/"]],
    lab: {
      t: "Async Data Loading",
      req: ["Write an async method that simulates latency", "Simulate the delay with await Task.Delay", "Wrap the call in try/catch"],
      hint: "An async method returns Task or Task<T>; await it at the call site."
    }
  },
  "cs-s6": {
    goal: "Read and write files and JSON data.",
    links: [["C# · File I/O", "https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/file-system/"]],
    lab: {
      t: "Persist Grades as JSON",
      req: ["Create a list of grades", "Serialise it to a file with System.Text.Json", "Read the file back and deserialise it"],
      hint: "System.Text.Json is the built-in .NET JSON library."
    }
  },
  "cs-s7": {
    goal: "Get to know the advanced features of modern C#.",
    links: [["C# · What's new", "https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/"]],
    lab: {
      t: "Modelling Data with record",
      req: ["Define a record representing a point", "Create two points and compare them for equality", "Copy-and-modify one with a with expression"],
      hint: "record gives you value equality and a readable ToString for free."
    }
  },

  /* ==================== Go ==================== */
  "go-s1": {
    goal: "Install Go, run Hello World, and understand go run versus go build.",
    links: [["Go official documentation", "https://go.dev/doc/"], ["A Tour of Go", "https://go.dev/tour/"]],
    lab: {
      t: "Environment Check",
      req: ["Verify the installation with go version", "Create hello.go printing a self-introduction", "Try both go run hello.go and go build"],
      hint: "go run executes directly; go build produces a binary."
    }
  },
  "go-s2": {
    goal: "Master Go's control flow and function features.",
    links: [["Effective Go · Control structures", "https://go.dev/doc/effective_go.html#control-structures"]],
    lab: {
      t: "BMI Calculator",
      req: ["Read height and weight", "Compute the BMI", "Print a verdict for the matching range"],
      hint: "Go has no while loop — for covers every loop form."
    }
  },
  "go-s3": {
    goal: "Master slices and maps in Go.",
    links: [["Go blog · Slices", "https://go.dev/blog/slices-intro"]],
    lab: {
      t: "Student Grade Manager",
      req: ["Store grades in a slice", "Map student names to grades with a map", "Compute the average and the maximum"],
      hint: "len(slice) gives the length; range iterates a map."
    }
  },
  "go-s4": {
    goal: "Understand Go's implicit interfaces and error handling.",
    links: [["A Tour of Go · Interfaces", "https://go.dev/tour/methods/9"]],
    lab: {
      t: "Shape Area Calculator",
      req: ["Define a Shape interface with an Area method", "Implement it for Circle and Rectangle", "Compute the area of every shape"],
      hint: "Go interfaces are satisfied implicitly — no implements keyword is needed."
    }
  },
  "go-s5": {
    goal: "Understand Go's concurrency model.",
    links: [["A Tour of Go · Concurrency", "https://go.dev/tour/concurrency/1"]],
    lab: {
      t: "Concurrent Downloader",
      req: ["Start several goroutines downloading concurrently", "Collect results through a channel", "Wait for all of them to finish"],
      hint: "channel receives a value; go starts a goroutine."
    }
  },
  "go-s6": {
    goal: "Build a web service with the standard library.",
    links: [["net/http", "https://pkg.go.dev/net/http"]],
    lab: {
      t: "HTTP API Server",
      req: ["Write a /hello endpoint with net/http", "Return a JSON response", "Test it with curl"],
      hint: "http.HandleFunc registers routes; http.ListenAndServe starts the server."
    }
  },
  "go-s7": {
    goal: "Get to know Go's engineering practices.",
    links: [["Go · Add a test", "https://go.dev/doc/tutorial/add-a-test"]],
    lab: {
      t: "Write Tests for a Function",
      req: ["Write an Add function", "Write a TestAdd function", "Run it with go test"],
      hint: "Test files end with _test.go; run them with go test."
    }
  }

  };

  window.I18N = window.I18N || {};
  window.I18N.stage_en = window.I18N.stage_en || {};
  Object.keys(EN).forEach(function (id) {
    var cur = window.I18N.stage_en[id] || {};
    var add = EN[id];
    // 不覆盖已有字段（本层只补齐缺口）
    if (!cur.goal && add.goal) cur.goal = add.goal;
    if (!cur.links && add.links) cur.links = add.links;
    if (!cur.lab && add.lab) cur.lab = add.lab;
    window.I18N.stage_en[id] = cur;
  });
})();
