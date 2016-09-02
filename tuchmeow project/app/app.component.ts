import {Component} from 'angular2/core';
import {GamePageComponent} from './game-page.component';
import {StreamerPageComponent} from './streamer-page.component';
import {VideoPageComponent} from './video-page.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

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
    { path: '/games', name: 'Games', component: GamePageComponent, useAsDefault: true },
    { path: '/games/:id', name: 'Game', component: StreamerPageComponent },
    { path: '/video', name: 'Video', component: VideoPageComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Games'] }
])
export class AppComponent { }