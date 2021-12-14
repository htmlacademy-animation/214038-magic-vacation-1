import * as THREE from "three";
import {setMaterial} from "../story";
import Pyramid from "./objects/pyramid";
import Flashlight from "./objects/flashlight";
import SvgLoader from "../svg-loader/svg-loader";

export default class Scene2Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addFlashlight();
    this.addLeaf1();
    this.addLeaf2();
  }

  addPyramid() {
    let pyramid = new Pyramid(setMaterial);

    pyramid.scale.set(0.7, 0.7, 0.7);
    pyramid.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 0, 0, `XYZ`));
    pyramid.position.set(-15, -120, 40);

    this.add(pyramid);
  }

  addFlashlight() {
    let flashlight = new Flashlight(setMaterial);

    flashlight.scale.set(0.76, 0.76, 0.76);
    flashlight.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, 0, `XYZ`));
    flashlight.position.set(290, -220, 80);

    this.add(flashlight);
  }

  addLeaf1() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    const scale = 1.6;

    leaf.position.set(-210, 10, 20);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, -1 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(leaf);
  }

  addLeaf2() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    const scale = 1.4;

    leaf.position.set(-240, -165, 20);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, 45 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(leaf);
  }
}
