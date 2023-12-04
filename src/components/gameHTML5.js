import { Game } from './game.js';
import { APP_CONFIG } from '../game.conf.js';

/**
 * @class GameHTML
 * @extends Game
 */

export class GameHTML5 extends Game {
    
    get playableObjects() {
       return APP_CONFIG.playableObjects;
    }

    constructor(config = APP_CONFIG) {
     super();
    }

}