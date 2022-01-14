import * as THREE from 'three';
import _ from '../../../canvas/utils';

const animateConfig = {
  durationScale: 2,
  startPosition: [0, 0, -50],
  initialScale: 0.2,
  finalScale: 1
};

const tick = (from, to, progress) => from + progress * (to - from);

export class AnimationAirplane extends THREE.Group {
  constructor(object) {
    super();

    this.object = object;
    this.animationStop = false;
    this.startTime = -1;

    this.loop = this.loop.bind(this);

    this.constructChildren();
  }

  constructChildren() {
    this.addGroup();

    setTimeout(() => {
      this.loop();
    }, 200);
  }

  get planeScale() {
    return this._scale;
  }

  set planeScale(value) {
    if (this._scale === value) {
      return;
    }

    this._scale = value;
    this.scaleChanged = true;
  }

  get planePosition() {
    return this._position;
  }

  set planePosition(value) {
    if (this._position === value) {
      return;
    }

    this._position = value;
    this.positionChanged = true;
  }

  get planeRotationZ() {
    return this._rotationZ;
  }

  set planeRotationZ(value) {
    if (this._rotationZ === value) {
      return;
    }

    this._rotationZ = value;
    this._rotationChangedZ = true;
  }

  get planeRotationY() {
    return this._rotationY;
  }

  set planeRotationY(value) {
    if (this._rotationY === value) {
      return;
    }

    this._rotationY = value;
    this._rotationChangedY = true;
  }

  addGroup() {
    const groupOuter = this.object;
    const plain = this.object.getObjectByName(`airplane`);

    this.plain = plain;
    this.outerAxis = groupOuter;
  }

  loop() {
    this.update();


    requestAnimationFrame(this.loop);
  }

  update() {
    if (this.startTime < 0) {
      this.startTime = Date.now();

      return;
    }

    const nowTime = Date.now();
    const time = (nowTime - this.startTime) * 0.001;

    this.animationPlain(time);
  }

  animationPlain(time) {
    const progress = time / animateConfig.durationScale;
    const easing = _.easeInCubic(progress);

    if (progress > 1) {
      this.animationScaleStop = true;

      return;
    }

    const scaleX = tick(animateConfig.initialScale, animateConfig.finalScale, easing);
    const scaleY = tick(animateConfig.initialScale, animateConfig.finalScale, easing);
    const scaleZ = tick(animateConfig.initialScale, animateConfig.finalScale, easing);

    this.planePosition = [
      Math.sin(1.1 * Math.PI * time) * 200 + 180,
      time * time * 75 - 150,
      time * 80 - 70,
    ];

    if (progress > 0.5 && progress < 0.7) {
      this.planeRotationY = Math.sin((Math.PI * time) / 1.5) * 4;
    }

    if (progress > 0.7) {
      this.planeRotationZ = Math.cos((Math.PI * time) / 1.5) * 2;
    }

    this.planeScale = [scaleX, scaleY, scaleZ];

    this.invalidate();
  }

  invalidate() {
    if (this.scaleChanged) {
      this.plain.scale.set(...this.planeScale);
      this.scaleChanged = false;
    }

    if (this.positionChanged) {
      this.outerAxis.position.set(...this.planePosition);
      this.positionChanged = false;
    }

    if (this._rotationChangedZ) {
      this.plain.rotation.z += (2.2 * THREE.Math.DEG2RAD * (this.planeRotationZ));
      this._rotationChangedZ = false;
    }

    if (this._rotationChangedY) {
      this.plain.rotation.y += (2 * THREE.Math.DEG2RAD * (this.planeRotationY));
      this._rotationChangedY = false;
    }
  }
}
