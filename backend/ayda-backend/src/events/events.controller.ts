// src/events/events.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { FaceDetectedDto } from './dto/face-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('face-detected')
  handleFaceDetected(@Body() payload: FaceDetectedDto) {
    // Envoie vers WebSocket ou stocke dans la DB
    this.eventsService.handleFaceDetected(payload);
    return { message: 'Face event received' };
  }
}
