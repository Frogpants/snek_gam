---
layout: post
title: Scroll Test
description: I'm in love with my girlfriend.
toc: true
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top-Down Scrolling Game</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        canvas {
            display: block;
            background-color: #87CEEB; /* Sky blue background */
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        // Set canvas size to fill the screen
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight/2;
        // Player settings
        const cam = {
            x: 0,
            y: 0
        };
        const player = {
            x: 0,
            y: 0,
            radius: 10,
            length: 8,
            speed: 0.5,
            xv: 0,
            yv: 0,
            dir: 90,
            tdir: 90,
            angles: [90,90,90,90,90,90,90,90,90,90,90,90]
        };
        // Background settings
        const background = {
            x: 0,
            y: 0,
            width: canvas.width * 4,
            height: canvas.height * 4
        };
        // Player movement
        let keys = {};
        window.addEventListener("keydown", (e) => {
            keys[e.key] = true;
        });
        window.addEventListener("keyup", (e) => {
            keys[e.key] = false;
        });
        // render circle
        function fillCircle(x,y,radius) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
        };
        // bushes
        function drawBush(x, y) {
            const img = new Image();
            img.src = "/snek/snek_gam/images/snek_art/bush.png";
            img.onload = function() {
                ctx.drawImage(img,x,y)
            };
        };
        // chain
        function chain(x,y,length) {
            var offx = 0;
            var offy = 0;
            let rad = 0;
            let px = 0;
            let py = 0;
            let angle = 0;
            let positions = [];
            for (let i = 0; i < length; i++) {
                angle = player.angles[player.angles.length-1-i];
                rad = (angle * Math.PI) / 180;
                px = (x+offx)-cam.x;
                py = (y-offy)-cam.y;
                positions.push({x:px+(canvas.width/2),y:py+(canvas.height/2)});
                offx -= 15*Math.sin(rad);
                offy -= 15*Math.cos(rad);
            }
            for (let i = 0; i < length; i++) {
                let pos = positions[positions.length-1-i];
                fillCircle(pos.x,pos.y,10)
            }
        };
        function move(speed) {
            const rad = (player.dir * Math.PI) / 180;
            player.xv += speed*Math.sin(rad);
            player.yv += speed*Math.cos(rad);
        };
        // Keep Score
        var score = 0;
        function drawScore() {
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("Score: " + score, canvas.width/2, 30);
        };
        // Update the game state
        function update() {
            if (keys["ArrowUp"] || keys["w"]) player.tdir = 0;
            if (keys["ArrowDown"] || keys["s"]) player.tdir = 180;
            if (keys["ArrowRight"] || keys["d"]) player.tdir = 90;
            if (keys["ArrowLeft"] || keys["a"]) player.tdir = 270;
            player.angles.push(player.dir);
            if (player.angles.length > player.length) {
                player.angles.shift();
            }
            player.dir += 0.05 * (player.tdir-player.dir);
            move(player.speed);
            player.xv *= 0.9;
            player.yv *= 0.9;
            player.x += player.xv;
            player.y -= player.yv;
            console.log("Dir: " + player.dir);
            console.log("Xv: " + player.xv + " Yv: " + player.yv);
            // Scroll Background
            cam.x += 0.1 * (player.x-cam.x);
            cam.y += 0.1 * (player.y-cam.y);
            // draw
            render();
        };
        // Draw everything
        function render() {
            // Draw the background
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
            ctx.fillStyle = "white"; // Sky blue
            ctx.fillRect(background.x, background.y, background.width, background.height);
            // Draw the player
            chain(player.x,player.y,player.length);
            // Render Score
            drawScore();
            // render bush
            drawBush(-cam.x+canvas.width/2,-cam.y+canvas.height/2);
        };
        // Game loop
        function gameLoop() {
            update();
            requestAnimationFrame(gameLoop);
        };
        // Start the game
        gameLoop();
    </script>
</body>
</html>