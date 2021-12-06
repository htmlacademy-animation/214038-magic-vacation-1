import ThreeJsCanvas from "./three-js-canvas";
import * as THREE from "three";
import {storyRowShaderMaterial} from "./simple-raw-shader-material";

let animationHueSettings = {
  initialHue: 0,
  finalHue: -0.4,
  currentHue: 0,
  duration: 1,
  timeStart: -1
};

export default class Story extends ThreeJsCanvas {
  constructor(canvasId) {
    super({
      canvasId
    });

    this.center = {x: this.width / 2, y: this.height / 2};
    this.isActiveTwoScreen = false;
    this.isNeedToRepeatCycleHue = true;

    this.textures = [
      {src: `./img/module-5/scenes-textures/scene-1.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {hue: 0.0, isMagnifier: true}},
      {src: `./img/module-5/scenes-textures/scene-3.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-4.png`, options: {hue: 0.0}}
    ];

    this.bubbleGlareOffset = 0.8;
    this.bubbleGlareStartRadianAngle = 2;
    this.bubbleGlareEndRadianAngle = 3;
    this.bubblesDuration = 4;

    this.bubbles = [
      {
        radius: 80.0,
        initialPosition: [this.center.x - 100, 0],
        position: [],
        finalPosition: [this.center.x - 100, this.center.y + this.height],
        amplitude: 80,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle,
        timeStart: -1
      },
      {
        radius: 40.0,
        initialPosition: [this.center.x + 100, this.center.y - this.height * 1.4],
        position: [],
        finalPosition: [this.center.x + 100, this.center.y + this.height],
        amplitude: 60,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle,
        timeStart: -1
      },
      {
        radius: 60.0,
        initialPosition: [this.center.x - 350, this.center.y - this.height * 2],
        position: [],
        finalPosition: [this.center.x - 350, this.center.y + this.height],
        amplitude: -100,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle,
        timeStart: -1
      },
    ];
  }

  addBubble(index) {
    const width = this.renderer.getSize().width;
    const pixelRatio = this.renderer.getPixelRatio();

    if (this.textures[index].options.isMagnifier) {
      return {
        magnification: {
          value: {
            bubbles: this.bubbles,
            resolution: [width * pixelRatio, width / this.textureRatio * pixelRatio],
          }
        },
      };
    }

    return {};
  }

  createMaterial(texture, index) {
    return new THREE.RawShaderMaterial(storyRowShaderMaterial({
      map: {value: texture.src},
      options: {value: texture.options},
      ...this.addBubble(index)
    }));
  }

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;
    this.render();

    // запускем функцию, где определяется что второй слайд и запускаются эффекты для второго слайда
    this.actionSlideTwo(sceneID);
  }

  actionSlideTwo(sceneID) {
    this.resetHueCycle();
    this.resetBubbleCycle();

    if (sceneID === 1) {
      this.isActiveTwoScreen = true;
      this.startAnimate();
    } else {
      this.isActiveTwoScreen = false;
      this.isNeedToRepeatCycleHue = true;
      this.resetHueShift();
      animationHueSettings.currentHue = 0;
    }
  }

  // обнуляем параметры для запуска нового цикла мигания
  resetHueCycle() {
    animationHueSettings.duration = this.getRandomNumber(1.5, 2); // рандомная длительность одного мигания
    animationHueSettings.timeStart = Date.now() * 0.001; // обнуляем время отсчета
  }

  resetBubbleCycle() {
    this.bubbles.forEach((bubble) => {
      bubble.timeStart = Date.now() * 0.001;
    });
  }

  // обнуляем hue
  resetHueShift() {
    this.textures[1].options.hue = animationHueSettings.initialHue;
  }

  startAnimate() {
    this.animateHueShift();

    // запуск анимации для всех пузырьков
    this.bubbles.forEach((bubble) => {
      this.animateBubbles(bubble);
    });

    // обнуляем цикл мигания для последующего запуска снова
    if (this.isNeedToRepeatCycleHue) {
      this.isNeedToRepeatCycleHue = false;
      animationHueSettings.currentHue = 0;

      this.resetHueCycle();
    }

    // если активен второй слайдер, то гоняем действует requestAnimationFrame, если нет - отменяет его
    if (this.isActiveTwoScreen) {
      requestAnimationFrame(() => {
        this.startAnimate();
        this.render();
      });
    } else {
      cancelAnimationFrame(() => {
        this.startAnimate();
        this.render();
      });
    }
  }

  animateHueShift() {
    let hueValue = animationHueSettings.currentHue;

    if (animationHueSettings.timeStart > 0) {
      const t = Date.now() * 0.001 - animationHueSettings.timeStart;

      // время превышено для данного цикла анимации
      if (t >= animationHueSettings.duration) {
        animationHueSettings.timeStart = -1;
        this.isNeedToRepeatCycleHue = true;
      }

      const progress = t / animationHueSettings.duration;

      if (progress < 0.5) {
        hueValue = (animationHueSettings.initialHue + progress * (animationHueSettings.finalHue - animationHueSettings.initialHue)) * 2;
      } else if (progress > 0.5) {
        hueValue = (animationHueSettings.finalHue + progress * (animationHueSettings.initialHue - animationHueSettings.finalHue)) * 2;
      }
    }

    // обновляем значение hue для последующей передачи в шейдер
    if (hueValue !== animationHueSettings.currentHue) {
      this.textures[1].options.hue = hueValue;
      animationHueSettings.currentHue = hueValue;
    }
  }

  animateBubbles(bubble) {
    if (bubble.timeStart > 0) {
      const t = Date.now() * 0.001 - bubble.timeStart;
      const progress = t / this.bubblesDuration;

      const y = bubble.initialPosition[1] + progress * (bubble.finalPosition[1] - bubble.initialPosition[1]);
      const offset = bubble.amplitude * Math.pow(1 - progress, 1) * Math.sin(progress * Math.PI * 10);
      const x = (offset + bubble.initialPosition[0]);

      bubble.position = [x, y];
    }
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
