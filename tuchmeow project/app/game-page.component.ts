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
                        <span class="video-time" aria-hidden="true"> 
                            {{ channel.snippet.title }}
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
                        <a area-hidden="true" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id }]">   
                            <img class="media-object" src="{{ video.thumbnailUrl }}">
                            <span class="video-time" aria-hidden="true"> 
                                {{ video.duration }}
                            </span>
                        </a>    
                    </div>
                    <div class="textwrap">
                            <a title="{{ video.title }}" [routerLink]="['Video', { game: currentGame, channelid: currentChannel, videoid: video.id }]">
                                    <b>{{ video.title }}</b>
                            </a>
                    </div>
                </li>
            </ul>
        </div>
        
        
        <!-- Will be moved to its own component: player.component -->
        <div style="text-align: center" *ngIf="videoSelected">
            
            <iframe width="80%" height="62%" src="https://www.youtube.com/embed/{{ currentVideo }}" frameborder="0" allowfullscreen>
            </iframe>
           
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
    videoSelected = false;
    games: Game[];
    channels: any[];
    videos: Video_Data[];
    currentGame: string;
    currentChannel: string;
    currentVideo: string;

    constructor(private _gameService : GameService,
                private _youtubeService: YoutubeService, 
                private _routeParams: RouteParams) {
    }    

    ngOnInit() {
 
        // get data on games
        this.games = this._gameService.getItems();
        this.isLoading = false;
        
        
        this.currentGame = this._routeParams.get('game');
        this.currentChannel = this._routeParams.get('channelid');
        this.currentVideo = this._routeParams.get('videoid');
        if(this.currentVideo) { // if a game, a channel and a video has been selected
            this._youtubeService.getChannels(this.currentGame)
            .subscribe(
                res => this.channels = res.items,
                err => {
                    console.error(err);
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.gameSelected = true;
                }
            );
            this.videoSelected = true;
        }
        else if(this.currentChannel) { // if a game and a channel has been selected
            this.isLoading = true;
            this.gameSelected = true;
            Observable.forkJoin([
                        this._youtubeService.getChannels(this.currentGame),
                        this._youtubeService.getVideos(this.currentChannel, this.currentGame)           
                    ])
                    .subscribe(
                        forkres => {
                            this.channels = forkres[0].items;
                            this._youtubeService.getVideoDurations(forkres[1])
                                    .subscribe(
                                            res => {
                                                this.videos = this._youtubeService.mergeArrays(forkres[1], res);
                                            },
                                            null,
                                            () => {
                                                this.isLoading = false;
                                                this.channelSelected = true;
                                            }
                                    );
                        }
                    );                                
                        
                        
        } else
        // If only a game has been chosen. Get data 'our' list of channels on the game. Will be moved to channel.component
        if(this.currentGame) {
            this.isLoading = true;
            this._youtubeService.getChannels(this.currentGame)
                    .subscribe(
                        res => this.channels = res.items,
                        err => {
                            console.error(err);
                            this.isLoading = false;
                        },
                        () => {
                            this.isLoading = false;
                            this.gameSelected = true;
                        }
                    );
        }
        
    }
}