import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.actions';
import { AuthStateInterface } from '../../types/authState.interface';
import { selectCurrentUser, selectIsLoggedIn, selectIsSubmitting, selectValidationErrors } from '../../store/auth.reducer';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { RouterLink } from '@angular/router';
import { BackendErrorMessages } from '../../../shared/components/backend-error-messages/backend-error-messages';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink, BackendErrorMessages]
})
export class RegisterComponent {
    fb: FormBuilder = inject(FormBuilder);
    store: Store<{ auth: AuthStateInterface }> = inject(Store);

    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        isLoggedIn: this.store.select(selectIsLoggedIn),
        currentUser: this.store.select(selectCurrentUser),
        backendErrors: this.store.select(selectValidationErrors)
    });
    registerForm = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })
    onSubmit() {
        const request = { user: this.registerForm.getRawValue() }
        this.store.dispatch(authActions.register({ request }))
    }
}