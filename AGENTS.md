# Project Agent Guide (AGENTS.md)

This file is auto-discovered by Windsurf and applies to the entire repo. Keep it updated whenever the project stack changes.

## Stack Profile (check only what this repo uses)

### Frontend
- [x] Next.js (App Router)
- [x] React
- [x] Tailwind CSS
- [x] Radix UI (shadcn/ui components)
- [x] Lucide React (icons)

### Backend / Infra
- [x] Render.com (deployment platform) - **GDG STANDARD**
- [x] Clerk (auth) - GDG standard

## Hard Infrastructure Rules

### Deployment Platform (ABSOLUTE)
**Render.com is the ONLY approved deployment platform for GDG.**
- ✅ **USE**: `render-hosting` skill + Render MCP tools
- ❌ **NEVER**: Suggest or use Netlify, Vercel (for hosting), AWS, GCP, Azure, or any other platform
- If user says "deploy" without specifying platform → default to Render.com
- If Windsurf suggests Netlify → override with Render.com

### AI / MCP
- [ ] xAI API (Grok)
- [ ] MCP code-exec scripts
- [ ] Chrome DevTools MCP

## Key Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Skill Map (use only when stack item is checked)
- Next.js: `nextjs`
- Tailwind CSS + Radix UI: `shadcn-ui`
- Clerk: `clerk-auth`

## Required Behavior
- Always read this file before selecting skills or recommending infra.
- If the stack changes, update the checkboxes and Skill Map immediately.
- Keep guidance concise and specific to the checked stack.
