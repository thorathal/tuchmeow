System.register(['angular2/core', 'angular2/router', './youtube.service'], function(exports_1, context_1) {
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
    var core_1, router_1, youtube_service_1;
    var VideoSuggestionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (youtube_service_1_1) {
                youtube_service_1 = youtube_service_1_1;
            }],
        execute: function() {
            VideoSuggestionsComponent = (function () {
                function VideoSuggestionsComponent(_youtubeService) {
                    this._youtubeService = _youtubeService;
                    this.isLoading = true;
                }
                VideoSuggestionsComponent.prototype.ngOnInit = function () {
                };
                VideoSuggestionsComponent = __decorate([
                    core_1.Component({
                        selector: 'videos',
                        template: "\n        \n    ",
                        providers: [YouTubeService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof youtube_service_1.YoutubeService !== 'undefined' && youtube_service_1.YoutubeService) === 'function' && _a) || Object])
                ], VideoSuggestionsComponent);
                return VideoSuggestionsComponent;
                var _a;
            }());
            exports_1("VideoSuggestionsComponent", VideoSuggestionsComponent);
        }
    }
});
//# sourceMappingURL=videos.component.js.map