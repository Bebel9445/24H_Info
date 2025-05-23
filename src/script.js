function test() {
    console.log("test")
}

const waterImage = new Image();
const weatherImage = new Image();
const weatherWidth = 150;
const weatherHeight = 150;
let meteo_code = 0;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Taille de la carte
const mapWidth = 5000;
const mapHeight = 5000;

// Position de la "vue" (viewport)
let viewX = 2500;
let viewY = 2500;

// Position des iles
let cervX = 2500;
let cervY = 2500;

let poumX = 1750;
let poumY = 2000;

let foieX = 3250;
let foieY = 3250;

let reinX = 3250;
let reinY = 2000;

let coeurX = 1750;
let coeurY = 3000;

// Vitesse de déplacement
const speed = 3;

// Charger les images
const boatImage = new Image();
boatImage.src = "assets/boat.png";

const cervImage = new Image();
cervImage.src = "assets/cervo.png";
let cervoColl = false;

const poumImage = new Image();
poumImage.src = "assets/poumon.png";
let poumColl = false;

const foieImage = new Image();
foieImage.src = "assets/foie.png";
let foieColl = false;

const reinImage = new Image();
reinImage.src = "assets/rein.png";
let reinColl = false;

const coeurImage = new Image();
coeurImage.src = "assets/coeur.png";
let coeurColl = false;

let popup = false; // Popup affiché ou non

const waterWidth = 100; // Nouvelle largeur de l'eau
const waterHeight = 100; // Nouvelle hauteur de l'eau
const boatWidth = 100; // Nouvelle largeur du bateau
const boatHeight = 100; // Nouvelle hauteur du bateau

// Taille des iles
const cervWidth = 200;
const cervHeight = 200;

const poumWidth = 200;
const poumHeight = 200;

const foieWidth = 200;
const foieHeight = 200;

const reinWidth = 200;
const reinHeight = 200;

const coeurWidth = 200;
const coeurHeight = 200;

//createPopup("Bienvenue sur le jeu des 24heures de l'info !\nVotre objectif est de trouver les différentes informations afin de resoudre l'énigme finale!\nPour vous déplacer, utilisez les flèches du clavier.\nBonne chance !");

// Lorsque les images sont chargées
let imagesLoaded = 0;
const onImageLoad = () => {
        requestAnimationFrame(gameLoop);
};

waterImage.onload = onImageLoad;
boatImage.onload = onImageLoad;
cervImage.onload = onImageLoad;
poumImage.onload = onImageLoad;
foieImage.onload = onImageLoad;
reinImage.onload = onImageLoad;
coeurImage.onload = onImageLoad;


// Gérer les touches
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    z: false,
    q: false,
    s: false,
    d: false,
};

window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

const boatX = canvas.width / 2 - boatWidth / 2;
const boatY = canvas.height / 2 - boatHeight / 2;

function checkCollision(x, y, width, height) {
    return boatX < x + width &&
           boatX + boatWidth > x &&
           boatY < y + height &&
           boatY + boatHeight > y;
}


function createPopup(text) {
    popup = true
    let div = document.createElement("div");
    div.innerText = text;
    div.style.fontSize = "24px";
    div.style.backgroundImage = "url('assets/parchemin.png')";
    div.style.backgroundSize = "cover";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundPosition = "center";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.textAlign = "center",
    div.style.alignItems = "center";
    div.style.position = "absolute";
    div.style.width = "400px";
    div.style.height = "400px";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.color = "white";
    div.style.paddingLeft = "50px";
    div.style.paddingRight = "350px";
    div.style.borderRadius = "10px";
    div.className = "popup"
    let opacity = 0;
    div.style.opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.1; // Augmente par pas de 0.05
        div.style.opacity = opacity;

        // Stoppe l'intervalle quand l'opacité atteint 1
        if (opacity >= 1) {
            clearInterval(interval);
        }
    }, 50);
    document.body.appendChild(div);
    div.addEventListener("click", () => {
        div.remove();
        popup = false;
    });
}


function checkAllCollision(){

    if (checkCollision(poumX-viewX, poumY-viewY, poumWidth, poumHeight) && !poumColl){
        poumColl = true;
        createPopup("Les récifs coraliens possèdent une grande biodiversité et génèrent une grande partie de l’oxygène océanique, à l’instar des poumons qui permettent les échanges gazeux dans le corps.\n\nIls sont cepedendant menacés par l’acidification des océans et le réchauffement climatique, provoquant leur blanchissement, semblable à des poumons endommagés par la pollution.")
    }

    if (checkCollision(foieX-viewX, foieY-viewY, foieWidth, foieHeight) && !foieColl){
        foieColl = true;
        createPopup("Le foie est un organe vital qui permet de détoxifier l’organisme, à l’instar des écosystèmes qui permettent de réguler les pollutions.\n\nIl est cependant menacé par la pollution, les pesticides et les métaux lourds, provoquant des maladies et des cancers, semblable à des écosystèmes dégradés par les activités humaines.")
    }

    if (checkCollision(reinX-viewX, reinY-viewY, reinWidth, reinHeight) && !reinColl){
        reinColl = true;
        createPopup("Les reins sont des organes vitaux qui permettent de filtrer le sang et d’éliminer les déchets, à l’instar des rivières qui permettent de réguler les pollutions.\n\nIls sont cependant menacés par la pollution, les pesticides et les métaux lourds, provoquant des maladies et des cancers, semblable à des rivières dégradées par les activités humaines.")
    }

    if (checkCollision(coeurX-viewX, coeurY-viewY, coeurWidth, coeurHeight) && !coeurColl){
        coeurColl = true;
        createPopup("Les courants marins sont des mouvements d’eau qui permettent de réguler la température des océans et de transporter les nutriments, à l’instar du cœur qui permet de réguler la circulation sanguine.\n\nIls sont cependant menacés par le réchauffement climatique et la pollution, provoquant des perturbations des écosystèmes marins, semblable à des troubles cardiaques.")
    }
}

let quiz_effectue = false;

function quiz(){
    if (poumColl && foieColl && reinColl && coeurColl && checkCollision(cervX-viewX, cervY-viewY, cervWidth, cervHeight) && !popup && !quiz_effectue){
        popup = true

        let div = document.createElement("div");
        div.id = "quiz";
        div.style.fontSize = "24px";
        div.style.backgroundImage = "url('assets/parchemin.png')";
        div.style.backgroundSize = "cover";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.justifyContent = "center";
        div.style.textAlign = "center",
        div.style.alignItems = "center";
        div.style.position = "absolute";
        div.style.width = "800px";
        div.style.height = "800px";
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.style.color = "white";
        div.style.paddingTop = "300px";
        div.style.paddingLeft = "100px";
        div.style.paddingRight = "700px";
        div.style.borderRadius = "10px";
        div.className = "popup"
        let opacity = 0;
        div.style.opacity = 0;
        div.innerHTML = `<p>
            Quand s'est déroulée la première projection d’un film en France ?
            <select id="1">
                <option value="default">-- choisir une réponse --</option>
                <option value="22Fev95">Le 22 février 1895</option>
                <option value="22Mars95">Le 22 mars 1895</option>
                <option value="25Mars95">Le 25 mars 1895</option>
                <option value="28Mars96">Le 28 mars 1896</option>
            </select>
        </p>
        <p>
            Quel a été le premier film projeté ?
            <select id="2">
                <option value="default">-- choisir une réponse --</option>
                <option value="su">Sortie d’usine</option>
                <option value="atgc">L'Arrivée d'un train en gare de La Ciotat</option>
                <option value="lv">La Voltige</option>
                <option value="lj">Le Jardinier</option>
            </select>
        </p>
        <p>
            Quand a été tourné le premier film réalisé par les frères Lumière ?
            <select id="3">
                <option value="default">-- choisir une réponse --</option>
                <option value="20Fev95">Le 20 février 1895</option>
                <option value="19Mars95">Le 19 mars 1895</option>
                <option value="20Mars95">Le 20 mars 1895</option>
                <option value="15Mars95">Le 15 mars 1895</option>
            </select>
        </p>
        <p>
            Combien de projections ont eu lieu pendant l’année 1895 ?
            <select id="4">
                <option value="default">-- choisir une réponse --</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
            </select>
        </p>
        <p>
            Où les frères Lumières ont ils ouverts des salles de spectacle cinématographe en 1896 ?
            <select id="5">
                <option value="default">-- choisir une réponse --</option>
                <option value="blb">Bruxelle, Londres et Berlin</option>
                <option value="blm">Bruxelle, Berlin et Madrid</option>
                <option value="bln">Bruxelle, Londres et New-York</option>
                <option value="bbn">Bruxelle, Berlin et New-York</option>
            </select>
        </p>
        <p>
        <input type="button" value="Valider" onclick="checkReponses()">`;
        const interval = setInterval(() => {
        opacity += 0.1; // Augmente par pas de 0.05
        div.style.opacity = opacity;

        // Stoppe l'intervalle quand l'opacité atteint 1
        if (opacity >= 1) {
            clearInterval(interval);
        }
        }, 50);
        document.body.appendChild(div);
    }
    else if (checkCollision(cervX-viewX, cervY-viewY, cervWidth, cervHeight) && !cervoColl && !popup && !quiz_effectue){
        createPopup("Vous n'avez pas encore trouvé toutes les informations nécessaires pour résoudre l'énigme...")
        cervoColl = true;
    }
}

function checkReponses(){
    let quiz_popup = document.getElementById("quiz");
    const reponses = {
        1: "22Mars95",
        2: "su",
        3: "19Mars95",
        4: "12",
        5: "bln"
    }
    let correct = 0;
    for (let i = 1; i <= 6; i++){
        let select = document.getElementById(i.toString());
        if (select.value === reponses[i]){
            correct++;
        }
    }
    quiz_popup.remove();    
    createPopup(`Vous avez trouvé ${correct} bonnes réponses sur 6.`);
    quiz_effectue = true;
}

// Boucle de jeu
function gameLoop() {
    // Déplacement en fonction des touches
    if ((keys.ArrowUp || keys.z) && !popup) viewY = Math.max(0, viewY - speed);
    if ((keys.ArrowDown || keys.s) && !popup) viewY = Math.min(mapHeight - canvas.height, viewY + speed);
    if ((keys.ArrowLeft || keys.q) && !popup) viewX = Math.max(0, viewX - speed);
    if ((keys.ArrowRight || keys.d) && !popup) viewX = Math.min(mapWidth - canvas.width, viewX + speed);

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la carte (mosaïque de l'image)
    for (let y = 0; y < mapHeight; y += waterHeight) {
        for (let x = 0; x < mapWidth; x += waterWidth) {
            ctx.drawImage(waterImage, x - viewX, y - viewY, waterWidth, waterHeight);
        }
    }
    // Dessiner le bateau au centre de la vue
    const boatX = canvas.width / 2 - boatWidth / 2;
    const boatY = canvas.height / 2 - boatHeight / 2;
    ctx.drawImage(cervImage, cervX-viewX, cervY-viewY, cervWidth, cervHeight);
    ctx.drawImage(boatImage, boatX, boatY, boatWidth, boatHeight);

    checkAllCollision();
    quiz();

    requestAnimationFrame(gameLoop);
}

