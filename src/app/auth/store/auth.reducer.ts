import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./auth.actions";
import { BackendErrorInterface } from "../../shared/types/backendError.interface";
import { routerNavigatedAction } from "@ngrx/router-store";
export const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: false,
    validationErrors: null
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(initialState,
        on(authActions.register, (state: AuthStateInterface) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
            isLoggedIn: false
        })),
        on(authActions.registerSuccess, (state: AuthStateInterface, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
            isLoggedIn: true,
            validationErrors: null
        })),
        on(authActions.registerFailure, (state: AuthStateInterface, action: { backendErrors: BackendErrorInterface }) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.backendErrors,
            isLoggedIn: false
        })),
        on(authActions.login, (state: AuthStateInterface) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
            isLoggedIn: false
        })),
        on(authActions.loginSuccess, (state: AuthStateInterface, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
            isLoggedIn: true,
            validationErrors: null
        })),
        on(authActions.loginFailure, (state: AuthStateInterface, action: { backendErrors: BackendErrorInterface }) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.backendErrors,
            isLoggedIn: false
        })),
        on(routerNavigatedAction, (state: AuthStateInterface) => ({
            ...state,
            isSubmitting: false,
            validationErrors: null,
            isLoggedIn: false
        }))
    )
})
export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectIsLoggedIn, selectCurrentUser, selectValidationErrors } = authFeature