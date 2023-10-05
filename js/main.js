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

//we need to define a class to use for our game objects
class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
    }
    //need a way to render itself
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//instantiate some game objects
const testCrawler = new Crawler(45, 45, 65, 23, "green");
// testCrawler.render();
const hero = new Crawler(0, 0, 30, 30, "hotpink");
const ogre = new Crawler(287, 79, 50, 79, "#bada55");


//*------ FUNCTIONS ------*/

function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}

// drawBox(50, 100, 35, 75);

// need to handle keyboard input form the UserActivation
function movementHandler(e) {
    // console.log(e)
    const speed = 10; // how many pixels the hero moves per movement
    // switch case, one variable that can be many values and each value has a different chunk of code to run -- use a switch case!
    switch(e.key.toLowerCase()) {
        case "w":
            // console.log("move the hero up!");
            hero.y -= speed;
            break;
        case "s":
            // console.log("move the hero down!");
            hero.y += speed;
            break;
        case "a":
            // console.log("move the hero left!");
            hero.x -= speed;
            break;
        case "d":
            // console.log("move the hero right!");
            hero.x += speed;
            break;
        default:
            // any other value will run the default
            console.log(`${e.key} not recognized!`)
    }
}

// need a function to handle collision detection
// we need access aligned bounding box detection collision algorithm
function detectHit() {
    // AABB axis aligned bounding box algorithm
    // check for collisions on each side of each object
    // if each boundary is passed -- a collision is detected

    // check top of the ogre
    const top = hero.y + hero.height >= ogre.y;
    // check bottom of the ogre
    const bottom = hero.y <= ogre.y + ogre.height;
    // check left of the ogre
    const left = hero.x + hero.width >= ogre.x;
    //check right side of the ogre
    const right = hero.x <= ogre.x + ogre.width;
    console.log(`top: ${top}, bottom: ${bottom}, left: ${left}, right: ${right}`)
    if(top && bottom && left && right) {
        // console.log("hit detected!")
        return true
    }
    return false
}



// create a game loop (that will run the business logic of the game and be a callback to a setInterval)

const gameInterval = setInterval(gameloop, 80);
function gameloop() {
    // clear the canvas to re-render
    ctx.clearRect(0, 0, canvas.width / 2, canvas.height)
    // render all game objects
    hero.render();
    if (ogre.alive) {
        ogre.render();
    }
    // do game logic
    if (detectHit()) {
        // the game has ended
        // set ogre to be not alive
        ogre.alive = false;
        // display message to the user
        status.innerText = "You have killed Shrek 😭";
    }
}



//*------ EVENT LISTENERS ------*/

//let's make an event listener to draw a box wherever the user clicks
canvas.addEventListener('click', e => {
    // console.log(event)... remember (x,y) = (0,0) at the top left of the container, so when you click lower, y gets lower
    // console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
    movement.innerText = `x: ${e.offsetX}, y: ${e.offsetY}`;
    drawBox(e.offsetX, e.offsetY, 30, 30, "#c724B1")
})

document.addEventListener('keydown', movementHandler);

