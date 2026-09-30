# 🎵 Borahae Stream — Taller Patrones de Rendering

Plataforma de streaming de BTS construida con **Angular 19 + SSR** que demuestra los **5 patrones de rendering** modernos.

## 🚀 Patrones implementados

| Patrón | Ruta | Descripción |
|--------|------|-------------|
| **SSG** | `/`, `/about` | Pre-renderizado en build |
| **ISR** | `/hits` | Caché 60 s + stale-while-revalidate |
| **SSR** | `/profile`, `/live` | Render por petición en servidor |
| **CSR** | `/studio` | Solo browser, YouTube embed real |
| **Streaming SSR** | `/live` + `/api/live` | NDJSON chunks cada 1.2 s |

---

## 💻 Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4200
```

---

## ☁️ Despliegue en AWS

### Build de producción

```bash
npm install
npm run build
# Genera dist/bts-stream/server/server.mjs
```

### Variables de entorno en AWS

| Variable | Valor |
|----------|-------|
| `PORT` | `8080` (Elastic Beanstalk) |
| `NODE_ENV` | `production` |

### `npm start` en producción

```bash
node dist/bts-stream/server/server.mjs
```

### Elastic Beanstalk

```bash
pip install awsebcli
eb init   # Plataforma: Node.js 20
eb create bts-stream-prod --envvars PORT=8080,NODE_ENV=production
eb deploy
```

### EC2 con PM2

```bash
git clone https://github.com/evelinpulsara/TallerRendering.git
cd TallerRendering
npm install && npm run build
npm install -g pm2
PORT=8080 pm2 start dist/bts-stream/server/server.mjs --name borahae
pm2 save && pm2 startup
```

**Node requerido:** >= 20.0.0

---

## 🏗️ Arquitectura

```
src/
├── server.ts                → Express + SSR engine + APIs + ISR cache
├── app/
│   ├── app.ts               → Shell: sidebar + mini-player
│   ├── app.routes.server.ts → RenderMode por ruta
│   └── pages/
│       ├── home.page.ts     → SSG
│       ├── about.page.ts    → SSG
│       ├── hits.page.ts     → ISR/SSR
│       ├── profile.page.ts  → SSR
│       ├── live.page.ts     → Streaming SSR
│       └── studio.page.ts   → CSR + YouTube
```

## 🔌 APIs REST

| Endpoint | Patrón | Descripción |
|----------|--------|-------------|
| `GET /api/hits` | — | 4 canciones BTS con videoId YouTube |
| `GET /api/artist` | — | Nombre, miembros y oyentes mensuales |
| `GET /api/live` | Streaming | NDJSON: letras en 4 chunks cada 1.2 s |
| `GET /hits` | ISR | HTML cacheado 60 s (header X-ISR: HIT/MISS) |
