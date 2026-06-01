import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// For full-stack local dev (frontend + /api functions + Postgres/Blob), run
// `vercel dev` — it serves Vite and routes /api to the serverless functions.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
