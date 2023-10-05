//console.log("hello canvas")
//*------ DOM SELECTORS ------*/

//id=movement
const movement = document.querySelector("#movement");
const status = document.querySelector("#status");
const canvas = document.querySelector("canvas");

console.log(movement, status, canvas)

//*------ CANVAS SETUP ------*/

// get the canvas context to get api we need
const ctx = canvas.getContext("2d");
console.log(ctx)

// set the canvas' resolution to be the same as the windows (odd, but has to be done)
// set canvas to be the rendering size it appears on the page
// this is how you make a responsive canvas (set to hardcoded value if you don't want it to be responsive)
canvas.setAttribute("height", getComputedStyle(canvas).height);
canvas.setAttribute("width", getComputedStyle(canvas).width);

// // set context properties
// ctx.fillStyle = "purple";
// //invoke methods to use those properties
// //fillRect(x, y, width, height)
// ctx.fillRect(10, 20, 40, 40);

// ctx.fillRect(75, 90, 40, 20);

// ctx.fillStyle = "blue";
// ctx.fillRect(100, 100, 45, 75);

// ctx.strokeStyle = "red";
// ctx.strokeRect(30, 30, 45, 75)


//*------ CLASSES ------*/



//*------ FUNCTIONS ------*/

function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}

drawBox(50, 100, 35, 75);

//*------ EVENT LISTENERS ------*/

//let's make an event listener to draw a box wherever the user clicks
canvas.addEventListener('click', e => {
    // console.log(event)... remember (x,y) = (0,0) at the top left of the container, so when you click lower, y gets lower
    // console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
    movement.innerText = `x: ${e.offsetX}, y: ${e.offsetY}`;
    drawBox(e.offsetX, e.offsetY, 30, 30, "#c724B1")
})


