import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { ofType } from '@ngrx/effects';
import { of, exhaustMap } from 'rxjs';
import { map, catchError } from 'rxjs';
import { authActions } from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../shared/Services/Persistence.service';
import { Router } from '@angular/router';
import { LoginRequestInterface } from '../types/LoginRequest.interface';

export const registerEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return action$.pipe(
      ofType(authActions.register),
      exhaustMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.registerFailure({ backendErrors: errorResponse.error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterRegisterEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      map(() => {
        return router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return action$.pipe(
      ofType(authActions.login),
      exhaustMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.loginFailure({ backendErrors: errorResponse.error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterLoginEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.loginSuccess),
      map(() => {
        return router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getCurrentUserEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return action$.pipe(
      ofType(authActions.getCurrentUser),
      exhaustMap(() => {
        return !persistenceService.get('accessToken')
          ? of(authActions.getCurrentUserFailure())
          : authService.getCurrentUser().pipe(
              map((currentUser) => {
                return authActions.getCurrentUserSuccess({ currentUser });
              }),
              catchError((errorResponse: HttpErrorResponse) =>
                of(authActions.getCurrentUserFailure()),
              ),
            );
      }),
    );
  },
  { functional: true },
);
