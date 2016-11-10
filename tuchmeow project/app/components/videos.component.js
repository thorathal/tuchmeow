System.register(['angular2/core', 'angular2/http', 'angular2/router', '../services/youtube.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, youtube_service_1;
    var VideosComponent;
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
            function (youtube_service_1_1) {
                youtube_service_1 = youtube_service_1_1;
            }],
        execute: function() {
            VideosComponent = (function () {
                function VideosComponent(_youtubeService, _routeParams) {
                    this._youtubeService = _youtubeService;
                    this._routeParams = _routeParams;
                    this.isLoading = true;
                }
                VideosComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    // Loads the videos from the selected channel, that also fit the game selected.
                    this._youtubeService.getVideos(this._routeParams.get('channelid'), this._routeParams.get('game'))
                        .subscribe(function (videos) {
                        _this._youtubeService.getVideoDurations(videos)
                            .subscribe(function (durations) { return _this.videos = _this._youtubeService.mergeArrays(videos, durations); }, function (err) { return console.log(err); }, function () { return _this.isLoading = false; });
                    });
                };
                VideosComponent = __decorate([
                    core_1.Component({
                        selector: 'videos',
                        template: "\n        <div class=\"video-area\">\n            <h2>Videos</h2>\n            \n            <div *ngIf=\"isLoading\">\n                <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n            </div>\n            \n            <!-- Setup the video suggestions for the selected channel -->\n             <ul class=\"videos\" *ngFor=\"#video of videos\">\n                <li>\n                    <div class=\"lockup\">\n                        <a area-hidden=\"true\" [routerLink]=\"['Video', { game: _routeParams.get('game'), channelid: _routeParams.get('channelid'), videoid: video.id }]\">\n                            <img class=\"media-object\" src=\"{{ video.thumbnailUrl }}\">\n                            <span class=\"video-time\" aria-hidden=\"true\">\n                                {{ video.duration }}\n                            </span>\n                        </a>\n                    </div>\n                    <div class=\"textwrap\">\n                        <a title=\"{{ video.title }}\" [routerLink]=\"['Video', { game: _routeParams.get('game'), channelid: _routeParams.get('channelid'), videoid: video.id }]\">\n                            <b>{{ video.title }}</b>\n                        </a>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    ",
                        styleUrls: ['app/css/page-styling.css'],
                        providers: [youtube_service_1.YoutubeService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [youtube_service_1.YoutubeService, router_1.RouteParams])
                ], VideosComponent);
                return VideosComponent;
            }());
            exports_1("VideosComponent", VideosComponent);
        }
    }
});
//# sourceMappingURL=videos.component.js.map