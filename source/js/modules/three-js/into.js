import ThreeJsCanvas from "./three-js-canvas";

export default class Intro extends ThreeJsCanvas {
  constructor(canvasId) {
    super({
      canvasId
    });

    this.textures = [{src: `./img/module-5/scenes-textures/scene-0.png`, options: {hue: 0.0}}];
  }
}
