/* ============================================================
 * lang-i18n-content.js —— 课程正文英文翻译
 * 挂载：window.I18N.lesson_en[lessonId] = {summary, pit, ex, target, out, deep, recap, code?}
 * 版权：bilibili 黄豆666 / huangdouplone
 * ============================================================ */
window.I18N = window.I18N || {};
window.I18N.lesson_en = {

/* ==================== Python · Stage 1 ==================== */
"py-1-1":{
  summary:["Python is an interpreted, dynamically typed high-level language whose syntax reads almost like pseudocode.","Where it shines: data processing & analysis, AI, web backends, automation scripts and ops tooling.","Learning order: get it running → master core syntax → build small tools with the stdlib → then frameworks & engineering."],
  pit:"Don't stress about \"Python is too slow\" — it's usually the fastest path from idea to reality; optimize locally only when you actually hit a bottleneck.",
  ex:{q:"Name one task around you that Python could automate.",a:"Batch-renaming files, organizing Excel reports, auto-downloading slides, scheduled reminders — anything repetitive with rules is worth automating."},
  target:"You can explain what Python is, what it's good at, and have run your first line of code.",
  out:"Hello, Python!",
  deep:["Python was released by Guido van Rossum in 1991; its design philosophy of \"readability counts\" is in import this.","\"Interpreted\" doesn't mean \"no compilation\": Python compiles to bytecode first (.pyc), then the interpreter runs it — transparent to you.","Python 3 and Python 2 are incompatible; 3.0 (2008) was the watershed. New projects always use Python 3; Python 2 reached end-of-life in 2020."],
  recap:"Python = interpreted + dynamic typing + readability-first, one of the fastest ways to turn ideas into code.",
  code:`# Your first line of Python
print("Hello, Python!")
# Interpreted: write it and run it, no compile step needed`
},
"py-1-2":{
  summary:["Install Python 3.x from python.org or Miniconda; on Windows, check \"Add python.exe to PATH\".","Verify with python --version; install third-party packages with pip.","Create a dedicated venv per project: python -m venv .venv; activate before installing to avoid version clashes."],
  pit:"When multiple Pythons are installed, python and pip may point to different versions; using python -m pip install is the safest bet.",
  ex:{q:"Why does every project need its own virtual environment?",a:"Different projects may depend on different versions of the same package. Isolation keeps them apart and makes requirements.txt reproducible."},
  target:"Install Python, create a virtual environment, and successfully install a third-party package.",
  out:"(terminal shows installed package list, e.g. requests 2.31.0)",
  deep:["How venv works: it copies/symlinks the interpreter and points site-packages to the project dir; activation just modifies PATH.","pip freeze writes requirements.txt but pins transitive deps too; pip-tools or Poetry pin only direct deps.","conda vs venv: conda manages non-Python libraries (MKL, CUDA) — more convenient for data science."],
  recap:"One venv per project; confirm (.venv) in your prompt before pip install.",
  code:`python -m venv .venv
# Windows activate:  .venv\\Scripts\\activate
# macOS/Linux:       source .venv/bin/activate
pip install requests
pip list`
},
"py-1-3":{
  summary:["REPL: type python in the terminal to get >>> — great for testing snippets and acting as a calculator.","Script mode: write code in a .py file and run python hello.py — the reusable, shareable way.","Recommended editors: VS Code (with Python extension) or PyCharm."],
  pit:"In the >>> REPL, you must press Enter twice after compound statements; variables linger — restart if results look stale.",
  ex:{q:"When do you use the REPL vs writing a script?",a:"REPL for verifying syntax and trying a function; anything reusable, shareable, or maintainable goes in a .py file."},
  target:"You can verify a line in the REPL and create & run a .py file.",
  out:"Hello, Python",
  deep:[">>> is the primary prompt; ... is the continuation prompt, meaning you're still writing the same block.","In the REPL, _ holds the last expression's result; scripts don't have this.","Scripts run top-to-bottom; wrapping entry code in if __name__ == \"__main__\": lets it both run and be imported."],
  recap:"REPL to experiment; .py files to keep; production code always goes in files.",
  code:`# hello.py
name = "Python"
print("Hello,", name)
# Run in terminal: python hello.py`
},
"py-1-4":{
  summary:["Python uses indentation (4 spaces) for blocks instead of {} — wrong indentation is a syntax error.","Comments use #; triple-quoted strings at module/function top are docstrings readable via help().","Follow PEP 8: snake_case variables, UPPER_CASE constants, spaces around operators, ~79–100 chars per line."],
  pit:"Don't mix spaces and tabs — it causes TabError; set your editor to \"Tab inserts 4 spaces\".",
  ex:{q:"What happens if you remove the indent under an if?",a:"IndentationError or a logic bug — indentation IS Python syntax, not just style."},
  target:"You can write a small script with correct indentation, naming, and comments.",
  out:"12.56636",
  deep:["Indentation can be spaces or tabs but must be consistent within a file; PEP 8 mandates 4 spaces.","Docstrings live in the function's __doc__; help() and documentation tools read them.","Comments explain WHY, not WHAT — the code already shows what it does."],
  recap:"Indentation is syntax; comments explain why; naming follows PEP 8.",
  code:`PI = 3.14159   # constants are UPPER_CASE

def area(r):
    """Compute circle area — this is a docstring"""
    return PI * r ** 2

print(area(2))`
},

/* ==================== Python · Stage 2 ==================== */
"py-2-1":{
  summary:["A variable is a name-to-object binding; no type declaration needed — assignment creates it.","The same name can rebind to a different type at any time — that's dynamic typing.","Use type(x) to see the type, id(x) to see object identity."],
  pit:"Dynamic doesn't mean \"no types\": types are real. \"1\" + 1 raises TypeError; you must convert explicitly.",
  ex:{q:"After a = 1; b = a; a = 2, what is b?",a:"b is still 1. Variables hold references to objects; rebinding a doesn't affect what b points to."},
  target:"You can create variables, reassign them, and inspect types with type().",
  out:"<class 'str'>",
  deep:["Variables are name→object bindings — think of them as labels on objects; one object can have many names.","a = b doesn't copy data; it makes a point to the same object b points to.","del a deletes the name, not the object; objects are reclaimed when refcount hits zero."],
  recap:"Variables are labels, not boxes; assignment rebinds."
},
"py-2-2":{
  summary:["Numbers: int (arbitrary precision), float (double), complex; common ops + - * / // ** %.","Single or double quotes work; triple quotes span lines; + concatenates, * repeats, [] indexes characters.","Strings are immutable: any \"modification\" creates a new string."],
  pit:"0.1 + 0.2 == 0.3 is False — binary floating-point imprecision; compare with abs(a-b) < 1e-9 or use the decimal module.",
  ex:{q:"Why isn't 0.1+0.2 equal to 0.3?",a:"Decimal fractions are repeating in binary and can only be approximated. Use tolerance for float comparison; use Decimal for finance."},
  target:"You can use numeric operators, concatenate strings, get lengths, and index characters.",
  out:"3 1 1024\nPythonPython 8 P",
  deep:["int is arbitrary precision — it can hold 10^1,000,000 if memory allows, unlike fixed-size C/Java integers.","String immutability means concatenation creates new objects; use join() in loops.","Negative indexing: s[-1] is the last char; slice s[::-1] reverses in one step."],
  recap:"int is unbounded, str is immutable; use join() for concat, slicing to reverse."
},
"py-2-3":{
  summary:["Comparisons return bool: == != < <= > >=; Python supports chaining 18 <= age < 60.","Logical ops: and / or / not (not && || !).","Falsy values: False, 0, 0.0, \"\", [], {}, None; everything else is truthy."],
  pit:"Check for None with `if x is None`, not `if x == None`; check truthiness directly with `if x`, not `if x == True`.",
  ex:{q:"[] and None are both falsy in if — are they the same?",a:"No. An empty list is \"a container with nothing in it\"; None is \"nothing at all\". Use `is None` to distinguish."},
  target:"You can write conditions like \"age between 18 and 60\" and understand falsy rules.",
  out:"True\n(with empty input, name becomes 'anonymous')",
  deep:["and/or return operands themselves, not booleans: a or b returns a if a is truthy — handy for defaults.","not always returns True/False; use bool(x) to coerce any value strictly.","Chained comparison 18 <= age < 60 is equivalent to 18 <= age and age < 60, but the middle expression evaluates once."],
  recap:"Falsy list: False / 0 / empty containers / None; use `is None` for null checks."
},
"py-2-4":{
  summary:["int() / float() / str() / bool() convert explicitly; remember input() always returns a string.","Failed conversion raises ValueError; wrap in exception handling or validate first.","Prefer f-strings: f\"{name} is {age}\"; use {x:.2f} to control decimal places."],
  pit:"input() gives you a string; comparing it directly to an int raises TypeError — convert with int() first.",
  ex:{q:"What happens with int(\"3.14\")?",a:"ValueError. A decimal string needs float(\"3.14\") first, or just round()."},
  target:"You can read numbers, compute with them, and format output with f-strings.",
  out:"Next year you'll be 19\n3.14\n1,234,567",
  deep:["f-strings (Python 3.6+) evaluate at runtime; you can write {a+b}, {f(x)}, even {x:>10} for alignment.","Format spec cheat sheet: {x:.2f} two decimals, {x:>8} right-aligned width 8, {x:06d} zero-pad to 6, {x:,} thousands.","int(x) truncates toward zero; use round() for rounding — note round() uses banker's rounding."],
  recap:"input() always needs conversion; f-strings for output."
},

/* ==================== Python · Stage 3 ==================== */
"py-3-1":{
  summary:["if condition: requires a colon; the block is defined by indentation.","elif can repeat; else is optional; only the first matching branch runs.","Conditions needn't be bool — any object is evaluated by truthiness rules."],
  pit:"Don't write `if 60 <= score < 90 and >= 80` — Python requires full comparisons each time, or use chaining.",
  ex:{q:"If multiple elif conditions are true, how many branches run?",a:"Only the first true one — then it skips the rest. Order conditions from strictest to loosest."},
  target:"You can write a multi-tier grade rating like A/B/C/D.",
  out:"Pass",
  deep:["if/elif/else is one statement — only the first matching branch runs, then it jumps past the whole chain.","Non-boolean conditions work (truthiness), but explicit comparisons are more readable.","Python 3.10+ adds match/case for structural pattern matching; simple branches still use if."],
  recap:"Only the first true branch runs; order strict → loose."
},
"py-3-2":{
  summary:["for x in iterable: loops over elements — Python's primary loop form.","range(a, b, s) generates integers [a, b) step s.","enumerate gives index+value; zip iterates multiple sequences in parallel."],
  pit:"range(5) is 0..4, not including 5; count backward with range(4, -1, -1).",
  ex:{q:"What's the most Pythonic way to sum 1 to 100?",a:"sum(range(1, 101)). Use built-ins instead of hand-writing accumulation loops."},
  target:"You can use for + range for counted loops and sequence traversal.",
  out:"1\n2\n3\n0 a\n1 b\n2 c",
  deep:["range is lazy: it doesn't build a list, just records start/stop/step; range(10**9) uses no memory.","for calls next() on the iterator, so it works on any iterable — files, generators, dicts.","Don't mutate a list while iterating it (elements get skipped); iterate over a copy: for x in lst[:]."],
  recap:"range is half-open; use enumerate for index, zip for parallel iteration."
},
"py-3-3":{
  summary:["while condition: for loops whose end depends on a condition.","break exits the whole loop; continue skips to the next iteration.","for/while can have an else: it runs only if the loop wasn't broken out of."],
  pit:"while True must have a break exit or it loops forever; use Ctrl+C to escape a stuck loop.",
  ex:{q:"When does a loop's else clause run?",a:"When the condition naturally becomes false (normal exit); it does NOT run if break was used — great for \"not found\" cases."},
  target:"You can write a \"enter 0 to exit\" interactive loop and use break/continue.",
  out:"1\n3",
  deep:["continue in a for loop advances normally, but in a while loop it skips your update statement — a classic infinite-loop trap.","while...else is the most overlooked syntax: it runs only when the loop exits normally.","break exits one level; to break out of nested loops, wrap in a function and use return, or use a flag variable."],
  recap:"break exits the loop, continue skips this round; remember to update while conditions."
},
"py-3-4":{
  summary:["List comprehension [expr for x in seq if cond] builds a list in one line — concise and usually faster.","Dict and set comprehensions exist too; nested loops work in one line but don't go beyond two levels.","Common patterns: accumulate, filter, find min/max, group-count (with dict or Counter)."],
  pit:"Don't force complex logic into one line for its own sake; readability first; beyond two nesting levels, use a regular loop.",
  ex:{q:"How do you count character frequency in a text?",a:"collections.Counter(text) is easiest; manually: d[c] = d.get(c, 0) + 1."},
  target:"You can use comprehensions instead of \"build empty list + append\" loops.",
  out:"[0, 1, 4, 9, 16]\n[0, 2, 4, 6, 8]\n{'hi': 2, 'hello': 5}",
  deep:["if in a comprehension is a filter (after for); ternary goes before for: [x if x>0 else 0 for x in nums].","Comprehensions have their own scope (Python 3); loop variables don't leak out.","Dict comprehensions + Counter are your two counting tools; Counter.most_common(n) gives the top n."],
  recap:"Use comprehensions for one-line containers, but keep nesting to two levels max."
},

/* ==================== Python · Stage 4 ==================== */
"py-4-1":{
  summary:["Lists use []; elements can be mixed types; they're ordered and mutable.","Common methods: append / pop / insert / remove / sort / reverse / extend.","Index from 0, supports negative indices; slice a[1:4:2] yields a new list."],
  pit:"List assignment is by reference: b = a means modifying b also changes a. Use a.copy(), list(a), or a[:] for a copy.",
  ex:{q:"a=[1,2]; b=a; b.append(3) — what is a?",a:"a is now [1, 2, 3]. b and a point to the same list; use explicit copy for independence."},
  target:"You can add/remove/modify/list elements and use slicing flexibly.",
  out:"1 4 [2, 3]",
  deep:["Lists are dynamic arrays: append is amortized O(1), but insert(0, x) is O(n) — use collections.deque for frequent front inserts.","sort() sorts in place and returns None; sorted() returns a new list — this \"in-place returns None\" convention is consistent in Python.","Slice assignment a[1:3] = [...] can change list length — a powerful in-place replacement tool."],
  recap:"list is ordered & mutable; use copy() for a duplicate, never plain assignment."
},
"py-4-2":{
  summary:["Tuples are ordered, immutable, use () — often for fixed-structure records.","Unpacking a, b = (1, 2) and *rest collects leftovers — a Python idiom.","Because they're immutable, tuples can be dict keys and passed safely between functions."],
  pit:"A single-element tuple must be written (1,) — (1) is just the integer 1 with parentheses.",
  ex:{q:"A tuple is immutable, but what if it holds a list?",a:"The tuple can't swap elements, but the list's contents can change. Immutable means the reference is fixed, not the object's contents."},
  target:"You can use tuples for coordinates/records and unpacking to swap variables.",
  out:"(no output; x=3, y=4)",
  deep:["Tuple immutability makes them hashable, so they can be dict keys (e.g. grid[(x, y)] = value).","Unpacking requires matching counts; a, b = b, a works because the right side evaluates first.","collections.namedtuple combines tuple lightness with readable field names — a struct alternative."],
  recap:"Tuples = fixed-structure records; single-element tuple needs a trailing comma."
},
"py-4-3":{
  summary:["Dicts are hash-table key-value mappings, average O(1) lookup, use {}.","Add/update: d[k] = v; safe get with d.get(k, default); pop; `in` checks keys.","Iterate with keys() / values() / items(); Python 3.7+ preserves insertion order."],
  pit:"d[\"x\"] on a missing key raises KeyError; use get() or check `if k in d` when unsure.",
  ex:{q:"How do you count each element in a list?",a:"Accumulate: d[x] = d.get(x, 0) + 1, or just collections.Counter(lst)."},
  target:"You can use dicts as counters and mappings with safe value access.",
  out:"a 1\nb 2\nc 3\n0",
  deep:["Dict keys must be hashable (immutable and implement __hash__), so list can't be a key but tuple can.","items() gives key+value in one loop — faster and cleaner than keys() + indexing.","setdefault and defaultdict are perfect for \"create an empty container if the key doesn't exist\" scenarios."],
  recap:"dict lookup is O(1); use get() for safe access, items() for iteration."
},
"py-4-4":{
  summary:["Sets are unordered, unique; support intersection/union/difference: & | - ^ — great for dedup and fast membership.","Strings are immutable sequences; common methods: split / join / strip / replace / find / upper / startswith.","Three formatting tools: f-string (recommended), str.format, % (legacy)."],
  pit:"Empty set must be set() — {} is an empty dict; set elements must be hashable (lists can't go in).",
  ex:{q:"Deduplicate a list while preserving order?",a:"list(dict.fromkeys(lst)) — dict keys are unique and preserve insertion order."},
  target:"You can use sets for dedup and membership, and split/join strings proficiently.",
  out:"{1, 2, 3} True\n['a', 'b', 'c']\na-b",
  deep:["Sets are hash-table based: `in` is O(1) vs O(n) for lists — check membership with a set on large data.","join is split's inverse and only joins strings; map(str, ...) for non-strings.","String methods return new strings (immutable) — don't write s.replace(...) without using the return value."],
  recap:"Use set for dedup, join for concat, f-string for formatting."
},

/* ==================== Python · Stage 5 ==================== */
"py-5-1":{
  summary:["def name(params): defines a function; return gives a result; without return it returns None.","Parameter forms: positional, default, keyword, *args, **kwargs.","Default values must be immutable objects to avoid the classic \"mutable default argument\" trap."],
  pit:"Never write def f(x, lst=[]): — the default list is created once and accumulates across calls. Use None as a sentinel.",
  ex:{q:"f(1, b=2) uses which two argument-passing styles?",a:"1 is positional; b=2 is keyword. Keyword arguments are more readable and robust to reordering."},
  target:"You can define functions with default and variable arguments.",
  out:"Hello, Xiaoming! (3, {'tax': 0.1})",
  deep:["Parameter order: positional → keyword; *args collects extras into a tuple, **kwargs into a dict.","Default arguments are evaluated once at definition — the root cause of the mutable-default trap.","Use bare * as a separator: def f(a, *, b) forces b to be keyword-only."],
  recap:"Immutable defaults only; *args/**kwargs for variadic functions."
},
"py-5-2":{
  summary:["Name lookup order: Local → Enclosing → Global → Built-in (LEGB).","Use nonlocal to rebind outer variables; global to rebind module-level ones (use sparingly).","Closures: inner functions remember outer variables even after the outer function returns."],
  pit:"Creating closures in a loop that capture the loop variable will all get the last value — fix with a default argument: lambda x, i=i: ...",
  ex:{q:"Does reading a global variable inside a function need global?",a:"No. Reading is fine; only rebinding the name requires a global declaration."},
  target:"You understand name lookup and can write a closure.",
  out:"8",
  deep:["Closures capture variables themselves, not their values — loop-created closures share the same loop variable.","Fix late binding with default arguments (lambda x, i=i: ...) or a factory function.","Cell variables: Python stores closure-referenced outer variables in __closure__; they survive after the outer function returns."],
  recap:"Reading globals needs no declaration; rebinding needs global/nonlocal."
},
"py-5-3":{
  summary:["Functions are first-class: assign to variables, pass as arguments, return from functions.","lambda params: expr writes anonymous small functions — great for sort keys and callbacks.","Common higher-order functions: map / filter / sorted(key=) / min / max(key=) all accept a function."],
  pit:"lambda only holds one expression; if it doesn't fit, use def. Overly long lambdas destroy readability.",
  ex:{q:"How do you sort by string length?",a:"sorted(words, key=len). key receives a function; its return value drives the sort without modifying the list."},
  target:"You can use key/lambda to customize sorting and filtering.",
  out:"['pie', 'apple', 'banana']\n['BANANA', 'PIE', 'APPLE']",
  deep:["The key function is called once and cached — called \"decorate-sort-undecorate\", faster than comparing repeatedly.","sorted is stable: equal keys retain relative order, enabling multi-pass sorts.","operator.itemgetter / attrgetter are faster keys than lambda for large data."],
  recap:"Sort with key, filter with filter, map with map (or comprehensions)."
},
"py-5-4":{
  summary:["Recursion = a function calling itself; needs a base case and a step toward it.","Python's default recursion depth is ~1000; rewrite deep recursion as a loop or adjust sys.setrecursionlimit.","Decorators are syntax sugar for \"take a function, return a function\" — used with @ for logging, timing, auth."],
  pit:"Decorators hide the original function's name and docstring — remember functools.wraps to preserve metadata.",
  ex:{q:"What's the base case for recursive factorial?",a:"if n <= 1: return 1. Without it, recursion continues until RecursionError."},
  target:"You can write factorial recursively and add a timing decorator.",
  out:"call hello\nhi",
  deep:["Decorators execute at definition time: @log on def hello() is equivalent to hello = log(hello).","Multiple decorators apply bottom-up: @a @b def f is a(b(f)).","functools.wraps copies __name__, __doc__, __wrapped__ to the wrapper; without it, debugging and docs break."],
  recap:"Decorator = higher-order function + syntax sugar; remember wraps."
},

/* ==================== Python · Stage 6 ==================== */
"py-6-1":{
  summary:["A .py file is a module; use import module or from module import name.","Importing executes all top-level code — that's why entry code goes in if __name__ == \"__main__\":.","Use as for aliases: import numpy as np."],
  pit:"Avoid from xxx import * — it pollutes namespaces; don't name your file random.py (it shadows stdlib).",
  ex:{q:"What does if __name__ == \"__main__\": do?",a:"It prevents demo/test code from running on import; only runs when the file is executed directly — the key to reusable modules."},
  target:"You can split code into modules and import them correctly.",
  out:"4.0 3.141592653589793\n__main__",
  deep:["Importing executes top-level code — why test code belongs in the __main__ guard.","Modules execute once on first import, then are cached in sys.modules; use importlib.reload during dev.","Import order: built-ins → sys.path paths; sys.path[0] is usually the script's directory."],
  recap:"A .py is a module; entry code goes in the __main__ guard."
},
"py-6-2":{
  summary:["A package is a directory with __init__.py; dot-separated imports: from pkg.sub import mod.","Within a package use relative imports: from . import mod / from ..pkg import x.","__all__ defines what from pkg import * exposes."],
  pit:"Running a .py inside a package directly raises \"attempted relative import with no known parent package\" — use python -m myapp.mod.",
  ex:{q:"In relative imports, what do one dot and two dots mean?",a:"One dot = current package, two dots = parent package; relative imports only work inside packages, not in top-level scripts."},
  target:"You can set up a package structure and import between its modules.",
  out:"(no output; successful import suffices)",
  deep:["__init__.py marks a directory as a package (explicit is safer even in Python 3.3+ namespace packages); it often aggregates submodule APIs.","Relative imports rely on __package__, which is empty in directly-run scripts — hence the error.","Circular imports (A→B, B→A) are usually a design problem; extract shared code to a third module."],
  recap:"Package = directory + __init__.py; relative imports inside, run with python -m."
},
"py-6-3":{
  summary:["os / pathlib handle paths; sys accesses interpreter argv, path, exit.","datetime handles dates/times; time handles timing/sleep; random generates random numbers.","json serializes; re does regex; collections / itertools provide advanced data structures."],
  pit:"Don't mix os.path and pathlib; prefer pathlib in new projects — use the / operator for joining.",
  ex:{q:"How do you generate a random integer from 1 to 10?",a:"random.randint(1, 10) (inclusive). Note: random is pseudo-random — use secrets for cryptography."},
  target:"You can use pathlib / datetime / json for paths, time, and data storage.",
  out:"current working directory path\ntomorrow's date\n{\"a\": 1}",
  deep:["pathlib turns paths into objects; / joins them and auto-handles separators cross-platform.","datetime has naive and aware variants; use zoneinfo for timezones to avoid DST bugs.","json four-piece set: dumps/loads for strings, dump/load for files; ensure_ascii=False for proper Chinese."],
  recap:"Paths with pathlib, time with datetime, data exchange with json."
},
"py-6-4":{
  summary:["pip install / uninstall / list / show; use requirements.txt to pin dependency versions.","pip freeze > requirements.txt exports; pip install -r requirements.txt reproduces.","More modern: Poetry, uv, pip-tools — lock the full dependency tree and separate dev deps."],
  pit:"Activate the venv before installing (look for (.venv) in your prompt), or packages go to global.",
  ex:{q:"Why write a requirements.txt?",a:"So anyone (including deploy machines) can reproduce the exact dependency versions — avoiding the classic \"it works on my machine\" problem."},
  target:"You can export and reproduce a project's dependency list.",
  out:"(terminal shows package name, version, location, etc.)",
  deep:["requirements.txt records names and versions but can't distinguish direct vs transitive deps; Poetry's poetry.lock or uv's lockfile pins the full tree.","Dev deps (pytest, mypy) should be separate; Poetry uses groups, pip uses requirements-dev.txt.","pip install -e . is editable install — changes take effect immediately, standard for developing your own packages."],
  recap:"Activate the venv first; pin versions with requirements.txt."
},

/* ==================== Python · Stage 7 ==================== */
"py-7-1":{
  summary:["open(path, mode, encoding=\"utf-8\") — modes r / w / a / b / +.","Use with to auto-close the file even if an error occurs mid-way.","Read with read() all, readline() one line, readlines() list, or iterate for line in f."],
  pit:"Windows default encoding may be gbk; always write encoding=\"utf-8\" when reading/writing Chinese or you'll get garbled text or UnicodeDecodeError.",
  ex:{q:"Why use with instead of manual close()?",a:"with closes the file when the block exits (including on exceptions); manual close() never runs if an earlier line errors, leaking the handle."},
  target:"You can read and write text files correctly with with.",
  out:"first line",
  deep:["open's default encoding comes from locale.getpreferredencoding() (often cp936 on Windows) — always specify utf-8.","File objects are iterable: for line in f reads line by line without loading the whole file — correct for large files.","Mode cheat sheet: r read, w truncate-write, a append, x create-if-new, b binary, + read-write."],
  recap:"Always use with for files; always specify encoding=\"utf-8\" for Chinese."
},
"py-7-2":{
  summary:["Path objects join with /, auto-handling separators cross-platform.","Methods: exists() / is_file() / mkdir(parents=True) / glob() / read_text() / write_text().","Recursive search: rglob(\"*.py\") — far simpler than os.walk."],
  pit:"mkdir without parents=True fails if parent dirs don't exist; add exist_ok=True to avoid errors if it already exists.",
  ex:{q:"How do you find all .txt files in a directory (including subdirectories)?",a:"Path(\".\").rglob(\"*.txt\") — returns a generator; wrap in list() if needed."},
  target:"You can create directories, write files, and batch-search with pathlib.",
  out:"[list of .py files in current directory]",
  deep:["Path is an immutable pure path; WindowsPath/PosixPath auto-select, so code is cross-platform.","read_text / write_text are shortcuts for small files — simpler than open + with.","glob returns a generator matching one level; rglob recursively matches all subdirectories."],
  recap:"Use paths as objects: / to join, exists to check, rglob to recurse."
},
"py-7-3":{
  summary:["try / except / else / finally: except catches, else runs when no error, finally always runs.","Catch specific exceptions (e.g. FileNotFoundError), not bare except Exception that swallows everything.","Use raise to throw; raise ... from e preserves the exception chain."],
  pit:"Empty except: pass hides real bugs and makes debugging nearly impossible — at least log or show a message.",
  ex:{q:"What is finally typically used for?",a:"Releasing resources — closing files, connections, locks — cleanup that must happen regardless of success or failure."},
  target:"You can catch specific exceptions with friendly messages and use finally for cleanup.",
  out:"(when entering abc) not a valid number: invalid literal for int() ...",
  deep:["except can catch multiple: except (ValueError, TypeError) as e, but don't catch overly broad Exception.","else separates the \"happy path\" from \"might-error\" code — cleaner than nesting everything in try.","Exceptions are objects; raise ValueError(\"message\") with specific info saves debugging time."],
  recap:"Catch specific exceptions, clean up in finally, never write bare except: pass."
},
"py-7-4":{
  summary:["class MyError(Exception): defines business exceptions, used with raise.","Context manager protocol: implement __enter__ / __exit__, or use @contextmanager decorator.","Great for \"paired\" operations: timing, temporary directory changes, DB transactions."],
  pit:"Custom exceptions should inherit from Exception, not BaseException — otherwise you'll catch KeyboardInterrupt and Ctrl+C won't work.",
  ex:{q:"When should you define a custom exception?",a:"When built-in exceptions don't express the business meaning (insufficient balance, invalid parameter), so callers can distinguish and handle errors precisely."},
  target:"You can define your own exception and write a context manager with @contextmanager.",
  out:"elapsed 0.0xxx",
  deep:["@contextmanager splits a function at yield: before yield is __enter__, after is __exit__.","with can manage multiple resources at once: with open(a) as f1, open(b) as f2.","contextlib.suppress(SomeError) provides semantic \"ignore this specific exception\" — clearer than try/except pass."],
  recap:"For paired operations, wrap them in a context manager."
},

/* ==================== Python · Stage 8 ==================== */
"py-8-1":{
  summary:["class defines a class; __init__ initializes; self refers to the current instance.","Instance attributes (one per object) vs class attributes (shared by all).","Methods are functions whose first parameter is self — the interpreter passes it automatically."],
  pit:"Using a mutable object (like a list) as a class attribute makes all instances share it — usually a bug; put it in __init__ instead.",
  ex:{q:"What is self, can it be renamed?",a:"self is the instance itself; it's a convention. You could name it this and it'd work, but everyone would be confused — don't."},
  target:"You can define a class, initialize attributes, and call methods.",
  out:"Xiaohei: Woof!",
  deep:["Methods are essentially \"descriptors + functions\"; d.bark() equals Dog.bark(d) where d is self.","Class attributes are shared across instances; instance attributes live in the instance's __dict__; lookup: instance → class → parent.","__slots__ prevents dynamic attribute creation and skips __dict__ — saves memory with many small objects."],
  recap:"self is the instance; class attributes are shared, instance attributes are independent."
},
"py-8-2":{
  summary:["class B(A) inherits; the subclass automatically gets parent methods and attributes.","super().__init__() calls parent initialization; same-named method = override.","Multiple inheritance resolves via MRO (C3 linearization); inspect with ClassName.__mro__."],
  pit:"Forgetting super().__init__() in a subclass __init__ leaves parent attributes uninitialized → AttributeError.",
  ex:{q:"When should you use inheritance?",a:"For an \"is-a\" relationship where you need to reuse or extend behavior; for code reuse alone, prefer composition."},
  target:"You can reuse code via inheritance and initialize correctly with super.",
  out:"Woof! (<class '__main__.Dog'>, <class '__main__.Animal'>, <class 'object'>)",
  deep:["MRO uses C3 linearization, guaranteeing \"child first, parent order preserved\"; conflicting inheritance raises TypeError.","super() isn't \"the parent\" — it's \"the next in the MRO\", critical under multiple inheritance.","Composition over inheritance: embedding an instance (has-a) is often more flexible than subclassing (is-a)."],
  recap:"super() walks the MRO; use composition for code reuse."
},
"py-8-3":{
  summary:["Dunder methods (double-underscore) let your class support built-in syntax: __str__ / __repr__ / __len__ / __eq__ / __lt__.","Operator overloading: __add__ for +, __getitem__ for [], __call__ makes an object callable.","__repr__ is for developers, __str__ for users; implement at least __repr__ for debugging."],
  pit:"Defining __eq__ usually means also defining __hash__, or your objects become unhashable and can't go in sets or dict keys.",
  ex:{q:"What's the difference between __str__ and __repr__?",a:"print/str() prefer __str__; interactive echo and container display use __repr__; without __str__, it falls back to __repr__."},
  target:"You can make your class support print, comparison, and +.",
  out:"Vec(3)",
  deep:["Dunder methods are protocols: implement them and your objects work with len(), +, [], in, for.","Keep operator semantics consistent: __add__ should return a new object, not mutate self; __eq__ must be reflexive, symmetric, transitive.","Defining __eq__ sets __hash__ to None; make objects hashable by not defining __eq__ or by defining __hash__ too."],
  recap:"Implement protocol methods and your custom type works with built-in syntax."
},
"py-8-4":{
  summary:["@dataclass auto-generates __init__ / __repr__ / __eq__ — ideal for pure data models.","@property turns a method into an attribute, allowing validation on assignment (with @x.setter).","Enum defines named constants — less error-prone than scattered strings and numbers."],
  pit:"Dataclass default fields can't be mutable objects either; use field(default_factory=list).",
  ex:{q:"What's the benefit of property?",a:"External code still uses attribute syntax, but you can add validation, lazy computation, and change the implementation later without breaking callers."},
  target:"You can define data models with dataclass and use property for validation.",
  out:"Team(name='A', members=[]) Color.RED",
  deep:["dataclass supports frozen=True (immutable/hashable) and order=True (auto-generates comparisons).","property typical pattern: wrap internal _x as public x, validate in the setter; changing internals doesn't affect callers.","Enum members are singletons; compare with is; use Color(1) to look up by value."],
  recap:"dataclass for data models, property for validation, Enum for constants."
},

/* ==================== Python · Stage 9 ==================== */
"py-9-1":{
  summary:["Iterator protocol: implement __iter__ and __next__; raise StopIteration when exhausted.","Generator functions contain yield; calling them returns a lazy iterator that advances to the next yield each next().","Generator expressions (x*x for x in r) look like list comprehensions but save memory."],
  pit:"Generators can only be iterated once; after consumption, iterating again yields nothing — convert to list or call the generator function again.",
  ex:{q:"What's the advantage of generators over lists?",a:"Lazy evaluation, no upfront memory, can represent infinite sequences; trade-off: single-use, no random access."},
  target:"You can write a lazy sequence generator with yield.",
  out:"[0, 1, 2]",
  deep:["Generators have send() to pass values back into yield — a foundation for coroutines.","yield from transparently delegates values from inner generators — clean for recursive generators.","After exhaustion, next() raises StopIteration; for loops catch it automatically."],
  recap:"yield pauses after producing; lazy, memory-efficient, single-use."
},
"py-9-2":{
  summary:["itertools provides efficient iterators: count / cycle / chain / zip_longest / combinations / groupby / accumulate.","functools: reduce, lru_cache, partial, wraps.","Most are C-implemented — faster and leaner than hand-written Python loops."],
  pit:"Function args decorated with lru_cache must be hashable; cached functions with side effects won't re-execute side effects on cache hits.",
  ex:{q:"What must you do before using groupby?",a:"Sort by the same key first; otherwise it only groups adjacent same-key elements and results look like missing data."},
  target:"You can use combinations / accumulate / lru_cache to simplify code.",
  out:"12586269025 [('a','b'), ('a','c'), ('b','c')]",
  deep:["lru_cache uses a dict; maxsize as a power of 2 performs best; maxsize=None means no eviction.","itertools functions all lazily return iterators — combine with sum/list/next for big data without memory blowup.","functools.partial freezes some arguments — clearer than lambda for callback adaptation."],
  recap:"Iteration tools in itertools, caching in lru_cache."
},
"py-9-3":{
  summary:["The GIL ensures only one thread runs Python bytecode at a time, so CPU-bound work doesn't speed up with threads.","Use threads/asyncio for I/O-bound (network, disk); use multiprocessing or numpy/C extensions for CPU-bound.","Share mutable data between threads with a Lock to avoid data races."],
  pit:"count += 1 across threads isn't safe — use a Lock or pass data through a Queue.",
  ex:{q:"Why multiprocessing for CPU-bound tasks?",a:"Each process has its own interpreter and GIL, truly utilizing multiple cores; cost is higher memory and serialization overhead for IPC."},
  target:"You can distinguish I/O-bound vs CPU-bound scenarios and choose the right concurrency model.",
  out:"[0, 1, 4, 9, 16, 25, 36, 49]",
  deep:["The GIL doesn't stop threads from being effective in I/O wait or C extensions that release it (NumPy).","CPython switches threads every ~5ms of bytecode; shared data still needs locks — the GIL isn't a thread-safety guarantee.","multiprocessing has independent memory; args must be picklable; Windows needs __main__ protection."],
  recap:"I/O-bound: threads/coroutines; CPU-bound: processes."
},
"py-9-4":{
  summary:["async def defines a coroutine; await suspends it; the event loop schedules many coroutines on one thread.","Great for I/O-bound workloads (crawlers, API calls) — hundreds or thousands of concurrent tasks.","Start with asyncio.run(); collect results concurrently with asyncio.gather()."],
  pit:"Never call blocking functions (time.sleep, requests) inside coroutines — they freeze the event loop; use asyncio.sleep, aiohttp.",
  ex:{q:"What does await actually wait for?",a:"It yields control back to the event loop so other coroutines can run, then resumes when the awaitable completes — that's the source of concurrency."},
  target:"You can run multiple async tasks concurrently with asyncio.",
  out:"[0, 1, 2, 3, 4]",
  deep:["asyncio.run creates a new event loop each call; only one runs per thread.","Coroutines aren't threads: they cooperatively yield at await; any blocking call stalls the whole loop.","gather raises on first exception by default; return_exceptions=True collects them as results — useful for batch tasks."],
  recap:"Use only async libraries in coroutines; await yields control."
},

/* ==================== Python · Stage 10 ==================== */
"py-10-1":{
  summary:["unittest is built-in; pytest is simpler — just use assert (pip install pytest).","Cover three classes: normal values, boundary values, exception paths.","Beyond print debugging, use breakpoint() / pdb or IDE breakpoints for step-through."],
  pit:"Tests must be repeatable and isolated: don't rely on real network, current time, or global state — use fixtures/mocks.",
  ex:{q:"Why write tests?",a:"They're a safety net for refactoring, living documentation of requirements, and the first line of defense against regressions; time saved debugging far exceeds time spent writing tests."},
  target:"You can write a pytest test suite for your functions.",
  out:"(pytest output: 1 passed)",
  deep:["pytest naming: test_*.py files, test_* functions, bare assert (pytest rewrites it with detailed diffs).","Fixtures prepare/clean test environments; scope controls reuse: function/class/module/session.","Coverage tools show which branches are untested, but 100% coverage ≠ bug-free — assertions matter."],
  recap:"Tests cover normal, boundary, and exception paths."
},
"py-10-2":{
  summary:["Annotate variables and functions: def f(x: int) -> str; not enforced at runtime but tools can check.","typing provides Optional / Union / Callable / TypeVar / Protocol; 3.9+ prefers built-in list[int], dict[str, int].","mypy / pyright / IDE catch type mismatches before runtime."],
  pit:"Type hints are a promise, not enforcement — runtime doesn't check; they only matter with tools like mypy.",
  ex:{q:"What does Optional[int] mean?",a:"Equivalent to int | None — \"may be an int or may be None\", reminding callers to handle the null case."},
  target:"You can annotate functions and pass mypy checks.",
  out:"1",
  deep:["Hints live in __annotations__, unchecked at runtime; from __future__ import annotations makes them strings for forward references.","Protocol implements structural typing (static duck typing) — more flexible than ABCs; recommended for expressing interfaces in Python.","mypy --strict requires annotations on all functions; enable it from the start on new projects."],
  recap:"Annotations are promises; they only mean something with mypy/pyright."
},
"py-10-3":{
  summary:["Standard layout: src/ for code, tests/ for tests, pyproject.toml for metadata and deps.","Editable install pip install -e . — changes take effect immediately, ideal for development.","Build with python -m build; publish to PyPI with twine; internal projects can distribute wheels directly."],
  pit:"Name/directory conflicts, missing __init__.py, and undeclared dependencies are the three most common packaging failures.",
  ex:{q:"Why pyproject.toml instead of hand-written setup.py?",a:"It's the PEP 518 standard config file, unifying build backend and dependencies; recognized by pip, build, poetry."},
  target:"You can organize a script into a standard project and install it locally.",
  out:"(terminal shows build/install success)",
  deep:["src layout (code under src/) prevents \"local directory priority\" issues where tests import source instead of installed package — officially recommended.","wheel is a pre-built binary distribution; sdist is source; wheels need no local compilation and install faster.","Versions follow PEP 440: 1.2.3, 1.2.3a1 (alpha), 1.2.3.dev1; semver helps dependency resolution."],
  recap:"Declare with pyproject.toml, src + tests layout, pip install -e . for dev."
},
"py-10-4":{
  summary:["Everything is an object: variables are just names pointing to objects; is compares identity, == compares value.","Shallow copy copies one level; deep copy recursively copies all nested objects.","Memory management is primarily refcounting, with generational GC for cycles; del decrements refcount, doesn't guarantee immediate freeing."],
  pit:"Small ints (-5..256) and short strings are interned — is comparison \"works\" for them but you must never rely on this.",
  ex:{q:"When must you use a deep copy?",a:"When you have nested mutable containers (list in list, dict of objects) and changes to the copy must never affect the original."},
  target:"You can explain references, shallow vs deep copy, and choose correctly.",
  out:"[[1, 9], [2]]",
  deep:["Refcounting: +1 on binding, -1 on unbinding, immediate reclaim at zero; cycles handled by the generational GC.","gc.collect() and gc module for debugging leaks; objgraph is a common tool for inspecting reference chains.","deepcopy handles cycles (remembers already-copied objects) but is slow and can't handle resources like file handles."],
  recap:"Assignment shares, copy is one level, deepcopy is everything."
}
,

/* ==================== C · Stage 1 ==================== */
"c-1-1":{
  summary:["C is a low-level, portable, highly efficient general-purpose language born at Bell Labs in 1972.","Main fields: operating systems, embedded, drivers, databases, compilers, high-performance libraries — C is the foundation of almost all modern software.","C's syntax influenced C++, Java, C#, JavaScript and many others; mastering C is like learning the Mandarin of programming languages."],
  pit:"Don't expect C to hold your hand: it does almost no runtime checks; writing out of bounds won't error — it just plants a time bomb.",
  ex:{q:"What's the biggest difference between C and Python?",a:"C is compiled, statically typed, manually memory-managed, close to hardware for speed; Python is interpreted, dynamically typed, garbage-collected, for development speed. It's a trade-off between control and efficiency."},
  target:"You can explain C's positioning and its trade-off in one sentence.",
  out:"(no output: all 3 lines are comments)",
  deep:["C was created by Dennis Ritchie at Bell Labs in 1972 to rewrite the UNIX kernel — it was born as \"the language for writing operating systems\".","C's sweet spot: more readable than assembly yet maps directly to machine instructions; nearly every CPU has a C compiler.","The price is \"trust the programmer\": no bounds checking, no type safety guarantees — if you get it wrong, it's undefined behavior."],
  recap:"C gives you full control, and requires you to take full responsibility.",
  code:`// C's positioning: near-complete control
// Price: memory, bounds, type safety are your responsibility
// Payoff: your understanding of the computer will be transformed`
},
"c-1-2":{
  summary:["Windows: install MinGW-w64 or MSYS2 (provides gcc), or use WSL; macOS: Xcode Command Line Tools; Linux: install gcc via package manager.","Editor: VS Code + C/C++ extension, or CLion; beginners can start with online compilers (godbolt / onlinegdb).","Key commands: gcc --version to verify, gcc main.c -o main to compile, ./main to run."],
  pit:"If the command line says \"gcc is not recognized\", it's not in PATH — reinstall and check \"add to PATH\" or manually add the bin directory.",
  ex:{q:"When are online compilers vs local environments better?",a:"First few days: online compilers for zero-friction syntax checks. Once serious: install a local environment — multi-file projects, debuggers, and build tools all require it."},
  target:"You can print the compiler version and compile+run a .c file.",
  out:"gcc (MinGW-W64 x86_64) 13.2.0",
  deep:["Besides gcc there's clang (friendlier errors, stronger static analysis); install both — when one gives confusing errors, switch to the other.","Build outputs: .exe on Windows, a.out on Unix; use -o to name it.","Add -g for debug info or gdb won't show source lines; add -O2 for release builds."],
  recap:"Remember the trio: gcc -Wall -Wextra -g, -o to name output."
},
"c-1-3":{
  summary:["#include <stdio.h> is a preprocessor directive that pulls in standard I/O declarations.","int main(void) is the program entry; the OS starts here; int is the exit code returned to the system.","printf prints output; \\n is a newline; return 0 means success (non-zero means error)."],
  pit:"C is case-sensitive: Printf, Main won't compile; a missing semicolon produces a cascade of confusing errors.",
  ex:{q:"What happens if you write void main()?",a:"It runs on most teaching compilers, but it's non-standard (the standard requires int). Habituate to int main(void) for portability."},
  target:"You can write Hello World and explain every line.",
  out:"Hello, C!",
  deep:["Two standard main forms: int main(void) (no args) and int main(int argc, char *argv[]) (with command-line args).","return 0 goes to the OS as exit status; in the shell, echo $? shows it; non-zero usually means error.","printf isn't part of the language — it's a stdlib function, which is why you must #include <stdio.h>."],
  recap:"Program starts at main; return 0 means normal exit."
},
"c-1-4":{
  summary:["Preprocessing: handle #include, #define, expand macros and headers → .i.","Compilation: translate C source to assembly with syntax/semantic checks → .s.","Assembly: translate assembly to machine code → .o; Linking: combine .o files and libraries into an executable."],
  pit:"Changed code not taking effect? You're running the old binary — recompile before running.",
  ex:{q:"Why do errors sometimes point into header files?",a:"Because #include is textual substitution; the header content is dumped into your source, so errors naturally point into that header."},
  target:"You can generate .i/.s/.o step by step and understand which step an error comes from.",
  out:"(generates main.i / main.s / main.o / main)",
  deep:["Preprocessing also strips comments and handles #if conditionals, so compile errors may not match source line numbers.","The .s file is human-readable assembly — it shows what instructions your C code became.","Linking pulls in printf etc. from libc; this is where \"undefined reference\" errors come from."],
  recap:"Preprocess → compile to asm → assemble to .o → link to executable."
},

/* ==================== C · Stage 2 ==================== */
"c-2-1":{
  summary:["Variables must be declared before use: type name = initializer; e.g. int score = 0;","Integers: char, short, int, long, long long; floats: float, double; plus _Bool and enums.","sizeof(type) returns bytes used — C only specifies minimum widths; actual size varies by platform."],
  pit:"Uninitialized local variables hold garbage; reading them is undefined behavior — always initialize on declaration.",
  ex:{q:"What type for a person's age vs world population?",a:"int is enough for age; world population (~8 billion) exceeds int's 2.1 billion limit — use long long."},
  target:"You can declare variables of each type and observe their sizes with sizeof.",
  out:"4 8 (platform-dependent)",
  deep:["C only mandates minimum widths: int >= 16 bits, long >= 32 bits; actual sizes depend on the ABI — sizeof is the only source of truth.","char signedness is implementation-defined; use signed char / unsigned char explicitly for small integers.","_Bool needs <stdbool.h> for bool/true/false; it's C99."],
  recap:"Ask sizeof for sizes; use int32_t/int64_t when width must be exact."
},
"c-2-2":{
  summary:["Integers use two's complement: the top bit is the sign; negatives are inverted-plus-one, so addition handles both signs.","<limits.h> provides INT_MAX, INT_MIN, UINT_MAX; <stdint.h> provides int32_t, int64_t, etc.","Signed integer overflow is undefined behavior (UB): the program may \"correctly\" give wrong answers, or have checks optimized away."],
  pit:"sizeof(int) may be 2 or 4 bytes across platforms; use int32_t/int64_t when width matters.",
  ex:{q:"Why use size_t for array indices and lengths?",a:"It's unsigned and can hold the largest object on the platform, matching sizeof/strlen return types, avoiding sign-compare warnings."},
  target:"You can state common integer ranges, know overflow hazards, and use fixed-width types.",
  out:"-2147483648 (overflow, UB)\n4294967295",
  deep:["Two's complement benefits: addition handles both signs, and zero has a single representation — nearly all modern CPUs use it.","Unsigned overflow wraps (defined, mod 2^n); signed overflow is UB — this distinction is a classic interview question.","-ftrapv or -fsanitize=signed-integer-overflow makes overflow abort instead of silently giving wrong answers."],
  recap:"Signed overflow = UB; use <stdint.h> for fixed widths."
},
"c-2-3":{
  summary:["float is typically 4 bytes (~7 significant digits), double is 8 bytes (~15); floating literals default to double.","Floats follow IEEE 754: sign bit + exponent + mantissa; many decimal fractions can't be represented exactly.","Never compare floats with ==; check if the difference is within tolerance: fabs(a - b) < 1e-9."],
  pit:"float f = 3.14; triggers implicit double->float narrowing; write 3.14f for precision; use %f for double, %Lf for long double.",
  ex:{q:"Why might 0.1 * 3 == 0.3 be false?",a:"Both 0.1 and 0.3 are repeating in binary and stored approximately; accumulated error breaks the comparison — use integer cents or a dedicated library for finance."},
  target:"You understand floating-point error sources and can compare floats with tolerance.",
  out:"0.10000000000000001\ntreated as equal",
  deep:["IEEE 754 double: 1 sign + 11 exponent + 52 mantissa bits, ~15-17 significant decimal digits.","float args are promoted to double, so scanf needs %lf for double vs %f for float, but printf uses %f for both.","Relative tolerance is more robust: fabs(a-b) <= eps * fmax(fabs(a), fabs(b))."],
  recap:"Never compare floats with ==; use tolerance, or integer cents."
},
"c-2-4":{
  summary:["Arithmetic + - * / %, relational and logical (C uses 0/1 when no bool literal), bitwise & | ^ ~ << >>.","Integer division truncates: 5/2 = 2; if either operand is float, the result is float.","Implicit conversion follows integer promotions + usual arithmetic conversions; explicit cast uses (type)value, watch sign extension."],
  pit:"-7/2 truncation direction and (unsigned)-1 becoming a huge positive number are the two classic conversion traps.",
  ex:{q:"How do you check if an integer is odd?",a:"x % 2 != 0 is clear; x & 1 also works for negatives and is faster — note that == 1 fails for negative odd numbers."},
  target:"You can write mixed-type expressions and predict their results.",
  out:"2 2.500000\n1",
  deep:["Integer promotions: all types smaller than int (char, short, bit-fields) are promoted to int in expressions — that's why 'a' + 1 is int.","Usual arithmetic conversions: when types differ, convert to the larger/more precise type; signed converts to unsigned — root of (unsigned)-1 being huge.","Modulo sign follows the left operand: -7 % 3 == -1 (vs 2 in Python); watch for cross-language porting."],
  recap:"Promote first; integer division truncates; modulo follows left operand's sign."
},

/* ==================== C · Stage 3 ==================== */
"c-3-1":{
  summary:["printf(\"format\", args...); %d integer, %f float, %c char, %s string, %p pointer.","Width and precision: %5d width 5, %.2f two decimals, %-8s left-align, %05d zero-pad.","printf returns chars printed; negative on error — occasionally useful for debugging."],
  pit:"Mismatched format specifier and argument type is UB: using %d to print double gives garbage — match them exactly.",
  ex:{q:"What happens with printf(\"%d\", 3.14)?",a:"Undefined behavior, usually garbage ints; enable -Wformat and the compiler catches it for you."},
  target:"You can produce aligned, fixed-width, fixed-precision output with printf.",
  out:"[   42]\n[42   ]\n[3.14]",
  deep:["printf is variadic; the compiler can't check arg types — only -Wformat does static checking.","Return value: chars printed on success, negative on error — useful for detecting truncated output in logs.","%n writes the count of chars printed (security risk, often disabled); never pass user input as the format string."],
  recap:"Format specifiers must match argument types; width/precision go after %."
},
"c-3-2":{
  summary:["scanf(\"%d\", &x) reads from stdin; & takes the address because the function needs to know where to write.","scanf returns the number of items successfully read — use it to validate input.","double requires %lf, float requires %f; strings use %s (stops at whitespace)."],
  pit:"Forgetting & is the #1 beginner trap — scanf writes to \"the value of x treated as an address\", causing a segfault.",
  ex:{q:"What input format does scanf(\"%d,%d\", &a, &b) expect?",a:"Non-format chars in the format string must match literally, so enter 3,4; entering 3 4 fails."},
  target:"You can read integers and floats and validate with the return value.",
  out:"(entering 18) next year you'll be 19",
  deep:["scanf skips leading whitespace, except %c which reads a space — use \" %c\" to skip it.","scanf stops on mismatch and leaves bad input in the buffer, causing the next read to also fail in a loop — production code: fgets + sscanf.","Return value = items assigned; EOF means end of input, 0 means no match."],
  recap:"scanf needs &, check the return; complex input: fgets + sscanf."
},
"c-3-3":{
  summary:["getchar() reads one char from stdin and returns int (not char!); returns EOF on failure or end-of-file.","putchar(c) outputs one char, lighter than printf(\"%c\").","stdin is line-buffered: your keystrokes wait until you press Enter before reaching the program."],
  pit:"Using char to hold getchar's return can't distinguish EOF(-1) from the valid byte 0xFF — must use int.",
  ex:{q:"Why does input seem unresponsive until Enter?",a:"The terminal is in canonical (line-buffered) mode; only newline submits the line to the program; use setvbuf or change terminal mode."},
  target:"You can loop over characters with getchar and understand EOF.",
  out:"(entering hello then Enter outputs HELLO)",
  deep:["getchar returns int because EOF is typically -1; unsigned char can never equal -1.","Line buffering means your program only gets data after a newline — \"no response\" is usually terminal behavior, not a bug.","Ctrl+D (Unix) / Ctrl+Z (Windows) produces EOF; the standard read loop is while ((c = getchar()) != EOF)."],
  recap:"Use int for getchar/putchar return values."
},
"c-3-4":{
  summary:["scanf leaves the newline in the buffer; a following string read gets an empty line — a classic bug.","Read a full line with fgets(buf, sizeof buf, stdin); it keeps the trailing \\n, which you usually strip.","For mixed input, either use fgets + sscanf consistently, or flush the buffer before reading chars."],
  pit:"gets() doesn't check buffer size and is deprecated — always use fgets.",
  ex:{q:"Why does fgets after scanf read an empty line?",a:"scanf consumed only the digits, leaving the Enter in the buffer; the next line read immediately sees a newline-only line."},
  target:"You can safely read a line with fgets and avoid newline residue.",
  out:"(echoes the line without the newline)",
  deep:["fgets keeps the newline; the idiom to strip it is line[strcspn(line, \"\\n\")] = '\\0'.","fgets reads until newline or buffer full; if the line is too long, loop until you see a newline or you'll leave a half line.","sscanf parses from a string; combined with fgets you safely \"read a line then parse it\", avoiding all scanf pitfalls.","scanf's leftover newline bites the next fgets — clear the buffer first."],
  recap:"Read lines with fgets, parse with sscanf, never use gets."
},

/* ==================== C · Stage 4 ==================== */
"c-4-1":{
  summary:["if(condition) executes when true (non-zero); else handles the otherwise branch; chain with else if.","switch(integer-expression) selects among integer constants; case must be integer constant; default is the fallback.","C99 has _Bool; include <stdbool.h> for bool/true/false."],
  pit:"Forgetting break after case causes fall-through — occasionally intentional, usually a bug.",
  ex:{q:"What happens with if (x = 0)?",a:"It's assignment, not comparison; the value is 0 (false), so the branch never runs. Write if (0 == x) to let the compiler catch this."},
  target:"You can use if chains and switch for multi-branch selection.",
  out:"Monday (when day is 1)",
  deep:["switch case labels must be integer constant expressions, not variables or strings — the fundamental difference from if.","default can appear anywhere, not just at the end; it only runs when no case matches.","Fall-through is legal in C (Duff's device exploits it intentionally), but don't imitate it."],
  recap:"switch only takes integer constants; remember break after each case."
},
"c-4-2":{
  summary:["for(init; cond; step) for known-count loops; C99 allows declaring the loop variable inside.","while(cond) checks before executing — may not run at all; do { } while(cond); runs once then checks.","Braces are optional for single-statement loops, but strongly recommended."],
  pit:"Forgetting to update the loop variable = infinite loop; for(;;) is a legal infinite loop exited by break.",
  ex:{q:"Can you use i after for(int i=0;i<5;i++)?",a:"No — in C99, i is scoped to the loop body only; it's not visible outside (this is the recommended form)."},
  target:"You can write correct counted and conditional loops.",
  out:"5050",
  deep:["C99 allows declaring the loop variable in for init; its scope is the loop only (avoids polluting outer scope).","Loop comparisons should use the same type as array indices (size_t); mixing int and unsigned triggers -Wsign-compare.","do-while requires the trailing semicolon — it's the only loop that must end with one."],
  recap:"Known count: for; condition-driven: while; at-least-once: do-while."
},
"c-4-3":{
  summary:["break exits the innermost loop or switch; continue skips the rest of this iteration.","goto jumps to a label in the same function; its only widely accepted use is unified cleanup on error.","Overusing goto makes control flow spaghetti; use structured statements for everyday logic."],
  pit:"continue in a while loop is dangerous: if the update statement comes after continue, it loops forever.",
  ex:{q:"How do you break out of nested loops?",a:"C has no labeled break; use a flag variable, wrap the loop in a function and return, or (rarely) use goto."},
  target:"You understand when to use each jump statement and the risks.",
  out:"1 3 5 7",
  deep:["In a for, continue jumps to the step; in a while, it jumps straight to the condition — that's why while+continue can loop forever.","goto's only accepted use: jump to a cleanup label on error; the Linux kernel uses this pattern heavily.","break exits one level; multi-level exit needs flags or function extraction."],
  recap:"break exits, continue goes to next iteration, goto only for unified cleanup."
},
"c-4-4":{
  summary:["Traverse arrays: for (i = 0; i < n; i++); n is the length — watch off-by-one errors.","Accumulate/count/find-extremes: initial values matter (sum starts 0, product starts 1, min starts with first element).","Sentinel loops: stop when a special value (-1 or EOF) is read — good for unknown input counts."],
  pit:"sizeof(array) gives total bytes; sizeof(pointer) gives pointer size — the trick fails once an array decays to a pointer as a parameter.",
  ex:{q:"Why can't you compute array length inside a function?",a:"Arrays decay to pointers when passed; the parameter only gets the address, so you must pass length separately."},
  target:"You can write correct traversal, accumulation, and sentinel loops.",
  out:"(prints max: 5)",
  deep:["Off-by-one is the most common bug; mantra: array of n elements has indices 0..n-1, loop with i < n.","Extremum initial values: use the first element (not 0, or all-negative arrays break), sum starts 0, product starts 1.","sizeof fails inside functions because arrays decay; C functions almost always need an explicit length parameter."],
  recap:"Indices 0..n-1; always pass length with the array."
},

/* ==================== C · Stage 5 ==================== */
"c-5-1":{
  summary:["Definition = write the body; declaration (prototype) = tell the compiler the function exists: int add(int, int);.","A declaration or definition must exist before the call; old-style implicit declarations cause type errors.","Write void in the parameter list for no arguments (int f(void)); empty () is ambiguous in C — don't use it."],
  pit:"A definition after a call without a prototype is an error in C99+ — that's what prototypes are for.",
  ex:{q:"What's the difference between declaration and definition?",a:"Declaration says \"name and signature\", can appear multiple times; definition allocates code/storage, appears once."},
  target:"You can organize multi-function programs with headers and prototypes.",
  out:"5",
  deep:["Prototype tells the compiler \"what the function looks like\"; definition provides the implementation; with a prototype, the definition can come after the call.","Old-style implicit declarations (K&R) are deprecated since C99; modern compilers error out.","Headers hold declarations, source files hold definitions — the basic organization for multi-file projects and libraries."],
  recap:"Declare before use; declarations in .h, implementations in .c."
},
"c-5-2":{
  summary:["C is pass-by-value: parameters are copies of arguments; modifying parameters doesn't affect the caller.","To let a function modify an external variable, pass its address (pointer) and dereference with *p — \"simulated reference\".","Arrays decay to pointers when passed, so modifications to array elements inside the function affect the caller."],
  pit:"void swap(int a, int b) does nothing — it swaps two copies; nothing changes after the call.",
  ex:{q:"Why can arrays be modified inside a function without taking their address?",a:"Array names decay to pointers to the first element; the function accesses the same memory through the pointer."},
  target:"You can use pointer parameters for swap and \"multiple return values\".",
  out:"(x and y are swapped)",
  deep:["C only has pass-by-value: parameters are always copies; so-called \"pass-by-reference\" is really passing a copy of the address.","Multiple return values: caller provides a buffer pointer, e.g. void get(char *buf, size_t n).","Arrays decay to pointers as parameters, so sizeof fails and element modifications propagate outward."],
  recap:"To modify arguments, pass addresses; for multiple returns, pass buffers."
},
"c-5-3":{
  summary:["Block scope (inside {}), file scope (outside functions), function prototype scope.","static on a local variable: extends lifetime to program end but keeps scope; on globals/functions: limits linkage to this file (information hiding).","extern declares \"this variable/function is defined elsewhere\", used for cross-file globals."],
  pit:"Don't treat static locals as thread-safe counters — use atomics or locks in multi-threaded code.",
  ex:{q:"What does static on a global variable do?",a:"Makes it file-private, avoiding symbol clashes with other files; the primary way to implement module encapsulation in C."},
  target:"You can use static to hide module internals and understand variable lifetimes.",
  out:"(counter increments across calls)",
  deep:["static locals live in the static region, initialized only on first execution of the declaration, living for the whole program.","static on globals/functions changes external linkage to internal linkage — C's only encapsulation mechanism.","extern only declares \"defined elsewhere\", doesn't allocate storage; definitions need initializers, declarations must not re-initialize."],
  recap:"static locals remember state; static globals hide symbols to this file."
},
"c-5-4":{
  summary:["Recursion = a function calling itself; needs a base case that each step approaches.","Each call creates a new stack frame; too-deep recursion causes stack overflow.","Storage classes: auto (default, stack), static (static region), register (suggest register), extern (reference external)."],
  pit:"Don't compute Fibonacci recursively: overlapping subproblems cause exponential complexity; rewrite as a loop or memoize.",
  ex:{q:"How to choose between recursion and loops?",a:"Tree/graph traversal, divide-and-conquer (quicksort, merge sort) are natural recursively; linear accumulation and simple traversal are faster and stack-friendlier as loops."},
  target:"You can write factorial and Fibonacci recursively and explain complexity risks.",
  out:"120",
  deep:["Each recursive call pushes a frame with parameters, return address, and locals; the default stack is only a few MB.","Tail recursion (the recursive call is the last step) can be optimized to a loop, but the C standard doesn't guarantee it.","Naive recursive Fibonacci is O(2^n); a loop or memoized version is O(n) — a classic complexity lesson."],
  recap:"Recursion needs a base case; deep recursion -> use loops."
},

/* ==================== C · Stage 6 ==================== */
"c-6-1":{
  summary:["Arrays are contiguous memory blocks of same-type elements: int a[5]; indices 0..4.","Initialization: int a[5] = {1,2,3}; remaining elements auto-zero; int a[] = {1,2,3}; length inferred.","C doesn't check bounds; a[5] writes past the array — the most common source of C security vulnerabilities."],
  pit:"Array length must be a compile-time constant (VLAs are optional in C99 and not mandatory in C11); use malloc for dynamic sizes.",
  ex:{q:"What does int a[5] = {0}; mean?",a:"First element explicitly 0, rest auto-zeroed by the compiler — the standard way to zero an array."},
  target:"You can declare, initialize, and safely traverse arrays.",
  out:"1 2 3 0 0",
  deep:["Array names don't decay in sizeof and & contexts; everywhere else they decay to a pointer to the first element.","Partially initialized arrays have remaining elements zeroed — C's universal rule for static storage.","Out-of-bounds writes can corrupt adjacent variables and return addresses; this is the buffer-overflow attack principle."],
  recap:"Indices 0..n-1; length = sizeof(a)/sizeof(a[0])."
},
"c-6-2":{
  summary:["int a[3][4] is contiguous in memory (row-major); a[i][j] equals *(*(a+i)+j).","Initialization: int a[2][3] = {{1,2,3},{4,5,6}}; inner braces can be omitted but aren't recommended.","As a parameter, all dimensions except the first must be specified: void f(int a[][4], int rows)."],
  pit:"Multi-dimensional array parameters decay to \"pointer to an array of 4 ints\"; wrong column count causes misaligned access.",
  ex:{q:"Why do dynamic 2D arrays use \"array of pointers\" or \"1D simulation\"?",a:"True 2D VLA support is inconsistent; allocating one rows*cols block with malloc and indexing manually is the most portable."},
  target:"You can correctly declare, traverse, and pass 2D arrays.",
  out:"1 2 3 4 5 6",
  deep:["2D arrays are contiguous row-major; m[i][j] = *(*(m+i)+j) = ((int*)m)[i*cols+j].","Parameters must include column count: void f(int m[][4]); the compiler needs it to compute row offsets.","Truly dynamic 2D structures use \"1D array + manual indexing\" — cache-friendly and simple to allocate."],
  recap:"Row-major storage; only the first dimension can be omitted in parameters."
},
"c-6-3":{
  summary:["C has no native string type; a string is a null-terminated (\\0) char array.","char s[] = \"hi\" allocates 3 bytes (including \\0); char *s = \"hi\" points to read-only literal — modifying it is UB.","strlen doesn't count the terminator, but storage needs +1 byte — remember this when allocating buffers."],
  pit:"char *p = \"hello\"; should be const char *p = \"hello\"; so the compiler catches accidental writes.",
  ex:{q:"What's wrong with char s[3] = \"abc\";?",a:"No room for the terminating \\0; strlen will read past the buffer. Use at least char s[4]."},
  target:"You understand \\0, can safely declare and modify strings.",
  out:"3 2",
  deep:["The literal \"hi\" has type char[3] (including \\0), stored in read-only memory; modifying it segfaults.","char s[] = \"hi\" copies the literal into a writable array, so it can be modified — the key difference between the two forms.","All str* functions depend on \\0; without it they read out of bounds — one of the most common C crash causes."],
  recap:"Strings = null-terminated char arrays; literals are read-only."
},
"c-6-4":{
  summary:["Length/copy: strlen, strcpy, strncpy, memcpy (memcpy doesn't handle overlap; use memmove).","Compare/search: strcmp, strncmp, strchr, strstr; concatenate: strcat, strncat.","n-prefixed versions limit length and are safer; strncpy doesn't guarantee \\0 termination — add it manually."],
  pit:"strcmp returns 0 on equality (not 1); if (strcmp(a,b)) means \"not equal\".",
  ex:{q:"Difference between strcpy and memcpy?",a:"strcpy stops at \\0 and only works on strings; memcpy copies by byte count, handles any data, doesn't check \\0, and doesn't handle overlap."},
  target:"You can safely use n-prefixed string functions for copying and comparing.",
  out:"bye (when buf is quit)",
  deep:["strncpy doesn't guarantee \\0; if source length equals n exactly, the destination lacks a terminator — add it manually.","memcpy vs memmove: only difference is that memmove is safe when source and destination overlap; memcpy is UB then.","Compare strings with strcmp; compare first n chars with strncmp; return value is a \"difference\", not just 1/-1."],
  recap:"Prefer n-prefixed versions and add \\0 manually."
},

/* ==================== C · Stage 7 ==================== */
"c-7-1":{
  summary:["A pointer is \"a variable that holds an address\": int *p = &x; means p holds x's address.","& takes the address, * dereferences (reads the value at the address); * in a declaration is just a type marker.","Uninitialized pointers (wild pointers) point to random addresses; dereferencing them almost always crashes — initialize to NULL on declaration."],
  pit:"int *p, q; only declares p as a pointer; q is still int — declare multiple pointers as int *p, *q;.",
  ex:{q:"How big is a pointer variable?",a:"On the same platform, all object pointers are the same size (typically 8 bytes on 64-bit), regardless of pointed-to type."},
  target:"You can declare pointers, take addresses, dereference, and explain each step.",
  out:"(prints an address like 0x7ffd...) 20",
  deep:["Pointer size is type-independent on the same platform; type info only affects dereferencing and arithmetic stride.","Dereferencing an uninitialized pointer is UB; initializing to NULL helps locate crashes faster.","%p requires a void* argument; cast with (void*)p, otherwise it's UB."],
  recap:"& takes address, * reads value; initialize on declaration."
},
"c-7-2":{
  summary:["p + 1 isn't address + 1; it's plus \"one pointed-to type size\" — that's type-aware pointer arithmetic.","Subtracting two pointers gives the number of elements between them (ptrdiff_t), but only within the same array.","Pointers support ++/--, comparison, and +/- with integers; *(p+i) equals p[i]."],
  pit:"Out-of-bounds pointer arithmetic (beyond \"one past the end\") is UB; you can't compare or dereference it.",
  ex:{q:"Why can't you do arithmetic on void*?",a:"void has no size info; the compiler doesn't know how many bytes to add — cast to a concrete type first."},
  target:"You can traverse arrays with pointer arithmetic and understand type scaling.",
  out:"10 30\n2",
  deep:["Pointer arithmetic scales by type: int* + 1 moves 4 bytes; char* + 1 moves 1 byte — that's \"type awareness\".","Only pointers into the same array (or one past the end) may be subtracted; result is ptrdiff_t.","One-past-the-end pointers may exist but must not be dereferenced — the standard's iterator exception."],
  recap:"p+1 advances one element; subtraction/comparison only within the same array."
},
"c-7-3":{
  summary:["Array names decay to pointers to the first element in most expressions, so a[i] equals *(a+i).","Difference: array names aren't variables (can't be assigned); sizeof(array) gives the whole array size.","Arrays decay to pointers as parameters, so sizeof(parameter) gives only pointer size."],
  pit:"&a and a have the same numeric value but different types: &a is \"pointer to array of 3 ints\"; &a + 1 skips the whole array.",
  ex:{q:"Is there a difference between int a[] and int *a as function parameters?",a:"Identical; the compiler treats both as int *a; [] only signals to callers that an array is expected."},
  target:"You can explain array vs pointer differences and pass them correctly.",
  out:"2 2",
  deep:["Key difference: array names aren't lvalues (can't be assigned), while pointer variables can point elsewhere.","&arr and arr are numerically equal but different types: &arr+1 skips the whole array, arr+1 skips one element.","int a[] in parameters is rewritten by the compiler to int *a; sizeof gives pointer size either way."],
  recap:"arr[i] is *(arr+i); after passing as parameter, it's just a pointer."
},
"c-7-4":{
  summary:["To let a function modify external variables, pass pointers; add const if it shouldn't modify — the best documentation and protection.","const int *p: pointed value can't change; int *const p: pointer itself can't change; const int *const p: neither can.","NULL is the null pointer; dereferencing NULL always crashes; functions returning pointers use NULL to indicate failure."],
  pit:"Assigning const pointers to non-const pointers warns; always add const for read-only parameters to catch accidental modification.",
  ex:{q:"How to remember const placement?",a:"Look at what const modifies: left of * modifies the pointed-to data, right of * modifies the pointer itself."},
  target:"You can use const for read-only params and NULL for failure.",
  out:"(prints position if found, nothing otherwise)",
  deep:["Left of *: const int *p (data const); right of *: int *const p (pointer const); both: const int *const p.","Assigning const to non-const warns (discards qualifier); explicit cast needed — that's the compiler protecting you.","NULL is the null pointer constant (typically (void*)0); C23 recommends nullptr."],
  recap:"Add const for read-only params; return NULL on failure."
},

/* ==================== C · Stage 8 ==================== */
"c-8-1":{
  summary:["Typical layout (low to high addresses): code -> initialized data -> BSS -> heap -> stack -> kernel.","Stack: auto-allocated on function calls, holds locals and return addresses; fast, small, auto-reclaimed.","Heap: manual alloc/free, large and flexible; static region: globals and static variables live for the whole program."],
  pit:"Never return a pointer to a stack local — that memory dies when the function returns; the #1 source of dangling pointers.",
  ex:{q:"Why do large arrays go on the heap or as globals, not on the stack?",a:"Stack size is typically a few MB; large local arrays overflow the stack; heap size is limited only by available memory."},
  target:"You can draw memory layout and explain each region's lifetime.",
  out:"(no output: demonstrates memory layout)",
  deep:["The stack grows from high to low addresses; deep recursion or large locals hit the stack bottom -> stack overflow.","Heap is managed by malloc/free; allocation and deallocation have cost; frequent small allocations fragment memory.","Static region (.data/.bss) is set at load time and lives for the program; globals and static vars live there."],
  recap:"Stack auto, heap manual, static for the whole program; never return stack addresses."
},
"c-8-2":{
  summary:["malloc(size) allocates uninitialized memory; calloc(n, size) allocates and zeroes; realloc resizes; frees memory.","Always check return values: failure returns NULL; without checking, you'll dereference NULL and crash.","sizeof *p is better than sizeof(int) — if the type changes, you won't miss updating it."],
  pit:"After free, the pointer value is unchanged but memory is returned — that's a dangling pointer; set to NULL after free.",
  ex:{q:"What extra benefit does calloc have over malloc?",a:"Besides zeroing, calloc(n, size) checks for n*size overflow (in some implementations), safer for large allocations."},
  target:"You can correctly allocate, check, and free heap memory.",
  out:"(no output: demonstrates alloc/free)",
  deep:["malloc guarantees alignment but doesn't initialize; calloc(n, size) zeroes and checks multiplication overflow.","realloc may expand in place or move the block; always use a temp pointer — on failure, original memory is still valid.","After free, memory returns to the allocator but the pointer value remains — that's a dangling pointer; NULL is the only self-protection.","Use sizeof *p, not sizeof(int)."],
  recap:"Always check NULL after malloc; set pointer to NULL after free."
},
"c-8-3":{
  summary:["Memory leaks: forgetting to free; long-running programs slowly run out of memory.","Out-of-bounds access: reading/writing beyond allocated memory can corrupt adjacent data or crash.","Dangling pointers and double-free: using after free, or freeing the same block twice — both UB."],
  pit:"free(NULL) is safe (does nothing); setting to NULL before freeing avoids problems.",
  ex:{q:"How to systematically find memory bugs?",a:"Use AddressSanitizer (gcc -fsanitize=address) for out-of-bounds and dangling; use Valgrind for leaks and uninitialized reads."},
  target:"You can recognize the four memory bugs and know which tools to use.",
  out:"(out-of-bounds write is UB; may crash or appear to work)",
  deep:["Leaks are harmless in short-lived programs but accumulate to OOM on servers/embedded; valgrind --leak-check=full is standard.","use-after-free is the most dangerous: that memory may now hold other data, causing bizarre far-away crashes.","AddressSanitizer (gcc -fsanitize=address) catches out-of-bounds, dangling, and double-free at runtime; enable it in development."],
  recap:"Four bugs: leak, overflow, dangling, double-free; use ASan/Valgrind."
},
"c-8-4":{
  summary:["Linked list: nodes hold data and a pointer to the next node; insert/delete O(1), search O(n).","Focus on \"who owns this memory, who frees it\" — ownership is the core C resource management problem.","Stack/queue/hash table can all be built on dynamic arrays or linked lists; think through ownership before coding."],
  pit:"Self-referential structs must write struct Node *next, not Node *next — the typedef name isn't in scope yet.",
  ex:{q:"What's the easiest mistake when deleting a linked list node?",a:"Save next before free, or you lose the successor after freeing; also handle \"deleting the head node\" which needs updating the head pointer."},
  target:"You can implement linked list insert/delete and free the entire list.",
  out:"(no output: demonstrates node creation)",
  deep:["Linked list advantage: O(1) insert/delete (given position); disadvantage: no random access and poor cache locality.","Ownership rules must be clear at design time: who mallocs, who frees — either \"who allocates frees\" or \"transfer ownership\".","Dummy-head lists unify the \"delete head\" special case and make code much cleaner."],
  recap:"Nodes use malloc; save next before free when deleting."
},

/* ==================== C · Stage 9 ==================== */
"c-9-1":{
  summary:["struct packs different types into one: struct Point { int x; int y; };","Access members with . (objects) or -> (pointers); structs can be assigned wholesale (value copy).","Struct parameters copy the whole struct; pass pointers (with const) for large structs."],
  pit:"Shallow copy when the struct contains pointers: assignment copies only the pointer value, so both share memory.",
  ex:{q:"Pass structs by value or pointer?",a:"Small structs (a few bytes) by value is simple and safe; large structs or ones needing modification use const pointers."},
  target:"You can define structs and access members with . and ->.",
  out:"1 2",
  deep:["Members are laid out in declaration order, but the compiler inserts padding for alignment, so sizeof is usually larger than member sum.","Structs can be assigned (compiler generates member-wise copy), but it's shallow when pointers are involved.","Compare structs with == is unsupported in C; compare member by member or use memcmp (watch out for padding bytes)."],
  recap:"Use . or ->; struct assignment is shallow when pointers are involved."
},
"c-9-2":{
  summary:["typedef gives type aliases: typedef struct Point Point; then write Point p;","Structs can nest (a member is another struct) and self-reference (a member is a pointer to itself).","Self-reference is the basis of lists and trees; note that inside the struct, only the struct tag name is available."],
  pit:"Don't use typedef to hide pointers meaninglessly (typedef char* str;); it makes const semantics confusing.",
  ex:{q:"Can a struct contain an object of its own type?",a:"No — infinite recursion makes the size uncomputable; only a pointer to itself works."},
  target:"You can simplify type names with typedef and implement self-referential structures.",
  out:"(no output: demonstrates list structure)",
  deep:["typedef and struct can be combined: typedef struct Node { ... } Node; — the most common form.","Self-reference must use a pointer, otherwise size is infinitely recursive; the compiler errors out directly.","Flexible array member (C99): struct { int n; char data[]; } allows variable-length tail data, common in network packets."],
  recap:"typedef simplifies type names; self-reference must be a pointer."
},
"c-9-3":{
  summary:["union members share one memory block; size equals the largest member; used for space saving or type punning.","enum defines named constant sets; more type-safe and debuggable than scattered #define.","Bit-fields struct { unsigned a : 3; }; precisely control bit width, common in hardware registers and protocol parsing."],
  pit:"Writing one union member and reading another is type punning; the standard doesn't define its portable behavior — don't rely on it.",
  ex:{q:"What advantages does enum have over #define?",a:"It has scope and type, debuggers show names, and the compiler can check switch exhaustiveness (-Wswitch)."},
  target:"You can use union/enum and understand bit-fields.",
  out:"1 0.00000 (same memory, different interpretation)",
  deep:["union size is the largest member, considering alignment; all members start at the same address.","Using a union to detect endianness is a classic trick: write int 1; if the first byte is 1, it's little-endian.","Bit-field layout is implementation-defined and non-portable; for protocols, use masks and shifts instead."],
  recap:"unions share memory; enums are more type-safe than #define."
},
"c-9-4":{
  summary:["#define defines macros, #include includes files, #if/#ifdef/#endif conditionally compiles.","Macros are pure text substitution with no type checking: wrap parameters and the whole expression: #define SQR(x) ((x)*(x)).","Headers hold declarations and macros; source files hold implementations; use #ifndef guards to prevent double inclusion."],
  pit:"SQR(i++) expands to ((i++)*(i++)), incrementing i twice — never pass arguments with side effects to macros.",
  ex:{q:"Why are header guards necessary?",a:"When multiple source files nest-include the same header, without guards, types get redefined and compilation fails."},
  target:"You can write guarded headers and use macros and conditional compilation.",
  out:"9 (correctly parenthesized macro)",
  deep:["Macros have no type or scope; they're text substitution, so debuggers can't see them and you can't step into them.","Multi-statement macros should be wrapped in do { ... } while(0) so they work correctly in if/else.","#include <> searches system paths only; \"\" searches current directory first, then system paths.","Use #ifndef guards to prevent double inclusion."],
  recap:"Wrap macro params and the whole expression in parens; headers must have guards."
},

/* ==================== C · Stage 10 ==================== */
"c-10-1":{
  summary:["FILE *fp = fopen(path, mode): r read, w write (truncate), a append, r+/w+ read-write.","fprintf/fscanf work like printf/scanf but take a file pointer as first argument.","Always fclose when done; fopen failure returns NULL — always check."],
  pit:"Opening an existing file in w mode immediately truncates it; think carefully before using a vs r+.",
  ex:{q:"Difference between text and binary mode?",a:"On Windows, text mode converts \\n to \\r\\n and treats Ctrl+Z as EOF; always use rb/wb for non-text data."},
  target:"You can open, read/write, close text files and handle failures.",
  out:"(creates a.txt with \"42 3.14\")",
  deep:["FILE* is a stdlib stream with internal buffering; fclose flushes and releases it.","Not fclose-ing after writing may lose data still in the buffer — the most common reason \"my file is empty\".","Text mode converts \\n to \\r\\n on Windows; use b mode for binary data."],
  recap:"Check NULL on open, fclose when done; use b mode for non-text."
},
"c-10-2":{
  summary:["fread/fwrite read/write byte blocks, good for structs and binary data; watch struct alignment and endianness.","fseek moves the file position, ftell gets current position, rewind returns to start; SEEK_SET/CUR/END bases.","Binary serialization must consider endianness and struct padding; cross-platform transfers usually require manual packing."],
  pit:"fread's second arg is \"element size\", third is \"element count\"; swapping them gives wrong results and return values.",
  ex:{q:"Why is fwrite-ing a whole struct non-portable?",a:"Different compilers have different padding and integer endianness; the reliable approach is writing fields one by one with fixed widths."},
  target:"You can use fread/fwrite and fseek for binary I/O and positioning.",
  out:"(writes 3 ints then positions and reads)",
  deep:["fread returns elements actually read; comparing to expected count detects EOF/errors.","Binary portability traps: struct padding and endianness differ across platforms; serialize field by field for cross-machine.","ftell returns long; for files >2GB use ftello/_ftelli64 extensions."],
  recap:"Binary I/O with fread/fwrite; positioning with fseek + SEEK_SET/CUR/END."
},
"c-10-3":{
  summary:["<stdlib.h>: qsort, bsearch, atoi/strtol, rand (with srand), exit.","<errno.h>'s errno records the last error code; perror/strerror convert to readable messages.","<assert.h>'s assert is for debug-time checks; defining NDEBUG removes them all."],
  pit:"errno is only meaningful after a function actually fails; successful calls don't clear it — don't use errno to detect success.",
  ex:{q:"atoi vs strtol?",a:"Prefer strtol: it detects invalid input and overflow; atoi silently returns 0 on bad characters, indistinguishable from error."},
  target:"You can use qsort/strtol and do error handling with errno/perror.",
  out:"failed: No such file or directory",
  deep:["errno is thread-local and only meaningful after explicit failure; successful calls don't clear it.","strerror returns a static string; strerror_r is safer for multithreading; perror adds your prefix.","assert is completely removed when NDEBUG is defined; don't put side-effect expressions in asserts (e.g. assert(i++))."],
  recap:"Check errno after failure, use perror for messages; assertions are debug-only."
},
"c-10-4":{
  summary:["Function pointers: int (*cmp)(int, int); used for callbacks (like qsort's comparator).","Read complex declarations with the \"spiral rule\": start at the identifier, go right, parentheses send you left.","Undefined behavior (UB): out-of-bounds, signed overflow, dangling dereference, multiple modifications in one sequence point — the compiler may do anything."],
  pit:"i = i++ + 1; is classic UB: i is modified twice within one sequence point; results differ across compilers.",
  ex:{q:"How does typedef simplify function pointers?",a:"typedef int (*Cmp)(const void*, const void*); makes parameters, returns, and arrays readable; standard engineering practice."},
  target:"You can read and write function pointers and complex declarations, and identify common UB.",
  out:"5",
  deep:["Call function pointers as f(2,3) or (*f)(2,3); the former is more common.","Spiral rule: start at the identifier, go right, parenthesize and go left, spiraling out.","Sequence points: modifying the same object twice between two sequence points is UB; i = i++ + 1 is the classic example.","typedef greatly simplifies function pointer syntax."],
  recap:"Function pointers implement callbacks; read complex declarations with the spiral rule."
}
,

/* ==================== C++ · Stage 1 ==================== */
"cpp-1-1":{
  summary:["C++ is (mostly) a superset of C, adding OOP, generics, and a standard library while keeping low-level control.","Standard evolution: C++98 -> C++11 (start of modern C++) -> 14/17 -> 20 (concepts, coroutines, ranges) -> 23.","Main fields: game engines, HFT, browser and database kernels, embedded, high-performance services."],
  pit:"Don't treat C++ as \"C with classes\": modern C++ favors RAII, value semantics, and the stdlib; hand-written new/delete is an anti-pattern.",
  ex:{q:"Should I learn C before C++?",a:"No. C++ has its own idioms; learning C first ingrains manual memory habits that modern C++ actively wants you to forget."},
  target:"You can explain C++'s positioning, application areas, and standard version lineage.",
  out:"(no output: all 3 lines are comments)",
  deep:["C++ was designed by Bjarne Stroustrup starting in 1979, originally called \"C with Classes\"; renamed in 1983.","Core philosophy: \"zero-overhead abstractions\" — high-level features should compile to code no slower than hand-written C; pay only for what you use.","C++ is not a true superset: malloc without cast, VLAs, implicit void* conversion are invalid in C++; don't compile C code as C++."],
  recap:"C++ = C's control + abstraction power, at the cost of language complexity.",
  code:`// Same task, C vs C++
// C:   int* p = (int*)malloc(n * sizeof(int));
// C++: std::vector<int> v(n);
// C++ makes "correct and efficient" the default`
},
"cpp-1-2":{
  summary:["Compilers: g++ (GCC), clang++ (LLVM), MSVC (Windows); verify with g++ --version.","Single-file: g++ -std=c++17 -Wall -Wextra main.cpp -o main.","Multi-file/projects: use CMake (cmake -S . -B build && cmake --build build)."],
  pit:"Always add -std=c++17 (or higher), or the compiler may use an old standard and reject structured bindings and other features.",
  ex:{q:"Why enable -Wall -Wextra?",a:"Many potential bugs (uninitialized, sign compare, narrowing) surface as warnings at compile time — the cheapest quality insurance."},
  target:"You can compile and run single-file programs and read a minimal CMake project.",
  out:"(terminal shows version and build info)",
  deep:["-O0 (default) no optimization (fast compile, easy debug); -O2 is the release standard; -O3 is more aggressive but may bloat size.","CMake doesn't compile code; it generates Makefile/Ninja build scripts; the actual compiler runs behind it.","Distinguish compile-time vs link-time errors: syntax/template errors at compile; \"undefined reference\" at link (usually missing a .cpp or library)."],
  recap:"g++ -std=c++17 -Wall -Wextra -O2; use CMake for multi-file."
},
"cpp-1-3":{
  summary:["#include <iostream> pulls in I/O; int main() is the entry; return 0 means success.","namespaces isolate names; the stdlib is in std; use std::cout or using declarations.","Never write using namespace std; in a header — it pollutes every includer."],
  pit:"Omitting return in main is legal (the compiler adds return 0), but writing it explicitly is clearer.",
  ex:{q:"Difference between std::endl and \\n?",a:"endl flushes the buffer in addition to newline; using it heavily noticeably slows output; use \\n normally."},
  target:"You can write Hello World and explain iostream and namespaces.",
  out:"Hello, C++!",
  deep:["Namespaces can nest and alias: namespace fs = std::filesystem; — infrastructure for large projects.","Anonymous namespaces (namespace { ... }) are equivalent to internal linkage, the modern replacement for static.","std::endl flushes; '\\n' just newlines; endl can be several times slower for large output."],
  recap:"cout output, cin input; don't drop std:: prefixes in headers."
},
"cpp-1-4":{
  summary:["std::cout << output, std::cin >> input; both can be chained.","cin >> stops at whitespace; read a whole line with std::getline(cin, s); mixing them requires clearing the leftover newline.","Formatting with <iomanip>: setw width, setprecision precision, fixed fixed-point, hex/oct bases."],
  pit:"After cin >> x fails, the stream enters a failed state and all subsequent reads fail — call clear() then ignore() to recover.",
  ex:{q:"How to read a name with spaces?",a:"std::getline(std::cin, name); if you used >> before it, call std::cin.ignore() to eat the leftover newline."},
  target:"You can do console interaction with input validation and formatting.",
  out:"ff 255\n3.14",
  deep:["cin >> failure sets failbit; all later reads fail until clear() and ignore().","getline discards the newline rather than keeping it (unlike C fgets); handle it manually when mixing.","Manipulators like std::hex, std::setw change stream state and persist until changed."],
  recap:"Check cin failures; format with <iomanip>."
},

/* ==================== C++ · Stage 2 ==================== */
"cpp-2-1":{
  summary:["Built-in types: bool, char, int, long long, float, double; <cstdint> provides int32_t etc.","auto lets the compiler deduce types: auto i = 0; (int), auto d = 0.0; (double).","auto requires initialization and strips references and top-level const; use const auto& or decltype to preserve."],
  pit:"auto copies elements in range-for (for (auto x : v)); use const auto& for large objects to avoid copies.",
  ex:{q:"When shouldn't you use auto?",a:"When the type itself is informative (auto x = get_size() hides units) or where implicit conversion matters."},
  target:"You can use auto/decltype and understand deduction rules.",
  out:"(no output: demonstrates type deduction)",
  deep:["auto deduction rules match template argument deduction (except auto deduces initializer_list).","decltype(auto) preserves references and const, useful in generic wrapper functions.","auto x in range-for copies every element; use const auto& for large objects — the most overlooked performance issue."],
  recap:"auto requires initialization; use const auto& for read-only large objects."
},
"cpp-2-2":{
  summary:["const means \"this object can't be modified\" — a compile-time contract that also helps optimization.","constexpr means \"the value is computable at compile time\" — usable for array sizes, template args.","const member functions (void f() const;) promise not to modify state; const objects can only call them."],
  pit:"A const variable isn't necessarily a compile-time constant (e.g. initialized from a function return); use constexpr for that.",
  ex:{q:"Difference between const int *p and int *const p?",a:"Former: pointed value can't change (pointer to const); latter: pointer itself can't change (const pointer)."},
  target:"You can distinguish and correctly use const vs constexpr.",
  out:"(compile-time constant usable as array size)",
  deep:["const means \"runtime immutable\"; constexpr means \"compile-time evaluable\"; constexpr implies const, not vice versa.","In const member functions, this is const T*, so it can only call other const members — const correctness is transitive.","mutable members can be modified in const functions, useful for caches and mutexes (logically const, physically mutable)."],
  recap:"const for read-only, constexpr for compile-time constants."
},
"cpp-2-3":{
  summary:["References are aliases: int &r = x; must be initialized and can't be rebound.","Prefer references over pointers for \"non-null, no ownership transfer\"; pointers mean \"optional/nullable/rebindable\".","Never return a reference to a local variable — it's destroyed when the function returns."],
  pit:"Returning a reference or pointer to a local is a dangling reference, UB; return by value and rely on move semantics.",
  ex:{q:"Pass by value vs const reference?",a:"Small objects (int, pointers, iterators) by value; large objects (std::string, containers) by const reference; by non-const reference if modifying."},
  target:"You can use reference parameters and const references to avoid copies.",
  out:"(x is modified to 2)",
  deep:["References are implemented as pointers under the hood but semantically as aliases: no null, no rebind, no dereference syntax.","Returning references enables chained assignment (a = b = c) and writable operator[], but never locals.","const references bind to temporaries and extend their lifetime to the reference's scope (with exceptions; don't overuse)."],
  recap:"References must be initialized; pass large objects by const reference."
},
"cpp-2-4":{
  summary:["Four named casts: static_cast (normal), const_cast (remove const), reinterpret_cast (bit reinterpretation), dynamic_cast (polymorphic downcast).","Prefer static_cast over C-style casts: clear semantics and searchable.","enum class (scoped enums) don't leak names and don't implicitly convert to int — safer than plain enum."],
  pit:"reinterpret_cast is almost only for low-level hardware/serialization; abuse causes portability disasters.",
  ex:{q:"Why prefer enum class over enum?",a:"It has scope (Color::Red not Red), doesn't pollute the outer namespace, and doesn't implicitly convert to int."},
  target:"You can write type-safe code with static_cast and enum class.",
  out:"2.5",
  deep:["static_cast for \"clear, reversible\" conversions (numeric, upcast, void* recovery); dynamic_cast for polymorphic downcast with runtime check.","Modifying an originally const object through const_cast is UB; it's only safe when the original object is non-const.","enum class can specify underlying type: enum class E : uint8_t { ... }, useful for protocol fields."],
  recap:"Use static_cast instead of C casts; use enum class."
},

/* ==================== C++ · Stage 3 ==================== */
"cpp-3-1":{
  summary:["if / else if / else as in other languages; C++17 adds if with initializer: if (auto it = m.find(k); it != m.end()).","switch works on integers and enums; forgetting break causes fall-through ([[fallthrough]] marks intent).","Condition expressions must convert to bool; pointers and integers implicitly convert in conditions."],
  pit:"Typing = instead of == is a classic bug: if (x = 0) is always false and sets x to 0; -Wparentheses warns on this.",
  ex:{q:"Scope of variables declared in if?",a:"Limited to the if/else block, including the else branch — the common use for C++17 if-with-initializer."},
  target:"You can write multi-branch conditionals and if-with-initializer.",
  out:"Pass",
  deep:["C++17 if-with-initializer limits variable scope to if/else, avoiding temporary pollution; typical after find().","Variables declared inside switch cases need braces, otherwise cross-case scopes conflict.","[[fallthrough]]; explicitly tells the compiler \"I intend fall-through\", suppressing warnings and signaling intent."],
  recap:"Order branches strict to loose; remember break or [[fallthrough]] in switch."
},
"cpp-3-2":{
  summary:["for / while / do-while as in C; C++11 recommends range-for: for (auto &x : container).","Range-for is iterator sugar; works on arrays, std containers, and any type with begin/end.","const auto& for read-only, auto& for modifying, auto for small built-in types."],
  pit:"Adding/removing elements in range-for invalidates iterators and causes UB; use index or explicit iterator loops.",
  ex:{q:"Where can range-for be used?",a:"Any type with begin()/end(): arrays, std containers, std::string, and custom types implementing them."},
  target:"You can traverse containers with range-for and choose the right reference form.",
  out:"1 2 3 ",
  deep:["Range-for expands to iterator loops; modifying the container invalidates iterators exactly as normal iterators.","auto& modifies elements; auto gets a copy that doesn't affect the container.","map elements are pair<const K, V>; keys are const — use const auto& [k, v] in structured bindings."],
  recap:"Read-only const auto&, modifying auto&; delete during iteration via erase-remove or iterators."
},
"cpp-3-3":{
  summary:["break / continue / return / goto as in C; goto is rarely needed in modern C++.","RAII guarantees that no matter how you leave a scope (return, exception), destructors run.","Minimize variable scope: declare when needed for readability and earlier resource release."],
  pit:"Don't goto into a variable's scope (rather than out of it); it skips initialization and causes compile errors.",
  ex:{q:"Why does RAII make C++ error handling safer?",a:"Resource Acquisition Is Initialization: destructors release resources automatically on any exit path, unlike manual free/close which can be missed."},
  target:"You understand scope and RAII, writing resource-safe code.",
  out:"1 3 5 7",
  deep:["RAII is C++'s resource cornerstone: acquire in constructor, release in destructor, leveraging deterministic stack unwinding.","Stack unwinding on exceptions destructs constructed locals, so RAII is exception-safe.","lock_guard/unique_lock, fstream, smart pointers are all RAII applications."],
  recap:"Let objects manage resources; destructors auto-release."
},
"cpp-3-4":{
  summary:["C++17 structured bindings: auto [a, b] = pair; or for (const auto& [k, v] : map).","Works on pair/tuple/arrays/aggregate structs; & after auto means references.","Brace initialization forbids narrowing: int x{3.14}; is a compile error."],
  pit:"Structured bindings copy by default; use const auto& [k, v] for large objects to avoid silent copies.",
  ex:{q:"Difference between int x{3.14} and int x(3.14)?",a:"Brace init forbids narrowing (compile error); parentheses silently truncate to 3."},
  target:"You can simplify container traversal with structured bindings and understand brace-init safety.",
  out:"a:1 b:2 ",
  deep:["Structured bindings also work on arrays and aggregate structs, even public members (in declaration order).","Bindings copy by default; auto& [a,b] is a reference; binding to temporaries extends their lifetime.","Brace init forbids narrowing (double -> int) — the first line of defense against silent precision loss."],
  recap:"Use structured bindings for maps; prefer brace initialization."
},

/* ==================== C++ · Stage 4 ==================== */
"cpp-4-1":{
  summary:["Functions have return type, name, parameter list, body; declare first (in headers), define later.","Overloading: same name, different parameter lists; the compiler resolves by arguments (watch implicit conversion ambiguities).","Default arguments must be given right-to-left and usually only written once in the declaration."],
  pit:"Return type alone doesn't overload; default args + overloading can cause ambiguous calls.",
  ex:{q:"Which overload does add(1, 2.0) call?",a:"With only (int,int) and (double,double), it's ambiguous and errors — avoid such overload designs."},
  target:"You can design reasonable overload and default-argument interfaces.",
  out:"(calls the matched overload)",
  deep:["Overload resolution: candidates -> viable functions -> best match (exact > promotion > standard conversion > user-defined).","Default args are filled at compile time; changing them requires recompiling all callers or stale values silently appear.","Return type isn't part of overloading, but C++ supports covariant return types in overrides."],
  recap:"Overload on parameter lists; write default args once in the declaration."
},
"cpp-4-2":{
  summary:["Pass by value (copy), by reference (modifiable, no copy), by const reference (read-only, no copy).","Returning locals relies on move/copy semantics or NRVO; never return a reference to a local.","C++17 guarantees copy elision for prvalues, so returning large objects is cheap."],
  pit:"Don't return references to avoid copies: returning a local's reference is dangling and UB.",
  ex:{q:"Output parameters: reference vs return value?",a:"Modern C++ prefers return values (clearer with move semantics and structured bindings); reference outputs remain only for multiple outputs or perf-critical paths."},
  target:"You can choose the right passing/return style per scenario.",
  out:"hi",
  deep:["RVO/NRVO makes returning large objects nearly free; C++17 mandates copy elision for prvalues.","Returning references avoids copies but never locals; returning members or statics is safe.","Output parameters (T& out) are gradually replaced by return values + structured bindings in modern C++."],
  recap:"Small by value, large by const ref, modifying by reference."
},
"cpp-4-3":{
  summary:["Syntax: [capture](params) -> return_type { body }; return type is usually deduced.","Captures: [] none, [=] by value, [&] by reference, [x, &y] mixed, [n = 0] init capture (C++14).","Lambdas are used for STL algorithm predicates, callbacks, and local small functions — one of the most used C++11 features."],
  pit:"[&] capturing locals where the lambda outlives them creates dangling references (e.g. stored for async).",
  ex:{q:"How to modify a by-value captured variable inside a lambda?",a:"Add mutable: [n = 0]() mutable { return ++n; }; otherwise by-value captures are const in operator()."},
  target:"You can write lambdas that capture external variables and serve as algorithm predicates.",
  out:"15",
  deep:["A lambda's type is a unique, unnamed closure type; use auto or std::function (type erasure).","Capture list determines what's in the closure: [=] copies by value, [&] by reference — watch dangling references.","C++14 generic lambdas: [](auto x){ return x + x; } — equivalent to a templated operator()."],
  recap:"Be explicit about captures; add mutable to modify by-value copies."
},
"cpp-4-4":{
  summary:["Function objects (functors) are classes overloading operator(); they carry state and can be inlined.","std::function<Signature> is a type-erased callable wrapper storing lambdas, function pointers, functors.","Passing callables to templates as generic params (or C++20 auto) is faster than std::function (no type-erasure overhead)."],
  pit:"std::function has type erasure and possible heap allocation overhead; use template parameters in hot inner loops.",
  ex:{q:"When must you use std::function?",a:"When storing callables in containers, as member variables, or in non-template interfaces where the type can't be known at compile time."},
  target:"You can choose among lambdas, functors, and std::function.",
  out:"15",
  deep:["Functors can be inlined by the compiler, usually faster than std::function; std::function has type-erasure and heap allocation.","std::bind is largely replaced by lambdas (more readable, easier to optimize).","Captureless lambdas implicitly convert to function pointers for C interop."],
  recap:"Use templates/auto in hot paths; std::function only when storing callables."
},

/* ==================== C++ · Stage 5 ==================== */
"cpp-5-1":{
  summary:["class defaults members to private, struct to public; control access with public/private/protected.","Constructors establish class invariants; destructors clean up; aggregate init works without custom constructors.","Member initializer lists are more efficient than body assignment (direct construction vs default-then-assign)."],
  pit:"Member init list order must match declaration order or -Wreorder warns (init always follows declaration order).",
  ex:{q:"Difference between class and struct?",a:"Only default access (class private, struct public) and default inheritance; convention: structs are pure data aggregates."},
  target:"You can define well-encapsulated classes with init lists.",
  out:"(no output: demonstrates class definition)",
  deep:["Members initialize in declaration order, not list order; -Wreorder flags mismatches.","In-class initializers (int x = 0;) share defaults across constructors, reducing duplication.","explicit on single-arg constructors prevents accidental implicit conversion — good interface hygiene."],
  recap:"Encapsulate with private; use member init lists."
},
"cpp-5-2":{
  summary:["Construction order: base class first, then members (declaration order), then constructor body; destruction is the reverse.","Destructors release resources; polymorphic base class destructors must be virtual, or deleting derived objects via base pointers is UB.","=default lets the compiler generate; =delete explicitly disables (e.g. forbid copying)."],
  pit:"new[] pairs with delete[], new pairs with delete; mixing is UB — use std::vector to avoid this entirely.",
  ex:{q:"Why must base destructors be virtual?",a:"Otherwise deleting a base pointer only calls the base destructor, and derived resources are never freed."},
  target:"You can correctly manage object lifetimes and resource release.",
  out:"(no output: demonstrates construction/destruction)",
  deep:["Construction: virtual bases -> direct bases (declaration order) -> members (declaration order) -> body; destruction reverse.","If a class may be inherited, the destructor should be virtual even if empty — cheap insurance against leaks.","=delete is clearer than private-declared-but-undefined; it also disallows specific overloads."],
  recap:"Construct base first, derived last; polymorphic base destructors must be virtual."
},
"cpp-5-3":{
  summary:["Rule of Three: if you need a custom destructor, copy ctor, or copy assignment, you usually need all three.","C++11 extends to Rule of Five, adding move ctor and move assignment.","Rule of Zero (recommended): use std containers and smart pointers; let the compiler generate all special members."],
  pit:"Declaring a custom destructor suppresses implicit move generation, turning moves into copies and silently losing performance.",
  ex:{q:"When must you write a copy constructor?",a:"When the class directly owns raw resources (raw pointers, file handles); better: wrap raw resources in RAII types and return to Rule of Zero."},
  target:"You can decide which rule applies and prefer Rule of Zero.",
  out:"(no output: demonstrates Rule of Zero)",
  deep:["Rule of Zero is the goal: vector/string/unique_ptr manage resources; compiler-generated special members are correct.","User-declared destructors suppress implicit move generation (deprecated but still active since C++11), causing perf regressions.","=default explicitly requests compiler generation; also used to define in .cpp to reduce compile dependencies."],
  recap:"Prefer Rule of Zero; write the Big Five only for raw resource ownership."
},
"cpp-5-4":{
  summary:["Static members belong to the class, not objects; static member functions have no this pointer and only access static members.","friend grants external functions/classes access to private members, commonly used for operator<< output.","Operator overloading: + - == [] () etc.; keep semantics consistent (e.g. == and != in pairs)."],
  pit:"Overloading && || loses short-circuit semantics; same for comma — don't overload them without special reason.",
  ex:{q:"Why is operator<< a friend?",a:"Because the left operand is ostream, not your class; it can't be a member function (member functions require the left operand to be self)."},
  target:"You can overload common operators with consistent semantics.",
  out:"Vec(3)",
  deep:["Symmetric operators (+, -, ==) are usually non-member friends so both operands can implicitly convert.","Assignment operators (=, [], (), ->) must be member functions per language rules.","C++20: defining == auto-generates !=; defining <=> auto-generates all comparison operators — a huge simplification."],
  recap:"Keep operator semantics consistent; use friends for output stream overloads."
},

/* ==================== C++ · Stage 6 ==================== */
"cpp-6-1":{
  summary:["class Derived : public Base means public inheritance, expressing an is-a relationship.","Access: public inheritance keeps base interfaces; private inheritance means \"implemented in terms of\", rare.","Derived constructors call base constructors first (via init list); destruction is reverse."],
  pit:"If the base has no default constructor, derived classes must explicitly call the base constructor in their init list.",
  ex:{q:"Inheritance vs composition?",a:"Use inheritance when expressing is-a with polymorphism; use composition (member objects) for code reuse — lower coupling, more flexible."},
  target:"You can use inheritance correctly and understand ctor/dtor order.",
  out:"(no output: demonstrates inheritance)",
  deep:["Three inheritance access levels: public (is-a, most common), protected, private (implementation inheritance, nearly equivalent to composition).","Name hiding: derived same-name functions hide all base overloads; write using Base::f; to inherit them all.","Base ctors run first, so calling virtual functions in base constructors only reaches the base version — a key C++ vs Java difference."],
  recap:"public inheritance = is-a; base constructs first, virtual functions aren't polymorphic in ctors."
},
"cpp-6-2":{
  summary:["virtual member functions enable dynamic binding: through base pointers/references, the derived version runs.","Implementation: vtable + vptr; cost is one indirection and no inlining.","Non-virtual calls are resolved at compile time; calling through a base pointer runs only the base version."],
  pit:"Calling virtual functions in constructors isn't polymorphic: when constructing the derived, the base part builds first and the object isn't yet derived.",
  ex:{q:"What's the performance cost of virtual functions?",a:"Each object gains a vptr, each call an indirect jump, and usually no inlining; negligible in most business code."},
  target:"You understand dynamic binding's mechanism and cost, and use virtual correctly.",
  out:"D (dynamic) g (static)",
  deep:["Virtual calls go through vptr->vtable->jump: one extra indirection and usually no inlining.","Calling virtuals in constructors/destructors isn't polymorphic because derived parts aren't constructed yet.","For perf-critical paths, CRTP implements static polymorphism resolved at compile time."],
  recap:"Virtuals enable runtime polymorphism; cost is vptr + no inlining."
},
"cpp-6-3":{
  summary:["Pure virtual: virtual void f() = 0; a class with pure virtuals is abstract and can't be instantiated.","Abstract classes define interface contracts; derived classes must implement all pure virtuals to be instantiable.","Pure virtual destructors also need a definition (= 0 with a body), otherwise the derived destructor chain breaks."],
  pit:"A base with only pure virtuals but no virtual destructor is a design flaw — deleting via base pointer leaks derived resources.",
  ex:{q:"Relationship between abstract classes and interfaces?",a:"C++ has no interface keyword; an abstract class with only pure virtuals and no data members equals an interface in other languages."},
  target:"You can define clear interface contracts with abstract base classes.",
  out:"9 (Square's area)",
  deep:["Pure virtual destructors must be defined: virtual ~Shape() = default; suffices, otherwise derived destructor chains break.","Interface classes (only pure virtuals + virtual dtor) equal interfaces in other languages — the basis for decoupling and mocking.","Abstract classes can have data members and implemented methods, making them heavier than pure interfaces."],
  recap:"Pure virtual = 0; classes with pure virtuals can't be instantiated."
},
"cpp-6-4":{
  summary:["override explicitly states \"I override a virtual\"; wrong signatures error at compile time (always add it).","final on a class means non-inheritable; final on a virtual means non-overridable.","RTTI: typeid gets type info; dynamic_cast does safe downcasting (returns nullptr or throws on failure)."],
  pit:"dynamic_cast requires polymorphism (at least one virtual); frequent use suggests a design refactor.",
  ex:{q:"What happens when dynamic_cast on a reference fails?",a:"It throws std::bad_cast (pointer version returns nullptr); wrap reference casts in try blocks."},
  target:"You can use override/final and understand RTTI's use and cost.",
  out:"(branch executes when cast succeeds)",
  deep:["override is a compile-time contract: signature mismatches error, catching the classic \"thought I overrode but added a new virtual\".","final also enables compiler devirtualization, turning indirect calls into direct ones.","RTTI can be disabled with -fno-rtti (some embedded projects), making dynamic_cast/typeid unavailable."],
  recap:"Add override when overriding; avoid dynamic_cast when possible."
},

/* ==================== C++ · Stage 7 ==================== */
"cpp-7-1":{
  summary:["template <typename T> T max(T a, T b); defines a function template; the compiler deduces T from arguments.","Templates aren't functions; they're blueprints that generate functions on instantiation, when types are checked.","Deduction rules are complex: arrays/functions decay to pointers, top-level const is dropped; use decltype(auto) to preserve."],
  pit:"Template definitions must be visible at the use site (usually in headers), otherwise you get link-time \"undefined reference\".",
  ex:{q:"Why are template errors so long?",a:"Because errors occur after instantiation, the compiler prints the whole instantiation stack; read the first error and \"required from here\".",},
  target:"You can write function templates and understand instantiation timing.",
  out:"(instantiates the matching version)",
  deep:["Template instantiation happens at compile time; each distinct type generates independent code — the source of \"template code bloat\".","Two-phase lookup: non-dependent names at definition, dependent names at instantiation; use typename and template to disambiguate.","Template code must usually be in headers, or explicitly instantiate needed types in .cpp (extern template suppresses duplicates)."],
  recap:"Templates are blueprints; definitions must be visible in headers."
},
"cpp-7-2":{
  summary:["template <typename T> class Stack { ... }; defines a class template; use as Stack<int>.","Member functions of class templates are only instantiated when used (lazy instantiation).","Non-type template parameters (template <typename T, std::size_t N>) take values as template args, e.g. std::array<int, 10>."],
  pit:"Putting class template member definitions in .cpp causes link errors; either in headers or explicitly instantiate needed types.",
  ex:{q:"Core difference between std::array and std::vector?",a:"array's size is part of the type (compile-time fixed, stack-allocated); vector's size is runtime, heap-allocated."},
  target:"You can implement class templates and non-type template parameters.",
  out:"(no output: demonstrates class template)",
  deep:["Class template members are only instantiated when called, so \"written but unused\" buggy code may not error.","Non-type template parameters enable compile-time computation and zero-overhead config: std::array<T, N>, fixed ring buffers.","Template template parameters (template<template<class> class C>) accept containers themselves for generic adapters."],
  recap:"Class templates lazy-instantiate; non-type parameters carry compile-time constants."
},
"cpp-7-3":{
  summary:["Full specialization: template<> class Stack<bool> { ... }; provides a completely different implementation for a specific type.","Partial specialization: specialize on some parameters (function templates don't support it; use overloading).","Variadic templates: template <typename... Args>; fold expressions (args + ...) handle parameter packs."],
  pit:"Unary fold on an empty pack has no initial value; provide one: (args + ... + 0).",
  ex:{q:"What if function templates can't be partially specialized?",a:"Use overloading: write a plain function or more specialized template for the type; overload resolution picks it first."},
  target:"You can use specialization and variadic templates for generic utilities.",
  out:"10",
  deep:["Full specialization completely rewrites; partial specializes on some parameters; function templates use overloading instead.","Four fold forms: (args + ...), (... + args), (args + ... + init), (... + init + args).","sizeof...(Args) gets pack size, useful for recursive expansion and static asserts."],
  recap:"Variadic templates + fold expressions = modern C++ printf replacement."
},
"cpp-7-4":{
  summary:["SFINAE: Substitution Failure Is Not An Error; the compiler drops mismatched candidates during overload resolution (enable_if since C++11).","C++20 Concepts: constrain template parameters with requires expressions and named concepts (std::integral, std::totally_ordered).","Concepts make error messages readable and put constraints in interfaces — the modern replacement for SFINAE."],
  pit:"Overly strict concepts reject types that should work; prefer stdlib concepts with clear, reusable semantics.",
  ex:{q:"Biggest advantage of Concepts over enable_if?",a:"Error messages go from dozens of lines of template stack to one line \"constraint not satisfied\"; constraints can be named, composed, reused."},
  target:"You can constrain template parameters with requires/concepts and read constraint errors.",
  out:"6 (gcd(12, 18))",
  deep:["Concepts are compile-time predicates that compose: template <std::integral T> or requires expressions.","SFINAE core: template substitution failure silently removes the candidate rather than erroring; enable_if relies on it.","Concepts turn errors from template-stack dumps into \"constraint not satisfied\" — their biggest practical value."],
  recap:"Use C++20 concepts to constrain templates, replacing SFINAE."
},

/* ==================== C++ · Stage 8 ==================== */
"cpp-8-1":{
  summary:["vector: contiguous memory, O(1) push_back, O(1) random access — the default container.","array: compile-time fixed size, stack-allocated; deque: efficient double-ended ops; list: O(1) insert anywhere but non-contiguous, cache-unfriendly.","vector reallocation moves elements and invalidates all iterators/references; reserve pre-allocates to reduce moves."],
  pit:"vector<bool> is a bit-packed specialization with proxy objects (unlike vector<T>); use vector<char> or deque<bool> for real bool containers.",
  ex:{q:"When not to use vector?",a:"Frequent head/middle insertion with stable iterators -> list; efficient double-ended push/pop -> deque."},
  target:"You can choose sequence containers and manage capacity and iterator invalidation.",
  out:"3 4 (size and capacity)",
  deep:["vector grows 1.5~2x; amortized push_back is still O(1); reserve avoids repeated moves.","Invalidation: vector insert/delete invalidates all iterators, references, pointers after the point (may reallocate).","shrink_to_fit is non-binding; use the swap trick for exact control."],
  recap:"Default to vector; reserve when you know the upper bound."
},
"cpp-8-2":{
  summary:["map/set are red-black trees, ordered, O(log n); unordered_map/set are hash tables, average O(1), unordered.","map operator[] inserts a default value when the key is missing; use find or C++20 contains for lookup only.","multimap/multiset allow duplicate keys; sort pairs in a vector when ordering matters."],
  pit:"Using m[k] to check existence is wrong: it silently inserts a default element (and may grow memory unexpectedly).",
  ex:{q:"map vs unordered_map?",a:"Ordered traversal or key comparison semantics -> map; exact lookup with amortized O(1) -> unordered_map (custom types need a hash)."},
  target:"You can use associative containers correctly and avoid operator[] traps.",
  out:"a1 (prints if found)",
  deep:["unordered_map elements are unordered; rehashing invalidates all iterators (references remain valid, unlike vector).","Custom types as unordered_map keys need std::hash specialization or a custom hash plus ==.","map insert/emplace don't overwrite existing keys, while operator[] does — remember the difference."],
  recap:"Ordered -> map, fast -> unordered_map; lookup with find or contains."
},
"cpp-8-3":{
  summary:["Iterators are generalized pointers: begin() points to the first element, end() is the past-the-end sentinel (not dereferenceable).","Categories: input/output, forward, bidirectional, random access; vector is random access, list is bidirectional.","C++20 Ranges offer pipe composition: views::filter | views::transform, lazy evaluation, more readable."],
  pit:"end() is past-the-end; dereferencing it is UB; algorithms return end() when not found — check before using.",
  ex:{q:"What is iterator invalidation?",a:"Insertion/deletion may reallocate or move elements; previously obtained iterators become invalid; rules differ by container."},
  target:"You can use iterators with algorithms and understand invalidation rules.",
  out:"12345",
  deep:["Five iterator categories; algorithms require specific categories to guarantee complexity.","end() is past-the-end, not dereferenceable; algorithms uniformly return end() when not found.","C++20 Ranges compose views lazily in a functional style and check adaptability at compile time."],
  recap:"Algorithms + iterators are the STL soul; watch invalidation."
},
"cpp-8-4":{
  summary:["<algorithm> provides sort/find/count/accumulate/transform/min_element/binary_search and hundreds more.","sort requires random-access iterators and a strict-weak-order predicate; stable_sort preserves relative order of equals.","std::string is mutable; string_view (C++17) is a non-owning read-only view that avoids copies when passed as parameters."],
  pit:"string_view doesn't own data; if the pointed-to string is destroyed or modified, it's dangling — use only for temporary read-only params.",
  ex:{q:"Algorithms vs hand-written loops?",a:"Prefer algorithms: clear semantics, well-tested, fewer boundary bugs; hand-write only for special control flow."},
  target:"You can compose standard algorithms with string/string_view.",
  out:"(sorted output and statistics)",
  deep:["sort requires strict weak ordering: the comparator must return false for equal elements; writing <= is UB.","stable_sort preserves relative order (merge sort); partial_sort is faster when only the top k are needed.","string_view is (ptr, len), non-owning, avoiding temporary std::string construction and copies as parameters."],
  recap:"Prefer <algorithm>; use string_view for read-only string parameters."
},

/* ==================== C++ · Stage 9 ==================== */
"cpp-9-1":{
  summary:["RAII: Resource Acquisition Is Initialization — bind resource lifetime to object scope; destructors release automatically.","unique_ptr: exclusive ownership, non-copyable, movable only, near-zero overhead — the default choice.","shared_ptr: shared ownership with refcount; weak_ptr: non-owning observer to break cycles."],
  pit:"Constructing two shared_ptrs from the same raw pointer causes double-free; always use make_shared.",
  ex:{q:"When to use shared_ptr?",a:"When shared ownership with uncertain lifetime truly exists; most cases unique_ptr with clear ownership suffices."},
  target:"You can use RAII and smart pointers to eliminate manual resource management.",
  out:"(no output: demonstrates smart pointers)",
  deep:["make_unique (C++14) and make_shared are exception-safe: allocate first, then hand to the smart pointer.","shared_ptr control block holds strong/weak counts; make_shared merges object and control block into one allocation.","unique_ptr's deleter is part of its type; shared_ptr's deleter is not."],
  recap:"Default unique_ptr; shared_ptr only for sharing; weak_ptr for observing."
},
"cpp-9-2":{
  summary:["Value categories: lvalue (named, addressable), xvalue (expiring), prvalue (pure rvalue).","Rvalue reference T&& binds only to rvalues; move ctor/assignment \"steals\" resources, turning deep copies into pointer transfers.","std::move just casts an lvalue to an rvalue (doesn't move anything); the actual move happens in the move ctor/assignment."],
  pit:"After a move, the source is in a \"valid but unspecified\" state; don't rely on its contents except for reassignment or destruction.",
  ex:{q:"Why mark move constructors noexcept?",a:"vector growth uses moves only if they don't throw; otherwise it falls back to copies — omitting noexcept silently loses performance."},
  target:"You can implement move ctor/assignment and understand std::move semantics.",
  out:"(a is usually empty after move)",
  deep:["std::move is just static_cast<T&&>; it moves nothing itself; the move ctor/assignment does the work.","Post-move, the source is \"valid but unspecified\"; the standard only guarantees destructibility or reassignment.","noexcept on move ctors is critical: vector growth uses moves only if nothrow, else falls back to copies."],
  recap:"move is a cast; don't rely on source contents after moving."
},
"cpp-9-3":{
  summary:["Universal reference: template parameter T&& with deduction binds both lvalues and rvalues (forwarding reference).","std::forward<T>(arg) preserves the argument's value category for perfect forwarding.","Reference collapsing: T& & -> T&, T&& & -> T&, T& && -> T&, T&& && -> T&&."],
  pit:"Forwarding references only work with \"template parameter deduction + T&&\"; in void f(int&& x), x is a plain rvalue reference and itself an lvalue.",
  ex:{q:"Why is an rvalue reference variable inside a function an lvalue?",a:"Because it has a name and address; by definition it's an lvalue; use std::move or std::forward to pass it on as rvalue."},
  target:"You can write perfect forwarding wrappers and understand reference collapsing.",
  out:"(forwarding preserves lvalue/rvalue properties)",
  deep:["Universal references only hold with T&& and T needing deduction; vector<T>&& has T already determined.","std::forward<T> conditionally converts (preserves category); std::move unconditionally converts to rvalue.","Reference collapsing is the underlying rule that makes universal references work."],
  recap:"Forwarding reference + std::forward = perfect forwarding."
},
"cpp-9-4":{
  summary:["Two shared_ptrs holding each other form a cycle; neither releases — break it with weak_ptr.","Custom deleters: unique_ptr<T, Deleter> manages FILE*, malloc memory, system handles, etc.","Detection tools: AddressSanitizer (-fsanitize=address), LeakSanitizer, Valgrind, IDE diagnostics."],
  pit:"enable_shared_from_this lets an object safely obtain its own shared_ptr, avoiding constructing a new one from this in member functions.",
  ex:{q:"When to use weak_ptr?",a:"For \"observe but don't own\" relationships (parent pointers, caches, observer lists) — extends no lifetime but accesses safely."},
  target:"You can manage complex resource relationships with weak_ptr and custom deleters.",
  out:"(no output: demonstrates weak_ptr and custom deleter)",
  deep:["Cycle: A holds shared_ptr<B>, B holds shared_ptr<A>; neither refcount drops to zero.","weak_ptr::lock() returns a shared_ptr, safely upgrading \"use it now\".","enable_shared_from_this lets objects safely get their own shared_ptr, often for keeping-alive in async callbacks."],
  recap:"Use weak_ptr to break parent-child/observer cycles."
},

/* ==================== C++ · Stage 10 ==================== */
"cpp-10-1":{
  summary:["throw raises, try/catch catches; catch by reference (catch (const std::exception &e)).","Exception safety levels: basic guarantee (no leak, valid state), strong guarantee (rollback on failure), no-throw (noexcept).","RAII is the cornerstone of exception safety: destructors clean up on any exit path."],
  pit:"Destructors shouldn't throw (default noexcept); throwing during stack unwinding calls terminate.",
  ex:{q:"Exceptions vs error codes?",a:"Exceptions for \"rare and can't handle locally\" errors; predictable frequent failures (parsing user input) use optional/expected or error codes for performance."},
  target:"You can write exception-safe code and choose error-handling strategies.",
  out:"(prints specific error message)",
  deep:["Catch order must be derived-to-base; base branches would eat derived exceptions first (compiler warns).","noexcept functions that throw call terminate; destructors are noexcept by default.","Three safety levels: basic (no leak), strong (rollback), no-throw (noexcept); RAII is the foundation."],
  recap:"Catch by reference, derived to base; destructors don't throw."
},
"cpp-10-2":{
  summary:["<filesystem> (C++17): path, exists, create_directories, recursive iteration, copy/rename.","<chrono>: time points and durations; steady_clock for timing, system_clock for wall clock.","<random>: high-quality random (mt19937 + distributions), replacing biased rand()."],
  pit:"Filesystem functions have both throwing and error_code& versions; use the latter for perf-critical or expected failures.",
  ex:{q:"Why steady_clock instead of system_clock for timing?",a:"system_clock can be adjusted by the OS (may go backward); steady_clock is monotonic, suitable for durations."},
  target:"You can use filesystem/chrono/random for practical tasks.",
  out:"(lists .txt paths and timing)",
  deep:["Every filesystem function has a throwing version and an error_code& version; use the latter when expected to fail.","steady_clock is monotonic; system_clock has wall-clock semantics.","<random>: engine (mt19937) + distribution (uniform_int_distribution); don't use rand() — biased and short period."],
  recap:"Use the stdlib for filesystem/timing/random; don't reinvent them."
},
"cpp-10-3":{
  summary:["std::thread creates threads, join waits; std::async + future is easier for return values.","Data races: multiple threads reading/writing the same data; protect with std::mutex + lock_guard or atomics.","std::atomic provides lock-free atomic ops for counters and flags; condition variables for waiting/notifying."],
  pit:"Destroying a thread without join/terminate calls terminate; use jthread (C++20) or RAII wrappers.",
  ex:{q:"Four necessary conditions for deadlock?",a:"Mutual exclusion, hold-and-wait, no preemption, circular wait; break any one. In practice, lock in a fixed order."},
  target:"You can write multithreaded programs with mutexes/atomics for safety.",
  out:"(concurrent accumulation outputs 200000)",
  deep:["count++ is read-modify-write, non-atomic; use atomic or sharded counters under high concurrency.","Lock granularity determines performance: whole-function locks are simple but slow; critical-section locks are fast but deadlock-prone.","Deadlock four conditions; lock in fixed order or use std::scoped_lock (C++17)."],
  recap:"Shared data needs locks or atomics; use lock_guard/scoped_lock for auto-release."
},
"cpp-10-4":{
  summary:["Object model: non-static members in declaration order; virtual functions add vptr; multiple inheritance may add multiple vtables.","Performance: reduce copies (move/reference), watch cache locality (containers beat linked lists), avoid premature optimization.","Toolchain: -O2 optimization, profilers (perf/VTune), ASan/UBSan, compile-time computation (constexpr/templates)."],
  pit:"Virtual functions aren't free: vptr indirection + no inlining; use static polymorphism (templates/CRTP) on hot paths.",
  ex:{q:"How to decide whether to optimize code?",a:"Measure first (profiler), then optimize. Most performance problems concentrate in a few hotspots; intuition-guided optimization is usually wasted effort."},
  target:"You understand object layout and common performance tradeoffs.",
  out:"(compile-time assert passes, statistics printed)",
  deep:["Objects without virtuals are equivalent to C structs; virtuals add a vptr (usually 8 bytes) at the object head.","Cache locality often matters more than algorithmic complexity: contiguous traversal beats pointer chasing.","constexpr/template metaprogramming moves work to compile time (zero runtime cost) but lengthens build time — a tradeoff."],
  recap:"Measure before optimizing; watch copies, cache, and compile-time computation."
}
,

/* ==================== Java · Stage 1 ==================== */
"java-1-1":{
  summary:["Java is an object-oriented, statically typed general-purpose language running on the JVM, released by Sun in 1995.","Core mechanism: source compiles to bytecode (.class), executed by each platform's JVM — naturally cross-platform.","Main fields: enterprise backends (Spring), Android, big data (Hadoop/Flink), finance and e-commerce systems."],
  pit:"What's cross-platform is bytecode, not source; JVM versions have compatibility differences — mind -source/-target and LTS choices.",
  ex:{q:"Relationship between JDK, JRE, and JVM?",a:"JVM runs bytecode; JRE = JVM + runtime class libraries; JDK = JRE + compiler and dev tools (javac, javadoc, etc.)."},
  target:"You can explain Java's execution mechanism and ecosystem positioning.",
  out:"(no output: all 3 lines are comments)",
  deep:["Bytecode is platform-independent intermediate code; the JVM loads .class files and executes them via interpreter or JIT.","HotSpot compiles \"hot code\" to native machine code (JIT), so long-running server-side Java isn't slow.","Oracle ships a new Java version every six months; LTS versions are 8/11/17/21; enterprises use almost exclusively LTS."],
  recap:"Source -> bytecode -> JVM execution; cross-platform via the JVM.",
  code:`// Source Main.java --javac--> Main.class (bytecode)
// Bytecode runs on any machine with a JVM
// That's Write Once, Run Anywhere`
},
"java-1-2":{
  summary:["Install a JDK (recommended LTS: 8/11/17/21), set JAVA_HOME and PATH.","Verify: java -version and javac -version both print version numbers.","IDE: IntelliJ IDEA (Community is free) or Eclipse; beginners can use VS Code + Extension Pack for Java."],
  pit:"\"Could not find or load main class\" usually means classpath or package/directory mismatch; run java from the correct root.",
  ex:{q:"Why recommend LTS versions?",a:"LTS (long-term support) versions get years of security updates and stable APIs; enterprises use almost exclusively LTS; non-LTS expires in six months."},
  target:"You can install and configure the JDK and compile/run your first program.",
  out:"java version \"21\" ...",
  deep:["JAVA_HOME points to the JDK install directory; PATH includes %JAVA_HOME%\\bin; many build tools depend on JAVA_HOME.","javac only compiles; java runs; use the class name (java Main), not the filename (java Main.class).","Multiple JDK versions can coexist; manage with SDKMAN! (Unix) or switching JAVA_HOME (Windows)."],
  recap:"Verify both java -version and javac -version print versions."
},
"java-1-3":{
  summary:["public class Main: all Java code lives in classes; the public class name must match the filename.","public static void main(String[] args) is the program entry; the JVM starts here.","System.out.println outputs; statements end with semicolons; braces delimit blocks."],
  pit:"A .java file can have only one public class, and the filename must match it — one of the most common beginner compile errors.",
  ex:{q:"Why must main be static?",a:"The JVM starts with no object instances; it can only call a static method by class name as the entry point."},
  target:"You can independently write and run Hello World, explaining each part.",
  out:"Hello, Java!",
  deep:["A .java file can have multiple classes but only one public class; the filename must match the public class name.","Each class gets its own .class file after compilation, loaded on demand at runtime.","main's String[] args receives command-line arguments; it can also be written String... args (varargs form)."],
  recap:"Class name = filename; entry is public static void main(String[] args)."
},
"java-1-4":{
  summary:["package declares the package name, usually reverse domain (com.example.demo), matching directory structure.","Comments: // single-line, /* */ multi-line, /** */ doc comments (javadoc generates docs).","Naming: classes UpperCamelCase, methods/variables lowerCamelCase, constants UPPER_SNAKE_CASE, packages all lowercase."],
  pit:"Package name not matching directories causes runtime class-not-found; ensure folder hierarchy matches package names.",
  ex:{q:"Why use packages?",a:"Avoid class name clashes, organize by feature, and enable finer encapsulation (package-private) with access modifiers."},
  target:"You can organize code with packages and naming conventions, and write doc comments.",
  out:"100",
  deep:["Packages serve three purposes: avoid naming clashes, organize by feature, and enable package-level visibility with access modifiers.","javadoc generates HTML from /** */ comments; writing them for public APIs is professional practice.","IDEs and linters widely adopt naming conventions: UpperCamelCase classes, lowerCamelCase methods, UPPER_SNAKE_CASE constants."],
  recap:"Package names are lowercase and match directories; constants are UPPER_SNAKE."
},

/* ==================== Java · Stage 2 ==================== */
"java-2-1":{
  summary:["Eight primitive types: byte, short, int, long, float, double, char, boolean; sizes are fixed and platform-independent.","Each has a wrapper class: Integer, Double, Character, etc., needed for objects (collections, generics, nullable).","Autoboxing/unboxing: Integer i = 10; int n = i; the compiler inserts valueOf/intValue."],
  pit:"Wrapper classes are objects; == compares references; Integer caches -128..127, so == fails outside that range — always use equals.",
  ex:{q:"When must you use wrapper classes?",a:"In collections (List<Integer>), when null is needed, or with reflection/generics that require objects; prefer primitives for local variables and computation."},
  target:"You can correctly use primitives and wrappers, avoiding the == trap.",
  out:"2147483647\n42",
  deep:["Integer caches -128..127, so Integer.valueOf(127)==valueOf(127) is true, but 128 is false.","Boxing/unboxing are compiler sugar; unnecessary boxing in loops causes significant overhead — avoid in hot paths.","Primitives hold values; wrappers hold references and can be null — a common NPE source."],
  recap:"Primitives hold values, wrappers hold references; always use equals for value comparison."
},
"java-2-2":{
  summary:["Variable declaration: type name = initializer; local variables must be assigned before use (compiler-enforced).","final on a variable means assign-once; final on a reference means the reference can't change (object contents still can).","Scopes: block ({}), method, class (fields); fields have defaults, locals don't."],
  pit:"Fields have defaults (int=0, reference=null), locals don't — misusing uninitialized locals is a compile error, while null fields cause runtime NPE.",
  ex:{q:"What does final on an object reference mean?",a:"It guarantees the reference never points elsewhere (readability and thread safety), but not that the object is immutable; true immutability needs immutable classes or defensive copies."},
  target:"You can use final correctly and understand default initialization differences.",
  out:"(prints list contents [a])",
  deep:["final variables must be assigned before construction completes; final fields support immutable objects and safe publication.","Fields have defaults (0/false/null), locals don't — this difference is the source of \"variable might not be initialized\" errors.","final references can't be rebound but object internals are mutable; true immutability needs immutable classes or defensive copies."],
  recap:"final governs the reference, not contents; locals must be assigned first."
},
"java-2-3":{
  summary:["Arithmetic + - * / %, relational and logical && || ! (short-circuit), ternary ?:, bitwise & | ^ ~ << >> >>>.","Automatic promotion: byte/short/char promote to int in expressions; small and large types promote to the larger.","Explicit cast needs (type), may lose precision; integer division truncates."],
  pit:"1_000_000_000 * 10 overflows: literals default to int, computed first then assigned to long; write 1_000_000_000L * 10.",
  ex:{q:"Difference between && and &?",a:"&& short-circuits (skips the right side if left is false), used for null checks; & always evaluates both sides and is also bitwise AND."},
  target:"You can write correct mixed-type expressions and spot overflow risks.",
  out:"3\n3.5\n1",
  deep:["byte/short/char promote to int in arithmetic, so byte b = b1 + b2 needs an explicit cast.","long literals must end in L, or values beyond int range (like 10000000000) fail to compile.",">>> is unsigned right shift (fills zeros), >> is signed (fills sign bit); results differ for negatives."],
  recap:"Small types promote to int; suffix L for long, f/d for float/double."
},
"java-2-4":{
  summary:["Scanner reads: nextInt/nextDouble/next/nextLine; validate with hasNextXxx.","System.out.printf supports %d, %f, %s, %.2f, %n; String.format returns a formatted string.","nextLine right after nextInt reads an empty line because the newline stays in the buffer."],
  pit:"After nextInt/nextLine, call nextLine once more to eat the leftover newline, or you get an empty string.",
  ex:{q:"Scanner vs BufferedReader?",a:"Scanner is convenient but slow (regex parsing); for large input or contests, use BufferedReader + StringTokenizer, an order of magnitude faster."},
  target:"You can read various types with validation and formatted output.",
  out:"received 18",
  deep:["Scanner parses via regex and is slow; use BufferedReader + StringTokenizer for contests and large input.","nextInt followed by nextLine reads an empty line because the newline remains in the buffer; call nextLine once extra to eat it.","System.out.printf and String.format share format strings; %n is the platform-independent newline, preferred over \\n."],
  recap:"Use Scanner for convenience or BufferedReader for speed; output with printf."
},

/* ==================== Java · Stage 3 ==================== */
"java-3-1":{
  summary:["if / else if / else as in C-family languages; conditions must be boolean (Java doesn't allow integers as conditions).","Traditional switch supports int, char, String, enum; each case needs break or it falls through.","Java 14+ switch expressions use -> arrows, can return values directly, and don't fall through."],
  pit:"if (flag = true) is a compile error in Java (can't use assignment as condition), which ironically saves beginners from C's classic trap.",
  ex:{q:"How are switch expressions better than traditional switch?",a:"No fall-through, direct return values, and the compiler can check exhaustiveness (with enums and sealed types)."},
  target:"You can use if and switch (including expressions) for multi-branch logic.",
  out:"A",
  deep:["Switch expression arms must be exhaustive or use default; with enums, missing branches trigger compiler warnings.","yield returns values from code blocks in switch expressions; arrow form doesn't need yield.","Switch supports: byte/short/char/int, String, enum, and (preview) pattern matching."],
  recap:"Java 14+ switch expressions use arrows; no fall-through."
},
"java-3-2":{
  summary:["for / while / do-while as in C; the enhanced for (for-each) simplifies traversing arrays and Iterables.","Enhanced for doesn't give indices; use traditional for or iterators when you need them or must modify structure.","Adding/removing during enhanced for throws ConcurrentModificationException; use iterator.remove()."],
  pit:"The loop variable in enhanced for is a copy; modifying it doesn't change array/collection elements (for references, you modify object contents, not the reference).",
  ex:{q:"What types work with for-each?",a:"Arrays, and any type implementing java.lang.Iterable (List, Set, and other collections)."},
  target:"You can choose the right loop form for arrays and collections.",
  out:"(sum is 6)",
  deep:["Enhanced for uses iterators under the hood, so calling collection.remove during traversal triggers ConcurrentModificationException.","To delete during traversal, use Iterator.remove() or removeIf(), or CopyOnWriteArrayList.","Index-based loops suit when you need indices or in-place modification; enhanced for is for read-only traversal."],
  recap:"Read-only traversal: enhanced for; deleting while iterating: iterator or removeIf."
},
"java-3-3":{
  summary:["break exits the innermost loop or switch; continue skips the rest of the current iteration.","Java supports labeled break/continue to directly exit the specified outer loop (C lacks this).","Labels must immediately precede the loop; overuse makes flow hard to follow; use sparingly in nested loops."],
  pit:"Labeled jumps only affect the marked loop; Java has no goto (it's a reserved word, not enabled).",
  ex:{q:"When are labels most appropriate?",a:"When a nested inner loop must end the outer loop based on an inner condition; otherwise prefer extracting the loop into a method and returning."},
  target:"You can use break/continue (including labeled) to control nested loops.",
  out:"0,0 0,1 0,2 1,0 1,1",
  deep:["Labeled break is Java's only language-level way to break out of multiple loops; otherwise extract the loop into a method and return.","Labeled continue goes directly to the next iteration of the labeled outer loop; distinguish the semantics carefully.","Labels only apply to the immediately following loop; writing them elsewhere is meaningless."],
  recap:"Multi-level exit: labeled break; otherwise prefer extracting methods and returning."
},
"java-3-4":{
  summary:["Common patterns: accumulate, count, find-extremes, sentinel loops, nested loops for patterns.","Debugging: IDE breakpoints + step + variable inspection; or System.out.println for temporary tracing.","Boundary checks: empty collection, single element, max/min — bugs love these spots."],
  pit:"Loop condition <= vs <, initial value 0 vs first element — the two biggest sources of off-by-one and extremum bugs.",
  ex:{q:"Program output is wrong; what's the first step?",a:"Narrow the range: print/breakpoint to confirm input and loop count match expectations, then locate where it diverges."},
  target:"You can write boundary-correct loops and use breakpoints to locate issues.",
  out:"5 (max of array)",
  deep:["Off-by-one and extremum initial values are the two biggest loop bug sources: indices 0..length-1, max starts with the first element.","IDE conditional breakpoints and \"evaluate expression\" observe intermediate state without code changes — more efficient than print.","Write the invariant (a condition that stays true throughout the loop) in one sentence before coding; greatly reduces bugs."],
  recap:"Think through boundaries and invariants before writing loops."
},

/* ==================== Java · Stage 4 ==================== */
"java-4-1":{
  summary:["Arrays are fixed-length same-type containers: int[] a = new int[5]; or int[] a = {1,2,3};","Length via a.length (property, not method); out-of-bounds throws ArrayIndexOutOfBoundsException.","java.util.Arrays provides sort, binarySearch, fill, copyOf, equals, toString static methods."],
  pit:"Arrays.asList(intArray) gives a List with one element (the whole array); primitive arrays must first convert to wrapper types.",
  ex:{q:"Array vs ArrayList?",a:"Fixed length and performance: array; variable length and rich operations: ArrayList (also array-backed, auto-grows)."},
  target:"You can create, sort, copy arrays and use Arrays utilities.",
  out:"[1, 2, 3]",
  deep:["Array length is fixed at creation; use ArrayList for dynamic length.","Arrays.asList returns a fixed-size List (array-backed); add/remove throws UnsupportedOperationException.","Arrays are covariant (String[] is a subtype of Object[]), causing ArrayStoreException — one reason generics are invariant."],
  recap:"Fixed length: array; dynamic: ArrayList."
},
"java-4-2":{
  summary:["Java 2D arrays are \"arrays of arrays\": int[][] m = new int[3][4]; each row can have a different length.","Traverse with nested enhanced for; m.length is rows, m[i].length is columns in row i.","main's String[] args receives command-line arguments, the most primitive way to interact externally."],
  pit:"Irregular 2D arrays (rows of different lengths) are common; use row.length rather than a fixed column count.",
  ex:{q:"Why aren't Java 2D arrays contiguous in memory?",a:"Because they're arrays of arrays; each row is an independently allocated object; simulate true contiguous multi-dim arrays with a 1D array."},
  target:"You can use 2D arrays and command-line arguments.",
  out:"1 2 3\n4 5 6",
  deep:["Each row of a Java 2D array is an independent array, so rows can have different lengths (ragged arrays).","Copying 2D arrays requires row-by-row clone; direct clone only shares row references.","Command-line args[0] is the first argument; the program name isn't included (unlike C)."],
  recap:"2D array = array of arrays; rows can have different lengths."
},
"java-4-3":{
  summary:["String is immutable: any \"modification\" creates a new object, enabling safe sharing and hash caching.","String literals live in the constant pool; identical literals reuse the same object; new String(\"a\") forces a new object.","Compare content with equals; == compares references; concatenation in loops creates many temporary objects."],
  pit:"Don't use == to compare strings — the #1 beginner bug; the constant pool makes some cases \"look right\" but never rely on it.",
  ex:{q:"Why is String designed to be immutable?",a:"Safety (can't be tampered with as a parameter), cacheable hash (fast HashMap), thread safety, and constant pool sharing."},
  target:"You understand immutability and the constant pool, and compare strings correctly.",
  out:"true\nfalse\ntrue",
  deep:["The string constant pool is in the heap (since Java 7); intern() puts runtime strings into the pool and returns the pool reference.","String immutability enables hash caching: hash is computed once, so String keys are fast in HashMap.","Compile-time constant folding: \"a\"+\"b\" is \"ab\" at compile time (so == is true); runtime concatenation creates new objects."],
  recap:"Strings are immutable with a constant pool; compare content with equals."
},
"java-4-4":{
  summary:["StringBuilder (non-thread-safe, fast) and StringBuffer (synchronized, slow) for frequent concatenation.","Methods: append, insert, delete, reverse, toString; pre-set capacity to reduce reallocation.","Text processing: split (regex), String.join, replaceAll, matches, and String.format."],
  pit:"Using += in loops is O(n²) and very slow on large data; always use StringBuilder.",
  ex:{q:"split's argument being a regex means what?",a:"Special characters need escaping: split by dot needs split(\"\\\\.\"); . in regex means any character."},
  target:"You can efficiently concatenate with StringBuilder and do common text processing.",
  out:"[a, b, c]\na-b",
  deep:["+= in loops creates a new StringBuilder each time — O(n²); explicit StringBuilder is O(n).","StringBuffer methods are synchronized; slower than StringBuilder in single-threaded use unless thread safety is needed.","split's argument is regex; escape special chars: split by pipe needs split(\"\\\\|\")."],
  recap:"Loop concatenation: StringBuilder; split takes a regex."
},

/* ==================== Java · Stage 5 ==================== */
"java-5-1":{
  summary:["Methods consist of access modifier, return type, name, parameter list, body; static methods belong to the class.","Overloading: same name, different parameters (count or type); return type isn't part of resolution.","Varargs: void f(int... nums) is essentially an array and must be the last parameter."],
  pit:"Don't rely on autoboxing/varargs to distinguish overloads; it causes ambiguous or unexpected calls.",
  ex:{q:"When to use static methods?",a:"For tool methods that don't depend on instance state (Math.max, Integer.parseInt); methods affected by object state should be instance methods."},
  target:"You can define overloaded and varargs methods.",
  out:"(calls the matched overload)",
  deep:["Overload resolution is compile-time: exact match -> promotion -> boxing/varargs.","Varargs are essentially arrays; pass an array or discrete args; be careful passing null (treated as the array itself).","Method signature = name + parameter types; return type isn't part of it, so you can't overload on return type alone."],
  recap:"Overload on parameters; varargs must be last."
},
"java-5-2":{
  summary:["Java is pass-by-value: primitives get copies of values; reference types get copies of references.","Reassigning a parameter inside a method doesn't affect the argument, but modifying the object through a reference does.","To \"return multiple values\", return an object/array or pass a mutable container."],
  pit:"\"Java passes objects by reference\" is a widespread misconception — it passes copies of reference values, so exchanging two references doesn't work.",
  ex:{q:"Why can't you write swap for object references in Java?",a:"Because methods receive copies of references; swapping copies doesn't change the caller's variables; you can only swap array/container elements inside."},
  target:"You can accurately explain pass-by-value and predict side effects.",
  out:"hi! (append works, reset doesn't)",
  deep:["Java is pass-by-value: reference types receive copies of references; modifying contents works, rebinding doesn't.","That's why Java can't write swap(Object a, Object b) — it swaps only two copies.","To return multiple values, return a dedicated result object or array."],
  recap:"Pass-by-value; modifying contents works, rebinding doesn't."
},
"java-5-3":{
  summary:["Classes are templates for objects; objects are instances: new allocates on the heap and calls the constructor.","Constructors have the same name as the class and no return type; can be overloaded; without any constructor, the compiler gives a no-arg default.","this refers to the current object, disambiguating same-named fields/params, or calling another constructor this(...)."],
  pit:"After writing a parameterized constructor, the compiler no longer provides the no-arg default; frameworks (ORMs) relying on reflection fail — add it explicitly if needed.",
  ex:{q:"Are constructors inherited?",a:"No. Subclasses must call the parent constructor (super(...), or implicitly the no-arg parent constructor)."},
  target:"You can define classes, constructors, and use this for initialization.",
  out:"(no output: demonstrates class construction)",
  deep:["After writing a parameterized constructor, the compiler stops providing the no-arg one; frameworks (Jackson, MyBatis) that create objects via reflection fail.","this() must be the first statement; super() too, so they can't coexist.","Construction order: static blocks -> parent constructor -> instance field init -> this constructor body."],
  recap:"Constructors match class names with no return type; add a no-arg one if you wrote a parameterized one."
},
"java-5-4":{
  summary:["Encapsulation: fields private, accessed via public getters/setters where validation can happen on assignment.","static fields belong to the class, shared by all instances; static methods can't access instance members (no this).","Access modifiers: private (this class) < package-private (same package) < protected (same package + subclasses) < public."],
  pit:"Don't blindly generate getters/setters for every field — expose only what truly needs external access; that's the point of encapsulation.",
  ex:{q:"Difference between protected and package-private?",a:"protected additionally allows subclasses in different packages; package-private is stricter, visible only in the same package."},
  target:"You can design well-encapsulated classes and use static and access modifiers.",
  out:"(no output: demonstrates encapsulation)",
  deep:["static members belong to the class, initialized at class load, shared by all instances; static methods can't use this/super.","Init order: parent static -> child static -> parent instance -> parent ctor -> child instance -> child ctor.","Package-private (no modifier) is stricter than protected, visible only within the package — a common visibility for internal implementation."],
  recap:"Private fields + getters/setters; use static for shared data."
},

/* ==================== Java · Stage 6 ==================== */
"java-6-1":{
  summary:["extends means inheritance; subclasses get non-private parent members; Java has single class inheritance but multiple interface implementation.","super(...) calls the parent constructor and must be the first statement; super.method() calls the overridden parent method.","Subclass construction always builds the parent first; without super(), the no-arg parent constructor is called implicitly."],
  pit:"If the parent has no no-arg constructor, subclasses must explicitly super(...), or compilation fails — a common error source.",
  ex:{q:"How to address single inheritance limits?",a:"Use interfaces (multi-implementation) for capability dimensions and composition for reuse; that's \"composition over inheritance\" in Java."},
  target:"You can correctly use inheritance, super, and method overriding.",
  out:"Woof! (polymorphic call to the subclass version)",
  deep:["Subclass constructors call super() by default; if the parent has no no-arg constructor, you must explicitly write super(...).","Override rules: same signature, covariant return type, no narrower access, no broader checked exceptions.","Fields aren't polymorphic: accessing fields through a parent reference uses the declared type, so fields should be encapsulated."],
  recap:"extends single inheritance; super() must be first in the constructor."
},
"java-6-2":{
  summary:["Override: subclasses reimplement parent instance methods; signatures must be compatible; access can't be stricter.","Polymorphism: a parent reference points to a subclass object; calling an overridden method runs the subclass version (decided at runtime).","@Override lets the compiler verify the override; always add it."],
  pit:"Fields aren't polymorphic: field access uses the reference's declared type, not the actual object type; keep fields private.",
  ex:{q:"Overloading vs overriding?",a:"Overloading is compile-time, same class, same name different params; overriding is runtime, parent-child, same signature reimplementation."},
  target:"You understand dynamic binding and use @Override to ensure correct overriding.",
  out:"Woof!",
  deep:["Java methods are virtual by default (except static/final/private); same-named subclass methods override automatically, no virtual keyword needed.","The JVM uses a virtual method table (vtable) for dynamic dispatch; final/private methods bind statically and can be inlined.","@Override isn't required, but without it a typo becomes a \"new method\" — a hard-to-find bug."],
  recap:"Add @Override when overriding; fields aren't polymorphic."
},
"java-6-3":{
  summary:["Abstract class: abstract class, may contain abstract methods (no impl) and concrete methods/fields; can't be instantiated.","Interface: interface, expresses a capability contract; Java 8+ allows default and static methods, Java 9+ private methods.","A class extends at most one abstract class but implements multiple interfaces — interfaces are Java's multi-inheritance mechanism."],
  pit:"If two interfaces have the same default method, the implementing class must override it to resolve the conflict (compiler-enforced).",
  ex:{q:"Abstract class vs interface?",a:"Need shared state or construction logic, express is-a: abstract class; just contract \"can do\", multi-implementation: interface."},
  target:"You can choose abstract class or interface per scenario and implement correctly.",
  out:"(no output: demonstrates interfaces and abstract classes)",
  deep:["Abstract classes express is-a and can hold state; interfaces express can-do; after Java 8 the line blurs with default methods.","A class extends one abstract class but implements multiple interfaces — Java's multi-inheritance mechanism.","default conflicts must be overridden; use X.super.method() to call a specific parent interface's implementation."],
  recap:"State: abstract class; capability: interface; interfaces can be multi-implemented."
},
"java-6-4":{
  summary:["All classes inherit Object; common methods: toString, equals, hashCode, getClass, clone.","Overriding equals must also override hashCode (equal objects must have equal hash codes, or HashMap breaks).","Inner classes: member inner, static nested, local inner, anonymous (the pre-Lambda approach)."],
  pit:"equals must use instanceof and null-checks; parameter type must be Object, or it's overloading, not overriding.",
  ex:{q:"Why override equals and hashCode together?",a:"Hash tables rely on \"equal objects have equal hash codes\"; overriding only equals puts equal objects in different buckets and lookup fails."},
  target:"You can correctly override Object methods and understand inner class use.",
  out:"Point(1,2) (toString works)",
  deep:["equals contract: reflexive, symmetric, transitive, consistent, false vs null; symmetry is the easiest to violate.","hashCode contract: equal objects must have equal hash codes; unequal objects may share hashes (collisions).","Objects.hash(...) is the easiest; cache hash codes for frequently keyed objects (String does this)."],
  recap:"Override equals and hashCode together; use Objects utilities."
},

/* ==================== Java · Stage 7 ==================== */
"java-7-1":{
  summary:["Under Throwable: Error (serious, don't catch) and Exception (handleable).","Exception splits into checked (must declare or catch, e.g. IOException) and unchecked (RuntimeException and subclasses).","try-catch-finally: finally always runs (unless JVM exits or System.exit)."],
  pit:"Catching and doing nothing (empty catch) hides problems; at least log or rethrow.",
  ex:{q:"What's the point of checked exceptions?",a:"Force callers to handle predictable failures (like IO), making error paths visible at compile time; overuse is why they're controversial."},
  target:"You can distinguish exception types and write reasonable catches.",
  out:"not a number: For input string: \"abc\"",
  deep:["Error (like OutOfMemoryError) is a JVM-level serious problem; don't catch or try to recover.","Checked exceptions force a compile-time decision: handle (catch) or declare (throws) — Java's feature and controversy.","finally runs before return, so a return in finally overwrites the prior return value — never return from finally."],
  recap:"Don't catch Error; Exception splits checked/unchecked; finally does cleanup."
},
"java-7-2":{
  summary:["Custom exceptions extend Exception (checked) or RuntimeException (unchecked) with meaningful constructors and messages.","try-with-resources: resources implementing AutoCloseable in try(...) auto-close without finally.","Exception chaining: throw new ServiceException(\"order failed\", e) preserves the original cause for debugging."],
  pit:"Don't return from finally — it overwrites try/catch return values and swallows in-flight exceptions.",
  ex:{q:"Checked vs runtime exceptions?",a:"Callers can reasonably recover: checked; programming errors (bad args, null): runtime; don't force callers to try-catch everywhere."},
  target:"You can write custom exceptions and use try-with-resources.",
  out:"(file auto-closed, no finally needed)",
  deep:["try-with-resources auto-calls close(), and suppressed exception mechanism preserves the main exception while adding close() exceptions as suppressed.","Multiple resources separated by semicolons; closed in reverse declaration order.","Custom exceptions should usually extend RuntimeException (unless callers can truly recover), avoiding polluting caller code."],
  recap:"Resources implementing AutoCloseable go in try-with-resources."
},
"java-7-3":{
  summary:["Under Collection: List (ordered, duplicates), Set (unique), Queue; Map is a separate key-value structure.","Common impls: ArrayList (array, fast random access), LinkedList (list, fast insert/delete), HashSet/TreeSet, HashMap/TreeMap.","Choose based on: ordered? duplicates allowed? read/write ratio? need sorted/range queries?"],
  pit:"Calling list.remove() in enhanced for throws ConcurrentModificationException; use iterator.remove() or removeIf.",
  ex:{q:"How does HashMap work?",a:"Hash the key to find a bucket, compare with equals inside; Java 8+ turns collisions into red-black trees; rehash on growth, so set initial capacity."},
  target:"You can choose collection types and safely add/remove/traverse.",
  out:"(no output: demonstrates collection ops)",
  deep:["ArrayList grows 1.5x; LinkedList has two extra refs per node; ArrayList is faster in most scenarios.","HashSet is backed by HashMap (value fixed to PRESENT); deduplication is key deduplication.","TreeMap is red-black tree, ordered O(log n); HashMap average O(1), unordered."],
  recap:"Reads: ArrayList; dedup: HashSet; key-value: HashMap."
},
"java-7-4":{
  summary:["Generics provide compile-time type safety and eliminate casts: List<String> only holds Strings.","Generics erase at compile time (to raw type + necessary casts), so runtime can't get the concrete type.","Wildcards: <?> unknown, <? extends T> upper bound (read-only producer), <? super T> lower bound (write-only consumer) — PECS."],
  pit:"Can't new T[], can't create generic arrays, can't catch generic exceptions — all type erasure limitations.",
  ex:{q:"Why isn't List<Dog> a subtype of List<Animal>?",a:"Generics are invariant: allowing assignment would let you add Cat, breaking type safety; use ? extends Animal for covariance."},
  target:"You can write generic methods and use wildcards for variance.",
  out:"3.0 (sum of Number subtypes)",
  deep:["Type erasure makes generics invisible at runtime: List<String> and List<Integer> have the same Class.","PECS: read from (producer) use extends, write into (consumer) use super, both: no wildcard.","Bridge methods are synthetic methods the compiler generates to preserve polymorphism after erasure."],
  recap:"Generics are a compile-time safety net; wildcards follow PECS."
},

/* ==================== Java · Stage 8 ==================== */
"java-8-1":{
  summary:["Streams split by direction (input/output) and unit (byte streams InputStream/OutputStream, character streams Reader/Writer).","FileInputStream/FileOutputStream work in bytes, suited for images, archives, and other binary data.","Always close; JDK 7+ try-with-resources is easiest."],
  pit:"Unbuffered single-byte reads/writes are extremely slow (system call each time); always wrap in BufferedInputStream or batch with a byte array.",
  ex:{q:"Byte vs character streams?",a:"Byte streams work in bytes for arbitrary binary data; character streams work in chars with encoding, for text only."},
  target:"You can use byte streams for file copy and binary read/write.",
  out:"(creates b.bin with identical content)",
  deep:["IO streams are a textbook decorator pattern: FileInputStream -> BufferedInputStream -> DataInputStream layers enhance.","Buffered streams default 8KB, merging many small I/O into fewer large ones, often 1-2 orders of magnitude faster.","Close the outermost stream; decorators close inner streams layer by layer; try-with-resources guarantees this."],
  recap:"Byte streams for binary; always buffer and close."
},
"java-8-2":{
  summary:["Reader/Writer handle chars; InputStreamReader/OutputStreamWriter bridge bytes and chars with a specified encoding.","BufferedReader provides readLine, BufferedWriter provides newLine — the workhorses of text processing.","Garbled text always stems from encoding mismatch — explicitly specify StandardCharsets.UTF_8 on both read and write sides."],
  pit:"Don't use platform default encoding (new FileReader(path) can't specify); different systems produce different garbling.",
  ex:{q:"Why does readLine miss the last line?",a:"Usually a condition or loop bug, or the file lacks a trailing newline; readLine returns null at EOF, and the last line without newline returns normally."},
  target:"You can correctly read/write text files with buffered character streams.",
  out:"(prints file contents line by line)",
  deep:["Garbling is encoding/decoding with different charsets; explicitly use StandardCharsets.UTF_8 on both sides to fix it.","InputStreamReader is the byte->char bridge; specify Charset in its constructor, or it uses platform default.","BufferedReader.readLine returns null at EOF; constant memory for line-by-line processing of large files."],
  recap:"Character streams for text; explicitly specify UTF-8 on both sides."
},
"java-8-3":{
  summary:["Serializable is a marker interface; objects implementing it can be serialized to bytes by ObjectOutputStream.","transient fields aren't serialized; serialVersionUID checks version compatibility.","Serialization is mainly for simple persistence or RPC; use JSON/Protobuf for cross-language or long-term storage."],
  pit:"Deserializing untrusted data is a serious security hole (gadget chains execute arbitrary code) — don't use Java native serialization for public APIs.",
  ex:{q:"Why does deserialization fail after field changes?",a:"serialVersionUID mismatch throws InvalidClassException; declaring UID explicitly lets compatible changes still read old data."},
  target:"You can do basic object serialization and understand its risks and use cases.",
  out:"(deserializes to an object with the same name)",
  deep:["serialVersionUID mismatch throws InvalidClassException; explicitly declaring UID is prerequisite for reading old data.","transient fields aren't serialized and default after deserialization; good for passwords and sensitive data.","Java native serialization has severe security risks (deserialization gadget attacks); new projects should use JSON/Protobuf."],
  recap:"Serializable for serialization; mark sensitive fields transient."
},
"java-8-4":{
  summary:["NIO.2 (Java 7) provides Path, Paths, Files utilities with cleaner APIs and clearer errors.","Files provides readAllLines, write, copy, move, delete, walk, newBufferedReader and more.","Channel + ByteBuffer provide buffer-oriented IO; FileChannel.transferTo enables zero-copy efficient transfer."],
  pit:"Files.walk / Files.lines return Streams that must be closed (try-with-resources) or file handles are exhausted.",
  ex:{q:"Core improvements of NIO over traditional IO?",a:"Buffer-oriented channels (zero-copy, non-blocking), powerful filesystem abstraction (Path/Files), and async IO."},
  target:"You can do common file and directory operations with NIO.2.",
  out:"(copies successfully and lists all file paths)",
  deep:["Files.copy/move support REPLACE_EXISTING, COPY_ATTRIBUTES options, far more reliable than hand-written stream loops.","Files.walk and Files.lines return Streams that must be closed (try-with-resources), or file handles are exhausted.","FileChannel.transferTo uses OS zero-copy, much faster than user-space loops for large files."],
  recap:"Prefer NIO.2 Files; remember to close Streams."
},

/* ==================== Java · Stage 9 ==================== */
"java-9-1":{
  summary:["Creation: extend Thread, implement Runnable, implement Callable (return values and throw exceptions).","Lifecycle: NEW -> RUNNABLE -> BLOCKED/WAITING/TIMED_WAITING -> TERMINATED.","start() launches a new thread; calling run() directly is just a normal method call (classic interview trap)."],
  pit:"Don't call run() directly; don't use stop()/suspend() (deprecated, breaks consistency) — use interrupt flags for cooperative stop.",
  ex:{q:"Difference between start() and run()?",a:"start() asks the JVM for a new thread and calls run() concurrently; calling run() executes serially in the current thread."},
  target:"You can create threads, wait for completion, and understand state transitions.",
  out:"(main thread continues after child threads finish)",
  deep:["start() has the JVM create a system thread and callback run(); direct run() is a plain method call, no concurrency.","Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED — these appear in jstack.","Stop threads cooperatively via interrupt; deprecated stop() forcibly releases locks and leaves object state inconsistent."],
  recap:"Start with start(); wait with join(); stop via interrupt."
},
"java-9-2":{
  summary:["Race conditions: multiple threads reading/writing shared data make results depend on execution order; synchronized guarantees mutual exclusion and visibility.","synchronized on methods or blocks locks an object (instance methods lock this, static methods lock the Class object).","volatile guarantees visibility and forbids reordering, but not compound-operation atomicity (i++ is still unsafe)."],
  pit:"The locked object must be the same: synchronized(new Object()) or locking different instances provides no mutual exclusion.",
  ex:{q:"Does volatile guarantee thread safety?",a:"Only visibility and ordering, not atomicity; enough for one-writer-many-readers flags, but compound operations need locks or atomics."},
  target:"You can correctly handle shared data with synchronized/volatile.",
  out:"(correctly accumulates to 200000)",
  deep:["synchronized guarantees mutual exclusion, visibility, and ordering (happens-before); exiting a block flushes changes to main memory.","volatile only guarantees visibility and forbids reordering, not compound atomicity; count++ still needs locks or atomics.","Lock the same object: instance methods lock this, static methods lock Class; locking different objects is no lock."],
  recap:"Mutual exclusion: synchronized; flags: volatile; counters: atomics."
},
"java-9-3":{
  summary:["ReentrantLock provides interruptible, timed, fair locks with Condition for precise wait/notify.","Concurrent containers: ConcurrentHashMap (segmented/CAS), CopyOnWriteArrayList (read-heavy), BlockingQueue.","Thread pools: ThreadPoolExecutor and factories (newFixedThreadPool), avoid unbounded thread creation."],
  pit:"Executors.newCachedThreadPool creates unbounded threads, a severe production risk; manually new ThreadPoolExecutor with bounded queues.",
  ex:{q:"ConcurrentHashMap vs synchronizedMap?",a:"The former uses fine-grained locks/CAS with high concurrency and atomic ops (computeIfAbsent); the latter just locks every method with the same monitor."},
  target:"You can use JUC utilities for high-concurrency safe code.",
  out:"1000000 (atomic accumulation correct)",
  deep:["ConcurrentHashMap (Java 8+) uses CAS + synchronized on bucket heads; reads are mostly lock-free, far more concurrent than Hashtable.","Pool params: core size, max size, keep-alive, queue, rejection policy; bounded queues are key to preventing OOM.","LongAdder beats AtomicLong under high contention by spreading hotspots across cells (space for time)."],
  recap:"Concurrent containers + thread pools are production standard; don't use unbounded queues."
},
"java-9-4":{
  summary:["CountDownLatch (one-shot countdown), CyclicBarrier (reusable barrier), Semaphore (permits) for thread coordination.","CompletableFuture supports chained async: thenApply / thenCompose / allOf / exceptionally.","Deadlock diagnosis: jstack thread stacks, or jconsole/VisualVM; prevent deadlocks with fixed lock ordering and timeouts."],
  pit:"CompletableFuture uses the common ForkJoinPool by default; blocking tasks bog it down — pass a custom pool for IO-heavy work.",
  ex:{q:"CountDownLatch vs CyclicBarrier?",a:"Latch is one-shot (wait for others); Barrier is reusable (everyone arrives then proceeds together)."},
  target:"You can orchestrate async tasks with concurrency utilities and CompletableFuture.",
  out:"(results after async orchestration)",
  deep:["CompletableFuture defaults to ForkJoinPool.commonPool; blocking tasks bog it down; pass a custom pool for IO.","thenApply is synchronous; thenApplyAsync switches threads; handle errors with exceptionally/handle.","CountDownLatch is one-shot, CyclicBarrier reusable; Phaser is a more flexible phased version."],
  recap:"Async orchestration: CompletableFuture; coordination: Latch/Barrier/Semaphore."
},

/* ==================== Java · Stage 10 ==================== */
"java-10-1":{
  summary:["Functional interfaces have exactly one abstract method (mark with @FunctionalInterface), e.g. Runnable, Comparator, Function.","Lambda syntax: (params) -> expression or { block }; param types and parentheses can be omitted (single param).","Method references: String::length, System.out::println, ClassName::new — shorthand for lambdas."],
  pit:"External local variables referenced in lambdas must be final or effectively final (can't be reassigned) because they're captured into the closure.",
  ex:{q:"What did lambdas simplify in Java?",a:"They make \"passing behavior\" cheap: sorting rules, callbacks, event handlers no longer need anonymous inner class boilerplate."},
  target:"You can simplify collections and callbacks with lambdas and method references.",
  out:"Bob Ann (sorted by length)",
  deep:["Functional interfaces can have only one abstract method; default/static methods don't count; @FunctionalInterface has the compiler check.","Lambda-captured locals must be final or effectively final, copied into the closure and never reassigned.","Four method reference forms: Class::staticMethod, object::instanceMethod, Class::instanceMethod, Class::new (constructor ref)."],
  recap:"Lambdas are instances of functional interfaces; captured variables can't be reassigned."
},
"java-10-2":{
  summary:["Stream isn't a data structure; it's a lazy computation pipeline over a source: intermediate ops (filter/map/sorted) + terminal ops (collect/reduce/forEach).","Common: filter, map, flatMap, distinct, sorted, limit, collect(groupingBy/joining), reduce.","parallelStream uses ForkJoinPool for CPU-intensive, shared-state-free tasks; small data is actually slower."],
  pit:"Streams are consumed once; reusing after a terminal op throws IllegalStateException; stateful ops (sorted/distinct) add parallel overhead.",
  ex:{q:"When not to use Stream?",a:"When you need mid-loop break, need to mutate outer locals, or complex logic needs debugging — traditional loops are clearer and more controllable."},
  target:"You can use Stream for filtering, mapping, grouping, and sorting.",
  out:"{peripherals=299.0} (grouped sum by category)",
  deep:["Stream intermediate ops are lazy; only terminal ops (collect/forEach/reduce) trigger the pipeline.","Streams are consumed once; reuse throws IllegalStateException.","parallelStream suits CPU-intensive, shared-state-free, large data; small datasets are slower and share a common pool."],
  recap:"Intermediate ops are lazy, terminal ops trigger; a Stream is single-use."
},
"java-10-3":{
  summary:["java.time (Java 8+): LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Duration, Period — all immutable.","DateTimeFormatter formats and parses, thread-safe (replaces SimpleDateFormat).","Annotations (@Override, @Deprecated, custom) + reflection (Class, Method, Field) are the framework foundation (Spring, MyBatis)."],
  pit:"Date and Calendar are mutable, poorly designed old APIs; always use java.time in new code.",
  ex:{q:"What's the cost of reflection?",a:"Slightly slower (cache Class/Method to mitigate), loses compile-time type checks, breaks encapsulation (setAccessible); use cautiously outside frameworks."},
  target:"You can use java.time and understand annotations/reflection.",
  out:"2026-01-01\n30",
  deep:["java.time classes are all immutable and thread-safe, replacing mutable Date and confusing Calendar.","DateTimeFormatter is thread-safe (SimpleDateFormat isn't); define as a static constant and reuse.","Reflection can bypass generics (due to erasure) and access control; cost is performance and type safety."],
  recap:"Use java.time for dates; formatters are reusable; reflection only in frameworks."
},
"java-10-4":{
  summary:["Runtime data areas: method area (metaspace), heap, JVM stack, native method stack, program counter; objects on the heap, references on the stack.","GC: reachability analysis determines liveness; algorithms include mark-sweep, copy, mark-compact; collectors like G1, ZGC, Parallel.","Class loading: load -> verify -> prepare -> resolve -> initialize; the parent delegation model protects core libraries."],
  pit:"Memory leaks still exist in Java: long-lived containers holding short-lived object references (static Maps, unremoved listeners).",
  ex:{q:"Common OOME forms?",a:"Java heap space (heap too small/leak), Metaspace (too many classes), unable to create new native thread (too many threads), GC overhead limit exceeded (GC futile)."},
  target:"You can draw the JVM memory structure and use basic tools to observe GC and threads.",
  out:"(terminal prints heap and GC statistics)",
  deep:["The heap splits into young gen (Eden + Survivors) and old gen; objects allocate in Eden and age into old gen after multiple GCs.","GC Roots include stack locals, static fields, JNI references; objects unreachable from Roots are collectable.","Parent delegation: load requests go to the parent loader first, ensuring core classes like java.lang.Object aren't replaced."],
  recap:"Memory by region, collection by reachability, class loading by parent delegation."
}
};

/* ==================== Stage-level translations ==================== */
window.I18N.stage_en = {

/* ---------- Python ---------- */
"py-s1":{goal:"Install Python and a virtual environment, understand script vs interactive modes, and build the mental model of \"edit file -> run -> see result\".",
  links:[["Python official docs · Tutorial","https://docs.python.org/zh-cn/3/tutorial/index.html"],["Runoob · Python3 basics","https://www.runoob.com/python3/python3-basic-syntax.html"]],
  lab:{t:"Environment self-check & introduction",req:["Create intro.py with a triple-quoted docstring at the top","Print the current Python version (sys.version)","Print your nickname, Python goal, and today's date (datetime.date.today())"],hint:"if __name__ == \"__main__\": lets the file run directly and also be imported without running test code."},
  quiz:[
   {q:"What does Python use to delimit code blocks?",o:["Braces {}","Indentation","end keyword","Semicolons"],why:"Python uses indentation rather than braces — its most iconic syntax."},
   {q:"Command to create a virtual environment?",o:["python -m venv .venv","pip new env","python -m env","virtual python"],why:"venv is the standard library module; python -m venv is the most reliable way."},
   {q:"Correct command to run hello.py?",o:["run hello.py","python hello.py","python -c hello.py","exec hello"],why:"Put the filename directly after python."}]},
"py-s2":{goal:"Understand dynamic typing and references, correctly do type conversion, formatted output, and conditional checks.",
  links:[["Python official · Built-in types","https://docs.python.org/zh-cn/3/library/stdtypes.html"],["Runoob · Numbers and strings","https://www.runoob.com/python3/python3-number.html"]],
  lab:{t:"Profile card & BMI calculator",req:["Read nickname, height(m), weight(kg) via input, convert to float","Compute BMI = weight / height², print with 1 decimal","Print a verdict by BMI range (<18.5 underweight / <24 normal / else overweight)"],hint:"{bmi:.1f} in f-strings keeps one decimal; use if/elif/else for multiple conditions."},
  quiz:[
   {q:"Result of 7 // 2?",o:["3.5","3","4","3.0"],why:"// is floor division; 7//2 is 3."},
   {q:"Type returned by input()?",o:["int","float","str","depends on input"],why:"input always returns a string; convert manually for numbers."},
   {q:"Which is falsy in an if condition?",o:["\"0\"","[]","1","-1"],why:"Empty list is falsy; the string \"0\" is non-empty and truthy."}]},
"py-s3":{goal:"Use branches and loops for accumulation, filtering, and lookup; write concise comprehensions.",
  links:[["Python official · Control flow","https://docs.python.org/zh-cn/3/tutorial/controlflow.html"],["Runoob · Loops","https://www.runoob.com/python3/python3-loop.html"]],
  lab:{t:"Grade statistics tool",req:["Store at least 5 grades in a list","Use a loop to compute average, max, min (builtins allowed)","Use a comprehension to filter passing grades and count them"],hint:"[s for s in scores if s >= 60]; average = sum(scores)/len(scores)."},
  quiz:[
   {q:"range(2, 6) generates?",o:["2 3 4 5","2 3 4 5 6","1 2 3 4 5","2 5"],why:"range is half-open; the endpoint 6 is excluded."},
   {q:"Which keyword exits the entire loop?",o:["continue","break","pass","exit"],why:"break ends the whole loop; continue skips the current iteration."},
   {q:"Result of [x*2 for x in range(3)]?",o:["[0,2,4]","[2,4,6]","[0,1,2]","[0,2,4,6]"],why:"Multiply 0, 1, 2 by 2: [0, 2, 4]."}]},
"py-s4":{goal:"Choose the right container per scenario; master add/remove/update/lookup, slicing, dedup, and counting.",
  links:[["Python official · Data structures","https://docs.python.org/zh-cn/3/tutorial/datastructures.html"],["Real Python · Lists and Tuples","https://realpython.com/python-lists-tuples/"]],
  lab:{t:"Word frequency counter",req:["Given an English text, lowercase and split by spaces","Use a dict (or Counter) to count each word","Print top 5 words and counts by frequency descending"],hint:"freq[w] = freq.get(w, 0) + 1; sort with sorted(freq.items(), key=lambda kv: -kv[1])[:5]."},
  quiz:[
   {q:"Correct way to create an empty set?",o:["{}","set()","[]","()"],why:"{} creates an empty dict; use set() for an empty set."},
   {q:"nums[-1] means?",o:["First element","Last element","Second-to-last","Error"],why:"Negative indices count from the end; -1 is the last element."},
   {q:"Safe dict lookup without raising on missing keys?",o:["d[k]","d.get(k)","d.find(k)","d[k] or 0"],why:"get returns None or a default when the key is missing, no KeyError."}]},
"py-s5":{goal:"Break logic into reusable functions; understand scoping and closures; use key/lambda and decorators.",
  links:[["Python official · Defining functions","https://docs.python.org/zh-cn/3/tutorial/controlflow.html#defining-functions"],["Real Python · Decorators","https://realpython.com/primer-on-python-decorators/"]],
  lab:{t:"Reusable utility function library",req:["Write avg(nums) returning the mean, or 0 for an empty list","Write unique_sorted(items) returning sorted unique values","Write timing(func) decorator that prints elapsed time and preserves metadata","Add three self-test calls under if __name__ == \"__main__\":"],hint:"functools.wraps preserves __name__ and __doc__; use time.perf_counter() for more precise timing."},
  quiz:[
   {q:"What does a function without return return?",o:["0","None","Empty string","Error"],why:"Python functions return None by default."},
   {q:"Which default-argument style is dangerous?",o:["def f(x=0)","def f(lst=None)","def f(lst=[])","def f(s=\"\")"],why:"Mutable default objects are shared across calls, accumulating side effects."},
   {q:"A decorator is essentially?",o:["A class","A callable that takes a function and returns one","A loop","A compile-time annotation"],why:"A decorator is a higher-order function; @ is just sugar to call it."}]},
"py-s6":{goal:"Split code into modules and packages; use common stdlib; export and reproduce dependency manifests.",
  links:[["Python official · Modules","https://docs.python.org/zh-cn/3/tutorial/modules.html"],["Python official · stdlib overview","https://docs.python.org/zh-cn/3/library/index.html"]],
  lab:{t:"Split a word-counting tool",req:["Create package wordkit/: __init__.py, counter.py, cli.py","counter.py implements count_words(text) returning a dict","cli.py reads text under if __name__ == \"__main__\": and prints top 5 words","Run with python -m wordkit.cli"],hint:"Use relative imports inside the package: from .counter import ...; run from the parent directory with python -m."},
  quiz:[
   {q:"When a module is run directly, __name__ equals?",o:["Module name","__main__","None","Empty string"],why:"Directly-run modules set __name__ to __main__; imported modules use their filename."},
   {q:"Which import style is discouraged?",o:["import os","from os import path","from os import *","import os.path"],why:"Star imports pollute the namespace and hide name origins."},
   {q:"Common command to generate requirements.txt?",o:["pip list > requirements.txt","pip freeze > requirements.txt","pip save","pip export"],why:"pip freeze lists installed packages and exact versions."}]},
"py-s7":{goal:"Correctly read/write text and binary files; catch and handle exceptions; use context managers.",
  links:[["Python official · Reading and writing files","https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#reading-and-writing-files"],["Python official · Errors and exceptions","https://docs.python.org/zh-cn/3/tutorial/errors.html"]],
  lab:{t:"Todo list persistence",req:["Use a list to store todos; support add, complete (delete), and list","Save to todo.json on exit via json.dump; load on start via json.load","Show a friendly message rather than crashing when the file is missing or corrupt"],hint:"Catch json.JSONDecodeError on read; write with FILE.write_text(json.dumps(...), encoding=\"utf-8\")."},
  quiz:[
   {q:"To write a UTF-8 text file, write?",o:["open(p, w)","open(p, \"w\", encoding=\"utf-8\")","open(p, \"wb\")","open(p, \"w+\")"],why:"Explicit encoding avoids platform-default garbling."},
   {q:"When does finally run?",o:["Only on success","Only on exception","Always, with or without exceptions","Never"],why:"finally does cleanup that must run regardless; exceptions still propagate."},
   {q:"Custom exceptions usually inherit?",o:["BaseException","Exception","Error","object"],why:"Inheriting Exception lets normal except clauses catch it without trapping KeyboardInterrupt."}]},
"py-s8":{goal:"Organize code with classes; understand inheritance and polymorphism; master common dunder methods and dataclasses.",
  links:[["Python official · Classes","https://docs.python.org/zh-cn/3/tutorial/classes.html"],["Real Python · OOP in Python","https://realpython.com/python3-object-oriented-programming/"]],
  lab:{t:"Stack and queue with classes",req:["Stack class: push/pop/peek/__len__/__repr__; pop on empty raises custom EmptyError","Queue class using collections.deque with enqueue/dequeue","Extract a common Container base class via inheritance and override methods in subclasses","Write 3 self-test assertions"],hint:"__repr__ is for debugging; keep method signatures consistent when inheriting (Liskov substitution)."},
  quiz:[
   {q:"To call the parent initializer in a subclass, write?",o:["Animal.__init__(self)","super().__init__()","parent.init()","self.__super__()"],why:"super() finds the next class in the MRO; the only safe way under multiple inheritance."},
   {q:"To support len(obj), implement?",o:["__len__","__size__","__length__","__count__"],why:"__len__ is the length protocol method."},
   {q:"Main purpose of @dataclass?",o:["Faster execution","Auto-generates boilerplate methods","Enforces type checks","Implements inheritance"],why:"It generates __init__, __repr__, __eq__, and other repetitive boilerplate."}]},
"py-s9":{goal:"Understand lazy evaluation; choose threads, processes, or coroutines per scenario for concurrency.",
  links:[["Python official · itertools","https://docs.python.org/zh-cn/3/library/itertools.html"],["Python official · asyncio","https://docs.python.org/zh-cn/3/library/asyncio.html"]],
  lab:{t:"Concurrent download simulator",req:["Write a generator tasks(n) that lazily yields tasks","Use ThreadPoolExecutor to concurrently \"download\" (simulate with time.sleep) and print completion order","Rewrite as an asyncio version with asyncio.gather and compare timing"],hint:"Don't use blocking time.sleep in asyncio; it freezes the event loop; use asyncio.sleep; time with time.perf_counter()."},
  quiz:[
   {q:"What marks a generator function?",o:["return","yield","async","lambda"],why:"Functions containing yield return a generator when called."},
   {q:"For CPU-bound work in Python, usually choose?",o:["Threads","Processes","asyncio","Single thread"],why:"The GIL prevents threads from running bytecode in parallel; processes use multiple cores."},
   {q:"Which sleep function should coroutines use?",o:["time.sleep","asyncio.sleep","os.sleep","threading.sleep"],why:"time.sleep blocks the event loop; asyncio.sleep yields control back to it."}]},
"py-s10":{goal:"Write tests and type annotations; organize scripts into projects; understand references, copies, and memory management.",
  links:[["Python official · typing","https://docs.python.org/zh-cn/3/library/typing.html"],["Real Python · Memory management","https://realpython.com/python-memory-management/"]],
  lab:{t:"Upgrade a script into a project",req:["Organize into src/ and tests/; write pyproject.toml declaring package name and deps","Add type annotations to two core functions and pass mypy","Write 3 pytest cases covering normal, boundary, and exception paths","pip install -e . locally then run from the CLI"],hint:"Type annotations: def f(x: int) -> str; test exception paths with pytest.raises(ValueError)."},
  quiz:[
   {q:"Command to run pytest tests?",o:["python -m test","pytest","run tests","python test"],why:"Run pytest in the project root to auto-collect test_*.py."},
   {q:"Optional[int] is equivalent to?",o:["int","int | None","list[int]","Any type"],why:"Optional[T] is Union[T, None]; Python 3.10+ writes T | None."},
   {q:"Difference between copy.copy and copy.deepcopy?",o:["No difference","Shallow copies one level; deep copies recursively","deepcopy is faster","copy works only on dicts"],why:"Shallow copies share nested objects; deep copy duplicates every level."}]},

/* ---------- C ---------- */
"c-s1":{goal:"Set up the toolchain; understand the full edit -> preprocess -> compile -> assemble -> link -> run chain; independently compile and run a C program.",
  links:[["Runoob · C tutorial","https://www.runoob.com/cprogramming/c-tutorial.html"],["C-language Chinese net intro","https://c.biancheng.net/c/"]],
  lab:{t:"Self-introduction program v2",req:["Use printf to print 3 lines: nickname, C-learning goal, today's date","Use at least two format specifiers (e.g. %s, %d, %5.2f)","Comment every function and key line; compile with -Wall with zero warnings"],hint:"Compile with gcc -Wall -Wextra main.c -o main; warnings catch many hidden bugs early."},
  quiz:[
   {q:"C program entry function?",o:["start()","main()","run()","begin()"],why:"The OS starts C programs at main()."},
   {q:"To include stdio, write?",o:["import stdio","#include <stdio.h>","using stdio","require stdio"],why:"#include is the preprocessor directive that pulls in a header."},
   {q:"What does gcc -c do?",o:["Preprocess only","Compile to .o object file","Build executable directly","Link only"],why:"-c compiles and assembles but doesn't link; output is .o."}]},
"c-s2":{goal:"Choose types correctly; understand integer overflow and floating-point error; master implicit and explicit conversions.",
  links:[["cppreference · C fundamental types","https://zh.cppreference.com/w/c/language/types"],["Runoob · C data types","https://www.runoob.com/cprogramming/c-data-types.html"]],
  lab:{t:"Number probe",req:["Use sizeof to print char/short/int/long/long long/float/double sizes","Use <limits.h> to print int min/max and demonstrate one overflow (INT_MAX+1)","Compute 1.0/3 and print with %f, %.2f, %e to observe precision"],hint:"Use %zu for sizeof results; signed overflow is undefined behavior — observe, don't rely on it."},
  quiz:[
   {q:"Result of 5 / 2 (integer division)?",o:["2.5","2","3","2.0"],why:"Integer division truncates the fractional part."},
   {q:"Signed integer overflow is?",o:["Wraparound","Undefined behavior","An exception","Auto-promotion to long"],why:"The standard says signed overflow is UB; the compiler may do anything — never rely on it."},
   {q:"To get a type's size in bytes, use?",o:["lengthof","sizeof","countof","bytes()"],why:"sizeof is a compile-time operator returning size_t."}]},
"c-s3":{goal:"Build interactive small programs; understand format specifiers and input buffer mechanics.",
  links:[["cppreference · printf","https://zh.cppreference.com/w/c/io/fprintf"],["cppreference · scanf","https://zh.cppreference.com/w/c/io/fscanf"]],
  lab:{t:"Unit converter",req:["Read a Celsius temperature (double) and a length (cm, int)","Output Fahrenheit (1 decimal) and inches (2 decimals)","Use width control like %5.1f to align output as a table","On bad input (scanf return != expected count), warn and exit"],hint:"scanf returns the number of successfully read items; checking it is the basic input validation; double must use %lf."},
  quiz:[
   {q:"Argument for scanf into an int variable should be?",o:["x","&x","*x","(int)x"],why:"Pass the variable's address so the function can write back."},
   {q:"Format specifier for reading a double?",o:["%f","%lf","%Lf","%d"],why:"scanf uses %lf for double and %f for float (printf uses %f for both)."},
   {q:"Safe function to read a whole line?",o:["gets","fgets","scanf %s","getchar"],why:"gets doesn't check buffer length and is deprecated; fgets takes a buffer size."}]},
"c-s4":{goal:"Use branches and loops for accumulation, lookup, and patterns; write loops with correct boundaries.",
  links:[["Runoob · C decisions and loops","https://www.runoob.com/cprogramming/c-decision.html"],["cppreference · if statements","https://zh.cppreference.com/w/c/language/if"]],
  lab:{t:"Multiplication table and prime sieve",req:["Use nested for loops to print the multiplication table, \\t-aligned, lower triangle only","Write is_prime(int n) (test up to sqrt(n))","Print all primes 2..100, 5 per line"],hint:"i*i <= n is faster than i <= sqrt(n) and avoids floating error; modulo a counter for line breaks every 5."},
  quiz:[
   {q:"Loop that runs once before checking?",o:["for","while","do-while","if"],why:"do-while runs the body at least once."},
   {q:"What does break do in switch?",o:["Ends the program","Exits switch to prevent fall-through","Skips the next loop","Returns from the function"],why:"Without break, execution falls through to the next case."},
   {q:"Common way to count array elements?",o:["sizeof(a)","sizeof(a)/sizeof(a[0])","length(a)","count(a)"],why:"Divide total bytes by element size; works only when the array hasn't decayed to a pointer."}]},
"c-s5":{goal:"Split programs into functions; understand pass-by-value and storage classes; use recursion.",
  links:[["cppreference · Function declaration","https://zh.cppreference.com/w/c/language/function_declaration"],["Runoob · C functions","https://www.runoob.com/cprogramming/c-functions.html"]],
  lab:{t:"Multi-file calculator",req:["Create calc.h declaring add/sub/mul/div; calc.c implements them","main.c reads two numbers and an operator, calls calc functions, prints result","On division by zero, return an error code instead of crashing","Compile with gcc main.c calc.c -o calc"],hint:"Headers hold declarations, not definitions; use #ifndef guards against double inclusion."},
  quiz:[
   {q:"To modify the caller's int in a function, the parameter should be?",o:["int x","int *x","int &x","int x[]"],why:"C is pass-by-value; pass a pointer and dereference to modify."},
   {q:"Effect of static on a global variable?",o:["Accessible only in this file","Accessible only in this function","Freed at program end","Auto-initialized to 1"],why:"It changes external linkage to internal, enabling file-level encapsulation."},
   {q:"Missing a base case in recursion causes?",o:["Returns 0","Stack overflow","Compile error","Infinite loop without crash"],why:"Each call pushes a stack frame; the stack eventually runs out."}]},
"c-s6":{goal:"Master arrays and strings; understand array-name vs pointer; use standard string functions.",
  links:[["cppreference · Arrays","https://zh.cppreference.com/w/c/language/array"],["cppreference · String library","https://zh.cppreference.com/w/c/string/byte"]],
  lab:{t:"Word count and string utilities",req:["Implement my_strlen/my_strcpy/my_strcmp without string.h","Implement count_words(char *s) counting whitespace-separated words","Read a line and print char count, word count, and the reversed string"],hint:"Strings end with \\0; loop until \\0; leave one byte for the terminator in buffers."},
  quiz:[
   {q:"sizeof(s) for char s[] = \"hi\"; is?",o:["2","3","4","Depends on the pointer"],why:"The literal includes the terminator, so 3 bytes."},
   {q:"strcmp(a,b) returns what when equal?",o:["1","0","-1","Positive"],why:"0 means equal; nonzero means not equal."},
   {q:"2D array as function parameter?",o:["All dimensions can be omitted","Only the first dimension can be omitted","All dimensions must be given","Cannot be passed"],why:"Only the first dimension can be omitted; the compiler needs the rest to compute row offsets."}]},
"c-s7":{goal:"Truly understand pointers: read/write, pointer arithmetic, pointer parameters, and const combinations.",
  links:[["cppreference · Pointers","https://zh.cppreference.com/w/c/language/pointer"],["C-language net · Pointer guide","https://c.biancheng.net/c/pointer/"]],
  lab:{t:"Array utilities with pointers",req:["Use pointers (no subscripts) to implement sum_arr(const int *p, int n)","Implement reverse(int *p, int n) in-place (two-pointer method)","Implement my_strchr(const char *s, char c) returning a pointer to first occurrence or NULL","Test all three in main, checking NULL cases"],hint:"Pointer comparison is defined only within the same array; const int *p means the pointee can't be modified through p."},
  quiz:[
   {q:"For int *p; p stores?",o:["An integer value","An address","An array","A function name"],why:"A pointer variable holds the address of another object."},
   {q:"For int pointer p, p+1 advances by?",o:["1 byte","sizeof(int) bytes","4 bytes","8 bytes"],why:"Pointer arithmetic scales by the pointee type."},
   {q:"const int *p means?",o:["The pointer can't change","The pointee can't change","Both can't change","Meaningless"],why:"const on the left of * modifies the pointed-to data."}]},
"c-s8":{goal:"Understand program memory layout; correctly allocate/free heap memory; identify leaks, overruns, and dangling pointers.",
  links:[["cppreference · malloc","https://zh.cppreference.com/w/c/memory/malloc"],["Runoob · C memory management","https://www.runoob.com/cprogramming/c-memory-management.html"]],
  lab:{t:"Dynamic array (growable container)",req:["Define struct DynArr { int *data; size_t size, cap; }","Implement init / push (realloc doubles on full) / free_all","Check malloc/realloc return values on push and fail gracefully","Loop reading ints until EOF in main; print count and contents; free before exit"],hint:"realloc failure returns NULL while original memory stays valid; use a temp pointer so you don't overwrite the original."},
  quiz:[
   {q:"malloc failure returns?",o:["Zero-size memory","NULL","An exception","Auto-exit"],why:"NULL indicates failure; always check it."},
   {q:"Difference between calloc and malloc?",o:["calloc zeroes memory","calloc is faster","calloc only allocates arrays","No difference"],why:"calloc initializes allocated memory to zero."},
   {q:"After free, the correct practice is?",o:["Keep using it until exit","Set the pointer to NULL","free again to ensure release","Nothing needed"],why:"Setting NULL avoids dangling pointers and double frees."}]},
"c-s9":{goal:"Model data with compound types; understand memory alignment; use preprocessor directives and headers in multi-file projects.",
  links:[["cppreference · struct","https://zh.cppreference.com/w/c/language/struct"],["cppreference · Preprocessor","https://zh.cppreference.com/w/c/preprocessor"]],
  lab:{t:"Student management (multi-file)",req:["Define struct Student (name, id, 3 scores) and function declarations in student.h","student.c implements entry, average, sort by average (use qsort comparator)","main.c reads 3 students and prints a table sorted by average descending","Use #ifndef guards; compile as three files"],hint:"qsort comparator signature: int cmp(const void*, const void*); cast to concrete type before comparing."},
  quiz:[
   {q:"To access struct members through a pointer, use?",o:[".","->","::","*"],why:"-> through a pointer is shorthand for (*p).member."},
   {q:"union size equals?",o:["Sum of members","Largest member's size","Fixed 8 bytes","Compiler choice"],why:"All members share memory; the size fits the largest member with alignment."},
   {q:"#define SQR(x) x*x, calling SQR(1+2) gives?",o:["9","5","3","Compile error"],why:"Macro does text substitution: 1+2*1+2 = 5; macro args need parentheses."}]},
"c-s10":{goal:"Read/write files and handle errors; understand function pointers and complex declarations; recognize UB and debugging tools.",
  links:[["cppreference · File IO","https://zh.cppreference.com/w/c/io"],["cppreference · Undefined behavior","https://zh.cppreference.com/w/c/language/behavior"]],
  lab:{t:"Word frequency on a text file",req:["Open a text file and read line by line with fgets","Split words by whitespace (strtok or hand-written), count with a struct array","Write results sorted by frequency descending to result.txt","Handle open failure and out-of-memory; use perror and always close the file"],hint:"strtok modifies the string and isn't reentrant; always fclose after use."},
  quiz:[
   {q:"fopen failure returns?",o:["EOF","NULL","A zero-length file","Crash"],why:"Returns NULL; report with perror or strerror(errno)."},
   {q:"int (*a)[10] declares?",o:["Array of 10 int pointers","Pointer to array of 10 ints","Function pointer","2D array"],why:"Parentheses bind * to a first, so it's a pointer to int[10]."},
   {q:"Which is undefined behavior?",o:["Writing past array bounds","Defining an unused variable","Using // comments","Multiple includes"],why:"Out-of-bounds writes corrupt memory; the standard defines no consequence."}]},

/* ---------- C++ ---------- */
"cpp-s1":{goal:"Set up the toolchain; understand C++'s relationship to C and standard evolution; independently compile, run, and use std I/O.",
  links:[["cppreference Chinese","https://zh.cppreference.com/w/cpp"],["Runoob · C++ tutorial","https://www.runoob.com/cplusplus/cpp-tutorial.html"]],
  lab:{t:"Profile card",req:["Use std::cout to print nickname, target language, and today's date on 3 lines","Use std::cin to read an integer age and echo it (with basic failure handling)","Use <iomanip> to left-align one column to width 10"],hint:"Check input failure with if (!(std::cin >> age)); on failure call clear() and ignore() before reading more."},
  quiz:[
   {q:"Standard library namespace is?",o:["std","cpp","standard","lib"],why:"All stdlib names live in namespace std."},
   {q:"To read a whole line (with spaces), use?",o:["cin >> s","getline(cin, s)","cin.get()","scanf"],why:"getline reads up to newline and can include spaces."},
   {q:"Compile flag to enable C++17?",o:["-std=c17","-std=c++17","-std=gnu99","-Wall"],why:"-std=c++17 selects the language standard."}]},
"cpp-s2":{goal:"Understand C++ type system and value/reference semantics; use const and constexpr; master the four named casts.",
  links:[["cppreference · Types","https://zh.cppreference.com/w/cpp/language/types"],["cppreference · const and constexpr","https://zh.cppreference.com/w/cpp/language/cv"]],
  lab:{t:"Type and conversion lab",req:["Use auto and decltype to deduce expression types; print typeid(...).name()","Show const vs constexpr: one initialized with a runtime variable, one with a compile-time constant","Convert double->int via implicit, static_cast, and C-style cast; observe differences"],hint:"typeid().name() output is compiler-specific; constexpr requires compile-time-evaluable initializers."},
  quiz:[
   {q:"auto preserves?",o:["References and top-level const","Neither","Only const","Only references"],why:"auto strips references and top-level const; write const auto& explicitly if needed."},
   {q:"Compile-time constants use?",o:["const","constexpr","static","volatile"],why:"constexpr guarantees compile-time evaluation for array sizes etc."},
   {q:"Once a reference is bound, it?",o:["Can rebind","Cannot rebind","Becomes null","Needs dereferencing"],why:"A reference is an alias; after binding it can't refer to another object."}]},
"cpp-s3":{goal:"Master modern C++ loops and scoping; simplify code with range-for and structured bindings.",
  links:[["cppreference · Statements","https://zh.cppreference.com/w/cpp/language/statements"],["cppreference · Range-for","https://zh.cppreference.com/w/cpp/language/range-for"]],
  lab:{t:"Grade report statistics",req:["Store names and grades in std::vector<std::pair<std::string,int>>","Use range-for + structured binding to compute average and max","Print a table with name left-aligned width 10 and score right-aligned width 4"],hint:"for (const auto& [k, v] : map) is C++17; compile with -std=c++17."},
  quiz:[
   {q:"Best read-only range-for over vector<string>?",o:["for (auto x : v)","for (const auto &x : v)","for (auto &x : v)","for (int i...)"],why:"const reference avoids copies and prevents modification."},
   {q:"Which standard introduced structured bindings?",o:["C++11","C++14","C++17","C++20"],why:"Structured bindings are C++17."},
   {q:"Brace initialization特点?",o:["Allows narrowing","Disallows narrowing conversions","Only for arrays","Requires explicit types"],why:"List initialization rejects implicit narrowing at compile time."}]},
"cpp-s4":{goal:"Design function interfaces; understand overload resolution and parameter passing; master lambdas and callables.",
  links:[["cppreference · Functions","https://zh.cppreference.com/w/cpp/language/functions"],["cppreference · Lambda","https://zh.cppreference.com/w/cpp/language/lambda"]],
  lab:{t:"Generic sum function + lambda practice",req:["Write function template sum_if(v, pred) summing elements matching a predicate","Use lambdas for \"sum evens\" and \"sum numbers > 10\"","Write make_counter() returning a stateful lambda whose successive calls return an incrementing count"],hint:"For stateful lambdas that modify captured variables, add mutable: auto c = [n=0]() mutable { return ++n; };"},
  quiz:[
   {q:"Which does NOT form an overload?",o:["Different parameter counts","Different parameter types","Different return type only","Different const qualifier"],why:"Overload resolution only considers parameter lists, not return types."},
   {q:"Lambda that captures by value and modifies needs?",o:["Nothing","mutable","const","[=] is enough"],why:"By-value captures are const in operator(); mutable allows modifying the copy."},
   {q:"Best form for a read-only large object parameter?",o:["By value","const reference","Pointer","Global variable"],why:"const reference avoids copies and guarantees read-only."}]},
"cpp-s5":{goal:"Design class interfaces and lifecycles; master Rule of Zero/Three/Five and common operator overloads.",
  links:[["cppreference · Classes","https://zh.cppreference.com/w/cpp/language/classes"],["cppreference · Rule of three/five","https://zh.cppreference.com/w/cpp/language/rule_of_three"]],
  lab:{t:"Implement MyString class",req:["Use std::unique_ptr<char[]> for storage; deep-copy on construction","Implement destructor, copy ctor, copy assign, move ctor, move assign (Rule of Five)","Overload operator[], operator<< (friend), operator+, operator==","Write 5 self-test assertions (construct, copy, move, concat, compare)"],hint:"Copy assignment should handle self-assignment and exception safety (copy-and-swap); mark move operations noexcept."},
  quiz:[
   {q:"Default member access for class?",o:["public","private","protected","Compiler-dependent"],why:"class defaults to private; struct defaults to public."},
   {q:"Polymorphic base class destructor should be?",o:["private","virtual","static","Not defined"],why:"A virtual destructor ensures deleting via a base pointer calls the full derived destructor."},
   {q:"Rule of Zero means?",o:["Learn nothing","Use RAII members so the compiler generates special members","Disable all constructors","No destructor comments needed"],why:"Let stdlib types manage resources so you don't hand-write copy/move/destructor."}]},
"cpp-s6":{goal:"Express is-a with inheritance; understand vtables and dynamic binding; design abstract bases and interfaces.",
  links:[["cppreference · Derived classes","https://zh.cppreference.com/w/cpp/language/derived_class"],["cppreference · Virtual functions","https://zh.cppreference.com/w/cpp/language/virtual"]],
  lab:{t:"Shape polymorphism system",req:["Define abstract base Shape with pure virtual area() and clone()","Derive Circle, Rect, Triangle implementing area","Store shapes in std::vector<std::unique_ptr<Shape>> and polymorphically sum area","Verify clone() produces an independent copy"],hint:"Mark base destructor virtual; override lets the compiler verify you truly override."},
  quiz:[
   {q:"Runtime polymorphism requires?",o:["Templates","Virtual functions","Overloading","Macros"],why:"Virtual functions with base pointers/references enable dynamic binding."},
   {q:"A class with pure virtual functions?",o:["Can be instantiated","Is abstract and cannot be instantiated","Can only be a member","Must be final"],why:"Abstract classes are only usable as bases."},
   {q:"override keyword does?",o:["Improves performance","Makes the compiler check that you truly override a virtual","Allows overloading","Hides base functions"],why:"Mismatched signatures produce compile errors, avoiding \"thought I overrode but didn't\" bugs."}]},
"cpp-s7":{goal:"Write reusable generic code; understand template instantiation and deduction; constrain templates with concepts.",
  links:[["cppreference · Templates","https://zh.cppreference.com/w/cpp/language/templates"],["cppreference · Constraints and concepts","https://zh.cppreference.com/w/cpp/language/constraints"]],
  lab:{t:"Generic container utilities",req:["Write function template max_of(const std::vector<T>&) returning the largest element (T must be comparable)","Write class template Stack<T> with push/pop/top/size backed by std::vector<T>","Provide a print-specialization for Stack<const char*> (or use std::string)","Use C++20 requires or enable_if to allow only numeric types"],hint:"C++20 uses concepts like std::totally_ordered; template definitions belong in headers (instantiation needs visible definitions)."},
  quiz:[
   {q:"Template code usually lives in?",o:[".cpp files","Headers","Static libraries","Linker scripts"],why:"Instantiation needs the full definition, so templates go in headers."},
   {q:"How are variadic template packs expanded?",o:["Recursion or fold expressions","Macro expansion","Runtime loops","Can't be expanded"],why:"Fold expressions (C++17) are preferred; recursion was used before."},
   {q:"C++20 constrains template parameters with?",o:["enable_if","concepts / requires","static_assert","#ifdef"],why:"concepts are C++20's official constraint mechanism."}]},
"cpp-s8":{goal:"Choose the right container; master iterators and <algorithm>; understand complexity and iterator invalidation.",
  links:[["cppreference · Containers","https://zh.cppreference.com/w/cpp/container"],["cppreference · Algorithm library","https://zh.cppreference.com/w/cpp/algorithm"]],
  lab:{t:"Word frequency and leaderboard",req:["Read words and count with std::unordered_map<std::string,int>","Use std::sort + lambda to output top N by frequency desc, then lexicographic asc","Use std::accumulate for total count and std::max_element for the most frequent word","Compare map vs unordered_map tradeoffs in a comment"],hint:"unordered_map averages O(1) but unordered; use std::map for ordered traversal; sort predicates must be strict weak ordering."},
  quiz:[
   {q:"Default sequence container?",o:["list","vector","deque","array"],why:"vector is contiguous and cache-friendly, fastest in most cases."},
   {q:"map::operator[] on a missing key?",o:["Returns 0","Inserts a default element","Throws","Returns end()"],why:"It default-constructs and inserts; use find or contains for lookup only."},
   {q:"string_view特点?",o:["Owns the string","Non-owning read-only view","Auto-allocates","Thread-safe"],why:"It's ptr+len; the source string must outlive the view."}]},
"cpp-s9":{goal:"Master modern C++ resource management; understand value categories, move semantics, and perfect forwarding.",
  links:[["cppreference · Smart pointers","https://zh.cppreference.com/w/cpp/memory"],["cppreference · Move semantics","https://zh.cppreference.com/w/cpp/language/move_constructor"]],
  lab:{t:"Resource-safe RAII classes",req:["Use unique_ptr with custom deleter to wrap FILE* (call fclose on release)","Implement a simple UniqueBuffer supporting move, forbidding copy, throwing on out-of-range","Use shared_ptr + weak_ptr to build a tree node with parent/child links; verify weak_ptr breaks cycles","Use std::move to efficiently transfer a large vector into a function"],hint:"make_shared is faster (single allocation) and exception-safe vs shared_ptr(new T); use weak_ptr for parent pointers in trees."},
  quiz:[
   {q:"Exclusive-ownership smart pointer?",o:["shared_ptr","unique_ptr","weak_ptr","auto_ptr"],why:"unique_ptr forbids copying and allows moving, with zero overhead."},
   {q:"std::move actually does?",o:["Moves data","Casts the argument to an rvalue reference","Frees memory","Copies data"],why:"It's just a cast; the actual move happens in move construction/assignment."},
   {q:"To break a shared_ptr cycle, use?",o:["Set shared_ptr to null","weak_ptr","Raw pointer","unique_ptr"],why:"weak_ptr doesn't increase the reference count and observes without extending lifetime."}]},
"cpp-s10":{goal:"Write robust error handling and basic concurrency; understand the C++ object model and performance essentials.",
  links:[["cppreference · Exceptions","https://zh.cppreference.com/w/cpp/language/exceptions"],["cppreference · Thread support","https://zh.cppreference.com/w/cpp/thread"]],
  lab:{t:"Concurrent word counter",req:["Use std::filesystem to recursively collect all .txt paths","Use std::thread or std::async to count files in parallel; merge results with std::mutex","Use try/catch for unopenable files; ensure all threads are joined","Output total words and top 10; print elapsed time"],hint:"Threads must be joined or detached before destruction; std::async + future simplifies result collection."},
  quiz:[
   {q:"When catching exceptions,?",o:["Catch by value","Catch by reference","Catch by pointer","Don't catch"],why:"Reference catches avoid object slicing and preserve derived exception types."},
   {q:"Most common way to protect shared data?",o:["volatile","std::mutex","static","const"],why:"A mutex ensures only one thread enters the critical section; volatile doesn't synchronize."},
   {q:"Recursive directory traversal (C++17) uses?",o:["opendir","std::filesystem::recursive_directory_iterator","system(ls)","glob"],why:"filesystem provides a cross-platform standard traversal API."}]},

/* ---------- Java ---------- */
"java-s1":{goal:"Install the JDK and IDE; understand \"write once, run anywhere\" and JDK/JRE/JVM relationships; independently compile and run programs.",
  links:[["Oracle official Java tutorial","https://docs.oracle.com/javase/tutorial/"],["Runoob · Java basics","https://www.runoob.com/java/java-basic-datatypes.html"]],
  lab:{t:"Profile card v1",req:["Create Main.java; use System.out.printf to print nickname, goal, and JDK version","Use Scanner to read an integer age and echo it (validate with hasNextInt)","Print current JDK version via System.getProperty(\"java.version\")"],hint:"The public class name must match the filename; %n is platform-independent newline, safer than \\n."},
  quiz:[
   {q:"What does Java source compile to?",o:["Machine code","Bytecode .class","Assembly","Script"],why:"javac compiles source to platform-independent bytecode executed by the JVM."},
   {q:"Java program entry method signature?",o:["void start()","public static void main(String[] args)","int main()","static run()"],why:"The JVM convention starts at main."},
   {q:"JDK vs JRE?",o:["Identical","JDK includes JRE and dev tools","JRE includes JDK","Unrelated"],why:"JDK = JRE + compiler and tools; development needs the JDK."}]},
"java-s2":{goal:"Master Java's eight primitives and wrappers; understand autoboxing and conversion; do console interaction.",
  links:[["Oracle · Primitive data types","https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html"],["Runoob · Java primitive types","https://www.runoob.com/java/java-basic-datatypes.html"]],
  lab:{t:"BMI and tip calculator",req:["Read height(m) and weight(kg) via Scanner; compute BMI to 1 decimal","Given amount and tip rate, compute total with tip (use BigDecimal to avoid float error)","Demonstrate int<String conversion and handling Integer.parseInt failure"],hint:"Always use BigDecimal for money; construct it with String (new BigDecimal(\"0.1\") not 0.1)."},
  quiz:[
   {q:"Size of int in Java?",o:["Platform-dependent","Fixed 32 bits","16 bits","64 bits"],why:"Java fixes primitive sizes as the basis for cross-platform consistency."},
   {q:"To compare two Integer values, use?",o:["==","equals()","compare()","isSame()"],why:"== compares references; wrappers must use equals for value comparison."},
   {q:"7 / 2 result?",o:["3.5","3","4","3.0"],why:"Integer division truncates the fractional part."}]},
"java-s3":{goal:"Master branches and loops; understand switch expressions and enhanced for; debug common logic errors.",
  links:[["Oracle · Control flow","https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html"],["Runoob · Java loops","https://www.runoob.com/java/java-loop.html"]],
  lab:{t:"Guess the number and grade stats",req:["Guess game: random 1..100, loop reading guesses with higher/lower hints until correct; count tries","Use switch expression (Java 14+) to map score ranges to letter grades","Print sum 1..n; use enhanced for over a grade array to average"],hint:"Switch expression: String lv = switch (score/10) { case 10, 9 -> \"A\"; default -> \"C\"; };"},
  quiz:[
   {q:"Traverse an array without indices, prefer?",o:["Traditional for","Enhanced for (for-each)","while","goto"],why:"Enhanced for is concise and avoids out-of-bounds."},
   {q:"What breaks out of a specified outer loop?",o:["goto","Labeled break","return only","exit()"],why:"Labeled break breaks out of a named loop; Java has no usable goto."},
   {q:"Switch expression arrow syntax?",o:["case 1:","case 1 ->","case => 1","case 1 =>"],why:"Java 14+ case X -> doesn't fall through and can return values."}]},
"java-s4":{goal:"Operate arrays and strings; understand String immutability and the constant pool; do basic text processing.",
  links:[["Oracle · Arrays","https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html"],["Oracle · Strings","https://docs.oracle.com/javase/tutorial/java/data/strings.html"]],
  lab:{t:"Text analysis tool",req:["Count characters, words, and lines in a text","Count word frequencies with HashMap; output top 5","Replace all digits with # using String.replaceAll regex","Compare String += vs StringBuilder concatenation over 100k iterations"],hint:"merge and getOrDefault are common counting idioms; time with System.nanoTime()."},
  quiz:[
   {q:"How to get array length?",o:["length()","length","size()","count"],why:"Arrays use length property; strings use length() method; collections use size()."},
   {q:"Compare string contents with?",o:["==","equals()","compare()","isEqual()"],why:"== compares references; equals compares characters."},
   {q:"Loop-heavy string concatenation uses?",o:["String += ","StringBuilder","StringBuffer (always)","String.concat loop"],why:"StringBuilder avoids many temporary objects and is faster than StringBuffer single-threaded."}]},
"java-s5":{goal:"Design classes and methods; understand pass-by-value; master encapsulation, static, and access modifiers.",
  links:[["Oracle · Classes and objects","https://docs.oracle.com/javase/tutorial/java/javaOO/index.html"],["Runoob · Java OOP","https://www.runoob.com/java/java-object-classes.html"]],
  lab:{t:"Bank account class",req:["Define BankAccount with private owner/balance; deposit/withdraw/transfer","Validate initial deposit non-negative; throw custom InsufficientFundsException on overdraw","Use static to count accounts; provide getInstanceCount()","Demo opening, transfer, exception handling, and balance check in main"],hint:"Use BigDecimal or long cents for money; private fields + public methods is standard encapsulation."},
  quiz:[
   {q:"Java parameter passing?",o:["By reference","By value","Depends on type","By pointer"],why:"Always by value; reference types pass copies of reference values."},
   {q:"Constructor特点?",o:["Has return type","Same name as class, no return type","Must be public","Can be inherited"],why:"Constructors match the class name and have no return type (not even void)."},
   {q:"In a static method, you can?",o:["Access instance fields","Access static fields","Use this","Be overridden"],why:"Static methods belong to the class, have no this, and access only static members."}]},
"java-s6":{goal:"Build extensible designs with inheritance and interfaces; understand dynamic binding; implement equals/hashCode/toString.",
  links:[["Oracle · Inheritance","https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html"],["Oracle · Interfaces","https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html"]],
  lab:{t:"Shape and drawable system",req:["Define interface Drawable { void draw(); double area(); }","Abstract class Shape implements Drawable, holds name and constructor","Circle/Rect extend Shape and implement area, each printing its shape","Write drawAll(List<Drawable>) polymorphically; implement Comparable to sort by area"],hint:"Interfaces express \"can-do\"; abstract classes express \"is-a + shared impl\"; Comparable.compareTo must agree with equals."},
  quiz:[
   {q:"Java class inheritance特点?",o:["Multiple class inheritance","Single class inheritance, multiple interfaces","No inheritance","Only interfaces"],why:"extends takes one class; implements can list multiple interfaces."},
   {q:"Call parent constructor in subclass ctor with?",o:["this()","super()","parent()","base()"],why:"super(...) must be the first statement of a subclass constructor."},
   {q:"When overriding equals, usually also override?",o:["toString","hashCode","clone","finalize"],why:"Maintain the equal-objects-equal-hash contract, or hash collections break."}]},
"java-s7":{goal:"Write robust exception handling and resource management; master the collections framework and generics/wildcards.",
  links:[["Oracle · Exceptions","https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html"],["Oracle · Collections framework","https://docs.oracle.com/javase/tutorial/collections/index.html"]],
  lab:{t:"Student grade management",req:["Store students in List<Student>; index by ID in Map<String,Student>","Implement CRUD and sort by score (Comparable or Comparator)","Use try-with-resources for files; custom StudentNotFoundException","Demo generic method <T> void swap(List<T>,int,int) and wildcard <? extends Number> sum"],hint:"PECS: producers use ? extends, consumers use ? super; use Iterator.remove or removeIf during traversal."},
  quiz:[
   {q:"Which is an unchecked exception?",o:["IOException","NullPointerException","SQLException","ClassNotFoundException"],why:"RuntimeException and subclasses are unchecked; the compiler doesn't force handling."},
   {q:"Auto-close resources with?",o:["finally","try-with-resources","finalize()","System.gc()"],why:"AutoCloseable resources in try(...) close automatically."},
   {q:"PECS: producers use?",o:["? super T","? extends T","<?>","T"],why:"Producers (read from) use extends; consumers (write into) use super."}]},
"java-s8":{goal:"Read/write files and serialize; understand streams vs channels; use NIO.2 Path/Files.",
  links:[["Oracle · Basic IO","https://docs.oracle.com/javase/tutorial/essential/io/index.html"],["Oracle · File IO (NIO.2)","https://docs.oracle.com/javase/tutorial/essential/io/fileio.html"]],
  lab:{t:"File toolbox",req:["Use Files to copy, count lines, filter lines by keyword into a new file","Use BufferedReader/Writer for large text with UTF-8","Serialize a Student to a file and deserialize back (implement Serializable)","Recursively walk directories; count extensions"],hint:"Use Files.lines (lazy stream) not readAllLines for big files; Files.walk returns a Stream that must be closed."},
  quiz:[
   {q:"Read a binary file with?",o:["Reader","InputStream","Scanner","Writer"],why:"Byte streams work in bytes for arbitrary binary data."},
   {q:"Key to avoiding Chinese garbling?",o:["Bigger buffer","Explicitly use one encoding like UTF-8 on both ends","Use FileReader","Convert to byte array"],why:"Read and write sides must use the same charset."},
   {q:"Files.walk returns an object that?",o:["Needs manual close or try-with-resources","Needs nothing","Call System.gc","Convert to List"],why:"It returns a Stream holding file handles; must close to avoid leaks."}]},
"java-s9":{goal:"Create and manage threads; understand visibility and synchronization; use JUC utilities and thread pools.",
  links:[["Oracle · Concurrency tutorial","https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html"],["java.util.concurrent docs","https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/package-summary.html"]],
  lab:{t:"Concurrent counter and producer-consumer",req:["Compare three counters: plain int, synchronized, AtomicInteger — 10 threads x 100k increments; compare result and time","Use BlockingQueue for producer-consumer (2 producers, 3 consumers)","Use ExecutorService with Future; shut down the pool correctly at the end"],hint:"count++ is non-atomic (read-modify-write); use AtomicInteger or LongAdder; LongAdder wins under high contention."},
  quiz:[
   {q:"Start a new thread with?",o:["run()","start()","execute()","resume()"],why:"start() creates and schedules a new thread."},
   {q:"volatile guarantees?",o:["Atomicity","Visibility and ordering","Mutual exclusion","Lock promotion"],why:"It doesn't guarantee compound-operation atomicity; i++ still needs locks or atomics."},
   {q:"Wait for N threads then continue with?",o:["Semaphore","CountDownLatch","CyclicBarrier","volatile"],why:"CountDownLatch provides one-shot countdown waiting."}]},
"java-s10":{goal:"Master core post-Java-8 features; understand JVM memory, GC, and class loading.",
  links:[["Oracle · Lambda expressions","https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"],["Oracle · JVM spec (memory and GC)","https://docs.oracle.com/javase/specs/jvms/se17/html/index.html"]],
  lab:{t:"Stream data analysis + JVM observation",req:["Given orders (product, category, amount, date), use Stream to group-sum by category, top-3 amounts, filter a month","Use LocalDate to compute days since today","Use Comparator chaining: category asc + amount desc","Run with -Xms/-Xmx; observe GC via jstat or VisualVM; record in comments"],hint:"record is Java 16+ immutable data; Stream intermediate ops are lazy, terminal ops trigger execution."},
  quiz:[
   {q:"Functional interface特点?",o:["Multiple abstract methods","Exactly one abstract method","Must extend Runnable","No default methods"],why:"Only interfaces with a single abstract method can be implemented by a lambda."},
   {q:"When do Stream intermediate ops execute?",o:["On definition","On a terminal op (lazily)","Immediately","On next startup"],why:"Intermediate ops are lazy; only terminal ops trigger the pipeline."},
   {q:"Java 8+ recommended date API lives in?",o:["java.util.Date","java.time","java.sql","java.text"],why:"java.time provides immutable, thread-safe date-time types."}]}
};
