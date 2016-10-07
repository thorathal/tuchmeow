import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <div class="space"></div>
        <iframe width="99.5%" height="65%" src="https://www.youtube.com/embed/<insert-youtube-video-id-here>" frameborder="0" allowfullscreen></iframe>
    `,
    styles: [`
        .space {
            height: 8%;
        }
    `]
})
export class PlayerComponent implements OnInit{
    isLoading = true;
    
    constructor(private _routeParams: RouteParams) {
    }    
    
    ngOnInit() {
        
    }
}