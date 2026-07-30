/* Cobrinha da História — JavaScript puro */

const QUESTIONS = [
  { q: "Quem descobriu o Brasil?", correct: "Pedro Álvares Cabral", wrong: "Cristóvão Colombo" },
  { q: "Em que ano o Brasil foi descoberto?", correct: "1500", wrong: "1822" },
  { q: "Quem proclamou a Independência do Brasil?", correct: "Dom Pedro I", wrong: "Dom João VI" },
  { q: "Quem assinou a Lei Áurea, em 1888?", correct: "Princesa Isabel", wrong: "Marechal Deodoro" },
  { q: "Qual civilização construiu as pirâmides de Gizé?", correct: "Egípcios", wrong: "Romanos" },
  { q: "Quem foi o primeiro imperador de Roma?", correct: "Augusto", wrong: "Aníbal" },
  { q: "Em que ano começou a Segunda Guerra Mundial?", correct: "1939", wrong: "1914" },
  { q: "Qual muro caiu em 1989?", correct: "Muro de Berlim", wrong: "Muralha da China" },
  { q: "Quem liderou a Revolução Francesa contra o rei?", correct: "Os jacobinos", wrong: "Os cruzados" },
  { q: "Que povo dominou os Andes antes dos espanhóis?", correct: "Incas", wrong: "Vikings" },
  { q: "Quem foi Tiradentes?", correct: "Líder da Inconfidência", wrong: "Rei de Portugal" },
  { q: "Qual país colonizou o Brasil?", correct: "Portugal", wrong: "Espanha" },
  { q: "Quem escreveu 'O Príncipe'?", correct: "Maquiavel", wrong: "Sócrates" },
  { q: "Em que ano o homem pisou na Lua?", correct: "1969", wrong: "1955" },
  { q: "Quem foi líder da luta contra o apartheid?", correct: "Nelson Mandela", wrong: "Napoleão" },
];

const SIZE = 30;
const BOARD = 600;

const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);

const canvas = document.querySelector(".sq-canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector(".sq-score-value");
const finalEl = document.querySelector(".sq-final");
const menu = document.querySelector(".sq-menu");
const btn = document.querySelector(".sq-btn");
const qEl = document.querySelector(".sq-q");
const redEl = document.querySelector(".sq-ans--red");
const blueEl = document.querySelector(".sq-ans--blue");
const stage = document.querySelector(".sq-stage");
const flash = document.querySelector(".sq-flash");

const audioEat = new Audio("audios/acerto.mp3");
const audioOver = new Audio("audios/gameover.mp3");
const audioStart = new Audio("audios/iniciar.mp3");
[audioEat, audioOver, audioStart].forEach((a) => (a.volume = 0.6));
const play = (a) => {
  try {
    a.currentTime = 0;
    a.play();
  } catch (e) {
    /* autoplay bloqueado */
  }
};

let deck = shuffle(QUESTIONS);
let qIndex = 0;
let score = 0;
let snake = [{ x: 300, y: 300 }];
let direction;
let running = true;
let loopId;
let redIsCorrect = true;
let pulse = 0;

const blocks = { red: { x: 90, y: 150 }, blue: { x: 480, y: 420 } };

const randomCell = () => Math.floor(Math.random() * (BOARD / SIZE)) * SIZE;

const placeBlocks = () => {
  const taken = () => snake.concat([blocks.red, blocks.blue]);
  const spot = () => {
    let x = randomCell();
    let y = randomCell();
    let guard = 0;
    while (taken().some((p) => p.x === x && p.y === y) && guard++ < 200) {
      x = randomCell();
      y = randomCell();
    }
    return { x, y };
  };
  blocks.red = spot();
  blocks.blue = spot();
};

const renderQuestion = () => {
  const q = deck[qIndex % deck.length];
  redIsCorrect = Math.random() < 0.5;
  qEl.textContent = q.q;
  redEl.textContent = redIsCorrect ? q.correct : q.wrong;
  blueEl.textContent = redIsCorrect ? q.wrong : q.correct;
  placeBlocks();
};

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  for (let i = SIZE; i < BOARD; i += SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, BOARD);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(BOARD, i);
    ctx.stroke();
  }
};

const roundRect = (x, y, s, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, s, s, r);
  ctx.fill();
};

const drawBlocks = () => {
  pulse += 0.15;
  const grow = Math.sin(pulse) * 2;
  const paint = (p, color) => {
    ctx.shadowColor = color;
    ctx.shadowBlur = 18 + grow * 2;
    ctx.fillStyle = color;
    roundRect(p.x - grow / 2, p.y - grow / 2, SIZE + grow, 8);
    ctx.shadowBlur = 0;
  };
  paint(blocks.red, "#ff3b53");
  paint(blocks.blue, "#3b82ff");
};

const drawSnake = () => {
  snake.forEach((p, i) => {
    const head = i === snake.length - 1;
    ctx.fillStyle = head ? "#f9f871" : "rgba(120, 255, 170, " + (0.45 + (i / snake.length) * 0.55) + ")";
    ctx.shadowColor = head ? "#f9f871" : "#78ffaa";
    ctx.shadowBlur = head ? 16 : 6;
    roundRect(p.x + 1, p.y + 1, SIZE - 2, 7);
    ctx.shadowBlur = 0;
  });
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake[snake.length - 1];
  const next = { x: head.x, y: head.y };
  if (direction === "right") next.x += SIZE;
  if (direction === "left") next.x -= SIZE;
  if (direction === "up") next.y -= SIZE;
  if (direction === "down") next.y += SIZE;
  snake.push(next);
  snake.shift();
};

const flashScreen = (color) => {
  flash.style.background = color;
  flash.classList.remove("sq-flash--on");
  void flash.offsetWidth;
  flash.classList.add("sq-flash--on");
};

const gameOver = () => {
  running = false;
  direction = undefined;
  play(audioOver);
  finalEl.textContent = String(score).padStart(2, "0");
  menu.classList.add("sq-menu--on");
  canvas.style.filter = "blur(3px)";
  flashScreen("rgba(255,59,83,0.45)");
};

const checkHit = () => {
  const head = snake[snake.length - 1];
  const onRed = head.x === blocks.red.x && head.y === blocks.red.y;
  const onBlue = head.x === blocks.blue.x && head.y === blocks.blue.y;
  if (!onRed && !onBlue) return;

  const correct = (onRed && redIsCorrect) || (onBlue && !redIsCorrect);
  if (correct) {
    score += 10;
    scoreEl.textContent = String(score).padStart(2, "0");
    scoreEl.classList.remove("sq-pop");
    void scoreEl.offsetWidth;
    scoreEl.classList.add("sq-pop");
    snake.push({ x: head.x, y: head.y });
    play(audioEat);
    flashScreen("rgba(120,255,170,0.35)");
    qIndex++;
    if (qIndex % deck.length === 0) deck = shuffle(QUESTIONS);
    renderQuestion();
  } else {
    gameOver();
  }
};

const checkCollision = () => {
  const head = snake[snake.length - 1];
  const limit = BOARD - SIZE;
  const wall = head.x < 0 || head.x > limit || head.y < 0 || head.y > limit;
  const neck = snake.length - 2;
  const self = snake.some((p, i) => i < neck && p.x === head.x && p.y === head.y);
  if (wall || self) gameOver();
};

const loop = () => {
  clearTimeout(loopId);
  ctx.clearRect(0, 0, BOARD, BOARD);
  drawGrid();
  drawBlocks();
  if (running) {
    moveSnake();
    drawSnake();
    checkHit();
    checkCollision();
  } else {
    drawSnake();
  }
  loopId = setTimeout(loop, 130);
};

document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].indexOf(k) >= 0) e.preventDefault();
  if ((k === "arrowright" || k === "d") && direction !== "left") direction = "right";
  if ((k === "arrowleft" || k === "a") && direction !== "right") direction = "left";
  if ((k === "arrowup" || k === "w") && direction !== "down") direction = "up";
  if ((k === "arrowdown" || k === "s") && direction !== "up") direction = "down";
});

btn.addEventListener("click", () => {
  play(audioStart);
  score = 0;
  scoreEl.textContent = "00";
  snake = [{ x: 300, y: 300 }];
  direction = undefined;
  running = true;
  deck = shuffle(QUESTIONS);
  qIndex = 0;
  menu.classList.remove("sq-menu--on");
  canvas.style.filter = "none";
  renderQuestion();
});

let touchStart = null;
stage.addEventListener("touchstart", (e) => {
  touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
stage.addEventListener("touchend", (e) => {
  if (!touchStart) return;
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 20 && direction !== "left") direction = "right";
    if (dx < -20 && direction !== "right") direction = "left";
  } else {
    if (dy > 20 && direction !== "up") direction = "down";
    if (dy < -20 && direction !== "down") direction = "up";
  }
  touchStart = null;
}, { passive: true });

renderQuestion();
loop();
