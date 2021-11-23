import * as THREE from 'three';
import simpleRawShaderMaterial from './simple-raw-shader-material';

export default class ThreeJsCanvas {
  constructor(
      options
  ) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRation = this.width / this.height;

    this.textures = options.texture;
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;

    this.canvasId = options.canvasId;
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.color = new THREE.Color(0x5f458c);
    this.alpha = 1;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });

    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 1200);
    this.camera.position.z = 1200;

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) =>
      textureLoader.load(texture)
    );

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, positionX) => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.RawShaderMaterial(simpleRawShaderMaterial(texture));
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.x = this.textureWidth;
        mesh.scale.y = this.textureHeight;
        mesh.position.x = this.textureWidth * positionX;

        this.scene.add(mesh);
        this.render();
      });
    };

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
