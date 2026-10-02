# Word Runner — 기억의 여정

A playable browser prototype of an Art Nouveau vocabulary-learning RPG.

## Repository

Source repository: [kkaengEminE/word-runner](https://github.com/kkaengEminE/word-runner) (private).

Clone with an authorized GitHub account, then follow the local run instructions below:

```sh
gh repo clone kkaengEminE/word-runner
cd word-runner
```

## Run

Requires Python 3 for the static server, Node.js 20+ only for checks.

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory dist
npm test
npm run check
```

Open http://127.0.0.1:4174 . No build, paid service, account, or API key is required locally. Hosted Site is owner-private by default.

## Playable scope

- Three villages, two paths, ten curated beginner English nouns.
- Automatic word → meaning → paired presentation, adjustable speed, pause, background-tab pause.
- Multiple-choice and spelling battles, randomized enemy formations, exact repeated-hit double strikes, critical hits, evasion, one-hit shields and healing potions.
- Gold, XP, level growth, equipment weight limits, sword/staff class switching, village shops.
- HP persists through a fight; arriving or returning after death restores HP. Learning history persists.
- Auto battle unlocks after reaching village two. Auto answers never increment direct recall/spelling achievements.
- Third-village exam: 5 meaning + 5 spelling questions; 80% pass; a one-time medal/reward; retakes allowed.
- Wordbook with masking, mistake filter, short review awarding one shield.
- 20-node map with only three playable villages; adjacent backtracking supported.
- Five UI and meaning locales (ko/en/ja/ru/es), Chinese disabled. English is the only learning-language dataset in this prototype.
- Browser-local save. An interrupted journey resumes at its last village, retaining learned words and resources. No account sync.

## Architecture

- `dist/engine.js`: pure gameplay and learning-state functions, independent of DOM, ads, native APIs.
- `dist/data.js`: stable word IDs, language-independent route/equipment/enemy definitions, localized meanings.
- `dist/locales/*.json`: editable interface copy by stable keys, named interpolation variables.
- `dist/platform.js`: browser-local persistence adapter; replace when packaging for mobile/Steam.
- `dist/app.js`: Canvas rendering, Web Audio feedback, accessible HTML controls and UI state machine.
- `dist/style.css`: desktop/tablet/mobile UI.
- `tests/engine.test.mjs`: combat, learning attribution, resource limits, recovery and localization checks.

No ad SDK, billing or telemetry is included. Mobile advertising and Steam premium balancing remain separate platform work. The app's vocabulary outcomes are a design hypothesis, not a clinically or academically validated claim.

## Visual assets and limitations

Built-in image generation created the woodland, hero atlas and creature atlas once each, matching the approved Mucha-style board. The approved second board is included for village background crops. Exact image generation prompts and sources are described in `ART.md`.

The hero uses a small prototype pose atlas, procedural bob/jump/crouch and attack motion; it is not a complete hand-authored animation cycle. Village backgrounds are crops of the approved board and need higher-resolution standalone art for production. Monster atlases contain soft colored glows. Music, full 20-village content, boss encounters, native packaging, cloud saves, 50-word exams, quote collections and forgetting events are future work.

## Extending locales and content

Add a locale JSON with the same keys and variables as `en.json`, then register it in the app's locale list. Interface language is independent from the meaning language. Existing word IDs must remain stable across copy changes to preserve saves. Every new question set needs checks for ambiguous meanings and accepted spelling variants.

## Optional browser agent tools

Feature-detected WebMCP tools expose `read_word_runner_progress` and `start_word_runner_journey`. Both use the same live state/actions as the UI. Unsupported browsers continue normally.
