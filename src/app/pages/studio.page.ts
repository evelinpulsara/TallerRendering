import { Component, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '../services/catalog.service';
import { PlayerService } from '../services/player.service';
import { Track } from '../domain/media';

@Component({
  selector: 'app-studio',
  template: `
    <div class="studio-layout">

      <!-- ── Left: YouTube player + catalog ──────── -->
      <div class="studio-main">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
          <h1 style="font-size:1.6rem; font-weight:900;">Mi Studio</h1>
          <span class="badge csr">CSR · Solo Browser</span>
        </div>

        <!-- YouTube iframe -->
        @if (ytUrl(); as url) {
          <div class="yt-wrapper">
            <iframe
              [src]="url"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
        } @else {
          <div class="no-track-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            <p>Selecciona una canción del catálogo para reproducirla</p>
          </div>
        }

        <!-- Catalog -->
        <div>
          <div class="studio-section-title">Catálogo</div>
          <ul class="catalog-list">
            @for (track of catalog(); track track.id) {
              <li class="catalog-item" [class.active]="isPlaying(track)" (click)="play(track)">
                <img [src]="thumb(track)" [alt]="track.title" />
                <div class="item-info">
                  <div class="item-title">{{ track.title }}</div>
                  <div class="item-sub">BTS · {{ track.album }}</div>
                </div>
                <span class="item-dur">{{ track.formattedDuration }}</span>
                <button class="btn xs ghost" (click)="addToList(track); $event.stopPropagation()">+ Lista</button>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- ── Right: Playlist ──────────────────────── -->
      <div class="studio-side">
        <div>
          <div class="studio-section-title">{{ player.playlist().name }}</div>
          <input
            class="playlist-name-input"
            [value]="player.playlist().name"
            (change)="player.rename($any($event.target).value)"
            placeholder="Nombre de la playlist"
          />
          <ul class="playlist-list">
            @for (item of player.playlist().items; track item.id) {
              <li class="playlist-item">
                <div class="item-info">
                  <div class="item-title">{{ item.title }}</div>
                  <div class="item-sub">BTS</div>
                </div>
                <button class="remove-btn" (click)="player.removeFromPlaylist(item.id)" title="Quitar">✕</button>
              </li>
            } @empty {
              <li class="playlist-empty">Agrega canciones desde el catálogo →</li>
            }
          </ul>
        </div>
      </div>

    </div>
  `
})
export class StudioPage {
  readonly player = inject(PlayerService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly catalog = toSignal(inject(CatalogService).hits(), { initialValue: [] as Track[] });

  readonly ytUrl = computed((): SafeResourceUrl | null => {
    const track = this.player.current() as Track | null;
    if (!track?.videoId) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${track.videoId}?autoplay=1&rel=0&modestbranding=1`
    );
  });

  thumb(track: Track): string {
    return track.videoId ? `https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg` : '';
  }

  isPlaying(track: Track): boolean {
    return this.player.current()?.id === track.id;
  }

  play(track: Track): void {
    this.player.play(track);
  }

  addToList(track: Track): void {
    this.player.addToPlaylist(track);
  }
}



