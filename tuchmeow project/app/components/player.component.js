/**
 * @author Bjarke Carlsen
 */
System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var PlayerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PlayerComponent = (function () {
                function PlayerComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                PlayerComponent = __decorate([
                    core_1.Component({
                        selector: 'player',
                        template: "\n        <div style=\"text-align: center\">\n            \n            <!-- The Youtube video-player \"frame\" --> \n            <iframe class=\"player\" width=\"80%\" height=\"62%\" \n                    src=\"https://www.youtube.com/embed/{{ _routeParams.get('videoid') }}\" \n                    frameborder=\"0\" allowfullscreen>\n            </iframe>\n            \n        </div>\n    ",
                        styleUrls: ['app/css/page-styling.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], PlayerComponent);
                return PlayerComponent;
            }());
            exports_1("PlayerComponent", PlayerComponent);
        }
    }
});
//# sourceMappingURL=player.component.js.map