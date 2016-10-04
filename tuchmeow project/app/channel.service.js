System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var YoutubeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            YoutubeService = (function () {
                function YoutubeService(_http) {
                    this._http = _http;
                    // Search on general channel data: Title, description, ect. Keyword is the channel ID
                    this.CHANNELDATA_BASE_URL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=";
                    // specify even more what information you want. Here: channel ID, title and description.
                    this.CHANNELDATA_FIELDS = "&fields=items(id%2Csnippet(title%2Cdescription%2Cthumbnails))";
                    // channel ID's for (manual lookup):
                    this.hearthstoneChannelIDs = 'UCsQnAt5I56M-qx4OgCoVmeA' + '%2C' +
                        'UC-kezFAw46x-9ctBUqVe86Q' + '%2C' +
                        'UCeBMccz-PDZf6OB4aV6a3eA' // kripparrian
                    ;
                    // Search on channel videos, (newest videos) Keyword is the channel ID.
                    this.VIDEODATA_BASE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=";
                    // Specify number and order of videos, and specify information from fields. Here: 5 videos ordered by date, with videoId, title and thumbnails
                    this.VIDEODATA_FIELDS = "&maxResults=5&order=date&fields=items(id(videoId)%2Csnippet(title%2Cthumbnails))&key=";
                    // Search on channel playlists
                    // https://developers.google.com/apis-explorer/#search/youtube/youtube/v3/youtube.playlists.list
                    // The Youtube API Key, required for accessing data from the API.
                    this.API_KEY = "&key=AIzaSyCuHiuUWDnn68G5bNCk1VxJm7UWKpbD1FU";
                }
                YoutubeService.prototype.getChannels = function (gameType) {
                    var channels = "";
                    switch (gameType) {
                        case 'CSGO':
                            break;
                        case 'DOTA2':
                            break;
                        case 'LOL':
                            break;
                        case 'HS':
                            var request = this.CHANNELDATA_BASE_URL + this.hearthstoneChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
                            console.log(request);
                            break;
                    }
                    return this._http.get(request)
                        .map(function (res) { return res.json(); });
                };
                YoutubeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], YoutubeService);
                return YoutubeService;
            }());
            exports_1("YoutubeService", YoutubeService);
        }
    }
});
//# sourceMappingURL=channel.service.js.map