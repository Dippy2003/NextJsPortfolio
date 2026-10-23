# Dipna Wijesinghe — Portfolio

A personal portfolio for a Data Science undergraduate at SLIIT, bringing together
AI/ML, computer vision, RAG systems, data engineering, and full-stack development.

The redesign combines a warm portrait hero, Remotion motion sequences, a live 3D
48-key skills keyboard preserving the original toolkit, and six projects shown
initially with a Show more projects button to reveal all 22. It includes dark/light themes,
reduced-motion support, an accessible skills list, GitHub activity, résumé
downloads, and the existing Web3Forms contact integration.

The expanded experience adds six service areas, a visual systems explorer for
computer vision/RAG/data engineering, original interface screenshots, project
notes, and project search across the complete collection.

The work is organized into [seven focused pull requests](docs/PR_STACK.md),
with the review and merge order documented there.

## Run locally

Requires Node.js 22.12+ (or 24 LTS) and npm. Validated on Node.js 24.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Checks

```sh
npm run lint
npm test
npm run format:check
npm run build
```

Tests use mocked network requests; they never send actual contact messages.

## Remotion

```sh
npm run remotion:studio
npm run remotion:render -- RepVision output/repvision.mp4
```

Studio runs on port 3100 and local rendering uses 3101, separate from Next.js.
The composition IDs are `HeroOrbit`, `AboutPortrait`, `RepVision`, `PlayerPulse`,
and `PineconeRAG`. `AboutPortrait` is the looping 3D profile scene in the About
section. A scroll-driven canvas energy trail runs behind the page content.
The three project films are labeled concept visualizations.

Keep `remotion`, `@remotion/player`, and `@remotion/cli` on the same exact version;
the CLI also requires the pinned Zod version. On its first export, Remotion may
download its supported headless browser. Exports are ignored by Git.

## Main files

| Path                    | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `app/page.js`           | Server-rendered page composition                         |
| `app/components/`       | Sections, preferences, 3D scene, and project-film dialog |
| `app/data/portfolio.js` | Profile links, skill mapping, and featured projects      |
| `assets/assets.js`      | Existing project source data                             |
| `app/remotion/`         | Website motion compositions                              |
| `remotion/`             | Studio composition registration                          |
| `app/globals.css`       | Responsive design system and both themes                 |
| `tests/`                | Interaction and preference tests                         |
| `docs/REDESIGN.md`      | Design decisions, assets, and verification limits        |

Technology logos are local assets with attribution in `public/tech/`. The original
portrait remains in `assets/`; its generated cutout is `public/portrait-cutout.png`.
The asset prompt and provenance are documented in [the redesign notes](docs/REDESIGN.md).

## Contact configuration

The existing public Web3Forms form identifier is retained. Set
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` to use another form identifier.
Web3Forms identifiers are intended for client-side use. No private API token is
required. Production delivery depends on the Web3Forms account/domain settings.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · Motion · Remotion · Three.js ·
React Three Fiber 9 · Drei · Lucide · Vitest · Testing Library

## Review workflow

Work is isolated on `feat/portfolio-3d-redesign`. Publishing the branch, opening
the remote PR, merging, and deploying require the owner's authorization. See
[the prepared PR description](docs/PR_DESCRIPTION.md) and the verification limits
in [the redesign notes](docs/REDESIGN.md).
