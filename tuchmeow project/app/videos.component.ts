import {Component, Input, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {YoutubeService} from './youtube.service';

@Component({ // [routerLink]="['Game', { id: data.url }]"
    selector: 'videos',
    template: `
        
    `,
    providers: [YouTubeService],
    directives: [ROUTER_DIRECTIVES]
})
export class VideoSuggestionsComponent implements OnInit {
    isLoading = true;
    

    constructor(private _youtubeService : YoutubeService) {
    }    

    ngOnInit() {
        
    }
}