import * as THREE from "three";


export function createStars(scene){

    const geometry = new THREE.BufferGeometry();

    const stars = [];

    const amount = 15000;


    for(let i = 0; i < amount; i++){

        const x = (Math.random() - 0.5) * 3000;
        const y = (Math.random() - 0.5) * 3000;
        const z = (Math.random() - 0.5) * 3000;


        stars.push(
            x,
            y,
            z
        );

    }


    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(stars,3)
    );


    const texture = new THREE.TextureLoader()
.load("/textures/estrela.jpeg");


const material = new THREE.PointsMaterial({

    map: texture,

    color: 0xffffff,

    size: 8,

    transparent: true,

    opacity: 0.9,

    depthWrite: false,

    blending: THREE.AdditiveBlending,

    sizeAttenuation: true

});


    const starField = new THREE.Points(
        geometry,
        material
    );


    scene.add(starField);

}