//Creates empty target variable
var target = 0;
//Creates empty array to track guesses
var guesses = [];
//Generates random number from 1-10 and sets target variable
var generateRandNum = function (){
  target = Math.floor(Math.random() * 10 + 1);
};
//Creates empty 'previous guess' variable to track the last guess
var prevGuess = 0;

//Generates random number needed to start game
generateRandNum();

//Updates 'previous guess' variable
var updatePrevGuess = function(){
  prevGuess = guesses[guesses.length - 1];
};

//Checks to make sure the input is valid. If it is, runs the game
var inputValidator = function(){
  //Pushes guess into guesses array
  guesses.push($('#number-input').val());
  //Updates the 'previous guess' variable
  updatePrevGuess();
  //Creates variable used to check if guess is a repeat
  var repeat = false;
  //Loops through guesses array, checking the last guess again all other guesses in array. If the guess is a repeat, changes the repeat variable to 'true'
  for(var i =0; i < guesses.length -1; i++){
    if(guesses[i] === guesses[guesses.length -1]){
      repeat = true;
    }
  }
  //Parses the previous guess variable from a string to a number
  var num = parseInt(prevGuess);
  //If the guess is out of range, or has been previously guesses, the player is prompted to guess again. If not, the game continues
  if(num < 0 || num > 10){
    alert('Whoooa sorry that number is out of range! Try guessing again');
    resetInputBox();
    //Removes last guess
    guesses.splice(-1,1);
  } else if(repeat == true){
    alert('Wait you already guessed that! Guess again');
      //Removes last guess
      guesses.splice(-1,1);
      resetInputBox();
  } else {
    hotOrCold();
  }
};

//Pushes guess to 'guesses' array and runs 'inputValidator' when 'submit' button is clicked
$('#submit-btn').on('click', inputValidator);

//Makes pressing the 'enter' key also run 'inputValidator' (so users can either hit 'submit' button or press the 'enter' key)
$("input").keypress(function(event) {
    if (event.which == 13) {
        event.preventDefault();
        inputValidator();
    }
});


//Resets the background color
var resetBackground = function(color){
  $('.background').css('background-color', color);
};

//Changes 'helper text' at the top of the page
var changeHelperText = function(text){
  $('#helper-text').text(text);
};

//Creates hot and cool color variables, to be used as background colors
var hotRed = '#FF4136';
var coolBlue = '#7FDBFF';
var burningUp = '#FF0000';
var iceCold = '#C4EFFF';
var warmRed = '#FC6868';

//Lets player know whether they're hot or cold and runs resetInputBox, guessTracker, and displayPrevGuesses
var hotOrCold = function(){
  //Creates empty variable that changes depending on whether the player's guess is low or high
  var lowHigh = '';
  //Creates a variable that gets the absolute distance between the player's guess and the target #
  var range = Math.abs(target - prevGuess);
  //Sets the 'lowHigh' variable
  if(prevGuess < target)
    lowHigh = 'higher.';
  if(prevGuess > target)
    lowHigh = 'lower.';
  //Lets user know whether they are hot or cold, based on how far their guess was from the target
  if(range >0 && range <=5){
    resetBackground(burningUp);
    changeHelperText("You're BURNING UP! Try guessing a little " + lowHigh);
  }
  if(range >5 && range <=10){
     resetBackground(hotRed);
     changeHelperText("You're getting HOT! Try guessing " + lowHigh);
  }
  
    resetInputBox();
    guessTracker();
    displayPrevGuesses();

    console.log(target);
    console.log(guesses);
    console.log(prevGuess);
};


//Resets guess input box
var resetInputBox = function(){
  document.getElementById("guessing-form").reset();
};

//Tracks amount of guesses and alerts player if game is over
var guessTracker = function(){
  var guessNum = guesses.length;
  //Changes 'Guesses Remaining' number
  $('#guesses-remaining').text(3 - guessNum);
  //Checks if guess is a winner
  if(prevGuess == target){
      prizeGenerator();
  } else{
      //Alerts game over
      if(guessNum === 3){
        alert("Sorry that's all your guesses! The number was " + target);
        startOver();
      }
  }
};

//Displays the players' previous guesses
var displayPrevGuesses = function(){
  var guessStr ='';
  //If there's only been one guess, displays that # as 'previous guess'
  if(guesses.length == 1){
     for(var i =0; i < guesses.length; i++){
      guessStr += guesses[i] + ' ';
     }
    $('#prev-guesses').append("<p id='prev-guess-text'>Your previous guesses are: \n" +guessStr + "</p>");
  //If there have been more than one guesses, displays each guess with a comma separating each
  } else if(guesses.length > 1){
    for(var i =0; i < guesses.length; i++){
      guessStr += guesses[i];
      if(i < guesses.length - 1){
        guessStr += ', ';
      }
     }
    $('#prev-guess-text').text("Your previous guesses are: \n" +guessStr);
  }
};

//Resets the game and starts over
var startOver = function(){
  guesses = [];
  generateRandNum();
  resetBackground('white');
  $(".hide-me").show();
  $('#prev-guesses').empty();
  changeHelperText('Enter a guess from 1-10. Guess right to win!');
  $('#guesses-remaining').text(3);
  $("#prize-image").children('img').remove();
};


//Calls 'start over' function when start over button is clicked
$('#startover-btn').on('click', startOver);


//Generates a 'prize' and alerts the winner they've won
var prizeGenerator = function(){
  //Generate random number 1-3
  var randNum = Math.floor(Math.random() * 3);
  //Creates a 'prizes' object
  var prizes =[{name:'Hamper', text: " Remember to go to checkers before 24hrs."},
  {name:'Spa Voucher', text: " Be sure to redeem your voucher before month end"}];
  alert('You win! Click OK to see your prize');
      resetBackground('white');
      $("#prize-image").append(prizes[randNum].link);
      $('#prev-guesses').empty();
      $(".hide-me").hide();
      changeHelperText('Congratulations! You won a ' + prizes[randNum].name + '.' + prizes[randNum].text);
      
}




