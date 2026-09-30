import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express, { Request, Response } from 'express';
import { join } from 'node:path';

interface CachedPage {
  html: string;
  storedAt: number;
  refreshing: boolean;
}

class IncrementalPageCache {
  private readonly pages = new Map<string, CachedPage>();

  constructor(private readonly ttlMs: number, private readonly render: (req: Request) => Promise<string | null>) {}

  async serve(req: Request, res: Response): Promise<boolean> {
    const key = req.originalUrl;
    const cached = this.pages.get(key);
    if (cached) {
      if (Date.now() - cached.storedAt > this.ttlMs && !cached.refreshing) this.revalidate(req, key, cached);
      res.setHeader('X-ISR', 'HIT').type('html').send(cached.html);
      return true;
    }
    const html = await this.render(req);
    if (!html) return false;
    this.pages.set(key, { html, storedAt: Date.now(), refreshing: false });
    res.setHeader('X-ISR', 'MISS').type('html').send(html);
    return true;
  }

  private revalidate(req: Request, key: string, cached: CachedPage): void {
    cached.refreshing = true;
    this.render(req)
      .then(html => html && this.pages.set(key, { html, storedAt: Date.now(), refreshing: false }))
      .catch(() => (cached.refreshing = false));
  }
}

const hits = [
  { id: 't1', title: 'Dynamite', album: 'BE', durationSeconds: 199, streams: 2100000000, videoId: 'gdZLi9oWNZg' },
  { id: 't2', title: 'Butter', album: 'Butter', durationSeconds: 164, streams: 1700000000, videoId: 'WMweEpGlu_U' },
  { id: 't3', title: 'Spring Day', album: 'You Never Walk Alone', durationSeconds: 274, streams: 900000000, videoId: 'xEeFrLSkMm8' },
  { id: 't4', title: 'Boy With Luv', album: 'Map of the Soul: Persona', durationSeconds: 229, streams: 1300000000, videoId: 'XsX3ATc3FbA' }
];

const lyrics = ['Shining through the city', 'With a little funk and soul', 'So I am gonna light it up', 'Like dynamite'];
const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const browserDist = join(import.meta.dirname, '../browser');
const engine = new AngularNodeAppEngine();
const app = express();

app.get('/api/hits', (_req, res) => void res.json(hits));

app.get('/api/artist', (_req, res) => {
  res.json({
    name: 'BTS',
    members: ['RM', 'Jin', 'SUGA', 'j-hope', 'Jimin', 'V', 'Jung Kook'],
    monthlyListeners: 60000000 + Math.floor(Math.random() * 500000)
  });
});

app.get('/api/live', async (_req, res) => {
  res.type('application/x-ndjson');
  for (let buffered = 25; buffered <= 100; buffered += 25) {
    res.write(JSON.stringify({ type: 'chunk', buffered }) + '\n');
    const line = lyrics[buffered / 25 - 1];
    res.write(JSON.stringify({ type: 'lyric', order: buffered / 25, text: line }) + '\n');
    await pause(1200);
  }
  res.end();
});

const pageCache = new IncrementalPageCache(60000, async req => {
  const response = await engine.handle(req);
  return response ? response.text() : null;
});

app.get('/hits', async (req, res, next) => {
  try {
    if (!(await pageCache.serve(req, res))) next();
  } catch (error) {
    next(error);
  }
});

app.use(express.static(browserDist, { maxAge: '1y', index: false, redirect: false }));

app.use((req, res, next) => {
  engine
    .handle(req)
    .then(response => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => console.log(`http://localhost:${port}`));
}

export const reqHandler = createNodeRequestHandler(app);
