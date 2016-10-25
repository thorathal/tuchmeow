import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MainComponent} from './components/main.component';

@Component({
    selector: 'my-app',
    template: `
        
        <router-outlet></router-outlet>
        
    `,
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