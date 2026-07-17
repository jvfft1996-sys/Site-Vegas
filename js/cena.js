import * as THREE from "three";


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

    });

    // Loop de renderização
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

    // Respiração da câmera
    camera.position.z = 5 + Math.sin(time * 0.18) * 0.08;

    // Faz a câmera olhar sempre para o centro
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

}

    animate();

}