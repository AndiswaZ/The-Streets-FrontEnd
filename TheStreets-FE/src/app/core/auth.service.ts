import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7105/api/Auth';

  register(user: { userId: string; displayName: string; password: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: { userId: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
