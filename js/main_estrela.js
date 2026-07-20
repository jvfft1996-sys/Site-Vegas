import * as THREE from "three";

function createCoreTexture() {

    const canvas = document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        128,128,0,
        128,128,40
    );

    gradient.addColorStop(0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.4,"rgba(255,255,255,1)");
    gradient.addColorStop(1,"rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,256,256);

    return new THREE.CanvasTexture(canvas);
}



function createGlowTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        256,256,0,
        256,256,220
    );

    gradient.addColorStop(0,"rgba(120,200,255,0.35)");
    gradient.addColorStop(0.25,"rgba(120,200,255,0.18)");
    gradient.addColorStop(0.6,"rgba(120,200,255,0.05)");
    gradient.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,512,512);

    return new THREE.CanvasTexture(canvas);

}

/* ======================================================
   TEXTURA DO LENS FLARE
====================================================== */

function createFlareTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;


    const ctx = canvas.getContext("2d");


    const gradient = ctx.createRadialGradient(
        256,
        256,
        0,
        256,
        256,
        180
    );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.9)"
    );


    gradient.addColorStop(
        0.15,
        "rgba(180,220,255,0.5)"
    );


    gradient.addColorStop(
        0.4,
        "rgba(100,170,255,0.15)"
    );


    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle = gradient;


    ctx.fillRect(
        0,
        0,
        512,
        512
    );


    return new THREE.CanvasTexture(canvas);

}

/* ======================================================
   TEXTURA DO HALO
====================================================== */

function createHaloTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;


    const ctx = canvas.getContext("2d");


    const gradient = ctx.createRadialGradient(
        256,
        256,
        120,
        256,
        256,
        230
    );


    gradient.addColorStop(
        0,
        "rgba(80,170,255,0)"
    );


    gradient.addColorStop(
        0.55,
        "rgba(100,190,255,0.15)"
    );


    gradient.addColorStop(
        0.65,
        "rgba(150,220,255,0.35)"
    );


    gradient.addColorStop(
        0.75,
        "rgba(100,170,255,0.05)"
    );


    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle = gradient;


    ctx.fillRect(
        0,
        0,
        512,
        512
    );


    return new THREE.CanvasTexture(canvas);

}

/* ======================================================
   TEXTURA DOS RAIOS
====================================================== */

   function createRaysTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    // ==========================
    // Horizontal
    // ==========================

    
let gradient = ctx.createLinearGradient(
    10,
    256,
    502,
    256
);
gradient.addColorStop(0.00,"rgba(255,255,255,0)");
gradient.addColorStop(0.18,"rgba(120,190,255,0.10)");
gradient.addColorStop(0.30,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.40,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.50,"rgba(255,255,255,1)");
gradient.addColorStop(0.60,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.70,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.82,"rgba(120,190,255,0.10)");
gradient.addColorStop(1.00,"rgba(255,255,255,0)");

ctx.fillStyle = gradient;

for(let i = 0; i < 20; i++){

    ctx.fillRect(
        10 + i * 8,
        250 + i * 0.12,
        492 - i * 5,
        4.1   - i * 0.18
    );

}

const centerGlow = ctx.createRadialGradient(
    256,
    256,
    10,
    256,
    256,
    32
);

centerGlow.addColorStop(
    0,
    "rgba(255,255,255,0.9)"
);

centerGlow.addColorStop(
    0.55,
    "rgba(180,220,255,0.25)"
);

centerGlow.addColorStop(
    1,
    "rgba(255,255,255,0)"
);

ctx.fillStyle = centerGlow;

ctx.fillRect(
    220,
    220,
    72,
    72
);

const coreBeam = ctx.createLinearGradient(
    180,
    256,
    332,
    256
);

coreBeam.addColorStop(0,"rgba(255,255,255,0)");
coreBeam.addColorStop(0.35,"rgba(180,220,255,0.55)");
coreBeam.addColorStop(0.50,"rgba(255,255,255,1)");
coreBeam.addColorStop(0.65,"rgba(180,220,255,0.55)");
coreBeam.addColorStop(1,"rgba(255,255,255,0)");

ctx.fillStyle = coreBeam;

ctx.fillRect(
    206,
    254,
    100,
    3
);

const energyBeam = ctx.createLinearGradient(
    40,
    256,
    472,
    256
);

energyBeam.addColorStop(
    0,
    "rgba(255,255,255,0)"
);

energyBeam.addColorStop(
    0.30,
    "rgba(120,200,255,0.10)"
);

energyBeam.addColorStop(
    0.50,
    "rgba(255,255,255,0.55)"
);

energyBeam.addColorStop(
    0.70,
    "rgba(120,200,255,0.10)"
);

energyBeam.addColorStop(
    1,
    "rgba(255,255,255,0)"
);

ctx.fillStyle = energyBeam;

ctx.fillRect(
    40,
    253,
    432,
    6
);

 ctx.strokeStyle = "rgba(180,220,255,0.28)";
ctx.lineWidth = 0.6;

for(let i = 0; i < 34; i++){

   ctx.globalAlpha = Math.pow(
    1 - (i / 34),4
    
);
    ctx.beginPath();

    ctx.moveTo(
        256 - i * 7,
        256
    );

    ctx.lineTo(
        256 - (i + 1) * 7,
        256
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256 + i * 7,
        256
    );

    ctx.lineTo(
        256 + (i + 1) * 7,
        256
    );

    ctx.stroke();

}

ctx.strokeStyle = "rgba(255,255,255,0.95)";
ctx.lineWidth =  0.4

for(let i = 0; i < 38; i++){

    ctx.globalAlpha = Math.pow(
    1 - (i / 38),4
    
);

    ctx.beginPath();

    ctx.moveTo(
        256 - i * 6,
        256
    );

    ctx.lineTo(
        256 - (i + 1) * 6,
        256
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256 + i * 6,
        256
    );

    ctx.lineTo(
        256 + (i + 1) * 6,
        256
    );

    ctx.stroke();

}
gradient = ctx.createLinearGradient(
    256,
    10,
    256,
    502
);

gradient.addColorStop(0.00,"rgba(255,255,255,0)");
gradient.addColorStop(0.18,"rgba(120,190,255,0.10)");
gradient.addColorStop(0.30,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.40,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.50,"rgba(255,255,255,1)");
gradient.addColorStop(0.60,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.70,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.82,"rgba(120,190,255,0.10)");
gradient.addColorStop(1.00,"rgba(255,255,255,0)");

ctx.fillStyle = gradient;

for(let i = 0; i < 20; i++){

    ctx.fillRect(

        250 + i * 0.12,

        10 + i * 8,

        4.1 - i * 0.18,

        492 - i * 5

    );

}

const coreBeamV = ctx.createLinearGradient(
    256,
    180,
    256,
    332
);

coreBeamV.addColorStop(0,"rgba(255,255,255,0)");
coreBeamV.addColorStop(0.35,"rgba(180,220,255,0.55)");
coreBeamV.addColorStop(0.50,"rgba(255,255,255,1)");
coreBeamV.addColorStop(0.65,"rgba(180,220,255,0.55)");
coreBeamV.addColorStop(1,"rgba(255,255,255,0)");

ctx.fillStyle = coreBeamV;

ctx.fillRect(
    254,
    206,
    3,
    100
);

const energyBeamV = ctx.createLinearGradient(
    256,
    40,
    256,
    472
);

energyBeamV.addColorStop(0,"rgba(255,255,255,0)");
energyBeamV.addColorStop(0.30,"rgba(120,200,255,0.10)");
energyBeamV.addColorStop(0.50,"rgba(255,255,255,0.55)");
energyBeamV.addColorStop(0.70,"rgba(120,200,255,0.10)");
energyBeamV.addColorStop(1,"rgba(255,255,255,0)");

ctx.fillStyle = energyBeamV;

ctx.fillRect(
    253,
    40,
    6,
    432
);

ctx.strokeStyle = "rgba(180,220,255,0.28)";
ctx.lineWidth = 0.6;

for(let i = 0; i < 34; i++){

    ctx.globalAlpha = Math.pow(
        1 - (i / 34),
        4
    );

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 - i * 7
    );

    ctx.lineTo(
        256,
        256 - (i + 1) * 7
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 + i * 7
    );

    ctx.lineTo(
        256,
        256 + (i + 1) * 7
    );

    ctx.stroke();

}

ctx.strokeStyle = "rgba(255,255,255,0.95)";
ctx.lineWidth = 0.4;

for(let i = 0; i < 38; i++){

    ctx.globalAlpha = Math.pow(
        1 - (i / 38),
        4
    );

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 - i * 6
    );

    ctx.lineTo(
        256,
        256 - (i + 1) * 6
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 + i * 6
    );

    ctx.lineTo(
        256,
        256 + (i + 1) * 6
    );

    ctx.stroke();

}

ctx.globalAlpha = 1;


gradient = ctx.createLinearGradient(
    256,
    10,
    256,
    502
);

gradient.addColorStop(0.00,"rgba(255,255,255,0)");
gradient.addColorStop(0.18,"rgba(120,190,255,0.10)");
gradient.addColorStop(0.30,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.40,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.50,"rgba(255,255,255,1)");
gradient.addColorStop(0.60,"rgba(210,235,255,0.45)");
gradient.addColorStop(0.70,"rgba(150,210,255,0.10)");
gradient.addColorStop(0.82,"rgba(120,190,255,0.10)");
gradient.addColorStop(1.00,"rgba(255,255,255,0)");

ctx.fillStyle = gradient;

for(let i = 0; i < 20; i++){

    ctx.fillRect(

        250 + i * 0.12,

        10 + i * 8,

        4.1 - i * 0.18,

        492 - i * 5

    );

}

const coreBeamV2 = ctx.createLinearGradient(
    256,
    180,
    256,
    332
);

coreBeamV2.addColorStop(0,"rgba(255,255,255,0)");
coreBeamV2.addColorStop(0.35,"rgba(180,220,255,0.55)");
coreBeamV2.addColorStop(0.50,"rgba(255,255,255,1)");
coreBeamV2.addColorStop(0.65,"rgba(180,220,255,0.55)");
coreBeamV2.addColorStop(1,"rgba(255,255,255,0)");

ctx.fillStyle = coreBeamV2;

ctx.fillRect(
    254,
    206,
    3,
    100
);

const energyBeamV2 = ctx.createLinearGradient(
    256,
    40,
    256,
    472
);

energyBeamV2.addColorStop(0,"rgba(255,255,255,0)");
energyBeamV2.addColorStop(0.30,"rgba(120,200,255,0.10)");
energyBeamV2.addColorStop(0.50,"rgba(255,255,255,0.55)");
energyBeamV2.addColorStop(0.70,"rgba(120,200,255,0.10)");
energyBeamV2.addColorStop(1,"rgba(255,255,255,0)");

ctx.fillStyle = energyBeamV2;

ctx.fillRect(
    253,
    40,
    6,
    432
);

ctx.strokeStyle = "rgba(180,220,255,0.28)";
ctx.lineWidth = 0.6;

for(let i = 0; i < 34; i++){

    ctx.globalAlpha = Math.pow(
        1 - (i / 34),
        4
    );

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 - i * 7
    );

    ctx.lineTo(
        256,
        256 - (i + 1) * 7
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 + i * 7
    );

    ctx.lineTo(
        256,
        256 + (i + 1) * 7
    );

    ctx.stroke();

}

ctx.strokeStyle = "rgba(255,255,255,0.95)";
ctx.lineWidth = 0.4;

for(let i = 0; i < 38; i++){

    ctx.globalAlpha = Math.pow(
        1 - (i / 38),
        4
    );

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 - i * 6
    );

    ctx.lineTo(
        256,
        256 - (i + 1) * 6
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        256,
        256 + i * 6
    );

    ctx.lineTo(
        256,
        256 + (i + 1) * 6
    );

    ctx.stroke();

}

ctx.globalAlpha = 1;

    // ==========================
// Diagonal \
// ==========================

ctx.save();

ctx.translate(256,256);

ctx.rotate(Math.PI / 4);

const diagonal1 = ctx.createLinearGradient(
    -120,
    0,
    120,
    0
);

diagonal1.addColorStop(0,"rgba(255,255,255,0)");
diagonal1.addColorStop(0.45,"rgba(180,220,255,0.08)");
diagonal1.addColorStop(0.5,"rgba(180,220,255,0.18)");
diagonal1.addColorStop(0.55,"rgba(180,220,255,0.08)");
diagonal1.addColorStop(1,"rgba(255,255,255,0)");
ctx.fillStyle = diagonal1;

ctx.fillRect(
    -60,
    -1,
    120,
    2
);

ctx.restore();


// ==========================
// Diagonal /
// ==========================

ctx.save();

ctx.translate(256,256);

ctx.rotate(-Math.PI / 4);


const diagonal2 = ctx.createLinearGradient(
    -120,
    0,
    120,
    0
);


diagonal2.addColorStop(0,"rgba(255,255,255,0)");
diagonal2.addColorStop(0.45,"rgba(180,220,255,0.08)");
diagonal2.addColorStop(0.5,"rgba(180,220,255,0.18)");
diagonal2.addColorStop(0.55,"rgba(180,220,255,0.08)");
diagonal2.addColorStop(1,"rgba(255,255,255,0)");
ctx.fillStyle = diagonal2;


ctx.fillRect(
    -60,
    -1,
    120,
    2
);


ctx.restore();

    return new THREE.CanvasTexture(canvas);

}

function createCore(){

    const material = new THREE.SpriteMaterial({

        map: createCoreTexture(),

        color: 0xffffff,

        transparent: true,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    const core = new THREE.Sprite(material);

    core.scale.set(0.20,0.20,1);

    return core;

}


function createGlow(){

    const material = new THREE.SpriteMaterial({

        map: createGlowTexture(),

        color:0x5aa9ff,

        transparent:true,

        opacity:0.35,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });

    const glow = new THREE.Sprite(material);

    glow.scale.set(4.8,4.8,1);

    return glow;

}
/* ======================================================
   LENS FLARE
====================================================== */

function createFlare(){

    const material = new THREE.SpriteMaterial({

        map: createFlareTexture(),

        color: 0x88ccff,

        transparent:true,

        opacity:0.35,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });


    const flare = new THREE.Sprite(material);


    flare.scale.set(
        1.6,
        1.6,
        1
    );


    return flare;

}

/* ======================================================
   HALO
====================================================== */

function createHalo(){

    const material = new THREE.SpriteMaterial({

        map: createHaloTexture(),

        color: 0x66bbff,

        transparent: true,

        opacity: 0.08,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    const halo = new THREE.Sprite(material);

    halo.scale.set(
        2.8,
        2.8,
        1
    );

    return halo;

}

/* ======================================================
   RAIOS DA ESTRELA
====================================================== */

function createRays(){

    const material = new THREE.SpriteMaterial({

        map:createRaysTexture(),

        color:0x5aa9ff,

        transparent:true,

        opacity:1,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });


    const rays = new THREE.Sprite(material);


    rays.scale.set(
        3,
        3,
        1
    );


    return rays;

}   
/* ======================================================
   INNER GLOW
====================================================== */

function createInnerGlow(){

    const canvas = document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");


    const gradient = ctx.createRadialGradient(
        128,128,0,              
        128,128,100
    );


    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.9)"
    );


    gradient.addColorStop(
        0.25,
        "rgba(180,220,255,0.5)"
    );


    gradient.addColorStop(
        1,
        "rgba(100,170,255,0)"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        256,
        256
    );


    const texture = new THREE.CanvasTexture(canvas);


    const material = new THREE.SpriteMaterial({

        map:texture,

        transparent:true,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });


    const innerGlow = new THREE.Sprite(material);


    innerGlow.scale.set(
        0.8,
        0.8,
        1
    );


    return innerGlow;

}


export function createMainStar(scene) {

    const star = new THREE.Group();
const halo = createHalo();
star.add(halo);

const glow = createGlow();
star.add(glow);

const rays = createRays();
star.add(rays);

const core = createCore();
star.add(core);

// Glow interno
const innerGlow = createInnerGlow();
star.add(innerGlow);

// Lens flare
const flare = createFlare();
star.add(flare);



    // Guarda referências para animação
    star.userData = {


         halo: halo,

         glow: glow,

         rays:rays,
  
          core: core,
          
          innerGlow: innerGlow,

          flare:flare,


        pulseSpeed: 1.2,

        pulseAmount: 0.04

    };

    // Centro da tela
    star.position.set(0, 0, 0);

    // Adiciona à cena
    scene.add(star);

    return star;

}