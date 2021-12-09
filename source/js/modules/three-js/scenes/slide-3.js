import * as THREE from "three";
import {setMaterial} from "../story";
import Snowman from "./objects/snowman";

class Scene3Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowMan();
  }

  addSnowMan() {
    const snowMan = new Snowman(setMaterial);

    snowMan.rotation.copy(new THREE.Euler(15 * THREE.Math.DEG2RAD, -35 * THREE.Math.DEG2RAD, 0, `XYZ`));
    snowMan.position.set(-130, -20, 0);

    this.add(snowMan);
  }
}

export default Scene3Slide;
