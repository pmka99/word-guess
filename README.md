I built a web page by react.This app is a word guessing game that user can play with a robot.

# Dataset
file: word.txt

the dataset contains 673 words.each word has 5 letter.

## About Game 
First I created dynamic routes for 3 game levels.At first page, users can select level and go to a game and the app selects a word of dataset.

In the game, they can guess the word until remain time of each turn. Robot satrt guessing as first player.each player can correct word earlier he/she/it is winner.the app pass each guess that enter by user or robot to 'src/component/guessInput.js' for showing in app window;in 'guessInput.js' word that guesses by player or robot, are passed to a function for showing the green letter,yellow letter and red letter.

green leters are the letters that are placed in the correct position in correct word. yellow letters are the letters that have existed in correct word but in a wrong position. And red letters are the letters that don't existed in correct word.
attension:in showing app, the color of red letters is gray.

## About Robot
Robot guesses by random function in some levels(random1,random2,random3,random5,random6,random10);
each number of random functions show accuracy of robot's guesses.In each level and turn robot uses the one of the random functions.
robot only can guess the words that are existed in dataset.

# explaination of some variable that taken name in About Robot

$word: correct word <br/>
$list: list of all of guesses that are entered in app by users or robot until now. <br/>
$greenletter :green leters are the letters that are placed in the correct position in correct word <br/>
--- structure:[ letter[i] ] <br/>
---  *** letter: correct letter; <br/>
---  *** i: correct position of correct letter <br/>
$yellowletter :yellow letters are the letters that have existed in correct word but in a wrong position. <br/>
--- structure:[ letter[i] ] <br/>
---  *** letter: correct letter; <br/>
---  *** i: wrong position of correct letter <br/>
$redletter : red letters are the letters that don't existed in correct word. <br/>
--- structure:[ wrong letter ] <br/>
$data:  my dataset (an array of all words in my dataset) <br/>
$guess: the word that robot guesses. <br/>
$wordInList: an array with length 1.$wordInList.length can be 0 or 1; <br/>
---  if the  $guess is existed in $list => $wordInList =[$guess] <br/>
---  else => $wordInList=[] <br/>
$search: It is an array; each items has two parameters.this item is result of serch in $data for filtering it by $greenletter or $yellowletter  or both. <br/>
--- structure:[[word,$sum]] <br/>
---  *** word:word of result of search in $data <br/>
---  *** sum($sum):it is a sum of the Score of each word for a better guess <br/>

In 'robot.js' we have getletter function.it has 2 input parameters ($word and $list) and return {$greenletter, $yellowletter, $redletter} <br/>
almost of random functions have 3 input parameters ($word, $data and $list) and return a word as robot's guess. <br/>

### How run app
`npm install`
`npm start`
