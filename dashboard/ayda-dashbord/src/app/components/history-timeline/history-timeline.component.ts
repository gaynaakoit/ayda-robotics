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

  constructor(private eventStore: EventStoreService, private ui: UiStateService) {
    this.events$ = this.eventStore.ofType<FaceDetectedPayload>('FACE_DETECTED');
    console.log(this.events$)
  }

  select(eventId: string) {
    this.ui.setHistory();
    this.eventStore.setCursor(eventId);
  }
}

