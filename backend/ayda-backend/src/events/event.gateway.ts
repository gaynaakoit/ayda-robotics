  import {
      WebSocketGateway,
      WebSocketServer,
      OnGatewayInit,
      OnGatewayConnection,
      OnGatewayDisconnect
    } from '@nestjs/websockets';
    import { Server, Socket } from 'socket.io';
    import { v4 as uuid } from 'uuid';
  import { FaceDetectedDto } from './dto/face-event.dto';

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
    
      emitFaceDetected(faces: FaceDetectedDto) {
        console.log('📡 gateway active', 'events', {
          id: uuid(),
          type: 'FACE_DETECTED',
          source: 'AI',
          timestamp: new Date().toISOString(),
          payload: {
            faces
          }
        });
        this.server.emit('events', {
          id: uuid(),
          type: 'FACE_DETECTED',
          source: 'AI',
          timestamp: new Date().toISOString(),
          payload: faces
        });
      }
    }
    