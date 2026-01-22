import { Injectable } from '@angular/core';
import { SocketEvent } from '../models/socket-event.model';
import { UiStateService } from './ui-state.service';
import { EventStoreService } from './event-store.service';

@Injectable({ providedIn: 'root' })
export class MiniPlayerService {
  private timer: any;

  constructor(
    private ui: UiStateService,
    private eventStore: EventStoreService
  ) {}

  play(events: SocketEvent[], fps = 2) {
    if (!events.length) return;

    this.stop();
    this.ui.setHistory();

    let index = events.length - 1; // du plus ancien au plus récent

    this.timer = setInterval(() => {
      const e = events[index];
      if (!e) {
        this.stop();
        return;
      }

      this.eventStore.setCursor(e.id);
      index--;

      if (index < 0) this.stop();
    }, 1000 / fps);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
