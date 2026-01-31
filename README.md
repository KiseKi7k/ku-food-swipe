# KU Food Swipe
Swipe through foods around Kasetsart University to quickly decide what to eat.
KU Food Swipe helps you discover nearby food options using a swipe-based interface and AI-powered recommendations.

**This project is for KU AI Pioneer by กินอะไรดี Team**

### Features
- Swipe through food options around Kasetsart University

- Swipe right to Like

- Swipe left to Dislike

- Swipe up to Eat this

- AI-powered food recommendation system

- Fast and simple decision-making experience

## Built with
- Bun
- Nextjs
- BetterAuth
- Prisma
- Postgresql

## Development
### .env
```bash
// Postgresql
DATABASE_URL=

BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=<Base URL of your app>

// Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RECOMMEND_SERVICE_URL=
```
**For AI Recommend service please checkout this [repository](https://github.com/zawedut/ai-food-service) (by zawedut)**
```bash
bun install
bunx prisma generate
bun dev
```

## Deployment
### Build
```bash
bunx prisma generate && bun run build
```
### Install
```bash
bun install
```
