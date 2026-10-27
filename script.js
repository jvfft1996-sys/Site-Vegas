const GAMES = [
  { 
    title: "cobrinha\nastronauta", 
    img: "assets/cobrinha_astronauta.webp",  
    genero: "educativo", 
    ctaText: "JOGAR", 
    link: "snake_game/index.html" 
  },
  
  { 
    title: "arcade\nVEGAS", 
    img: "assets/arcade_game.webp",
    genero: "Livre", 
    ctaText: "JOGAR", 
    link: "vegas_arcade/index.html" 
  },
  
];

const AUTOPLAY = 6000;
const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const bar = document.getElementById("progressBar");
const bannerInfo = document.getElementById("bannerInfo");

let index = 0, timer = null, start = 0, raf = null, paused = false;

// ---- build slides ----
GAMES.forEach((g, i) => {
  const s = document.createElement("article");
  s.className = "slide";
  s.dataset.i = i;
  s.innerHTML = `
    <div class="media"><img src="${g.img}" alt="${g.title.replace(/\n/g, " ")}" ${i ? 'loading="lazy"' : ""} width="720" height="1280"></div>
    <div class="veil"></div>
    <span class="idx">0${i + 1} / 0${GAMES.length}</span>
    <div class="content">
      <h2>${g.title}</h2>
      <div class="meta">
        <b>Gênero</b><span>${g.genero}</span>
      </div>
      <a href="${g.link}" class="cta">${g.ctaText}</a>
    </div>`;
  s.addEventListener("click", (e) => {
    if (e.target.classList.contains('cta')) return;
    go(i);
  });
  s.addEventListener("mouseenter", () => { paused = true; });
  s.addEventListener("mouseleave", () => { paused = false; });
  slidesEl.appendChild(s);

  const d = document.createElement("button");
  d.setAttribute("aria-label", "Ir para o slide " + (i + 1));
  d.addEventListener("click", () => go(i));
  dotsEl.appendChild(d);
});

const slideEls = [...slidesEl.children];
const dotEls = [...dotsEl.children];

function render() {
  slideEls.forEach((s, i) => s.classList.toggle("active", i === index));
  dotEls.forEach((d, i) => d.classList.toggle("on", i === index));

  const g = GAMES[index];
  bannerInfo.innerHTML = `
    <div class="chips">
     
    </div>
    <p class="headline">${g.title.replace(/\n/g, " ")}</p>`;
  bannerInfo.classList.remove("show");
  requestAnimationFrame(() => bannerInfo.classList.add("show"));
}

function go(i) {
  index = (i + GAMES.length) % GAMES.length;
  render();
  restart();
}

function restart() {
  start = performance.now();
}

function loop(now) {
  if (!paused) {
    const p = Math.min((now - start) / AUTOPLAY, 1);
    bar.style.width = p * 100 + "%";
    if (p >= 1) go(index + 1);
  } else {
    start = now - parseFloat(bar.style.width || 0) / 100 * AUTOPLAY;
  }
  raf = requestAnimationFrame(loop);
}

document.getElementById("next").addEventListener("click", () => go(index + 1));
document.getElementById("prev").addEventListener("click", () => go(index - 1));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(index + 1);
  if (e.key === "ArrowLeft") go(index - 1);
});

// swipe
let x0 = null;
slidesEl.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
slidesEl.addEventListener("touchend", (e) => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
  x0 = null;
});

document.getElementById("acceptCookie").addEventListener("click", () => {
  document.getElementById("cookie").classList.add("hidden");
});

render();
restart();
raf = requestAnimationFrame(loop);
