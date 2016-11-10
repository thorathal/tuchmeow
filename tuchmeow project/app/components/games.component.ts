import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {Game} from '../interfaces/game';
import {GameService} from '../services/game.service';

@Component({
    selector: 'games',
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

        <!-- Setup a menu/row of games -->
        <ul class="games" *ngFor="#game of games">
            <li [routerLink]="['Game', { game: game.id }]">
                <a title="{{ game.name }}">
                    <img class=" cell media-object" src="{{ game.imageUrl }}">
                </a>
            </li>
        </ul>
    	`,
    styleUrls: ['app/css/page-styling.css'],
    providers: [GameService, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class GamesComponent implements OnInit {
    isLoading = true
    games: Game[];

    constructor(private _gameService: GameService) {
    }

    ngOnInit() {
        // get data on games
        this.games = this._gameService.getItems();
        this.isLoading = false;
    }
}

