import * as THREE from 'three';
import {setMaterial} from "../../story";
import {getLathePoints, getLatheDegrees} from '../utils/lathe-options';

export default class Road extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x555b6a;
    this.colorStrips = 0xe2e7ee;
    this.startDeg = 0;
    this.finishDeg = 90;
    this.lengthStrip = (this.finishDeg - this.startDeg) / 12;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    // this.addStrips();
  }

  addBase() {
    const points = getLathePoints(160, 3, 732);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const baseMesh = new THREE.Mesh(base, setMaterial({color: this.colorBase, flatShading: true}));

    this.add(baseMesh);
  }

  addStrips() {
    for (let index = 1; index < 12; index += 3) {
      const points = getLathePoints(20, 3, 800);
      const {start, length} = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));

      const strip = new THREE.LatheBufferGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(strip, setMaterial({color: this.colorStrips, flatShading: true}));

      mesh.position.set(0, 1, 0);

      this.add(mesh);
    }
  }
}
