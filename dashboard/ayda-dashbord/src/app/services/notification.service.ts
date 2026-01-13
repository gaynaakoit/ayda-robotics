import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';
import { SocketEvent } from '../models/socket-event.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private socket: SocketService) {}

  stream(): Observable<SocketEvent<any>> {
    return this.socket.listen('notification');
  }

  acknowledge(eventId: string): void {
    this.socket.emit('acknowledge', { id: eventId });
  }
}
