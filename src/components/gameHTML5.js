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
    
    #config = {};

    constructor(config = APP_CONFIG) {
     super();
     this.#config = config;

    }


    newCheckResults(array, player){


      let indexArray = []
      // filter in the table to get index where player have played
    
      array.forEach( (arr, index) => { 
         if(arr && arr === player) indexArray.push(index);  
      });
      console.log(indexArray);
     // compare the player table with results table to find out if there's a winner
      return super.resultsTable.filter( (arr) => {
         return (JSON.stringify(arr) === JSON.stringify(indexArray));
      }).length > 0;
      
   }
      
    /**
     * 
     * @overload
     */
    play(position, value) {

        if(super.flags.winner) {
            throw new Error("Já tem um vencedor reinicie a partida");
        } 
   
        if(!super.table.some(cell => cell === null)){
            throw new Error("Houve um empate, reinicie a partida");
        }
        
        if(this.playableObjects.includes(value) === true) {
            super.table[position] = super.checkTable(super.table[position], position, value);
            if(super.table[position])
            console.log(`Inserido a posição com sucesso em ${position} com o valor ${value}`, this.table);
        }
        else {
            throw new Error(this.#config.errors.valueMistaken);
        }

        if(!super.flags.winner){
         super.flags.winner = this.newCheckResults(super.table, value) ? true : false;
        } 
        if(super.flags.winner) {
            alert(`O jogador "${value}" venceu!`);
            if(!localStorage.getItem(`player-${value}`))
               localStorage.setItem(`player-${value}`, 1);
            else {
               localStorage.setItem(`player-${value}`, parseInt(localStorage.getItem(`player-${value}`)) + 1);
            }
        }
    }
      
          
 }
