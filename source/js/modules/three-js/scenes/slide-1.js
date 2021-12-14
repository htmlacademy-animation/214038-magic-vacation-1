import * as THREE from "three";
import SvgLoader from "../svg-loader/svg-loader";

export default class Scene1Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlowers();
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.7;

    flower.position.set(-220, 150, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, 40 * THREE.Math.DEG2RAD, 5 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(flower);
  }
}
