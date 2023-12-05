import { GameHTML5 } from '../../src/components/gameHTML5.js';

(() => {
    
    let gameHTML5 = new GameHTML5();
    let lastPlayedObject = null;
    let round = 1;
    document.querySelector("#jogador-um").innerText = localStorage.getItem(`player-x`);
    document.querySelector("#jogador-dois").innerText = localStorage.getItem(`player-o`);
   // console.log(gameHTML5.playableObjects);

   document.body.style.display = "block";
   
   document.querySelector("#restart").addEventListener("click", (e) => {
    location.reload();
   })

   document.querySelector("#clear-board").addEventListener("click", (e) => {
    localStorage.clear();
    location.reload();
   })
     
    document.querySelectorAll(".player").forEach(el =>{
        el.addEventListener("click", function(){
            const position = el.getAttribute("id").split("-")[1];
            const span = document.createElement("span");

            if(lastPlayedObject == null){
                span.innerHTML = "x";
                lastPlayedObject = span.innerHTML;
            }
            else{
                span.innerHTML = gameHTML5.playableObjects.filter((item)=>{ if(item != lastPlayedObject) { return item}; });
                lastPlayedObject = span.innerHTML;
                console.log(span)
            }

            try{
                gameHTML5.play(position, span.innerText.trim());
                el.appendChild(span);   
                document.getElementById("jogando").innerText = gameHTML5.playableObjects.filter((item)=>{ if(item != lastPlayedObject) { return item}; }); 
                if(round > 0) document.getElementById("rodada").innerText = round;
                round++;
            }
            catch(e){
                alert(e);
            }

        })
    })
})();