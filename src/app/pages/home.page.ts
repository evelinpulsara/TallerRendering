import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="hero">
      <div class="hero-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        Plataforma de Streaming · BTS
      </div>
      <h1>La música de<br /><span>BTS</span>, en un solo lugar</h1>
      <p>Escucha sus éxitos, sigue las letras en tiempo real y crea tus playlists. Borahae 💜</p>
      <div class="hero-cta">
        <a routerLink="/hits" class="btn primary">Escuchar ahora</a>
        <a routerLink="/live" class="btn secondary">Ver en vivo</a>
      </div>
    </div>

    <div class="section-header">
      <h2>Éxitos más escuchados</h2>
      <a routerLink="/hits">Ver todos</a>
    </div>
    <div class="cards-grid">
      <a routerLink="/hits" class="card">
        <img src="https://img.youtube.com/vi/gdZLi9oWNZg/mqdefault.jpg" alt="Dynamite" />
        <h3>Dynamite</h3>
        <p>2.1B reproducciones</p>
      </a>
      <a routerLink="/hits" class="card">
        <img src="https://img.youtube.com/vi/WMweEpGlu_U/mqdefault.jpg" alt="Butter" />
        <h3>Butter</h3>
        <p>1.7B reproducciones</p>
      </a>
      <a routerLink="/hits" class="card">
        <img src="https://img.youtube.com/vi/XsX3ATc3FbA/mqdefault.jpg" alt="Boy With Luv" />
        <h3>Boy With Luv</h3>
        <p>1.3B reproducciones</p>
      </a>
      <a routerLink="/hits" class="card">
        <img src="https://img.youtube.com/vi/xEeFrLSkMm8/mqdefault.jpg" alt="Spring Day" />
        <h3>Spring Day</h3>
        <p>900M reproducciones</p>
      </a>
    </div>

    <div class="section-header">
      <h2>Explorar la plataforma</h2>
    </div>
    <div class="cards-grid">
      <a routerLink="/profile" class="card">
        <img src="https://img.youtube.com/vi/XsX3ATc3FbA/mqdefault.jpg" alt="Perfil BTS" />
        <h3>Perfil de BTS</h3>
        <p>Estadísticas en tiempo real · SSR</p>
      </a>
      <a routerLink="/live" class="card">
        <img src="https://img.youtube.com/vi/gdZLi9oWNZg/mqdefault.jpg" alt="En vivo" />
        <h3>En Vivo</h3>
        <p>Letras en streaming · NDJSON</p>
      </a>
      <a routerLink="/studio" class="card">
        <img src="https://img.youtube.com/vi/WMweEpGlu_U/mqdefault.jpg" alt="Studio" />
        <h3>Mi Studio</h3>
        <p>Reproductor real · CSR</p>
      </a>
      <a routerLink="/about" class="card">
        <img src="https://img.youtube.com/vi/xEeFrLSkMm8/mqdefault.jpg" alt="Acerca de" />
        <h3>Acerca de</h3>
        <p>5 patrones de rendering</p>
      </a>
    </div>
  `
})
export class HomePage {}

