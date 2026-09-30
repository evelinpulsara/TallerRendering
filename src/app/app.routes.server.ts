import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'hits', renderMode: RenderMode.Server },
  { path: 'profile', renderMode: RenderMode.Server },
  { path: 'live', renderMode: RenderMode.Server },
  { path: 'studio', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server }
];
