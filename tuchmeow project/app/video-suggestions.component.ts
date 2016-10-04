import {Component, Input, OnInit} from 'angular2/core';
import {VideoService} from './video.service';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({ // [routerLink]="['Game', { id: data.url }]"
    selector: 'video-suggestions',
    template: `
        Video Suggestions <br/>
        <div id="wrapper" class="wrapper" *ngFor="#data of data">
            <div [routerLink]="['Video'], {game: "hs", streamer: "trumpsc", videoid: "D5EiqCCFFgM"}" class="cell">
            <img class="media-object" src="{{ ytThumbnailStart + data.id + ytThumbnailEnd }}">
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
    providers: [VideoService],
    directives: [ROUTER_DIRECTIVES]
})
export class VideoSuggestionsComponent implements OnInit {
    isLoading = true;
    data: any[];
    ytThumbnailStart = 'http://img.youtube.com/vi/';
    ytThumbnailEnd = '/0.jpg';

    constructor(private videoService : VideoService) {
    }    

    ngOnInit() {
        this.data = this.videoService.getItems();
        this.isLoading = false;
    }
}