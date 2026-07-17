import * as THREE from "three";

export function createMediumStars(scene){

    const geometry = new THREE.BufferGeometry();

    const vertices = [];

    const amount = 120;

    for(let i = 0; i < amount; i++){

        const x = (Math.random() - 0.5) * 1400;
        const y = (Math.random() - 0.5) * 1400;
        const z = (Math.random() - 0.5) * 1400;

        vertices.push(x, y, z);

    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices,3)
    );

    const texture = new THREE.TextureLoader().load("/textures/estrela.jpeg");

    const material = new THREE.PointsMaterial({

        map: texture,

        color: 0x5fbfff,

        size: 30,

        transparent: true,

        opacity: 1,

        depthWrite: false,

        blending: THREE.AdditiveBlending,

        sizeAttenuation: true

    });

    const starField = new THREE.Points(
        geometry,
        material
    );

    starField.userData = {

    pulseSpeed: 0.35,

    pulseAmount: 0.25,

    pulseOffset: Math.random() * Math.PI * 2

};

    scene.add(starField);

    return starField;

}