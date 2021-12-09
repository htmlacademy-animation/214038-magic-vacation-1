import ThreeJsCanvas from "./three-js-canvas";
import * as THREE from "three";
import {storyRowShaderMaterial} from "./simple-raw-shader-material";
import Scene2Slide from "./scenes/slide-2";
import Scene3Slide from "./scenes/slide-3";

let animationHueSettings = {
  initialHue: 0,
  finalHue: -0.4,
  currentHue: 0,
  duration: 1,
  timeStart: -1
};

export const setMaterial = (options = {}) => {
  const {color, ...other} = options;

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    ...other
  });
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
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {hue: 0.0, isMagnifier: true}, scene: new Scene2Slide()},
      {src: `./img/module-5/scenes-textures/scene-3.png`, options: {hue: 0.0}, scene: new Scene3Slide()},
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

  init() {
    const self = this;

    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.color = new THREE.Color(0x5f458c);
    this.alpha = 1;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      logarithmicDepthBuffer: false,
      powerPreference: `high-performance`
    });

    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(35, this.aspectRation, 0.1, 1200);
    this.camera.position.z = 750;

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) =>
      ({src: textureLoader.load(texture.src), options: texture.options, scene: texture.scene})
    );

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, index) => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = self.createMaterial(texture, index);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.x = this.textureWidth;
        mesh.scale.y = this.textureHeight;
        mesh.position.x = this.textureWidth * index;

        if (texture.scene) {
          texture.scene.position.x = this.textureWidth * index;
          this.scene.add(texture.scene);
        }

        this.scene.add(mesh);
        this.scene.add(this.getSphere());

        const lights = this.getLight();

        lights.position.z = this.camera.position.z;
        this.scene.add(lights);

        this.render();
      });
    };

    this.render();
  }

  getSphere() {
    const geometry = new THREE.SphereGeometry(100, 50, 50);

    const material = new THREE.MeshStandardMaterial({
      color: 0xa40c00,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5
    });

    return new THREE.Mesh(geometry, material);
  }

  getLight() {
    const light = new THREE.Group();

    let lightUnit = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.30);

    lightUnit.position.set(0, this.camera.position.z * Math.tan(-15 * THREE.Math.DEG2RAD), this.camera.position.z);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.60, 3000, 2);
    lightUnit.position.set(-785, -350, 710);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.95, 3000, 2);
    lightUnit.position.set(730, -800, 985);
    light.add(lightUnit);

    return light;
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
