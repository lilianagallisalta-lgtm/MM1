We're using https://github.com/kamilkisiela/apollo-angular-services to generate
code in to use our GraphQL backend.

Some important things:

1) All graphql query's (querys and mutations) go to src/app/**

2) Graphql server config is in src/app/graphql.module.ts

3) When you add a query, in order to generate it's code, you need to run
$ npm run graphql. The result will be in src/app/generated

## Running locally

This Angular 7 app requires Node 10 for its locked Sass build dependency. To
run it locally without the unavailable production API or a database:

1. In a terminal from `backend-master`, run `node local-dev-server.js`.
2. In a second terminal from `app-master`, run `nvm use 10.24.1`, `npm ci`,
   and `npm start`.
3. Open `http://localhost:4200`.

The local demo API runs at `http://localhost:8000/graphql` and persists demo
children as JSON in `backend-master/storage/app/local-dev-data.json`. It does
not connect to MySQL and is not a replacement for the Laravel backend. Local
development also skips external font, payment, and push-notification SDKs;
those integrations require the production build and internet access.

On a child's plan page, the development-only **Prueba la App** button grants
free local access without a payment or premium code. The local API loads the
original question and result seed data from `backend-master/app/Modules`.
Answers and progress are saved in the local JSON data file, and completed
stages show their seeded indicators, suggestions, and games. The bundled data
contains 612 questions and 816 result records. It covers ages 1–8: the 1–2,
2–3, and 3–4 year ranges have three stages; the 4–5, 5–6, 6–7, and 7–8 year
ranges have two. This remains a local JSON-backed API and does not start or
replace the Laravel/MySQL production backend.

The production frontend uses the same-origin `/graphql` route, so it connects
to the Laravel host serving the app instead of a hard-coded production domain.
