let buttonColors=["red", "blue", "green", "yellow"];
let pattern=[];
let userClickedPattern=[];

let started=false;
let level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function (){
    let userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    play_sound(userChosenColor);
    animate_press(userChosenColor);

    check_answer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    let randomChosenColor=Math.floor(Math.random()*3);
    pattern.push(buttonColors[randomChosenColor]);

    level++;
    $("#level-title").text("Level " + level);

    play_sound(buttonColors[randomChosenColor]);
    animate_press(buttonColors[randomChosenColor]);
}


function check_answer(currentLevel){

    if(pattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === pattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        }
    else{
        play_sound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}


function play_sound(name){
    let audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate_press(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("."+currentColor).removeClass("pressed");
    },100)
}

function startOver(){
    level=0;
    pattern=[];
    started=false;
}