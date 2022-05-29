const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//Generate computer's choice for rock, paper scissors
function generateComputerChoice() {

  //const computerChoice = Math.floor(Math.random() * 3)
  //return computerChoice <= 0.33 ? 'paper' : computerChoice <=0.67? 'scissors' : 'rock' 
  return ['paper', 'scissor', 'rock'][Math.floor(Math.random() * 3)]
}

//Game winner logic
function winnerSelector(player1) {
  // generate player2 here

  const computerChoice = generateComputerChoice();
  console.log('computerchoice', computerChoice);
  if (player1 === "rock") {
    if (computerChoice === "rock") {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Draw.`;
    } else if (computerChoice === 'paper') {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Lose.`;
    } else {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Win.`
    }
  } else if (player1 === 'scissor') {
    if (computerChoice === "rock") {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Lose.`;
    } else if (computerChoice === 'paper') {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Win.`;
    } else {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Draw.`;
    }
  } else if (player1 === 'paper') {
    if (computerChoice === 'paper') {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Draw`
    } else if (computerChoice === 'scissor') {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Lost`
    } else if (computerChoice === 'rock') {
      return `Player chose ${player1} and Computer chose ${computerChoice} and game result is Won`
    }
  }
}

//console.log(winnerSelector('rock'), 'user gave rock');
//console.log(winnerSelector('paper'), 'user gave paper');
//console.log(winnerSelector('scissors'), 'user gave scissors');

const server = http.createServer((req, res) => {
  const readWrite = (file, contentType) => {
    fs.readFile(file, function (err, data) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    });
  };
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    readWrite('index.html', 'text/html')
  }
  else if (page == '/otherpage') {
    readWrite('otherpage.html', 'text/html')
  }
  else if (page == '/otherotherpage') {
    readWrite('otherotherpage.html', 'text/html')
  }
  else if (page == '/api') {
    console.log('User Choice', params.choice);
    if ('choice' in params) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      const data = winnerSelector(params.choice);
      console.log(data);
      res.write(data);
      res.end();
    }//choice if
  }//else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);


//Created by @RealRascalTwo, @XiaoLGrant, @miguelvargasdev, @jacktree_coding, @code_iradukunda, and Michael Randazzo