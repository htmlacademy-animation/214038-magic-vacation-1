import * as THREE from "three";

export default class Flashlight extends THREE.Group {
  constructor(material) {
    super();

    this.color = 0x0062c3;
    this.colorLantern = 0x8faff8;
    this.material = material;

    this.constructChildren();
  }

  constructChildren() {
    this.addBottomCylinder();
    this.addSphere();
    this.addCentreCylinder();
    this.addLampStand();
    this.addLantern();
    this.addRoofLantern();
  }

  addBottomCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(16, 16, 120, 30);
    const mesh = new THREE.Mesh(cylinder, this.material({color: this.color}));

    this.cylinderMesh = mesh;

    this.add(mesh);
  }

  addSphere() {
    const sphere = new THREE.SphereGeometry(16, 30, 30);
    const mesh = new THREE.Mesh(sphere, this.material({color: this.color, flatShading: true}));

    const topOffset = this.cylinderMesh.position.y + this.cylinderMesh.geometry.parameters.height / 2;

    this.sphereMesh = mesh;
    mesh.position.set(0, topOffset, 0);

    this.add(mesh);
  }

  addCentreCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(7, 7, 230, 30);
    const mesh = new THREE.Mesh(cylinder, this.material({color: this.color, flatShading: true}));

    const topOffset = this.cylinderMesh.position.y + this.cylinderMesh.geometry.parameters.height / 2 + cylinder.parameters.height / 2;

    this.centreCylinderMesh = mesh;
    mesh.position.set(0, topOffset, 0);

    this.add(mesh);
  }

  addLampStand() {
    const lampStand = new THREE.BoxBufferGeometry(37, 4, 37);
    const mesh = new THREE.Mesh(lampStand, this.material({color: this.color, flatShading: true}));

    const topOffset = this.centreCylinderMesh.position.y + this.centreCylinderMesh.geometry.parameters.height / 2;

    this.lampStand = mesh;
    mesh.position.set(0, topOffset, 0);

    this.add(mesh);
  }

  addLantern() {
    const lantern = new THREE.CylinderBufferGeometry(Math.hypot(42, 42) / 2, Math.hypot(34, 34) / 2, 60, 4);
    const mesh = new THREE.Mesh(lantern, this.material({color: this.colorLantern, flatShading: true}));

    const topOffset = this.lampStand.position.y + lantern.parameters.height / 2;

    this.lanternMesh = mesh;
    mesh.position.set(0, topOffset, 0);
    mesh.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0, `XYZ`));

    this.add(mesh);
  }

  addRoofLantern() {
    const roofLantern = new THREE.CylinderBufferGeometry(Math.hypot(45, 45) / 2, Math.hypot(57, 57) / 2, 6, 4);
    const mesh = new THREE.Mesh(roofLantern, this.material({color: this.color, flatShading: true}));

    const topOffset = this.lanternMesh.position.y + this.lanternMesh.geometry.parameters.height / 2;

    mesh.position.set(0, topOffset, 0);
    mesh.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0, `XYZ`));

    this.add(mesh);
  }
}
