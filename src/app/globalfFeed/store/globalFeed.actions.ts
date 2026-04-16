import { createActionGroup, props } from '@ngrx/store';
import { GetFeedResponseInterface } from '../../shared/components/feed/types/getFeedResponse.interface';
export const globalFeedAction = createActionGroup({
  source: '[Global Feed]',
  events: {
    'Get Global Feed': props<{ url: string }>(),
    'Get Global Feed Success': props<{ feed: GetFeedResponseInterface }>(),
    'Get Global Feed Failure': props<{ error: string }>(),
  },
});
