import { GameHTML5 } from '../../src/components/gameHTML5.js';

(() => {
     
    let gameHTML5 = new GameHTML5();
    let lastPlayedObject = null;
    console.log(gameHTML5.playableObjects);
    
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
            el.appendChild(span);
            gameHTML5.play(position, span.innerText);
            
        })
    })

})();