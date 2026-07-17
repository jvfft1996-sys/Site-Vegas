import * as THREE from "three";


export function createStars(scene){

    const geometry = new THREE.BufferGeometry();

    const stars = [];
    const sizes = [];
const brightness = [];
const pulseSpeed = [];
const pulseOffset = [];

    const amount = 29000;


    for(let i = 0; i < amount; i++){

        const x = (Math.random() - 0.5) * 3000;
        const y = (Math.random() - 0.5) * 3000;
        const z = (Math.random() - 0.5) * 3000;


        stars.push(
            x,
            y,
            z
        );
        sizes.push(4 + Math.random() * 6);

// brilho entre 60% e 100%
brightness.push(0.6 + Math.random() * 0.4);

// velocidade da pulsação
pulseSpeed.push(0.3 + Math.random() * 0.7);

// fase inicial
pulseOffset.push(Math.random() * Math.PI * 2);

    }


    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(stars,3)
    );
    geometry.setAttribute(
    "size",
    new THREE.Float32BufferAttribute(sizes, 1)
);

geometry.setAttribute(
    "brightness",
    new THREE.Float32BufferAttribute(brightness, 1)
);

geometry.setAttribute(
    "pulseSpeed",
    new THREE.Float32BufferAttribute(pulseSpeed, 1)
);

geometry.setAttribute(
    "pulseOffset",
    new THREE.Float32BufferAttribute(pulseOffset, 1)
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

return starField;
}