/* ================================================================
 * R0:hello world · D33 第三批：阶段测评「扩容层」的英文（每章 9 题里下标 3~8 的 6 道）
 * 制作者 / Creator:    Bilibili 黄豆666 (huangdouplone)
 * 版权所有 / Copyright: (c) 2026 黄豆666 / huangdouplone. All rights reserved.
 * 隶属 / Series:        隶属于拾色造梦企划 EDU 系列
 *
 * 为什么单独一层：lang-data-*.js 每章只有 3 道原题，index.html 的合并 IIFE 会把
 * window.QUIZ_EXTRA（2 选择 + 2 判断 + 2 填空）追加到 s.quiz 尾部，所以渲染时真正的
 * 题池是 9 道。world-quiz-en.js 译的是下标 0~2，本层译 3~8，两层写进同一张
 * I18N.stage_en[id].quiz，靠「只补缺失」的合并语义互不覆盖。
 *
 * 判断题不给 o：judgeOpts() 按语言生成「正确 / 错误」选项，写死反而会和中文态打架。
 * 填空题只在可接受答案全是中文时才补 ans_en（直接写在 QUIZ_EXTRA 的题对象上，
 * 合并是同一引用的 concat，所以运行时补就有效）；答案本身就是 ASCII（venv、int）时
 * 英文态可直接输入，不需要另给。
 * ================================================================ */
(function () {
  var I = window.I18N, EX = window.QUIZ_EXTRA;
  if (!I || !I.stage_en || !EX) return;

  /* from = 题池里的起始下标（扩容层固定为 3）；条目不存在就新建，只填 quiz 字段 */
  function quizAt(id, from, arr) {
    var e = I.stage_en[id] || (I.stage_en[id] = {});
    e.quiz = (e.quiz && e.quiz.length) ? e.quiz : [];
    arr.forEach(function (x, i) {
      var k = from + i;
      if (!e.quiz[k] || !e.quiz[k].q) e.quiz[k] = x;
    });
  }
  function ansEn(id, idx, list) {
    var arr = EX[id];
    if (arr && arr[idx - 3] && !arr[idx - 3].ans_en) arr[idx - 3].ans_en = list;
  }

  /* ---------------- C: c-s1 ~ c-s10 ---------------- */
  quizAt("c-s1", 3, [
    { q: "In the compile-and-link pipeline, what does the link stage do?", o: ["Expands macros and header files", "Combines object files and libraries into an executable", "Translates the source into assembly", "Strips comments from the source"], why: "Linking stitches the .o files and libraries together, resolves symbol references and produces the executable." },
    { q: "What is the effect of #include <stdio.h> during preprocessing?", o: ["It runs the included file", "It declares a variable", "It allocates a block of memory", "It inserts the contents of that header at this spot"], why: "The preprocessor pastes the header's text verbatim into the current source file." },
    { q: "Running gcc hello.c -o hello produces an executable named hello.", why: "The -o flag names the output file; without it the result is called a.out." },
    { q: "A .o object file produced by the compiler is already a complete program you can run.", why: "An object file is only compiled and assembled; it still has to be linked before it can execute." },
    { q: "The gcc flag that only compiles and assembles, producing a .o file without linking, is -______.", why: "c stands for compile: it runs the first three stages and leaves the final link step to the linker." },
    { q: "The name of the function a C program starts executing in is ______.", why: "The operating system hands control to main, which is where execution begins." }
  ]);
  quizAt("c-s2", 3, [
    { q: "What is the result of the expression 3.0 / 2?", o: ["1 (integer truncation)", "1.5", "2", "A compile error"], why: "Once one operand is floating-point the other is converted too, so the result is 1.5." },
    { q: "On typical platforms, how many bytes does char occupy?", o: ["2", "4", "1", "8"], why: "The C standard defines sizeof(char) as exactly 1 byte." },
    { q: "In C, signed integer overflow is undefined behaviour whose result cannot be predicted.", why: "The standard classes it as UB, so the compiler may assume it never happens and optimise accordingly." },
    { q: "float and double have identical precision and differ only in notation.", why: "double carries more bits and higher precision, which is why scanf needs %lf for it." },
    { q: "The compile-time operator that yields the byte size of a type or variable is ______.", why: "sizeof is evaluated at compile time and returns a size_t; on an array it gives the total byte count." },
    { q: "In C, the comparison 0.1 + 0.2 == 0.3 evaluates to ______ (answer with true or false).", why: "Binary floating point cannot represent 0.1 and 0.2 exactly, so the sum differs from 0.3 by a tiny error and the test fails." }
  ]);
  quizAt("c-s3", 3, [
    { q: "How do you print a literal percent sign in a printf format string?", o: ["%", "%%", "\\%", "&%"], why: "% opens a conversion specifier, so a literal percent must be escaped as %%." },
    { q: "What does the & in scanf(\"%d\", &x) do?", o: ["Takes the absolute value", "Performs a bitwise AND", "Yields the address of the variable so scanf can write into it", "Declares a reference"], why: "scanf has to write the parsed value back, so it needs the variable's address." },
    { q: "Using %lf to print a double with printf is legal and behaves like %f.", why: "printf's %f already accepts a double; %lf is tolerated but is only required for scanf." },
    { q: "scanf(\"%d\", x) writes the number straight into the variable x, with no address needed.", why: "scanf requires the address to write the value back, so the call must pass &x." },
    { q: "The standard function that reads one character from standard input and returns an int is ______().", why: "The int return type is what lets EOF (usually -1) be distinguished from a real character." },
    { q: "In printf, the newline escape is written as a backslash followed by the letter ______.", why: "\\n is the newline character, so placing it inside the string breaks the line." }
  ]);
  quizAt("c-s4", 3, [
    { q: "How many times does the body of for (i = 0; i < 3; i++) run?", o: ["4", "3", "2", "0"], why: "i takes the values 0, 1 and 2, so the body runs three times." },
    { q: "Which is a defensible use of goto in production code?", o: ["Replacing every loop", "Declaring variables", "Implementing function overloading", "Escaping several levels of nesting and doing the cleanup in one place"], why: "One of the few legitimate uses of goto is leaving deep nesting and centralising error handling." },
    { q: "A switch case label must be an integer constant expression, never a variable.", why: "case values are resolved at compile time, so only constants (including character and enum constants) qualify." },
    { q: "Writing for(;;) is a syntax error, because the loop header needs at least a condition.", why: "All three parts of for may be omitted, so for(;;) is a well-formed infinite loop, usually paired with break." },
    { q: "The keyword that skips the rest of the current iteration and starts the next one is ______.", why: "continue ends only this pass; break terminates the whole loop." },
    { q: "The sum of all natural numbers from 1 to 100 is ______.", why: "Pairing ends gives (1+100) x 100 / 2 = 5050, the classic loop-accumulation exercise." }
  ]);
  quizAt("c-s5", 3, [
    { q: "What does a return type of void mean for a function?", o: ["It returns no value", "It returns the integer 0", "It returns any type", "It returns a null pointer"], why: "void means the function gives nothing back to its caller." },
    { q: "What happens when you declare a local variable as static inside a function?", o: ["It is reinitialised on every call", "It is initialised once and keeps its value between calls", "It becomes a global variable", "It can never be modified"], why: "A static local has static storage duration, so initialisation happens only once." },
    { q: "All C function arguments are passed by value, so changing a caller's variable inside a function requires passing a pointer.", why: "Passing by value copies, and editing the copy does nothing to the original; only a dereferenced pointer writes back." },
    { q: "register is a command that forces the compiler to put the variable in a CPU register.", why: "It is only a suggestion: the compiler may ignore it, and cases such as taking the address rule a register out." },
    { q: "The keyword that says a function has no return value is ______.", why: "As a return type, void means the function returns nothing." },
    { q: "The value of 5 factorial (5!) is ______.", why: "5! = 5 x 4 x 3 x 2 x 1 = 120, the entry-level exercise of the recursion chapter." }
  ]);
  quizAt("c-s6", 3, [
    { q: "What does the string literal \"hello\" contain at the very end in memory?", o: ["A newline character", "A terminating '\\0'", "Nothing extra at all", "Two terminator characters"], why: "C strings end with the null character '\\0', which strlen does not count." },
    { q: "What is the result of strlen(\"hi\")?", o: ["3", "0", "2", "1"], why: "strlen counts the characters before '\\0', which is 2." },
    { q: "In most expressions an array name decays into a pointer to its first element.", why: "Because it decays, sizeof inside a function cannot recover the real array length, so the length must be passed separately." },
    { q: "strlen(\"abc\") is 4 because it counts the terminating null character too.", why: "strlen excludes the terminator and returns 3; the one that includes it is sizeof." },
    { q: "The standard library function that measures a string length without the terminator is ______().", why: "It needs <string.h> and scans character by character until '\\0'." },
    { q: "C strings end with the null character, written as a backslash followed by the digit ______.", why: "'\\0' has the encoding value 0 and marks the end of a C string." }
  ]);
  quizAt("c-s7", 3, [
    { q: "What does dereferencing a NULL pointer do?", o: ["Safely returns 0", "Allocates memory automatically", "Causes undefined behaviour and usually crashes", "Returns NULL"], why: "Dereferencing a null pointer is undefined behaviour and crashes on most platforms." },
    { q: "For int a[3];, what is the relationship between a and &a[0]?", o: ["They are unrelated", "a denotes the address of the variable itself", "&a[0] is illegal", "They hold the same value, and a acts as a pointer to the first element"], why: "The array name decays into a pointer to the first element, whose value equals &a[0]." },
    { q: "Dereferencing the null pointer NULL is undefined behaviour that usually crashes immediately.", why: "A dereference requires a valid target, so checking for NULL before use is basic hygiene." },
    { q: "Subtracting two pointers of the same type gives the number of bytes between them.", why: "Pointer subtraction yields the number of elements, not bytes; for bytes you would cast to char* first." },
    { q: "What a pointer variable stores is another object's ______ (answer with the English word).", why: "A pointer's value is an address, and only after dereferencing with * do you get the content at that address." },
    { q: "When int occupies 4 bytes, adding 1 to int *p increases the address value by ______ bytes.", why: "Pointer arithmetic scales by the size of the pointed-to type, so an int pointer steps forward 4 bytes." }
  ]);
  ansEn("c-s7", 7, ["address"]);

  quizAt("c-s8", 3, [
    { q: "Which of these causes a memory leak?", o: ["Calling malloc and never freeing the block", "Setting the pointer to NULL after free", "Reading an uninitialised variable", "Reading past the end of an array"], why: "Allocated heap that is never released and whose pointer is lost becomes unreachable, which is a leak." },
    { q: "What is a dangling pointer?", o: ["A pointer that is NULL", "An uninitialised pointer", "A pointer to memory that has already been freed", "A pointer to a constant"], why: "The memory was freed while the pointer still holds the old address, so any further access is through a dangling pointer." },
    { q: "Memory obtained with malloc has to be released with free, otherwise it leaks.", why: "The lifetime of heap memory is the programmer's responsibility, and a missing free keeps the block reserved." },
    { q: "After calling free(p), the variable p automatically becomes NULL.", why: "free only returns the memory; it never touches the pointer variable, so you must null it yourself to avoid a dangling pointer." },
    { q: "The standard function that requests a given number of bytes on the heap is ______().", why: "malloc(size) returns a void*, may return NULL, and has to be checked before use." },
    { q: "When int occupies 4 bytes, calloc(4, sizeof(int)) reserves ______ bytes in total.", why: "calloc multiplies count by element size and additionally zeroes the whole block." }
  ]);
  quizAt("c-s9", 3, [
    { q: "What does typedef struct { int x, y; } Point; accomplish?", o: ["It defines a struct variable", "It names the struct type, so later you can just write Point", "It declares a function prototype", "It allocates a block of memory"], why: "typedef creates an alias for the type, so the struct keyword no longer has to be repeated." },
    { q: "What is enum best suited to represent?", o: ["A group of floating-point numbers", "An array of strings", "A set of function pointers", "A set of named integer constants"], why: "An enum names a cluster of related integer constants, which makes the code readable." },
    { q: "A struct's real size is affected by memory alignment and can exceed the sum of its member sizes.", why: "The compiler inserts padding for access efficiency, so sizeof is often larger than the hand calculation." },
    { q: "#include <stdio.h> and #include \"stdio.h\" search for the header in exactly the same order.", why: "Angle brackets search only the system directories; double quotes look in the current directory first, then the system ones." },
    { q: "The keyword used to give an existing type a new name is ______.", why: "The form is typedef old-type new-name;, commonly used to shorten structs and function pointers." },
    { q: "The macro #define PI 3.14 is expanded in which of the three stages (preprocessing / compilation / linking)? It is the ______ stage.", why: "Macro replacement belongs to preprocessing, before a single machine instruction exists." }
  ]);
  quizAt("c-s10", 3, [
    { q: "What does fclose do?", o: ["Deletes the file", "Empties the file's contents", "Closes the file and flushes its buffer", "Renames the file"], why: "fclose writes the buffered data out to disk and releases the file handle." },
    { q: "What does the declaration void (*fp)(int) introduce?", o: ["A function that returns a pointer", "A pointer to a function taking an int and returning void", "A pointer to an int", "An array of int"], why: "fp is a function pointer aimed at functions that accept one int and return void." },
    { q: "fclose's return value should be checked as well, otherwise unflushed buffered data can vanish silently.", why: "Data sits in the buffer and only reaches the file when fclose writes it; on failure it returns EOF, and that must be handled." },
    { q: "int *a[10] declares a pointer to an array of 10 ints.", why: "The [] binds first, so a is an array of 10 int pointers; a pointer to an array is written int (*a)[10]." },
    { q: "When fopen fails to open a file it returns ______.", why: "Failure is reported as NULL; from there you inspect errno, or call perror, to see why." },
    { q: "sprintf writes its formatted output into a string, whereas fprintf writes it into a ______.", why: "fprintf's first argument is a FILE* stream, so its destination is the open file." }
  ]);

  /* ---------------- Python py-s1 ~ py-s10 ---------------- */
  quizAt("py-s1", 3, [
    { q: "You want to type one line in the terminal and see the result at once. Which way do you use?", o: ["Write it into a .py file and run that", "The interactive interpreter (REPL)", "Compile it into an executable first", "Create a virtual environment first"], why: "The REPL executes each line as soon as you enter it, which suits quick experiments; logic that grows belongs in a script file." },
    { q: "What is the main purpose of giving every project its own virtual environment?", o: ["Making Python run faster", "Compiling the source to machine code", "Isolating dependencies so projects do not fight over package versions", "Generating code comments automatically"], why: "Each project keeps its own dependency set, which avoids the version conflicts a global install causes." },
    { q: "After activating an environment created with python -m venv venv, pip installs packages into the project directory rather than globally." , why: "That isolation is the whole point of a virtual environment: dependencies stay inside the project." },
    { q: "A Python source file must carry the .py extension, otherwise the interpreter cannot run it.", why: "The interpreter parses the file contents, so a script renamed to hello.txt still runs under python hello.txt." },
    { q: "The standard-library module used to create a virtual environment is ______.", why: "venv ships with the standard library and is invoked as python -m venv <directory>." },
    { q: "Python has no braces around code blocks; it relies on ______ instead.", why: "Indentation is part of the grammar, and every statement in the same block must line up with it." }
  ]);
  quizAt("py-s2", 3, [
    { q: "In Python 3, what does len() report for a string holding two Chinese characters?", o: ["4", "6", "2", "It raises an error"], why: "Python 3 strings count characters, not bytes, so two characters give 2." },
    { q: "What does the format specifier in f'{x:.2f}' produce?", o: ["Scientific notation for x", "Two significant digits of x", "x rounded to an integer", "A string with x fixed to two decimal places"], why: ".2f means fixed-point with two decimals, and the result is a string." },
    { q: "A Python variable has a fixed type, so once a string is assigned to it an integer cannot be.", why: "Python is dynamically typed: a name is just a label that follows whatever object it currently binds to." },
    { q: "The expression 1 == 1.0 evaluates to True.", why: "== compares values, so 1 and 1.0 are equal even though their types differ." },
    { q: "The built-in function that converts the string '3' into an integer is ______().", why: "int('3') gives 3; use float() for a float and str() for a string." },
    { q: "The value of the expression 3 ** 4 is ______.", why: "** is exponentiation, so 3 to the power of 4 is 81." }
  ]);
  quizAt("py-s3", 3, [
    { q: "What does for i in range(3): print(i, end=' ') output?", o: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], why: "range(3) yields 0, 1 and 2, which is three iterations." },
    { q: "What is the difference between continue and break?", o: ["continue ends this iteration and moves to the next, break ends the whole loop", "break ends this iteration, continue ends the whole loop", "They are exactly equivalent", "continue only works inside while"], why: "continue skips the rest of the current pass; break terminates the loop outright." },
    { q: "The else clause of a while loop runs when the loop is cut short by break.", why: "A loop's else runs only when the loop finishes normally; a break skips it." },
    { q: "In for...else, the else branch runs only if the loop was never broken out of.", why: "That is the idiom for search loops: break when you find it, handle the miss in else." },
    { q: "The keyword that skips the rest of the current iteration is ______.", why: "continue ends only that pass; break is what ends the entire loop." },
    { q: "The last number produced by range(1, 10, 3) is ______.", why: "The step is 3, giving 1, 4 and 7; the next value would be 10, which the half-open range excludes." }
  ]);
  quizAt("py-s4", 3, [
    { q: "After lst = [1, 2, 3]; lst.append([4, 5]), what is len(lst)?", o: ["5", "4", "3", "It raises an error"], why: "append adds the whole [4, 5] as a single element, so the length becomes 4; merging needs extend." },
    { q: "What is the key difference between a list and a tuple?", o: ["Tuples can only store numbers", "Lists are mutable, a tuple is fixed once created", "Lists cannot be sliced", "Tuples cannot be iterated"], why: "You can add, remove and change list items, while a tuple's contents never change." },
    { q: "Once a tuple has been created, its elements can no longer be modified.", why: "That immutability is exactly what lets a tuple serve as a dictionary key or a set member." },
    { q: "A list can be used directly as a dictionary key.", why: "Keys must be hashable and a mutable list is not; convert it to a tuple first." },
    { q: "Slicing a list with a[1:4] yields ______ elements.", why: "Slices are half-open, so indices 1, 2 and 3 are taken: three elements." },
    { q: "For the dictionary d = {'a': 1, 'b': 2}, len(d) is ______.", why: "len() on a dict returns the number of key-value pairs." }
  ]);
  quizAt("py-s5", 3, [
    { q: "In the signature def f(*args, **kwargs), what do args and kwargs collect?", o: ["A tuple of the extra positional arguments and a dict of the keyword ones", "A dict of keyword arguments and a tuple of positional ones", "Two lists", "Two dicts"], why: "*args gathers leftover positionals into a tuple, **kwargs the leftover keywords into a dict." },
    { q: "What is a closure?", o: ["A function that calls itself", "An inner function that keeps access to the enclosing function's variables even after it has returned", "A function written on a single line", "A function that reads global variables"], why: "The inner function carries the outer scope's bindings along with it." },
    { q: "Assigning to a global variable inside a function changes the global one even without a global declaration.", why: "Without the declaration you only create a same-named local; the global value is untouched." },
    { q: "A lambda body may only be a single expression, never a statement.", why: "So assignments and loops cannot appear inside a lambda, and anything involved needs a def." },
    { q: "The keyword used to define a function is ______.", why: "Functions are written as def add(a, b): ..." },
    { q: "When a mutable object such as a list is used as a default argument, that value is ______ across calls.", why: "Defaults are evaluated once, at definition time, so every call shares the same list and side effects accumulate." }
  ]);
  ansEn("py-s5", 8, ["shared", "sharing"]);

  quizAt("py-s6", 3, [
    { q: "What does if __name__ == '__main__': achieve?", o: ["It declares a global variable", "It imports every module in the current directory", "It defines the required main function", "It runs the code only when the file is executed directly, not when it is imported"], why: "__name__ is '__main__' when you run the file and the module name when it is imported, which separates the two scenarios." },
    { q: "After import math, how do you call the square-root function?", o: ["sqrt(2)", "math::sqrt(2)", "math.sqrt(2)", "Math.sqrt(2)"], why: "import math binds the module object, so its attributes are reached as math.sqrt." },
    { q: "Traditionally a Python package is a directory that contains an __init__.py file.", why: "__init__.py makes the interpreter treat the directory as a package; namespace packages came later as an extra mechanism." },
    { q: "After import math, writing sqrt(4) on its own calls the square-root function.", why: "It has to be qualified as math.sqrt(4); the bare name works only after from math import sqrt." },
    { q: "The pip subcommand that lists installed packages with exact versions, used to build a dependency list, is pip ______.", why: "pip freeze prints the installed set, which redirects straight into requirements.txt." },
    { q: "The built-in function that prints an object's help documentation is ______().", why: "help(obj) shows its docstring, while dir() lists its attribute names." }
  ]);
  quizAt("py-s7", 3, [
    { q: "What is the main benefit of with open(...) as f: over calling open and close by hand?", o: ["Reading goes faster", "The file is closed when the block ends, and is released correctly even if an exception is raised", "It converts the contents to a string automatically", "You can leave out the file path"], why: "A context manager guarantees the close whether the block exits normally or through an exception, which prevents resource leaks." },
    { q: "In a try / except / else structure, when does the else block run?", o: ["When the try block raises an exception", "Always, exception or not", "When the try block completes without raising", "Whenever an except clause has run"], why: "else runs only when the try body finished cleanly." },
    { q: "A with open(...) block closes the file when it ends, even if an exception was raised inside.", why: "with relies on a context manager, whose cleanup runs on both the normal and the exceptional exit path." },
    { q: "Writing a bare except: to catch every exception is the recommended best practice.", why: "A bare except also swallows KeyboardInterrupt and SystemExit, which hides the real failure." },
    { q: "To open a file for appending at the end, the mode argument is written as '______'.", why: "a means append: the file is created if missing and existing content is never overwritten." },
    { q: "The part of a try statement that always runs, exception or not, is the ______ block.", why: "finally holds the cleanup that has to happen regardless." }
  ]);
  quizAt("py-s8", 3, [
    { q: "Inside a class method, what does self refer to?", o: ["The current instance", "The class itself", "The parent class", "The containing module"], why: "self is the first parameter of an instance method and points at the instance the method was invoked on." },
    { q: "What are __str__ and __repr__ typically used for?", o: ["Defining addition and multiplication", "Defining length and comparison", "Defining whether the object is iterable", "Providing the user-facing and the developer-facing string form"], why: "__str__ is the readable output for users, __repr__ the unambiguous one for debugging." },
    { q: "Python supports multiple inheritance, and method lookup order is decided by the MRO.", why: "The MRO is computed by C3 linearisation, and super() walks exactly that order." },
    { q: "Instance attributes are defined in __init__, so their values can be read straight through the class name.", why: "They belong to concrete objects and need an instance; the class name only reaches class attributes." },
    { q: "The keyword used to define a class is ______.", why: "The form is class Name(Base): ..." },
    { q: "To work with the with statement an object must implement __enter__ and ______.", why: "__enter__ runs on entry, __exit__ on leaving, and the cleanup runs even when an exception is raised." }
  ]);
  quizAt("py-s9", 3, [
    { q: "What advantage does a generator have over building the whole list at once?", o: ["Random access to any index", "Lazy evaluation that yields one item at a time and saves memory", "It is always faster", "It supports in-place sorting"], why: "A generator produces values on demand, so a large stream never occupies all of memory at once." },
    { q: "In CPython, which workload do threads suit best?", o: ["CPU-bound computation", "I/O-bound work such as network and file waits", "Both equally well", "Neither"], why: "The GIL stops bytecode from executing in parallel, but I/O waits release it, so threads still pay off there." },
    { q: "A generator function pauses at yield, saves its state, and resumes from that point on the next request.", why: "That is how laziness is implemented: values arrive one at a time." },
    { q: "Because the GIL exists, Python threads are pointless in every scenario.", why: "The GIL only serialises bytecode execution; an I/O-bound program releases it while waiting, so threads remain useful." },
    { q: "Inside a generator, the keyword that emits one value and pauses is ______.", why: "The presence of yield in the body is what turns an ordinary function into a generator function." },
    { q: "For a non-blocking pause inside a coroutine, write await asyncio.______(1).", why: "asyncio.sleep returns control to the event loop, whereas time.sleep blocks the entire loop." }
  ]);
  quizAt("py-s10", 3, [
    { q: "What is the difference between is and ==?", o: ["They are exactly equivalent", "is checks whether it is the same object, == checks whether the values are equal", "is can only be used on numbers", "== compares memory addresses"], why: "is asks about identity and == about value; they only agree by accident for small integers and interned strings." },
    { q: "What is an assert statement for?", o: ["Catching every exception", "Declaring a constant", "Asserting that a condition holds and raising AssertionError when it does not, mostly as a development self-check", "Performing a type conversion"], why: "assert surfaces a violated assumption immediately during development." },
    { q: "Passing a mutable object into a function and modifying it inside is visible to the caller.", why: "Arguments are passed by object reference, so content changes show on both sides; rebinding the parameter would not." },
    { q: "In Python, is and == are fully interchangeable.", why: "== compares values while is compares identity, so they differ outside cached small integers and interned strings." },
    { q: "In a parameter type annotation, the symbol between the parameter name and its type is called a ______.", why: "The form is def f(x: int) -> int:, where the colon separates the name from the annotation." },
    { q: "The command that collects test_*.py files and runs the whole suite is ______.", why: "Running pytest in the project root is enough; no hand-written driver is needed." }
  ]);

  /* ---------------- C++: cpp-s1 ~ cpp-s10 ---------------- */
  quizAt("cpp-s1", 3, [
    { q: "What does #include <iostream> mainly provide?", o: ["printf and scanf", "std::cin and std::cout", "fopen and fclose", "String and Array"], why: "iostream supplies the stream input/output objects cin and cout." },
    { q: "What does using namespace std; mean?", o: ["It defines a new namespace", "It deletes the std namespace", "It is equivalent to #include <iostream>", "It brings the names from std into the current scope, so std:: can be omitted"], why: "After it, names inside the std namespace can be used directly in the current scope." },
    { q: "std::cout sends data to standard output through the << operator and may be mixed with printf.", why: "They can be mixed, but the buffer flush order needs care, so settling on one style is usually advised." },
    { q: "A C++ source file must use the .cpp extension; naming it .cc or .cxx makes compilation fail.", why: "The extension is only a convention: .cc, .cxx and .c++ are all accepted by mainstream compilers, and -x c++ forces the language anyway." },
    { q: "Every name in the C++ standard library lives in the namespace ______.", why: "That is why you either write std:: or pull individual names in with a using declaration." },
    { q: "To read a whole line, spaces included, you write std::______(std::cin, line).", why: "getline reads up to the newline, and combined with std::string it is safer than >>." }
  ]);
  quizAt("cpp-s2", 3, [
    { q: "After const int n = 5;, what is true of n?", o: ["It cannot be modified", "It can be reassigned", "It can only be changed through a pointer", "It is re-evaluated on every use"], why: "A const variable cannot change once initialised." },
    { q: "What is the key difference between a reference and a pointer?", o: ["A reference may be null", "A pointer may not be NULL", "A reference must be initialised and can never be rebound, while a pointer may be null and can be retargeted", "They are exactly equivalent"], why: "A reference is an alias fixed at binding time; a pointer is itself an object that may be null or retargeted." },
    { q: "A reference has to be initialised where it is defined and cannot later be bound to another object.", why: "A reference is an alias, so the binding is fixed; rebinding semantics require a pointer." },
    { q: "A constexpr variable only has its value computed at program run time.", why: "constexpr demands compile-time evaluation, which is exactly why it can serve as an array length or template argument." },
    { q: "The keyword that declares a compile-time constant usable as an array length is ______.", why: "constexpr guarantees evaluation at compile time, a stronger promise than plain const." },
    { q: "The type-safe null pointer literal that has replaced NULL since C++11 is ______.", why: "nullptr has its own type std::nullptr_t, so it cannot accidentally match an integer overload." }
  ]);
  quizAt("cpp-s3", 3, [
    { q: "What separates for (auto x : v) from for (auto &x : v)?", o: ["The first copies each element so changes do not touch the container; the second is a reference and can modify the original", "The first can modify the container and the second cannot", "They are exactly equivalent", "The second fails to compile"], why: "auto x is a copy of the element, while auto& x refers to the element itself." },
    { q: "What does the form if (int x = f(); x > 0) accomplish?", o: ["It is a syntax error", "It declares and initialises a variable inside the condition, whose scope is limited to that if", "It declares a global variable", "It is equivalent to a for statement"], why: "C++ lets you declare inside the if condition, which narrows the scope and reuses the value." },
    { q: "In a range-for over a container, writing the element type as a const reference avoids one needless copy.", why: "A const reference both skips the copy and prevents accidental modification, which is the recommended read-only form." },
    { q: "C++ allows a std::string to be used directly as the controlling expression of a switch.", why: "switch only accepts expressions convertible to an integer, so strings need an if-else chain or a hash lookup." },
    { q: "To destructure a pair into two variables you write auto [a, ______] = p.", why: "The names go in the brackets in order, and their count must match the number of members." },
    { q: "Since C++11 the loop that walks container elements directly is called the range-______ loop.", why: "Written as for (const auto& x : c), it handles the begin and end iterators for you." }
  ]);
  quizAt("cpp-s4", 3, [
    { q: "What advantage does std::function have over a bare function pointer?", o: ["It is definitely faster at runtime", "It needs no header", "It can store any callable, including lambdas and function objects", "It can only store function pointers"], why: "std::function is a general wrapper for callables and can hold many different kinds." },
    { q: "What capture style does the lambda [&](){} use?", o: ["It captures nothing", "It captures every variable by value", "It captures only this", "It captures the external variables it uses by reference"], why: "[&] means every outside variable the body touches is captured by reference." },
    { q: "Overloading looks only at the parameter list, so a different return type alone does not create an overload.", why: "Overload resolution is based on the number and types of parameters; differing only in return type is a redefinition error." },
    { q: "A variable captured by value can be modified inside the lambda body by default.", why: "By-value captures are const inside the body unless the lambda is marked mutable." },
    { q: "A lambda expression begins with a pair of ______ that holds the capture list (name them in English).", why: "The form is [&x](int a){ return a + x; }, and the capture style decides which outer names are reachable." },
    { q: "Writing the keyword ______ at the end of a function declaration promises that it does not throw.", why: "noexcept is both a promise and a testable property, and it strongly affects things like move construction." }
  ]);
  ansEn("cpp-s4", 7, ["square brackets", "brackets"]);

  quizAt("cpp-s5", 3, [
    { q: "What is a constructor for?", o: ["It initialises the members as the object is created", "It destroys the object and frees resources", "It copies an existing object", "It overloads an operator"], why: "The constructor runs at birth and establishes a valid initial state." },
    { q: "Once the base class destructor is declared virtual, what happens when a derived object is deleted through a base pointer?", o: ["Only the base destructor runs", "The derived destructor runs first, then the base one, which prevents resource leaks", "It fails to compile", "It is always undefined behaviour"], why: "A virtual destructor guarantees the whole inheritance chain is destroyed according to the dynamic type." },
    { q: "A constructor has no return type, not even void.", why: "It shares the class name and declares no return type at all; writing void there is a syntax error." },
    { q: "A destructor can be overloaded like an ordinary function, so several versions may exist.", why: "There is exactly one destructor, with no parameters and no return type, so it cannot be overloaded." },
    { q: "Inside a member function, the pointer that names the address of the current object itself is ______.", why: "this is the implicit pointer argument that points at the object the member was called on." },
    { q: "In C++ the default access level for members of a struct is ______ (answer with public or private).", why: "struct defaults to public and class defaults to private, which is the only substantive difference between them." }
  ]);
  quizAt("cpp-s6", 3, [
    { q: "What does writing a virtual function as = 0 mean?", o: ["The function is deleted", "Derived classes may not override it", "It is pure virtual, making the class abstract", "It is declared inline"], why: "A pure virtual function has no implementation, and any class holding one cannot be instantiated directly." },
    { q: "What is the virtual function table (vtable) for?", o: ["Storing all member variables", "Speeding up compilation", "Managing memory automatically", "Deciding at run time which version of a virtual function to call, i.e. dynamic binding"], why: "The vtable is what makes a call through a base pointer or reference dispatch to the right override at run time." },
    { q: "Calling a virtual function through a base-class pointer can end up in the derived class's implementation because of the vtable.", why: "That is dynamic binding: at run time the object's real type selects the version." },
    { q: "Assigning a derived object to a base object slices it, but polymorphism still works afterwards.", why: "Slicing keeps only the base part and discards the derived data and overrides, so polymorphism is lost." },
    { q: "To keep the destruction chain complete when a derived object is deleted through a base pointer, the base destructor should be declared as a ______ function.", why: "Only a virtual destructor triggers dynamic binding; otherwise just the base destructor runs and resources leak." },
    { q: "The keyword used in a derived class to state explicitly that this overrides a base virtual function is ______.", why: "A signature mismatch then fails to compile, which prevents the 'I thought I overrode it' bug." }
  ]);
  quizAt("cpp-s7", 3, [
    { q: "What is template <typename T> T max(T a, T b)?", o: ["A function template, instantiated per argument type at compile time", "A macro definition", "A set of overloaded functions", "A virtual function"], why: "The template generates concrete function instances from the argument types at compile time." },
    { q: "What is the main benefit of constraining template parameters with concepts?", o: ["Faster runtime", "Fewer headers", "Clear type requirements and readable compile errors at compile time, replacing opaque SFINAE", "Support for multiple inheritance"], why: "Concepts spell out what a type must satisfy, so failures are reported in terms you wrote." },
    { q: "Calling a function template normally does not require writing the type explicitly, because the compiler deduces it from the arguments.", why: "That is the convenience of generics; you only write <int> and the like when deduction fails." },
    { q: "A template's declaration and definition should be split into a .h and a .cpp file like an ordinary function's.", why: "Instantiation needs to see the full definition, so templates normally live entirely in the header." },
    { q: "The keyword used to declare a template is ______.", why: "The form is template<typename T> immediately followed by the function or class definition." },
    { q: "The C++20 feature that states type requirements on template parameters is called ______.", why: "Concepts turn 'what the type must satisfy' into reusable named constraints." }
  ]);
  quizAt("cpp-s8", 3, [
    { q: "What is the average cost of inserting at the back of a vector?", o: ["O(n)", "Amortised O(1)", "O(log n)", "O(n log n)"], why: "push_back is amortised constant time, with the occasional reallocation moving elements." },
    { q: "Which algorithm is the usual choice for finding a value in a container?", o: ["std::sort", "std::copy", "std::find", "std::fill"], why: "std::find scans the range linearly for the target value." },
    { q: "Pushing elements into a vector while iterating it can invalidate your iterators.", why: "Growth reallocates the buffer, which invalidates every existing iterator and reference." },
    { q: "Elements in a std::map are stored in insertion order.", why: "map keeps its elements ordered by key (ascending by default); preserving insertion order requires a different container." },
    { q: "The standard algorithm that sorts an entire container is std::______.", why: "std::sort(v.begin(), v.end()) sorts ascending unless you pass a comparator." },
    { q: "The member function that returns an iterator to the container's first element is ______().", why: "begin() and end() form the half-open range that every standard algorithm takes as input." }
  ]);
  quizAt("cpp-s9", 3, [
    { q: "What happens when a shared_ptr's reference count reaches zero?", o: ["The object is kept anyway", "An exception is thrown", "The pointer is set to NULL", "The managed object is released"], why: "shared_ptr counts owners, and the last one to die frees the resource." },
    { q: "What is the main gain from move semantics?", o: ["Transferring ownership of resources instead of paying for a deep copy", "Shorter code", "Automatic locking", "A guarantee of thread safety"], why: "Move steals the resources rather than duplicating them, which cuts the cost of passing large objects." },
    { q: "A unique_ptr cannot be copied, but its ownership may be transferred with std::move.", why: "Exclusive ownership means it is movable but not copyable, and the source pointer is left empty." },
    { q: "std::move physically relocates the object's data into the destination.", why: "std::move only casts an lvalue to an rvalue reference; the actual transfer is done by the move constructor or assignment." },
    { q: "The smart pointer that represents exclusive ownership is std::______.", why: "It adds no overhead and releases the resource automatically when it leaves scope." },
    { q: "The weak-reference smart pointer used to break shared_ptr cycles is std::______.", why: "weak_ptr does not increase the reference count; it observes without owning and can safely test whether the object still lives." }
  ]);
  quizAt("cpp-s10", 3, [
    { q: "After a throw with no matching catch, what does the program do?", o: ["Ignores the exception and continues", "Calls std::terminate and ends the program", "Returns a default value", "Generates a catch automatically"], why: "An uncaught exception leads to std::terminate, so the process stops." },
    { q: "What characterises std::lock_guard?", o: ["You must lock and unlock by hand", "It may only guard reads", "It locks on construction and unlocks on destruction (RAII), so you cannot forget", "It is itself a thread"], why: "lock_guard binds acquire and release to the scope, so the mutex is freed even when an exception unwinds the stack." },
    { q: "Catching an exception by reference avoids object slicing and keeps the complete derived type.", why: "Catching by value slices a derived exception down to the base object, so the catch clause loses the derived information." },
    { q: "The volatile keyword guarantees visibility and atomicity between threads.", why: "volatile only stops the compiler optimising away reads and writes; thread synchronisation requires a mutex or an atomic type." },
    { q: "The synchronisation primitive that guards a critical section so only one thread enters at a time is std::______.", why: "Paired with std::lock_guard it locks and unlocks automatically, so the release cannot be forgotten." },
    { q: "Since C++11 the standard class used to create a thread is std::______.", why: "std::thread t(f, args...) starts on construction, and you must join or detach before it is destroyed." }
  ]);

  /* ---------------- Java: java-s1 ~ java-s10 ---------------- */
  quizAt("java-s1", 3, [
    { q: "How do the commands javac and java divide the work?", o: ["javac runs bytecode, java compiles source", "Both compile", "javac compiles the source into bytecode, java runs that bytecode", "Both just run programs"], why: "javac produces the .class bytecode and java starts a JVM to execute it." },
    { q: "What does 'write once, run anywhere' mainly rely on?", o: ["The JVM: bytecode runs on a JVM on any platform", "The compiler adapting itself to each operating system", "Rewriting the source per platform", "Special support in the OS kernel"], why: "Java compiles to platform-neutral bytecode, and each platform's JVM carries out the execution." },
    { q: "Compiling a Java source file with javac produces a .class bytecode file.", why: "The bytecode is platform neutral and each platform's JVM translates it, which is what 'write once, run anywhere' means." },
    { q: "A JVM can only run programs written in Java; other languages cannot target the JVM.", why: "Anything that compiles to valid bytecode runs, which is why Kotlin, Scala and Groovy are JVM languages." },
    { q: "The extension of the bytecode file produced from a Java source file is .______.", why: "javac Hello.java generates Hello.class, which you then run with java Hello." },
    { q: "The tool package that contains both the compiler and the runtime, and that you must install to develop, is abbreviated ______.", why: "The JDK bundles the JRE plus javac and the other development tools; to only run programs the JRE suffices." }
  ]);
  quizAt("java-s2", 3, [
    { q: "What is autoboxing?", o: ["The compiler picking a type for a variable", "The automatic conversion between a primitive and its wrapper class, such as int and Integer", "Automatic locking", "Automatic importing of needed packages"], why: "The compiler converts between a primitive and its wrapper whenever one is required." },
    { q: "What is the cost of concatenating Strings repeatedly inside a loop?", o: ["Each concatenation creates a new object, so it is expensive", "It mutates in place and is the fastest option", "The concatenation cannot complete", "It throws an exception"], why: "String is immutable, so every join allocates a new object; a loop should use StringBuilder instead." },
    { q: "Java's int type is 32 bits on every platform and does not change with the operating system.", why: "Fixed primitive sizes are a cornerstone of Java's cross-platform consistency." },
    { q: "Comparing two Integer objects with == always gives the same answer as equals does.", why: "== compares references, and only the cached objects from -128 to 127 happen to match; value comparison needs equals." },
    { q: "The primitive type that holds one 16-bit Unicode character in Java is ______.", why: "char takes 2 bytes, and character literals are written in single quotes." },
    { q: "The wrapper method that turns a string into an integer is Integer.______(\"42\").", why: "parseInt returns an int, while valueOf returns an Integer object." }
  ]);
  quizAt("java-s3", 3, [
    { q: "What is the loop form for (int x : arr) { ... } called?", o: ["An ordinary for loop", "A do-while loop", "The enhanced for (for-each)", "A switch expression"], why: "It is Java's enhanced for, which walks an array or collection element by element." },
    { q: "What happens when a break is missing from a switch statement?", o: ["Fall-through: the following case clauses keep executing", "A compile error", "The whole method exits immediately", "An exception is thrown"], why: "Without break the control flow keeps running into the next case label." },
    { q: "Since Java 14 the switch expression form case X -> does not fall through.", why: "The arrow form needs no break and the whole construct can also produce a value as an expression." },
    { q: "Java's enhanced for lets you safely remove elements from a collection while iterating it.", why: "It is built on an iterator, so modifying the collection mid-iteration raises ConcurrentModificationException." },
    { q: "The keyword that terminates an entire loop immediately is ______.", why: "break ends the loop; continue only moves on to the next iteration." },
    { q: "To compare the contents of two strings in Java you call their ______ method.", why: "== compares references while equals compares content; for a case-insensitive test use equalsIgnoreCase." }
  ]);
  quizAt("java-s4", 3, [
    { q: "What does it mean that String is immutable?", o: ["Its content can be changed freely", "It can only store digits", "Once created its content never changes, and every apparent edit returns a new string", "It cannot be compared with other strings"], why: "Because the content is fixed, operations such as concatenation and replacement all hand back a new object." },
    { q: "What separates arr.length from s.length()?", o: ["Arrays use the field length, strings use the method length()", "They are identical", "Arrays use length() and strings use the field length", "Neither is legal"], why: "An array's length is a field, while a string's length is a method call." },
    { q: "Once a String object has been created its content cannot be changed.", why: "Strings are immutable, so each concatenation allocates a new object, which is why loops use StringBuilder." },
    { q: "StringBuilder is thread-safe while StringBuffer is not.", why: "It is the other way round: StringBuffer's methods are synchronised and therefore thread-safe, while StringBuilder is unsynchronised and faster." },
    { q: "The name of the field that gives an array's length is ______.", why: "Arrays use the length field, String uses the length() method, and collections use size()." },
    { q: "When a loop concatenates many strings you should reach for the ______ class.", why: "It keeps a mutable character buffer internally, so you avoid thousands of temporary String objects." }
  ]);
  quizAt("java-s5", 3, [
    { q: "What is method overloading?", o: ["A subclass replacing a parent method", "Same method name with a different parameter list in one class", "A method calling itself", "Anything that differs only in return type"], why: "Overloads are distinguished by the parameter list; a different return type alone is not an overload." },
    { q: "Where can a member marked private be accessed?", o: ["From anywhere", "From subclasses", "From other classes in the same package", "Only inside its own class"], why: "private is the strictest level and is visible only within the declaring class." },
    { q: "Java has only one argument-passing mechanism, which is pass by value.", why: "Even for reference types you pass a copy of the reference, so reassigning the parameter inside a method does not affect the caller." },
    { q: "Inside a static method you may use the this keyword directly.", why: "A static method belongs to the class and is not tied to any object, so there is no this." },
    { q: "A Java source file may contain at most one class marked ______, and the file must be named after it.", why: "The compiler enforces this for the public class, while other non-public classes may share the file." },
    { q: "The operator used to create an object in Java is ______.", why: "new allocates the memory, invokes a constructor and returns a reference to the object." }
  ]);
  quizAt("java-s6", 3, [
    { q: "Before Java 8, what kinds of methods could an interface declare?", o: ["Only abstract methods, with no body", "Methods that must have a body", "Only static ones", "Only private ones"], why: "Early interface methods were all abstract; default and static methods only arrived with Java 8." },
    { q: "What is the @Override annotation for?", o: ["It forces the program to compile", "It makes the compiler check that a parent or interface method really is overridden", "It marks the method static", "It serialises the object"], why: "@Override is a compile-time check, so a misspelled method name is caught at once." },
    { q: "Methods in an interface are public abstract by default even when you write no modifiers.", why: "That is the default, and since Java 8 default and static methods may additionally supply an implementation." },
    { q: "Java allows a class to extend several parent classes at once.", why: "Classes extend only one parent; the need for multiple inheritance is expressed by implementing several interfaces." },
    { q: "The keyword a subclass constructor uses to invoke the parent constructor is ______.", why: "A super(...) call has to be the first statement in the subclass constructor." },
    { q: "After overriding equals you normally also override the ______ method to keep the contract intact.", why: "Equal objects must have equal hash codes, otherwise lookups in HashSet and HashMap fail." }
  ]);
  quizAt("java-s7", 3, [
    { q: "What defines a checked exception?", o: ["An exception that only appears at runtime", "One that must be caught or declared thrown, or the code will not compile", "One that can never happen", "One that may only extend RuntimeException"], why: "The compiler insists that a checked exception is handled or declared." },
    { q: "What is the key difference between List and Set?", o: ["Set is ordered and allows duplicates", "List forbids duplicates", "List is ordered and permits duplicates, while Set holds no duplicates", "They are equivalent"], why: "List is about order and repetition, Set about uniqueness." },
    { q: "A checked exception must either be caught or declared in the method signature.", why: "That is a mandatory compiler check and the fundamental difference from RuntimeException." },
    { q: "Into a collection declared as List<? extends Number> you may add an Integer.", why: "The extends bound only guarantees that reads produce a Number; writing is forbidden, following PECS for producers." },
    { q: "The keyword of the block that handles an exception is ______.", why: "try watches, catch handles, and finally wraps up." },
    { q: "At the end of a try-with-resources block the resource's ______() method is called automatically.", why: "Anything implementing AutoCloseable is closed for you, so no hand-written finally is needed." }
  ]);
  quizAt("java-s8", 3, [
    { q: "What are BufferedReader and BufferedWriter mainly for?", o: ["Encrypting data", "Compressing files", "Buffering reads and writes to cut the number of I/O calls and raise throughput", "Serialising objects"], why: "Buffering reduces the underlying read and write calls, which markedly improves I/O performance." },
    { q: "Why does a class implement the Serializable interface?", o: ["So its objects can be turned into a byte stream for storage or transfer", "To convert a file into a string", "To encrypt the object", "To speed up program start-up"], why: "Serialisation encodes the object state into bytes, which can be written to a file or sent over a network." },
    { q: "Wrapping an input stream in a BufferedReader to read line by line is far more efficient than reading a FileInputStream one byte at a time.", why: "Buffering cuts the number of system calls, and line reading also spares you from handling newlines yourself." },
    { q: "The object returned by Files.readAllLines keeps the file handle open and must be closed explicitly.", why: "It returns a List<String>, with everything already loaded and the stream closed; only Files.lines, which returns a Stream, must be closed." },
    { q: "The basic class for reading binary data in Java is File______Stream.", why: "FileInputStream works on bytes and suits images, archives and any other binary data." },
    { q: "The NIO.2 interface that represents a file location is called ______.", why: "A Path is created with Paths.get or Path.of and used together with the Files utility class." }
  ]);
  quizAt("java-s9", 3, [
    { q: "What does synchronized do?", o: ["It makes a thread sleep for a while", "It guarantees only one thread enters the critical section at a time, i.e. mutual exclusion", "It creates a new thread", "It raises a thread's priority"], why: "synchronized uses a monitor lock to serialise access to the critical section." },
    { q: "What is the main benefit of using a thread pool (ExecutorService)?", o: ["Tasks become sequential", "It forbids concurrency", "It reuses threads and caps the concurrency level, avoiding constant thread creation and teardown", "It locks automatically"], why: "A pool keeps existing threads alive and manages the queue and the degree of concurrency for you." },
    { q: "volatile guarantees visibility but not the atomicity of a compound operation such as i++.", why: "Visibility comes from memory barriers; atomicity still needs synchronized or AtomicInteger." },
    { q: "Calling the run() method of a Thread starts a new thread.", why: "run() is just an ordinary method call; only start() creates and schedules a new thread." },
    { q: "The method that submits a task to a pool and hands back a Future is called ______.", why: "submit returns a Future you can read the result from, whereas execute only accepts a void task." },
    { q: "To wait until another thread has finished you call that thread's ______() method." , why: "join blocks the current thread until the target thread terminates." }
  ]);
  quizAt("java-s10", 3, [
    { q: "Which kind of Stream operation are filter and map?", o: ["Constructors", "Intermediate operations that return a new Stream and are evaluated lazily", "Terminal operations that execute at once", "Exception handlers"], why: "filter and map are intermediate; the pipeline only runs when a terminal operation is reached." },
    { q: "What must a lambda expression be paired with?", o: ["An abstract class", "A generic class", "An enum", "A functional interface, i.e. one with exactly one abstract method"], why: "A lambda's target has to be a functional interface." },
    { q: "Stream intermediate operations are lazy: the whole pipeline only executes when a terminal operation arrives.", why: "That lets map and filter be fused into a single traversal, which is more efficient." },
    { q: "Any interface with methods in it can be implemented with a lambda expression.", why: "A lambda may only target a functional interface, meaning one with exactly one abstract method." },
    { q: "The package of the immutable date and time types introduced in Java 8 is java.______.", why: "Under java.time, types such as LocalDate and Instant are immutable and thread-safe." },
    { q: "The JVM mechanism that reclaims objects no longer referenced is abbreviated ______.", why: "GC decides liveness by reachability analysis and frees unreachable heap objects." }
  ]);

  /* ---------------- JavaScript: js-s1 ~ js-s8（js-s9 的原题在 world-quiz-en.js 里） ---------------- */
  quizAt("js-s1", 3, [
    { q: "What is the key difference between var and let?", o: ["let is block scoped while var is function scoped and is hoisted", "var is block scoped", "They are exactly equivalent", "A let variable cannot be reassigned"], why: "let obeys the enclosing block, whereas var belongs to the function and is hoisted." },
    { q: "What is the result of '1' + 1?", o: ["The number 2", "The string \"11\"", "NaN", "It throws an error"], why: "With a string operand, + becomes concatenation, so the number 1 is converted to a string first." },
    { q: "Properties of an object declared with const can still be changed afterwards.", why: "const forbids rebinding the name to another object; the object's own properties are unrestricted." },
    { q: "let and var behave identically and only differ in name.", why: "let is block scoped with a temporal dead zone, while var is function scoped and hoisted as undefined." },
    { q: "The keyword that declares a variable you will never reassign is ______.", why: "Use let when reassignment is needed, and drop var entirely." },
    { q: "In JS the strict equality operator is written as three ______ (name the symbol in English).", why: "=== compares value and type together, which avoids the traps of implicit coercion." }
  ]);
  ansEn("js-s1", 8, ["equals signs", "equal signs", "equals"]);

  quizAt("js-s2", 3, [
    { q: "How does an arrow function differ from a normal function regarding this?", o: ["An arrow function has no this of its own and inherits the one from the enclosing scope", "Ordinary functions cannot use this at all", "Arrow functions cannot take parameters", "There is no difference"], why: "It never binds this but captures the enclosing one at definition time, which is why it is a poor fit as an object method." },
    { q: "What separates a function declaration from a function expression?", o: ["A declaration is hoisted and may be called before it is defined", "An expression is hoisted", "Both are hoisted", "Neither is hoisted"], why: "The whole declaration is hoisted, while an expression is usable only after its assignment has run." },
    { q: "An arrow function has no this of its own and captures the this of the surrounding scope.", why: "That is what makes it ideal for callbacks, since the var self = this workaround is no longer needed." },
    { q: "When iterating array elements you should prefer for...in, which hands you the element value at each index.", why: "for...in iterates keys, which for an array means indices; iterating values is for...of." },
    { q: "To iterate array element values rather than indices, prefer the for...______ form.", why: "for (const v of arr) gives the value directly and still supports break and continue." },
    { q: "The operator that spreads an array into separate call arguments is written as three ______ (name it in English).", why: "fn(...arr) is the most common use of the spread operator, which also shallow-copies arrays." }
  ]);
  ansEn("js-s2", 8, ["dots", "periods", "full stops"]);

  quizAt("js-s3", 3, [
    { q: "What does [1,2,3].filter(x => x > 1) return?", o: ["[1]", "true", "2,3", "[2,3]"], why: "filter keeps the elements for which the callback returns true, i.e. 2 and 3." },
    { q: "What does the spread form ...arr do?", o: ["Expands an array or object into individual items, which is handy for shallow copies and merging", "Reads the array length", "Deletes an element", "Sums the elements"], why: "Spread unpacks an iterable, which is exactly what copying and merging need." },
    { q: "Using the spread operator ... to copy an object performs a shallow copy.", why: "Nested objects stay the same reference, so a deep copy requires something like structuredClone." },
    { q: "Calling map on an array also rewrites the elements of the original array.", why: "map returns a new array and leaves the original untouched; only manual assignment inside forEach mutates it." },
    { q: "The method that transforms every element and returns a new array is ______.", why: "map is a one-to-one transform; use filter to select and reduce to accumulate." },
    { q: "The method that turns a JavaScript object into a JSON string is JSON.______.", why: "The reverse direction is JSON.parse, and the pair is what localStorage normally stores through." }
  ]);
  quizAt("js-s4", 3, [
    { q: "What does document.querySelector('.a') return?", o: ["An array of every matching element", "The first matching element, or null if there is none", "A string", "A boolean"], why: "querySelector yields the first match and null when nothing matches." },
    { q: "What does addEventListener('click', fn) do?", o: ["Fires a click immediately", "Deletes the element", "Registers fn as the element's click handler", "Blocks click events"], why: "It attaches the handler to the element so it is called when the event occurs." },
    { q: "Because of event bubbling, a listener on an ancestor can react to an event fired on a descendant.", why: "Bubbling is what makes event delegation possible; call stopPropagation when you do not want it." },
    { q: "document.querySelector returns an array holding every matching element.", why: "It returns only the first match; you need querySelectorAll to get them all." },
    { q: "To cancel an element's default behaviour, such as a link navigation, call the event's ______() method.", why: "It is nearly always required when handling form submissions and link clicks." },
    { q: "The name of the method that selects one element by id is document.getElement______Id.", why: "You write document.getElementById('title'), though querySelector('#title') does the same job." }
  ]);
  quizAt("js-s5", 3, [
    { q: "What does an async function always return?", o: ["A Promise", "A plain synchronous value", "undefined", "A callback function"], why: "The return value of an async function is wrapped in a Promise automatically." },
    { q: "Which are the three states of a Promise?", o: ["start, run, end", "pending, fulfilled, rejected", "open, close, error", "idle, busy, done"], why: "A Promise starts as pending and can only settle into fulfilled or rejected." },
    { q: "Once a Promise moves from pending to fulfilled its state can never change again.", why: "Settlement is irreversible, and only whichever of resolve and reject arrives first takes effect." },
    { q: "When fetch receives a 500 response the catch branch runs straight away.", why: "An HTTP error status is not a network failure, so you must inspect res.ok and raise it yourself." },
    { q: "The keyword that waits for a Promise's result is ______.", why: "await may only appear inside an async function, where it suspends the rest until the value settles." },
    { q: "Calling a function declared with async always hands back a ______ object.", why: "Even a plain return value is wrapped into an already-settled Promise." }
  ]);
  quizAt("js-s6", 3, [
    { q: "Which module systems do import and require each come from?", o: ["Both from CommonJS", "Both from ES Modules", "import from ES Modules, require from CommonJS", "Both are global functions"], why: "import and export are ES module syntax, while require and module.exports belong to CommonJS." },
    { q: "What is a class fundamentally in JavaScript?", o: ["A brand new kind of type", "Syntax sugar over prototype inheritance", "A product of functional programming", "A macro definition"], why: "class wraps prototype-based inheritance in clearer syntax." },
    { q: "A JS class is essentially syntax sugar over prototype chain inheritance.", why: "The methods still live on the prototype; class only makes the syntax resemble classical object orientation." },
    { q: "A JS class supports genuine multiple inheritance.", why: "A class may extend only one parent; reusing several sources takes a mixin composition instead." },
    { q: "The keyword that exposes a name from an ES module is ______.", why: "Either export const a = 1 or export default, and the consumer brings it in with import." },
    { q: "The keyword that pulls another module into an ES module is ______.", why: "import { a } from './m.js' reads a named export, while import x from reads the default one." }
  ]);
  quizAt("js-s7", 3, [
    { q: "What is the effect of location.href = 'https://...'?", o: ["It reads the current page address", "It changes the page title", "It navigates to the given URL", "It clears the browser cache"], why: "Assigning to location.href triggers a page navigation." },
    { q: "After a fetch request, which call reads the JSON payload?", o: ["res.data", "res.get()", "res.body", "res.json(), or res.text()"], why: "fetch gives you a Response, whose body still has to be parsed with json() or text()." },
    { q: "localStorage can only store strings, so an object has to be serialised first.", why: "Storing an object directly coerces it to '[object Object]', so JSON.stringify is required." },
    { q: "Data in localStorage is cleared automatically when the browser closes.", why: "localStorage persists across sessions; the per-session store is sessionStorage." },
    { q: "The function that drives animation in step with the refresh rate, smoother than setInterval, is ______AnimationFrame.", why: "requestAnimationFrame runs its callback before each painted frame and pauses when the page is hidden." },
    { q: "The API function modern browsers use to make a network request is ______()." , why: "fetch returns a Promise and is far more concise than the older XMLHttpRequest." }
  ]);
  quizAt("js-s8", 3, [
    { q: "What separates dependencies from devDependencies in package.json?", o: ["The first are runtime dependencies, the second are only needed while developing and building", "The first are development dependencies, the second runtime ones", "They are the same", "The second must be committed to the repository"], why: "Runtime dependencies ship with the product, while development dependencies are installed locally only." },
    { q: "What does debouncing do?", o: ["Makes a function fire repeatedly at once", "Raises the rendering frame rate", "Collapses a burst of triggers into one call after the input stops, cutting needless work", "Caches request results"], why: "Debounce waits for the quiet moment and then runs once, which is what a search box wants." },
    { q: "package-lock.json records the exact versions of the dependency tree and should be committed to version control.", why: "It guarantees that every teammate and CI job installs precisely the same versions." },
    { q: "Debouncing and throttling describe the same idea under two names.", why: "Debouncing waits until the triggers stop and then runs once; throttling runs at most once per fixed interval." },
    { q: "One of the development build tools used today for fast start-up and bundling is ______ (for instance vite or webpack).", why: "vite builds on native ESM for a very quick cold start and uses Rollup for production builds." },
    { q: "The package manager command that installs a project's dependencies is ______ install.", why: "npm install reads package.json and puts every dependency into node_modules." }
  ]);

  /* ---------------- C#: cs-s1 ~ cs-s7（cs-s8 的原题在 world-quiz-en.js 里） ---------------- */
  quizAt("cs-s1", 3, [
    { q: "What does var mean in C#?", o: ["A dynamic type resolved at run time", "The compiler infers the type, and the program stays statically typed", "It is the same as object", "It means untyped"], why: "var only saves typing: the type is inferred from the initialiser at compile time and still checked." },
    { q: "What does the type int? express?", o: ["An arbitrarily large integer", "A pointer to int", "A nullable int, which may hold null", "An array of int"], why: "The ? suffix lets a value type represent the absence of a value." },
    { q: "C# code is compiled into IL, which the .NET runtime then executes.", why: "The runtime just-in-time compiles the IL into native instructions on first execution." },
    { q: "C# can only be developed and run on Windows.", why: "Modern .NET is cross-platform, so you can develop and deploy on Linux and macOS as well." },
    { q: "The command that creates a console project is dotnet new ______.", why: "dotnet new console generates the project skeleton including Program.cs." },
    { q: "The name of the entry method of a C# console program is ______.", why: "It is usually written as static void Main(string[] args)." }
  ]);
  quizAt("cs-s2", 3, [
    { q: "How do out and ref differ?", o: ["They are exactly equivalent", "ref does not require a value before the call", "An out argument needs no value beforehand but must be assigned inside the method, while ref requires it to be assigned first", "out may only be used for return values"], why: "out means the method supplies the value, ref means an already initialised variable is passed in and may be changed." },
    { q: "Which keyword is recommended for walking an array's elements?", o: ["for", "foreach", "while", "switch"], why: "foreach iterates the elements directly, which is shorter and avoids index overruns." },
    { q: "A ref argument must definitely be assigned before the call.", why: "Since ref means pass-in-and-possibly-modify, the compiler insists the caller supplies a value first." },
    { q: "Inside a foreach loop over a collection you may reassign the current element.", why: "The foreach iteration variable is read-only; to modify elements use a for loop with an index." },
    { q: "The keyword that passes an argument by reference so the method can modify the caller's variable is ______.", why: "Both ref and out pass by reference; out simply does not require prior initialisation." },
    { q: "To compare the contents of two strings, prefer the instance method ______(\"abc\").", why: "In C# == already compares values, but Equals states the intent explicitly and lets you supply a comparison rule." }
  ]);
  quizAt("cs-s3", 3, [
    { q: "Which method appends an element to a List<int>?", o: ["push", "insert", "append", "Add"], why: "List<T> uses Add to append at the end." },
    { q: "Which call reads a dictionary safely, without throwing when the key is absent?", o: ["TryGetValue", "The indexer dict[key]", "Add", "Remove"], why: "TryGetValue reports success through its boolean result instead of throwing." },
    { q: "A Dictionary<TKey, TValue> may not contain duplicate keys.", why: "Adding the same key twice throws ArgumentException; overwriting needs an indexer assignment." },
    { q: "List<T>.Add returns the element it has just added.", why: "Add returns void; it only appends the element to the end." },
    { q: "The method that removes the first matching element from a List<T> is ______.", why: "Remove takes a value, while RemoveAt takes an index." },
    { q: "The LINQ method that selects elements matching a condition is ______.", why: "Written as nums.Where(n => n > 0), and it returns a lazy sequence." }
  ]);
  quizAt("cs-s4", 3, [
    { q: "Which token expresses class inheritance in C#?", o: ["extends", "::", "->", ":"], why: "The colon serves both for the base class and for the interface list." },
    { q: "Which keyword does a subclass need to override a parent's virtual method?", o: ["new", "virtual", "override", "ref"], why: "The parent marks it virtual and the subclass supplies the override." },
    { q: "A C# class can inherit from only one parent class but may implement several interfaces.", why: "Single inheritance plus multiple interfaces is how C# balances simplicity and flexibility." },
    { q: "An interface may declare instance fields.", why: "Interfaces describe a contract and cannot hold instance fields, though properties, methods and events are fine." },
    { q: "The symbol C# uses to express inheritance is the ______.", why: "The form is class Dog : Animal, and interfaces are listed after the same colon." },
    { q: "The keyword that forbids a class from being inherited is ______.", why: "A sealed class cannot be derived from, and sealed override stops further overriding." }
  ]);
  quizAt("cs-s5", 3, [
    { q: "What does await correctly do?", o: ["Blocks the current thread until the task finishes", "Suspends the async method until the task completes, without blocking the thread", "Creates a new thread", "Cancels the running task"], why: "await hands control back to the caller and resumes the rest of the method once the task is done, so no thread is occupied." },
    { q: "What is a using statement block for?", o: ["Importing a namespace", "Declaring a variable", "Releasing an IDisposable resource automatically", "Taking a lock"], why: "Leaving the scope calls Dispose for you, so the resource is always freed." },
    { q: "An async method should return Task or Task<T>, leaving async void only for event handlers.", why: "async void cannot be awaited and its exceptions have nowhere to go, which can bring the process down." },
    { q: "await Task.WhenAll blocks the current thread until every task has finished.", why: "It is an asynchronous wait: control is returned rather than a thread occupied, and the method resumes after all complete." },
    { q: "The keyword of the statement that guarantees an IDisposable resource is released after use is ______.", why: "The end of a using block calls Dispose automatically, equivalent to a try/finally." },
    { q: "An async method that produces no result declares its return type as ______.", why: "A bare Task means 'it will complete later'; use Task<T> when a value is returned." }
  ]);
  quizAt("cs-s6", 3, [
    { q: "What characterises File.ReadAllText?", o: ["It reads line by line", "It loads the whole text file into one string", "It reads binary content", "It writes a file"], why: "ReadAllText pulls in the entire text at once, which suits smaller files." },
    { q: "Which class does C# normally use for regular expressions?", o: ["String", "Math", "Convert", "System.Text.RegularExpressions.Regex"], why: "Regex supplies matching, replacement and grouping." },
    { q: "File.WriteAllText overwrites everything the target file already contained.", why: "Appending needs File.AppendAllText, otherwise the previous content is cleared." },
    { q: "Calling JsonSerializer.Serialize requires you to write the type argument explicitly.", why: "The generic parameter is inferred from the object you pass in, so most calls need no explicit type." },
    { q: "The method that writes all the text to a file in one call is File.______Text.", why: "Its counterpart ReadAllText reads the whole file in one call." },
    { q: "The .NET type that represents an elapsed interval is ______.", why: "Writing TimeSpan.FromMinutes(5) is far clearer than computing seconds by hand." }
  ]);
  quizAt("cs-s7", 3, [
    { q: "Compared with an ordinary class, what does a record do by default?", o: ["Compares by value and generates boilerplate such as ToString", "Compares by reference", "Cannot define properties", "Cannot be inherited"], why: "Records default to value equality, which suits immutable data." },
    { q: "What do you gain by enabling nullable reference types such as string?", o: ["The runtime fills in null for you", "Types become value types", "Better runtime performance", "The compiler warns about possible nulls, reducing NullReferenceException"], why: "Nullable reference types move the question 'may this be null?' into compile-time checking." },
    { q: "A record automatically implements value-based equality.", why: "Two records are equal when their members are, so you never hand-write Equals and GetHashCode." },
    { q: "By default a record's properties may be freely modified after construction.", why: "A positional record generates init-only properties, so the instance is immutable once created." },
    { q: "The discard symbol used for the default arm of a switch expression is named the ______ in English.", why: "Written as _ => fallback, it means whatever the value is, this arm takes it." },
    { q: "The reference-type keyword introduced in C# 9 for immutable data types is ______.", why: "record carries value semantics and a generated ToString, which is ideal for passing data around." }
  ]);
  ansEn("cs-s7", 7, ["underscore"]);

  /* ---------------- Go: go-s1 ~ go-s7（go-s8 的原题在 world-quiz-en.js 里） ---------------- */
  quizAt("go-s1", 3, [
    { q: "What does go fmt (gofmt) do?", o: ["Compiles the program", "Downloads dependencies", "Formats the code automatically to the official style", "Runs the unit tests"], why: "gofmt enforces one house style, and Go code is expected to be formatted by it." },
    { q: "After declaring var x int without assigning, what is x?", o: ["0, the zero value of its type", "nil", "A random value", "Undefined"], why: "Every Go variable starts at its type's zero value, and for int that is 0." },
    { q: "go build produces an executable while go run compiles and executes without leaving a binary behind.", why: "During development go run is the convenience; for delivery go build gives you the binary." },
    { q: "Go lets you declare a variable you never use without a compile error.", why: "Unused variables and unused imports are compile errors in Go, which keeps the code clean." },
    { q: "The command that initialises a module is go mod ______.", why: "go mod init plus the module path generates go.mod, which records the path and the dependencies." },
    { q: "The package a Go program's entry point must live in is called ______.", why: "Only package main together with func main() forms a runnable program." }
  ]);
  quizAt("go-s2", 3, [
    { q: "What happens to a declared but unused variable or import in Go?", o: ["It only warns", "It is a compile error", "It is silently ignored", "It crashes at run time"], why: "Go classes unused variables and imports as compile errors, which pushes you to keep the code tidy." },
    { q: "To discard one of several return values you use?", o: ["The asterisk *", "null", "The blank identifier _", "Empty parentheses ()"], why: "The blank identifier throws away a value you do not need." },
    { q: "Go functions may return several values, the classic case being the result together with an error.", why: "Multiple results make error handling an explicit second return value rather than an exception." },
    { q: "Because defer runs after the function has returned, it cannot modify named return values.", why: "defer runs after the return values are set but before the function really returns, so named results can still be changed." },
    { q: "The only looping keyword in Go is ______.", why: "There is no while; writing for with a condition is the while form." },
    { q: "The keyword that postpones a call until the function is about to return is ______.", why: "It is used for closing files and unlocking, and several defers run in last-in-first-out order." }
  ]);
  quizAt("go-s3", 3, [
    { q: "What does a slice's capacity cap measure?", o: ["The current number of elements", "The total bytes of the backing array", "The maximum length available in the backing array measured from the slice's start", "The number of deleted elements"], why: "cap counts from the slice's offset to the end of the backing array, and exceeding it allocates a new array." },
    { q: "What is the key difference between a value receiver and a pointer receiver?", o: ["A pointer receiver can modify the original while a value receiver works on a copy", "A value receiver can modify the original", "They are equivalent", "A value receiver cannot declare methods"], why: "A value receiver receives a copy, so its changes never reach the caller's variable." },
    { q: "Writing into a map that was never initialised triggers a panic.", why: "A nil map has no backing hash table, so you must create it with make first." },
    { q: "A Go slice is exactly the same as an array, since both have a fixed length.", why: "An array's length is part of its type and fixed, while a slice is a variable-length descriptor holding a pointer to a backing array." },
    { q: "The built-in function that adds elements to the end of a slice is ______.", why: "append may grow into a new backing array and returns the resulting slice, so you must keep the return value." },
    { q: "The built-in function that creates a slice, map or channel is ______.", why: "make is only for those three; other types are allocated with new." }
  ]);
  quizAt("go-s4", 3, [
    { q: "What is the mainstream error-handling style in Go?", o: ["Using try / catch", "Returning error as the last value and checking it explicitly", "Catching everything with panic", "Ignoring errors"], why: "Go returns error explicitly and checks it immediately, so failures cannot hide." },
    { q: "What are errors.Is and errors.As for?", o: ["Creating new errors", "Printing error messages", "Ignoring errors", "Testing whether an error matches a particular value or type"], why: "They walk the error chain to compare values and extract types." },
    { q: "Go interfaces are implemented implicitly, with no implements keyword.", why: "Any type with the full method set satisfies the interface automatically, which is the duck-typing part." },
    { q: "In Go a panic can be caught with a try/catch statement.", why: "There is no try/catch; recover combined with defer intercepts a panic instead." },
    { q: "The built-in interface type that represents an error in Go is named ______.", why: "Implementing the method Error() string satisfies the error interface." },
    { q: "The two-result form v, ok := x.(T) is usually called the comma-______ form.", why: "It reports a failed assertion by setting ok to false rather than panicking." }
  ]);
  quizAt("go-s5", 3, [
    { q: "How do sending and receiving relate on an unbuffered channel?", o: ["The sender never blocks", "They must rendezvous, so the sender blocks until a receiver is ready", "It depends entirely on the buffer size", "It is fully asynchronous"], why: "An unbuffered channel requires both sides to be ready at once, which is precisely its synchronising effect." },
    { q: "What is a select statement used for?", o: ["Conditional branching", "Declaring an interface", "Multiplexing across several channel operations and running whichever is ready first", "Looping over an array"], why: "select is a switch for channels: it waits on multiple communications at once." },
    { q: "A channel should be closed by the sender.", why: "That is the convention; sending to a closed channel panics, while receiving from one returns the zero value immediately." },
    { q: "Several goroutines reading and writing the same map at once is safe.", why: "The built-in map is not concurrency-safe, so you need a lock or sync.Map, otherwise the runtime reports it." },
    { q: "The keyword that launches a goroutine is ______.", why: "go f(x) returns immediately while f runs in a new goroutine in the background." },
    { q: "The sync primitive that waits for a group of goroutines to finish is sync.______.", why: "Add counts up, Done counts down, and Wait blocks until the counter reaches zero." }
  ]);
  quizAt("go-s6", 3, [
    { q: "What is http.HandlerFunc essentially?", o: ["An interface", "An adapter type that turns an ordinary function into an http.Handler", "A struct field", "A third-party package"], why: "HandlerFunc is a function type that implements ServeHTTP, so plain functions can serve as handlers." },
    { q: "What is context.WithTimeout used for?", o: ["Creating concurrent threads", "Setting an HTTP status code", "Attaching a deadline to a request and cancelling it automatically when the time is up", "Encoding a struct as JSON"], why: "It derives a context with a deadline, which is how timeouts and cancellation propagate." },
    { q: "http.ListenAndServe takes a listening address and a handler.", why: "Passing nil for the handler uses the DefaultServeMux." },
    { q: "The net/http package cannot serve a web site on its own and always needs a third-party framework.", why: "net/http contains a complete server implementation; frameworks merely wrap conveniences such as routing." },
    { q: "Metadata attached to a struct field, such as its JSON name, is written in backquotes and called a ______.", why: "The form is Name string `json:\"name\"`, which reflection reads at run time." },
    { q: "The standard library function that starts an HTTP server is http.______(addr, handler).", why: "It listens and blocks, returning an error when it fails." }
  ]);
  quizAt("go-s7", 3, [
    { q: "Which files does go test run by default?", o: ["Every .go file", "Files ending in _test.go", "main.go only", "Files under a test directory"], why: "Go's convention is that tests live in files named _test.go." },
    { q: "What must a benchmark function's name start with?", o: ["Test", "Bench", "Perf", "Benchmark"], why: "Benchmarks are written as BenchmarkXxx(*testing.B)." },
    { q: "A Go test file has to end with _test.go.", why: "go test collects only those files, and test functions start with Test and take a *testing.T." },
    { q: "The go vet command runs the unit tests.", why: "go vet performs static analysis; tests run under go test, with coverage as go test -cover." },
    { q: "The command that runs every test in the current package is go ______.", why: "Adding -v prints the detail of each case." },
    { q: "The special directory name that forces package privacy, allowing imports only inside the same module, is ______.", why: "Packages under internal/ cannot be imported by code outside the module." }
  ]);
})();

