import * as THREE from 'three';
import {setMaterial} from "../../story";
import {getLathePoints, getLatheDegrees} from '../utils/lathe-options';

export default class Rug extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x9070b7;
    this.colorStrips = 0x6548a0;
    this.startDeg = 16;
    this.finishDeg = 74;
    this.lengthStrip = (this.finishDeg - this.startDeg) / 7;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePoints(180, 3, 763);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const baseMesh = new THREE.Mesh(base, setMaterial({color: this.colorBase, flatShading: true}));

    this.add(baseMesh);
  }

  addStrips() {
    for (let index = 1; index < 6; index += 2) {
      const points = getLathePoints(180, 3, 763);
      const {start, length} = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));

      const strip = new THREE.LatheBufferGeometry(points, 5, start, length);
      const stripMesh = new THREE.Mesh(strip, setMaterial({color: this.colorStrips, flatShading: true}));

      stripMesh.position.set(0, 1, 0);

      this.add(stripMesh);
    }
  }
}
