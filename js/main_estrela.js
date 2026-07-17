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
   TEXTURA DOS RAIOS
====================================================== */

function createRaysTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");


    // Raio vertical
    const vertical = ctx.createLinearGradient(
        0,0,
        0,512
    );


    vertical.addColorStop(
        0,
        "rgba(100,180,255,0)"
    );

    vertical.addColorStop(
        0.5,
        "rgba(255,255,255,0.9)"
    );

    vertical.addColorStop(
        1,
        "rgba(100,180,255,0)"
    );


    ctx.fillStyle = vertical;


    ctx.fillRect(
        246,
        40,
        20,
        432
    );

// =================================
// Raios diagonais
// =================================

ctx.strokeStyle = "rgba(150,200,255,0.25)";
ctx.lineWidth = 5;


// Diagonal \
ctx.beginPath();

ctx.moveTo(160,160);
ctx.lineTo(352,352);

ctx.stroke();


// Diagonal /
ctx.beginPath();

ctx.moveTo(352,160);
ctx.lineTo(160,352);

ctx.stroke();

    // Raio horizontal
    const horizontal = ctx.createLinearGradient(
        0,0,
        512,0
    );


    horizontal.addColorStop(
        0,
        "rgba(100,180,255,0)"
    );

    horizontal.addColorStop(
        0.5,
        "rgba(255,255,255,0.9)"
    );

    horizontal.addColorStop(
        1,
        "rgba(100,180,255,0)"
    );


    ctx.fillStyle = horizontal;


    ctx.fillRect(
        40,
        246,
        432,
        20
    );


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

        opacity:1,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });

    const glow = new THREE.Sprite(material);

    glow.scale.set(1.8,1.8,1);

    return glow;

}
/* ======================================================
   RAIOS DA ESTRELA
====================================================== */

function createRays(){

    const material = new THREE.SpriteMaterial({

        map:createRaysTexture(),

        color:0x5aa9ff,

        transparent:true,

        opacity:0.25,

        depthWrite:false,

        blending:THREE.AdditiveBlending

    });


    const rays = new THREE.Sprite(material);


    rays.scale.set(
        1.8,
        1.8,
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
// Glow externo
const glow = createGlow();
star.add(glow);

// Raios
const rays = createRays();
star.add(rays);

// Glow interno
const innerGlow = createInnerGlow();
star.add(innerGlow);


// Núcleo
const core = createCore();
star.add(core);

    // Guarda referências para animação
    star.userData = {

        core: core,

        glow: glow,

          innerGlow: innerGlow,
          
          rays:rays,


        pulseSpeed: 4.2,

        pulseAmount: 3.04

    };

    // Centro da tela
    star.position.set(0, 0, 0);

    // Adiciona à cena
    scene.add(star);

    return star;

}