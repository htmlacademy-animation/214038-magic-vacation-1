import animationConfig from "./animation-config";
import * as THREE from "three";
import _ from '../../../canvas/utils';

const tick = (from, to, progress) => from + progress * (to - from);

export const animateIntroObjects = (animateObjects) => {
  // для каждого объекта создается класс, отвечающий за анимацию
  animateObjects.forEach((object) => {
    const animateObject = new AnimateObject(object);
  });
};

class AnimateObject extends THREE.Group {
  constructor(object) {
    super();
    this.object = object;

    this.startTime = -1;
    this.time = -1;

    this.animationStop = false;

    this.loop = this.loop.bind(this);

    this.init();
  }

  init() {
    // записываем интро сцену как парент анимируемого объекта
    this.introScene = this.object.parent;

    const fluctuationGroup = new THREE.Group();
    const motionGroup = new THREE.Group();

    motionGroup.name = `motionGroup`;
    fluctuationGroup.name = `fluctuationGroup`;

    this.objectfluctuation = fluctuationGroup;
    this.objectMotion = motionGroup;

    // вкладываем объект в группы, чтобы для каждой группы можно было задать один тип анимации. А не все в кучу.
    motionGroup.add(this.object);
    fluctuationGroup.add(motionGroup);

    // созданную верхнюю группу делаем чайлдом всей интро сцены
    this.introScene.children.push(fluctuationGroup);

    // определяем конфиг для анимации
    this.config = animationConfig[this.object.name];

    setTimeout(() => {
      this.loop();
    }, this.config.delay);
  }

  loop() {
    this.update();

    if (this.animationStop) {
      cancelAnimationFrame(() => {
        this.loop();
      });
    } else {
      requestAnimationFrame(this.loop);
    }
  }

  update() {
    if (this.startTime < 0) {
      this.startTime = Date.now();
      this.time = this.startTime;

      return;
    }

    const nowTime = Date.now();
    const time = (nowTime - this.startTime) * 0.001;

    this.updateObjectParameters(time);

    this.time = nowTime;
  }

  updateObjectParameters(time) {
    let progress = time / this.config.duration;
    const easing = _.easeOutCubic(progress);

    if (progress > 1) {
      this.animateFluctuationObject();
      this.animationStop = true;

      return;
    }

    const positionX = tick(this.config.startPosition[0], this.config.finishPosition[0], easing);
    const positionY = tick(this.config.startPosition[1], this.config.finishPosition[1], easing);
    const positionZ = tick(this.config.startPosition[2], this.config.finishPosition[2], easing);

    const scaleX = tick(this.config.startScale[0], this.config.finishScale[0], easing);
    const scaleY = tick(this.config.startScale[1], this.config.finishScale[1], easing);
    const scaleZ = tick(this.config.startScale[2], this.config.finishScale[2], easing);

    const rotationX = tick(this.config.startRotation[0], this.config.finishRotation[0], easing);
    const rotationY = tick(this.config.startRotation[1], this.config.finishRotation[1], easing);
    const rotationZ = tick(this.config.startRotation[2], this.config.finishRotation[2], easing);

    this.object.scale.set(scaleX, scaleY, scaleZ);
    this.objectMotion.position.set(positionX, positionY, positionZ);
    this.object.rotation.set(rotationX, rotationY, rotationZ);
  }

  animateFluctuationObject() {
    let progress = 0;
    let startTime = Date.now();
    let self = this;

    function loop() {
      progress = (Date.now() - startTime) * 0.0001;
      self.objectfluctuation.position.y = self.objectfluctuation.position.y + self.config.amp * Math.sin((2 * Math.PI * progress) / self.config.period);

      requestAnimationFrame(loop);
    }

    loop();
  }
}
