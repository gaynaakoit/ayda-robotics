import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  handleConnection(client: any) {
    console.log('[WS] Client connected');
  }

  handleDisconnect(client: any) {
    console.log('[WS] Client disconnected');
  }

  sendFaceDetected(payload: any) {
    const message = JSON.stringify({
      type: 'face-detected',
      payload,
    });

    this.server.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  }
}
