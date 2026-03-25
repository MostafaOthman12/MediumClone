import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthStateInterface } from "../../types/authState.interface";
import { selectCurrentUser, selectIsLoggedIn, selectIsSubmitting, selectValidationErrors } from "../../store/auth.reducer";
import { combineLatest, map } from "rxjs";
import { authActions } from "../../store/auth.actions";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { BackendErrorMessages } from "../../../shared/components/backend-error-messages/backend-error-messages";
import { LoginRequestInterface } from "../../types/LoginRequest.interface";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink, BackendErrorMessages]
})
export class LoginComponent {
    fb = inject(FormBuilder);
    store = inject(Store<{ auth: AuthStateInterface }>);
    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        isLoggedIn: this.store.select(selectIsLoggedIn),
        currentUser: this.store.select(selectCurrentUser),
        backendErrors: this.store.select(selectValidationErrors).pipe(map((errors) => errors?.errors))
    });
    loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    })
    onSubmit() {
        const request = { user: this.loginForm.getRawValue() }
        this.store.dispatch(authActions.login({ request }))
    }

}   