import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { LiveStreamService } from '../services/live-stream.service';

@Component({
  selector: 'app-lyrics-stream',
  template: `
    <div class="bar"><span [style.width.%]="buffered()"></span></div>
    <p>Audio en búfer: {{ buffered() }}%</p>
    @for (line of lines(); track $index) {
      <p class="lyric">{{ line }}</p>
    }
  `
})
export class LyricsStreamComponent implements OnDestroy {
  private readonly stream = inject(LiveStreamService);
  private readonly controller = new AbortController();
  readonly buffered = signal(0);
  readonly lines = signal<string[]>([]);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) this.consume();
  }

  private async consume(): Promise<void> {
    for await (const event of this.stream.open(this.controller.signal)) {
      if (event.type === 'chunk') this.buffered.set(event.buffered);
      else this.lines.update(current => [...current, event.text]);
    }
  }

  ngOnDestroy(): void {
    this.controller.abort();
  }
}
