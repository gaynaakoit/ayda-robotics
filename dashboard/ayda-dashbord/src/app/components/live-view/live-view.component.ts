import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventStoreService } from 'src/app/services/event-store.service';
import { FaceDetectedPayload } from 'src/app/models/socket-event.model';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent {
  @ViewChild('liveImage', { static: true })
  liveImage!: ElementRef<HTMLImageElement>;
  
  event$ = this.eventStore
  .latestOrCursor<FaceDetectedPayload>('FACE_DETECTED');
  
  constructor(
    private eventStore: EventStoreService,
    public ui: UiStateService
  ) {
    this.event$.subscribe(e => {
      console.log('EVENT', e);
      console.log('faces isArray?', Array.isArray(e?.payload?.faces));
    });
  }
}
