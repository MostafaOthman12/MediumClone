import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrrorInterface } from "../../shared/types/backendErrror.interface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null;
    isLoggedIn: boolean;
    validationErrors: BackendErrrorInterface | null;
}