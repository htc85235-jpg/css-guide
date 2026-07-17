# CSS Guide 🎓

> A professional, responsive website built for Pakistan's CSS (Central Superior Services) competitive exam aspirants — featuring 3D effects, scroll animations, motivational quotes, and comprehensive exam information.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0080?logo=framer)

## ✨ Features

- **Interactive Hero Section** — 3D tilt cards, floating animations, shine sweep effects, glass morphism
- **Comprehensive Exam Info** — 12 CSS occupational groups listed by merit priority (PAS → FSP → PSP → Customs → ...)
- **Subject-wise Syllabus** — Direct link to [The CSS Point](https://thecsspoint.com) for official FPSC syllabus
- **Compulsory & Optional Subjects** — 6 compulsory + 50+ optional subjects with marks, scoring trends, syllabus length
- **Exam Schedule** — Complete CSS calendar with application deadlines, written exam, viva voce
- **Motivational Quotes** — Curated quotes from Quaid-e-Azam, Churchill, Eleanor Roosevelt, Edison
- **Preparation Resources** — Recommended books, daily routine, YouTube channels, websites
- **FAQ Section** — 10 most-asked questions by CSS aspirants
- **Fully Responsive** — Mobile-first design with hamburger menu
- **Smooth Scroll Navigation** — All navbar links anchor to their respective sections

## 🎨 Design

- **Palette:** Pakistan emerald green (`#0e6b3d`) + gold (`#c9a227`) on cream background
- **Typography:** Playfair Display (headings) + Inter/Geist (body)
- **Effects:** 3D tilt cards, floating animations, shine sweep, glass morphism, gradient text, marquee

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display, Inter) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/css-guide.git
cd css-guide

# Install dependencies
npm install   # or: bun install / yarn install / pnpm install

# Start the development server
npm run dev   # or: bun run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
css-guide/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Main page composing all sections
│   │   └── globals.css         # Global styles + design tokens
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   └── site/
│   │       ├── navbar.tsx          # Sticky glass navbar
│   │       ├── hero.tsx            # 3D hero with floating cards
│   │       ├── about.tsx           # What is CSS + eligibility + groups
│   │       ├── syllabus.tsx        # Link to official syllabus
│   │       ├── exam-structure.tsx  # 3-stage exam format
│   │       ├── compulsory.tsx      # 6 compulsory subjects
│   │       ├── optional.tsx        # 50+ optional subjects
│   │       ├── schedule.tsx        # CSS exam calendar
│   │       ├── quotes.tsx          # Motivational quotes
│   │       ├── resources.tsx       # Books, channels, websites
│   │       ├── faq.tsx             # Frequently asked questions
│   │       ├── cta.tsx             # Call-to-action banner
│   │       └── footer.tsx          # Footer with links
│   └── lib/
│       └── utils.ts            # cn() helper
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind config
├── next.config.ts              # Next.js config
└── package.json
```

## 🌐 Deployment

This site is optimized for deployment on:

- **Vercel** (recommended — zero config): https://vercel.com/new
- **Netlify**: https://app.netlify.com/start
- **GitHub Pages**: Requires static export config

### Deploy to Vercel (1-click)

1. Push this repo to GitHub
2. Visit https://vercel.com/new
3. Import your GitHub repo
4. Click **Deploy** — done in 60 seconds

## 📝 Sections Overview

| # | Section | Anchor | Description |
|---|---------|--------|-------------|
| 1 | Hero | `#home` | Animated hero with stats and CTA |
| 2 | About | `#about` | What is CSS, eligibility, 12 occupational groups |
| 3 | Syllabus | `#syllabus` | Link to official FPSC syllabus (thecsspoint.com) |
| 4 | Exam Structure | `#exam-structure` | Written + Psychological + Viva Voce format |
| 5 | Compulsory Subjects | `#compulsory` | 6 compulsory papers (600 marks) |
| 6 | Optional Subjects | `#optional` | 50+ optional subjects (600 marks) |
| 7 | Exam Schedule | `#schedule` | Annual CSS exam calendar |
| 8 | Motivational Quotes | `#quotes` | Curated quotes for aspirants |
| 9 | Resources | `#resources` | Books, YouTube, websites, daily routine |
| 10 | FAQ | `#faq` | 10 most-asked questions |
| 11 | CTA | `#cta` | Final call-to-action |

## 🎯 CSS Occupational Groups (in merit priority order)

1. Pakistan Administrative Service (PAS)
2. Foreign Service of Pakistan (FSP)
3. Police Service of Pakistan (PSP)
4. Customs Group
5. Pakistan Audit & Accounts Service (PAAS)
6. Office Management Group (OMG)
7. Commerce & Trade Group (CTG)
8. Inland Revenue Service (IRS)
9. Information Group (IG)
10. Railways (Commercial & Transport) Group
11. Postal Group (PG)
12. Military Lands & Cantonments (MLC)

## 📜 License

MIT License — feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

---

**Built with ❤️ for CSS aspirants in Pakistan**
