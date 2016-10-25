import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {GamesComponent} from './games.component';
import {ChannelsComponent} from './channels.component';
import {VideosComponent} from './videos.component';
import {PlayerComponent} from './player.component';

@Component({
    selector: 'main',
    template: `
		<games></games>

		<div *ngIf="_routeParams.get('game')">
			<channels></channels>
		</div>

		<div *ngIf="_routeParams.get('channelid') && !_routeParams.get('videoid')">
			<videos></videos>
		</div>

		<div *ngIf="_routeParams.get('videoid')">
			<player></player>
		</div>
    `,
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