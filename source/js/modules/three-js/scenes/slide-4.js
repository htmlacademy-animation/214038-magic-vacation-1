import * as THREE from "three";
import Saturn from "./objects/saturn";
import Rug from "./objects/rug";

export default class Scene4Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
    this.addRug();
  }

  addSaturn() {
    const saturn = new Saturn(`slide4`);

    saturn.position.set(90, 240, 100);

    this.add(saturn);
  }

  addRug() {
    const rug = new Rug(`slide4`);
    const scale = 0.7;

    rug.scale.set(scale, scale, scale);
    rug.position.set(0, -115, 0);
    rug.rotation.copy(new THREE.Euler(13 * THREE.Math.DEG2RAD, -52 * THREE.Math.DEG2RAD, 0), `XYZ`);

    this.add(rug);
  }
}
