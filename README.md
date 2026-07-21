# 紫微知道 · 紫曜型格 | ZATI

### Ziwei Archetype Type Indicator · 以选择看见自己

**ZATI** 是紫微知道系列中的东方人格自我探索工具。它通过结构化行为问卷，帮助用户观察自己在真实情境中更常采取的方式，再以十六种文化人格原型组织成一份可阅读、可理解、可继续行动的报告。

> 选择决定类型，文化原型负责表达。

<p><a href="#开始使用"><strong>本地开始体验 ZATI</strong></a> · <a href="#紫微知道产品生态">认识紫微知道产品生态</a></p>

<!-- Future Zhiwei mascot variation for ZATI is intentionally left blank. -->

---

## 紫微知道产品生态

紫微知道（Ziwei Knows）由三款平级、互补的开源产品组成。它们服务不同的探索方式，不要求账号、命盘或数据互通。

| 产品 | 适合什么需求 | 访问 |
| --- | --- | --- |
| **Ziwei Chart** | 想准确排盘、浏览十二宫、流年、合盘和长期趋势。 | [在线体验](https://zwknows.vercel.app/) · [GitHub](https://github.com/ziweiknows/ziwei-chart) |
| **Ziwei Chat** | 已有命盘，想围绕事业、关系、财富或近况继续追问。 | [在线体验](https://ziweichat.vercel.app/) · [GitHub](https://github.com/ziweiknows/ziwei-chat) |
| **ZATI** `当前产品` | 不想先填写出生信息，想通过行为选择探索人格原型。 | [GitHub](https://github.com/ziweiknows/zati) |

如果你想进一步从命盘理解自己的特质，可以探索 [Ziwei Chart](https://zwknows.vercel.app/)；如果你已经有命盘并想讨论一个现实问题，可以使用 [Ziwei Chat](https://ziweichat.vercel.app/)。它们是互补选择，不是完成 ZATI 的必要前置或后续步骤。

## 这是什么

ZATI 不替你算命，也不把人格变成诊断、能力排名或命运结论。它以固定的四维行为问卷为基础，让用户在完整的生活情境与两种可比较的反应之间做选择，并将结果映射为十六张“本命人格牌”。

报告不只给出一个标签，还会呈现你的命核、四维人格轴、正位之力、逆位之影、工作方式、关系方式与成长任务。

## 核心体验

| 能力 | 说明 |
| --- | --- |
| **24 题极速测试** | 约 3 分钟完成，获得初步型格结果。 |
| **56 题标准测试** | 更完整地观察四维行为倾向，生成正式报告。 |
| **四维人格轴** | 将人格差异拆成判断根源、变化策略、信息认知与影响方式。 |
| **十六型人格原型** | 每种原型包含命核、优势、逆位表现、工作方式、关系方式与成长任务。 |
| **清晰答题引导** | 每题给出完整情境、左右反应与六档倾向强度。 |
| **揭晓、报告与分享** | 先呈现身份，再提供结构化报告和可分享结果文案。 |
| **本地进度恢复** | 答题进度与结果保存在浏览器本地，离开后可以继续。 |

## 结果如何产生

```text
24 题或 56 题行为选择
  -> 四维人格轴计分
  -> 边界状态识别
  -> 十六型人格代码
  -> 本命人格牌与结构化成长报告
```

结果来自固定题库、明确的 `1–6` 选择映射和可测试的计分逻辑。它不是大语言模型生成的结论，也不依赖出生日期或星盘数据。

## 常见问题

### ZATI 是心理诊断或 MBTI 测试吗？

不是。ZATI 是一款以东方文化原型表达的自我探索工具，不构成心理诊断、医疗建议或人格优劣评定，也不宣称替代专业心理测量。

### 24 题和 56 题有什么区别？

24 题极速测试适合快速获得初步型格结果；56 题标准测试覆盖更多情境，用于生成更完整的正式报告。两者都使用同一套四维人格框架。

### 为什么每题使用 1 到 6，而不是“同意/不同意”？

每题先提供左右两种完整反应。`1–3` 表示更接近左侧，`4–6` 表示更接近右侧；数字表达偏向强度，而不是答案的对错。

### 我的答题和结果保存在哪里？

当前 MVP 将答题进度与结果保存在浏览器 `localStorage`。清除浏览器站点数据后，记录会被移除；本项目目前不提供账号或跨设备同步。

### ZATI 与 Ziwei Chart、Ziwei Chat 的关系是什么？

三者是平级产品。ZATI 从行为选择观察人格倾向；[Ziwei Chart](https://github.com/ziweiknows/ziwei-chart) 用于浏览紫微命盘；[Ziwei Chat](https://github.com/ziweiknows/ziwei-chat) 用于围绕命盘事实进行对话。它们当前不共享结果或用户数据。

## 设计立场

ZATI 的视觉系统“曜序”建立在深色数字工具的秩序感之上：曜黑背景、月白正文、星金主行动，以及低干扰的东方仪式感。

我们有意避开：

- 算命式的吉凶暗示、宿命断言与玄学恐吓。
- 临床诊断、能力排名或人格优劣判断。
- 卡片堆叠、超大圆角、虚假加载和付费诱导。
- 用复杂术语掩盖用户真正需要回答的问题。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 应用 | React 19 + TypeScript |
| 构建 | Vite |
| 路由 | React Router |
| 设计系统 | CSS tokens + accessible primitives |
| 单元测试 | Vitest + Testing Library |
| 浏览器验证 | Playwright（桌面 / 移动） |
| 图标 | lucide-react |

## 开始使用

环境要求：Node.js 20+、pnpm 9+。

```bash
git clone https://github.com/ziweiknows/zati.git
cd zati
pnpm install
pnpm dev
```

打开 [http://127.0.0.1:5173](http://127.0.0.1:5173)。

## 常用命令

```bash
pnpm dev        # 启动开发服务器
pnpm test       # 运行 Vitest 单元与组件测试
pnpm build      # 类型检查并构建生产产物
pnpm test:e2e   # 运行 Playwright 桌面与移动流程
pnpm lint       # TypeScript 项目检查
```

## 项目结构

```text
src/domain/          题库、计分、人格原型与本地持久化
src/design-system/   曜序令牌与可访问基础组件
src/features/        首页、答题、揭晓、报告与十六型浏览
src/app/             路由与应用组合
tests/e2e/           关键用户流程与响应式验证
docs/                产品、设计与实现文档
```

## 当前状态与许可证

MVP 主流程已完成：首页、快速/标准测试、人格揭晓、结果报告、十六型浏览、分享和本地进度恢复均已实现，并通过桌面与移动端流程验证。

尚未发布正式开源许可证。代码目前用于产品原型与持续开发。

---

<p align="center">如果 ZATI 对你有帮助，欢迎关注项目，也欢迎探索紫微知道的 <a href="https://github.com/ziweiknows/ziwei-chart">Ziwei Chart</a> 与 <a href="https://github.com/ziweiknows/ziwei-chat">Ziwei Chat</a>。</p>
