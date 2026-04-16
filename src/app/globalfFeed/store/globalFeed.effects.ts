import { inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedService } from '../../shared/components/feed/services/feed.service';
import { globalFeedAction } from './globalFeed.actions';

export const getGlobalFeedEffect = createEffect(
  (action$ = inject(Actions), feedService = inject(FeedService)) => {
    return action$.pipe(
      ofType(globalFeedAction.getGlobalFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed) => {
            return globalFeedAction.getGlobalFeedSuccess({ feed });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(globalFeedAction.getGlobalFeedFailure({ error: errorResponse.error })),
          ),
        );
      }),
    );
  },
  { functional: true },
);
