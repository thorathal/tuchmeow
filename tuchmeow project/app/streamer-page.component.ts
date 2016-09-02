import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {StreamerService} from './streamer.service';
import {GameMenuComponent} from './game-menu.component';
import {VideoSuggestionsComponent} from './video-suggestions.component'

@Component({
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <game-menu></game-menu>
        <div class="space"></div>
        <video-suggestions></video-suggestions>
    `,
    styles:[`
        .space {
            height: 10%;
        }
    `],
    providers: [StreamerService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES, GameMenuComponent, VideoSuggestionsComponent]
})
export class StreamerPageComponent implements OnInit {
    isLoading = true;
    streamers;

    constructor(
        private _streamerService: StreamerService, 
        private _routeParams: RouteParams) {
    }
    
    ngOnInit(){
        this._routeParams.get('id');
        this.streamers = this._streamerService.getItems();
        this.isLoading = false;
    }
}