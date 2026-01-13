import { Component } from '@angular/core';
import { EventStoreService } from 'src/app/services/event-store.service';
import { FaceDetectedPayload } from 'src/app/models/socket-event.model';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent {
  face$ = this.eventStore.latest<FaceDetectedPayload>('FACE_DETECTED');

  constructor(private eventStore: EventStoreService) {}
}
