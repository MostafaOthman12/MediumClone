import { createFeature, createReducer, on } from '@ngrx/store';
import { globalFeedAction } from './globalFeed.actions';
import { FeedStateInterface } from '../../shared/components/feed/types/feedState.interface';

const intialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const globalFeedFeature = createFeature({
  name: 'globalFeed',
  reducer: createReducer<FeedStateInterface>(
    intialState,
    on(globalFeedAction.getGlobalFeed, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(globalFeedAction.getGlobalFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(globalFeedAction.getGlobalFeedFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),
  ),
});

export const {
  name: globalFeedFeatureKey,
  reducer: globalFeedReducer,
  selectData: selectFeedData,
  selectIsLoading,
  selectError,
} = globalFeedFeature;
