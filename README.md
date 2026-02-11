# NeuroBuddy Frontend (Next.js)

Simple web frontend that displays:
- Hello World page
- Message fetched from backend endpoint `/api/hello/`
- Database status from backend response

## Tech stack

- Next.js (App Router)
- React
- Vitest for unit tests
- GitHub Actions for CI/CD
- Railway for staging + production deployment

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Set backend URL in `.env.local`:

```env
BACKEND_API_BASE_URL=http://localhost:8000
```

4. Run development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Branch and environment mapping

- `staging` -> Railway Staging
- `main` / `master` -> Railway Production

## Required GitHub secrets

### Staging

- `RAILWAY_STAGING_TOKEN`
- `RAILWAY_STAGING_SERVICE`
- `RAILWAY_STAGING_URL`

### Production

- `RAILWAY_PRODUCTION_TOKEN`
- `RAILWAY_PRODUCTION_SERVICE`
- `RAILWAY_PRODUCTION_URL`

## CI/CD workflows

- `.github/workflows/ci.yml`
  - Runs lint, tests (with coverage), and build on push/PR.
- `.github/workflows/staging.yml`
  - Auto deploys to Railway when pushing to `staging`.
- `.github/workflows/production.yml`
  - Auto deploys to Railway when pushing to `main` or `master`.

## Useful scripts

- `npm run dev`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run start`
