// const — объявление константы;

// attribute — глобальные переменные, которые могут меняться для каждой вершины, и передаются в вершинные шейдеры.
// Могут использоваться только в вершинных шейдерах.

// uniform — глобальная переменная, которая может меняться для каждого полигона, передаётся OpenGL в шейдеры.
// Может использоваться в обоих типах шейдеров.

// varying используются для передачи интерполированных данных между вершинным и фрагментным шейдерами.
// Доступны для записи в вершинном шейдере, и read-only для фрагментного шейдера.

export const simpleRawShaderMaterial = (texture, arg) => ({
  uniforms: {
    map: {
      value: texture
    },
    options: {
      value: arg
    }
  },
  vertexShader: `
    // Переменные, которые передаёт Three.js для проецирования на плоскость
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;

    // Атрибуты вершины из геометрии
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    // Varying-переменная для передачи uv во фрагментный шейдер
    varying vec2 vUv;

    void main() {
        vUv = uv;

        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

    }`,
  fragmentShader: `
    // глобально для шейдера средняя точность расчетов
    precision mediump float;

    // объявление текстуры
    uniform sampler2D map;

    varying vec2 vUv;

    void main() {
        vec4 texel = texture2D( map, vUv );

        gl_FragColor = texel;
    }`
});

export const storyRowShaderMaterial = (texture, arg) => ({
  uniforms: {
    map: {
      value: texture
    },
    options: {
      value: arg
    }
  },
  vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;

    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
        vUv = uv;

        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

    }`,
  fragmentShader: `
    precision mediump float;

    // объявление текстуры
    uniform sampler2D map;

    varying vec2 vUv;

    // объявляем собственный тип данных - структуру
    struct optionsStruct {
      float hue;
    };

    uniform optionsStruct options;

    // функция для подсчета смещения цвета эффект hue
    vec3 hueShift(vec3 color, float hue) {
        const vec3 k = vec3(0.57735, 0.57735, 0.57735);
        float cosAngle = cos(hue);
        return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
    }

    void main() {
        vec4 texel = texture2D( map, vUv );

        if (options.hue != 0.0) {
          vec3 hueShifted = hueShift(texel.rgb, options.hue);
          gl_FragColor = vec4(hueShifted.rgb, 1);
        } else {
          gl_FragColor = texel;
        }

    }`
});
