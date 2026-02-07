// src/events/events.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { FaceDetectedDto, EventDto, ActionDto } from './dto/face-event.dto';
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


  // POST /events
  @Post('events')
  createEvent(@Body() event: EventDto) {
    return this.eventsService.addEvent(event);
  }

  // GET /events
  @Get('events')
  getAllEvents(): EventDto[] {
    return this.eventsService.getEvents();
  }

  // POST /actions
  @Post('actions')
  receiveAction(@Body() action: ActionDto) {
    this.eventsService.addActionLog(`Action received: ${action.type}`);
    return { status: 'ok', message: 'Action received' };
  }

  // GET /logs
  @Get('logs')
  getLogs() {
    return this.eventsService.getLogs();
  }
}
