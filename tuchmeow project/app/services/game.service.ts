import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Game} from '../interfaces/game';

export class GameService {
    getItems() : Game[] {
        return [
            {
                name: "Counter Strike: Global Offensive",
                id: "CSGO",
                imageUrl: "http://images.akamai.steamusercontent.com/ugc/55483889951427160/80DC0526F62C0D771C63B82C001E959E7818A503/"
            },
            {
                name: "Defense of the Ancients 2",
                id: "DOTA2",
                imageUrl: "http://vignette3.wikia.nocookie.net/theamazingworldofgumball/images/d/dd/Logo_Dota_2.png/revision/latest?cb=20130329094246"
            },
            {
                name: "League of Legends",
                id: "LOL",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png"
            },
            {
                name: "Hearthstone",
                id: "HS",
                imageUrl: "http://us.battle.net/hearthstone/static/images/logos/logo.png?v=58-15"
                
            },
            {
                name: "Starcraft 2",
                id: "SC2",
                imageUrl: "http://www.battlenet.com.cn/forums/static/images/game-logos/game-logo-sc2.png"
            }
        ];
    }
}