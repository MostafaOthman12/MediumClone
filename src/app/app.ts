import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './shared/components/topBar/tobBar.component';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { authActions } from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
