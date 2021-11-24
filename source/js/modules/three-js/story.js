import ThreeJsCanvas from "./three-js-canvas";

export default class Story extends ThreeJsCanvas {
  constructor(canvasId) {
    super({
      canvasId
    });

    this.textures = [
      {src: `./img/module-5/scenes-textures/scene-1.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {hue: -0.4}},
      {src: `./img/module-5/scenes-textures/scene-3.png`, options: {hue: 0.0}},
      {src: `./img/module-5/scenes-textures/scene-4.png`, options: {hue: 0.0}}
    ];
  }

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;
    this.render();
  }
}
