# Portfolio pull request stack

Review and merge these parts in order. Each PR targets the preceding branch, so
its diff isolates that step rather than repeating the whole redesign.

| Part | Pull request                                                                                                                | Base branch                  |
| ---- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1    | [#2 - Rebuild portfolio with responsive layout and Remotion showcases](https://github.com/Dippy2003/NextJsPortfolio/pull/2) | `main`                       |
| 2    | [#3 - Animate technology cards entering around the hero portrait](https://github.com/Dippy2003/NextJsPortfolio/pull/3)      | `pr/01-portfolio-foundation` |
| 3    | [#4 - Rotate the skills keyboard and display branded keycap logos](https://github.com/Dippy2003/NextJsPortfolio/pull/4)     | `pr/02-hero-entrance`        |
| 4    | [#5 - Expand project discovery and the 48-key skills explorer](https://github.com/Dippy2003/NextJsPortfolio/pull/5)         | `pr/03-keyboard-motion`      |
| 5    | [#6 - Place About after the hero and toolkit before selected projects](https://github.com/Dippy2003/NextJsPortfolio/pull/6) | `pr/04-expanded-portfolio`   |
| 6    | [#7 - Add a 3D Remotion About portrait and scroll energy trail](https://github.com/Dippy2003/NextJsPortfolio/pull/7)        | `pr/05-section-order`        |
| 7    | [#8 - Autoplay the hero with a smooth orbit behind the portrait](https://github.com/Dippy2003/NextJsPortfolio/pull/8)       | `pr/06-about-and-scroll`     |

After a preceding PR merges, retarget the next PR to `main` before merging it.
Keep parent branches until their dependent PRs have been retargeted.
Use merge commits to preserve the stack's ancestry. Squash or rebase merges
require rebasing the remaining parts onto `main` before continuing.

The stack contains every development commit from `843d818` through `a5c9abe`.
Part 7 also includes this review index and the current documentation.

The final combined implementation passed 27 tests, lint, formatting, the
production build, and HTTP asset checks. Rendered stills cover the keyboard,
hero entrance/orbit, and About animation; the About scene also exported to MP4.
Full-page desktop/mobile browser review and cold browser startup timing remain
unverified. Contact tests used mocked network requests.
