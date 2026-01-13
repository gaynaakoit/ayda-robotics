import { Component, OnInit } from '@angular/core';
import { SocketEvent, FaceDetectedPayload } from 'src/app/models/socket-event.model';
import { EventStoreService } from 'src/app/services/event-store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alerts-feed',
  templateUrl: './alerts-feed.component.html',
  styleUrls: ['./alerts-feed.component.scss']
})
export class AlertsFeedComponent implements OnInit {
  alerts$: Observable<SocketEvent<FaceDetectedPayload>[]>;
  
  constructor(private eventStore: EventStoreService) {
    this.alerts$ = this.eventStore.ofType<FaceDetectedPayload>('FACE_DETECTED');
  }

  ngOnInit(): void {}
}
