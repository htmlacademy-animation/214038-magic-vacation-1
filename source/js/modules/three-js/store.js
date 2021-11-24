import ThreeJsCanvas from "./three-js-canvas";

export default class Story extends ThreeJsCanvas {
  constructor(canvasId, texture) {
    super({
      canvasId,
      texture
    });
  }

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;
    this.render();
  }
}
