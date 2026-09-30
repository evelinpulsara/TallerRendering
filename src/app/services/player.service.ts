import { Injectable, computed, signal } from '@angular/core';
import { MediaItem, Playlist } from '../domain/media';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private timer?: ReturnType<typeof setInterval>;
  readonly playlist = signal(new Playlist('Mi playlist'));
  readonly current = signal<MediaItem | null>(null);
  readonly playing = signal(false);
  readonly elapsed = signal(0);
  readonly progress = computed(() => {
    const item = this.current();
    return item ? (this.elapsed() / item.duration) * 100 : 0;
  });

  play(item: MediaItem): void {
    this.stop();
    this.current.set(item);
    this.elapsed.set(0);
    this.resume();
  }

  toggle(): void {
    this.playing() ? this.stop() : this.resume();
  }

  rename(name: string): void {
    this.replace(name || 'Mi playlist', this.playlist().items);
  }

  addToPlaylist(item: MediaItem): void {
    this.replace(this.playlist().name, [...this.playlist().items, item]);
  }

  removeFromPlaylist(id: string): void {
    this.replace(this.playlist().name, this.playlist().items.filter(item => item.id !== id));
  }

  private replace(name: string, items: readonly MediaItem[]): void {
    const next = new Playlist(name);
    items.forEach(item => next.add(item));
    this.playlist.set(next);
  }

  private resume(): void {
    if (!this.current()) return;
    this.playing.set(true);
    this.timer = setInterval(() => {
      const item = this.current();
      if (item && this.elapsed() >= item.duration) return this.stop();
      this.elapsed.update(value => value + 1);
    }, 1000);
  }

  private stop(): void {
    clearInterval(this.timer);
    this.playing.set(false);
  }
}
