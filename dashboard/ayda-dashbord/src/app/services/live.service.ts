import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class LiveService {
  constructor(private socket: SocketService) {}

  onEvent() {
    return this.socket.listen<any>('live-event');
  }
}
