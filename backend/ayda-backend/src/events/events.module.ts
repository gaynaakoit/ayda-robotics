import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsGateway]
})
export class EventsModule {}
