import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/event.gateway';
import { EventsModule } from './events/events.module';
import { WsGateway } from './ws/ws/ws.gateway';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
