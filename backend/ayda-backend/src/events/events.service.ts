// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './event.gateway';
import { EventDto, FaceDetectedDto, LogEntry } from './dto/face-event.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EventsService {
    private events: EventDto[] = [];  // stockage en mémoire, remplacer par DB si nécessaire
    private logs: LogEntry[] = [];   // ✅ ICI
    
    constructor(private readonly eventsGateway: EventsGateway) {}


    /*handleFaceDetected(payload: FaceDetectedDto) {
        console.log('Face detected event:', payload);

        const event: EventDto = {
            id: uuid(),
            timestamp: new Date().toISOString(),
            type: 'FACE_DETECTED',
            source: 'AI',           // ou 'Unity' si c’est côté simulation
            faces: payload,
            audit: { hash: uuid() } // hash simple pour traçabilité
        };
        
        // Stocker dans la liste d’événements pour timeline / replay
        this.addEvent(event);
        
        // Envoyer en temps réel via WS (pour Angular déjà connecté)
        this.eventsGateway.emitFaceDetected(payload);
        
        return { status: 'ok', message: 'Face detected event emitted and stored' };
    }*/

    handleFaceDetected(payload: FaceDetectedDto) {
        const event: EventDto = {
          id: uuid(),
          timestamp: new Date().toISOString(),
          type: 'FACE_DETECTED',
          source: 'AI', // ou 'Unity' si c’est côté simulation
          payload: payload,
          audit: { hash: uuid() } // hash simple pour traçabilité
        };
      
        // ✅ addEvent gère TOUT (storage + WS)
        this.addEvent(event);
      
        return {
          status: 'ok',
          message: 'Face detected event stored and emitted',
          id: event.id
        };
    }
      

    /*addEvent(event: EventDto) {
      this.events.push(event);
      this.logs.push(`[EVENT] ${event.type} @ ${event.timestamp}`);
      // envoyer en temps réel via WebSocket
      this.eventsGateway.emitEvent(event);
      return { status: 'ok' };
    }*/

    addEvent(event: EventDto) {
        this.events.push(event);
      
        this.logs.push({
          id: uuid(),
          timestamp: event.timestamp,
          message: `[EVENT] ${event.type}`
        });
      
        // 🔥 UN SEUL ENVOI WS
        this.eventsGateway.emitEvent(event);
      
        return { status: 'ok', id: event.id };
    }
      
  
    getEvents(): EventDto[] {
      return this.events;
    }
  
    addActionLog(message: string) {
      const timestamp = new Date().toISOString();
      this.logs.push({
        id: uuid(),
        timestamp: new Date().toISOString(),
        message: `[ACTION] ${message}`
      });
    }
  
    getLogs() {
      return this.logs.map((msg, idx) => ({
        id: `log_${idx + 1}`,
        timestamp: new Date().toISOString(),
        message: msg,
      }));
    }
    
}
