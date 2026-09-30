import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-profile',
  template: `
    @if (artist(); as a) {
      <div class="artist-hero">
        <img
          src="https://img.youtube.com/vi/XsX3ATc3FbA/maxresdefault.jpg"
          alt="BTS — Boy With Luv"
        />
        <div class="artist-info">
          <div class="verified">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            Artista verificado
          </div>
          <h1>{{ a.name }}</h1>
        </div>
      </div>

      <div class="artist-body">
        <span class="badge ssr" style="margin-bottom: 20px; display:inline-flex;">SSR · Datos frescos en cada petición</span>

        <div class="stat-row">
          <span class="stat-num">{{ a.monthlyListeners.toLocaleString('es-CO') }}</span>
          <span class="stat-label">oyentes mensuales</span>
        </div>

        <p class="members-label">Integrantes</p>
        <ul class="chips">
          @for (member of a.members; track member) {
            <li>{{ member }}</li>
          }
        </ul>
      </div>
    } @else {
      <div style="padding:32px; color: var(--text-muted);">Cargando perfil…</div>
    }
  `
})
export class ProfilePage {
  readonly artist = toSignal(inject(CatalogService).artist());
}



