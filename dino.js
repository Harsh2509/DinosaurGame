import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const dinoElement = document.querySelector("[data-dino]");
const FRAME_TIME = 100;
const DINO_COUNT = 2;
const GRAVITY = 0.0015;
const JUMP_SPEED = 0.45;

let isJumping;
let currentFrameTime;
let dinoFrame;
let yVelocity;

export function setupDino() {
  isJumping = false;
  currentFrameTime = 0;
  dinoFrame = 0;
  yVelocity = JUMP_SPEED;
  setCustomProperty(dinoElement, "--bottom", 0);
  document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = `./imgs/dino-stationary.png`;
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_COUNT;
    dinoElement.src = `./imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(dinoElement, "--bottom", yVelocity * delta);
  if (getCustomProperty(dinoElement, "--bottom") <= 0) {
    setCustomProperty(dinoElement, "--bottom", 0);
    isJumping = false;
    return;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}

export function setDinoLose() {
  dinoElement.src = "./imgs/dino-lose.png";
}

export function getDinoRect() {
  return dinoElement.getBoundingClientRect();
}
