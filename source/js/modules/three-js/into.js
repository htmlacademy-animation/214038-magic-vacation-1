import ThreeJsCanvas from "./three-js-canvas";

export default class Intro extends ThreeJsCanvas {
  constructor(canvasId, texture) {
    super({
      canvasId,
      texture
    });
  }
}
