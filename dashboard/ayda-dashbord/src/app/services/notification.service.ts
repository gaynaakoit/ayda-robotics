import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private socket: SocketService) {}

  listen() {
    return this.socket.listen<any>('notification');
  }

  acknowledge(id: string) {
    this.socket.emit('notification-ack', { id });
  }
}
