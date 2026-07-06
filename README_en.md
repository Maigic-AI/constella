# Constella

> Put the people who matter into a glowing star map of time.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-prototype-blueviolet.svg)](#roadmap)
[![Data Schema](https://img.shields.io/badge/schema-JSON%20Schema%202020--12-blue.svg)](data/people.schema.json)
[![No Build](https://img.shields.io/badge/runtime-zero%20dependency-22aa66.svg)](#tech-stack)
[![中文](https://img.shields.io/badge/README-中文-red.svg)](README.md)
[![English](https://img.shields.io/badge/README-English-lightgrey.svg)](README_en.md)

**[Live Demo](#)** · **[中文 README](README.md)** · **[Data Spec](AGENTS.md)** · **[Roadmap](#roadmap)**

---

## What it is

Constella is a pure-frontend visualization that places people on a **zoomable star map of time** by era, region, and discipline. Each person is a breathing star — click, filter, search, or upload your own dataset.

The seed dataset is 101 scientists, mathematicians, philosophers, and thinkers — inspired by the Agent name list from the OpenAI Codex repository.

---

## Features (implemented)

- **Horizontal time star map**: people placed on a segmented non-linear timeline that gives more room to dense modern eras
- **Discipline tracks**: 8 vertical lanes (Mathematics / Physics & Astronomy / Philosophy / Life & Medicine / Computing & Logic / Chemistry & Earth / Social & Political / Engineering & Invention)
- **Region colors**: 10 simplified modern geographic groupings, each with its own color
- **Search & filter**: by name, note keyword, region, or discipline
- **Timeline zoom**: mouse wheel / buttons / drag-to-pan / one-click reset
- **Person detail panel**: click a node to see era, region, discipline, and a one-line note
- **Breathing nodes**: each star has its own pulse cycle and phase, anchored to global time so animations stay continuous across redraws
- **Flowing star names**: a rotating set of names is shown periodically; only newly entering names fade in
- **Auto-tour mode**: auto-cycle through people at 3 / 5 / 8 second intervals, respecting current filters
- **3D projection view**: isometric projection across time, discipline, and region
- **Data import** 🆕: upload a schema-conforming JSON to fully replace the built-in dataset; the frontend dynamically derives regions/disciplines and hash-generates colors for unknown regions

---

## Quick Start

### Just open it (zero dependencies)

```bash
git clone https://github.com/Maigic-AI/constella.git
cd constella
open index.html
```

### Or run a local static server

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

### Use your own dataset

1. Feed [`AGENTS.md`](AGENTS.md) and [`data/people.schema.json`](data/people.schema.json) to any AI (Claude / ChatGPT / Gemini / Cursor)
2. Give the AI the people you want to visualize
3. The AI outputs a schema-conforming JSON
4. Click **⬆ Import** in the top-right of the page and upload the file
5. The dataset replaces the built-in 101 immediately; refresh the page to revert

You can also edit by hand: [`data/people.example.json`](data/people.example.json) is a minimal sample to follow.

---

## Project structure

```
constella/
├── index.html               # built artifact (open this)
├── index.template.html      # source template (with __PEOPLE_DATA__ placeholder)
├── README.md / README_en.md
├── AGENTS.md                # guide for AI agents to generate data
├── LICENSE
├── scripts/
│   └── build.js             # inlines data/people.json into index.html
└── data/
    ├── people.json          # built-in 101-person dataset
    ├── people.schema.json   # JSON Schema Draft 2020-12
    └── people.example.json  # 5-record sample
```

After editing the built-in data, run `node scripts/build.js` to regenerate `index.html`.

---

## Tech stack

HTML · CSS · Vanilla JavaScript · SVG

**Zero runtime dependencies, no framework, just open `index.html`.**

The build script [`scripts/build.js`](scripts/build.js) only needs Node.js — it inlines `data/people.json` into the template to produce a single-file `index.html`, preserving the "double-click to run" property.

---

## Roadmap

**The current version is a pure-frontend prototype.** Planned directions (subject to change):

- 📌 Extended fields: `id` / `displayName` / `birthYear` / `deathYear` / `country` / `summary` / `tags` / `links`
- 📌 Relationship edges (mentor / collaborator / influencer / school)
- 📌 Story mode: play by era or discipline, custom playlists, scroll-driven narrative
- 📌 Persistence: localStorage / cloud library / multi-project
- 📌 In-page editing: CRUD, CSV import, avatar upload
- 📌 Customization: themes, node size, track density, timeline range

---

## Data source & license

The seed list of 101 names comes from `codex-rs/core/src/agent/agent_names.txt` in the [OpenAI Codex](https://github.com/openai/codex) repository. Years / regions / disciplines are simplified editorial choices.

Some names (e.g. Franklin, Herschel, Zeno, Jason) are intentionally ambiguous.

**Code license**: MIT — see [LICENSE](LICENSE).

**Third-party material**: biographies, avatars, and external references may carry their own copyrights; please verify usage rights accordingly.

---

## Acknowledgements

Design inspired by:

- Historical timelines
- Knowledge graphs of people
- Digital star charts
- Data storytelling
- Interactive museums and digital exhibitions

> Every name is a star in time.
