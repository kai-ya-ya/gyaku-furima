# Copilot Instructions for gyaku-furima

## Project Overview
- This is a React + Firebase project, bootstrapped with Create React App. It includes a frontend (`src/`) and backend Cloud Functions (`functions/`).
- The app centers on formulas, terms, and operations for a product ideation workflow (see `src/res/const.js`).
- Firebase is used for authentication, Firestore, storage, and serverless functions. See `src/firebase.js` for initialization and environment variable usage.

## Key Directories & Files
- `src/components/`: Main React UI components. Use context (`src/contexts/UserContext.js`) and hooks (`src/hooks/useUserData.js`) for user state.
- `src/res/const.js`: Exports core data structures (`operations`, `terms_test`, `formulas_test`) for formulas and terms. Use these for mock/test data and UI logic.
- `functions/lib/`: Node.js Cloud Functions. Exports (`index.js`) include `geminiChat`, `incrementLikeCount`, `decrementLikeCount`. Functions use Firebase Admin SDK and Google GenAI.
- `src/firebase.js`: Centralizes Firebase initialization. Use named exports for `auth`, `db`, `storage`, etc.

## Build & Run
- Frontend: `npm start` (dev), `npm run build` (prod)
- Functions: Deploy via Firebase CLI (`firebase deploy --only functions`). Local emulation: `firebase emulators:start`.
- Environment variables for Firebase config must be set in `.env` (see `src/firebase.js`).

## Patterns & Conventions
- Use absolute imports with aliases (`@components`, `@contexts`, `@res`, `@utils`, `@firebaseApp`).
- Data flow: UI components consume exported constants and Firebase data. Cloud Functions interact with Firestore and external APIs.
- Prefer functional React components and hooks. Context is used for user/session state.
- Cloud Functions use CommonJS (`require`) and export via `exports.<name>`.
- Test data is defined in `src/res/const.js` for rapid prototyping.

## Integration Points
- Firestore rules: see `firestore.rules` for security and access patterns.
- Functions interact with Firestore, Storage, and Google GenAI (see `functions/lib/geminiChat.js`).
- Frontend and backend communicate via Firebase Functions and Firestore.

## Example Usage
- To add a new formula, update `formulas_test` in `src/res/const.js` and ensure UI components consume it.
- To extend backend logic, add new exports in `functions/lib/index.js` and implement in a separate file.
- For new UI features, create components in `src/components/` and use context/hooks for state.

---
If any section is unclear or missing, please specify which workflows, conventions, or integrations need more detail.
