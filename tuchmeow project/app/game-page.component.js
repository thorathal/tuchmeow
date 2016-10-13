System.register(['angular2/core', 'angular2/http', 'angular2/router', 'rxjs/Observable', 'rxjs/add/observable/forkJoin', 'rxjs/add/operator/delay', './services/youtube.service', './services/game.service'], function(exports_1, context_1) {
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
            function (_2) {},
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
                    // If channel and game has been chosen.Get video data from the channel. Will be moved to video.component
                    this.currentGame = this._routeParams.get('game');
                    this.currentChannel = this._routeParams.get('channelid');
                    if (this.currentChannel) {
                        this.isLoading = true;
                        this.gameSelected = true;
                        this.channelSelected = true;
                        Observable_1.Observable.forkJoin([
                            this._youtubeService.getChannels(this.currentGame),
                            this._youtubeService.getVideos(this.currentChannel, this.currentGame)
                        ])
                            .subscribe(function (res) {
                            _this.channels = res[0].items;
                            _this.videos = _this._youtubeService.getVideoDurations(res[1].items);
                        }, function (err) {
                            _this.isLoading = false;
                            console.log(err);
                        }, function () {
                            _this.isLoading = false;
                        });
                    }
                    else 
                    // If only a game has been chosen. Get data 'our' list of channels on the game. Will be moved to channel.component
                    if (this.currentGame) {
                        this.isLoading = true;
                        this.gameSelected = true;
                        this._youtubeService.getChannels(this.currentGame)
                            .subscribe(function (res) { return _this.channels = res.items; }, function (err) {
                            console.error(err);
                            _this.isLoading = false;
                        }, function () { return _this.isLoading = false; });
                    }
                };
                GamePageComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>    \n        <ul class=\"games\" *ngFor=\"#game of games\">\n            <li [routerLink]=\"['Game', { game: game.id }]\">\n                <a title=\"{{ game.name }}\">\n                    <img class=\" cell media-object\" src=\"{{ game.imageUrl }}\">\n                </a>\n            </li>\n        </ul>\n        \n        \n        <!-- Will be moved to its own component: channel.component -->\n        <div *ngIf=\"gameSelected\">\n            \n            <ul class=\"channels\" *ngFor=\"#channel of channels\">\n                <li class=\"lockup\">\n                    <a title=\"{{ channel.snippet.description }}\" [routerLink]=\"['Channel', { game: currentGame, channelid: channel.id }]\">\n                        <img class=\"media-object\" src=\"{{ channel.snippet.thumbnails.medium.url }}\">\n                        <span class=\"video-time\" aria-hidden=\"true\"> \n                            {{ channel.snippet.title }}\n                        </span>\n                    </a>\n                </li>\n            </ul>\n            \n        </div>\n        <br/>\n        \n        <!-- Will be moved to its own component: videos.component -->\n        <div class=\"video-area\" *ngIf=\"channelSelected\">\n            <h2>Videos</h2>\n            \n            <ul class=\"videos\" *ngFor=\"#video of videos\">\n                <li>\n                    <div class=\"lockup\">\n                        <a area-hidden=\"true\" [routerLink]=\"['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]\">   \n                            <img class=\"media-object\" src=\"{{ video.snippet.thumbnails.medium.url }}\">\n                            <span class=\"video-time\" aria-hidden=\"true\"> \n                                {{ video.id.videoId }}\n                            </span>\n                        </a>    \n                    </div>\n                    <div class=\"textwrap\">\n                            <a title=\"{{ video.snippet.title }}\" [routerLink]=\"['Video', { game: currentGame, channelid: currentChannel, videoid: video.id.videoId }]\">\n                                    <b>{{ video.snippet.title }}</b>\n                            </a>\n                    </div>\n                </li>\n            </ul>\n           \n        </div>\n        <br/>\n        <br/>\n            \n         ",
                        styleUrls: ['app/css/game-page.component.css'],
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