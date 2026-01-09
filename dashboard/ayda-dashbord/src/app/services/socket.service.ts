import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  listen<T>(event: string): Observable<T> {
    return this.socket.fromEvent<T>(event);
  }
  emit(arg0: string, arg1: { id: string; }) {
    throw new Error('Method not implemented.');
  }

  onFaceDetected(): Observable<any> {
    return this.socket.fromEvent<any>('face-detected');
  }
}
