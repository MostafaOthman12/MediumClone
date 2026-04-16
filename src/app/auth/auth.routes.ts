import { Route } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const authRoutes: Route[] = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
