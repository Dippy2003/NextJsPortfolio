# Dipna Wijesinghe Portfolio

A personal portfolio site built with Next.js, showcasing projects across AI/ML, data engineering & BI, LLM agents, and full-stack development, with a live GitHub contributions graph pulled in real time.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## Features

- **Dark / light mode** with system-preference detection and a manual toggle
- **About & Skills**: categorized tech skills (AI/ML, Data Engineering & BI, AI Agents & LLM Tooling, Web, Mobile, DevOps) with live logo icons
- **Services**: web, mobile, UI/UX, AI/ML, and AI-agent/automation offerings
- **Live GitHub contribution graph**: fetched client-side in real time from the public GitHub contributions API, no token required
- **Work**: projects grouped by category (Sports Analytics, AI & Machine Learning, AI Agents & RAG, Data Engineering & BI, Software & Desktop Apps, Mobile Development, UI/UX & Design), newest work flagged with a "New" badge, every card links straight to its GitHub repository
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

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page auto-updates as you edit files under `app/` or `assets/assets.js`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load the Outfit and Ovo font families.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deployment

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new). Import the repository, keep the default Next.js build settings, and deploy. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## Author

**Dipna Wijesinghe** is a Data Science undergraduate (SLIIT), focused on AI/ML, data engineering & BI, and full-stack development.

- GitHub: [@Dippy2003](https://github.com/Dippy2003)
- LinkedIn: [dipna-wijesinghe](https://www.linkedin.com/in/dipna-wijesinghe-50401a396/)
