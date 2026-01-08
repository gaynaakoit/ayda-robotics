import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
    constructor(private socket: Socket) {}

    onFaceDetected(): Observable<any> {
        return this.socket.fromEvent<any>('face-detected');
    }
}
