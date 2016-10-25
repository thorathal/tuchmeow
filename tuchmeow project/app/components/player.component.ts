import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'player',
    template: `
        <div style="text-align: center">

            <iframe width="80%" height="62%" src="https://www.youtube.com/embed/{{ _routeParams.get('videoid') }}" frameborder="0" allowfullscreen>
            </iframe>

        </div>
    `
})
export class PlayerComponent {

    constructor(private _routeParams: RouteParams) {
    }
}