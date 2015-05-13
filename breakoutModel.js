/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BreakoutModel(){
    var bricks = [];
    var reflectFactor = 1.0;
    var H;
    var W;
    var score = 0;
    var gameState = true;
    var gameWin = false;
    var winCounter = 0;
    
    // Change the number of bricks in a row and the number of rows here
    var brickQuantity = 10;
    var brickRows = 4;
    
    var ball = {
        x : 0,
        y : 200, 
        radius : 5,
        color : "pink",
        vx : 5,
        vy : 5  
    };
    
    var paddle = {
        x : 0,
        y : 400,
        width : 80,
        height : 10,
        color : "yellow",
        vx : 0,
    };
    
    this.setDimensions = function(height, width){
        H = height;
        W = width;
    };

    this.init = function(){
        paddle.y = 0.85 * H;
        paddle.width = 0.2 * W;
        var k = 0;
        for (var j = 0; j < brickRows; j++){
            k = 0;
            for (var i = j*brickQuantity; i < (j*brickQuantity) + brickQuantity; i++){
                bricks[i] = new Brick(((W/brickQuantity)+1)*k, (H/14)*j, "blue");
                k++;
            }; 
        };
    };
        
    var Brick = function (x, y, color){
        this.x = x;
        this.y = y;
        this.width = W/brickQuantity;
        this.height = H/15;
        this.color = color;
        this.value = 1;
    };
                       
    this.moveBall = function(){
        
        // CHECK FOR AN X COLLISION
        if (this.brickCollisionX()){
            ball.vx *= -reflectFactor;
        }
        
        if (this.paddleCollisionX()){
            ball.vx *= -reflectFactor;
        }

        // CHECK FOR A Y COLLISION
        if (this.brickCollisionY()){
           ball.vy *= -reflectFactor;
        } 
        
        if (this.paddleCollisionY()){
           ball.vy *= -reflectFactor;
        } 
        

        // Check if the ball has collided with the walls.
        if (ball.y + ball.radius > H ){
            ball.y = H - ball.radius;
            gameState = false;
        } else if (ball.y - ball.radius < 0){
            ball.y = 0 + ball.radius;
            ball.vy *= -reflectFactor;
        }

        if (ball.x + ball.radius > W ){
            ball.x = W - ball.radius;
            ball.vx *= -reflectFactor;
        } else if (ball.x - ball.radius < 0){
            ball.x = 0 + ball.radius;
            ball.vx *= -reflectFactor;
        }
        
        // Finally, move the ball.
        ball.x = ball.x + ball.vx;
        ball.y = ball.y + ball.vy;
    };
    
    /*
     * This method checks if there is a collision with
     * a brick in the x direction.
     */
    this.brickCollisionX = function(){
        var xCollide = false;
        
        //check if the brick is still visible
        for (var i = 0; i < bricks.length; i++){
            if (bricks[i].value === 1){
                if  (((ball.x + ball.vx + ball.radius >= bricks[i].x) &&
                    (ball.x + ball.radius <= bricks[i].x))
                    ||
                    ((ball.x + ball.vx - ball.radius <= bricks[i].x + bricks[i].width)&&
                    (ball.x - ball.radius >= bricks[i].x + bricks[i].width)))
                    {
                        // Now check we're within the bricks y boundaries.
                        if ((ball.y + ball.vy -ball.radius <= bricks[i].y + bricks[i].height) &&
                           (ball.y + ball.vy + ball.radius >= bricks[i].y)){
                           xCollide = true;
                           this.deleteBrick(i);
                        }
                    }
            } 
        }
        return xCollide;
    }
     this.paddleCollisionX = function(){
        var xCollide = false;
        
        if  (((ball.x + ball.vx + ball.radius >= paddle.x) &&
            (ball.x + ball.radius <= paddle.x))
            ||
            ((ball.x + ball.vx - ball.radius <= paddle.x + paddle.width)&&
            (ball.x - ball.radius >= paddle.x + paddle.width)))
            {
                // Now check we're within the bricks y boundaries.
                if ((ball.y + ball.vy -ball.radius <= paddle.y + paddle.height) &&
                   (ball.y + ball.vy + ball.radius >= paddle.y)){
                   xCollide = true;
                }
            }
        return xCollide;
    }
    
    this.brickCollisionY = function(){
        var yCollide = false;
        
        //check if the brick is still visible
        for (var i = 0; i < bricks.length; i++){
            if (bricks[i].value === 1){
                if  (((ball.y + ball.vy - ball.radius <= bricks[i].y + bricks[i].height) &&
                    (ball.y - ball.radius >= bricks[i].y + bricks[i].height))
                    ||
                    ((ball.y + ball.vy + ball.radius >= bricks[i].y) &&
                    (ball.y + ball.radius <= bricks[i].y)))
                    {
                        // Now check we're within the bricks x boundaries.
                        if ((ball.x + ball.vx + ball.radius >= bricks[i].x &&
                           ball.x + ball.vx - ball.radius <= bricks[i].x + bricks[i].width)){
                           yCollide = true;
                           this.deleteBrick(i);
                        }
                    }
            } 
        }
        return yCollide;
    }
    
    this.paddleCollisionY = function(){
        var yCollide = false;
        
        if  (((ball.y + ball.vy - ball.radius <= paddle.y + paddle.height) &&
            (ball.y - ball.radius >= paddle.y + paddle.height))
            ||
            ((ball.y + ball.vy + ball.radius >= paddle.y) &&
            (ball.y + ball.radius <= paddle.y)))
            {
                // Now check we're within the bricks x boundaries.
                if ((ball.x + ball.vx + ball.radius >= paddle.x &&
                   ball.x + ball.vx - ball.radius <= paddle.x + paddle.width)){
                   yCollide = true;
                }
            }
        return yCollide;
    }
    

    this.deleteBrick = function(index){
        score = score + 10;
        winCounter++;
        if (winCounter === bricks.length){
            gameWin = true;
        }
        bricks[index].value = 0;
    }
    
    this.movePaddle = function(gamma) {
        var newVx = g(gamma);
        paddle.vx = newVx;
        paddle.x = paddle.x + paddle.vx;
        
        if (paddle.x < 0){
            paddle.x = 0;
        } else if (paddle.x > W - paddle.width){
            paddle.x = W - paddle.width;
        }
    }
    
    this.getBall = function(){
        return ball;
    };
    
    this.getBricks = function(){
        return bricks;
    };
    
    this.getPaddle = function(){
        return paddle;
    };
    
    this.getScore = function(){
        return score;
    };
    
    this.getGameState = function(){
        return gameState;
    };
    
    this.getGameWin = function(){
        return gameWin;
    };
    /***************************
     ******** SENSOR DATA ******
     ***************************
     */
    var xold, yold, zold, sharp=0.5;
    
    function g(f) {
        if (!xold){
                xold = Math.round(f*10)/10;
            }
            xold = f * sharp + xold * (1.0 - sharp);
           var newGamma = Math.round(xold*10)/10;
        return newGamma;
    }
    function f(f) {
        return Math.round(f*100)/100;
    }
    function w(f) {
        return Math.round(f);
    }
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            var x = event.accelerationIncludingGravity.x / 9.80665,
                y = event.accelerationIncludingGravity.y / 9.80665,
                z = event.accelerationIncludingGravity.z / 9.80665,
                pitch = Math.atan(y/z)  * 180 / Math.PI,
                roll  = Math.atan(-x/Math.sqrt(y*y + z*z))  * 180 / Math.PI;
            
            if (!xold){
                xold = x; yold = y; zold = z;
            }
            xold = x * sharp + xold * (1.0 - sharp);
            yold = y * sharp + yold * (1.0 - sharp);
            zold = z * sharp + zold * (1.0 - sharp);
            });
      }          
}