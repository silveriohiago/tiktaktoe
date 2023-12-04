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
   
   checkResults(array, player){

      let indexArray = [];
      
      array.forEach( (arr, index) => { 
         if(arr && arr === player) indexArray.push(index);  
      });
      
      return this.#resultsTable.filter( (arr) => {
        //console.log(indexArray);
         return (JSON.stringify(arr) === JSON.stringify(indexArray));
      }).length > 0;
        
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
      [0, 5, 9],
      [2, 4, 6],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8]
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

   #checkTable(tableCell, position, value){
      
      if (!(position >= 0 && position <= 8)) {
         throw new Error(this._config.errors.rangeOutOfIndex);
      }

      if(!tableCell) {
         return tableCell = value;
      } else
         throw new Error(this._config.errors.cellNotEmpty);
   }

   play(position, value) {

      if(this.#flags.winner) {
         throw new Error("Já tem um vencedor reinicie a partida");
      }

      //console.log("playing..");
      if(this.#config.playableObjects.includes(value) == true) {
         this.#table[position] = this.#checkTable(this.#table[position], position, value);
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
