import { Injectable, NgZone } from '@angular/core';
import { SocketEvent } from '../models/socket-event.model';
import { UiStateService } from './ui-state.service';
import { EventStoreService } from './event-store.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MiniPlayerService {
  private timer: any;
  private frameTimer: any;

  frame$ = new BehaviorSubject<any[] | null>(null);
  mode: 'DISCRETE' | 'INTERPOLATED' = 'DISCRETE';

  constructor(
    private ui: UiStateService,
    private eventStore: EventStoreService,
    private zone: NgZone
  ) {}

  play(
    events: SocketEvent[],
    fps = 2,
    onFrame?: (event: SocketEvent, index: number) => void
  ) {
    if (events.length < 1) return;

    this.stop();
    this.ui.setHistory();

    let index = events.length - 1;

    // 🔁 MODE DISCRET (ton comportement actuel)
    if (this.mode === 'DISCRETE') {
      this.timer = setInterval(() => {
        this.zone.run(() => {
          const e = events[index];
          if (!e) return this.stop();

          this.eventStore.setCursor(e.id);
          onFrame?.(e, index);

          index--;
          if (index < 0) this.stop();
        });
      }, 1000 / fps);
    }

    // 🎞 MODE INTERPOLÉ
    if (this.mode === 'INTERPOLATED' && events.length > 1) {
      let a = events[index];
      let b = events[index - 1];
      let t = 0;

      this.frameTimer = setInterval(() => {
        this.zone.run(() => {
          if (!a || !b) return this.stop();

          t += 0.05; // vitesse interpolation

          if (t >= 1) {
            index--;
            if (index <= 0) return this.stop();

            a = events[index];
            b = events[index - 1];
            t = 0;

            this.eventStore.setCursor(a.id);
            onFrame?.(a, index);
          }

          this.frame$.next(
            this.interpolateFaces(a, b, t)
          );
        });
      }, 1000 / 60); // 60fps fluide
    }
  }

  stop() {
    clearInterval(this.timer);
    clearInterval(this.frameTimer);
    this.timer = null;
    this.frameTimer = null;
    this.frame$.next(null);
  }

  private interpolateFaces(a: SocketEvent, b: SocketEvent, t: number) {
    if (!a.payload?.faces || !b.payload?.faces) return [];

    return a.payload.faces.map((fa: { box: { x: number; y: number; width: number; height: number; }; }, i: string | number) => {
      const fb = b.payload.faces[i];
      if (!fb) return fa;

      return {
        ...fa,
        box: {
          x: fa.box.x + (fb.box.x - fa.box.x) * t,
          y: fa.box.y + (fb.box.y - fa.box.y) * t,
          width: fa.box.width + (fb.box.width - fa.box.width) * t,
          height: fa.box.height + (fb.box.height - fa.box.height) * t
        }
      };
    });
  }
}

