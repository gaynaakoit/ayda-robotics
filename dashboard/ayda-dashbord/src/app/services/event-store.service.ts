import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SocketEvent } from '../models/socket-event.model';
import { SocketService } from '../services/socket.service';
import { EventCacheService } from './event-cache.service';
import { SnapshotService } from './snapshot.service';
import { UiStateService } from './ui-state.service';


@Injectable({ providedIn: 'root' })
export class EventStoreService {
  private events$ = new BehaviorSubject<SocketEvent[]>([]);
  private cursor$ = new BehaviorSubject<string | null>(null);

  constructor(private socket: SocketService, private ui: UiStateService, private snapshot: SnapshotService, private cache: EventCacheService) {
    this.cache.init().then(async () => {
      const cached = await this.cache.loadAll();
      // mettre l'image placeholder sur le dernier event si nécessaire
      if (cached.length) {
        const lastIndex = cached.length - 1;
        if (!cached[lastIndex].snapshot) {
          cached[lastIndex].snapshot = 'assets/camera.jpeg';
        }
      }
      this.events$.next(cached);
      console.log(this.events$)
    });
  
    this.socket.listen<SocketEvent>('events').subscribe(event => {
      this.events$.next([event, ...this.events$.value]);
      this.cache.save(event);
    });
  }

  /** Flux complet */
  getAll(): Observable<SocketEvent[]> {
    return this.events$.asObservable();
  }

  /** Filtrage par type */
  ofType<T>(type: SocketEvent['type']): Observable<SocketEvent<T>[]> {
    return this.events$.pipe(
      map(events => events.filter(e => e.type === type))
    );
  }

  /** Dernier événement */
  latest<T>(type: SocketEvent['type']): Observable<SocketEvent<T> | undefined> {
    return this.ofType<T>(type).pipe(
      map(events => events[0])
    );
  }

  /** Déplacer le curseur (scrub) */
  setCursor(eventId: string) {
    this.cursor$.next(eventId);
  }
  
  /** État au curseur */
  stateAtCursor<T>(type: SocketEvent['type']) {
    return combineLatest([this.events$, this.cursor$]).pipe(
      map(([events, cursor]) => {
        if (!cursor) return events[0];
          return events.find(e => e.id === cursor);
        })
    );
  }

  latestOrCursor<T>(type: SocketEvent['type']) {
    return combineLatest([
      this.ofType<T>(type),   // SocketEvent<T>[]
      this.cursor$,
      this.ui.mode(),
    ]).pipe(
      map(([events, cursor, mode]) => {
        if (!events.length) return null;
        if (!events.length) return null;

        if (mode === 'LIVE') {
          return events[0];
        }
  
        return events.find(e => e.id === cursor) ?? events[events.length - 1];
      })
    );
  }
  
  clearCursor() {
    this.cursor$.next(null);
  }

  captureSnapshot(eventId: string, img: HTMLImageElement) {
    const events = this.events$.value;
    const event = events.find(e => e.id === eventId);
  
    if (!event || event.snapshot) return;
  
    event.snapshot = this.snapshot.captureFromImage(img);
    this.events$.next([...events]); // 🔴 force refresh
  }

  exportEvent(eventId: string) {
    const event = this.events$.value.find(e => e.id === eventId);
    if (!event) return;
  
    const blob = new Blob(
      [JSON.stringify(event, null, 2)],
      { type: 'application/json' }
    );
  
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `event-${event.id}.json`;
    a.click();
  }  
  

}
