<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sika-noppapeli</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Sika-noppapeli</h1>
    <div id="game-mode">
        <label>
            <input type="radio" name="dice-mode" value="1" checked> Yksi noppa
        </label>
        <label>
            <input type="radio" name="dice-mode" value="2"> Kaksi noppaa
        </label>
    </div>

    <div id="player-section">
        <input type="text" id="playerName" placeholder="Pelaajan nimi">
        <button id="add-player">Lisää pelaaja</button>
        <button id="start-game" disabled>Aloita peli</button>
    </div>

    <div id="peliruutu" style="display: none;">
        <p>Vuorossa: <span id="current-player"></span></p>
        <div id="dice-container">
            <img id="dice-image-1" src="muut/kuvat/1.png" alt="Noppa">
            <img id="dice-image-2" src="muut/kuvat/1.png" alt="Noppa" style="display: none;">
        </div>
        <button id="roll-dice" disabled>Heitä noppaa</button>
        <button id="hold" disabled>Pidä pisteet</button>
        <p>Kierroksen pisteet: <span id="round-score">0</span></p>
        <p id="total-scores"></p>
        <button id="reset">Uudelleen</button>
    </div>
    

    <div id="notification" class="notification"></div>

    <script src="koodi.js"></script>
</body>
</html>
