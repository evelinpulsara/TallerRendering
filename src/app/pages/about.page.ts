import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-section">
      <div class="about-hero">
        <h1>Acerca de Borahae Stream 💜</h1>
        <p>
          Una plataforma de streaming de BTS construida en Angular 19 con SSR,
          diseñada para demostrar los <strong>5 patrones de rendering</strong> modernos
          en una sola aplicación desplegable en la nube.
        </p>
      </div>

      <h2 style="font-size:1.2rem; font-weight:800; margin-bottom:16px;">Patrones implementados</h2>
      <div class="patterns-grid">
        <div class="pattern-card">
          <span class="pattern-badge" style="background:rgba(29,185,84,.15);color:#1db954;">SSG</span>
          <h3>Static Site Generation</h3>
          <p>HTML generado en build. Sirve archivos estáticos — velocidad máxima.</p>
          <div class="pattern-route">/ &nbsp;·&nbsp; /about</div>
        </div>
        <div class="pattern-card">
          <span class="pattern-badge" style="background:rgba(61,134,222,.15);color:#3d86de;">ISR</span>
          <h3>Incremental Static Regeneration</h3>
          <p>Caché de 60 s con stale-while-revalidate. Header X-ISR: HIT/MISS.</p>
          <div class="pattern-route">/hits</div>
        </div>
        <div class="pattern-card">
          <span class="pattern-badge" style="background:rgba(230,57,70,.15);color:#e63946;">SSR</span>
          <h3>Server-Side Rendering</h3>
          <p>Render en cada petición con datos frescos del servidor.</p>
          <div class="pattern-route">/profile &nbsp;·&nbsp; /live</div>
        </div>
        <div class="pattern-card">
          <span class="pattern-badge" style="background:rgba(255,153,0,.15);color:#ff9900;">CSR</span>
          <h3>Client-Side Rendering</h3>
          <p>Solo browser. El servidor entrega HTML vacío, Angular toma el control.</p>
          <div class="pattern-route">/studio</div>
        </div>
        <div class="pattern-card">
          <span class="pattern-badge" style="background:rgba(155,89,182,.15);color:#9b59b6;">Streaming</span>
          <h3>Streaming SSR</h3>
          <p>Letras enviadas chunk a chunk via NDJSON con res.write() cada 1.2 s.</p>
          <div class="pattern-route">/api/live &nbsp;·&nbsp; /live</div>
        </div>
      </div>
    </div>
  `
})
export class AboutPage {}

