#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D u_tex0;
uniform vec3 u_color;

#define TAU 6.283185307179586

float biToUni(float v) {
  return (v + 1.0) * 0.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution * 0.5;
  uv.y = 1.0 - uv.y;

  vec4 colorFondo = vec4(uv.x, 0.0, 0.0, 1.0);

  float t = u_time * 0.125;
  vec2 st = uv * 0.5;
  float rowst = biToUni(sin((st.x - st.y + t) * TAU * 24.0));
  rowst = step(0.5, rowst);
  float colst = biToUni(cos((st.y + st.x + t) * TAU * 24.0));
  colst = step(0.5, colst);

  vec4 letras = texture2D(u_tex0, uv);

  // vec4 aniA = vec4(vec3(rowst), 1.0);
  // vec4 aniB = vec4(vec3(colst), 1.0);
  // vec4 color = mix(aniA, aniB, letras.a);

  vec4 negro = vec4(vec3(0.0), 1.0);
  vec4 rojo = vec4(u_color, 1.0);

  vec4 colorRow = mix(negro, rojo, rowst);
  vec4 colorCol = mix(negro, rojo, colst);

  vec4 color = mix(colorRow, colorCol, letras.a);

  gl_FragColor = color;
}