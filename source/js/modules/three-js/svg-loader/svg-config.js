import {colors} from "../scenes/helpers/colors";
import {reflectivity} from "../scenes/helpers/reflectivity";

const svgConfig = {
  keyHole: {
    src: `./img/module-6/svg-forms/keyhole.svg`,
    color: colors.DarkPurple,
    depth: 20,
    cap: 0,
    reflectivity: reflectivity.soft
  },
  leaf: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: colors.Green,
    depth: 8,
    cap: 2,
    reflectivity: reflectivity.basic
  },
  leafPyramid: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: colors.Green,
    depth: 3,
    cap: 3,
    reflectivity: reflectivity.basic
  },
  flamingo: {
    src: `./img/module-6/svg-forms/flamingo.svg`,
    color: colors.LightDominantRed,
    depth: 8,
    cap: 2,
    reflectivity: reflectivity.soft
  },
  question: {
    src: `./img/module-6/svg-forms/question.svg`,
    color: colors.Blue,
    depth: 8,
    cap: 2,
    reflectivity: reflectivity.basic
  },
  snowflake: {
    src: `./img/module-6/svg-forms/snowflake.svg`,
    color: colors.Blue,
    depth: 8,
    cap: 2,
    reflectivity: reflectivity.basic
  },
  flower: {
    src: `./img/module-6/svg-forms/flower.svg`,
    color: colors.ShadowedPurple,
    depth: 4,
    cap: 2,
    reflectivity: reflectivity.basic
  }
};

export default svgConfig;
