import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { v4 as uuid } from 'uuid';

  @WebSocketGateway({ cors: { origin: '*' } })
  export class EventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
    @WebSocketServer()
    server!: Server;
  
    afterInit() {
      console.log('✅ Socket.IO initialisé');
    }
  
    handleConnection(client: Socket) {
      console.log('🟢 Client connecté:', client.id);
    }
  
    handleDisconnect(client: Socket) {
      console.log('🔴 Client déconnecté:', client.id);
    }
  
    emitFaceDetected(face: { personId: string; confidence: number; timestamp: string }) {
      console.log('📡 gateway active', 'events', {
        id: uuid(),
        type: 'FACE_DETECTED',
        source: 'AI',
        timestamp: new Date().toISOString(),
        payload: {
          personId: 'user_42',
          confidence: 0.96,
          box: {
            x: 0.32,
            y: 0.18,
            width: 0.22,
            height: 0.28
          }
        }
      });
      this.server.emit('events', {
        id: uuid(),
        type: 'FACE_DETECTED',
        source: 'AI',
        timestamp: new Date().toISOString(),
        payload: {
          personId: 'user_42',
          confidence: 0.96,
          box: {
            x: 0.32,
            y: 0.18,
            width: 0.22,
            height: 0.28
          }
        }
      });
    }
  }
  