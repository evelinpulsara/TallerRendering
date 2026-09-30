import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '../services/catalog.service';
import { PlayerService } from '../services/player.service';
import { Track } from '../domain/media';

@Component({
  selector: 'app-hits',
  template: `
    <div class="content-panel">
      <div class="page-header">
        <h1>Éxitos de BTS</h1>
        <span class="badge isr">ISR · Caché 60 s</span>
      </div>

      <table class="track-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-thumb"></th>
            <th>Título</th>
            <th>Álbum</th>
            <th>Reproducciones</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          @for (track of hits(); track track.id; let i = $index) {
            <tr (click)="onPlay(track)">
              <td class="col-num">
                <span class="track-num">{{ i + 1 }}</span>
                <span class="play-icon">▶</span>
              </td>
              <td class="col-thumb">
                <img class="track-thumb" [src]="thumb(track)" [alt]="track.title" />
              </td>
              <td>
                <div class="track-title">{{ track.title }}</div>
                <div class="track-sub">BTS</div>
              </td>
              <td class="track-data">{{ track.album }}</td>
              <td class="track-data">{{ track.streams.toLocaleString('es-CO') }}</td>
              <td class="track-data">{{ track.formattedDuration }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class HitsPage {
  private readonly router = inject(Router);
  readonly player = inject(PlayerService);
  readonly hits = toSignal(inject(CatalogService).hits(), { initialValue: [] as Track[] });

  thumb(track: Track): string {
    return track.videoId
      ? `https://img.youtube.com/vi/${track.videoId}/mqdefault.jpg`
      : '';
  }

  onPlay(track: Track): void {
    this.player.play(track);
    this.router.navigate(['/studio']);
  }
}


