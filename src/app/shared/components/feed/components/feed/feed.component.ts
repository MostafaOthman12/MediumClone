import { Component, inject, input, OnInit } from '@angular/core';
import { FeedStateInterface } from '../../types/feedState.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { globalFeedFeature } from '../../../../../globalfFeed/store/globalFeed.reducer';
import { Store } from '@ngrx/store';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { ArticleInterface } from '../../types/Article.interface';
import { CommonModule } from '@angular/common';
import { AuthorInterface } from '../../types/Author.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { globalFeedAction } from '../../../../../globalfFeed/store/globalFeed.actions';
import { ErrorMessageComponent } from '../../../errorMessage/errorMessage.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { environment } from '../../../../../../environments/environment.development';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule, ErrorMessageComponent, PaginationComponent],
})
export class FeedComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  baseUrl = this.router.url.split('?')[0];
  url = input.required<string>();
  currentPage: number = 0;
  limit: number = environment.limit;

  currentFeeds$ = combineLatest({
    data: this.store.select(globalFeedFeature.selectData),
    isLoading: this.store.select(globalFeedFeature.selectIsLoading),
    error: this.store.select(globalFeedFeature.selectError),
  });
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1');
      this.fecthFeed();
    });
  }
  fecthFeed() {
    const offset = (this.currentPage - 1) * this.limit;
    console.log(this.url() + '?limit=' + this.limit + '&offset=' + offset);
    this.store.dispatch(
      globalFeedAction.getGlobalFeed({
        url: this.url() + '?limit=' + this.limit + '&offset=' + offset,
      }),
    );
  }
}
