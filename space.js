/* Fundo espacial com estrelas azuis brilhando — compartilhado por todas as páginas */
(function () {
  if (document.getElementById("space")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "space";
  const vignette = document.createElement("div");
  vignette.id = "space-vignette";
  document.body.appendChild(canvas);
  document.body.appendChild(vignette);

  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, dpr = 1, stars = [], shooting = [], nextShot = 0;

  const PALETTE = ["#ffffff", "#cfe2ff", "#9fc4ff", "#6fa8ff", "#3f86ff", "#2f7dff"];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    const count = Math.round(Math.min(340, (w * h) / 5200));
    stars = [];
    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.35 + depth * 1.5,
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        base: 0.25 + Math.random() * 0.6,
        speed: 0.0006 + Math.random() * 0.0022,
        phase: Math.random() * Math.PI * 2,
        drift: 0.004 + depth * 0.016,
        big: Math.random() < 0.06
      });
    }
  }

  function spawnShot(t) {
    const fromLeft = Math.random() < 0.5;
    shooting.push({
      x: fromLeft ? -60 : w + 60,
      y: Math.random() * h * 0.55,
      vx: (fromLeft ? 1 : -1) * (5.5 + Math.random() * 3.5),
      vy: 1.6 + Math.random() * 1.4,
      life: 1
    });
    nextShot = t + 5000 + Math.random() * 9000;
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      const tw = s.base + Math.sin(t * s.speed + s.phase) * 0.38;
      const a = Math.max(0.05, Math.min(1, tw));
      s.y += s.drift;
      if (s.y > h + 4) { s.y = -4; s.x = Math.random() * w; }

      ctx.globalAlpha = a;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      if (s.big) {
        ctx.globalAlpha = a * 0.28;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 9);
        g.addColorStop(0, "rgba(120,175,255,.9)");
        g.addColorStop(1, "rgba(30,80,200,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = a * 0.5;
        ctx.strokeStyle = "rgba(180,215,255,.7)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(s.x - s.r * 4, s.y); ctx.lineTo(s.x + s.r * 4, s.y);
        ctx.moveTo(s.x, s.y - s.r * 4); ctx.lineTo(s.x, s.y + s.r * 4);
        ctx.stroke();
      }
    }

    if (!reduce) {
      if (t > nextShot) spawnShot(t);
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i];
        m.x += m.vx; m.y += m.vy; m.life -= 0.006;
        if (m.life <= 0 || m.x < -120 || m.x > w + 120 || m.y > h + 120) {
          shooting.splice(i, 1); continue;
        }
        const tailX = m.x - m.vx * 14, tailY = m.y - m.vy * 14;
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, "rgba(255,255,255," + m.life + ")");
        grad.addColorStop(0.4, "rgba(110,170,255," + m.life * 0.55 + ")");
        grad.addColorStop(1, "rgba(47,125,255,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
