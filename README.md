# Samay Rathod — Portfolio

A compact, responsive portfolio for Samay Rathod, built with Next.js, TypeScript, Tailwind CSS, and the Vercel AI SDK.

## Features

- Work and education timeline
- Four featured projects with expandable viewing
- Light and dark themes
- Fixed-size portfolio chatbot powered by `gpt-4o-mini`
- Context-aware prompt pills and an in-chat contact form
- Graceful demo responses and `mailto:` fallback when environment variables are not configured

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site works without secrets in demo mode. To enable live AI responses and email delivery, fill the values documented in `.env.example`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
