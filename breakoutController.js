/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BreakoutController(){
    var breakoutModel = new BreakoutModel(),
        breakoutView = new BreakoutView();
        breakoutView.fitToContainer();
        breakoutModel.setDimensions(breakoutView.getHeight(), breakoutView.getWidth());
        breakoutModel.init();
        setInterval(update, 1000/60);
    function update(){
        breakoutView.fitToContainer();
        breakoutModel.setDimensions(breakoutView.getHeight(), breakoutView.getWidth());
        breakoutModel.moveBall();
        breakoutView.update(breakoutModel.getBall(), breakoutModel.getBricks(), breakoutModel.getPaddle(), breakoutModel.getGameState(), breakoutModel.getGameWin());
        breakoutView.updateScore(breakoutModel.getScore());
    };
    
    if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var g = event.gamma,
                a = event.alpha,
                b = event.beta;
                
                breakoutModel.movePaddle(g);
            });
    }
}
var breakoutController = new BreakoutController();
