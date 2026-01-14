// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from './event.gateway';
import { FaceDetectedDto } from './dto/face-event.dto';

@Injectable()
export class EventsService {
    constructor(private readonly eventsGateway: EventsGateway) {}


    handleFaceDetected(payload: FaceDetectedDto) {
        console.log('Face detected event:', payload);

        // Envoie en temps réel à tous les clients connectés
        this.eventsGateway.emitFaceDetected(payload);
        return { status: 'ok', message: 'Face detected event emitted' };
    }
}
