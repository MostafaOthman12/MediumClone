import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/auth.effects';
import * as globalFeedEffects from './globalfFeed/store/globalFeed.effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/Services/authInterceptor.service';
import { globalFeedFeatureKey, globalFeedReducer } from './globalfFeed/store/globalFeed.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouterStore(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ router: routerReducer }),
    provideState(authFeatureKey, authReducer),
    provideState(globalFeedFeatureKey, globalFeedReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(authEffects, globalFeedEffects),
  ],
};
