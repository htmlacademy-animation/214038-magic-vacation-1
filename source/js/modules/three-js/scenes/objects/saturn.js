import * as THREE from 'three';
import {setMaterial} from "../../story";
import {getLathePoints} from '../utils/lathe-options';

export default class Saturn extends THREE.Group {
  constructor() {
    super();

    this.colorSaturn = 0xfc2947;
    this.colorRing = 0x5b3ea5;
    this.colorRope = 0x8388ab;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
    this.addCylinder();
    this.addSphereSmall();
  }

  addSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);

    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({color: this.colorSaturn, flatShading: true}));

    this.add(this.sphereBigMesh);
  }

  addRing() {
    const points = getLathePoints(40, 2, 80);
    const ring = new THREE.LatheBufferGeometry(points, 50);
    const ringMesh = new THREE.Mesh(ring, setMaterial({color: this.colorRing, flatShading: true, side: THREE.DoubleSide}));

    ringMesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(ringMesh);
  }

  addCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    const topOffset = this.sphereBigMesh.position.y + cylinder.parameters.height / 2;

    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({color: this.colorRope, flatShading: true}));
    this.cylinderMesh.position.set(0, topOffset, 0);

    this.add(this.cylinderMesh);
  }

  addSphereSmall() {
    const sphere = new THREE.SphereGeometry(10, 30, 30);
    const topOffset = this.sphereBigMesh.position.y + this.sphereBigMesh.geometry.parameters.radius * 2;
    const sphereSmallMesh = new THREE.Mesh(sphere, setMaterial({color: this.colorRing, flatShading: true}));

    sphereSmallMesh.position.set(this.cylinderMesh.position.x, topOffset, this.cylinderMesh.position.z);

    this.add(sphereSmallMesh);
  }
}
