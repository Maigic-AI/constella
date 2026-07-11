---
name: constella
description: Generate Constella people dataset JSON arrays from user-provided biographies, profile lists, tables, notes, or summaries. Use when the user wants data that can be imported into Constella locally or at https://constella.maigic.top, and must follow data/people.schema.json with unique names, integer/null birth years, region and field categories, concise Chinese notes, and no extra fields.
---

# Constella People JSON

Use this skill to generate a replacement people dataset for Constella, also known as 群星志. Treat `AGENTS.md` and `data/people.schema.json` in this repository as the authoritative references.

## Output

Return only a JSON array unless the user explicitly asks for explanation or Markdown.

Each array item must be an object with exactly these five fields:

| Field | Type | Rule |
| --- | --- | --- |
| `name` | string | Required. Must be globally unique within the dataset. |
| `year` | integer or null | Required. Birth year only. Use negative integers for BCE years; use `null` when unknown. |
| `region` | string | Required. Prefer the built-in region names when they fit. |
| `field` | string | Required. Prefer the built-in field names when they fit. |
| `note` | string | Required. Prefer Chinese, concise, ideally under 30 Chinese characters. |

Do not add unsupported fields such as `id`, `displayName`, `birthYear`, `deathYear`, `tags`, `links`, or `relations`.

## Preferred Regions

Use these names when possible for visual consistency:

- `Western Europe`
- `Central Europe`
- `Eastern Europe`
- `Northern Europe`
- `South Asia`
- `East Asia`
- `Middle East`
- `North America`
- `Oceania`
- `Unknown`

Custom region names are allowed, but keep naming consistent within the same dataset.

## Preferred Fields

Use these names when possible:

- `Mathematics`
- `Physics & Astronomy`
- `Philosophy`
- `Life & Medicine`
- `Computing & Logic`
- `Chemistry & Earth`
- `Social & Political`
- `Engineering & Invention`
- `Unknown`

Custom fields are allowed for datasets outside the built-in science/history taxonomy, such as literature, music, art, family trees, fictional worlds, or custom categories.

## Generation Rules

1. The top level must be a JSON array.
2. Include at least one record.
3. Keep `name` globally unique.
4. Use integers for known birth years, not strings.
5. Use negative integers for BCE years, for example `-551` for 551 BCE.
6. Use `null` for unknown years, not `0`.
7. Use the birth year when both birth and death years are provided.
8. Keep `note` short and useful for a sidebar label.
9. Avoid records before `-600` when possible, because the current timeline may visually compress very ancient nodes.
10. Prefer no more than 500 records for frontend performance.

## Usage Instructions For The User

After generating the JSON, tell the user they can use it in either of these ways if they asked for usage guidance:

1. Visit https://constella.maigic.top and import the generated JSON with the page's import button.
2. Deploy or open the project locally, then import the generated JSON in the local Constella frontend.

For local use, the repository is a pure frontend page. The user can open `index.html` directly in a browser, or serve the folder with any static file server.

## Validation

Before final output, mentally check:

- The output is valid JSON.
- The top level is an array, not `{ "people": [...] }`.
- Every object has exactly `name`, `year`, `region`, `field`, and `note`.
- All `name` values are unique.
- All `year` values are integers or `null`.
- There are no Markdown fences unless explicitly requested.

If a file-based validation is available, validate against:

```bash
npx ajv-cli validate -s data/people.schema.json -d your-data.json
```

## Example

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
    "name": "Ada Lovelace",
    "year": 1815,
    "region": "Western Europe",
    "field": "Computing & Logic",
    "note": "早期程序设计思想先驱"
  }
]
```
