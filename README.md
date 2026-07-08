# Dipna Wijesinghe — Portfolio

A personal portfolio site built with Next.js, showcasing projects across AI/ML, data engineering & BI, LLM agents, and full-stack development — with a live GitHub contributions graph pulled in real time.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## Features

- **Dark / light mode** with system-preference detection and a manual toggle
- **About & Skills** — categorized tech skills (AI/ML, Data Engineering & BI, AI Agents & LLM Tooling, Web, Mobile, DevOps) with live logo icons
- **Services** — web, mobile, UI/UX, AI/ML, and AI-agent/automation offerings
- **Live GitHub contribution graph** — fetched client-side in real time from the public GitHub contributions API, no token required
- **Work** — projects grouped by category (AI & Machine Learning, AI Agents & RAG, Data Engineering & BI, Software & Desktop Apps, Mobile Development, UI/UX & Design), newest work flagged with a "New" badge, every card links straight to its GitHub repository
- **Contact form** powered by Web3Forms
- Built with the React Compiler enabled for automatic memoization

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router, Turbopack) | Framework / rendering |
| [React 19](https://react.dev) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [Motion](https://motion.dev) | Animations |
| [react-github-calendar](https://github.com/grubersjoe/react-github-calendar) | Live GitHub contributions graph |
| [ESLint 9](https://eslint.org) | Linting |

## Project Structure

```
app/
├── components/    # Navbar, Header, About, Skills, Services, GithubActivity, Work, Contact, Footer
├── layout.js      # Root layout, fonts, metadata
├── page.js        # Assembles all sections, handles dark mode state
└── globals.css    # Tailwind theme + custom utilities
assets/
└── assets.js      # Work/skills/services data and local image imports
public/            # Static files (resume, misc images)
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
