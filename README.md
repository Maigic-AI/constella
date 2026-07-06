# 群星志 Constella

> 把重要的人,放进一张会发光的时间星图。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-prototype-blueviolet.svg)](#roadmap)
[![Data Schema](https://img.shields.io/badge/schema-JSON%20Schema%202020--12-blue.svg)](data/people.schema.json)
[![No Build](https://img.shields.io/badge/runtime-zero%20dependency-22aa66.svg)](#技术栈)
[![中文](https://img.shields.io/badge/README-中文-red.svg)](README.md)
[![English](https://img.shields.io/badge/README-English-lightgrey.svg)](README_en.md)

**[在线 Demo](#)** · **[English README](README_en.md)** · **[数据规范](AGENTS.md)** · **[Roadmap](#roadmap)**

---

## 这是什么

群星志是一个把人物按时代、地区、专业放置在**可缩放时间星图**上的纯前端可视化页面。每一个人物都是一颗会呼吸的星,你可以点击、筛选、搜索,也可以上传自己的人物数据集。

初始数据集是 101 位科学家、数学家、哲学家与思想家 —— 灵感来自 OpenAI Codex 仓库中的 Agent 名称列表。

---

## 核心特性(已实现)

- **横向时间星图**:人物按出生年代分布在分段非线性时间轴上,为近现代高密度时期分配更多展示空间
- **专业轨道**:8 条纵向轨道(Mathematics / Physics & Astronomy / Philosophy / Life & Medicine / Computing & Logic / Chemistry & Earth / Social & Political / Engineering & Invention)
- **地区颜色**:10 个简化现代地理分组,每个地区独立配色
- **搜索与筛选**:按姓名、简介关键词、地区、专业筛选
- **时间轴缩放**:鼠标滚轮缩放 / 按钮缩放 / 拖拽平移 / 一键重置
- **人物详情**:点击节点,右侧显示年代、地区、专业与一句话简介
- **节点呼吸效果**:每颗星拥有独立的呼吸周期与动画相位,基于全局时间相位,重绘后仍连续呼吸
- **流动星名**:页面定期随机展示一组人物名称,只有新进入组的名字播放淡入
- **随机介绍模式**:自动巡游,支持 3 / 5 / 8 秒间隔,遵循当前筛选
- **三维投影视图**:等距投影展示时代、专业与地区三个维度
- **数据导入** 🆕:支持上传符合 schema 的自定义 JSON,完全替换内置数据集;前端动态推导地区/专业轨道,为未知地区哈希生成颜色

---

## Quick Start

### 直接打开(零依赖)

```bash
git clone https://github.com/Maigic-AI/constella.git
cd constella
open index.html
```

### 或用本地静态服务器

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

### 用自定义数据集

1. 把 [`AGENTS.md`](AGENTS.md) 与 [`data/people.schema.json`](data/people.schema.json) 喂给任意 AI(Claude / ChatGPT / Gemini / Cursor)
2. 告诉 AI 你想呈现的人物资料
3. AI 输出符合 schema 的 JSON
4. 在页面右上角点击 **⬆ 导入数据** 上传
5. 数据即时替换内置 101 人;刷新页面回到内置数据集

无需 AI 也可手工编辑:[`data/people.example.json`](data/people.example.json) 是一份可参考的最小样例。

---

## 项目结构

```
constella/
├── index.html               # 构建产物(可直接打开)
├── index.template.html      # 源模板(含 __PEOPLE_DATA__ 占位)
├── README.md / README_en.md
├── AGENTS.md                # 给 AI 阅读的数据生成指南
├── LICENSE
├── scripts/
│   └── build.js             # 把 data/people.json 内联到 index.html
└── data/
    ├── people.json          # 内置 101 人数据
    ├── people.schema.json   # JSON Schema Draft 2020-12
    └── people.example.json  # 5 条示例
```

修改内置数据后跑 `node scripts/build.js` 重新生成 `index.html`。

---

## 技术栈

HTML · CSS · Vanilla JavaScript · SVG

**零运行时依赖,无构建框架,双击 `index.html` 即可运行。**

构建脚本 [`scripts/build.js`](scripts/build.js) 仅需 Node.js,把 `data/people.json` 内联到模板生成单文件 `index.html`,保留"双击即开"特性。

---

## Roadmap

**当前版本是纯前端原型**,以下为后续规划方向(部分功能可能调整):

- 📌 扩展字段:`id` / `displayName` / `birthYear` / `deathYear` / `country` / `summary` / `tags` / `links`
- 📌 人物关系连线(师承 / 合作 / 思想影响 / 同学派)
- 📌 故事模式:按年代或专业自动播放、自定义播放列表、滚动叙事
- 📌 数据持久化:localStorage / 云端人物库 / 多项目
- 📌 编辑能力:页面内 CRUD、批量导入 CSV、头像上传
- 📌 星图自定义:主题、节点大小、轨道密度、时间轴范围

---

## 数据来源与许可

内置 101 人初始名单来自 [OpenAI Codex](https://github.com/openai/codex) 仓库中 `codex-rs/core/src/agent/agent_names.txt`,年代/地区/专业为简化整理版本。

部分姓名(如 Franklin、Herschel、Zeno、Jason)存在指代歧义。

**代码许可**:MIT,见 [LICENSE](LICENSE)。

**第三方资料**:人物介绍、头像与外部资料可能拥有各自版权,使用时请确认相应授权范围。

---

## 致谢

设计上受到以下方向启发:

- 历史时间轴
- 人物知识图谱
- 数字星图
- 数据叙事
- 互动博物馆与数字展览

> 每一个名字,都是时间中的一颗星。
