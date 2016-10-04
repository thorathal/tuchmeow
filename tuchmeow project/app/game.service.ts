import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class GameService {
    getItems() {
        return [
            {
                name: "Counter Strike: Global Offensive",
                id: "CSGO",
                imageUrl: "http://images.akamai.steamusercontent.com/ugc/55483889951427160/80DC0526F62C0D771C63B82C001E959E7818A503/"
            },
            {
                name: "Defense of the Ancients 2",
                id: "DOTA2",
                imageUrl: "http://107.170.126.251/wp-content/uploads/2014/04/dota-2-logo.jpg"
            },
            {
                name: "League of Legends",
                id: "LOL",
                imageUrl: "http://vignette3.wikia.nocookie.net/fantendo/images/c/cf/LoL_logo.png/revision/latest?cb=20160501013458"
            },
            {
                name: "Hearthstone",
                id: "HS",
                imageUrl: "http://www.pixel.tv/wp-content/uploads/hearthstone-heroes-of-warcraft.jpg"
                
            },
            {
                name: "Starcraft 2",
                id: "SC2",
                imageUrl: "http://www.battlenet.com.cn/forums/static/images/game-logos/game-logo-sc2.png"
            }
        ];
    }
}