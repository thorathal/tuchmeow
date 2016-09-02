import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {GameService} from './game.service';
import {StreamerService} from './streamer.service';

@Component({
    selector: 'game-menu',
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

        <div id="wrapper" class="wrapper game" *ngFor="#game of games">
            <div [routerLink]="['Game', { id: game.id }]" class="cell">
            <img class="media-object" src="{{ game.imageUrl }}">
            </div>
            <p class="hovertext">{{ game.name }}</p>
        </div>
        <div class="space"></div>
        <div id="wrapper" class="wrapper streamer" *ngFor="#streamer of streamers">
            <div [routerLink]="['Video']" class="cell">
            <img class="media-object" src="{{ streamer.imageUrl }}">
            </div>
            <p class="hovertext">{{ streamer.name }}</p>
        </div>
    `,
    styles: [`
        .wrapper {
            display:inline-block;
            vertical-align:top;
            padding-right: 10px;
        }
        .game {
            width: 20%;
            height: 10%;
        }

        .space {
            height: 0.5%
        }

        .streamer {
            width: 16.66%;
            height: 8%;
        }

        #wrapper .hovertext {
            width: 150px;
            position:relative;
            bottom:30px;
            left:0px;
            background-color: gray;
            visibility:hidden;
        }

        #wrapper:hover .hovertext {
            visibility:visible;
        }

        .media-object {
            width: 100%;
            height: 100%;
            
        }
        .cell {
            cursor: pointer;
            border-radius: 5px;
            border-style: outset;
        }
    `],
    directives: [ROUTER_DIRECTIVES],
    providers: [GameService, StreamerService]
})
export class GameMenuComponent{
    isLoading = true;
    games: any[];
    streamers: any[];

    constructor(private gameService : GameService, private streamerService : StreamerService) {
    }    

    ngOnInit() {
        this.games = this.gameService.getItems();
        this.streamers = this.streamerService.getItems();
        this.isLoading = false;
    }
}