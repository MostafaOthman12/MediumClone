import { Component, Input } from '@angular/core';
import { BackendErrrorInterface } from '../../types/backendErrror.interface';

@Component({
  selector: 'app-backend-error-messages',
  imports: [],
  templateUrl: './backend-error-messages.html',
  styleUrl: './backend-error-messages.css',
})
export class BackendErrorMessages {
  @Input() backendErrors: BackendErrrorInterface | null = null;
  errorMessages: string[] = [];
  ngOnInit(): void {
    console.log(this.backendErrors);
    this.errorMessages = Object.values(this.backendErrors || {}).flat();
  }
}
