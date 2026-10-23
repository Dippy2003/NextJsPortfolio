# Rebuild portfolio with a portrait hero, 3D skills keyboard, and Remotion films

The portfolio now combines a portrait hero with animated technology orbits, a
48-key 3D skills explorer and a searchable collection retaining all 22 projects.
The duplicate category catalog has been removed. All 43 technologies
from the original portfolio are preserved and five project-related technologies
extend the interactive board.

On every page load, technology cards fly in from the top, sides, and bottom with
staggered spring motion, arriving within 1.2 seconds of playback. PNG icons are
preloaded in the server response, and the muted hero autoplays without waiting
for viewport detection or shared audio initialization. After the entrance, native
Player looping keeps the cards moving around a slow, 48-second elliptical orbit.
The portrait is layered above the cards so they pass behind the subject rather
than across the face. Reduced-motion visitors see the settled composition.

Hero and About animation players mount immediately after hydration, keeping their
generated frame styles out of the server/client attribute comparison. The portrait
and page text remain server-rendered. Playback setup follows player readiness, so
mounting the animation after hydration still starts autoplay and attaches looping
and visibility handlers correctly.

The skills keyboard rotates slowly and pauses while hovered. Neutral keycaps show
large, full-color technology marks. Local PNG textures avoid SVG decoding problems,
and independent logo loading keeps an image failure from rejecting the scene.
Selecting a category reconfigures the board and reframes the camera.

The page adds original interface screenshots, expandable project notes, six
service areas with concrete capabilities, a portfolio overview, and an
interactive systems explorer covering vision, RAG, and data pipelines. The project
directory displays all remaining projects by default rather than hiding them
behind an expansion button.

Three Remotion concept films introduce RepVision, PlayerPulse, and Pinecone RAG
Studio. The films have explicit concept labels. The project links, résumé,
GitHub activity, social profiles, and contact destination are preserved.

The redesign includes a complementary light theme, persisted theme selection,
motion controls, system reduced-motion support, accessible skill buttons, and
responsive layouts. The contact form now handles invalid fields, duplicate
submissions, failed delivery, and timeouts. The page retains server-rendered
content and loads the WebGL scene on approach.

About sits immediately after the hero and now includes a Remotion portrait scene
with CSS 3D layers, rotating cubes, orbital rings, floating technology cards, and
pointer tilt. An amber/teal energy trail follows scrolling behind the page content.
It fades when scrolling stops and stops scheduling frames at rest. Both effects
respect motion controls and hidden tabs; the portrait also pauses offscreen.

Next.js and its ESLint configuration are updated together within version 16.
Compatible dependency updates remove the production dependency advisories found
during implementation. Five high advisories remain in the development-only
ESLint/fast-glob/braces dependency chain; npm currently suggests a breaking
downgrade of eslint-config-next to resolve them. No forced downgrade was applied.

## Validation

- ESLint passes.
- Twenty-six interaction and integrity tests pass, using mocked network requests.
- Production build passes and `/` is statically prerendered.
- Local page responds with HTTP 200.
- Production HTTP checks confirm the résumé, portrait, technology assets, favicon,
  and branded 404 response; core page content is present in server-rendered HTML.
- Formatting and Git whitespace checks pass.
- RepVision exports to an eight-second 1280×720 H.264 MP4 at 30 fps.
- HeroOrbit renders with the locally hosted technology assets.
- Hero tests cover fresh-mount entrance playback, continuous orbit looping,
  settling within 1.2 seconds, bounds, and a seamless orbit loop boundary.
- Hero and About SSR/hydration tests verify that frames mount after hydration and
  playback starts when the player ref becomes available.
- The expanded 48-key keyboard renders with visible local technology logos.
- AboutPortrait renders in dark and light themes. Motion lifecycle tests cover
  offscreen/hidden-tab playback and scroll-animation settling and cancellation.
- Production dependency audit reports zero vulnerabilities.

## Review limits

Browser automation could not complete because Windows computer-use state capture
repeatedly timed out. Desktop/mobile visual inspection, WebGL input,
native-dialog focus behavior, and performance scores need a normal browser
review. No live contact messages were submitted. The hero portrait cutout was
generated from the original photo; both versions are available for comparison.

The changes are published as seven focused pull requests. See [the review stack](PR_STACK.md) for links and merge order.
