import { Injectable, NgZone } from '@angular/core';
import { SocketEvent } from '../models/socket-event.model';
import { UiStateService } from './ui-state.service';
import { EventStoreService } from './event-store.service';

@Injectable({ providedIn: 'root' })
export class MiniPlayerService {
  private timer: any;

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
    if (!events.length) return;

    this.stop();
    this.ui.setHistory();

    let index = events.length - 1;

    this.timer = setInterval(() => {
      this.zone.run(() => {
        const e = events[index];
        if (!e) {
          this.stop();
          return;
        }

        // 🔥 maintenant Angular voit le changement
        this.eventStore.setCursor(e.id);
        onFrame?.(e, index);

        index--;
        if (index < 0) this.stop();
      });
    }, 1000 / fps);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
