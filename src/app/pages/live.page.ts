import { Component } from '@angular/core';
import { LyricsStreamComponent } from './lyrics-stream.component';

@Component({
  selector: 'app-live',
  imports: [LyricsStreamComponent],
  template: `
    <div class="live-section">
      <div class="live-header">
        <h1>En Vivo</h1>
        <div class="live-indicator">
          <span class="dot"></span>
          <span>Live</span>
        </div>
        <span class="badge stream">Streaming SSR · NDJSON</span>
      </div>

      <p style="color:var(--text-sub); margin-bottom:24px; font-size:0.9rem;">
        La estructura HTML llega primero desde el servidor. Las letras se transmiten
        chunk a chunk mientras suena la canción.
      </p>

      @defer (hydrate on viewport) {
        <div class="live-card">
          <app-lyrics-stream />
        </div>
      } @placeholder {
        <div class="live-card" style="padding:32px; text-align:center; color:var(--text-muted);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom:12px; opacity:0.4;"><path d="M1 9l2 2c2.88-2.88 6.79-4.08 10.53-3.62l1.19-2.55C10.43 4.14 5.49 5.65 1 9zm2 5l2 2c1.93-1.93 4.59-2.76 7.12-2.38l1.01-2.16C10.47 10.94 6.76 11.69 3 14zm7 3l2.6-5.56L20 14l-2.6 5.56L10 17z"/></svg>
          <p>Conectando con la transmisión…</p>
        </div>
      }
    </div>
  `
})
export class LivePage {}

