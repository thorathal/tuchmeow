import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {Channel_Response} from '../interfaces/channel_response';
import {Video_Response} from '../interfaces/video_response';
import {Video_Durations} from '../interfaces/video_durations';

@Injectable()
export class YoutubeService {
    
    // Search on general channel data: Title, description, ect. Keyword is the channel ID
    private CHANNELDATA_BASE_URL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=";
    // specify even more what information you want. Here: channel ID, title and description.
    private CHANNELDATA_FIELDS = "&fields=items(id%2Csnippet(title%2Cdescription%2Cthumbnails))"; 
    // channel ID's for (manual lookup):
    
    private csgoChannelIDs = 
            'UCayBk2oaTaiUw1Z4r_VKuAg' + '%2C' +    // moetv1337
            'UCnD-frIn-2URPLnDWNN6UsQ' + '%2C' +    // UCnD-frIn-2URPLnDWNN6UsQ
            'UCs3GloeEzu5rDlQlSLGrr4A'              // SparklesProduction
            ;
    
    private dota2ChannelIDs = 
            'UCAfhB2VCVnjiJ8FhcDYtFAQ'              // UCAfhB2VCVnjiJ8FhcDYtFAQ
            ;
    
    private lolChannelIDs = 
            'UCvqRdlKsE5Q8mf8YXbdIJLw' + '%2C' +    // LoLChampSeries
            'UCdOWyp25T0HDtjpnV2LpIyw' + '%2C' +    // EpicSkillshot
            'UCmIGYuRNVWJT7VsEMi4MXfA'              // ReplaysLOLHighlights
            ;
    
    private hearthstoneChannelIDs = 
            'UCsQnAt5I56M-qx4OgCoVmeA' + '%2C' +    // trumpsc
            'UC-kezFAw46x-9ctBUqVe86Q' + '%2C' +    // amazhs
            'UCeBMccz-PDZf6OB4aV6a3eA'              // kripparrian
            ;
    private starcraftChannelIDs =
            'UCZNTsLA6t6bRoj-5QRmqt_w' + '%2C' +    // Felixje0
            'UCb-Rder8Hs869eVIJIzswBA' + '%2C' +    // UCb-Rder8Hs869eVIJIzswBA
            'UCTcMm4NJYBYXkpOfqXDaEFg'              // UCTcMm4NJYBYXkpOfqXDaEFg
            ;

    // Search on channel playlists
    // https://developers.google.com/apis-explorer/#search/youtube/youtube/v3/youtube.playlists.list
    
    // The Youtube API Key, required for accessing data from the API.
    private API_KEY = "&key=AIzaSyCuHiuUWDnn68G5bNCk1VxJm7UWKpbD1FU";
    
    constructor(private _http: Http) {}
    
    getChannels(gameType: string) : Observable<Channel_Response> {
        var request = "";
        
        switch(gameType) {
        case 'CSGO':
            request = this.CHANNELDATA_BASE_URL + this.csgoChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            break;
        
        case 'DOTA2':
            request = this.CHANNELDATA_BASE_URL + this.dota2ChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            break;
            
        case 'LOL':
            request = this.CHANNELDATA_BASE_URL + this.lolChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            break;
            
        case 'HS':
            request = this.CHANNELDATA_BASE_URL + this.hearthstoneChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            
            break;
        
        case 'SC2':
            request = this.CHANNELDATA_BASE_URL + this.starcraftChannelIDs + this.CHANNELDATA_FIELDS + this.API_KEY;
            break;
        }
        console.log("Get the channels: " + request);
        return this._http.get(request)
                .map(res => res.json());
    }
    
 // Search on channel videos, (newest videos) Keyword is the channel ID.
    private VIDEODATA_BASE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=";
    // Specify number and order of videos, and specify information from fields. Here: 5 videos ordered by date, with videoId, title and thumbnails
    private VIDEODATA_FIELDS = "&maxResults=15&order=date&fields=items(id(videoId)%2Csnippet(title%2Cthumbnails(medium(url))))";
    
    
    getVideos(channelID : string) : Observable<Video_Response> {
        var request = this.VIDEODATA_BASE_URL + channelID + this.VIDEODATA_FIELDS + this.API_KEY;
        console.log("Getting latest videos: " + request);
        return this._http.get(request)
                .map(res => res.json());
    }
    
    // Search on specific videos and get their durations.
    private VIDEODURATION_BASE_URL = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails";
    private VIDEODURATION_FIELDS = "&fields=items(contentDetails(duration))";
    
    getVideoDurations(videoIDs : string[]) : Observable<Video_Durations>{
        
        var ids = "";
        for(let i=0; i < videoIDs.length; i++) {
            ids += videoIDs[i];
            if(i < videoIDs.length-1) 
                ids += "%2C";
        }
        var request = this.VIDEODURATION_BASE_URL + ids + this.VIDEODURATION_FIELDS + this.API_KEY;
        return this._http.get(request)
                .map(res => res.json())
    }
}