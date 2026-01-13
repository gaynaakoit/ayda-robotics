import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { SocketEvent } from '../models/socket-event.model';

@Injectable({ providedIn: 'root' })
export class LiveService {
  constructor(private socket: SocketService) {}

  onLive(): Observable<SocketEvent<any>> {
    return this.socket.listen('live');
  }
}
