import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
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
      console.log('📡 gateway active', face);
      this.server.emit('face-detected', face);
    }
  }
  