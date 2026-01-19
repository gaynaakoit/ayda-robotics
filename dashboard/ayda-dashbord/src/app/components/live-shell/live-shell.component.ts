import { Component } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'app-live-shell',
  templateUrl: './live-shell.component.html',
  styleUrls: ['./live-shell.component.scss']
})
export class LiveShellComponent {
  constructor(public ui: UiStateService) {}
}
