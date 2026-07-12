# ERPH MoE — Lesson Plan Generator for Malaysian English Teachers

> **E**nglish **R**ecord of **P**lanning and **H**istory — Aligned with the Malaysian Ministry of Education (MoE) DSKP Curriculum.

ERPH MoE is an open-source web application that lets Malaysian primary school English teachers generate **Daily**, **Weekly**, and **Monthly** lesson plans with a single button click. It is fully serverless — all data stays in your browser via localStorage, making it easy to deploy on Vercel, GitHub Pages, or any static host.

## Features

- **AI-Powered Generation** — Uses OpenAI (or any compatible LLM via the Vercel AI SDK) to generate complete, curriculum-aligned lesson plans.
- **DSKP Curriculum Reference** — Built-in Content and Learning Standards for Years 1–6 across all five skill areas (Listening, Speaking, Reading, Writing, Language Arts).
- **Daily / Weekly / Monthly Views** — Organise and manage your lesson plans by time period.
- **Timetable Setup** — Define your weekly teaching schedule to power lesson plan generation.
- **Fully Offline-Capable** — All data persists in localStorage. No backend or database required.
- **Modern UI** — Built with Next.js 14 (App Router), Tailwind CSS, and shadcn/ui components.
- **One-Click Deploy** — Deploy to Vercel, Netlify, or GitHub Pages with zero configuration.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide](https://lucide.dev/) |
| AI SDK | [Vercel AI SDK](https://sdk.vercel.ai/) (`ai`, `openai`) |
| State | localStorage (zero-dependency persistence) |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/your-username/erph-moe.git
cd erph-moe
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static output will be in the `out/` directory, ready to deploy to any static host.

### AI Integration (Optional)

To enable AI-powered lesson plan generation, set up your API key:

```bash
# Create a .env.local file
echo "OPENAI_API_KEY=your_key_here" > .env.local
```

The app will still work without an API key — it generates template-based plans as a fallback.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar navigation
│   ├── page.tsx                # Dashboard page
│   ├── globals.css             # Global styles + CSS variables
│   ├── timetable/
│   │   └── page.tsx            # Timetable setup page
│   ├── lesson-plans/
│   │   ├── page.tsx            # Lesson plans (daily/weekly/monthly tabs)
│   │   ├── weekly/page.tsx     # Weekly view redirect
│   │   └── monthly/page.tsx    # Monthly view redirect
│   └── curriculum/
│       └── page.tsx            # DSKP curriculum browser
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   └── scroll-area.tsx
│   └── sidebar.tsx             # Application sidebar navigation
├── lib/
│   ├── utils.ts                # cn() utility
│   └── store.ts                # localStorage persistence hook
└── types/
    └── index.ts                # TypeScript type definitions
```

## Curriculum Data

The app includes a comprehensive set of DSKP Content and Learning Standards for:

- **Year 1–6** English language curriculum
- **5 skill areas**: Listening, Speaking, Reading, Writing, Language Arts
- **4 themes**: World of Self, Family and Friends; World of Stories; World of Knowledge; World of Arts

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repo to GitHub.
2. Import the project in Vercel.
3. Set `OPENAI_API_KEY` in environment variables (optional).
4. Deploy.

### GitHub Pages

```bash
npm run build
# The out/ folder is ready to deploy
```

## License

MIT — see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

---

Built with ❤️ for Malaysian educators.
