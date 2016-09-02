import {Component, Input, OnInit} from 'angular2/core';
import {GameService} from './game.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({ // [routerLink]="['Game', { id: data.url }]"
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <div id="wrapper" class="wrapper" *ngFor="#data of data">
            <div [routerLink]="['Game', { id: data.id }]" class="cell">
            <img class="media-object" src="{{ data.imageUrl }}">
            </div>
            <p class="hovertext">{{ data.name }}</p>
        </div>
    `,
    styles: [`
        .wrapper {
            display:inline-block;
            vertical-align:top;
            padding-right: 10px;
            width: 20%;
            height: 20%;
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
    providers: [GameService],
    directives: [ROUTER_DIRECTIVES]
})
export class GamePageComponent implements OnInit{
    isLoading = true;
    data: any[];

    constructor(private gameService : GameService) {
    }    

    ngOnInit() {
        this.data = this.gameService.getItems();
        this.isLoading = false;
    }
}