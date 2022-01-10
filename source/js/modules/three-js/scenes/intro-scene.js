import * as THREE from "three";
import SvgLoader from "../svg-loader/svg-loader";
import {colors} from "./helpers/colors";
import {reflectivity} from "./helpers/reflectivity";
import modelsConfig from "../3D/models-config";
import {loadModel} from "../3D/model-loader";
import {setMaterial} from "../story";

let meshObjects = {};

export default class IntroScene extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
    this.name = `IntroScene`;
  }

  constructChildren() {
    this.addBord();
    this.getKeyHole();
    this.getLeaf();
    this.getFlamingo();
    this.getQuestion();
    this.getSnowFlake();
    this.getPlane();
    this.getSuitcase();
    this.getWatermelon();
  }

  addBord() {
    const plane = new THREE.PlaneGeometry(500, 500);
    const planeMesh = new THREE.Mesh(plane, setMaterial({color: colors.Purple, ...reflectivity.basic, flatShading: true}));

    planeMesh.position.set(0, 0, 5);
    this.add(planeMesh);
  }

  getKeyHole() {
    const keyHole = new SvgLoader(`keyHole`).createSvgGroup();
    const scale = 1.5;

    keyHole.position.set(-1000 * scale, 1000 * scale, 0);
    keyHole.scale.set(scale, -scale, scale);

    this.add(keyHole);
  }

  getLeaf() {
    const leaf = new SvgLoader(`leaf`).createSvgGroup();
    const scale = 0;

    leaf.position.set(0, 0, 0);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD, -60 * THREE.Math.DEG2RAD), `XYZ`);
    leaf.name = `leaf`;
    meshObjects.leaf = leaf;

    this.add(leaf);
  }

  getFlamingo() {
    const flamingo = new SvgLoader(`flamingo`).createSvgGroup();
    const scale = 0;

    flamingo.position.set(0, 0, 0);
    flamingo.scale.set(-scale, -scale, scale);
    flamingo.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);
    flamingo.name = `flamingo`;
    meshObjects.flamingo = flamingo;

    this.add(flamingo);
  }

  getQuestion() {
    const question = new SvgLoader(`question`).createSvgGroup();
    const scale = 0;

    question.position.set(0, 0, 0);
    question.scale.set(scale, -scale, scale);
    question.rotation.copy(new THREE.Euler(-30 * THREE.Math.DEG2RAD, 0, 20 * THREE.Math.DEG2RAD), `XYZ`);
    question.name = `question`;
    meshObjects.question = question;

    this.add(question);
  }

  getSnowFlake() {
    const snowflake = new SvgLoader(`snowflake`).createSvgGroup();
    const scale = 0;

    snowflake.position.set(0, 0, 0);
    snowflake.scale.set(scale, scale, scale);
    snowflake.rotation.copy(new THREE.Euler(-10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);
    snowflake.name = `snowflake`;
    meshObjects.snowflake = snowflake;

    this.add(snowflake);
  }

  getPlane() {
    const name = `airplane`;
    const material = setMaterial({color: modelsConfig[name].color, ...modelsConfig[name].reflectivity});

    loadModel(name, material, (mesh) => {
      mesh.name = name;
      mesh.position.set(150, 80, 100);
      mesh.rotation.copy(new THREE.Euler(80 * THREE.Math.DEG2RAD, 120 * THREE.Math.DEG2RAD, -30 * THREE.Math.DEG2RAD), `XYZ`);

      this.add(mesh);
    });
  }

  getSuitcase() {
    const name = `suitcase`;

    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(-80, -180, 40);
      mesh.rotation.copy(new THREE.Euler(30 * THREE.Math.DEG2RAD, -135 * THREE.Math.DEG2RAD, -15 * THREE.Math.DEG2RAD), `XYZ`);
      mesh.scale.set(0.6, 0.6, 0.6);

      this.add(mesh);
    });
  }

  getWatermelon() {
    const name = `watermelon`;
    const scale = 0;

    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(0, 0, 0);
      mesh.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 0, 130 * THREE.Math.DEG2RAD), `XYZ`);
      mesh.scale.set(scale, scale, scale);
      meshObjects.watermelon = mesh;

      this.add(mesh);
    });
  }
}

export {meshObjects};