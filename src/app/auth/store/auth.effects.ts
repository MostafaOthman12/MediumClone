import { inject } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { ofType } from "@ngrx/effects";
import { of, exhaustMap } from "rxjs";
import { map, catchError } from "rxjs";
import { registerAction } from "./auth.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "../../shared/Services/Persistence.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect((action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)) => {
    return action$.pipe(
        ofType(registerAction.register),
        exhaustMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser) => {
                    persistenceService.set('accessToken', currentUser.token)
                    return registerAction.registerSuccess({ currentUser })
                }),
                catchError((errorResponse: HttpErrorResponse) =>
                    of(registerAction.registerFailure({ backendErrors: errorResponse.error.errors })))
            )
        })
    );
}, { functional: true })

export const redirectAfterRegisterEffect = createEffect((action$ = inject(Actions),
    router = inject(Router)) => {
    return action$.pipe(
        ofType(registerAction.registerSuccess),
        map(() => {
            return router.navigateByUrl('/')
        })
    )
}, { functional: true, dispatch: false })    