var objGame = {
	//DOM
	pgHint: document.getElementById("hint"),
	pgSolution: document.getElementById("solution"),
	pglettersUsed: document.getElementById("lettersUsed"),
	pgguessRemain: document.getElementById("guessesRemaining"),
	pgWins: document.getElementById("wins"),
	pgLosses: document.getElementById("losses"),
	hangerImg: document.getElementById("hanger"),
	invisImg: document.getElementById("invisImg"),
	// valid input characaters
	alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
	// words to solve
	word: ["cinderella",
		"twilight",
		"gladiator",
		"inception",
		"tangled",
		"frozen",
		"watchmen",
		"dracula",
		"frankenstein",
		"titanic",
		"vertigo",
		"avatar",
		"braveheart",
		"trainspotting",
		"goodFellas",
		"scarface",
		"grease",
		"fargo",
		"scream",
		"casablanca",
		"zombieland",
		"sharknado",
		"superbad",
		"rocky",
		"twister",
		"tarzan",
		"clueless",
		"platoon",
		"patton",
		"amadeus",
		"philadelphia",
		"airplane",
		"waterWorld",
		"metropolis",
		"hairspray",
		"highlander",
		"tron",
		"gandhi",
		"godzilla",
		"ghostbusters",
		"zoolander",
		"pinocchio",
		"dodgeball",
		"clerks"
	],
	// hints
	hint: ["don't be out past midnight",
		"sparkly vampires hate warewolves",
		"don't feed me to the lions",
		"reality folding in on itself",
		"long blonde hair takes forever to brush",
		"Just let it go",
		"bad superheros",
		"forever my beloved",
		"that doctor f. is quite a body builder",
		"you let do, I let go",
		"hitchcock thriller, starts with a 'v'",
		"beautiful blue virtual reality",
		"you've got to be brave to wear a kilt",
		"Look!  Choo-Choos!",
		"What, am I, a clown to you?",
		"Say hello to my little friend",
		"it's the word",
		"aww-geez",
		"EEEEEEEEEEEEEKKKKKKK!!!!",
		"Here's lookin' at you, kid",
		"I love Twinkies",
		"Tara Reid has hit rock bottom",
		"super Good!",
		"not with bullwinkle",
		"cows!",
		"the ape man",
		"why learn to paralell park?  Every place has valet!",
		"you're in the army now",
		"not oswald",
		"mozart",
		"tom hanks story",
		"looks like I picked the wrong day to quit sniffin' glue",
		"Kevin Costner's swan song",
		"Supermans' hometown with robots!",
		"not a hair out of place",
		"there can be only one",
		"virtual speed bike racers",
		"passive resistance",
		"oh, no!  there goes tokyo",
		"he slimed me",
		"I got the black lung, pop",
		"don't lie to me, boy",
		"if you can dodge a wrench...",
		"i'm not even supposed to be here today"
	],
	// guessed letters
	lettersGuessed: [],
	// current word
	currWord: [],
	// current hint
	currHint: "",
	//guess count
	guessCount: 6,
	// current answer
	currAnswer: "",
	// random
	rnd: 0,
	// user guess
	userGuess: "",
	// correct word
	correctWord: [],
	//wins/losses
	wins: 1,
	losses: 1,

	wordStart: "",

	// end game actions
	checkGameOver: function(){
		// if out of guesses
		if(this.guessCount == 0){
			// loop to current word length
			for(var i = 0; i < this.currWord.length; i++ ){
				// split solution letters to divs on stage
				this.pgSolution.children[i].innerHTML = this.currWord[i];
			}
			// display game over banner
			this.invisImg.src = "assets/img/game-over.png";
			this.invisImg.style.visibility = "visible";
			// update losses counter
			this.pgLosses.innerHTML = "losses: " + this.losses++;
		}
		// else user got all letters
		else if (this.correctWord.length == this.currWord.length){
			// display not guilty banner
			this.invisImg.src = "assets/img/not-guilty.png";
			this.invisImg.style.visibility = "visible";
			//update wins counter
			this.pgWins.innerHTML = "wins: " + this.wins++;
		}
	},

	//play again
	resetVars: function(){
		this.lettersGuessed = [];
		this.currWord = [];
		this.currHint = "";
		this.guessCount = 6;
		this.currAnswer = "";
		this.rnd = 0;
		this.userGuess = "";
		this.correctWord = [];
		this.pglettersUsed.textContent = "";
		this.pgguessRemain.textContent = this.guessCount;

	},

	gamePlay: function(){
		//error check: user has guesses remaining and hasn't solved word
		if((this.guessCount > 0) && (this.correctWord.length < this.currWord.length)){
			// get user input/set to lower case
			this.userGuess = event.key.toLowerCase();
			// error check: valid key input
			if(this.alphabet.indexOf(this.userGuess) > -1){
				// check lettersGuessed array to see if letter has been guessed already
				if(this.lettersGuessed.indexOf(this.userGuess) > -1){
					alert("You already guessed " + this.userGuess + "!");
				}
				else{
					// push user guess to letters guessed array
					this.lettersGuessed.push(this.userGuess);
					// if guess not correct
					if(this.currWord.indexOf(this.userGuess) < 0){
						//decrement guessCount
						this.guessCount--;
						//change hanging image
						this.hangerImg.src="assets/img/man"+ this.guessCount + ".png";
						// write remaining guess number to page
						this.pgguessRemain.innerHTML = this.guessCount;
					}
					// else guess correct
					else{
						for(var i = 0; i < this.currWord.length; i++ ){
							if(this.userGuess == this.currWord[i]){
								this.pgSolution.children[i].innerHTML = this.userGuess;
								this.correctWord.splice(i,0,this.userGuess);
							}
						}
					}
				}
				// used letter
				this.pglettersUsed.innerHTML = this.lettersGuessed;
				// check game over status
				this.checkGameOver();
			}
		}
	},

	// set up game
	drawSolution: function(){
		this.resetVars();
		// clear previous words on board if any
		while (this.pgSolution.hasChildNodes()) {
			this.pgSolution.removeChild(this.pgSolution.lastChild);
		}
		// set win/lose banner to hidden
		this.invisImg.style.visibility = "hidden";
		// reset hanger image
		hanger.src = "assets/img/man6.png";
		// get random word from word array
		if(this.word.length > 0){
			this.rnd = Math.floor(Math.random() * this.word.length);
			this.currWord = this.word[this.rnd];
			this.currHint = this.hint[this.rnd];	
		}
		else{
			alert("Round Over!  You guessed " + this.wins + "out of " + this.wordStart + " correctly");
		}
		

		// remove word/hint from arrays so that they are not used again in current round
		var indexWord = this.word.indexOf(this.currWord);
		if (indexWord > -1) {
			this.word.splice(indexWord, 1);
		}

		var indexHint = this.hint.indexOf(this.currHint);
		if (indexHint > -1) {
			this.hint.splice(indexHint, 1);
		}

		// write hint to page
		this.pgHint.innerHTML = this.currHint;

		// split currWord into new DOM element for each lettersGuessed
		for (var i = 0; i < this.currWord.length; i++){
			var newDiv = document.createElement("div");								// create DIV for letter
			this.pgSolution.appendChild(newDiv);									// append new div to solution div
			newDiv.setAttribute("class", "domLetter");
			var dummyData = this.pgSolution.getElementsByClassName("domLetter")[i];	// year , this element is target
			dummyData.innerHTML = "&nbsp;";											// initial fill data (space)
		}
	}
}

// set the stage
document.load = objGame.drawSolution();
objGame.wordStart = objGame.word.length;
document.onkeyup = function(event){
	objGame.gamePlay();
}
