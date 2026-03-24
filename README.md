# JEC_CSE_26_FAREWELL

Premium farewell invitation, registration, payment confirmation, and suggestion platform for JEC CSE seniors.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Neon PostgreSQL
- Vercel Blob with base64 fallback

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env.local
```

3. Add your Neon connection string to `DATABASE_URL`.

4. Optional: add `BLOB_READ_WRITE_TOKEN` to store screenshots in Vercel Blob. If omitted, the app stores the screenshot as a base64 data URL in the database fallback.

5. Create the database tables using [db/schema.sql](/media/the-aditya-10/data/Aditya/CODING/Major Projects/JEC-CSE-26-FAREWELL/db/schema.sql).

6. Run the app:

```bash
npm run dev
```

## Flow

- `/` premium landing page
- `/register` user registration
- `/payment` payment confirmation and screenshot upload
- `/extras` anonymous suggestion + companion booking
- `/success` closing confirmation

## Notes

- The countdown automatically targets the next upcoming April 2.
- Companion booking opens in a new tab so the primary registration flow stays intact.
- All critical submissions are validated server-side with Zod.
