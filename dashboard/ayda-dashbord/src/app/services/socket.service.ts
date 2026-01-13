import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { SocketEvent } from '../models/socket-event.model';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  listen<T>(eventName: string): Observable<SocketEvent<T>> {
    console.log(eventName)
    return this.socket.fromEvent<SocketEvent<T>>(eventName);
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}