import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { registerAction } from "./auth.actions";
export const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: false,
    validationErrors: null
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(initialState,
        on(registerAction.register, (state: AuthStateInterface) => ({
            ...state,
            isSubmitting: true,
            validationErrors: null,
            isLoggedIn: false
        })),
        on(registerAction.registerSuccess, (state: AuthStateInterface, action) => ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
            isLoggedIn: true,
            validationErrors: null
        })),
        on(registerAction.registerFailure, (state: AuthStateInterface, action) => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.backendErrors,
            isLoggedIn: false
        }))
    )
})
export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectIsLoggedIn, selectCurrentUser, selectValidationErrors } = authFeature