var playerPoints = 0, computerPoints = 0;
var gameActive = true;

function rollDice() {
    var playerDice1 = document.getElementById('playerDie1');
    var playerDice2 = document.getElementById('playerDie2');
    var computerDice1 = document.getElementById('computerDie1');
    var computerDice2 = document.getElementById('computerDie2');

    var playerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    var computerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

    rollDieAnimation(playerDice1);
    rollDieAnimation(playerDice2);
    rollDieAnimation(computerDice1);
    rollDieAnimation(computerDice2);

    setTimeout(function () {
        playerDice1.src = `dice${playerRoll[0]}.png`;
        playerDice2.src = `dice${playerRoll[1]}.png`;
        computerDice1.src = `dice${computerRoll[0]}.png`;
        computerDice2.src = `dice${computerRoll[1]}.png`;

        updateGame(playerRoll, computerRoll);
    }, 1000);
}

function rollDieAnimation(die) {
    var faces = ['1', '2', '3', '4', '5', '6'];
    var i = 0;
    var interval = setInterval(function () {
        die.src = `dice${faces[i]}.png`;
        i++;
        if (i === faces.length)
            clearInterval(interval);
    }, 100);
}

function sumDice(dice) {
    return dice[0] + dice[1];
}

function updateGame(playerRoll, computerRoll) {
    var playerSum = sumDice(playerRoll);
    var computerSum = sumDice(computerRoll);
    var resultText = `You rolled: ${playerRoll[0]} + ${playerRoll[1]} = ${playerSum}.<br>Computer rolled: ${computerRoll[0]} + ${computerRoll[1]} = ${computerSum}.<br>`;

    if (playerSum === computerSum) {
        resultText += "It's a tie. No points awarded.";
    } else {
        var roundWinner = "computer";
        var winningRoll = computerRoll;
        var winningSum = computerSum;
        if (playerSum > computerSum) {
            roundWinner = "player";
            winningRoll = playerRoll;
            winningSum = playerSum;
        }

        var points = (winningRoll[0] === winningRoll[1]) ? winningSum * 2 : winningSum;
        if (roundWinner === "player") {
            playerPoints += points;
            resultText += `You win this round. ${points} points awarded.<br>`;
        } else {
            computerPoints += points;
            resultText += `Computer wins this round. ${points} points awarded.<br>`;
        }
    }

    resultText += `Current Score -> You: ${playerPoints}, Computer: ${computerPoints}`;
    document.getElementById('gameStatus').innerHTML = resultText;

    checkGameOver();
}

function checkGameOver()
{
    if (playerPoints >= 100 || computerPoints >= 100)
    {
        gameActive = false;
        document.getElementById('rollButton').style.display = 'none';
        document.getElementById('quitButton').style.display = 'none';
        document.getElementById('gameStatus').innerHTML += `<br>Game Over. ${playerPoints >= 100 ? "You win!" : "Computer wins!"}`;
    } else {
        document.getElementById('quitButton').style.display = '';
    }
}

function quitGame()
{
    gameActive = false;
    document.getElementById('rollButton').style.display = 'none';
    document.getElementById('quitButton').style.display = 'none';
    document.getElementById('gameStatus').innerHTML = `Game Over. You chose to quit. Final Score -> You: ${playerPoints}, Computer: ${computerPoints}`;
}
