import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent {
  user = {
    name: '',
    email: '',
    notifications: true,
  };

  constructor(private userService: UserService) {}

  save(): void {
    this.userService.update(this.user).subscribe();
  }
}
