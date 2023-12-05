import { APP_CONFIG } from '../game.conf.js';

/**
 * A class that determines methods inside of the game
 * @class Game
 */

export class Game {
    /**
    * Construct the class 
    * @constructor
    * @param {object} config - Config object from game.conf.js
    */
   constructor(config = APP_CONFIG) {
      
      this.#config = config;
     
   } 
   
   #config = {};
   
   get config(){
      if(this.constructor.name !== "Game" ){
         return this.config;
      }
   }

   #enviroments = ["Console", "HTML5"];

   get enviroments(){
      if(this.constructor.name !== "Game" ){
         return this.#enviroments;
      }
   }

   #flags = {
      "isplaying" : null,
      "match": 1,
      "winner": false,
      "winnerPosition": null 
   };

   get flags(){
      if(this.constructor.name !== "Game" ){
         return this.#flags;
      }
   }

   #resultsTable = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
      [0, 2, 4, 6],
      [0, 2, 4, 8],
      [0, 2, 4, 5, 6],
      [0, 4, 6, 8],
      [2, 4, 6, 8],
      [2, 4, 6, 7],
      [0, 2, 3, 6],
      [1, 3, 4, 5],
      [1, 6, 7, 8],
      [0, 1, 2, 5],
      [5, 6, 7, 8],
      [0, 3, 4, 8],
      [0, 4, 5, 8],
      [1, 2, 5, 8],
      [0, 3, 5, 6],
      [0, 1, 4, 7],
      [0, 1, 3, 6],
      [2, 5, 6, 8],
      [1, 4, 6, 7],
      [1, 4, 5, 7],
      [2, 3, 4, 6],
      [2, 4, 5, 6],
      [0, 3, 6, 7],
      [1, 2, 4, 6],
      [1, 2, 3, 4, 6],
      [0, 3, 4, 6, 8],
      [0, 3, 4, 6],
      [0, 1, 2, 5, 7],
      [0, 2, 4, 5, 8],
      [1, 2, 4, 7],
      [0, 2, 4, 7, 8],
      [0, 4, 5, 7, 8]
   ]
   
   get resultsTable(){
      if(this.constructor.name !== "Game" ){
         return this.#resultsTable;
      }
   }

   // fill arrays to null positions
   #table = new Array(9).fill(null);

   get table(){
      if(this.constructor.name !== "Game" ){
         return this.#table;
      }
   }

   #findIfStraight(array, value){
      let maxIndex = 0;
      array.forEach( (arr, index) => { 
         if(arr === value) maxIndex = index > maxIndex ? index : maxIndex; 
      });
      return maxIndex+1;
   }

   #findIfDiagonal(array, value){
      return array.map( (a, i) => (a[i] === value) ).length;
   }

   checkTable(tableCell, position, value){

      if(this.constructor.name === "Game" ){
         return false;
      }
         
      if (!(position >= 0 && position <= 8)) {
         throw new Error(this.#config.errors.rangeOutOfIndex);
      }

      if(!tableCell) {
         return tableCell = value;
      } else
         throw new Error(this.#config.errors.cellNotEmpty);

  
   }

   checkResults(array, player){

 
      let indexArray = []

      // filter in the table to get index where player have played
      array.forEach( (arr, index) => { 
         if(arr && arr === player) indexArray.push(index);  
      });
      
      // compare the player table with results table to find out if there's a winner
      return this.#resultsTable.filter( (arr) => {
         return (JSON.stringify(arr) === JSON.stringify(indexArray));
      }).length > 0;
      
   }

   play(position, value) {

      if(this.#flags.winner) {
         throw new Error("Já tem um vencedor reinicie a partida");
      } 

      if(!this.#table.some(cell => cell === null)){
         throw new Error("Houve um empate, reinicie a partida");
      }

      //console.log("playing..");
      if(this.#config.playableObjects.includes(value) == true) {
         this.#table[position] = this.checkTable(this.#table[position], position, value);
         console.log(`Inserido a posição com sucesso em ${position} com o valor ${value}`, this.#table);
      }
      else {
         throw new Error(this._config.errors.valueMistaken);
      }
       
      if(!this.#flags.winner){
         this.#flags.winner = this.checkResults(this.#table, value) ? true : false;
         if(this.#flags.winner) console.log(`O jogador ${value} venceu!`);
      }
      
   }

}
