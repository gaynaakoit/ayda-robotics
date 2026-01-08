// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsFeedComponent } from './components/alerts-feed/alerts-feed';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // route par défaut
  { path: 'home', component: HomeComponent },
  { path: 'alerts-feed', component: AlertsFeedComponent },
  { path: '**', redirectTo: 'home' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
