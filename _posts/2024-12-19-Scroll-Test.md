---
layout: post
title: Scroll Test
description: I'm in love with my girlfriend.
toc: true
---

<!DOCTYPE html>
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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Player settings
        const cam = {
            x: 0,
            y: 0
        };
        const player = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            width: 50,
            height: 50,
            speed: 4
        };
        // Background settings
        const background = {
            x: 0,
            y: 0,
            width: canvas.width * 2,
            height: canvas.height * 2
        };
        // Player movement
        let keys = {};
        window.addEventListener("keydown", (e) => {
            keys[e.key] = true;
        });
        window.addEventListener("keyup", (e) => {
            keys[e.key] = false;
        });
        // Update the game state
        function update() {
            if (keys["ArrowUp"] || keys["w"]) player.y -= player.speed;
            if (keys["ArrowDown"] || keys["s"]) player.y += player.speed;
            if (keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
            if (keys["ArrowRight"] || keys["d"]) player.x += player.speed;
            // Scroll Background
            cam.x += 0.05 * (player.x-cam.x);
            cam.y += 0.05 * (player.y-cam.y);
            // draw
            render();
        };
        // Draw everything
        function render() {
            // Draw the background
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
            ctx.fillStyle = "#87CEEB"; // Sky blue
            ctx.fillRect(background.x, background.y, background.width, background.height);
            // Draw the player
            ctx.fillStyle = "red";
            ctx.fillRect(player.x-cam.x, player.y-cam.y, player.width, player.height);
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