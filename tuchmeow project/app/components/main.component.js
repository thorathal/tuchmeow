/**
 * @author Bjarke Carlsen
 */
System.register(['angular2/core', 'angular2/router', './games.component', './channels.component', './videos.component', './player.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, games_component_1, channels_component_1, videos_component_1, player_component_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (games_component_1_1) {
                games_component_1 = games_component_1_1;
            },
            function (channels_component_1_1) {
                channels_component_1 = channels_component_1_1;
            },
            function (videos_component_1_1) {
                videos_component_1 = videos_component_1_1;
            },
            function (player_component_1_1) {
                player_component_1 = player_component_1_1;
            }],
        execute: function() {
            MainComponent = (function () {
                function MainComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        template: "\n        <div class=\"body\">\n    \t\t<games></games>\n    \n            <!-- If a game has been selected, show the channels -->\n    \t\t<div *ngIf=\"_routeParams.get('game')\">\n    \t\t\t<channels></channels>\n    \t\t</div>\n            \n            <br/>\n            <br/>\n            \n            <!-- If a channel but not a video has been a selected, show videos -->\n    \t\t<div *ngIf=\"_routeParams.get('channelid') && !_routeParams.get('videoid')\">\n    \t\t\t<videos></videos>\n    \t\t</div>\n    \n            <!-- If a video has been selected, show the videoplayer -->\n    \t\t<div *ngIf=\"_routeParams.get('videoid')\">\n    \t\t\t<player></player>\n    \t\t</div>\n\t\t</div>\n    ",
                        styleUrls: ['app/css/page-styling.css'],
                        directives: [
                            games_component_1.GamesComponent,
                            channels_component_1.ChannelsComponent,
                            videos_component_1.VideosComponent,
                            player_component_1.PlayerComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
        }
    }
});
//# sourceMappingURL=main.component.js.map