import { Injectable } from '@angular/core';
import { StreamEvent } from '../domain/media';

@Injectable({ providedIn: 'root' })
export class LiveStreamService {
  async *open(signal: AbortSignal): AsyncGenerator<StreamEvent> {
    const response = await fetch('/api/live', { signal });
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
    let pending = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      pending += value;
      const lines = pending.split('\n');
      pending = lines.pop() ?? '';
      for (const line of lines) if (line) yield JSON.parse(line) as StreamEvent;
    }
  }
}
