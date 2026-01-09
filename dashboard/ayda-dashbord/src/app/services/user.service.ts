import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.api}/me`);
  }

  update(data: any) {
    return this.http.put(`${this.api}/me`, data);
  }
}
