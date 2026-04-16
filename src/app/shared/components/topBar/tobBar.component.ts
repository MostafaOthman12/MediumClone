import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/auth.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './tobBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  store = inject(Store);
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });
}
