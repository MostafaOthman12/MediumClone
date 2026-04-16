import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/RegisterRequest.interface';
import { Observable, map } from 'rxjs';
import {
  CurrentUserInterface,
  AuthResponseInterface,
} from '../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../types/LoginRequest.interface';

import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;
  httpClient: HttpClient = inject(HttpClient);
  register(Request: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(`${this.baseUrl}/users`, Request)
      .pipe(map((Response) => Response.user));
  }
  login(Request: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(`${this.baseUrl}/users/login`, Request)
      .pipe(map((Response) => Response.user));
  }
  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.httpClient
      .get<AuthResponseInterface>(`${this.baseUrl}/user`)
      .pipe(map((Response) => Response.user));
  }
}
