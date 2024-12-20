const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth/2;
canvas.height = window.innerHeight/2;

function random(a,b) {
    return Math.floor(Math.random()*(b-a+1)+a);
};

const human = {
    x: random(-100,100),
    y: random(-100,100),
    speed: random(1,4),
    dir: random(-180,180),
    state: 0
};

const target = {
    x: random(human.x-100,human.x+100),
    y: random(human.y-100,human.y+100),
};

function move(speed) {
    const rad = (player.dir * Math.PI) / 180;
    human.x += speed*Math.sin(rad);
    human.y += speed*Math.cos(rad);
};

function pointTo(x,y) {
    human.dir = (Math.atan2(x-human.x,y-human.y)*180)/Math.PI;
};

function distanceTo(x,y) {
    return Math.sqrt(x**2+y**2);
};

let cooldown = 0;
function tick() {
    if (distanceTo(player.x,player.y) < 100) {
        human.state = 1;
        cooldown = 100;
    } else if (cooldown > 0) {
        cooldown = Math.max(cooldown - 0.01, 0);
    } else {
        human.state = 0;
        cooldown = 0;
    }
};

function newTarget() {
    target.x = random(human.x-100,human.x+100);
    target.y = random(human.y-100,human.y+100);
};

function run() {
    tick();
    if (human.state === 1) {
        pointTo(player.x,player.y);
        move(human.speed*2.4);
    } else {
        newTarget();
        pointTo(target.x,target.y);
        move(human.speed);
    }
};