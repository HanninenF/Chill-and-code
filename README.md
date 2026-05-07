# Chilld and Code

Mobilapp/spelapp byggd med React Native, Expo och TypeScript.

## Teknik

- React Native
- Expo
- TypeScript
- ESLint
- Prettier
- GitHub Actions för PR-checks

## Kom igang

Installera beroenden:

```bash
npm install
```

Starta Expo lokalt:

```bash
npx expo start
```

Alternativt via npm-scripts:

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Kvalitetskontroller

```bash
npm run typecheck
npm run lint
npm run format:check
```

Formatera kod:

```bash
npm run format
```

## Projektstruktur

```text
src/
  assets/
  components/
  hooks/
  screens/
  types/
  utils/
```

Rotmappen `assets/` innehaller Expo-standardikoner och splash-resurser. Appspecifika spelresurser kan laggas i `src/assets/`.

## Versionshantering

Projektet anvander trunk-based development:

- `main` ar enda langlivade branchen.
- Utveckling sker i kortlivade `feature/*` branches.
- Direktpush till `main` ska vara avstangt via GitHub branch protection.
- All kod ska mergeas via Pull Request.
- Minst en godkand Pull Request kravs innan merge.
- Pull Requests ska squash-mergeas.
- CI-checken `Quality checks` bor kravs innan merge.

Rekommenderad branchregel for `main` i GitHub:

- Require a pull request before merging.
- Require approvals: 1.
- Dismiss stale pull request approvals when new commits are pushed.
- Require status checks to pass before merging: `Quality checks`.
- Block direct pushes to `main`.
- Allow only squash merging under repository merge settings.
