export const PARTICLE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uOrganismPos;
  uniform float uAttracting;
  uniform float uShockwaveActive;
  uniform vec2 uShockwaveCenter;
  uniform float uShockwaveProgress; // 0.0 to 1.0
  uniform float uShockwaveRadius;   // up to 30.0 WU
  uniform float uReducedMotion;

  attribute vec3 aOffset;       // Initial particle spatial anchor (x, y, z)
  attribute float aScale;       // Individual particle size variation
  attribute float aPhase;       // Phase offset for turbulence
  attribute vec3 aBaseColor;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vUv;

  // 2D Simplex / Perlin noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Curl noise approximation
  vec2 curlNoise(vec2 p) {
    float eps = 0.5;
    float n1 = snoise(vec2(p.x, p.y + eps));
    float n2 = snoise(vec2(p.x, p.y - eps));
    float n3 = snoise(vec2(p.x + eps, p.y));
    float n4 = snoise(vec2(p.x - eps, p.y));
    float dx = (n1 - n2) / (2.0 * eps);
    float dy = (n3 - n4) / (2.0 * eps);
    return vec2(dx, -dy);
  }

  void main() {
    vUv = uv;
    vec3 pos = aOffset;

    float t = uTime * 0.4 + aPhase;
    if (uReducedMotion > 0.5) {
      t *= 0.15;
    }

    // 1. Natural Ambient Curl Turbulence
    vec2 curl = curlNoise(pos.xy * 0.03 + vec2(t * 0.1, t * 0.08));
    pos.xy += curl * (3.0 * (1.0 - uReducedMotion * 0.7));

    // 2. Gravitational Singularity Attraction
    vec2 toOrganism = uOrganismPos - pos.xy;
    float distToOrg = length(toOrganism);
    if (uAttracting > 0.01 && distToOrg < 25.0) {
      float attractFactor = (1.0 - distToOrg / 25.0) * uAttracting;
      pos.xy += normalize(toOrganism) * (attractFactor * 6.5);
    }

    // 3. Shockwave Repulsion Wave
    if (uShockwaveActive > 0.01) {
      vec2 toBlast = pos.xy - uShockwaveCenter;
      float distToBlast = length(toBlast);
      float currentWaveFront = uShockwaveProgress * uShockwaveRadius;
      float waveThickness = 6.0;
      float waveDist = abs(distToBlast - currentWaveFront);

      if (waveDist < waveThickness && distToBlast < uShockwaveRadius) {
        float waveStrength = (1.0 - waveDist / waveThickness) * (1.0 - uShockwaveProgress);
        if (distToBlast > 0.001) {
          pos.xy += normalize(toBlast) * (waveStrength * 8.0);
        }
      }
    }

    // Billboard quad expansion in screen-aligned world units
    vec3 transformed = position * (aScale * 1.2);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    mvPosition.xy += transformed.xy;

    gl_Position = projectionMatrix * mvPosition;

    // Color and Alpha calculation
    vColor = aBaseColor;
    if (uAttracting > 0.01 && distToOrg < 25.0) {
      vColor = mix(vColor, vec3(0.2, 0.9, 1.0), (1.0 - distToOrg / 25.0) * 0.7);
    }

    // Depth attenuation
    vAlpha = clamp(1.0 - abs(pos.z) / 10.0, 0.25, 0.95);
  }
`;

export const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;
  varying vec2 vUv;

  void main() {
    // Distance from center of billboard quad [0, 1]
    vec2 center = vUv - vec2(0.5);
    float dist = length(center) * 2.0;

    if (dist > 1.0) {
      discard;
    }

    // Soft bioluminescent radial falloff with glowing nucleus
    float core = smoothstep(0.3, 0.0, dist);
    float halo = smoothstep(1.0, 0.1, dist);
    float glow = core * 0.8 + halo * 0.6;

    vec3 finalColor = mix(vColor, vec3(1.0, 1.0, 1.0), core * 0.6);
    gl_FragColor = vec4(finalColor, glow * vAlpha);
  }
`;

export const FLUID_BACKGROUND_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const FLUID_BACKGROUND_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uCameraPos;
  uniform float uZoom;
  uniform int uOctaves;
  uniform vec3 uBaseColor;
  uniform vec3 uAccentColor;
  uniform float uSaturation;

  varying vec2 vUv;

  // Hash & noise functions
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
      if (i >= octaves) break;
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Parallax coordinate in continuous Cartesian space
    vec2 worldCoord = (vUv - 0.5) * (uZoom * 0.5) + uCameraPos * 0.15;
    vec2 p = worldCoord * 0.04;

    float t = uTime * 0.08;
    vec2 q = vec2(fbm(p + vec2(0.0, t), uOctaves), fbm(p + vec2(5.2, 1.3), uOctaves));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t, uOctaves),
                  fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t, uOctaves));

    float f = fbm(p + 4.0 * r, uOctaves);

    vec3 col = mix(uBaseColor, uAccentColor, clamp(f * f * 2.5, 0.0, 1.0));
    col = mix(col, vec3(0.02, 0.04, 0.08), clamp(length(q), 0.0, 1.0));
    col = mix(col, uAccentColor * 1.4, clamp(pow(r.x, 2.5) * 1.5, 0.0, 1.0));

    // Desaturation adjustment for DORMANT climate
    float luminance = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luminance), col, uSaturation);

    gl_FragColor = vec4(col, 1.0);
  }
`;
