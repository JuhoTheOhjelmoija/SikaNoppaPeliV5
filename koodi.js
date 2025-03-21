document.addEventListener('DOMContentLoaded', function () {
    let players = [];
    let currentPlayerIndex = 0;
    let currentScore = 0;
    let targetPoints = 100;
    let gameStarted = false;
    let diceMode = 1; 
    let dice1 = 1;
    let dice2 = 1;
    let doubleCount = 0;

    function updateUI() { 
        const currentPlayerElement = document.getElementById('current-player');
        const playersElement = document.getElementById('total-scores');
        playersElement.innerHTML = '';

        players.forEach((player, index) => {
            const playerItem = document.createElement('div');
            playerItem.innerText = `${index + 1}. ${player.name} - Pisteet: ${player.score}`;
            playersElement.appendChild(playerItem);
        });

        if (players[currentPlayerIndex]) {
            currentPlayerElement.innerText = `Nyt heittää: ${players[currentPlayerIndex].name}`;
        }

        document.getElementById('round-score').textContent = currentScore;
    }

    function addPlayer() {
        const playerNameInput = document.getElementById('playerName');
        const playerName = playerNameInput.value.trim();

        if (playerName !== '') {
            players.push({ name: playerName, score: 0 });
            playerNameInput.value = '';
            updateUI();
            document.getElementById('start-game').disabled = false;
        } else {
            showNotification('HUOM! Pelaajan nimi ei voi olla tyhjä.', 'error');
        }
    }

    function startGame() {
        if (players.length < 2) {
            showNotification('HUOM! Lisää vähintään kaksi pelaajaa.', 'error');
            return;
        }

        diceMode = document.querySelector('input[name="dice-mode"]:checked').value;

        // Näytetään tai piilotetaan toinen noppa
        if (diceMode == 1) {
            document.getElementById('dice-image-2').style.display = 'none';
        } else {
            document.getElementById('dice-image-2').style.display = 'inline';
        }

        gameStarted = true;
        document.getElementById('roll-dice').disabled = false;
        document.getElementById('hold').disabled = false;
        document.getElementById('peliruutu').style.display = 'block';
        document.getElementById('player-section').style.display = 'none';

        updateUI();
    }

    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        currentScore = 0;
        doubleCount = 0;
        updateUI();
    }

    function rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function rollDice() {
        let roundPoints = 0;

        if (diceMode == 1) { 
            dice1 = rollDie();
            document.getElementById('dice-image-1').src = `muut/kuvat/${dice1}.png`;

            if (dice1 === 1) {
                showNotification('Sika vei pisteet! Vuoro siirtyy seuraavalle.', 'error');
                switchPlayer();
                return;
            }
            roundPoints = dice1;
        } else { 
            dice1 = rollDie();
            dice2 = rollDie();
            document.getElementById('dice-image-1').src = `muut/kuvat/${dice1}.png`;
            document.getElementById('dice-image-2').src = `muut/kuvat/${dice2}.png`;

            if (dice1 === 1 || dice2 === 1) {
                showNotification('Sika vei pisteet! Vuoro siirtyy seuraavalle.', 'error');
                switchPlayer();
                return;
            } else if (dice1 === dice2) {
                roundPoints = (dice1 + dice2) * 2;
                doubleCount++;
                if (doubleCount === 3) {
                    showNotification('Kolme tuplaa! Menetit pisteet.', 'error');
                    switchPlayer();
                    return;
                }
            } else {
                roundPoints = dice1 + dice2;
                doubleCount = 0;
            }
        }

        currentScore += roundPoints;
        updateUI();
    }

    function hold() {
        players[currentPlayerIndex].score += currentScore;

        if (players[currentPlayerIndex].score >= targetPoints) {
            showNotification(`${players[currentPlayerIndex].name} VOITTI!`, 'success');
            resetGame();
        } else {
            switchPlayer();
        }
    }

    function resetGame() {
        gameStarted = false;
        players = [];  // Tyhjennetään pelaajat
        currentPlayerIndex = 0;
        currentScore = 0;
        doubleCount = 0;

        document.getElementById('roll-dice').disabled = true;
        document.getElementById('hold').disabled = true;
        document.getElementById('peliruutu').style.display = 'none';
        document.getElementById('player-section').style.display = 'block';
        document.getElementById('total-scores').innerHTML = ''; // Tyhjennetään pisteet
        document.getElementById('playerName').value = ''; // Tyhjennetään syötekenttä

        updateUI();
    }

    function showNotification(message, type) {
        const notificationElement = document.getElementById('notification');
        notificationElement.innerHTML = message;
        notificationElement.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
        notificationElement.classList.add('show');

        setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 2000);
    }

    document.getElementById('add-player').addEventListener('click', addPlayer);
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('roll-dice').addEventListener('click', rollDice);
    document.getElementById('hold').addEventListener('click', hold);
    document.getElementById('reset').addEventListener('click', resetGame);

    updateUI();
});
