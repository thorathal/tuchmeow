import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/delay';

import {YoutubeService} from './services/youtube.service';
import {Game} from './interfaces/game';
import {Video_Data} from './interfaces/video_data';
import {GameService} from './services/game.service';

@Component({
    template: ` 
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <ul class="games" *ngFor="#game of games">
            <li [routerLink]="['Game', { game: game.id }]">
                <a title="{{ game.name }}">
                    <img class=" cell media-object" src="{{ game.imageUrl }}">
                </a>
            </li>
        </ul>
          <!-- Will be moved to its own component: channel.component -->
        <div *ngIf="gameSelected">
             <ul class="channels" *ngFor="#channel of channels">
                <li class="lockup">
                    <a title="{{ channel.snippet.description }}" [routerLink]="['Channel', { game: currentGame, channelid: channel.id }]">
                        <img class="media-object" src="{{ channel.snippet.thumbnails.medium.url }}">
                        <span class="video-time" aria-hidden="true">                             {{ channel.snippet.title }}
                        </span>
                    </a>
                </li>
            </ul>
         </div>
        <br/>
         <!-- Will be moved to its own component: videos.component -->
        <div class="video-area" *ngIf="channelSelected">
            <h2>Videos</h2>
             <ul class="videos" *ngFor="#video of videos">
                <li>
                    <div class="lockup">
                        <a area-hidden="true" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]">                             <img class="media-object" src="{{ video.snippet.thumbnails.medium.url }}">
                            <span class="video-time" aria-hidden="true">                                 {{ video.id.videoId }}
                            </span>
                        </a>                     </div>
                    <div class="textwrap">
                            <a title="{{ video.snippet.title }}" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]">
                                    <b>{{ video.snippet.title }}</b>
                            </a>
                    </div>
                </li>
            </ul>
         </div>
        <br/>
        <br/>
          `,
    styleUrls: [app / css / game - page.component.css'],
    providers: [GameService, YoutubeService, HTTP_PROVIDERS],
        directives: [ROUTER_DIRECTIVES]
})
export class GamePageComponent implements OnInit {
    isLoading = true;
    gameSelected = false;
    channelSelected = false;
    games: Game[];
    channels: any[];
    videos: Video_Data[];
    currentGame: string;
    currentChannel: string;

    constructor(private _gameService  GameService,
        ivate _youtubeService: YoutubeService, ivate _routeParams: RouteParams) {
    }
    ngOnInit() {
 
        // get data on games
        this.games = this._gameService.getItems();
        this.isLoading = false;
        
        // If channel and game has been chosen.Get video data from the channel. Will be moved to video.component
        this.currentGame = this._routeParams.get('game');
        this.currentChannel = this._routeParams.get('channelid');
        if (his.currentChannel) {
            this.isLoading = true;
            this.gameSelected = true;
            this.channelSelected = true;
            Observable.forkJoin([
                is._youtubeService.getChannels(this.currentGame),
                is._youtubeService.getVideos(this.currentChannel, this.currentGame) 
             )
            ubscribe(
                s => {
                    is.channels = res[0].items;
                    is.videos = this._youtubeService.getVideoDurations(res[1].items);
                     ,
                r => {
                    is.isLoading = false;
                    nsole.log(err);
                     ,
                  => { is.isLoading = false
                     
                    );                 else
            If only a game has been chosen.Get data 'our' list of channels on the game.Will be moved to channel.component
                (his.currentGame) {
            is.isLoading = true;
            is.gameSelected = true;
            is._youtubeService.getChannels(this.currentGame)
            subscribe(
                es => this.channels = res.items,
                rr => {
                    onsole.error(err);
                    his.isLoading = false;
                     ,
                ) => this.isLoading = false;



        }