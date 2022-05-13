var canvas;
var canvasContext;
var ballX; //represents the ball's x cooordinates
var ballY; //represents the ball's y cooordinates
var ballSpeedX = 10; //represents the speed at which the ball will move across the x axis
var ballSpeedY = 4;  //represents the speed at which the ball will move across the x axis
var player1Score = 0;
var player2Score = 0;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY  = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
//When the window loads
window.onload = () => {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    ballX = canvas.width/2; //put the ball in the ceneter horizontally
    ballY = canvas.height/2; //put the ball in the ceneter vertically
    setInterval(()=>{drawEverything(); moveEverything();}, 1000/framesPerSecond); //calls a particulaar function at a certain interval in milli seconds (1000 ms = 1s)

    canvas.addEventListener('mousemove',
        (evt) =>{
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        }
    );
}

function resetBall(){
    ballSpeedX = -ballSpeedX; //invert the direction of the ball;
    ballX = canvas.width/2; //put the ball in the ceneter horizontally
    ballY = canvas.height/2; //put the ball in the ceneter vertically
}

function computerMovement(){
    var paddle2Center = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2Center < ballY -35){
        paddle2Y += 6;
    }
    else if (paddle2Center > ballY +35){
        paddle2Y -= 6;
    }
}

function moveEverything(){
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //if ball hits the left most side of the screen
    if(ballX < 0){
        //if the ball is in between the paddle
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX; //negates the value of the ball's X axis speed to send it the other direction
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY=deltaY * 0.35;
        }
        else{
            resetBall();
            player2Score++;
        }
       
    }

    //if ball hits the right most side of the screen
    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX; //negates the value of the ball's X axis speed to send it the other direction
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY=deltaY * 0.35;
        }
        else{
            resetBall();
            player1Score++;
        }
    }

    if(ballY < 0){
        ballSpeedY = -ballSpeedY; //negates the value of the ball's Y axis speed to send it the other direction
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY; //negates the value of the ball's X axis speed to send it the other direction
    }
}



function drawEverything(){
    canvasContext.fillStyle = "black"; //set the color you want the board to be filled
    canvasContext.fillRect(0,0,canvas.width,canvas.height); //starting from the top left corner to the entire heigh and width of the canvas fill it black

    //Drawing player one paddle
    canvasContext.fillStyle="white";
    canvasContext.fillRect(0,paddle1Y,PADDLE_WIDTH, PADDLE_HEIGHT);

    
    //Drawing player twos paddle
    canvasContext.fillStyle="white";
    canvasContext.fillRect(canvas.width-PADDLE_WIDTH,paddle2Y,PADDLE_WIDTH, PADDLE_HEIGHT);

    //Drawing the ball
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(ballX,ballY,10,0,Math.PI*2,true);
    canvasContext.fill();

    canvasContext.fillText(player1Score, 50,50);
    canvasContext.fillText(player2Score, canvas.width-50,50);
}