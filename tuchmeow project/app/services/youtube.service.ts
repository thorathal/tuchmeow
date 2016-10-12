import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {Channel_Response} from '../interfaces/channel_response';
import {Video_Data} from '../interfaces/video_data';
import {Video_Durations} from '../interfaces/video_durations';

@Injectable()
export class YoutubeService {

    // The Youtube API Key, required for accessing data from the API.
    private API_KEY = "&key=AIzaSyCuHiuUWDnn68G5bNCk1VxJm7UWKpbD1FU";
    
    constructor(private _http: Http) {}

    
    
    
    /***********************
     *  getChannels Method
     */
    
    // Base of the URL "get request" to the youtube API, search on general channel data: Title, 
    // description, ect. Keyword is the channel ID
    private CHANNELDATA_BASE_URL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=";
    // specify even more what information you want. Here: channel ID, title and description.
    private CHANNELDATA_FIELDS = "&fields=items(id%2Csnippet(title%2Cdescription%2Cthumbnails))"; 
    // channel ID's for (manual lookup):
    

    // The channels for each game - identified by the channelIDs
    private channelIDs: { [id: string]: string } = {
            "CSGO" : 
                'UCayBk2oaTaiUw1Z4r_VKuAg' + '%2C' +    // moetv1337
                'UCnD-frIn-2URPLnDWNN6UsQ' + '%2C' +    // UCnD-frIn-2URPLnDWNN6UsQ
                'UCs3GloeEzu5rDlQlSLGrr4A'              // SparklesProduction
            ,
            "DOTA2" : 
                'UCAfhB2VCVnjiJ8FhcDYtFAQ'              // UCAfhB2VCVnjiJ8FhcDYtFAQ
            ,
            "LOL" : 
                'UCvqRdlKsE5Q8mf8YXbdIJLw' + '%2C' +    // LoLChampSeries
                'UCdOWyp25T0HDtjpnV2LpIyw' + '%2C' +    // EpicSkillshot
                'UCmIGYuRNVWJT7VsEMi4MXfA'              // ReplaysLOLHighlights
            ,
            "HS" : 
                'UCsQnAt5I56M-qx4OgCoVmeA' + '%2C' +    // trumpsc
                'UC-kezFAw46x-9ctBUqVe86Q' + '%2C' +    // amazhs
                'UCeBMccz-PDZf6OB4aV6a3eA'              // kripparrian
            ,
            "SC2" : 
                'UCZNTsLA6t6bRoj-5QRmqt_w' + '%2C' +    // Felixje0
                'UCb-Rder8Hs869eVIJIzswBA' + '%2C' +    // UCb-Rder8Hs869eVIJIzswBA
                'UCTcMm4NJYBYXkpOfqXDaEFg'              // UCTcMm4NJYBYXkpOfqXDaEFg
    };
    
    
    /**
     * Fetches the channels relevant to the game chosen from the google API.
     * Input: gameType - string: 'CSGO', 'DOTA2', 'LOL', 'HS', 'SC2'.
     * Output: Observable<Channel_Response>.
     */
    getChannels(gameType: string) : Observable<Channel_Response> {
        var request = this.CHANNELDATA_BASE_URL + this.channelIDs[gameType] + this.CHANNELDATA_FIELDS + this.API_KEY;
        return this._http.get(request)
                .map(res => res.json());
    }
    
    
    
    
    /*********************
     *  getVideos Method  
     */
    
    // Base of the URL "get request" to the youtube API, Search on channel videos, (newest videos) Keyword is the channel ID.
    private VIDEODATA_BASE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=";
    // Extension on the base URL. Specify number and order of videos, and specify information from fields. Here: 5 videos ordered by date, with videoId, title and thumbnails
    private VIDEODATA_FIELDS = "&maxResults=15&order=date&fields=items(id(videoId)%2Csnippet(title%2Cthumbnails(medium(url))))&type=video&q=";
    
    // Will see if a video is relevant to the 'tag' set in the map, setting more then one tag will filter the search NOT expand it.
    private gameSearchKeys: { [id: string]: string } = {
            "CSGO" : "cs:go",
            "DOTA2" : "dota2",
            "LOL" : "league of legends",
            "HS" : "hearthstone",
            "SC2" : "starcraft"
    };
    
    /**
     * Fetches the newest videos relevant to the channel and game chosen.
     * Then fetches the durations for those videos.
     */
    getVideos(channelID : string, game : string) {
        var request = this.VIDEODATA_BASE_URL + channelID + this.VIDEODATA_FIELDS + this.gameSearchKeys[game] + this.API_KEY;
        console.log("Getting latest videos: " + request);
        return this._http.get(request)
                .map(res => res.json())
                .subscribe(
                        res => { return this.getVideoDurations(res); }
                    );  
    }
    
    
    
    
    /*****************************
     *  getVideoDurations Method
     */
    
    // Search on specific videos and get their durations.
    private VIDEODURATION_BASE_URL = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails";
    private VIDEODURATION_FIELDS = "&fields=items(contentDetails(duration))";
    
    getVideoDurations(videos) {
        var ids = "";
        for(let i=0; i < videos.items.length; i++) {
            ids += videos.items[i];
            if(i < videos.items.length-1) 
                ids += "%2C";
        }
        var request = this.VIDEODURATION_BASE_URL + ids + this.VIDEODURATION_FIELDS + this.API_KEY;
        this._http.get(request)
                .map(res => res.json())
                .subscribe(
                        res => { return this.mergeArrays(videos, res); }
                    );
    }
    
    mergeArrays(videos : Video_Data, durations : Video_Durations) {
        
        return Observable.of({
            "items": [
                      {
                       "id": {
                        "videoId": "QXJ8VYpUvvU"
                       },
                       "snippet": {
                        "title": "Hearthstone: Trump Never Renounces His Renounce Deck (Warlock Standard)",
                        "thumbnails": {
                         "medium": {
                          "url": "https://i.ytimg.com/vi/QXJ8VYpUvvU/mqdefault.jpg"
                         }
                        }
                       }
                      },
                      {
                       "id": {
                        "videoId": "3pW0qlzxfPQ"
                       },
                       "snippet": {
                        "title": "Hearthstone: Trump Cards - 350 - 2 Guys 1 Tyrande Feat. Vlps - Part 1 (Priest Arena)",
                        "thumbnails": {
                         "medium": {
                          "url": "https://i.ytimg.com/vi/3pW0qlzxfPQ/mqdefault.jpg"
                         }
                        }
                       }
                      },
                      {
                       "id": {
                        "videoId": "-c0aRyF_jZ4"
                       },
                       "snippet": {
                        "title": "Hearthstone: Tyrande vs Tyrande Showmatch Feat. Vlps",
                        "thumbnails": {
                         "medium": {
                          "url": "https://i.ytimg.com/vi/-c0aRyF_jZ4/mqdefault.jpg"
                         }
                        }
                       }
                      },
                      {
                       "id": {
                        "videoId": "fGo7g39B5WY"
                       },
                       "snippet": {
                        "title": "Hearthstone: The Undefeatable Chess Genius? (Tavern Brawl)",
                        "thumbnails": {
                         "medium": {
                          "url": "https://i.ytimg.com/vi/fGo7g39B5WY/mqdefault.jpg"
                         }
                        }
                       }
                      },
                      {
                       "id": {
                        "videoId": "dWQi0j0v4Ug"
                       },
                       "snippet": {
                        "title": "Hearthstone: Trump Cards - 349 - The Incredible Deck of a Thousand Draws - Part 2 (Warlock Arena)",
                        "thumbnails": {
                         "medium": {
                          "url": "https://i.ytimg.com/vi/dWQi0j0v4Ug/mqdefault.jpg"
                         }
                        }
                       }
                      }
                     ]
                    }).map(res => res.json());
    }
}