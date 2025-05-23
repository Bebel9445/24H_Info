function test() {
    console.log("test")
}

const SolImage = new Image();
SolImage.src = "assets/Sol.jpg";

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

// Position des objets
let bobineX = 2500;
let bobineY = 2500;

let chaiseX = 1750;
let chaiseY = 2000;

let ecranX = 3250;
let ecranY = 3250;

let meubleX = 3250;
let meubleY = 2000;

let projoX = 1750;
let projoY = 3000;

// Vitesse de déplacement
const speed = 3;

// Charger les images
const PersoImmoImage = new Image();
PersoImmoImage.src = "assets/PersoImmo.png";
let PersoImmoColl = false;

const bobineImage = new Image();
bobineImage.src = "assets/bobine.png";
let bobineColl = false;

const chaiseImage = new Image();
chaiseImage.src = "assets/chaise.png";
let chaiseColl = false;

const ecranImage = new Image();
ecranImage.src = "assets/ecran.png";
let ecranColl = false;

const meubleImage = new Image();
meubleImage.src = "assets/meuble.png";
let meubleColl = false;

const projoImage = new Image();
projoImage.src = "assets/projo.png";
let projoColl = false;

let popup = false; // Popup affiché ou non

const SolWidth = 100; // Nouvelle largeur de l'eau
const SolHeight = 100; // Nouvelle hauteur de l'eau
const PersoImmoWidth = 140; // Nouvelle largeur du bateau
const PersoImmoHeight = 291; // Nouvelle hauteur du bateau

// Taille des iles
const bobineWidth = 100;
const bobineHeight = 100;

const chaiseWidth = 100;
const chaiseHeight = 100;

const ecranWidth = 100;
const ecranHeight = 100;

const meubleWidth = 100;
const meubleHeight = 100;

const projoWidth = 100;
const projoHeight = 100;

//createPopup("Bienvenue sur le jeu des 24heures de l'info !\nVotre objectif est de trouver les différentes informations afin de resoudre l'énigme finale!\nPour vous déplacer, utilisez les flèches du clavier.\nBonne chance !");

// Lorsque les images sont chargées
let imagesLoaded = 0;
const onImageLoad = () => {
        requestAnimationFrame(gameLoop);
};

SolImage.onload = onImageLoad;
PersoImmoImage.onload = onImageLoad;
bobineImage.onload = onImageLoad;
chaiseImage.onload = onImageLoad;
ecranImage.onload = onImageLoad;
meubleImage.onload = onImageLoad;
projoImage.onload = onImageLoad;


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

const PersoImmoX = canvas.width / 2 - PersoImmoWidth / 2;
const PersoImmoY = canvas.height / 2 - PersoImmoHeight / 2;

function checkCollision(x, y, width, height) {
    return PersoImmoX < x + width &&
           PersoImmoX + PersoImmoWidth > x &&
           PersoImmoY < y + height &&
           PersoImmoY + PersoImmoHeight > y;
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

    if (checkCollision(chaiseX-viewX, chaiseY-viewY, chaiseWidth, chaiseHeight) && !chaiseColl){
        chaiseColl = true;
        createPopup("Les récifs coraliens possèdent une grande biodiversité et génèrent une grande partie de l’oxygène océanique, à l’instar des chaiseons qui permettent les échanges gazeux dans le corps.\n\nIls sont cepedendant menacés par l’acidification des océans et le réchauffement climatique, provoquant leur blanchissement, semblable à des chaiseons endommagés par la pollution.")
    }

    if (checkCollision(ecranX-viewX, ecranY-viewY, ecranWidth, ecranHeight) && !ecranColl){
        ecranColl = true;
        createPopup("Le ecran est un organe vital qui permet de détoxifier l’organisme, à l’instar des écosystèmes qui permettent de réguler les pollutions.\n\nIl est cependant menacé par la pollution, les pesticides et les métaux lourds, provoquant des maladies et des cancers, semblable à des écosystèmes dégradés par les activités humaines.")
    }

    if (checkCollision(meubleX-viewX, meubleY-viewY, meubleWidth, meubleHeight) && !meubleColl){
        meubleColl = true;
        createPopup("Les meubles sont des organes vitaux qui permettent de filtrer le sang et d’éliminer les déchets, à l’instar des rivières qui permettent de réguler les pollutions.\n\nIls sont cependant menacés par la pollution, les pesticides et les métaux lourds, provoquant des maladies et des cancers, semblable à des rivières dégradées par les activités humaines.")
    }

    if (checkCollision(projoX-viewX, projoY-viewY, projoWidth, projoHeight) && !projoColl){
        projoColl = true;
        createPopup("Les courants marins sont des mouvements d’eau qui permettent de réguler la température des océans et de transporter les nutriments, à l’instar du cœur qui permet de réguler la circulation sanguine.\n\nIls sont cependant menacés par le réchauffement climatique et la pollution, provoquant des perturbations des écosystèmes marins, semblable à des troubles cardiaques.")
    }
}

let quiz_effectue = false;

function quiz(){
    if (chaiseColl && ecranColl && meubleColl && projoColl && checkCollision(bobineX-viewX, bobineY-viewY, bobineWidth, bobineHeight) && !popup && !quiz_effectue){
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
    else if (checkCollision(bobineX-viewX, bobineY-viewY, bobineWidth, bobineHeight) && !bobineoColl && !popup && !quiz_effectue){
        createPopup("Vous n'avez pas encore trouvé toutes les informations nécessaires pour résoudre l'énigme...")
        bobineoColl = true;
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
    for (let y = 0; y < mapHeight; y += SolHeight) {
        for (let x = 0; x < mapWidth; x += SolWidth) {
            ctx.drawImage(SolImage, x - viewX, y - viewY, SolWidth, SolHeight);
        }
    }
    // Dessiner le bateau au centre de la vue
    const PersoImmoX = canvas.width / 2 - PersoImmoWidth / 2;
    const PersoImmoY = canvas.height / 2 - PersoImmoHeight / 2;
    ctx.drawImage(bobineImage, bobineX-viewX, bobineY-viewY, bobineWidth, bobineHeight);
    ctx.drawImage(PersoImmoImage, PersoImmoX, PersoImmoY, PersoImmoWidth, PersoImmoHeight);

    checkAllCollision();
    quiz();

    requestAnimationFrame(gameLoop);
}

