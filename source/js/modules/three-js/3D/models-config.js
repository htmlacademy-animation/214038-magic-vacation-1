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
  }
};

export default modelsConfig;
