System.register(['angular2/core', 'angular2/http', 'angular2/router', '../services/game.service'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, game_service_1;
    var GamesComponent;
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
            function (game_service_1_1) {
                game_service_1 = game_service_1_1;
            }],
        execute: function() {
            GamesComponent = (function () {
                function GamesComponent(_gameService) {
                    this._gameService = _gameService;
                    this.isLoading = true;
                }
                GamesComponent.prototype.ngOnInit = function () {
                    // get data on games
                    this.games = this._gameService.getItems();
                    this.isLoading = false;
                };
                GamesComponent = __decorate([
                    core_1.Component({
                        selector: 'games',
                        template: "\n        <div *ngIf=\"isLoading\">\n            <i class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        </div>\n\n        <!-- Setup a menu/row of games -->\n        <ul class=\"games\" *ngFor=\"#game of games\">\n            <li [routerLink]=\"['Game', { game: game.id }]\">\n                <a title=\"{{ game.name }}\">\n                    <img class=\" cell media-object\" src=\"{{ game.imageUrl }}\">\n                </a>\n            </li>\n        </ul>\n    \t",
                        styleUrls: ['app/css/page-styling.css'],
                        providers: [game_service_1.GameService, http_1.HTTP_PROVIDERS],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [game_service_1.GameService])
                ], GamesComponent);
                return GamesComponent;
            }());
            exports_1("GamesComponent", GamesComponent);
        }
    }
});
//# sourceMappingURL=games.component.js.map