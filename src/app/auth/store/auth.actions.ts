import { createActionGroup, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/RegisterRequest.interface";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrrorInterface } from "../../shared/types/backendErrror.interface";

export const registerAction = createActionGroup({
    source: '[Auth]',
    events: {
        Register: props<{ request: RegisterRequestInterface }>(),
        "Register Success": props<{ currentUser: CurrentUserInterface }>(),
        "Register Failure": props<{ backendErrors: BackendErrrorInterface }>()
    }
});
