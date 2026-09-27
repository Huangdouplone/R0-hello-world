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
})();
