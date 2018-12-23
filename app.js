/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// game values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min,max),
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	  minNum = document.querySelector('.min-num'),
	  maxNum = document.querySelector('.max-num'),
	  guessInput = document.querySelector('#guess-input'),
	  guessBtn = document.querySelector('#guess-btn'),
	  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}

})


guessBtn.addEventListener('click',function(){
	let guess = parseInt(guessInput.value);

	if(guess<min || isNaN(guess) || guess>max){

		setMessage(`Please enter num between ${min} and ${max}`,'red');
	}

	if(guess === winningNum){
		gameOver(true,`${winningNum} is correct. You have WON!`);

	}else{
		guessesLeft -= 1;

		if(guessesLeft === 0){
			gameOver(false,`Game Over, you Lost. Correct number was ${winningNum}`);
			
		}else{

			setMessage(`${guess} is incorrect. ${guessesLeft} guesses left`,'red');
			guessInput.value = '';
			guessInput.style.borderColor = 'red';
		}
	}
});

function setMessage(msg,color){
	message.style.color = color;
	message.textContent = msg;

}

function gameOver(won, msg){
	let color;
	won === true?color = 'green': color = 'red';

	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	setMessage(msg,color);

	guessBtn.value = 'Play Again';
	guessBtn.className = 'play-again';

}

function getRandomNum(min,max){
	return Math.floor(Math.random() * (max-min+1) + min);
}