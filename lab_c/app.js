let map = L.map('map').setView([51.4285, 15.5528], 14);

L.tileLayer.provider('Esri.WorldImagery').addTo(map);
L.tileLayer.provider('CartoDB.PositronOnlyLabels').addTo(map);

let geoBtn = document.getElementById('geoBtn');
let downloadBtn = document.getElementById('downloadBtn');
let shuffleBtn = document.getElementById('shuffleBtn');
let coordsEl = document.getElementById('coords');

let puzzleSource = document.getElementById('puzzle-source');
let puzzleTarget = document.getElementById('puzzle-target');
let canvas = document.getElementById('captureCanvas');

let puzzleDone = false;

function askNotif() {
if (Notification.permission !== "granted") Notification.requestPermission();
}

geoBtn.onclick = () => {
askNotif();
navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    coordsEl.textContent = `Współrzędne: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;

    map.setView([lat, lon], 18);

    if (window.userMarker)
        window.userMarker.setLatLng([lat, lon]);
    else
        window.userMarker = L.marker([lat, lon]).addTo(map);
});
};

downloadBtn.onclick = () => {
askNotif();
leafletImage(map, function(err, mapCanvas) {
    let ctx = canvas.getContext("2d");
    canvas.width = 350;
    canvas.height = 350;

    ctx.drawImage(mapCanvas, 0, 0, mapCanvas.width, mapCanvas.height, 0, 0, 350, 350);

    buildPuzzle();
});
};

shuffleBtn.onclick = () => buildPuzzle();

function buildPuzzle() {
puzzleDone = false;
puzzleSource.innerHTML = "";
puzzleTarget.innerHTML = "";

let img = canvas.toDataURL("image/png");
let size = 350;
let piece = size / 4;

let arr = [];

for (let i = 0; i < 16; i++) {
    let p = document.createElement("div");
    p.className = "piece";
    p.style.backgroundImage = `url(${img})`;

    let r = Math.floor(i / 4);
    let c = i % 4;

    p.style.backgroundPosition = `-${c * piece}px -${r * piece}px`;
    p.draggable = true;
    p.dataset.id = i;

    arr.push(p);
}

arr.sort(() => Math.random() - 0.5);
arr.forEach(p => puzzleSource.appendChild(p));

for (let i = 0; i < 16; i++) {
    let s = document.createElement("div");
    s.className = "slot";
    s.dataset.slot = i;
    puzzleTarget.appendChild(s);
}

initDrag();
}

function initDrag() {
document.querySelectorAll(".piece").forEach(p => {
    p.ondragstart = e => {
        window.dragged = e.target;
    };
});

document.querySelectorAll(".slot").forEach(s => {
    s.ondragover = e => e.preventDefault();
    s.ondrop = e => {
        if (s.children.length === 0) s.appendChild(window.dragged);
        checkWin();
    };
});
}

function checkWin() {
    if (puzzleDone) return;

    let slots = document.querySelectorAll(".slot");

    for (let s of slots) {
        if (s.children.length === 0) return;
        if (s.children[0].dataset.id !== s.dataset.slot) return;
    }

    puzzleDone = true;

    console.log("Puzzle poprawnie ułożone!"); 

    new Notification("Ułożyłeś puzzle!");
}