document.addEventListener("DOMContentLoaded", function () {
    //grab reference to Dom elements
    var $newGameButton = document.getElementById('new-game-button');
    var $placeholder = document.getElementById('placeholder');
    var $guessLetter = document.getElementById('guess-letter');
    var $guessesLeft = document.getElementById('guess-left');
    var $wins = document.getElementById("wins");
    var $losses = document.getElementById("losses");
    var $trivia = document.getElementById("trivia");





    //Create Varibles for game ( word bank, wins, loses, picked word, guesses left, game running, answer array, letters picked answer bank, incorrect letters bank )
    var wordbank = ["Question","Cheverolet", "Yosemite", "Puns", "Bokeh", "Beav", "Melinda", "Jennifer", "Rhodonna", "Jackson", "Lydia", "Ethan"];
    var wins = 0;
    var losses = 0;
    var guessesLeft = 10;
    var gameRunning = false;
    var answer = "";
    var answerArray = [];
    var guessLetter = [];
    var wrongLetter = [];
    var sound;


    //Create a new game function to reset all stats and pick a new word and create placeholders
    function newGame() {
        //reset all game info
        gameRunning = true;
        guessesLeft = 10;
        guessLetter = [];
        wrongLetter = [];
        answerArray = [];
        //Pick new word
        answer = wordbank[Math.floor(Math.random() * wordbank.length)];
        console.log(answer);
        //Create placeholders
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] === " ") {
                answerArray.push(" ");
            }
            else {
                answerArray.push("_");
            }
        }

        //Write all new game stuff to the DOM
        $guessesLeft.textContent = guessesLeft;
        $placeholder.textContent = "Word: " + answerArray.join(" ");
        $guessLetter.textContent = wrongLetter;
        changeTrivia();
    }
    //Letter guess function takes in the letter you guesses and sees if it's in the selected word
    function letterGuess(letter) {
        if (gameRunning === true && guessLetter.indexOf(letter) === -1) {
            //Run Game Logic
            guessLetter.push(letter);
            // check letter to see if it is right
            for (var i = 0; i < answer.length; i++) {
                if (answer[i].toLowerCase() === letter.toLowerCase()) {
                    answerArray[i] = answer[i];
                }
            }
            $placeholder.textContent = "Word: " + answerArray.join(" ");
            checkWrong(letter);

        }
        else {
            if (gameRunning === false) {
                alert("Press New Game to begin.");
            }
            else {
                alert("Try a new letter.");
            }
        }
    }

    //check incorrect(letter)
    function checkWrong(letter) {
        if (answerArray.indexOf(letter.toLowerCase()) === -1 &&
            answerArray.indexOf(letter.toUpperCase()) === -1) {
            guessesLeft--;
            wrongLetter.push(letter);
            $guessLetter.textContent = wrongLetter.join(" ");
            $guessesLeft.textContent = guessesLeft;

        } else {
            checkLoss();
            checkWin();
        }



    }

    //check losing
    function checkLoss() {
        if (guessesLeft === 0) {
            losses++;
            gameRunning = false;
            $losses.textContent = ("Losses: " + losses);
            $placeholder.textContent = answer;
            changeImage();
            changeTrivia();
            //soundPlay();
        }


    }

    //check win
    function checkWin() {

        console.log("something", answer, answerArray.join(""))
        if (answer === answerArray.join("").toString()) {
            wins++;
            gameRunning = false;
            $wins.textContent = ("Wins: " + wins);
            changeImage();

            //soundPlay();
        }
    }


    //Change the image function
    function changeImage() {
        if (answer === "Question") {
            $("#picture").html("<iframe width='312' height='211' src='https://www.youtube.com/embed/NP9iOqdxS8c?list=SRthe%20moody%20blues%20question' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");
        }
        if (answer === "Cheverolet") {
            $("#picture").html('<img  src="assets/images/chevy.png" alt="Chevy"/>');
        }
        if (answer === "Yosemite") {
            $("#picture").html('<img  src="assets/images/Yosemite.png" alt="Yosemite"/>');
        }
        if (answer === "Puns") {
            $("#picture").html('<div style="width:100%;height:0;padding-bottom:149%;position:relative;"><iframe src="https://giphy.com/embed/3oEjHQWulS5TeU4nEk" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/fallontonight-fathers-day-dad-jokes-quotes-3oEjHQWulS5TeU4nEk">via GIPHY</a></p>');
        }
        if (answer === "Bokeh") {
            $("#picture").html('<img  src="assets/images/bokeh.png" alt="Awe Dad!"/>');
        }
        if (answer === "Sassafrass") {
            $("#picture").html('<img  src="assets/images/sarsaparilla.png" alt="Root Beer"/>');
        }
        if (answer === "Beav") {
            $("#picture").html('<div style="width:100%;height:0;padding-bottom:74%;position:relative;"><iframe src="https://giphy.com/embed/xT9IguzlQLhrPaqUXC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/leave-it-to-beaver-cleaver-cleavers-xT9IguzlQLhrPaqUXC">via GIPHY</a></p>');
        }
        if (answer === "Melinda") {
            $("#picture").html('<img  src="assets/images/Melinda.JPG" alt="Melinda"/>');
        }
        if (answer === "Jennifer") {
            $("#picture").html('<img  src="assets/images/Jennifer.JPG" alt="Jennifer"/>');
        }
        if (answer === "Rhodonna") {
            $("#picture").html('<img  src="assets/images/PoppyYaya.JPG" alt="Rhodonna"/>');
        }
        if (answer === "Lydia") {
            $("#picture").html('<img  src="assets/images/Lydia.JPG" alt="Lydia"/>');
        }
        if (answer === "Jackson") {
            $("#picture").html('<img  src="assets/images/Jack.JPG" alt="Jackson"/>');
        }
        if (answer === "Ethan") {
            $("#picture").html('<img  src="assets/images/Ethan.JPG" alt="Ethan"/>');
        }
    }
    //Change the trivia function
    function changeTrivia() {
        if (answer === "Question") {
            $trivia.textContent = ('This is a sequel of sorts to The Moody Blues 1986 hit "Your Wildest Dreams." Both songs were written by the groups guitarist, Justin Hayward," who told as that the success of "Dreams" showed him that such subject matter had universal appeal and was far from frivolous. As for the inspiration, he said: "They both were about at least one particular person. I would not say it was all about one person, but at least one particular person. And my advice to anybody who wants to go back is that you can never go home. And best to leave the past as the past.')
        }
        if (answer === "Cheverolet") {
            $trivia.textContent = ("Seven different V8s were available in 1957. One of the options was the legendary 'Super Turbo Fire V8' which produced 283 horsepower thanks to continuous fuel injection. A vehicle with this option is rare since most Tri Fives were fitted with a two or four barrel carburetor.")
        }
        if (answer === "Yosemite") {
            $trivia.textContent = ("Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra.")
        }
        if (answer === "Puns") {
            $trivia.textContent = ("The humorous use of a word or phrase so as to emphasize or suggest its different meanings or applications, or the use of words that are alike or nearly alike in sound but different in meaning; a play on words.")
        }
        if (answer === "Bokeh") {
            $trivia.textContent = ("The orbs created when lights are out of focus in an image. It’s a neat effect to have in the background of a photo, created through wide apertures. It will have an interesting effect on your image quality. ")
        }
        if (answer === "Sassafrass") {
            $trivia.textContent = ("This is used as an ingredient in making Root Beer.")
        }
        if (answer === "Beav") {
            $trivia.textContent = ("Nickname of the title character of Poppy's favorite show from the 50s.")
        }
        if (answer === "Melinda") {
            $trivia.textContent = ("A genius-level intellect, who kept her brains secret for many years as her hidden super power only to gradually unveil her talents over many years so as to not overwhelm the world with her greatness.")
        }
        if (answer === "Jennifer") {
            $trivia.textContent = ("Being always a little too grown up for her age, she was prepared to be a triumphant adult from an early age. She has an unending supply of love and compassion for anyone in need of it.")
        }
        if (answer === "Rhodonna") {
            $trivia.textContent = ("Famous for her Annette Funicello figure, she use to walk home everyday when she wasn't hanging out outside the photography room.")
        }
        if (answer === "Jackson") {
            $trivia.textContent = ("The pioneer in grandchilding, this person has never failed in making the most outlandish messes with baked beans.")
        }
        if (answer === "Lydia") {
            $trivia.textContent = ("The female lead in a cast of misfits, she has always stood out in her calm and kindness even from her young age.")
        }
        if (answer === "Ethan") {
            $trivia.textContent = ("A self-proclaimed superhero from birth, this young man carries a personality that is 100 times bigger than his actual size.")
        }
    }
    //Play sound function

    function soundPlay() {
        if (guessesLeft === 0) {
            sound("http://www.moviesoundclips.net/movies1/potter1/accepted.mp3");
        }
        if (answer.toLowerCase === answerArray.join("").toLowerCase) {
            sound("http://www.moviesoundclips.net/movies1/potter1/nosuchthing.mp3");
        }
        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function () {
                this.sound.play();
            }
            this.stop = function () {
                this.sound.pause();
            }
        }
    }
    //Add event listenier for new game button
    $newGameButton.addEventListener("click", newGame);
    //Add onkey up event to trigger letter guess

    document.onkeyup = function (event) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            letterGuess(event.key);

        }

    }




});