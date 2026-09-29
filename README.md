# Sant Complex

Sant Complex is a thriving commercial hub on Goraya Road, Jandiala Manjki. It is home to established businesses and quality commercial spaces.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Custom Vanilla CSS (no Tailwind)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 8

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `src/app`: Contains the Next.js App Router pages and API routes.
- `src/app/globals.css`: Contains the global design system tokens and styling.
- `src/lib/db.ts`: Contains the database connection and Prisma 8 ORM setup.
- `prisma/`: Contains the Prisma contract and migrations.

## Admin Panel
The admin panel is located at `/admin` and is protected by a secure cookie-based authentication system.
To access it locally, use the credentials defined in your `.env` file (`ADMIN_USERNAME` and `ADMIN_PASSWORD`), or use the defaults: `admin` / `santcomplex2026`.
