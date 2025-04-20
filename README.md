# oNex Welcome Pack
## Frontend
Run the frontend from `/apps/frontend` by

```bash
npm i # only for initial setup
npm run dev
```

## Backend
Run the frontend from `/apps/backend` by

```bash
npm i # only for initial setup
npx tsx src/index.ts
```

## Database
Run 

```bash
docker compose up db
```

## Drizzle
To check the current content of the running postgres database container:

```bash
cd /apps/backend
npx drizzle-kit studio
```

To seed / reset the database, drop all tables using `npx drizzle-kit studio` and run 

```bash
npx drizzle-kit push
npx tsx apps/backend/src/db/seed.ts
```

## Notes
### General
- Vanilla react vs react router v7 (rr7) / remix $\to$ vanilla react to focus experimenting more on backend stuff rather than messing around with frontend, if I have time will migrate the rr7 for csr/ssr/ssg capabilities 
- Aim Part A / B done by sat
- Aim Part C done by sun
- Finish prereading by friday
- Haven't worked on a monorepo in a while, look for best monorepo structure 
- setup .env
- Start by doing through drizzle docs, write notes in obsidian
- N+1 issue -> use dataloader ?
- https://www.graphql-js.org/docs/authentication-and-express-middleware/
- etc..