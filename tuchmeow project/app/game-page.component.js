System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Observable', 'rxjs/add/observable/forkJoin', './youtube.service', './game.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, Observable_1, youtube_service_1, game_service_1;
    var GamePageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (youtube_service_1_1) {
                youtube_service_1 = youtube_service_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            }],
        execute: function() {
            GamePageComponent = (function () {
                function GamePageComponent(_gameService, _youtubeService, _routeParams) {
                    this._gameService = _gameService;
                    this._youtubeService = _youtubeService;
                    this._routeParams = _routeParams;
                    this.isLoading = true;
                    this.gameSelected = false;
                    this.channelSelected = false;
                }
                GamePageComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // get data on games
                    this.games = this._gameService.getItems();
                    this.isLoading = false;
                    // If channel and game has been chosen.Get video data from the channel.
                    var game = this._routeParams.get('game');
                    var channel = this._routeParams.get('channel');
                    if (channel) {
                        console.log("Trying to load Videos; Params- Game: " + game + ",  Channel:" + channel);
                        this.isLoading = true;
                        this.gameSelected = true;
                        this.channelSelected = true;
                        Observable_1.Observable.forkJoin([
                            this._youtubeService.getChannels(game),
                            this._youtubeService.getVideos(channel)
                        ])
                            .subscribe(function (res) {
                            console.log("Channels and Videos Successfully loaded: " + res[0] + res[1]);
                            _this.games = res[0];
                            _this.videos = res[1];
                        }, null, function () { _this.isLoading = false; });
                    }
                    else 
                    // If only a game has been chosen. Get data 'our' list of channels on the game.
                    if (game) {
                        this.isLoading = true;
                        this.gameSelected = true;
                        console.log("Trying to load Channels; Params- Game:" + game);
                        this._youtubeService.getChannels(game)
                            .subscribe(function (res) {
                            console.log("Channels succesfully loaded, title of first channel: " + res.items[0].snippet.title + " /n Array length is " + res.items.length);
                            _this.channels = res.items;
                        }, null, function () { _this.isLoading = false; });
                    }
                    //        Observable.forkJoin( this._streamerService.getItems() )
                    //                        .subscribe(
                    //                            res => this.streamers = res,
                    //                            null,
                    //                            () => { this.isLoading = false; } );
                    console.log(this._routeParams.get('game') + this._routeParams.get('channel'));
                };
                GamePageComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>\n        \n        <nav class=\"navbar\">\n            <ul class=\"wrapper large\" *ngFor=\"#game of games\">\n                <li id=\"{{ game.id }}\" [routerLink]=\"['Game', { game: game.id }]\">\n                    <form class=\"navbar-form\">\n                        <a class=\"\"><img class=\" cell media-object\" src=\"{{ game.imageUrl }}\"></a>\n                    </form>\n                </li>\n            </ul>\n        </nav>\n        \n        \n        <div *ngIf='gameSelected'>\n            <nav class=\"navbar\">\n                <ul class=\"navbar wrapper small\" *ngFor=\"#channel of channels; #i = index\">\n                    <li class=\"cell\" [routerLink]=\"['Channel', { game: games[i].id, channel: channel.id }]\">\n                        <a><img class=\"media-object\" src=\"{{ channel.snippet.thumbnails.medium }}\"></a>\n                    </li>\n                </ul>\n            </nav>\n        </div>   \n        \n        <h2>Streamers</h2>\n        <div *ngIf=\"channels\" style=\"background-color: pink;\">{{ channels[0].snippet.title }}</div>\n        <br/>\n        <br/>\n         ",
                        styleUrls: ['app/game-page.component.css'],
                        providers: [game_service_1.GameService, youtube_service_1.YoutubeService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [game_service_1.GameService, youtube_service_1.YoutubeService, router_1.RouteParams])
                ], GamePageComponent);
                return GamePageComponent;
            }());
            exports_1("GamePageComponent", GamePageComponent);
        }
    }
});
//# sourceMappingURL=game-page.component.js.map