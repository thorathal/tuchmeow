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
                    // The Youtube API Key, required for accessing data from the API.
                    this.API_KEY = "&key=AIzaSyCuHiuUWDnn68G5bNCk1VxJm7UWKpbD1FU";
                    /***********************
                     *  getChannels Method
                     */
                    // Base of the URL "get request" to the youtube API, search on general channel data: Title, 
                    // description, ect. Keyword is the channel ID
                    this.CHANNELDATA_BASE_URL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=";
                    // specify even more what information you want. Here: channel ID, title and description.
                    this.CHANNELDATA_FIELDS = "&fields=items(id%2Csnippet(title%2Cdescription%2Cthumbnails))";
                    // channel ID's for (manual lookup):
                    // The channels for each game - identified by the channelIDs
                    this.channelIDs = {
                        "CSGO": 'UCayBk2oaTaiUw1Z4r_VKuAg' + '%2C' +
                            'UCnD-frIn-2URPLnDWNN6UsQ' + '%2C' +
                            'UCs3GloeEzu5rDlQlSLGrr4A' // SparklesProduction
                        ,
                        "DOTA2": 'UCAfhB2VCVnjiJ8FhcDYtFAQ' // UCAfhB2VCVnjiJ8FhcDYtFAQ
                        ,
                        "LOL": 'UCvqRdlKsE5Q8mf8YXbdIJLw' + '%2C' +
                            'UCdOWyp25T0HDtjpnV2LpIyw' + '%2C' +
                            'UCmIGYuRNVWJT7VsEMi4MXfA' // ReplaysLOLHighlights
                        ,
                        "HS": 'UCsQnAt5I56M-qx4OgCoVmeA' + '%2C' +
                            'UC-kezFAw46x-9ctBUqVe86Q' + '%2C' +
                            'UCeBMccz-PDZf6OB4aV6a3eA' // kripparrian
                        ,
                        "SC2": 'UCZNTsLA6t6bRoj-5QRmqt_w' + '%2C' +
                            'UCb-Rder8Hs869eVIJIzswBA' + '%2C' +
                            'UCTcMm4NJYBYXkpOfqXDaEFg' // UCTcMm4NJYBYXkpOfqXDaEFg
                    };
                    /*********************
                     *  getVideos Method
                     */
                    // Base of the URL "get request" to the youtube API, Search on channel videos, (newest videos) Keyword is the channel ID.
                    this.VIDEODATA_BASE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=";
                    // The number of videos that will be fetched
                    this.VIDEO_NUM = 15;
                    // Extension on the base URL. Specify number and order of videos, and specify information from fields. Here: 5 videos ordered by date, with videoId, title and thumbnails
                    this.VIDEODATA_FIELDS = "&maxResults=" + this.VIDEO_NUM + "&order=date&fields=items(id(videoId)%2Csnippet(title%2Cthumbnails(medium(url))))&type=video&q=";
                    // Will see if a video is relevant to the 'tag' set in the map, setting more then one tag will filter the search NOT expand it.
                    this.gameSearchKeys = {
                        "CSGO": "cs:go",
                        "DOTA2": "dota2",
                        "LOL": "league of legends",
                        "HS": "hearthstone",
                        "SC2": "starcraft"
                    };
                    // Search on specific videos and get their durations.
                    this.VIDEODURATION_BASE_URL = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=";
                    this.VIDEODURATION_FIELDS = "&fields=items(contentDetails(duration))";
                }
                /**
                 * Fetches the channels relevant to the game chosen from the google API.
                 * Input: gameType - string: 'CSGO', 'DOTA2', 'LOL', 'HS', 'SC2'.
                 * Output: Observable<Channel_Response>.
                 */
                YoutubeService.prototype.getChannels = function (gameType) {
                    var request = this.CHANNELDATA_BASE_URL + this.channelIDs[gameType] + this.CHANNELDATA_FIELDS + this.API_KEY;
                    return this._http.get(request)
                        .map(function (res) { return res.json(); });
                };
                /**
                 * Fetches the newest videos relevant to the channel and game chosen.
                 * Then fetches the durations for those videos.
                 */
                YoutubeService.prototype.getVideos = function (channelID, game) {
                    var request = this.VIDEODATA_BASE_URL + channelID + this.VIDEODATA_FIELDS + this.gameSearchKeys[game] + this.API_KEY;
                    console.log("Getting latest videos: " + request);
                    return this._http.get(request)
                        .map(function (res) { return res.json(); });
                };
                YoutubeService.prototype.getVideoDurations = function (videos) {
                    var ids = "";
                    for (var i = 0; i < this.VIDEO_NUM; i++) {
                        ids += videos[i].id.videoId;
                        if (i < videos.length - 1)
                            ids += "%2C";
                    }
                    var request = this.VIDEODURATION_BASE_URL + ids + this.VIDEODURATION_FIELDS + this.API_KEY;
                    var tmp = null;
                    return this._http.get(request)
                        .map(function (res) { return res.json(); });
                };
                /**
                 * 	Merging the two video responses from the youtube API so its easier to work with,
                 * 	and converting the video duration format into an easier to understand format.
                 */
                YoutubeService.prototype.mergeArrays = function (videos, durations) {
                    var videoDetails;
                    for (var i = 0; i < this.VIDEO_NUM; i++) {
                        var tmpDur = durations.items[i].contentDetails.duration;
                        tmpDur = tmpDur.replace("PT", "");
                        tmpDur = tmpDur.replace("H", ":");
                        tmpDur = tmpDur.replace("M", ":");
                        tmpDur = tmpDur.replace("S", "");
                        if (i == 0) {
                            videoDetails = [{
                                    "id": videos[i].id.videoId,
                                    "title": videos[i].snippet.title,
                                    "thumbnailUrl": videos[i].snippet.thumbnails.medium.url,
                                    "duration": tmpDur
                                }];
                        }
                        else {
                            videoDetails.push({
                                "id": videos[i].id.videoId,
                                "title": videos[i].snippet.title,
                                "thumbnailUrl": videos[i].snippet.thumbnails.medium.url,
                                "duration": tmpDur
                            });
                        }
                    }
                    return videoDetails;
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
//# sourceMappingURL=youtube.service.js.map