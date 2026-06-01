# Obelisk — BIM Consulting

A React + Vite marketing site for Obelisk BIM Consulting (modeled on
obelisk-consulting.in) with a built-in blog. The blog runs **fully on Vercel**:
Serverless Functions for the API, **Vercel Postgres** for data, and
**Vercel Blob** for cover-image storage.

## Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Framer Motion, React Router 7
- **API:** Vercel Serverless Functions (`/api`)
- **Database:** Vercel Postgres (`@vercel/postgres`)
- **Image storage:** Vercel Blob (`@vercel/blob`)

## Routes

| Route          | Description                                       |
| -------------- | ------------------------------------------------- |
| `/`            | Homepage (hero, stats, services, testimonials, contact) |
| `/blog`        | Blog listing                                      |
| `/blog/:slug`  | Single article                                    |
| `/admin`       | Upload / manage blogs (title, cover image, content) |

### API endpoints

| Method | Endpoint            | Purpose                              |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/api/blogs`        | List posts (newest first)            |
| POST   | `/api/blogs`        | Create (JSON; `cover` is a Blob URL) |
| GET    | `/api/blogs/:slug`  | Single post                          |
| PUT    | `/api/blogs/:id`    | Update                               |
| DELETE | `/api/blogs/:id`    | Delete                               |
| POST   | `/api/upload`       | Issues a Vercel Blob upload token    |

The Postgres table is created automatically on first request — no migration step.

---

## Deploy to Vercel

### 1. Push the repo to GitHub/GitLab and import it in Vercel
Vercel auto-detects the Vite framework preset (build: `npm run build`, output: `dist`)
and the functions in `/api`. No extra build config needed.

### 2. Add a Postgres database
In your Vercel project → **Storage → Create Database → Postgres** (Neon).
Connect it to the project. This auto-sets `POSTGRES_URL` (and friends) as env vars.

### 3. Add Blob storage
**Storage → Create → Blob**, connect it to the project. This auto-sets
`BLOB_READ_WRITE_TOKEN`.

### 4. Deploy
Click **Deploy** (or push to your main branch). That's it — `/admin` lets you
publish posts, images land in Blob, and posts persist in Postgres.

> ⚠️ `/admin` is **unauthenticated**. Add a login/password gate before relying on
> it in production, or anyone could publish/delete posts.

---

## Local development

The blog API needs Vercel's environment (Postgres + Blob), so run it through the
Vercel CLI rather than plain Vite:

```bash
npm i -g vercel            # once
vercel link                # connect this folder to your Vercel project
vercel env pull .env.local # pull POSTGRES_URL + BLOB_READ_WRITE_TOKEN locally
npm run dev:full           # = `vercel dev`  -> http://localhost:3000
```

`vercel dev` serves the Vite app **and** the `/api` functions together, using the
same Postgres/Blob as the cloud (so be mindful you're writing to real data).

UI-only work (no blog API) can still use:

```bash
npm run dev                # plain Vite -> http://localhost:5173 (/api calls will 404)
```

## Notes

- Cover images are limited to ~4 MB (they're POSTed to `/api/upload` and streamed
  to Blob, staying under Vercel's 4.5 MB serverless request limit).
- Want a separate dev database? Create a second Postgres in Vercel and pull its env
  into `.env.local`, or point `POSTGRES_URL` at any Postgres (e.g. local/Neon branch).
