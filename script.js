/**
 * BARBEARIA IDEAL — Script de Interatividade, HoloCard (Bursts) & Conversão
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Suavização de scroll para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Efeito sutil de revelação em scroll (IntersectionObserver)
  const revealElements = document.querySelectorAll('.service-card, .feature-card, .review-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // 5. Efeito HoloCard (React Bits - preset="bursts") na Galeria de Fotos
  initHoloGallery();

  console.log('Barbearia Ideal — Landing Page pronta com HoloCard Bursts.');
});

function initHoloGallery() {
  const items = document.querySelectorAll('.gallery-section .gallery-item');
  if (!items.length) return;

  const PERSPECTIVE = 1100;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  const VERTEX = `#version 300 es
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;

  const FRAGMENT = `#version 300 es
  precision highp float;

  uniform sampler2D uArt;
  uniform vec2 uSize;
  uniform float uAspect;
  uniform vec2 uTilt;
  uniform vec2 uLight;
  uniform float uDistance;
  uniform float uIntensity;
  uniform float uScale;
  uniform float uEdge;
  uniform float uFrame;
  uniform float uRadius;
  uniform float uGlare;
  uniform vec3 uFoil;
  uniform float uReady;

  out vec4 outColor;
  const float TAU = 6.28318530718;

  struct Foil {
    float mask;
    float angle;
    float jitter;
    vec2 facet;
  };

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  vec2 hash2(vec2 p) {
    return vec2(hash(p), hash(p + 17.31));
  }

  vec3 hue(float t) {
    t = abs(fract(t * 0.5) * 2.0 - 1.0);
    vec3 c = mix(vec3(0.1, 0.25, 1.0), vec3(0.0, 0.85, 1.0), smoothstep(0.0, 0.25, t));
    c = mix(c, vec3(0.25, 1.0, 0.2), smoothstep(0.25, 0.45, t));
    c = mix(c, vec3(1.0, 0.92, 0.05), smoothstep(0.45, 0.65, t));
    c = mix(c, vec3(1.0, 0.45, 0.05), smoothstep(0.65, 0.85, t));
    return mix(c, vec3(0.95, 0.12, 0.3), smoothstep(0.85, 1.0, t));
  }

  Foil bursts(vec2 p) {
    vec2 q = mat2(0.7071068, 0.7071068, -0.7071068, 0.7071068) * (p - vec2(0.5, 0.5 * uAspect)) / (0.283 / uScale);
    vec2 d = fract(q) - 0.5;
    float u = length(d) / 0.49;
    float angle = atan(d.y, d.x);
    if (u < 0.12) {
      float ring = min(floor(u / 0.045 + 0.5), 2.0);
      float count = max(1.0, ring * 6.0);
      float spot = (floor(angle / TAU * count) + 0.5) / count * TAU;
      vec2 dotPos = vec2(cos(spot), sin(spot)) * ring * 0.045;
      float m = smoothstep(0.024, 0.012, length(d / 0.49 - dotPos));
      return Foil(m, angle, 0.5, vec2(0.0));
    }
    bool inner = u < 0.66;
    float slot = angle / TAU * (inner ? 56.0 : 72.0);
    bool shifted = mod(floor(slot), 2.0) > 0.5;
    vec2 band = inner ? (shifted ? vec2(0.45, 0.61) : vec2(0.33, 0.49)) : (shifted ? vec2(0.84, 0.99) : vec2(0.7, 0.85));
    float across = abs(u - (band.x + band.y) * 0.5) / ((band.y - band.x) * 0.5);
    float along = abs(fract(slot) - 0.5) * 2.0;
    float width = inner ? 0.72 : 0.6;
    float m = smoothstep(1.0, 0.78, across) * smoothstep(width, width - 0.2, along);
    return Foil(m, angle, 0.5, vec2(0.0));
  }

  vec3 sparkles(vec2 p, vec3 halfway, vec2 sweep, float awake) {
    vec2 g = p * 62.0;
    vec2 cell = floor(g);
    vec2 d = fract(g) - 0.5 - (hash2(cell) - 0.5) * 0.36;
    float spin = hash(cell + 3.0) * TAU;
    d = mat2(cos(spin), -sin(spin), sin(spin), cos(spin)) * d;
    vec2 a = abs(d);
    float hexagon = max(a.x * 0.866 + a.y * 0.5, a.y);
    float size = mix(0.22, 0.38, hash(cell + 2.0));
    float piece = smoothstep(size, size - 0.07, hexagon) * step(0.42, hash(cell + 4.0));
    vec3 facet = normalize(vec3((hash2(cell + 6.0) - 0.5) * 0.9, 1.0));
    float flash = pow(max(dot(facet, halfway), 0.0), 6.0);
    vec3 tint = hue(dot(sweep, vec2(cos(spin), sin(spin))) * 1.2 + dot(sweep, vec2(0.8, 0.6)) * 0.8 + hash(cell + 8.0) * 0.5);
    vec3 color = piece * tint * (0.3 + 1.6 * flash) * awake;
    vec2 fine = p * 210.0;
    vec2 speckCell = floor(fine);
    float speck = smoothstep(0.24, 0.0, length(fract(fine) - 0.5 - (hash2(speckCell) - 0.5) * 0.5)) * step(0.72, hash(speckCell + 1.0));
    float speckFlash = pow(max(dot(normalize(vec3((hash2(speckCell + 2.0) - 0.5) * 0.9, 1.0)), halfway), 0.0), 10.0);
    return color + vec3(1.2) * speck * speckFlash * (1.0 - piece);
  }

  void main() {
    vec2 uv = vec2(gl_FragCoord.x / uSize.x, 1.0 - gl_FragCoord.y / uSize.y);
    vec2 p = vec2(uv.x, uv.y * uAspect);
    vec2 center = vec2(0.5, 0.5 * uAspect);
    vec2 q = abs(p - center) - center + uRadius;
    float outside = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
    float pixel = 1.0 / uSize.x;
    float alpha = clamp(0.5 - outside / pixel, 0.0, 1.0);
    vec4 sampled = texture(uArt, uv);
    if (uReady > 0.5) alpha *= sampled.a;
    if (alpha <= 0.0) {
      outColor = vec4(0.0);
      return;
    }
    vec3 art = uReady > 0.5 ? pow(sampled.rgb, vec3(2.2)) : vec3(0.12);

    mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cos(uTilt.x), sin(uTilt.x), 0.0, -sin(uTilt.x), cos(uTilt.x));
    mat3 ry = mat3(cos(uTilt.y), 0.0, -sin(uTilt.y), 0.0, 1.0, 0.0, sin(uTilt.y), 0.0, cos(uTilt.y));
    mat3 turn = rx * ry;
    vec3 world = turn * vec3(p - center, 0.0);
    vec3 view = normalize(transpose(turn) * (vec3(0.0, 0.0, uDistance) - world));
    vec3 lamp = vec3((uLight - 0.5) * vec2(1.1, 1.1 * uAspect), 0.9);
    vec3 light = normalize(transpose(turn) * (lamp - world));
    vec3 halfway = normalize(light + view);
    vec2 sweep = light.xy + view.xy;
    float sheen = pow(max(halfway.z, 0.0), 10.0);
    float shine = pow(max(halfway.z, 0.0), 80.0);
    float frame = 1.0 - smoothstep(uFrame - pixel, uFrame + pixel, -outside);

    Foil f = bursts(p);
    vec2 dir = vec2(cos(f.angle), sin(f.angle));
    float phase = dot(sweep, dir) * 0.25 + dot(sweep, vec2(0.8, 0.6)) * 1.9 + f.jitter * 0.12;
    vec3 tint = hue(phase);
    vec3 foil = mix(tint, vec3(1.0), 0.12) * (1.15 + 0.3 * sheen);
    float tilted = smoothstep(0.02, 0.21, length(sin(uTilt)));
    float awake = mix(0.2, 1.0, tilted);
    float strength = uIntensity * f.mask * (1.0 - frame) * awake;

    vec3 color = mix(art, foil, clamp(strength, 0.0, 1.0));
    color += sparkles(p, halfway, sweep, mix(0.55, 1.0, tilted)) * uEdge * frame;
    color += uFoil * sheen * 0.12 * frame;
    color += vec3(sheen * 0.07 + shine * 0.3) * uGlare;
    color = pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));
    outColor = vec4(color * alpha, alpha);
  }`;

  const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    gl.deleteShader(shader);
    return null;
  };

  items.forEach(item => {
    const imgEl = item.querySelector('img');
    if (!imgEl) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'holo-canvas';
    const fallbackGlare = document.createElement('div');
    fallbackGlare.className = 'holo-fallback-glare';
    item.appendChild(canvas);
    item.appendChild(fallbackGlare);

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    let program = null;
    let texture = null;
    let textureReady = false;
    const uniforms = {};

    if (gl) {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (vs && fs) {
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.bindAttribLocation(program, 0, 'position');
        gl.linkProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.deleteProgram(program);
          program = null;
        }
      }

      if (program) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

        ['uArt', 'uSize', 'uAspect', 'uTilt', 'uLight', 'uDistance', 'uIntensity', 'uScale', 'uEdge', 'uFrame', 'uRadius', 'uGlare', 'uFoil', 'uReady'].forEach(name => {
          uniforms[name] = gl.getUniformLocation(program, name);
        });
      }
    }

    const state = {
      tiltX: 0, tiltY: 0, tiltVX: 0, tiltVY: 0,
      lightX: 0.36, lightY: 0.26, lightVX: 0, lightVY: 0,
      lift: 1, liftV: 0,
      clock: Math.random() * 40
    };
    const pointer = { x: 0.5, y: 0.5, inside: false };
    let raf = 0;
    let last = 0;
    let visible = true;
    let calm = 0;

    // Parâmetros calibrados para a Barbearia Ideal (preset: bursts)
    const cfg = {
      intensity: 0.65,
      scale: 1.0,
      edgeSparkle: 0.8,
      frame: 0.035,
      glare: 0.5,
      tiltMax: 12,
      hoverScale: 1.03,
      foil: [0.85, 0.64, 0.35], // Dourado elegante
      radius: 12
    };

    const draw = () => {
      if (!gl || !program || !textureReady) return;
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) return;
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.uArt, 0);
      gl.uniform2f(uniforms.uSize, w, h);
      gl.uniform1f(uniforms.uAspect, h / w);
      gl.uniform2f(uniforms.uTilt, (state.tiltX * Math.PI) / 180, (state.tiltY * Math.PI) / 180);
      gl.uniform2f(uniforms.uLight, state.lightX, state.lightY);
      gl.uniform1f(uniforms.uDistance, PERSPECTIVE / Math.max(1, canvas.clientWidth));
      gl.uniform1f(uniforms.uIntensity, cfg.intensity);
      gl.uniform1f(uniforms.uScale, cfg.scale);
      gl.uniform1f(uniforms.uEdge, cfg.edgeSparkle);
      gl.uniform1f(uniforms.uFrame, cfg.frame);
      gl.uniform1f(uniforms.uRadius, cfg.radius / Math.max(1, canvas.clientWidth));
      gl.uniform1f(uniforms.uGlare, cfg.glare);
      gl.uniform3f(uniforms.uFoil, cfg.foil[0], cfg.foil[1], cfg.foil[2]);
      gl.uniform1f(uniforms.uReady, 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const spring = (value, velocity, target, stiffness, damping, dt) => {
      const next = velocity + ((target - value) * stiffness - velocity * damping) * dt;
      return [value + next * dt, next];
    };

    const tick = now => {
      raf = 0;
      const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000));
      last = now;

      let targetX = 0, targetY = 0, lightX = 0.36, lightY = 0.26, lift = 1;
      const drifting = !reduceMotion && !pointer.inside;

      if (pointer.inside && !reduceMotion) {
        targetX = (0.5 - pointer.y) * 2 * cfg.tiltMax;
        targetY = (pointer.x - 0.5) * 2 * cfg.tiltMax;
        lightX = pointer.x;
        lightY = pointer.y;
        lift = cfg.hoverScale;
      } else if (drifting) {
        state.clock += dt;
        const t = state.clock;
        targetX = Math.sin(t * 0.7) * cfg.tiltMax * 0.25;
        targetY = Math.sin(t * 0.53 + 1.2) * cfg.tiltMax * 0.35;
        lightX = 0.5 + Math.sin(t * 0.41) * 0.42;
        lightY = 0.38 + Math.sin(t * 0.33 + 0.6) * 0.3;
      }

      const steps = Math.ceil(dt / (1 / 240));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        [state.tiltX, state.tiltVX] = spring(state.tiltX, state.tiltVX, targetX, 150, 16, h);
        [state.tiltY, state.tiltVY] = spring(state.tiltY, state.tiltVY, targetY, 150, 16, h);
        [state.lightX, state.lightVX] = spring(state.lightX, state.lightVX, lightX, 220, 30, h);
        [state.lightY, state.lightVY] = spring(state.lightY, state.lightVY, lightY, 220, 30, h);
        [state.lift, state.liftV] = spring(state.lift, state.liftV, lift, 320, 30, h);
      }

      item.style.transform = `perspective(${PERSPECTIVE}px) scale(${state.lift}) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg)`;
      item.style.setProperty('--hx', `${(state.lightX * 100).toFixed(1)}%`);
      item.style.setProperty('--hy', `${(state.lightY * 100).toFixed(1)}%`);

      draw();

      const motion = Math.abs(state.tiltVX) + Math.abs(state.tiltVY) + Math.abs(state.liftV) * 40 + Math.abs(state.tiltX - targetX) + Math.abs(state.tiltY - targetY);
      calm = motion > 0.02 ? 0 : calm + dt;
      if (!visible || (!drifting && !pointer.inside && calm > 0.3)) return;
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf) return;
      calm = 0;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const loadTex = () => {
      if (!gl || !program) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          // Desenha com object-fit: cover no mesmo aspect ratio do card
          const cw = Math.max(1, item.clientWidth);
          const ch = Math.max(1, item.clientHeight);
          const off = document.createElement('canvas');
          off.width = cw * 2;
          off.height = ch * 2;
          const ctx = off.getContext('2d');
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const cardRatio = off.width / off.height;
          let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
          if (imgRatio > cardRatio) {
            sw = img.naturalHeight * cardRatio;
            sx = (img.naturalWidth - sw) / 2;
          } else {
            sh = img.naturalWidth / cardRatio;
            sy = (img.naturalHeight - sh) / 2;
          }
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, off.width, off.height);

          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off);
          gl.generateMipmap(gl.TEXTURE_2D);
          textureReady = true;
          item.setAttribute('data-holo-ready', '');
          draw();
          wake();
        } catch (e) {
          textureReady = false;
        }
      };
      img.src = imgEl.src;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(item.clientWidth * dpr));
      const h = Math.max(1, Math.round(item.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      if (textureReady) loadTex();
      draw();
      wake();
    };

    const track = e => {
      if (e.pointerType === 'touch' && e.type === 'pointermove' && !e.buttons) return;
      const rect = item.getBoundingClientRect();
      pointer.x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      pointer.y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      pointer.inside = true;
      wake();
    };

    const leave = () => {
      pointer.inside = false;
      wake();
    };

    item.addEventListener('pointerenter', track);
    item.addEventListener('pointermove', track);
    item.addEventListener('pointerdown', track);
    item.addEventListener('pointerleave', leave);
    item.addEventListener('pointercancel', leave);

    if ('ResizeObserver' in window) {
      new ResizeObserver(resize).observe(item);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        if (visible) wake();
      }).observe(item);
    }

    loadTex();
    resize();
  });
}
