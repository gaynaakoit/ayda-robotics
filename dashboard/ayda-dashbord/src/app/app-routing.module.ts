// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsFeedComponent } from './components/alerts-feed/alerts-feed.component';
import { DashboardComponent } from './components/dashbord/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import { LiveShellComponent } from './components/live-shell/live-shell.component';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

const routes: Routes = [
  { path: 'live', component: LiveShellComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'alerts', component: AlertsFeedComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
