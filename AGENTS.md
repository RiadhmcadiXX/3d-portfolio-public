<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- The 3D office lives in `src/components/office` and is lazy-loaded from the `/` route (ssr: false) so three.js never runs on the server.
- Walking/collision rules are pure TS in `src/game/sim.ts`; station positions, links and obstacle boxes live in `src/game/stations.ts` — add new clickable spots there.
- Portfolio copy lives in `src/content/portfolio.ts`; furniture GLBs are in `public/models` (Kenney CC0, see CREDITS.md).
