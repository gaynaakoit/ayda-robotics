import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketEvent, FaceDetectedPayload } from 'src/app/models/socket-event.model';
import { EventStoreService } from 'src/app/services/event-store.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.scss']
})

export class HistoryTimelineComponent {
  events$: Observable<SocketEvent<FaceDetectedPayload>[]>;

  selectedIndex = 0;

  constructor(
    private eventStore: EventStoreService,
    private ui: UiStateService
  ) {
    this.events$ = this.eventStore.ofType<FaceDetectedPayload>('FACE_DETECTED');
  }

  /** Click timeline */
  select(eventId: string, index: number) {
    this.selectedIndex = index;
    this.ui.setHistory();
    this.eventStore.setCursor(eventId);
  }

  /** Slider scrub */
  scrub(index: number, events: SocketEvent<FaceDetectedPayload>[]) {
    const event = events[index];
    if (!event) return;

    this.selectedIndex = index;
    this.ui.setHistory();
    this.eventStore.setCursor(event.id);
  }

  backToLive() {
    this.selectedIndex = 0;
    this.eventStore.clearCursor();
    this.ui.setLive();
  }
}


