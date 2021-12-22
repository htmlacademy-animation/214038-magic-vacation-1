import {colors} from "../scenes/helpers/colors";
import {reflectivity} from "../scenes/helpers/reflectivity";

const modelsConfig = {
  airplane: {
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
    color: colors.White,
    reflectivity: reflectivity.soft
  },
  suitcase: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  watermelon: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  wallCornerUnit: {
    type: `obj`,
    path: `3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  },
  scene1: {
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`
  },
  scene2: {
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`
  },
  scene3: {
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`
  },
  scene4: {
    type: `gltf`,
    path: `3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`
  }
};

export default modelsConfig;
