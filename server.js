const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques
app.use(express.static('public'));

// Liste des techniques de judo avec leurs catégories et vidéos YouTube
const techniques = [
  // Techniques de base
  { nom: "haraï-goshi", categorie: "Nage-waza (projection)", description: "Projection par fauchage de hanche", video: "https://www.youtube.com/watch?v=qTo8HlAAkOo" },
  { nom: "ippon-seoi-nage", categorie: "Nage-waza (projection)", description: "Projection par chargement d'épaule", video: "https://www.youtube.com/watch?v=FQnOlCxo4oI" },
  { nom: "de-ashi-baraï", categorie: "Nage-waza (projection)", description: "Balayage du pied qui avance", video: "https://www.youtube.com/watch?v=4BUUvqxi_Kk" },
  { nom: "kubi-nage", categorie: "Nage-waza (projection)", description: "Projection par la nuque", video: null },
  { nom: "kata-guruma", categorie: "Nage-waza (projection)", description: "Roue d'épaule", video: "https://www.youtube.com/watch?v=cnHRhSy8yi4" },
  { nom: "hiza-guruma", categorie: "Nage-waza (projection)", description: "Roue autour du genou", video: "https://www.youtube.com/watch?v=JPJx9-oAVns" },
  { nom: "sumi-gaeshi", categorie: "Nage-waza (projection)", description: "Renversement en coin", video: "https://www.youtube.com/watch?v=5VhduA5xkbA" },
  { nom: "tomoe-nage", categorie: "Nage-waza (projection)", description: "Projection en cercle", video: "https://www.youtube.com/watch?v=880WbHvHv6A" },
  { nom: "koshi-guruma", categorie: "Nage-waza (projection)", description: "Roue de hanche", video: "https://www.youtube.com/watch?v=SU7Id6uVJ44" },
  { nom: "uki-otoshi", categorie: "Nage-waza (projection)", description: "Chute flottante", video: "https://www.youtube.com/watch?v=6H5tmncOY4Q" },
  { nom: "sasae-tsurikomi-ashi", categorie: "Nage-waza (projection)", description: "Blocage du pied en soulevant", video: "https://www.youtube.com/watch?v=699i--pvYmE" },
  { nom: "o-goshi", categorie: "Nage-waza (projection)", description: "Grande projection de hanche", video: "https://www.youtube.com/watch?v=yhu1mfy2vJ4" },
  { nom: "tai-otoshi", categorie: "Nage-waza (projection)", description: "Renversement du corps", video: "https://www.youtube.com/watch?v=4x6S3Q-Ktv8" },
  { nom: "ko-soto-gari", categorie: "Nage-waza (projection)", description: "Petit fauchage extérieur", video: "https://www.youtube.com/watch?v=jeQ541ScLB4" },
  
  // Techniques 1er dan
  { nom: "tsurikomi-goshi", categorie: "Nage-waza (projection)", description: "Hanche en soulevant", video: "https://www.youtube.com/watch?v=McfzA0yRVt4" },
  { nom: "morote-seoi-nage", categorie: "Nage-waza (projection)", description: "Chargement d'épaule à deux mains", video: null },
  { nom: "ko-uchi-gari", categorie: "Nage-waza (projection)", description: "Petit fauchage intérieur", video: "https://www.youtube.com/watch?v=3Jb3tZvr9Ng" },
  { nom: "uchi-mata", categorie: "Nage-waza (projection)", description: "Fauchage à l'intérieur des cuisses", video: "https://www.youtube.com/watch?v=iUpSu5J-bgw" },
  { nom: "okuri-ashi-baraï", categorie: "Nage-waza (projection)", description: "Balayage des pieds qui suivent", video: "https://www.youtube.com/watch?v=nw1ZdRjrdRI" },
  { nom: "uki-goshi", categorie: "Nage-waza (projection)", description: "Hanche flottante", video: "https://www.youtube.com/watch?v=bPKwtB4lyOQ" },
  { nom: "o-soto-gari", categorie: "Nage-waza (projection)", description: "Grand fauchage extérieur", video: "https://www.youtube.com/watch?v=c-A_nP7mKAc" },
  { nom: "o-uchi-gari", categorie: "Nage-waza (projection)", description: "Grand fauchage intérieur", video: "https://www.youtube.com/watch?v=0itJFhV9pDQ" },
  
  // Techniques au sol (immobilisations) - Note: hon-gesa-gatame correspond à kesa-gatame
  { nom: "hon-gesa-gatame", categorie: "Katame-waza (contrôle)", description: "Contrôle fondamental en écharpe", video: "https://www.youtube.com/watch?v=NDaQuJOFBYk" },
  { nom: "kami-shiho-gatame", categorie: "Katame-waza (contrôle)", description: "Contrôle par les quatre coins du haut", video: "https://www.youtube.com/watch?v=HFuMjOv0WN8" },
  { nom: "yoko-shiho-gatame", categorie: "Katame-waza (contrôle)", description: "Contrôle par les quatre coins de côté", video: "https://www.youtube.com/watch?v=TT7XJVSEQxA" },
  { nom: "tate-shiho-gatame", categorie: "Katame-waza (contrôle)", description: "Contrôle par les quatre coins vertical", video: "https://www.youtube.com/watch?v=55-rFmBx53g" },
  { nom: "ushiro-gesa-gatame", categorie: "Katame-waza (contrôle)", description: "Contrôle en écharpe arrière", video: "https://www.youtube.com/watch?v=SBapox2M2dE" },
  
  // Étranglements
  { nom: "gyaku-juji-jime", categorie: "Shime-waza (étranglement)", description: "Étranglement croisé inversé", video: "https://www.youtube.com/watch?v=t3tQriIPdlI" },
  { nom: "hadaka-jime", categorie: "Shime-waza (étranglement)", description: "Étranglement nu", video: "https://www.youtube.com/watch?v=9f0n8jez7iA" },
  { nom: "kata-juji-jime", categorie: "Shime-waza (étranglement)", description: "Étranglement croisé à une main", video: "https://www.youtube.com/watch?v=3VZVUAmiMD8" },
  { nom: "nami-juji-jime", categorie: "Shime-waza (étranglement)", description: "Étranglement croisé normal", video: "https://www.youtube.com/watch?v=k2cHry9HByQ" },
  { nom: "okuri-eri-jime", categorie: "Shime-waza (étranglement)", description: "Étranglement par le col glissé", video: "https://www.youtube.com/watch?v=EiqyoVcIAi8" },
  
  // Clés de bras - pas de vidéos correspondantes dans la liste fournie
  { nom: "ude-hishigi-juji-gatame", categorie: "Kansetsu-waza (luxation)", description: "Luxation du bras en croix", video: null },
  { nom: "ude-hishigi-ude-gatame", categorie: "Kansetsu-waza (luxation)", description: "Luxation du bras par le bras", video: null },
  { nom: "ude-garami", categorie: "Kansetsu-waza (luxation)", description: "Bras entortillé", video: null }
];

// Route pour obtenir une technique aléatoire
app.get('/api/technique-aleatoire', (req, res) => {
  const techniqueAleatoire = techniques[Math.floor(Math.random() * techniques.length)];
  res.json(techniqueAleatoire);
});

// Route pour la page principale
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cartes Mémoire Judo</title>
    <style>
        :root {
            /* Day mode colors */
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --text-color: white;
            --card-front: linear-gradient(135deg, #ff6b6b, #ff8e53);
            --card-back: linear-gradient(135deg, #4facfe, #00f2fe);
            --btn-nouvelle: linear-gradient(135deg, #667eea, #764ba2);
            --btn-retourner: linear-gradient(135deg, #11998e, #38ef7d);
            --btn-theme: linear-gradient(135deg, #ffecd2, #fcb69f);
            --btn-theme-text: #333;
            --card-shadow: rgba(0,0,0,0.3);
            --btn-shadow: rgba(0,0,0,0.2);
        }

        [data-theme="night"] {
            /* Night mode colors */
            --bg-gradient: linear-gradient(135deg, #232526 0%, #414345 100%);
            --text-color: #e0e0e0;
            --card-front: linear-gradient(135deg, #434343, #000000);
            --card-back: linear-gradient(135deg, #2c3e50, #34495e);
            --btn-nouvelle: linear-gradient(135deg, #485563, #29323c);
            --btn-retourner: linear-gradient(135deg, #1e3c72, #2a5298);
            --btn-theme: linear-gradient(135deg, #ffb347, #ffcc33);
            --btn-theme-text: #333;
            --card-shadow: rgba(0,0,0,0.6);
            --btn-shadow: rgba(0,0,0,0.4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: var(--bg-gradient);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            transition: all 0.5s ease;
        }

        .container {
            text-align: center;
            max-width: 600px;
            width: 100%;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }

        h1 {
            color: var(--text-color);
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            flex: 1;
            min-width: 300px;
        }

        .theme-toggle {
            padding: 10px 20px;
            font-size: 1em;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            background: var(--btn-theme);
            color: var(--btn-theme-text);
            box-shadow: 0 4px 15px var(--btn-shadow);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .theme-toggle:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--btn-shadow);
        }

        .card-container {
            perspective: 1000px;
            margin-bottom: 30px;
        }

        .card {
            width: 400px;
            height: 350px;
            margin: 0 auto;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            cursor: pointer;
        }

        .card.flipped {
            transform: rotateY(180deg);
        }

        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 15px;
            box-shadow: 0 8px 25px var(--card-shadow);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            transition: all 0.5s ease;
        }

        .card-front {
            background: var(--card-front);
            color: white;
        }

        .card-back {
            background: var(--card-back);
            color: white;
            transform: rotateY(180deg);
            flex-direction: column;
            text-align: center;
        }

        .technique-nom {
            font-size: 2em;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .technique-categorie {
            font-size: 1.2em;
            margin-bottom: 15px;
            opacity: 0.9;
            font-weight: bold;
        }

        .technique-description {
            font-size: 1.1em;
            line-height: 1.4;
            opacity: 0.9;
            margin-bottom: 15px;
        }

        .video-container {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }

        .video-embed {
            width: 100%;
            height: 150px;
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .no-video {
            color: rgba(255,255,255,0.7);
            font-style: italic;
            font-size: 0.9em;
        }

        .controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }

        button {
            padding: 12px 25px;
            font-size: 1.1em;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            color: white;
            box-shadow: 0 4px 15px var(--btn-shadow);
        }

        .btn-nouvelle {
            background: var(--btn-nouvelle);
        }

        .btn-retourner {
            background: var(--btn-retourner);
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--btn-shadow);
        }

        button:active {
            transform: translateY(0px);
        }

        .instructions {
            color: var(--text-color);
            margin-top: 20px;
            opacity: 0.8;
            font-size: 1.1em;
        }

        @media (max-width: 480px) {
            .header {
                flex-direction: column;
                text-align: center;
            }

            h1 {
                font-size: 2em;
                min-width: auto;
            }

            .card {
                width: 320px;
                height: 280px;
            }
            
            .technique-nom {
                font-size: 1.5em;
            }

            .video-embed {
                height: 120px;
            }

            .controls {
                flex-direction: column;
                align-items: center;
            }

            button {
                width: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🥋 Cartes Mémoire Judo</h1>
            <button class="theme-toggle" onclick="toggleTheme()">
                <span id="theme-icon">🌙</span>
                <span id="theme-text">Mode Nuit</span>
            </button>
        </div>
        
        <div class="card-container">
            <div class="card" id="card">
                <div class="card-face card-front">
                    <div class="technique-nom" id="technique-nom">
                        Cliquez sur "Nouvelle Technique"
                    </div>
                </div>
                <div class="card-face card-back">
                    <div class="technique-categorie" id="technique-categorie"></div>
                    <div class="technique-description" id="technique-description"></div>
                    <div class="video-container" id="video-container">
                        <div class="no-video">Aucune vidéo disponible</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls">
            <button class="btn-nouvelle" onclick="nouvelleTechnique()">Nouvelle Technique</button>
            <button class="btn-retourner" onclick="retournerCarte()">Retourner</button>
        </div>
        <p class="instructions">Cliquez sur la carte pour la retourner</p>
    </div>

    <script>
        let techniqueActuelle = null;
        const card = document.getElementById('card');

        // Theme management
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            const themeText = document.getElementById('theme-text');
            
            if (body.getAttribute('data-theme') === 'night') {
                body.removeAttribute('data-theme');
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Mode Nuit';
                localStorage.setItem('theme', 'day');
            } else {
                body.setAttribute('data-theme', 'night');
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Mode Jour';
                localStorage.setItem('theme', 'night');
            }
        }

        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'night') {
                document.body.setAttribute('data-theme', 'night');
                document.getElementById('theme-icon').textContent = '☀️';
                document.getElementById('theme-text').textContent = 'Mode Jour';
            }
        }

        async function nouvelleTechnique() {
            try {
                card.classList.remove('flipped');

                const response = await fetch('/api/technique-aleatoire');
                techniqueActuelle = await response.json();

                document.getElementById('technique-nom').textContent = techniqueActuelle.nom;
                document.getElementById('technique-categorie').textContent = techniqueActuelle.categorie;
                document.getElementById('technique-description').textContent = techniqueActuelle.description;

                const videoContainer = document.getElementById('video-container');
                if (techniqueActuelle.video) {
                    const videoId = techniqueActuelle.video.split('v=')[1];
                    const ampersandPosition = videoId.indexOf('&');
                    const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;

                    videoContainer.innerHTML = \`
                        <iframe class="video-embed"
                                src="https://www.youtube.com/embed/\${cleanVideoId}"
                                title="Démonstration \${techniqueActuelle.nom}"
                                allowfullscreen></iframe>
                    \`;
                } else {
                    videoContainer.innerHTML = '<div class="no-video">Aucune vidéo disponible</div>';
                }

            } catch (error) {
                console.error('Erreur lors du chargement de la technique:', error);
                document.getElementById('technique-nom').textContent = 'Erreur de chargement';
            }
        }

        function retournerCarte() {
            if (techniqueActuelle) {
                card.classList.toggle('flipped');
            }
        }

        card.addEventListener('click', retournerCarte);
        window.addEventListener('load', () => {
            loadTheme();
            nouvelleTechnique();
        });
    </script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log('Appuyez sur Ctrl+C pour arrêter le serveur');
});

// Gestion propre de l'arrêt du serveur
process.on('SIGINT', () => {
  console.log('\nArrêt du serveur...');
  process.exit(0);
});