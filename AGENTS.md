# ZATI - 东方人格类型测试
React 19 + TypeScript + Vite + Vitest + Playwright

<directory>
src/domain/ - 框架无关的题库、类型、计分和持久化
src/design-system/ - 曜序令牌和可访问基础组件
src/features/ - 首页、测试、揭晓、结果和十六型页面
src/app/ - 路由和应用组合
tests/e2e/ - 关键用户流程浏览器验证
docs/ - 已批准设计规范、实现计划和审查报告
</directory>

<config>
package.json - 开发、测试、构建和端到端脚本
vite.config.ts - Vite 与 Vitest 配置
playwright.config.ts - 桌面和移动浏览器验证配置
PRODUCT.md - 用户、产品边界、品牌人格和设计原则
DESIGN.md - 曜序视觉令牌、组件、布局和动效摘要
.impeccable/live/config.json - Vite 单页应用的可视化迭代入口配置
</config>

[PROTOCOL]: 修改顶层模块、技术栈或文件边界时更新本文件。
