System.register(['angular2/core', './video.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, video_service_1, router_1;
    var VideoSuggestionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (video_service_1_1) {
                video_service_1 = video_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            VideoSuggestionsComponent = (function () {
                function VideoSuggestionsComponent(videoService) {
                    this.videoService = videoService;
                    this.isLoading = true;
                    this.ytThumbnailStart = 'http://img.youtube.com/vi/';
                    this.ytThumbnailEnd = '/0.jpg';
                }
                VideoSuggestionsComponent.prototype.ngOnInit = function () {
                    this.data = this.videoService.getItems();
                    this.isLoading = false;
                };
                VideoSuggestionsComponent = __decorate([
                    core_1.Component({
                        selector: 'video-suggestions',
                        template: "\n        Video Suggestions <br/>\n        <div id=\"wrapper\" class=\"wrapper\" *ngFor=\"#data of data\">\n            <div [routerLink]=\"['Video'], {game: \"hs\", streamer: \"trumpsc\", videoid: \"D5EiqCCFFgM\"}\" class=\"cell\">\n            <img class=\"media-object\" src=\"{{ ytThumbnailStart + data.id + ytThumbnailEnd }}\">\n        </div>\n    ",
                        styles: ["\n        .wrapper {\n            display:inline-block;\n            vertical-align:top;\n            padding-right: 10px;\n            width: 20%;\n            height: 20%;\n        }\n\n        #wrapper .hovertext {\n            width: 150px;\n            position:relative;\n            bottom:30px;\n            left:0px;\n            background-color: gray;\n            visibility:hidden;\n        }\n\n        #wrapper:hover .hovertext {\n            visibility:visible;\n        }\n\n        .media-object {\n            width: 100%;\n            height: 100%;\n            \n        }\n        .cell {\n            cursor: pointer;\n            border-radius: 5px;\n            border-style: outset;\n        }\n    "],
                        providers: [video_service_1.VideoService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [video_service_1.VideoService])
                ], VideoSuggestionsComponent);
                return VideoSuggestionsComponent;
            }());
            exports_1("VideoSuggestionsComponent", VideoSuggestionsComponent);
        }
    }
});
//# sourceMappingURL=video-suggestions.component.js.map