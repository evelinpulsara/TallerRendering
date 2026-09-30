export interface TrackDto {
  id: string;
  title: string;
  album: string;
  durationSeconds: number;
  streams: number;
  videoId: string;
}

export abstract class MediaItem {
  constructor(
    readonly id: string,
    readonly title: string,
    protected readonly durationSeconds: number
  ) {}

  abstract get label(): string;

  get duration(): number {
    return this.durationSeconds;
  }

  get formattedDuration(): string {
    const minutes = Math.floor(this.durationSeconds / 60);
    const seconds = String(this.durationSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}

export class Track extends MediaItem {
  constructor(
    id: string,
    title: string,
    durationSeconds: number,
    readonly album: string,
    readonly streams: number,
    readonly videoId: string = ''
  ) {
    super(id, title, durationSeconds);
  }

  get label(): string {
    return `Canción · ${this.album}`;
  }

  static fromDto(dto: TrackDto): Track {
    return new Track(dto.id, dto.title, dto.durationSeconds, dto.album, dto.streams, dto.videoId);
  }
}

export class PodcastEpisode extends MediaItem {
  constructor(id: string, title: string, durationSeconds: number, readonly host: string) {
    super(id, title, durationSeconds);
  }

  get label(): string {
    return `Podcast · ${this.host}`;
  }
}

export class Artist {
  constructor(readonly name: string, readonly members: readonly string[], private readonly listeners: number) {}

  get monthlyListeners(): number {
    return this.listeners;
  }

  static fromDto(dto: { name: string; members: string[]; monthlyListeners: number }): Artist {
    return new Artist(dto.name, dto.members, dto.monthlyListeners);
  }
}

export class Playlist {
  private readonly entries: MediaItem[] = [];

  constructor(readonly name: string) {}

  get items(): readonly MediaItem[] {
    return [...this.entries];
  }

  get totalSeconds(): number {
    return this.entries.reduce((sum, item) => sum + item.duration, 0);
  }

  add(item: MediaItem): boolean {
    if (this.entries.some(entry => entry.id === item.id)) return false;
    this.entries.push(item);
    return true;
  }

  remove(id: string): void {
    const index = this.entries.findIndex(entry => entry.id === id);
    if (index >= 0) this.entries.splice(index, 1);
  }
}

export type StreamEvent =
  | { type: 'chunk'; buffered: number }
  | { type: 'lyric'; order: number; text: string };
