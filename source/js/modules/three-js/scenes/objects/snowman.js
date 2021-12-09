import * as THREE from "three";

export default class Snowman extends THREE.Group {
  constructor(material) {
    super();

    this.colorBall = 0xffffff;
    this.colorCone = 0xfe4601;
    this.material = material;

    this.constructChildren();
  }

  constructChildren() {
    this.addSmallBoll();
    this.addBigBoll();
    this.addCone();
  }

  addSmallBoll() {
    const boll = new THREE.SphereGeometry(44, 30, 30);
    const mesh = new THREE.Mesh(boll, this.material({color: this.color}));

    this.smallBoll = mesh;

    this.add(mesh);
  }

  addBigBoll() {
    const boll = new THREE.SphereGeometry(75, 30, 30);
    const mesh = new THREE.Mesh(boll, this.material({color: this.colorBall}));

    mesh.position.set(0, -108, 0);

    this.add(mesh);
  }

  addCone() {
    const cone = new THREE.ConeBufferGeometry(Math.hypot(18, 18) / 2, 75, 30);
    const mesh = new THREE.Mesh(cone, this.material({color: this.colorCone}));

    const leftOffset = this.smallBoll.geometry.parameters.radius + 32 - cone.parameters.height / 2;
    const topOffset = this.smallBoll.position.y;

    mesh.position.set(leftOffset, topOffset, 0);
    mesh.rotation.copy(new THREE.Euler(0, 0, -90 * THREE.Math.DEG2RAD, `XYZ`));

    this.add(mesh);
  }
}
