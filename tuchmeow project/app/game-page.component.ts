import {Component, Input, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

import {YoutubeService} from './youtube.service';
import {GameService} from './game.service';

@Component({
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        
        <nav class="navbar">
            <ul class="wrapper large" *ngFor="#game of games">
                <li id="{{ game.id }}" [routerLink]="['Game', { game: game.id }]">
                    <form class="navbar-form">
                        <a class=""><img class=" cell media-object" src="{{ game.imageUrl }}"></a>
                    </form>
                </li>
            </ul>
        </nav>
        
        
        <div *ngIf='gameSelected'>
            <nav class="navbar">
                <ul class="navbar wrapper small" *ngFor="#channel of channels; #i = index">
                    <li class="cell" [routerLink]="['Channel', { game: games[i].id, channel: channel.id }]">
                        <a><img class="media-object" src="{{ channel.snippet.thumbnails.medium }}"></a>
                    </li>
                </ul>
            </nav>
        </div>   
        
        <h2>Streamers</h2>
        <div *ngIf="channels" style="background-color: pink;">{{ channels[0].snippet.title }}</div>
        <br/>
        <br/>
         `,
    styleUrls:['app/game-page.component.css'],
    providers: [GameService, YoutubeService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class GamePageComponent implements OnInit{
    isLoading = true;
    gameSelected = false;
    channelSelected = false;
    games: any[];
    channels: any[];
    videos: any[];

    constructor(private _gameService : GameService,
                private _youtubeService: YoutubeService, 
                private _routeParams: RouteParams) {
    }    

    ngOnInit() {
        
        // get data on games
        this.games = this._gameService.getItems();
        this.isLoading = false;
        
     // If channel and game has been chosen.Get video data from the channel.
        var game = this._routeParams.get('game');
        var channel = this._routeParams.get('channel');
        if(channel) {
            console.log("Trying to load Videos; Params- Game: " + game + ",  Channel:" + channel);
            this.isLoading = true;
            this.gameSelected = true;
            this.channelSelected = true;
            Observable.forkJoin( [
                    this._youtubeService.getChannels(game),
                    this._youtubeService.getVideos(channel)
                    ])
                        .subscribe(
                            res => {
                                console.log("Channels and Videos Successfully loaded: " + res[0] + res[1]);
                                this.games = res[0];
                                this.videos = res[1];},
                            null,
                            () => { this.isLoading = false; })
                        
        } else
        // If only a game has been chosen. Get data 'our' list of channels on the game.
        if(game) {
            this.isLoading = true;
            this.gameSelected = true;
            console.log("Trying to load Channels; Params- Game:" + game);
            this._youtubeService.getChannels(game)
                    .subscribe(
                        res => {
                            console.log("Channels succesfully loaded, title of first channel: "+res.items[0].snippet.title + " /n Array length is " + res.items.length);
                            this.channels = res.items },
                        null,
                        () => { this.isLoading = false; } );
        }

//        Observable.forkJoin( this._streamerService.getItems() )
//                        .subscribe(
//                            res => this.streamers = res,
//                            null,
//                            () => { this.isLoading = false; } );

        console.log(this._routeParams.get('game') + this._routeParams.get('channel') );
    }

}