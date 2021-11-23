import ThreeJsCanvas from "./three-js-canvas";

export default class Story extends ThreeJsCanvas {
  constructor(canvasId, texture) {
    super({
      canvasId,
      texture
    });
  }
}
