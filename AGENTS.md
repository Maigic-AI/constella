# AGENTS.md — 群星志数据生成指南

> 本文件供 AI / Agent 阅读。如果你是 AI,正根据用户提供的人物资料生成 JSON,请完整阅读本文档与 `data/people.schema.json`,然后按规范输出。

## 项目背景

群星志(Constella)是一个把人物按时代、地区、专业放置在可缩放时间星图上的纯前端可视化页面。每个节点是一颗"星",颜色由地区决定,纵向轨道由专业决定,横向位置由出生年代决定。

完整产品介绍见 `README.md`,本文档只讲数据格式。

## 你的任务

根据用户提供的人物资料(可能是自然语言、表格、维基链接摘要等),生成一个符合 `data/people.schema.json` 的 JSON 数组。用户会把这个 JSON 上传到群星志前端,完全替换内置数据集。

**输出格式**: 仅输出一个 JSON 数组,不要包裹在对象里,不要添加 Markdown 代码围栏(除非用户明确要求),不要附带解释文字。

## 字段规范

顶层是数组,每个元素是一个人物对象,必须包含以下 5 个字段:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 人物名称。**同一份数据内必须全局唯一**,前端用此字段作为节点选中态的主键。 |
| `year` | integer \| null | 是 | 出生年份。负数 = 公元前(如 `-325` = 公元前 325 年);`null` 表示年代未知。建议范围 `-3000` ~ `2100`。 |
| `region` | string | 是 | 地区分类。简化现代地理分组,非严格国籍。 |
| `field` | string | 是 | 专业方向。决定纵向轨道。 |
| `note` | string | 是 | 一句话简介,**建议中文**,30 字以内。会显示在右侧侧边栏。 |

**禁止添加额外字段**(schema 用 `additionalProperties: false` 严格限制)。`id` / `displayName` / `birthYear` / `tags` / `links` 等扩展字段当前不支持,会被前端拒绝。

## region 推荐值

下列是内置数据集采用的 10 个写法。**非强制** —— 自定义数据集可使用任意地区名(如 `"Africa"`、`"家族-父系"`、`"精灵族"`),前端会动态为新地区生成颜色与图例。

但如果你能匹配到内置值,请优先使用,以保证视觉一致性:

| 值 | 涵盖范围 |
|----|---------|
| `Western Europe` | 英、法、荷、比、瑞士西半部 |
| `Central Europe` | 德语区、奥匈、波兰、捷克、瑞士东半部 |
| `Eastern Europe` | 俄、乌、白俄、东斯拉夫地区 |
| `Northern Europe` | 北欧四国 + 冰岛 + 芬兰 |
| `South Asia` | 印度、巴基斯坦、孟加拉、斯里兰卡 |
| `East Asia` | 中、日、韩、越 |
| `Middle East` | 西亚、北非、波斯、阿拉伯世界 |
| `North America` | 美、加 |
| `Oceania` | 澳、新 |
| `Unknown` | 无法判定时使用 |

**重要**: 同一份数据内,同一地区请保持命名一致。不要混用 `"Europe"` 和 `"Western Europe"`,否则前端会把它们当成两个不同地区生成两条图例。

## field 推荐值

下列是内置数据集采用的 9 个写法。同样**非强制**,但优先匹配:

| 值 | 涵盖范围 |
|----|---------|
| `Mathematics` | 数学 |
| `Physics & Astronomy` | 物理、天文 |
| `Philosophy` | 哲学 |
| `Life & Medicine` | 生物、医学、农学 |
| `Computing & Logic` | 计算机科学、逻辑、信息论 |
| `Chemistry & Earth` | 化学、地质、地球科学 |
| `Social & Political` | 政治、社会、经济、人类学 |
| `Engineering & Invention` | 工程、发明、技术 |
| `Unknown` | 无法判定时使用 |

自定义数据集可使用任意专业名(如 `"Literature"`、`"Music"`、`"Art"`、`"血脉"`)。

## 关键规则

1. **`name` 必须全局唯一**。前端用 `name` 做选中态判断,重名会导致节点状态混乱。
2. **`year` 用整数,不要写字符串**。`1912` 正确,`"1912"` 错误。
3. **公元前用负数**。`-325` = 公元前 325 年。不要写 `"325 BC"`。
4. **年代未知用 `null`**,不要写 `0` 或省略字段。
5. **`note` 用中文**(除非用户明确要求其他语言)。
6. **不要包含 schema 以外的字段**。
7. **顶层必须是数组**,不要包裹在 `{"people": [...]}` 之类的对象里。
8. 至少 1 条记录,建议不超过 500 条(性能考虑)。

## 完整合规示例

```json
[
  {
    "name": "Confucius",
    "year": -551,
    "region": "East Asia",
    "field": "Philosophy",
    "note": "伦理、教育与政治秩序"
  },
  {
    "name": "Avicenna",
    "year": 980,
    "region": "Middle East",
    "field": "Life & Medicine",
    "note": "医学、哲学与伊斯兰黄金时代"
  },
  {
    "name": "Curie",
    "year": 1867,
    "region": "Eastern Europe",
    "field": "Physics & Astronomy",
    "note": "放射性研究"
  },
  {
    "name": "Hinton",
    "year": 1947,
    "region": "North America",
    "field": "Computing & Logic",
    "note": "深度学习与反向传播的奠基者"
  },
  {
    "name": "Mystery",
    "year": null,
    "region": "Unknown",
    "field": "Unknown",
    "note": "年代与身份未知的占位人物"
  }
]
```

(此示例也保存在 `data/people.example.json`。)

## 常见错误(反例)

| ❌ 错误 | ✅ 正确 |
|--------|--------|
| `"year": "1912"` | `"year": 1912` |
| `"year": "325 BC"` | `"year": -325` |
| `"year": 0` (表示未知) | `"year": null` |
| `"region": "Europe"` | `"region": "Western Europe"` 或 `"Central Europe"` |
| `"name"` 在多条记录中重复 | 每条记录 `name` 唯一 |
| `"note": "Founder of X"` | `"note": "X 的奠基者"` |
| 包含 `"id": "alan-turing"` 字段 | 不添加额外字段 |
| 顶层 `{"people": [...]}` | 顶层直接是 `[...]` |
| 单条记录对象,而非数组 | 必须是数组,哪怕只有 1 条 |

## 校验方式

生成 JSON 后,建议自行校验:

**方法 1 — 在线校验器**(推荐非技术用户):
- 打开 https://www.jsonschemavalidator.net/
- 左侧粘贴 `data/people.schema.json` 内容
- 右侧粘贴你生成的 JSON
- 确认无错误

**方法 2 — ajv-cli**(需 Node.js):
```bash
npx ajv-cli validate -s data/people.schema.json -d your-data.json
```

**方法 3 — 前端直接上传**(最终验证):
- 打开 `index.html`
- 点击右上角"导入数据"按钮
- 选择你生成的 JSON 文件
- 若校验失败,alert 会指明具体错误

## 上传流程

1. 用户在群星志前端点击右上角"⬆ 导入数据"按钮
2. 选择你生成的 JSON 文件
3. 前端校验通过后,数据立即替换内置 101 人
4. 出现"恢复内置"按钮,点击可回到内置数据集
5. 刷新页面也会回到内置数据集(无持久化)

## 范围限制(已知)

- **时间轴分段** 当前硬编码为 `-600` ~ `2050`。year 远早于 -600(如 -3000)的节点会落在时间轴左边缘叠加。建议古代人物的 year 不早于 -600。
- **无 `birthYear`/`deathYear` 区分**: 当前 `year` 字段表示"出生年份"。如用户提供完整生卒,请只用出生年。
- **无人物关系/师承字段**: 当前版本只展示孤立节点,不支持连线。

## 一句话总结

输出一个 JSON 数组,每个元素含 5 个字段(`name`/`year`/`region`/`field`/`note`),`name` 唯一,`year` 用整数或 null,`note` 用中文,不要额外字段。
