import * as THREE from "three";
import { createStars } from "./estrelas.js";

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
    createStars(scene);

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
    function animate() {

        requestAnimationFrame(animate);

        renderer.render(scene, camera);

    }

    animate();

}