import * as THREE from "three";
export function createMainStar(scene){
    const texture = new THREE.TextureLoader().load(
    "/textures/estrela.jpeg"
);
const material = new THREE.SpriteMaterial({

    map: texture,

    color: 0xffffff,

    transparent: true,

    depthWrite: false,

    blending: THREE.AdditiveBlending

}); 
const star = new THREE.Sprite(material);
star.scale.set(1.8,1.8,1);
star.position.set(0,0,0);
scene.add(star);

return star;
}