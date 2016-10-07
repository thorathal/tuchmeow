import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

import {YoutubeService} from './services/youtube.service';
import {Game} from './interfaces/game';
import {GameService} from './services/game.service';

@Component({
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <nav>
            <ul class="games" *ngFor="#game of games">
                <li [routerLink]="['Game', { game: game.id }]">
                    <a title="{{ game.name }}">
                        <img class=" cell media-object" src="{{ game.imageUrl }}">
                    </a>
                </li>
            </ul>
        </nav>
        
        <!-- Will be moved to its own component: channel.component -->
        <div *ngIf="gameSelected">
            <nav>
                <ul class="channels" *ngFor="#channel of channels">
                    <li class="cell" [routerLink]="['Channel', { game: currentGame, channelid: channel.id }]">
                        <a title="{{ channel.snippet.description }}">
                            <img class="media-object" src="{{ channel.snippet.thumbnails.medium.url }}">
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <br/>
        
        <!-- Will be moved to its own component: videos.component -->
        <div class="video-area" *ngIf="channelSelected">
            <h2>Videos</h2>
            
            <ul class="videos" *ngFor="#video of videos">
                <li>
                    <div class="yt-lockup">
                        <a area-hidden="true" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]">   
                            <img class="media-object" src="{{ video.snippet.thumbnails.medium.url }}">
                            <span class="video-time" aria-hidden="true"> 
                                {{ video.id.videoId }}
                            </span>
                        </a>    
                    </div>
                    <a class="textwrap" title="{{ video.snippet.title }}" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]">
                            {{ video.snippet.title }}
                    </a>
                </li>
            </ul>
           
        </div>
        <br/>
        <br/>
            
         `,
    styleUrls:['app/css/game-page.component.css'],
    providers: [GameService, YoutubeService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class GamePageComponent implements OnInit{
    isLoading = true;
    gameSelected = false;
    channelSelected = false;
    games: Game[];
    channels: any[];
    videos: any[];
    currentGame: string;
    currentChannel: string;

    constructor(private _gameService : GameService,
                private _youtubeService: YoutubeService, 
                private _routeParams: RouteParams) {
    }    

    ngOnInit() {
        
        // get data on games
        this.games = this._gameService.getItems();
        this.isLoading = false;
        
        // If channel and game has been chosen.Get video data from the channel. Will be moved to video.component
        this.currentGame = this._routeParams.get('game');
        this.currentChannel = this._routeParams.get('channelid');
        if(this.currentChannel) {
            this.isLoading = true;
            this.gameSelected = true;
            this.channelSelected = true;
            Observable.forkJoin( [
                    this._youtubeService.getChannels(this.currentGame),
                    this._youtubeService.getVideos(this.currentChannel)
                    ])
                        .subscribe(
                            res => {
                                this.channels = res[0].items;
                                this.videos = res[1].items;
                            },
                            err => { 
                                this.isLoading = false;
                                console.log(err) 
                            },
                            () => { this.isLoading = false; });
                        
        } else
        // If only a game has been chosen. Get data 'our' list of channels on the game. Will be moved to channel.component
        if(this.currentGame) {
            this.isLoading = true;
            this.gameSelected = true;
            this._youtubeService.getChannels(this.currentGame)
                    .subscribe(
                        res => { 
                            this.channels = res.items 
                            } );
        }
        
    }
}