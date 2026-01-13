import { Component } from '@angular/core';
import { EventStoreService } from 'src/app/services/event-store.service';
import { SocketEvent, NotificationPayload } from 'src/app/models/socket-event.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications$: Observable<SocketEvent<NotificationPayload>[]>;

  constructor(private eventStore: EventStoreService) {
    this.notifications$ = this.eventStore.ofType<NotificationPayload>('NOTIFICATION');
  }
}
