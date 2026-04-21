import { Component, inject, OnInit } from '@angular/core';
import { FeedComponent } from '../../shared/components/feed/components/feed/feed.component';
import { Store } from '@ngrx/store';
import { globalFeedAction } from '../store/globalFeed.actions';
import { globalFeedFeature, globalFeedFeatureKey } from '../store/globalFeed.reducer';
import { ArticleInterface } from '../../shared/components/feed/types/Article.interface';
import { GetFeedResponseInterface } from '../../shared/components/feed/types/getFeedResponse.interface';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-globalfeed',
  templateUrl: './globalfeed.component.html',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
})
export class GlobalFeedComponent {
  url = '/articles';
}
