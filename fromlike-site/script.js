const GAMES = [
  { title: "the\nsnake\ngame", img: "assets/snake_game.png", date: "À venda agora", genre: "educativo", },
  { title: "It's\n just\n a\n boat.", img: "assets/barco.png", date: "2026", genre: "Ação multijogador",  },
  { title: "gladiators", img: "assets/traidors.png", date: "À venda agora", genre: "Ação mecha",},
  { title: "I will love you\n again and again.", img: "assets/love.png", date: "À venda agora", genre: "romance visual", },
];

const AUTOPLAY = 6000;
const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const bar = document.getElementById("progressBar");
const grid = document.getElementById("grid");

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
        <b>Lançamento</b><span>${g.date}</span>
        <b>Gênero</b><span>${g.genre}</span>
      </div>
      <button class="cta">SAIBA MAIS</button>
    </div>`;
  s.addEventListener("click", () => go(i));
  s.addEventListener("mouseenter", () => { paused = true; });
  s.addEventListener("mouseleave", () => { paused = false; });
  slidesEl.appendChild(s);

  const d = document.createElement("button");
  d.setAttribute("aria-label", "Ir para o slide " + (i + 1));
  d.addEventListener("click", () => go(i));
  dotsEl.appendChild(d);

  const card = document.createElement("figure");
  card.className = "card";
  card.innerHTML = `<img src="${g.img}" alt="${g.title.replace(/\n/g, " ")}" loading="lazy" width="720" height="1280"><figcaption>${g.title}</figcaption>`;
  grid.appendChild(card);
});

const slideEls = [...slidesEl.children];
const dotEls = [...dotsEl.children];

function render() {
  slideEls.forEach((s, i) => s.classList.toggle("active", i === index));
  dotEls.forEach((d, i) => d.classList.toggle("on", i === index));
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

document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
document.getElementById("acceptCookie").addEventListener("click", () => {
  document.getElementById("cookie").classList.add("hidden");
});

render();
restart();
raf = requestAnimationFrame(loop);
