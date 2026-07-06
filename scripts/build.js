#!/usr/bin/env node
/**
 * 将 data/people.json 内联到 index.template.html 的占位标记处,
 * 生成可直接双击打开的 index.html (零运行时依赖)。
 *
 * 源模板 (index.template.html) 永远保持 __PEOPLE_DATA__ 占位,
 * 产物 (index.html) 才是真实可运行的单文件。
 *
 * 用法:
 *   node scripts/build.js                    # 默认输出到 index.html
 *   node scripts/build.js -o dist/index.html # 输出到指定路径
 *
 * 修改人物数据请编辑 data/people.json,然后重新运行本脚本。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'index.template.html');
const dataPath = path.join(root, 'data', 'people.json');

// 读取数据并校验
const people = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
if (!Array.isArray(people)) {
  console.error('build: people.json 顶层必须是数组');
  process.exit(1);
}
const required = ['name', 'year', 'region', 'field', 'note'];
people.forEach((p, i) => {
  required.forEach((k) => {
    if (!(k in p)) {
      console.error(`build: 第 ${i + 1} 条记录缺少字段 "${k}" (${JSON.stringify(p.name ?? p)})`);
      process.exit(1);
    }
  });
});

// name 必须全局唯一,前端用 name 作为节点选中态主键
const names = people.map((p) => p.name);
const dupes = names.filter((n, i) => names.indexOf(n) !== i);
if (dupes.length) {
  console.error(`build: 检测到重复 name: ${dupes.join(', ')}`);
  console.error('build: 前端用 name 作为节点主键,重复会导致选中态混乱。');
  process.exit(1);
}

// 读取模板
let html = fs.readFileSync(srcPath, 'utf8');
const marker = 'let data=__PEOPLE_DATA__;';
if (!html.includes(marker)) {
  console.error(`build: index.template.html 中找不到占位标记 "${marker}"`);
  console.error('build: 源模板被破坏,请检查 index.template.html 是否仍是占位形态。');
  process.exit(1);
}

// 内联:保持与原版一致的紧凑 JSON 格式
const inlined = `let data=${JSON.stringify(people)};`;
const out = html.replace(marker, inlined);

// 输出 (默认产物为 index.html,与源模板分离,可重复构建)
const outArgIdx = process.argv.indexOf('-o');
let outPath = path.join(root, 'index.html');
if (outArgIdx !== -1 && process.argv[outArgIdx + 1]) {
  outPath = path.resolve(process.argv[outArgIdx + 1]);
}
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`build: 已内联 ${people.length} 条人物数据`);
console.log(`build: 输出 -> ${path.relative(root, outPath)}`);
