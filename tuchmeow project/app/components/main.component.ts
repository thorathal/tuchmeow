import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {GamesComponent} from './games.component';
import {ChannelsComponent} from './channels.component';
import {VideosComponent} from './videos.component';
import {PlayerComponent} from './player.component';

@Component({
    selector: 'main',
    template: `
        <div class="body">
    		<games></games>
    
            <!-- If a game has been selected, show the channels -->
    		<div *ngIf="_routeParams.get('game')">
    			<channels></channels>
    		</div>
            
            <br/>
            <br/>
            
            <!-- If a channel but not a video has been a selected, show videos -->
    		<div *ngIf="_routeParams.get('channelid') && !_routeParams.get('videoid')">
    			<videos></videos>
    		</div>
    
            <!-- If a video has been selected, show the videoplayer -->
    		<div *ngIf="_routeParams.get('videoid')">
    			<player></player>
    		</div>
		</div>
    `,
    styleUrls: ['app/css/page-styling.css'],
	directives: [
        GamesComponent,
        ChannelsComponent,
        VideosComponent,
        PlayerComponent
    ]
})
export class MainComponent {

    constructor(private _routeParams: RouteParams) {
    }
}