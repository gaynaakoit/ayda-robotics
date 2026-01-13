import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SocketEvent } from '../models/socket-event.model';
import { SocketService } from '../services/socket.service';


@Injectable({ providedIn: 'root' })
export class EventStoreService {
  private events$ = new BehaviorSubject<SocketEvent[]>([]);

  constructor(private socket: SocketService) {
    this.socket.listen<SocketEvent>('events').subscribe(event => {
      this.events$.next([event, ...this.events$.value]);
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
}
