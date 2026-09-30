import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page').then(m => m.HomePage) },
  { path: 'about', loadComponent: () => import('./pages/about.page').then(m => m.AboutPage) },
  { path: 'hits', loadComponent: () => import('./pages/hits.page').then(m => m.HitsPage) },
  { path: 'profile', loadComponent: () => import('./pages/profile.page').then(m => m.ProfilePage) },
  { path: 'studio', loadComponent: () => import('./pages/studio.page').then(m => m.StudioPage) },
  { path: 'live', loadComponent: () => import('./pages/live.page').then(m => m.LivePage) },
  { path: '**', redirectTo: '' }
];
