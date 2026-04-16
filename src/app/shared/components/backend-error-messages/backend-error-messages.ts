import { Component, input, computed } from '@angular/core';
import { BackendErrorInterface } from '../../types/backendError.interface';

@Component({
  selector: 'app-backend-error-messages',
  imports: [],
  templateUrl: './backend-error-messages.html',
  styleUrl: './backend-error-messages.css',
})
export class BackendErrorMessages {
  backendErrors = input<BackendErrorInterface | null>();

  errorMessages = computed(() => {
    const backendErrors = this.backendErrors()?.errors;
    return !backendErrors
      ? []
      : Object.keys(backendErrors).map((name: string) => {
          const messages = backendErrors[name].join(' ');
          return `${name} ${messages}`;
        });
  });
}
