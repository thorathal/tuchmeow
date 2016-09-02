import {Component} from 'angular2/core';


@Component({
    selector: 'yt-video',
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>

    `,
    styles: [`

    `],
})
export class YTVideoComponent {
    isLoading = true;

    constructor(
        private _routeParams: RouteParams) {
    }
    
    ngOnInit(){
        this.isLoading = false;
    }
}