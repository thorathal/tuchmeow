import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class YoutubeService {
    
    // Search on general channel data: Title, description, ect. Keyword is the channel ID
    private CHANNELDATA_BASE_URL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=";
    // specify even more what information you want. Here: channel ID, title and description.
    private CHANNELDATA_FIELDS = "&fields=items(id%2Csnippet(title%2Cdescription%2Cthumbnails))"; 
    // channel ID's for (manual lookup):
    private hearthstoneChannelIDs = 
             'UCsQnAt5I56M-qx4OgCoVmeA' + '%2C' + // trumpsc   
             'UC-kezFAw46x-9ctBUqVe86Q' + '%2C' + // amazhs 
             'UCeBMccz-PDZf6OB4aV6a3eA'           // kripparrian
             ;
    
    // Search on channel videos, (newest videos) Keyword is the channel ID.
    private VIDEODATA_BASE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=";
    // Specify number and order of videos, and specify information from fields. Here: 5 videos ordered by date, with videoId, title and thumbnails
    private VIDEODATA_FIELDS = "&maxResults=5&order=date&fields=items(id(videoId)%2Csnippet(title%2Cthumbnails))&key=";
    
    
    // Search on channel playlists
    // https://developers.google.com/apis-explorer/#search/youtube/youtube/v3/youtube.playlists.list
    
    // The Youtube API Key, required for accessing data from the API.
    private API_KEY = "&key=AIzaSyCuHiuUWDnn68G5bNCk1VxJm7UWKpbD1FU";
    
    constructor(private _http: Http) {}
    
    getChannels(gameType) {
        var request = "";
        switch(gameType) {
        case 'CSGO':
            break;
        
        case 'DOTA2':
            break;
            
        case 'LOL':
            break;
            
        case 'HS':
            request = this.CHANNELDATA_BASE_URL + this.hearthstoneChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            console.log(request);
            break;
        
        case 'SC2':
            break;
        }
        return this._http.get(request)
                .map(res => res.json());
        
        
    }
    
    getVideos(channelID) {
        var request = this.VIDEODATA_BASE_URL + channelID + this.VIDEODATA_FIELDS + this.API_KEY;
        console.log(request);
        return this._http.get(request)
                .map(res => res.json());
    }
}