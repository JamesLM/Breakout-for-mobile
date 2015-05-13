/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BreakoutView(){
    
    var canvas = document.getElementById("canvas");
    var H;
    var W;
    
    this.ballPaint = function (ball){
        // Paint the ball
        ball = ball;
        var ballContext = canvas.getContext("2d");
        ballContext.clearRect(0, 0, canvas.width, canvas.height);
        ballContext.beginPath();
        ballContext.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ballContext.fillStyle = ball.color;
        ballContext.fill();
        ballContext.lineWidth = 5;
        //console.log("ball x" + ball.x);
    }; 

    this.brickPaint = function(bricks){
        // Paint the bricks
        var brickContext = [];
        for (var i = 0; i < bricks.length/4; i++){
            if (bricks[i].value === 1){
                brickContext[i] = canvas.getContext("2d");
                brickContext[i].fillStyle = "blue";
                brickContext[i].fillRect(bricks[i].x , bricks[i].y, bricks[i].width, bricks[i].height);
            }
        }
        for (var j = 10; j< bricks.length; j++){
            if (bricks[j].value === 1){
                brickContext[j] = canvas.getContext("2d");
                brickContext[j].fillStyle = "lightgreen";
                brickContext[j].fillRect(bricks[j].x , bricks[j].y, bricks[j].width, bricks[j].height);
            }
        }
    }
    
    this.paddlePaint = function(paddle){
        var paddleContext = canvas.getContext("2d");
        paddleContext.fillStyle = paddle.color;
        paddleContext.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    this.update = function(ball, bricks, paddle, gameState, gameWin){
        if (gameState === true){
            this.ballPaint(ball);
            this.brickPaint(bricks);
            this.paddlePaint(paddle);
        } else if (gameWin === true){
            document.getElementById("main").innerHTML = "Game Over, You Win! You cleared all the block! <br> Just refresh the page to play a new game.";
        } else {
            txt = "<button> hi </button>";
            document.getElementById("main").innerHTML = "Game Over. <br> Just refresh the page to play a new game!";
        }
    };
    
    this.updateScore = function(score){
        document.getElementById("scoreDiv").innerHTML = "Score: " + score;
    }
    this.fitToContainer = function(){
        var main = document.getElementById("main");
        canvas.width  = main.offsetWidth;
        canvas.height = main.offsetHeight;
        H = canvas.height;
        W = canvas.width;
    };
    
    this.getHeight = function(){
        return H;
    };
    
    this.getWidth = function(){
        return W;
    };
}