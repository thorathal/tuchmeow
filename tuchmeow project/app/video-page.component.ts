import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {GameMenuComponent} from './game-menu.component';
import {VideoService} from './video.service';


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

@Component({
    template: `
        <div *ngIf="isLoading">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
        <game-menu></game-menu>
        <div class="space"></div>
        <iframe width="99.5%" height="65%" src="https://www.youtube.com/embed/<insert-youtube-video-id-here>" frameborder="0" allowfullscreen></iframe>
    `,
    styles: [`
        .space {
            height: 8%;
        }
    `],
    directives: [ROUTER_DIRECTIVES, GameMenuComponent],
    providers: [VideoService]
})
export class VideoPageComponent{

}