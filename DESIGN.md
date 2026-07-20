# ZATI Design System

## Direction

“曜序”采用 Material 3 行为合同与 ZATI 自有视觉组件。深色数字人格工具是主场景：用户在相对安静的环境中专注答题，结果揭晓获得一次克制的东方仪式感，随后进入适合长读的报告。

## Color

- Background / 曜黑: `#0B0B10`
- On background / 月白: `#F2F0EA`
- Primary / 星金: `#C5A66A`
- Secondary / 玄紫: `#58466F`
- Error or tension / 朱砂: `#A94F43`
- Success or growth / 青玉: `#557D70`
- Surface / 玄面: `#17161C`
- Outline / 星界: `#393640`
- Muted text: `#AAA6AD`

每个视图最多一个星金主行动。朱砂、青玉必须配合文字或图标。页面代码只消费语义令牌，不散落品牌色。

## Typography

- Display and title: `Noto Serif SC`, `Songti SC`, serif fallbacks.
- Body and controls: `Noto Sans SC`, `Microsoft YaHei`, sans-serif fallbacks.
- Codes and utility labels: `IBM Plex Mono`, Consolas, monospace fallbacks.
- 正文 15-18px，最大行宽 68ch；UI 字号固定分级，不随视口连续缩放。
- 字间距为 0；人格牌名与仪式标题使用衬线，交互标签使用无衬线。

## Spacing And Shape

4px 基础网格，步进为 4/8/12/16/24/32/48/64px。最小触控区 48x48px。输入和选项 2px 圆角，按钮 4px，弹层 8px。人格牌固定 2:3 比例并拥有独立边框；报告通过留白、分隔线和全宽色带组织，不嵌套卡片。

## Components

- `Button` / `IconButton`: 一个主行动，加载时尺寸稳定，图标按钮必须有可访问名称。
- `AnswerScale`: 六级单选、整项可点击、选中态同时使用描边与底色。
- `Progress` / `AxisMeter`: 稳定尺寸并暴露可朗读数值。
- `PersonaCard`: 代码、牌名、命核、星域和牌辞构成固定身份资产。
- `AppHeader`: 低干扰导航；测试页保持题号、进度、退出清楚可见。

## Layout

首页首屏直接呈现品牌和测试行动，并露出下一节。测试页始终单列且题目容器稳定。结果页在桌面并排显示人格牌与摘要，报告正文限制 68ch；移动端先完整交付身份并露出下一节。Expanded 视口可有目录与分享摘要，但不形成第二正文列。

## Motion

状态反馈 120-180ms，页面转换 220-320ms，揭晓 900-1400ms。动效只服务状态、导航与揭晓；不使用持续漂浮或滚动入场。`prefers-reduced-motion` 下关闭旋转和翻牌，改用不超过 180ms 的淡入。

## Source Of Truth

实现令牌位于 `src/design-system/tokens.css` 与 `src/design-system/global.css`；完整批准规范位于 `docs/superpowers/specs/2026-07-19-zati-yaoxu-design-system.md`。结构或视觉合同变化时三者必须同步。
