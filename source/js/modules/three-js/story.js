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
    this.hueIteration = 0;
    this.countIteration = 0;

    this.textures = [
      {src: `./img/module-5/scenes-textures/scene-1.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {hue: 0.0, isMagnifier: true}},
      {src: `./img/module-5/scenes-textures/scene-3.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-4.png`, options: {hue: 0.0}}
    ];

    this.bubbleGlareOffset = 0.8;
    this.bubbleGlareStartRadianAngle = 2;
    this.bubbleGlareEndRadianAngle = 3;

    this.bubbles = [
      {
        radius: 80.0,
        position: [this.center.x - 50, 450],
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: 40.0,
        position: [this.center.x + 100, 300],
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: 60.0,
        position: [this.center.x - 400, 150],
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
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

    if (sceneID === 1) {
      this.isActiveTwoScreen = true;
      this.animateHueShift();
    } else {
      this.isActiveTwoScreen = false;
      this.countIteration = 0;
      this.hueIteration = 0;
      this.resetHueShift();
      animationHueSettings.currentHue = 0;
    }
  }

  // обнуляем параметры для запуска нового цикла мигания
  resetHueCycle() {
    animationHueSettings.duration = this.getRandomNumber(0.5, 1); // рандомная длительность одного мигания
    animationHueSettings.timeStart = Date.now() * 0.001; // обнуляем время отсчета
  }

  // обнуляем hue
  resetHueShift() {
    this.textures[1].options.hue = animationHueSettings.initialHue;
  }

  animateHueShift() {
    this.animate();

    // запускам эффект hue второй и третий раз
    if ((this.hueIteration === 1 || this.hueIteration === 2) && this.countIteration === 0) {
      this.countIteration = 1;
      animationHueSettings.currentHue = 0;

      this.resetHueCycle();
    }

    // если активен второй слайдер, то гоняем действует requestAnimationFrame, если нет - отменяет его
    if (this.isActiveTwoScreen) {
      requestAnimationFrame(() => {
        this.animateHueShift();
        this.render();
      });
    } else {
      cancelAnimationFrame(() => {
        this.animateHueShift();
        this.render();
      });
    }
  }

  animate() {
    let hueValue = animationHueSettings.currentHue;

    if (animationHueSettings.timeStart > 0) {
      const t = Date.now() * 0.001 - animationHueSettings.timeStart;

      // время превышено для данного цикла анимации
      if (t >= animationHueSettings.duration) {
        animationHueSettings.timeStart = -1;
        this.hueIteration++;
        this.countIteration = 0;
      }

      const progress = t / animationHueSettings.duration;

      if (progress < 0.5) {
        hueValue = (animationHueSettings.initialHue + progress * (animationHueSettings.finalHue - animationHueSettings.initialHue)) * 2;
      } else if (progress > 0.5) {
        hueValue = (animationHueSettings.finalHue + progress * (animationHueSettings.initialHue - animationHueSettings.finalHue)) * 2;
      }
    }

    // обновляем значение hue для последующей передачи в шейдер
    if (hueValue !== animationHueSettings.currentHue && this.isActiveTwoScreen) {
      this.textures[1].options.hue = hueValue;
      animationHueSettings.currentHue = hueValue;
    }
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}
