import Swiper from "swiper";
import Story from "./three-js/store";

export default () => {
  let storySlider;

  const storyDog = new Story(`canvas-story`, `./img/module-5/scenes-textures/scene-1.png`);
  storyDog.init();

  const storyCase = new Story(`canvas-story`, `./img/module-5/scenes-textures/scene-2.png`);
  const storyPyramid = new Story(`canvas-story`, `./img/module-5/scenes-textures/scene-3.png`);
  const storyAi = new Story(`canvas-story`, `./img/module-5/scenes-textures/scene-4.png`);

  const setSlider = function () {
    const body = document.body;

    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              storyDog.init();
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              storyCase.init();
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              storyPyramid.init();
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              storyAi.init();
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              body.classList.remove(`second`, `third`, `fourth`);
              body.classList.add(`first`);
              storyDog.init();
            } else if (storySlider.activeIndex === 2) {
              body.classList.remove(`first`, `third`, `fourth`);
              body.classList.add(`second`);
              storyCase.init();
            } else if (storySlider.activeIndex === 4) {
              body.classList.remove(`first`, `second`, `fourth`);
              body.classList.add(`third`);
              storyPyramid.init();
            } else if (storySlider.activeIndex === 6) {
              body.classList.add(`fourth`);
              body.classList.remove(`first`, `third`, `second`);
              storyAi.init();
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
