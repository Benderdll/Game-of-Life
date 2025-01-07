let tablero = document.getElementById("tablero");
const columnas = 50;
const filas = 50;
let detener = false;

for(let i = 0; i < filas; i++){
    for(let j = 0; j < columnas; j++){
        let div = document.createElement("div");
        div.id = `${i}-${j}`;
        div.addEventListener("click", function(){
            if(div.classList.contains("vivo")){
                div.classList.remove("vivo");
                div.classList.add("muerto");
                console.log(div.id, "manual: muerto");
            }else{
                div.classList.remove("muerto");
                div.classList.add("vivo");
                console.log(div.id, "manual: vivo");
            }
        });
        tablero.appendChild(div);
    }
}

let intervalo;
let buttonStart = document.getElementById("iniciar");
buttonStart.addEventListener("click", function() {
    if (!intervalo) {
        intervalo = setInterval(start, 100);
    }
});

let buttonPintar = document.getElementById("pintar");
buttonPintar.addEventListener("click", pintar);

let buttonStop = document.getElementById("detener");
buttonStop.addEventListener("click", function(){
    clearInterval(intervalo);
    intervalo = null;
});

let buttonClear = document.getElementById("limpiar");
buttonClear.addEventListener("click", clear);

function pintar(){
    let ids = ["17-18", "17-19", "16-18", "16-19", "17-28", "16-28", "15-28", "14-29", "13-30", "13-31", "18-29", "19-30", "19-31","14-33", "18-33", "17-34", "16-34", "15-34", "16-35", "16-32"];
    
    for(let id of ids){
        let div = document.getElementById(id);
        div.classList.remove("muerto");
        div.classList.add("vivo");
    }
}

function clear(){
    for(let i = 0; i < filas; i++){
        for(let j = 0; j < columnas; j++){
            let div = document.getElementById(`${i}-${j}`);
            div.className = "muerto";
        }
    }
}

function start(){
    let newTablero = [];
    for(let i = 0; i < filas; i++){
        newTablero[i] = [];
        for(let j = 0; j < columnas; j++){
            let div = document.getElementById(`${i}-${j}`);
            let aliveNeighbors = checkAliveNextDivs(div);
            if(div.classList.contains("vivo")){
                if(aliveNeighbors < 2 || aliveNeighbors > 3){
                    newTablero[i][j] = "muerto";
                } else {
                    newTablero[i][j] = "vivo";
                }
            } else {
                if(aliveNeighbors === 3){
                    newTablero[i][j] = "vivo";
                } else {
                    newTablero[i][j] = "muerto";
                }
            }
        }
    }

    for(let i = 0; i < filas; i++){
        for(let j = 0; j < columnas; j++){
            let div = document.getElementById(`${i}-${j}`);
            div.className = newTablero[i][j];
        }
    }
}

function checkAliveNextDivs(div){
    let id = div.id.split("-");
    let i = parseInt(id[0]);
    let j = parseInt(id[1]);
    let neighbors = [
        document.getElementById(`${i-1}-${j-1}`),
        document.getElementById(`${i-1}-${j}`),
        document.getElementById(`${i-1}-${j+1}`),
        document.getElementById(`${i}-${j-1}`),
        document.getElementById(`${i}-${j+1}`),
        document.getElementById(`${i+1}-${j-1}`),
        document.getElementById(`${i+1}-${j}`),
        document.getElementById(`${i+1}-${j+1}`)
    ];
    let count = 0;
    for(let neighbor of neighbors){
        if(neighbor && neighbor.classList.contains("vivo")){
            count++;
        }
    }
    return count;
}

// function start(){
//     let divs = tablero.getElementsByTagName("div");
//     // console.log(divs);
//     let newTablero = [];
//     for(let i = 0; i < filas; i++){
//         for(let j =0; j < columnas; j++){
//             let div = document.getElementById(`${i}-${j}`);
//             if(checkAliveNextDivs(div) >=2 && checkAliveNextDivs(div) <= 3){
//                 div.classList.remove("muerto");
//                 div.classList.add("vivo");
//                 newTablero.push(div);
//             }else{
//                 div.classList.remove("vivo");
//                 div.classList.add("muerto");
//                 newTablero.push(div);
//             }
//         }
//     }
//     // console.log(tablero)
//     // tablero.innerHTML = "";
//     // console.log("seborratablero")
//     // console.log(tablero)
//     tablero.innerHTML = "";
//     for(let i = 0; i < newTablero.length; i++){
//         tablero.appendChild(newTablero[i]);
//     }
//     console.log("loop finished");

// }

// function checkAliveNextDivs(div){
//     let id = div.id.split("-");
//     let i = parseInt(id[0]);
//     let j = parseInt(id[1]);
//     let divLeft = document.getElementById(`${i}-${j-1}`);
//     let divRight = document.getElementById(`${i}-${j+1}`);
//     let divUp = document.getElementById(`${i-1}-${j}`);
//     let divDown = document.getElementById(`${i+1}-${j}`);
//     let divUpLeft = document.getElementById(`${i-1}-${j-1}`);
//     let divUpRight = document.getElementById(`${i-1}-${j+1}`);
//     let divDownLeft = document.getElementById(`${i+1}-${j-1}`);
//     let divDownRight = document.getElementById(`${i+1}-${j+1}`);
//     let divs = [divLeft, divRight, divUp, divDown, divUpLeft, divUpRight, divDownLeft, divDownRight];
//     let count = 0;
//     for(let i = 0; i < divs.length; i++){
//         if(divs[i] != null){
//             if(divs[i].classList.contains("vivo")){
//                 count++;
//             }
//         }
//     }
//     console.log(div.id, "vivos ",count);
//     return count;
// }