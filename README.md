# R0:hello world

**R0：从零开始的编程之路**

> © **制作者 / Creator: Bilibili 黄豆666 (huangdouplone)** · 版权所有 / All rights reserved.
>
> 内容与代码由 **AI 辅助生成 / 组装**，技术细节请以官方文档与权威教材为准。

七门通用语言（Python / C / C++ / Java / JavaScript / C# / Go）的**纯静态、零依赖、可离线**自学课程。单文件 HTML 应用 + 外部数据脚本，无后端、无构建步骤、无第三方运行时依赖，可直接托管到任意静态托管服务。

*Seven general-purpose languages in one self-study course — a purely static, dependency-free, offline-capable single-page app with external data modules. No backend, no build step, no third-party runtime.*

---

## 中文

### 1. 项目边界

| 维度 | 说明 |
| --- | --- |
| 形态 | 单文件 `index.html`（UI + 全部逻辑）+ 24 个外部数据脚本 + 1 个 Service Worker |
| 运行 | 双击 `index.html` 即可运行；通过 http(s) 托管时自动启用离线缓存（PWA） |
| 存储 | 全部学习数据存于浏览器 `localStorage`，无服务端、无账号体系 |
| 依赖 | 零外部依赖。不引用任何 CDN、字体、图表库或前端框架，图表为手写内联 SVG |
| 适配 | PC / 移动端响应式；移动端可「添加到主屏幕」当 App 使用 |
| 定位 | 不做职业路线适配，不预设用途，目标是**把七门语言各自讲透** |

### 2. 内容规模（实测）

| 指标 | 数值 |
| --- | --- |
| 语言 / 阶段 / 课节 | **7 / 62 / 248** |
| 阶段测评题 | **558**（choice 310 · judge 124 · fill 124） |
| 每阶段题库 / 抽题数 | 9 / 4（`QUIZ_COUNT = 4`） |
| 摸底测试题 | **430**（每门 60–64 题），单次出题 **35**（`PT_COUNT = 35`） |
| 编程实战 | **311**（每阶段 5 道） |
| 跨语言概念对照 | **74 组**，覆盖 185 个课节 |
| 成就 / 称号等级 | 29 / 15 |

各语言明细：

| 语言 | 阶段 | 课节 | 阶段题 | 实战 | 摸底题 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 🐍 Python | 10 | 40 | 90 | 51 | 61 |
| 🅲 C | 10 | 40 | 90 | 50 | 60 |
| ⚙️ C++ | 10 | 40 | 90 | 50 | 60 |
| ☕ Java | 10 | 40 | 90 | 50 | 62 |
| 🟨 JavaScript | 8 | 32 | 72 | 40 | 61 |
| 🟦 C# | 7 | 28 | 63 | 35 | 62 |
| 🐹 Go | 7 | 28 | 63 | 35 | 64 |

课程编排（起 → 止）：

| 语言 | 从 | 到 |
| --- | --- | --- |
| Python | 环境与虚拟环境、变量与类型、控制流 | 面向对象、迭代器与生成器、线程与 asyncio、对象模型、测试与打包 |
| C | 编译流程、数据类型、标准 I/O、控制流 | 指针核心、堆内存、结构体与预处理器、文件 I/O、函数指针与 UB |
| C++ | 现代语法、类型系统、引用、lambda | 类与对象、继承多态、模板与 concepts、STL、RAII 与移动语义、并发 |
| Java | JDK 与 JVM、基本类型、控制流、数组与字符串 | 面向对象、异常与集合泛型、IO/NIO、并发与 JUC、Stream、JVM 内存与 GC |
| JavaScript | 运行环境、let/const、数据类型、模板字符串 | 数组与对象、DOM 与事件、异步与 fetch、class 与模块、现代工程 |
| C# | .NET SDK、可空类型、控制流与方法 | 集合与 LINQ、面向对象与接口、async/await、文件与 JSON、record |
| Go | 安装与模块、变量与类型、控制流与 defer | slice 与 map、接口与错误、goroutine 与 channel、net/http、测试与工程化 |

四门主线语言按 **4 大篇章**组织（入门奠基 → 核心能力 → 工程/系统 → 深入纵深），篇章标注建议周数；JavaScript / C# / Go 作为进阶补充轨道，覆盖各自核心工作流。

### 3. 技术架构

#### 3.1 加载顺序与脚本职责

`index.html` 依赖 24 个外部脚本按固定顺序注入（见文末文件清单）。数据层与逻辑层严格分离：

```
数据脚本（window.LANG_DATA / PLACEMENT / CROSSLINKS / I18N / *_EXTRA）
        ↓  启动期合并
内存态：LANG_DATA[dk].stages[i].{lessons[], quiz[], lab + labs[]}
        ↓  单向读取
渲染层：renderAll() → renderDashboard / renderStages / renderLabs / renderPhases …
```

关键约定：**阶段与篇章容器由 JS 用 `innerHTML` 重建**，因此所有需要被脚本寻址的 `id` 一律挂在内层容器上，`<h2>` 等外壳留在静态 HTML 中；交互按钮统一走 `data-act` 全局事件委派。

#### 3.2 数据模型

```js
stage = {
  id, icon, name, desc, lv: "basic" | "adv" | "hard",
  goal,                                  // 阶段目标
  links: [[名称, URL], ...],             // 延伸资料
  lessons: [{ id, title, min, summary[], code, pit, ex:{q,a}, target }],
  quiz: [{ q, o:[4 选项], a: 正确下标, why, type: "choice"|"judge"|"fill", ans }],
  lab:  { t, req[], starter, hint, xp }, // 原始实战（等价于 labs[0]）
  labs: [ … ]                            // 运行期由 lab + 叠加层合并而成
}
```

#### 3.3 叠加层（overlay）扩展模式

新增题库与实战**不改动原始数据文件**，而是以「叠加层 + 启动期合并」的方式注入：

```js
window.QUIZ_EXTRA       // 阶段测评题（按 stageId 分组）
window.PLACEMENT_EXTRA  // 摸底题（按 dk 分组）
window.LAB_EXTRA        // 编程实战（按 stageId 分组）
```

启动时 `concat` 进对应字段。这样做的收益：原始数据文件保持稳定（便于 diff 与回滚），扩容只增新文件；同时**旧的学习进度键完全不受影响**。

#### 3.4 题库与抽题算法

- **题型**：`choice`（单选）/ `judge`（判断）/ `fill`（填空）。判断题为双选项、同样参与选项乱序；填空题为 `<input class="fill-input">`。
- **答案归一化**：`normAns` 将全角字符转半角（U+FF01–FF5E）、去空白、去中英标点、转小写后再比对，避免因输入法差异误判。
- **题型均衡抽题**：`drawQuiz` / `pickFromBand` 先为**每种已存在的题型各保底抽 1 题**，再用随机填满剩余名额。这样三种题型一定会出现，而不是靠概率。
- **选项乱序保索引**：选项打乱时同步记录原题索引（`perm` / `ca`），确保正确答案跟随移动。

#### 3.5 进度键与向后兼容

阶段测评与通关状态按 `lessonId` / `stageId` 记录。实战题因为一个阶段有多道，使用**多键位方案**：

```js
labKey(sid, k) = k > 0 ? sid + "#" + k : sid
```

`k = 0` 沿用旧键（`sid`），`k ≥ 1` 使用 `sid#k`。因此新增实战题时**老用户的既有进度零迁移**，历史完成记录被自动识别。统计实战总数必须用 `totalLabs()`，不能用 `filter(s => s.lab).length`。

#### 3.6 摸底测试设计

| 环节 | 设计 |
| --- | --- |
| 题量 | 固定 **35 题**（`PT_COUNT`），不得下调 |
| 抽样 | 5 个难度档分层抽样，每档 7 题 → 每门每档须 ≥10 题 |
| 顺序 | 按 `diffOf(q) = min(5, max(1, ceil(st/2)))` 升序，由易到难 |
| 节奏 | 选项点击只记录并重渲染，翻页由 `上一题 / 下一题` 控制；末题换为「交卷」按钮（未作答时禁用） |
| 防误触 | 弹层锁定（`modalLocked`），作答期间点击空白不关闭 |
| 结果 | 难度加权正确率 → L1–L6 六档，并以「答对过半的最高难度档」封顶 |

#### 3.7 i18n 三层覆盖

| 层 | 载体 | 覆盖 |
| --- | --- | --- |
| 界面框架 | `I18N.ui`（`{zh, en}` 词条） | 全量 |
| 目录层 | `lang-i18n.js` + `lang-i18n-extra.js` | 阶段名 **62/62**、课节标题 **248/248**、实战标题 **311/311** |
| 正文层 | `lang-i18n-content.js` | 课节正文 **160/248**（Python / C / C++ / Java 全量；JavaScript / C# / Go 暂为中文，见「已知限制」） |

常见陷阱（本项目已规避）：模块级常量若在加载期直接求值会被烘焙成中文，须存 key、渲染时再 `t()`；字典缺 key 时 `T()` 原样返回 key（不报错，界面会露出裸 key，需断言校验）；动态 setter 漏挂 `applyLang` 会导致切语言不刷新。

#### 3.8 离线与 PWA

`lang-sw.js` 为 Service Worker：
- **ASSETS 与 `<script src>` 的 URL 逐字符一致**（含 `?v=N`）。缓存以完整请求 URL 为键，裸文件名匹配不上带查询串的请求 —— 这是本项目的关键约束。
- 预缓存逐个 `add().catch()`，任一资源缺失只跳过它自己，不会让整批失败。
- 任何新增资源都必须同时 **加入 ASSETS** 并 **bump `CACHE` 版本**，否则老客户端会命中旧缓存。

#### 3.9 自检套件

`verify/` 为本地验证脚本（**不参与部署**），基于 playwright-core + 系统 Edge 无头运行：

| 脚本 | 覆盖 |
| --- | --- |
| `_audit_static.js` | 内联/外部 JS 语法、脚本存在性、SW ASSETS 与页面请求 URL 一致性、DOM id 死引用、`data-act` 分派覆盖、硬编码数字扫描 |
| `_audit_runtime.js` | 数据字段与下标合法性、选项下标越界、填空答案非空、判断答案域、选项重复、摸底分档 ≥10、i18n key 泄漏、空存档不崩 |
| `_dup_runtime.js` | 真实合并题库的跨库查重（阶段题 vs 摸底题）、同语言实战标题查重 |
| `_regression.js` | 端到端：三种题型真实出现率、逐题判分、摸底 35/35、多键位进度与旧键兼容、卡片数 == `totalLabs()`、0 运行时错误 |

> 关键经验：**抽查前先断言题库长度大于抽题数**（曾有阶段题库仅 3 题而要求抽 4 题，经 `min` 后等于全部出题，随机性归零）；**题库键必须等于 `langMeta(id).dk`**（如 C 的 `dk` 是 `c`、C# 是 `cs`），写错会**静默**回退到「从第 1 节开始」而不报错。

### 4. 学习机制

- **摸底分班**：选「零基础」直接从第 1 节开始；选「有一定基础」进入 35 题摸底测试，按结果定起点，起点之前的课程自动记为已掌握。
- **主修路线隔离**：选定主修语言后其余各门隐藏并锁定，主修完成 10 / 20 / 30 节时依次解锁。
- **跨语言对照**：主修完成 6 节后开放，74 组对照标明同一概念在其他语言对应的课节与差异。
- **间隔复习**：2 / 4 / 7 / 15 / 30 / 60 天队列 + 错题本。
- **每日上限保护**：每日新学默认上限 4 节（可调 1–10）；待复习积压超过阈值（默认 8）时锁定新学，强制先巩固。
- **激励**：学习日历热力图（18 周）、29 枚成就、15 级称号、近 7 天 XP 趋势、可复制的日/周/月进度报告（可下载 `.md`）。
- **星币经济**：学习 / 复习 / 打卡 / 测评 / 实战均可赚取星币，**仅用于解锁主页配色风格**（15 套，含默认 1 套），不做 pay-to-win。
- **记忆续学**：自动记录最后观看的课节，「今日任务」顶部高光「继续上次」。
- **数据自管**：导出 / 导入 / 重置；首屏即提供导出与导入入口，清空需二次确认。

### 5. 本地运行与部署

直接双击 `index.html` 即可使用。

> 需要**离线 / PWA** 能力时须通过 http(s) 访问（`file://` 下浏览器会拒绝注册 Service Worker，属正常现象，不影响其他功能）：
>
> ```bash
> python -m http.server 8080     # 然后访问 http://localhost:8080
> ```

**部署到 GitHub Pages**：将本目录（`index.html` + 24 个数据脚本 + `lang-sw.js`）推送至仓库**根目录**（不要套子目录），然后在 *Settings → Pages → Build and deployment → Source* 选择 `Deploy from a branch`、分支 `main`、目录 `/ (root)`。

> 仓库名仅允许字母、数字与 `.` `-` `_`（不支持冒号与空格），建议 `R0-hello-world`，把「R0:hello world」写进仓库 About。

### 6. 已知限制

1. **课节正文英文覆盖不完整**：`lang-i18n-content.js` 覆盖 160/248 节，JavaScript / C# / Go 共 88 节的英文模式下正文仍显示中文（界面、阶段名、课节标题、实战标题均已双语）。
2. **跨语言对照覆盖不均**：74 组对照对 Python（40/40）、C（38/40）、C++（38/40）、Java（39/40）接近全覆盖，JavaScript（10/32）、C#（10/28）、Go（10/28）仅覆盖核心概念。
3. **数据存于本机**：清除浏览器数据会丢失进度，请定期导出备份。

### 7. 授权与声明

本仓库（含全部课程文案、界面与代码）由 **AI 辅助生成 / 组装**。内容按「七门通用语言从 0 到深入」编排，但技术细节请以各语言官方文档、标准与权威教材为准，使用前请自行核对。仓库仅供学习交流，按现状提供，不作任何担保。授权条款见 `LICENSE.md`。

---

## English

### Overview

`R0:hello world` is a **purely static, dependency-free, offline-capable** self-study course covering **seven general-purpose languages**: Python, C, C++, Java, JavaScript, C#, and Go. It is a single-file HTML app plus 24 external data modules and a Service Worker — no backend, no build step, no third-party runtime dependency.

### Scope (measured)

| Metric | Value |
| --- | --- |
| Languages / stages / lessons | **7 / 62 / 248** |
| Stage-quiz questions | **558** (choice 310 · true-false 124 · fill-in 124) |
| Bank per stage / drawn per attempt | 9 / 4 |
| Placement bank / questions per attempt | **430** / **35** (fixed floor, never lower) |
| Coding labs | **311** (5 per stage) |
| Cross-language concept groups | **74**, spanning 185 lessons |
| Achievements / title levels | 29 / 15 |

Per language: Python 10/40 · C 10/40 · C++ 10/40 · Java 10/40 · JavaScript 8/32 · C# 7/28 · Go 7/28 (stages/lessons). The four main languages follow **4 chapters** (foundations → core skills → engineering/systems → depth); JavaScript, C#, and Go are supplementary tracks.

### Architecture

- **Data / logic separation.** `index.html` holds the UI and all logic; 24 external scripts supply curriculum, placement banks, cross-language map, i18n dictionaries, and overlay files.
- **Overlay extension pattern.** New questions and labs ship as `window.QUIZ_EXTRA` / `window.PLACEMENT_EXTRA` / `window.LAB_EXTRA` and are merged into the in-memory model at startup via `concat`. Original data files are never edited, so history stays diffable and rollback-safe.
- **Question types & scoring.** `choice` / `judge` / `fill`. Answers are normalised before comparison (full-width → half-width, whitespace and punctuation stripped, lower-cased) so IME differences never cause a false negative. Draws are **type-balanced**: each existing type is guaranteed at least one slot before random fill, and option shuffling preserves the original answer index.
- **Progress keying.** Labs use `labKey(sid, k) = k > 0 ? sid + "#" + k : sid`, so `k = 0` keeps the legacy key and **existing user progress needs zero migration** when new labs are added.
- **Placement test.** Fixed 35 questions, stratified across 5 difficulty bands (7 each, so every language needs ≥10 per band), ordered easy→hard, mapped to six levels (L1–L6) by difficulty-weighted accuracy and capped by the hardest band answered at least half correctly.
- **i18n.** Three layers: UI dictionary (complete), catalogue (62 stage names / 248 lesson titles / 311 lab titles — complete), lesson bodies (160/248; Python, C, C++, Java complete).
- **Offline / PWA.** The Service Worker's `ASSETS` list matches the page's `<script src>` URLs **character for character** (including `?v=N`) — the cache is keyed by full request URL, so bare filenames would miss. Precache is per-item with `catch()`, and every added asset requires a cache-version bump.
- **Verification.** `verify/` (not deployed) runs headless static, runtime, duplicate, and end-to-end regression audits via playwright-core.

### Run & deploy

Open `index.html` directly, or serve over http(s) to enable the Service Worker (`python -m http.server 8080`). For GitHub Pages, push everything to the repository **root** and deploy from the `main` branch, `/ (root)`.

### Known limitations

1. Lesson bodies are not fully translated: 160/248 lessons have English bodies (UI, stage names, lesson titles, and lab titles are fully bilingual).
2. Cross-language coverage is uneven: near-complete for Python/C/C++/Java, core concepts only for JavaScript/C#/Go.
3. Progress lives in `localStorage` — back up with the built-in export.

### License & disclosure

All curriculum text, UI, and code were **generated / assembled with AI assistance**. Verify technical details against official documentation and authoritative references before relying on them. Provided as-is for learning purposes, without warranty. See `LICENSE.md`.

---

## 📦 文件清单 / Files

| 文件 | 作用 |
| --- | --- |
| `index.html` | 应用入口：UI + 全部渲染与业务逻辑 |
| `lang-data-{python,c,cpp,java,js,csharp,go}.js` | 七门语言的课程数据（阶段 / 课节 / 原始实战 / 题库） |
| `lang-enhance-{python,c,cpp,java,js,csharp,go}.js` | 各语言课节的补充内容（示例输出 / 深入讲解 / 速记） |
| `lang-placement.js` | 摸底题库（430 题） |
| `lang-placement-extra.js` | 摸底题叠加层（`PLACEMENT_EXTRA`），把每门每难度档补齐到 ≥10 题 |
| `lang-quiz-extra.js` | 阶段测评题叠加层（`QUIZ_EXTRA`），扩宽每阶段题库 |
| `lang-extra2.js` | 阶段题 + 摸底题叠加层：每阶段 +2 判断 +2 填空（62×4 = 248），每门每档 +1 判断 +1 填空（70） |
| `lang-lab-extra.js` | 实战叠加层（`LAB_EXTRA`），每阶段 +2 道，中英双语 |
| `lang-lab-extra2.js` | 实战叠加层（`LAB_EXTRA`），每阶段 +2 道 → 每阶段 5 道 / 全站 311 道 |
| `lang-crosslinks.js` | 跨语言概念对照表（74 组） |
| `lang-i18n.js` | 界面与目录层双语字典 |
| `lang-i18n-content.js` | 课节正文英文（`I18N.lesson_en`，160 节） |
| `lang-i18n-extra.js` | 阶段层英文补充（`I18N.stage_en`，补齐 62/62 阶段） |
| `lang-sw.js` | Service Worker（离线缓存） |
| `README.md` / `LICENSE.md` | 本文档 / MIT 授权 |
| `verify/` | 本地自检脚本，**不参与部署** |

## 🏷️ Topics

`python` · `c` · `cpp` · `java` · `javascript` · `csharp` · `golang` · `programming-languages` · `learning-roadmap` · `self-study` · `placement-test` · `spaced-repetition` · `static-site` · `pwa` · `offline-first` · `no-build` · `i18n`
