import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Artist, Track, TrackDto } from '../domain/media';
import { resolveApiBase } from './api';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly http = inject(HttpClient);
  private readonly base = resolveApiBase();

  hits() {
    return this.http.get<TrackDto[]>(`${this.base}/api/hits`).pipe(map(list => list.map(Track.fromDto)));
  }

  artist() {
    return this.http
      .get<{ name: string; members: string[]; monthlyListeners: number }>(`${this.base}/api/artist`)
      .pipe(map(Artist.fromDto));
  }
}
