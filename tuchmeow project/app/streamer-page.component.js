System.register(['angular2/core', 'angular2/router', 'angular2/http', './streamer.service', './game-menu.component', './video-suggestions.component'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, streamer_service_1, game_menu_component_1, video_suggestions_component_1;
    var StreamerPageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (streamer_service_1_1) {
                streamer_service_1 = streamer_service_1_1;
            },
            function (game_menu_component_1_1) {
                game_menu_component_1 = game_menu_component_1_1;
            },
            function (video_suggestions_component_1_1) {
                video_suggestions_component_1 = video_suggestions_component_1_1;
            }],
        execute: function() {
            StreamerPageComponent = (function () {
                function StreamerPageComponent(_streamerService, _routeParams) {
                    this._streamerService = _streamerService;
                    this._routeParams = _routeParams;
                    this.isLoading = true;
                }
                StreamerPageComponent.prototype.ngOnInit = function () {
                    this._routeParams.get('id');
                    this.streamers = this._streamerService.getItems();
                    this.isLoading = false;
                };
                StreamerPageComponent = __decorate([
                    core_1.Component({
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>\n        <game-menu></game-menu>\n        <div class=\"space\"></div>\n        <video-suggestions></video-suggestions>\n    ",
                        styles: ["\n        .space {\n            height: 10%;\n        }\n    "],
                        providers: [streamer_service_1.StreamerService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES, game_menu_component_1.GameMenuComponent, video_suggestions_component_1.VideoSuggestionsComponent]
                    }), 
                    __metadata('design:paramtypes', [streamer_service_1.StreamerService, router_1.RouteParams])
                ], StreamerPageComponent);
                return StreamerPageComponent;
            }());
            exports_1("StreamerPageComponent", StreamerPageComponent);
        }
    }
});
//# sourceMappingURL=streamer-page.component.js.map