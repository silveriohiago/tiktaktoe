export class Game {


    constructor() {
        if (this.constructor == Game) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }
    
    config = {};
    enviroments = ["Console", "HTML5"];
    flags = {
       "isplaying" : null,
       "match": 1,
       "winner": false,
       "winnerPosition": null 
    };
    resultsTable = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 5, 9],
       [2, 4, 6],
       [1, 4, 7],
       [0, 3, 6],
       [2, 5, 8]
    ]
    
    // fill arrays to null positions
    table = new Array(9).fill(null);
 

}