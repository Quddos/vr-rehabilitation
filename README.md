## VR Stroke Rehabilitation Dashboard

Full-stack Next.js 14 (App Router) dashboard backed by Neon Postgres. Unity/Quest headsets upload session JSON via the `/api/sessions` route, and clinicians can review smoothness, timing, and bilateral balance trends inside the dashboard.

### Tech Stack

- Next.js 14 App Router, React Server Components
- Tailwind CSS (v4)
- Neon Postgres via `@neondatabase/serverless`
- Recharts for data visualization
- Type-safe validation with `zod`

### Prerequisites

- Node.js 18+ and npm
- Neon Postgres database with a `DATABASE_URL`

### Environment Variables

Create a `.env.local` file with:

```
DATABASE_URL="your-neon-postgres-connection-string"
```

### Database Migration

Run the SQL in `migrations/001_create_sessions.sql` on your Neon database:

```sql
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  session_id TEXT,
  smoothness FLOAT,
  time_score FLOAT,
  final_score FLOAT,
  duration FLOAT,
  left_smoothness FLOAT,
  right_smoothness FLOAT,
  date TEXT
);
```

### Install & Run

```bash
npm install
npm run seed   # optional: inserts demo sessions
npm run dev
```

Visit `http://localhost:3000/dashboard` after seeding to see charts populated.

### API

- `POST /api/sessions`  
  Accepts JSON payloads shaped as:
  ```json
  {
    "session_id": "UNITY-001",
    "smoothness": 0.82,
    "time_score": 0.71,
    "final_score": 0.76,
    "duration": 315.4,
    "left_smoothness": 0.78,
    "right_smoothness": 0.69,
    "date": "2025-03-24T10:30:00Z"
  }
  ```
- `GET /api/sessions`  
  Returns all stored sessions ordered by newest.

### Dashboard Features

- Summary cards: average smoothness, best score, total sessions
- Session table with smoothness, final score, duration, left/right balance
- Trend charts: smoothness & final score over time, left/right difference heatmap

### Deployment

Deploy on Vercel. Set the `DATABASE_URL` production secret to your Neon connection string. Neon HTTP driver works on Vercel Edge Functions (API route exports `runtime = "edge"`). 
