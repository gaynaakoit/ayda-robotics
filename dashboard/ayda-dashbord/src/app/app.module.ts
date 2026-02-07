import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AlertsFeedComponent } from './components/alerts-feed/alerts-feed.component';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { DashboardComponent } from './components/dashbord/dashboard.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserService } from './services/user.service';
import { LiveService } from './services/live.service';
import { HistoryService } from './services/history.service';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';
import { HistoryTimelineComponent } from './components/history-timeline/history-timeline.component';
import { LiveShellComponent } from './components/live-shell/live-shell.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const config: SocketIoConfig = {
  url: 'http://199.247.10.184:3000',
  options: {
    transports: ['websocket'], // 🔥 force websocket
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LiveViewComponent,
    AlertsFeedComponent,
    DashboardComponent,
    NotificationsComponent,
    UserSettingsComponent,
    HistoryTimelineComponent,
    LiveShellComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [UserService, LiveService, HistoryService, AnalyticsService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
