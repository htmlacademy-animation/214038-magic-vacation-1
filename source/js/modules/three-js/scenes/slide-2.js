import * as THREE from "three";
import {setMaterial} from "../story";
import Pyramid from "./objects/pyramid";
import Flashlight from "./objects/flashlight";

export default class Scene2Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addFlashlight();
  }

  addPyramid() {
    let pyramid = new Pyramid(setMaterial);

    pyramid.scale.set(0.35, 0.35, 0.35);
    pyramid.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 0, 0, `XYZ`));
    pyramid.position.set(-8, -60, 25);

    this.add(pyramid);
  }

  addFlashlight() {
    let flashlight = new Flashlight(setMaterial);

    flashlight.scale.set(0.42, 0.42, 0.42);
    flashlight.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, 0, `XYZ`));
    flashlight.position.set(150, -115, 15);

    this.add(flashlight);
  }
}
