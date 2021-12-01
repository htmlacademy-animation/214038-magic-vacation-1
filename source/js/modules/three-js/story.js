import ThreeJsCanvas from "./three-js-canvas";
import * as THREE from "three";
import {storyRowShaderMaterial} from "./simple-raw-shader-material";

export default class Story extends ThreeJsCanvas {
  constructor(canvasId) {
    super({
      canvasId
    });

    this.center = {x: this.width / 2, y: this.height / 2};

    this.textures = [
      {src: `./img/module-5/scenes-textures/scene-1.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {hue: -0.4, isMagnifier: true}},
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
      ...this.addBubble(index),
    }));
  }

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;
    this.render();
  }
}
