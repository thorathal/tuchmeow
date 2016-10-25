import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MainComponent} from './components/main.component';
import {GamePageComponent} from './game-page.component';

@Component({
    selector: 'my-app',
    template: `
        <div class="body">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [`
        .body {
            width: 90%;
            margin-left: auto;
            margin-right: auto;
            margin-top: 2%;
        }
    `],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/games', name: 'Games', component: MainComponent, useAsDefault: true },
    { path: '/games/:game', name: 'Game', component: MainComponent },
    { path: '/games/:game/:channelid', name: 'Channel', component: MainComponent },
    { path: '/games/:game/:channelid/:videoid', name: 'Video', component: MainComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Games'] }
])
export class AppComponent { }