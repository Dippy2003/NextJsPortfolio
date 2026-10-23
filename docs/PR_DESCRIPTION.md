# Rebuild portfolio with a portrait hero, 3D skills keyboard, and Remotion films

The portfolio previously presented projects and skills through a conventional
stack of cards. This rebuild introduces a portrait hero with animated technology
orbits, a live 3D keyboard that connects each skill to relevant work, and a
filterable collection retaining all 22 projects.

Three Remotion concept films introduce RepVision, PlayerPulse, and Pinecone RAG
Studio. The films have explicit concept labels. The project links, résumé,
GitHub activity, social profiles, and contact destination are preserved.

The redesign includes a complementary light theme, persisted theme selection,
motion controls, system reduced-motion support, accessible skill buttons, and
responsive layouts. The contact form now handles invalid fields, duplicate
submissions, failed delivery, and timeouts. The page retains server-rendered
content and loads the WebGL scene on approach.

Next.js and its ESLint configuration are updated together within version 16.
Compatible dependency updates remove the production dependency advisories found
during implementation. Five high advisories remain in the development-only
ESLint/fast-glob/braces dependency chain; npm currently suggests a breaking
downgrade of eslint-config-next to resolve them. No forced downgrade was applied.

## Validation

- ESLint passes.
- Ten component interaction tests pass, using mocked network requests.
- Production build passes and `/` is statically prerendered.
- Local page responds with HTTP 200.
- Production HTTP checks confirm the résumé, portrait, technology assets, favicon,
  and branded 404 response; core page content is present in server-rendered HTML.
- Formatting and Git whitespace checks pass.
- RepVision exports to an eight-second 1280×720 H.264 MP4 at 30 fps.
- HeroOrbit renders with the locally hosted technology assets.
- Production dependency audit reports zero vulnerabilities.

## Review limits

Browser automation stopped because the computer-use tool could not reliably
determine Chrome's current URL. Desktop/mobile visual inspection, WebGL input,
native-dialog focus behavior, and performance scores need a normal browser
review. No live contact messages were submitted. The hero portrait cutout was
generated from the original photo; both versions are available for comparison.

This description is prepared locally. No remote branch or PR has been published.
