import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";


import { createStars } from "./estrelas.js";
import { createMediumStars } from "./estrelas_media.js";
import { createMainStar } from "./main_estrela.js";

export function createScene() {

    // Canvas que já existe no HTML
    const canvas = document.querySelector("#space");

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Cena
    const scene = new THREE.Scene();
   const starField = createStars(scene);
   const mediumStars = createMediumStars(scene);
   const mainStar = createMainStar(scene);
    // Cor de fundo
    scene.background = new THREE.Color(0x000000);

    // Câmera
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    // Ajuste ao redimensionar a janela
    window.addEventListener("resize", () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        composer.setSize(
    window.innerWidth,
    window.innerHeight
);

    });

    // Loop de renderização

const composer = new EffectComposer(renderer);

composer.addPass(
    new RenderPass(scene, camera)
);

const bloomPass = new UnrealBloomPass(

    new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
    ),

    0.8, // intensidade

     0.45, // raio

    0.75 // threshold

);

composer.addPass(bloomPass);

   function animate(){

    requestAnimationFrame(animate);

    starField.rotation.y += 0.00005;
    mediumStars.rotation.y += 0.00009;

    const t = performance.now() * 0.001;

    const pulse =
        1 +
        Math.sin(
            t * mediumStars.userData.pulseSpeed +
            mediumStars.userData.pulseOffset
        ) *
        mediumStars.userData.pulseAmount;

    mediumStars.scale.setScalar(pulse);

    const time = performance.now() * 0.001;
    // ================================
// Respiração da estrela principal
// ================================
const starPulse =
    1 +
    Math.sin(
        time * mainStar.userData.pulseSpeed
    ) *
    mainStar.userData.pulseAmount;

    // Respiração dos raios

mainStar.userData.rays.scale.set(
    3.3* starPulse,
    3.3* starPulse,
    1
);

// Núcleo
mainStar.userData.core.scale.set(
    5.20 * starPulse,
    .20 * starPulse,
    1
);


// Glow
mainStar.userData.glow.scale.set(
    4.4* starPulse,
    4.4 * starPulse,
    1
);

    // Respiração da câmera
    camera.position.z = 5 + Math.sin(time * 0.18) * 0.08;

// Lens flare respirando

const flarePulse =
    1 +
    Math.sin(time * 1.5) * 0.03;


mainStar.userData.flare.scale.set(
    2.2 * flarePulse,
    2.2 * flarePulse,
    1
);

    // Faz a câmera olhar sempre para o centro
    camera.lookAt(0, 0, 0);

    composer.render();

}

    animate();

}