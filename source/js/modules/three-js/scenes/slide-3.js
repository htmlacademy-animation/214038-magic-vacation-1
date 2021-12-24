import * as THREE from "three";
import {setMaterial} from "../story";
import Snowman from "./objects/snowman";
import Road from "./objects/road";
import {colors} from "./helpers/colors";
import {reflectivity} from "./helpers/reflectivity";
import {loadModel} from "../3D/model-loader";
import Floor from "./objects/floor";

class Scene3Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowMan();
    this.addRoad();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
    this.getCompass();
  }

  addSnowMan() {
    const snowMan = new Snowman(setMaterial);

    snowMan.position.set(220, 220, 400);

    this.add(snowMan);
  }

  addRoad() {
    const road = new Road();

    this.add(road);
  }

  getWall() {
    const name = `wallCornerUnit`;
    const material = setMaterial({color: colors.SkyLightBlue, ...reflectivity.soft, side: THREE.DoubleSide});

    loadModel(name, material, (mesh) => {
      mesh.name = name;

      this.add(mesh);
    });
  }

  getFloor() {
    const material = setMaterial({color: colors.MountainBlue, ...reflectivity.soft, side: THREE.DoubleSide});
    const mesh = new Floor(material);

    this.add(mesh);
  }

  addSceneStatic() {
    const name = `scene3`;

    loadModel(name, null, (mesh) => {
      mesh.name = name;

      this.add(mesh);
    });
  }

  getCompass() {
    const name = `compass`;

    loadModel(name, null, (mesh) => {
      mesh.name = name;

      this.add(mesh);
    });
  }
}

export default Scene3Slide;
