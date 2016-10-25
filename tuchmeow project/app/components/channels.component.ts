import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {YoutubeService} from '../services/youtube.service';

@Component({
    selector: 'channels',
    template: `
    	<div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

        <ul class="channels" *ngFor="#channel of channels">
            <li class="lockup">
                <a title="{{ channel.snippet.description }}" [routerLink]="['Channel', { game: _routeParams.get('game'), channelid: channel.id }]">
                    <img class="media-object" src="{{ channel.snippet.thumbnails.medium.url }}">
                    <span class="video-time" aria-hidden="true">
                        {{ channel.snippet.title }}
                    </span>
                </a>
            </li>
        </ul>

	    <br/>
	`,
    styleUrls: ['app/css/page-styling.css'],
    providers: [YoutubeService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class ChannelsComponent implements OnInit {
    isLoading = true;
    channels: any[];

    constructor(private _youtubeService: YoutubeService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this._youtubeService.getChannels(this._routeParams.get('game'))
            .subscribe(
                res => this.channels = res.items,
                err => {
                    console.error(err);
                    this.isLoading = false;
                },
                () => this.isLoading = false
                );
    }
}