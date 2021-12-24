import * as THREE from "three";
import Saturn from "./objects/saturn";
import Rug from "./objects/rug";
import {setMaterial} from "../story";
import {colors} from "./helpers/colors";
import {reflectivity} from "./helpers/reflectivity";
import {loadModel} from "../3D/model-loader";
import Floor from "./objects/floor";

export default class Scene4Slide extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn();
    this.addRug();
    this.getWall();
    this.getFloor();
    this.addSceneStatic();
    this.getSonya();
  }

  addSaturn() {
    const saturn = new Saturn(`slide4`);

    saturn.position.set(350, 500, 200);

    this.add(saturn);
  }

  addRug() {
    const rug = new Rug(`slide4`);

    this.add(rug);
  }

  getWall() {
    const name = `wallCornerUnit`;
    const material = setMaterial({color: colors.ShadowedPurple, ...reflectivity.basic, side: THREE.DoubleSide});

    loadModel(name, material, (mesh) => {
      mesh.name = name;

      this.add(mesh);
    });
  }

  getFloor() {
    const material = setMaterial({color: colors.ShadowedDarkPurple, ...reflectivity.soft, side: THREE.DoubleSide});
    const mesh = new Floor(material);

    this.add(mesh);
  }

  addSceneStatic() {
    const name = `scene4`;

    loadModel(name, null, (mesh) => {
      mesh.name = name;

      this.add(mesh);
    });
  }

  getSonya() {
    const name = `sonya`;

    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(450, 150, 300);
      mesh.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, 0));

      this.add(mesh);
    });
  }
}
