"use strict"
const canvas = document.querySelector(".board");
canvas.width = window.innerWidth*1.0*99.5/100;
canvas.height = 1.0*window.innerHeight*84/100;
canvas.style.background = 'white';
canvas.style.border = "2px solid black";
const ctx = canvas.getContext('2d');

let x = 0, y = 0;
let isDrawing = false;
let eraseState = false;
let toErase = false;
let strokeColor = 'black';
let lineWidth = 3;
let eX, eY;

// **************************** menu ************************
const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const white = document.querySelector(".white");
const black = document.querySelector(".black");
const purple = document.querySelector(".purple");
const navy = document.querySelector(".navy");
const green = document.querySelector(".green");
const skyBlue = document.querySelector(".sky-blue");
const orange = document.querySelector(".orange");
const yellow = document.querySelector(".yellow");
const eraser = document.querySelector(".eraser");
const theme = document.querySelector("#theme");
const blocks = document.querySelectorAll(".block");
const clearAll = document.querySelector(".clear-all");


clearAll.addEventListener("click", ()=>{
    ctx.clearRect(0, 0, innerWidth, innerHeight);
})

blocks.forEach((block, index)=>{
    block.addEventListener("click", ()=>{
        block.style.background = 'rgb(185, 168, 168)';
        blocks[(index + 1) % 3].style.background = 'rgb(218, 243, 245)';
        blocks[(index + 2) % 3].style.background = 'rgb(218, 243, 245)';
        lineWidth = index == 0 ? 3 : index == 1 ? 6 : 16;
    });
});

theme.addEventListener("click", ()=>{
    let theme_id = theme.selectedIndex;
    canvas.style.background = theme_id == 0 ? 'white' : 'black';
});


eraser.addEventListener("click", (e)=>{
    eraseState = true;
    isDrawing = false;
});

red.addEventListener("click", ()=>{
    strokeColor = 'red';
    notToErase();
});
blue.addEventListener("click", ()=>{
    strokeColor = 'blue';
    notToErase();
});
white.addEventListener("click", ()=>{
    strokeColor = 'white';
    notToErase();
});
black.addEventListener("click", ()=>{
    strokeColor = 'black';
    notToErase();
});
purple.addEventListener("click", ()=>{
    strokeColor = 'purple';
    notToErase();
});
navy.addEventListener("click", ()=>{
    strokeColor = 'navy';
    notToErase();
});
green.addEventListener("click", ()=>{
    strokeColor = 'green';
    notToErase();
});
skyBlue.addEventListener("click", ()=>{
    strokeColor = 'rgb(79, 159, 190)';
    notToErase();
});
orange.addEventListener("click", ()=>{
    strokeColor = 'orange';
    notToErase();
});
yellow.addEventListener("click", ()=>{
    strokeColor = 'yellow';
    notToErase();
});

canvas.addEventListener("mousedown", (e)=>{
    x = e.offsetX;
    y = e.offsetY;
    if(!eraseState){
        isDrawing = true;
        draw(x, y, x, y);
    }
    else{
        toErase = true;
        erase(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener("mousemove", e =>{
    if(isDrawing && !toErase){
        draw(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }else{
        if(toErase){
            erase(e.offsetX, e.offsetY);
        }
    }
});

canvas.addEventListener("mouseup", ()=>{
    isDrawing = false;
    toErase = false;
});

function draw(s1, s2, e1, e2){
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(s1, s2);
    ctx.lineTo(e1, e2);
    ctx.stroke();
    ctx.closePath();
}


function erase(e, f){
    ctx.clearRect(e-20, f-20, 40, 40);
}

function notToErase(){
    eraseState = false;
    toErase = false;
}
