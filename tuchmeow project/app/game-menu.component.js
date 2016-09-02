System.register(['angular2/core', 'angular2/router', './game.service', './streamer.service'], function(exports_1, context_1) {
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
    var core_1, router_1, game_service_1, streamer_service_1;
    var GameMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            },
            function (streamer_service_1_1) {
                streamer_service_1 = streamer_service_1_1;
            }],
        execute: function() {
            GameMenuComponent = (function () {
                function GameMenuComponent(gameService, streamerService) {
                    this.gameService = gameService;
                    this.streamerService = streamerService;
                    this.isLoading = true;
                }
                GameMenuComponent.prototype.ngOnInit = function () {
                    this.games = this.gameService.getItems();
                    this.streamers = this.streamerService.getItems();
                    this.isLoading = false;
                };
                GameMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'game-menu',
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>\n\n        <div id=\"wrapper\" class=\"wrapper game\" *ngFor=\"#game of games\">\n            <div [routerLink]=\"['Game', { id: game.id }]\" class=\"cell\">\n            <img class=\"media-object\" src=\"{{ game.imageUrl }}\">\n            </div>\n            <p class=\"hovertext\">{{ game.name }}</p>\n        </div>\n        <div class=\"space\"></div>\n        <div id=\"wrapper\" class=\"wrapper streamer\" *ngFor=\"#streamer of streamers\">\n            <div [routerLink]=\"['Video']\" class=\"cell\">\n            <img class=\"media-object\" src=\"{{ streamer.imageUrl }}\">\n            </div>\n            <p class=\"hovertext\">{{ streamer.name }}</p>\n        </div>\n    ",
                        styles: ["\n        .wrapper {\n            display:inline-block;\n            vertical-align:top;\n            padding-right: 10px;\n        }\n        .game {\n            width: 20%;\n            height: 10%;\n        }\n\n        .space {\n            height: 0.5%\n        }\n\n        .streamer {\n            width: 16.66%;\n            height: 8%;\n        }\n\n        #wrapper .hovertext {\n            width: 150px;\n            position:relative;\n            bottom:30px;\n            left:0px;\n            background-color: gray;\n            visibility:hidden;\n        }\n\n        #wrapper:hover .hovertext {\n            visibility:visible;\n        }\n\n        .media-object {\n            width: 100%;\n            height: 100%;\n            \n        }\n        .cell {\n            cursor: pointer;\n            border-radius: 5px;\n            border-style: outset;\n        }\n    "],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [game_service_1.GameService, streamer_service_1.StreamerService]
                    }), 
                    __metadata('design:paramtypes', [game_service_1.GameService, streamer_service_1.StreamerService])
                ], GameMenuComponent);
                return GameMenuComponent;
            }());
            exports_1("GameMenuComponent", GameMenuComponent);
        }
    }
});
//# sourceMappingURL=game-menu.component.js.map