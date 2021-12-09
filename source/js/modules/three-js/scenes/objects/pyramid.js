import * as THREE from "three";

export default class Pyramid extends THREE.Group {
  constructor(material) {
    super();

    this.color = 0x1861cf;
    this.material = material;

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const cone = new THREE.ConeBufferGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(cone, this.material({color: this.color, flatShading: true}));
    this.add(mesh);
  }
}
