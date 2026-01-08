// src/events/events.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('face-detected')
  handleFaceDetected(@Body() payload: any) {
    // Envoie vers WebSocket ou stocke dans la DB
    this.eventsService.handleFaceDetected(payload);
    return { message: 'Face event received' };
  }
}
