import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResponse, Item, Video } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyAL65HJ1Y2nvSLxbPCAesEqUvt3LCjAJA0';
  private playlist = 'UUK8sQmJBp8GCxrOtXWBpyEA';
  private nextPageToken = '';

  constructor( private http: HttpClient ) { }

  getVideos(): Observable<Video[]> {

    const url = `${this.youtubeUrl}/playlistItems`

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '12')
      .set('key', this.apiKey)
      .set('playlistId', this.playlist)
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>( url, { params } )
      .pipe( map( ( res: YoutubeResponse ) => {
        this.nextPageToken = res.nextPageToken;
        return res.items;
      }),
        map( ( items: Item[] ) => items.map( video => video.snippet))
      );
  }

}
