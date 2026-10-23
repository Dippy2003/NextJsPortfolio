# Portfolio redesign

Branch: `feat/portfolio-3d-redesign`. Development is local; no remote branch,
pull request, merge, or deployment is created without publishing authorization.

## Reference direction

- `WhatsApp Video 2026-10-22 at 2.39.27 PM.mp4`: an angled mechanical skills
  keyboard with colored technology keycaps and changing descriptions.
- `WhatsApp Video 2026-10-22 at 2.39.47 PM.mp4`: a portrait-centered composition,
  warm lighting, and floating technology marks.

The implementation combines a portrait hero, a live WebGL keyboard, an accessible
HTML skills explorer, and a complete project collection. Dark olive charcoal,
warm ivory, and amber unify the sections; a complementary light theme is available.

## Architecture

- `app/page.js` remains a Server Component. Interactivity is isolated in client
  components rather than making the whole route a client entry.
- `app/data/portfolio.js` reuses all existing projects in `assets/assets.js`.
  It adds skill descriptions, shortcut mappings, and relevant repository links.
- `KeyboardScene.jsx` uses React Three Fiber 9 (React 19 compatible), Three.js,
  and rounded Drei geometry. The renderer loads near the toolkit section,
  lowers pixel density, and stops continuous rendering outside the viewport.
- Skill buttons are always present. The list view also works without WebGL,
  and system reduced motion uses that view automatically.
- `HeroComposition.jsx` powers the orbiting technologies through Remotion Player.
  On first opening, cards fly in from different directions with staggered spring
  motion and settle around the portrait. Later playback repeats only the periodic
  idle range, so the entrance does not replay or fade away every twenty seconds.
  Playback pauses offscreen, in a hidden tab, or when the visitor disables motion.
- `ProjectReel.jsx` powers the three project concept films. These are explicitly
  labeled illustrations, not claimed screenshots or measured outcomes.
- `remotion/Root.jsx` exposes four compositions for Studio and local export.
- Native HTML dialogs provide the project-film modal and its focus containment.
- The existing Web3Forms destination is retained. The form adds native validation,
  a bot trap, a duplicate-send guard, a 15-second timeout, and success/retry states.
  The optional `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` overrides the existing public
  form identifier. No live test submissions should be sent without authorization.

## Assets

Technology marks are served locally. See `public/tech/ATTRIBUTION.md` and
`public/tech/LICENSE` for the Devicon attribution and license.

`public/portrait-cutout.png` was prepared with the built-in imagegen tool from
`assets/userdipna.png`. The original remains unchanged; the About section uses it.
Review the generated cutout against the original before publishing.

Exact imagegen prompt:

> Use case: background-extraction. Asset type: transparent portrait cutout for the subject's personal portfolio hero. Input image 1 is the edit target. Remove ONLY the blue studio backdrop, including the empty space above and around the subject. Preserve the exact real person's identity, facial features, face proportions, expression, hairstyle, glasses, skin texture and skin tone, black suit, blue shirt, crossed-arm pose, hands and bracelet. Do not beautify, reconstruct, restyle, retouch, relight, change clothing, or invent any details. Keep the entire person visible exactly as photographed. Crop unnecessary empty transparent space above the hair for a neatly framed vertical waist-up cutout, with small transparent margins around hair, shoulders, and arms. Clean natural hair edges. Output true RGBA transparency with no backdrop, shadow, text, vignette, glow, border, or other additions.

## Development and review

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run remotion:studio
npm run remotion:render -- RepVision output/repvision.mp4
```

Keep `remotion`, `@remotion/player`, and `@remotion/cli` at the same exact version.
Video exports go to ignored `output/`. Rendering may download Remotion's supported
headless browser on first use.

Automated tests use a mocked network: no form messages are delivered. They cover
project reachability/filtering, skill selection and shortcut boundaries,
contact success/error/duplicate states, reduced motion, theme persistence,
and mobile navigation disclosure. They do not replace browser visual review.

Browser automation was stopped by the computer-use tool because it could not
reliably determine the active Chrome URL. Desktop/mobile visual review, WebGL
interaction, modal focus behavior, and performance scores remain unverified.
Check those in a normal browser before publishing.

Validated locally: ten interaction tests, ESLint, formatting, the production
build, HTTP checks for the page/assets/résumé/404, an eight-second RepVision MP4,
and a HeroOrbit still. The production dependency audit is clean. Five advisories
remain in the development-only Next ESLint / fast-glob / micromatch / braces chain;
the available npm suggestion would downgrade the ESLint configuration across major
versions, so it was not applied.
