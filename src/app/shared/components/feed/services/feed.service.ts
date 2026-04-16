import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(this.baseUrl + url);
  }
}
