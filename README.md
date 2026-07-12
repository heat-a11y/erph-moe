# MALP — Malaysian Lesson Planner

A fully client-side, zero-dependency web app for Malaysian primary school English teachers to plan, organise, and generate lesson plans — deployable on GitHub Pages in 60 seconds.

## Features

- **My Timetable** — Interactive weekly grid (Mon–Fri, Periods 1–8). Click any cell to add/edit a class slot. Pre-populated with a sample timetable for Years 1–6.
- **Generate Lesson Plans** — Select a week and a curriculum unit, then click one button. The engine reads your active timetable, cross-references the Curriculum Database, splits lessons into Part 1 / Part 2, and renders beautiful, expandable preview cards.
- **Curriculum Database** — Browse DSKP-aligned content standards, learning standards, learning objectives, theme songs (with guitar chords), and full lesson modules for Years 1–6.
- **Export & Print** — Copy any lesson plan to your clipboard as clean text, or print / save to PDF with a professional, print-optimised layout. Editable Teacher's Reflection fields on every plan card.
- **100 % client-side** — No server, no API, no build step. All data is persisted to `localStorage`.

## Textbook Mapping

| Year | Textbook |
|------|----------|
| Year 1 | Superminds 1 |
| Year 2 | Superminds 2 |
| Year 3 | Get Smart 3 |
| Year 4 | Get Smart Plus 4 |
| Year 5 | English Plus 1 |
| Year 6 | Academy Stars |

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Wait ~30 seconds, then visit `https://<your-username>.github.io/<repo-name>/`.

No build commands, no configuration files, no frameworks.

## Tech Stack

- Single `index.html` file
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Alpine.js](https://alpinejs.dev/) v3 with collapse plugin
- All data stored in browser `localStorage`

## License

MIT
