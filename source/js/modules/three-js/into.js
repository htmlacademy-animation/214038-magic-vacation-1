import ThreeJsCanvas from "./three-js-canvas";
import * as THREE from "three";
import SvgLoader from "./svg-loader/svg-loader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {colors} from "./scenes/helpers/colors";
import {reflectivity} from "./scenes/helpers/reflectivity";

export default class Intro extends ThreeJsCanvas {
  constructor(canvasId) {
    super({
      canvasId
    });

    this.textures = [{src: `./img/module-5/scenes-textures/scene-0.png`, options: {hue: 0.0}}];
    this.render = this.render.bind(this);
    this.firstLoaded = true;
  }

  setMaterial(options = {}) {
    const {color, ...other} = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...other
    });
  }

  init() {
    // если не первый раз переходим на главную, то чтобы занаво не грузились и не инициализировались опять все images
    if (!this.firstLoaded) {
      return;
    }

    this.firstLoaded = false;

    const self = this;

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

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRation, 0.1, 20000);
    this.camera.position.z = 1200;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) =>
      ({src: textureLoader.load(texture.src), options: texture.options})
    );

    this.loadSvg();

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, index) => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = self.createMaterial(texture, index);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.x = this.textureWidth;
        mesh.scale.y = this.textureHeight;
        mesh.position.x = this.textureWidth * index;

        const lights = this.setLights();
        lights.position.z = this.camera.position.z;
        this.scene.add(lights);

        this.scene.add(mesh);
        this.render();
      });
    };

    this.render();
  }

  setLights() {
    const light = new THREE.Group();

    let lightUnit = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.80);

    lightUnit.position.set(0, this.camera.position.z * Math.tan(-15 * THREE.Math.DEG2RAD), this.camera.position.z);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.30, 3000, 1);
    lightUnit.position.set(0, -350, 710);
    light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.55, 3000, 1);
    lightUnit.position.set(730, -800, 985);
    light.add(lightUnit);

    return light;
  }

  loadSvg() {
    this.addBord();
    this.getKeyHole();
    this.getLeaf();
    this.getFlamingo();
    this.getQuestion();
    this.getSnowFlake();
  }

  addBord() {
    const plane = new THREE.PlaneGeometry(500, 500);
    const planeMesh = new THREE.Mesh(plane, this.setMaterial({color: colors.Purple, ...reflectivity.basic, flatShading: true}));

    planeMesh.position.set(0, 0, 5);
    this.scene.add(planeMesh);
  }

  getKeyHole() {
    const keyHole = new SvgLoader(`keyHole`).createSvgGroup();
    const scale = 1.5;

    keyHole.position.set(-1000 * scale, 1000 * scale, 0);
    keyHole.scale.set(scale, -scale, scale);

    this.scene.add(keyHole);
  }

  getLeaf() {
    const leaf = new SvgLoader(`leaf`).createSvgGroup();
    const scale = 1.6;

    leaf.position.set(670, 350, 100);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD, -60 * THREE.Math.DEG2RAD), `XYZ`);

    this.scene.add(leaf);
  }

  getFlamingo() {
    const flamingo = new SvgLoader(`flamingo`).createSvgGroup();
    const scale = 2;

    flamingo.position.set(-480, 370, 100);
    flamingo.scale.set(-scale, -scale, scale);
    flamingo.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);

    this.scene.add(flamingo);
  }

  getQuestion() {
    const question = new SvgLoader(`question`).createSvgGroup();
    const scale = 2;

    question.position.set(100, -330, 100);
    question.scale.set(scale, -scale, scale);
    question.rotation.copy(new THREE.Euler(-30 * THREE.Math.DEG2RAD, 0, 20 * THREE.Math.DEG2RAD), `XYZ`);

    this.scene.add(question);
  }

  getSnowFlake() {
    const snowflake = new SvgLoader(`snowflake`).createSvgGroup();
    const scale = 1.7;

    snowflake.position.set(-450, -10, 100);
    snowflake.scale.set(scale, scale, scale);
    snowflake.rotation.copy(new THREE.Euler(-10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);

    this.scene.add(snowflake);
  }


  render() {
    requestAnimationFrame(this.render);

    this.renderer.render(this.scene, this.camera);
  }
}
