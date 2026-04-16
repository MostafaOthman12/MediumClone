import { Component, inject, input, OnInit } from '@angular/core';
import { FeedStateInterface } from './types/feedState.interface';
import { combineLatest, Observable } from 'rxjs';
import { globalFeedFeature } from '../../../globalfFeed/store/globalFeed.reducer';
import { Store } from '@ngrx/store';
import { GetFeedResponseInterface } from './types/getFeedResponse.interface';
import { ArticleInterface } from './types/Article.interface';
import { CommonModule } from '@angular/common';
import { AuthorInterface } from './types/Author.interface';
import { RouterLink } from '@angular/router';
import { globalFeedAction } from '../../../globalfFeed/store/globalFeed.actions';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule, ErrorMessageComponent],
})
export class FeedComponent implements OnInit {
  url = input.required<string>();
  store = inject(Store);
  currentFeeds$ = combineLatest({
    data: this.store.select(globalFeedFeature.selectData),
    isLoading: this.store.select(globalFeedFeature.selectIsLoading),
    error: this.store.select(globalFeedFeature.selectError),
  });
  ngOnInit(): void {
    this.store.dispatch(
      globalFeedAction.getGlobalFeed({
        url: this.url(),
      }),
    );
  }
}
