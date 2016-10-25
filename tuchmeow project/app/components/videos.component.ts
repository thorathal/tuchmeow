import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {YoutubeService} from '../services/youtube.service';

@Component({ // [routerLink]="['Game', { id: data.url }]"
    selector: 'videos',
    template: `
        <div class="video-area">
            <h2>Videos</h2>
             <ul class="videos" *ngFor="#video of videos">
                <li>
                    <div class="lockup">
                        <a area-hidden="true" [routerLink]="['Video', { game: _routeParams.get('game'), channelid: _routeParams.get('channelid'), videoid: video.id }]">
                            <img class="media-object" src="{{ video.thumbnailUrl }}">
                            <span class="video-time" aria-hidden="true">
                                {{ video.duration }}
                            </span>
                        </a>
                    </div>
                    <div class="textwrap">
                        <a title="{{ video.title }}" [routerLink]="['Video', { game: _routeParams.get('game'), channelid: _routeParams.get('channelid'), videoid: video.id }]">
                            <b>{{ video.title }}</b>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['app/css/page-styling.css'],
    providers: [YoutubeService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class VideosComponent implements OnInit {
    isLoading = true;
    videos: any[];

    constructor(private _youtubeService: YoutubeService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._youtubeService.getVideos(this._routeParams.get('channelid'), this._routeParams.get('game'))
                .subscribe(
                    videos => {
                        this._youtubeService.getVideoDurations(videos)
                            .subscribe(
                                durations => {
                                    this.videos = this._youtubeService.mergeArrays(videos, durations);
                                    this.isLoading = false;
                                }
                            );
                    }
                );

    }
}