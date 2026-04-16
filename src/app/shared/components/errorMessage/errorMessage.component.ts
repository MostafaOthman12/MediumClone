import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div>
      <p>{{ message() | json }}</p>
    </div>
  `,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  message = input<string>('something went wrong');
}
