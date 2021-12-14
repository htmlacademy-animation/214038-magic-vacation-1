import * as THREE from "three";
import {setMaterial} from "../story";
import Snowman from "./objects/snowman";
import Road from "./objects/road";

class Scene3Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowMan();
    this.addRoad();
  }

  addSnowMan() {
    const snowMan = new Snowman(setMaterial);

    snowMan.rotation.copy(new THREE.Euler(15 * THREE.Math.DEG2RAD, -35 * THREE.Math.DEG2RAD, 0, `XYZ`));
    snowMan.position.set(-130, -20, 0);

    this.add(snowMan);
  }

  addRoad() {
    const road = new Road();
    const scale = 0.735;

    road.scale.set(scale, scale, scale);
    road.position.set(0, -100, 0);
    road.rotation.copy(new THREE.Euler(13.5 * THREE.Math.DEG2RAD, -45 * THREE.Math.DEG2RAD, 0), `XYZ`);

    this.add(road);
  }
}

export default Scene3Slide;
