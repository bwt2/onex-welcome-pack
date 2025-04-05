# oNex Welcome Pack
## Frontend
Run the frontend from `/apps/frontend` by

```bash
npm i # only for initial setup
npm run dev
```

Alternatively

```bash
docker compose up frontend
```

## Backend
Run the frontend from `/apps/backend` by

```bash
npm i # only for initial setup
npx tsx src/index.ts
```

Alternatively

```bash
docker compose up server
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

This gives 

## Notes
### General
- Vanilla react vs react router v7 (rr7) / remix $\to$ vanilla react to focus experimenting more on backend stuff rather than messing around with frontend, if I have time will migrate the rr7 for csr/ssr/ssg capabilities 
- Aim Part A / B done by sat
- Aim Part C done by sun
- Finish prereading by friday
- Haven't worked on a monorepo in a while, look for best monorepo structure 
- setup .env

### Part A
- Start by doing through drizzle docs, write notes in obsidian
- N+1 issue -> use dataloader ?