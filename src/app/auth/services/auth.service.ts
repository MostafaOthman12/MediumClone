import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/RegisterRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface, AuthResponseInterface } from "../../shared/types/currentUser.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
    httpClient: HttpClient = inject(HttpClient);
    register(Request: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.httpClient.post<AuthResponseInterface>('http://localhost:3000/api/users', Request)
            .pipe(map(Response => Response.user));
    }
}