// Initialisation des variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Taille de la carte
const mapWidth = 5000;
const mapHeight = 5000;
let viewX = 2500;
let viewY = 2500;

// Position des objets
const objets = {
    bobine: { x: 2500, y: 2500, width: 200, height: 200, image: "assets/bobine.png", coll: false },
    chaise: { x: 1750, y: 2000, width: 200, height: 200, image: "assets/chaise.png", coll: false },
    ecran: { x: 3250, y: 3250, width: 200, height: 200, image: "assets/ecran.png", coll: false },
    meuble: { x: 3250, y: 2000, width: 200, height: 200, image: "assets/meuble.png", coll: false },
    projo: { x: 1750, y: 3000, width: 200, height: 200, image: "assets/projo.png", coll: false }
};

const images = {};
for (const key in objets) {
    images[key] = new Image();
    images[key].src = objets[key].image;
}

// Fond + joueur
const solImage = new Image();
solImage.src = "assets/sol.png";
const PersoImmoImage = new Image();
PersoImmoImage.src = "assets/PersoImmo.png";

const PersoImmoWidth = 100;
const PersoImmoHeight = 100;
const PersoImmoX = canvas.width / 2 - PersoImmoWidth / 2;
const PersoImmoY = canvas.height / 2 - PersoImmoHeight / 2;
const solWidth = 100;
const solHeight = 100;
const speed = 3;

const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, z: false, q: false, s: false, d: false };
window.addEventListener("keydown", e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
window.addEventListener("keyup", e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

let popup = false;
let quiz_effectue = false;

function checkCollision(x, y, width, height) {
    return PersoImmoX < x + width && PersoImmoX + PersoImmoWidth > x &&
           PersoImmoY < y + height && PersoImmoY + PersoImmoHeight > y;
}

function createPopup(text) {
    popup = true;
    const div = document.createElement("div");
    div.className = "popup";
    div.innerText = text;
    Object.assign(div.style, {
        fontSize: "24px",
        backgroundImage: "url('assets/parchemin.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        position: "absolute",
        width: "400px",
        height: "400px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        padding: "0 50px",
        borderRadius: "10px",
        opacity: 0,
        transition: "opacity 0.5s"
    });
    document.body.appendChild(div);
    setTimeout(() => { div.style.opacity = 1; }, 50);
    div.addEventListener("click", () => { div.remove(); popup = false; });
}

function checkAllCollision() {
    const messages = {
        chaise: "Les récifs coraliens...",
        ecran: "Le ecran est un organe vital...",
        meuble: "Les meubles sont des organes vitaux...",
        projo: "Les courants marins sont..."
    };
    for (const [key, obj] of Object.entries(objets)) {
        if (key === "bobine") continue;
        if (!obj.coll && checkCollision(obj.x - viewX, obj.y - viewY, obj.width, obj.height)) {
            obj.coll = true;
            createPopup(messages[key]);
        }
    }
}

function quiz() {
    const b = objets.bobine;
    if (!popup && !quiz_effectue && checkCollision(b.x - viewX, b.y - viewY, b.width, b.height)) {
        if (objets.chaise.coll && objets.ecran.coll && objets.meuble.coll && objets.projo.coll) {
            popup = true;
            const div = document.createElement("div");
            div.id = "quiz";
            div.className = "popup";
            div.style.cssText = `
                font-size: 24px;
                background-image: url('assets/parchemin.png');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                position: absolute;
                width: 800px;
                height: 800px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                padding: 300px 100px 0 100px;
                border-radius: 10px;
                text-align: center;
                opacity: 0;
                transition: opacity 0.5s;
            `;
            div.innerHTML = `
                <p>Quand s'est déroulée la première projection d’un film en France ?<br>
                    <select id="1">
                        <option value="default">-- choisir une réponse --</option>
                        <option value="22Fev95">Le 22 février 1895</option>
                        <option value="22Mars95">Le 22 mars 1895</option>
                        <option value="25Mars95">Le 25 mars 1895</option>
                        <option value="28Mars96">Le 28 mars 1896</option>
                    </select>
                </p>
                <p>Quel a été le premier film projeté ?<br>
                    <select id="2">
                        <option value="default">-- choisir une réponse --</option>
                        <option value="su">Sortie d’usine</option>
                        <option value="atgc">L'Arrivée d'un train en gare de La Ciotat</option>
                        <option value="lv">La Voltige</option>
                        <option value="lj">Le Jardinier</option>
                    </select>
                </p>
                <p>Quand a été tourné le premier film réalisé par les frères Lumière ?<br>
                    <select id="3">
                        <option value="default">-- choisir une réponse --</option>
                        <option value="20Fev95">Le 20 février 1895</option>
                        <option value="19Mars95">Le 19 mars 1895</option>
                        <option value="20Mars95">Le 20 mars 1895</option>
                        <option value="15Mars95">Le 15 mars 1895</option>
                    </select>
                </p>
                <p>Combien de projections ont eu lieu pendant l’année 1895 ?<br>
                    <select id="4">
                        <option value="default">-- choisir une réponse --</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                    </select>
                </p>
                <p>Où les frères Lumières ont-ils ouvert des salles de spectacle en 1896 ?<br>
                    <select id="5">
                        <option value="default">-- choisir une réponse --</option>
                        <option value="blb">Bruxelle, Londres et Berlin</option>
                        <option value="blm">Bruxelle, Berlin et Madrid</option>
                        <option value="bln">Bruxelle, Londres et New-York</option>
                        <option value="bbn">Bruxelle, Berlin et New-York</option>
                    </select>
                </p>
                <input type="button" value="Valider" onclick="checkReponses()">
            `;
            document.body.appendChild(div);
            setTimeout(() => div.style.opacity = 1, 50);
        } else {
            createPopup("Vous n'avez pas encore trouvé toutes les informations nécessaires pour résoudre l'énigme...");
        }
    }
}

function checkReponses() {
    const reponses = { 1: "22Mars95", 2: "su", 3: "19Mars95", 4: "12", 5: "bln" };
    let correct = 0;
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(i.toString());
        if (select.value === reponses[i]) correct++;
    }
    document.getElementById("quiz").remove();
    createPopup(`Vous avez trouvé ${correct} bonnes réponses sur 5.`);
    quiz_effectue = true;
}

function gameLoop() {
    if ((keys.ArrowUp || keys.z) && !popup) viewY = Math.max(0, viewY - speed);
    if ((keys.ArrowDown || keys.s) && !popup) viewY = Math.min(mapHeight - canvas.height, viewY + speed);
    if ((keys.ArrowLeft || keys.q) && !popup) viewX = Math.max(0, viewX - speed);
    if ((keys.ArrowRight || keys.d) && !popup) viewX = Math.min(mapWidth - canvas.width, viewX + speed);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < mapHeight; y += solHeight) {
        for (let x = 0; x < mapWidth; x += solWidth) {
            ctx.drawImage(solImage, x - viewX, y - viewY, solWidth, solHeight);
        }
    }

    for (const key in objets) {
        const o = objets[key];
        ctx.drawImage(images[key], o.x - viewX, o.y - viewY, o.width, o.height);
    }

    ctx.drawImage(PersoImmoImage, PersoImmoX, PersoImmoY, PersoImmoWidth, PersoImmoHeight);
    checkAllCollision();
    quiz();

    requestAnimationFrame(gameLoop);
}

solImage.onload = () => requestAnimationFrame(gameLoop);
