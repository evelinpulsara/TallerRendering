import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PlayerService } from './services/player.service';
import { Track } from './domain/media';
import { MediaItem } from './domain/media';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">

      <!-- ── Sidebar ─────────────────────────────── -->
      <aside class="sidebar">
        <a class="sidebar-logo" routerLink="/">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          Borahae Stream
        </a>
        <nav class="sidebar-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Inicio
          </a>
          <a routerLink="/hits" routerLinkActive="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>
            Éxitos
          </a>
          <a routerLink="/profile" routerLinkActive="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            Perfil BTS
          </a>
          <a routerLink="/live" routerLinkActive="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.55C10.43 4.14 5.49 5.65 1 9zm2 5l2 2c1.93-1.93 4.59-2.76 7.12-2.38l1.01-2.16C10.47 10.94 6.76 11.69 3 14zm7 3l2.6-5.56L20 14l-2.6 5.56L10 17z"/></svg>
            En Vivo
          </a>
          <a routerLink="/studio" routerLinkActive="active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg>
            Mi Studio
          </a>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/about" routerLinkActive="active">Acerca de la plataforma</a>
        </div>
      </aside>

      <!-- ── Main ──────────────────────────────────── -->
      <main class="main-content">
        <router-outlet />
      </main>

      <!-- ── Mini Player Bar ────────────────────────── -->
      @if (player.current(); as track) {
        <div class="player-bar" [routerLink]="['/studio']">
          <div class="player-track">
            <img [src]="thumb(track)" [alt]="track.title" width="56" height="56" />
            <div>
              <strong>{{ track.title }}</strong>
              <span>BTS</span>
            </div>
            <button class="heart-btn" (click)="$event.stopPropagation()" title="Me gusta">♥</button>
          </div>
          <div class="player-center">
            <div class="player-controls">
              <button class="ctrl-btn" (click)="$event.stopPropagation()" title="Anterior">⏮</button>
              <button class="play-btn" (click)="player.toggle(); $event.stopPropagation()">
                @if (player.playing()) {
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                } @else {
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
                }
              </button>
              <button class="ctrl-btn" (click)="$event.stopPropagation()" title="Siguiente">⏭</button>
            </div>
            <div class="progress-track">
              <span class="time-label">{{ fmt(player.elapsed()) }}</span>
              <div class="progress-bar"><span [style.width.%]="player.progress()"></span></div>
              <span class="time-label">{{ track.formattedDuration }}</span>
            </div>
          </div>
          <div class="player-right">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          </div>
        </div>
      }
    </div>
  `
})
export class App {
  readonly player = inject(PlayerService);

  thumb(item: MediaItem): string {
    const vid = (item as Track).videoId;
    return vid ? `https://img.youtube.com/vi/${vid}/mqdefault.jpg` : '';
  }

  fmt(secs: number): string {
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  }
}

