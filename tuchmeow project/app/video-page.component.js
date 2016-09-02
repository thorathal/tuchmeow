System.register(['angular2/core', 'angular2/router', './game-menu.component', './video.service'], function(exports_1, context_1) {
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
    var core_1, router_1, game_menu_component_1, video_service_1;
    var VideoPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_menu_component_1_1) {
                game_menu_component_1 = game_menu_component_1_1;
            },
            function (video_service_1_1) {
                video_service_1 = video_service_1_1;
            }],
        execute: function() {
            /**
             *  Youtube API
             *
             *  VIDEO THUMBNAIL :   http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
             *                      http://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg
             *                      http://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg
             *                      http://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg
             *                      http://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
             *  VIDEO LINK :        https://www.youtube.com/watch?v=<insert-youtube-video-id-here>
             *  VIDEO STREAMER :    <iframe width="560" height="315" src="https://www.youtube.com/embed/<insert-youtube-video-id-here>" frameborder="0" allowfullscreen></iframe>
             *
             *  VIDEO INFORMATION : http://youtube.com/get_video_info?video_id=<insert-youtube-video-id-here>
             *  $content = file_get_contents("http://youtube.com/get_video_info?video_id=".$id);
             *   parse_str($content, $ytarr);
             *   echo $ytarr['title'];
             *
             *  KEY: https://developers.google.com/youtube/v3/
             */
            VideoPageComponent = (function () {
                function VideoPageComponent() {
                }
                VideoPageComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>\n        <game-menu></game-menu>\n        <div class=\"space\"></div>\n        <iframe width=\"99.5%\" height=\"65%\" src=\"https://www.youtube.com/embed/<insert-youtube-video-id-here>\" frameborder=\"0\" allowfullscreen></iframe>\n    ",
                        styles: ["\n        .space {\n            height: 8%;\n        }\n    "],
                        directives: [router_1.ROUTER_DIRECTIVES, game_menu_component_1.GameMenuComponent],
                        providers: [video_service_1.VideoService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], VideoPageComponent);
                return VideoPageComponent;
            }());
            exports_1("VideoPageComponent", VideoPageComponent);
        }
    }
});
//# sourceMappingURL=video-page.component.js.map