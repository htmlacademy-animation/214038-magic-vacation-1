import * as THREE from "three";
import SvgLoader from "../svg-loader/svg-loader";
import Rug from "./objects/rug";
import Saturn from "./objects/saturn";

export default class Scene1Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addFlowers();
    this.addRug();
    this.addSaturn();
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.7;

    flower.position.set(-220, 150, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, 40 * THREE.Math.DEG2RAD, 5 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(flower);
  }

  addRug() {
    const rug = new Rug();
    const scale = 0.7;

    rug.scale.set(scale, scale, scale);
    rug.position.set(0, -115, 0);
    rug.rotation.copy(new THREE.Euler(13 * THREE.Math.DEG2RAD, -52 * THREE.Math.DEG2RAD, 0), `XYZ`);

    this.add(rug);
  }

  addSaturn() {
    const saturn = new Saturn();

    saturn.position.set(60, 240, 100);

    this.add(saturn);
  }
}
