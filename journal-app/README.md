This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# 📘 Mental Health Journal App – Implementation Plan

This document outlines a structured approach to implement all features of the Journal App project, in line with the course proposal.

---

## 📐 Phase 0: Project Setup & Planning (Day 1–2)

### ✅ Tasks:
- [ ] Create GitHub repo with branches: `main`, `frontend`, `backend`, `dev`
- [ ] Scaffold app with `create-next-app` (App Router + TypeScript)
- [ ] Install dependencies:
  - `tailwindcss`, `shadcn/ui`, `@prisma/client`, `auth.js` or `next-auth`
  - `zod`, `react-hook-form`, `openai`, `recharts` or `chart.js`
- [ ] Configure Tailwind, shadcn, fonts
- [ ] Set up ESLint, Prettier, Husky (optional)
- [ ] Project folder structure:
  ```
  /app
    /dashboard
    /journal
    /auth
    /api
  /components
  /lib
  /utils
  /prisma
  ```

----------------------------------------------------

## 🛠️ Phase 1: Core Infrastructure (Week 1)

### 🧩 1. Authentication System
- [ ] Set up Auth.js (BetterAuth) with JWT
- [ ] Add Email/Password signup + login
- [ ] Middleware to protect routes
- [ ] Store hashed passwords (`bcrypt`)

### 🧩 2. Prisma + PostgreSQL
- [ ] Define `schema.prisma`
- [ ] Setup DB with `npx prisma db push`
- [ ] Create reusable DB utility functions

### 🧩 3. Dashboard Scaffold
- [ ] Create sidebar + dashboard layout
- [ ] Scaffold `/dashboard` route

---

## 📘 Phase 2: Journaling Functionality (Week 2)

### 🧩 4. Journal Entry
- [ ] Add rich-text editor (React Quill/TipTap)
- [ ] POST API for saving journals
- [ ] Store: title, content, createdAt, author

### 🧩 5. Journal History
- [ ] Filter/search by date, mood, favorite
- [ ] Create API filters for journal retrieval

### 🧩 6. Mood Analytics
- [ ] Use `chart.js`/`recharts` for data visualizations
- [ ] Display mood patterns over time

---

## 🤖 Phase 3: AI + Advanced Features (Week 3–4)

### 🧩 7. Sentiment Analysis (OpenAI)
- [ ] On journal submit, send content to OpenAI
- [ ] Store emotion score in DB
- [ ] Display mood result in history/dashboard

### 🧩 8. File Uploads
- [ ] Integrate AWS S3 or Firebase for image uploads
- [ ] Add file picker to journal form
- [ ] Store image URLs in DB

### 🧩 9. Google Calendar Reminders (Optional)
- [ ] Set up Google API integration
- [ ] Schedule journaling reminders

---

## 🔄 Phase 4: Real-Time Updates (Stretch Goal)

### 🧩 10. WebSockets / Pusher
- [ ] Implement real-time updates on dashboard
- [ ] Optional: enable shared journal commenting

---

## 🔐 Phase 5: Final Polish & Deploy (Week 4)

### 🧩 11. Testing & Validation
- [ ] Add form validation with `zod`
- [ ] Add error handling + toast notifications
- [ ] Add integration tests (jest or cypress)

### 🧩 12. Final Touches
- [ ] Improve accessibility + keyboard nav
- [ ] Add 404 and protected route UI

### 🧩 13. Deploy to Vercel
- [ ] Configure `.env` for OpenAI, DB URL, Auth secret
- [ ] Test production build

---

## 🧩 Optional Bonus Features
- AI prompts based on previous journals
- Mental health tips (static or AI-generated)
- Role-based journal sharing

---          

## 📊 Project Tracker Table

| Feature                         | Priority | Status   |
|---------------------------------|----------|----------|
| Auth System (BetterAuth)        | High     | 🟡       |
| DB Schema + Prisma              | High     | 🟢       |
| Journal Entry Form + Submit     | High     | 🟡       |
| OpenAI Sentiment Integration    | High     | 🔴       |
| Journal History + Filters       | Med      | 🔴       |
| Dashboard Visualization         | Med      | 🔴       |
| Image Uploads                   | Med      | 🔴       |
| Google Calendar Integration     | Low      | 🔴       |
| Real-Time WebSocket             | Stretch  | 🔴       |

---

*Legend: 🟢 = Complete | 🟡 = In Progress | 🔴 = Not Started*


