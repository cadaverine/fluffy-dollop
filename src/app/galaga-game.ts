// Логика игры Galaga вынесена в отдельный файл
import { RefObject } from "react";

export type GalagaGameOptions = {
  canvasRef: RefObject<HTMLCanvasElement>;
};

export function startGalagaGame({ canvasRef }: GalagaGameOptions) {
  const canvas = canvasRef.current;
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  let animationId: number;
  const W = 560, H = 320;
  type Ship = { x: number; y: number; w: number; h: number; dx: number };
  type Bullet = { x: number; y: number };
  type Enemy = { x: number; y: number; w: number; h: number; row: number; col: number; alive: boolean };
  let ship: Ship = { x: W / 2, y: H - 30, w: 32, h: 20, dx: 0 };
  let bullets: Bullet[] = [];
  // Несколько рядов инопланетян
  const ENEMY_ROWS = 4;
  const ENEMY_COLS = 10;
  const ENEMY_W = 32, ENEMY_H = 20;
  let enemies: Enemy[] = [];
  for (let row = 0; row < ENEMY_ROWS; row++) {
    for (let col = 0; col < ENEMY_COLS; col++) {
      enemies.push({
        x: 60 + col * 44,
        y: 40 + row * 36,
        w: ENEMY_W,
        h: ENEMY_H,
        row,
        col,
        alive: true,
      });
    }
  }
  let left = false, right = false, space = false, canShoot = true, score = 0;
  // Галерея движется шагами
  let enemyStep = 0;
  let enemyDir = 1; // 1 - вправо, -1 - влево
  let enemyMoveTick = 0;
  const ENEMY_MOVE_INTERVAL = 90; // было 18, теперь в 5 раз медленнее
  let wavePause = false;
  let wavePauseTimeout: number | null = null;

  function startNewWave() {
    enemies = [];
    for (let row = 0; row < ENEMY_ROWS; row++) {
      for (let col = 0; col < ENEMY_COLS; col++) {
        enemies.push({
          x: 60 + col * 44,
          y: 40 + row * 36,
          w: ENEMY_W,
          h: ENEMY_H,
          row,
          col,
          alive: true,
        });
      }
    }
    enemyDir = 1;
    enemyMoveTick = 0;
    wavePause = false;
  }

  function drawShip() {
    if (!ctx) return;
    ctx.fillStyle = '#7c3f00';
    ctx.fillRect(ship.x - ship.w / 2, ship.y, ship.w, ship.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(ship.x - 2, ship.y + 2, 4, 12);
  }
  function drawEnemies() {
    if (!ctx) return;
    enemies.forEach(e => {
      if (e.alive) {
        ctx.fillStyle = ['#a0522d', '#b8860b', '#8b0000', '#228b22'][e.row % 4];
        ctx.fillRect(e.x - e.w / 2, e.y, e.w, e.h);
        ctx.fillStyle = '#fff';
        ctx.fillRect(e.x - 8, e.y + 4, 16, 6);
      }
    });
  }
  function drawBullets() {
    if (!ctx) return;
    ctx.fillStyle = '#7c3f00';
    bullets.forEach((b: Bullet) => ctx.fillRect(b.x - 2, b.y, 4, 14));
  }
  function drawScore() {
    if (!ctx) return;
    ctx.font = 'bold 18px "Press Start 2P", monospace';
    ctx.fillStyle = '#7c3f00';
    ctx.fillText('SCORE: ' + score, 10, 24);
  }
  function update() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    // Ship
    if (left) ship.x -= 6;
    if (right) ship.x += 6;
    ship.x = Math.max(ship.w / 2, Math.min(W - ship.w / 2, ship.x));
    // Bullets
    bullets.forEach((b: Bullet) => b.y -= 12);
    bullets = bullets.filter((b: Bullet) => b.y > 0);
    // Enemies stepwise movement
    if (!wavePause) {
      enemyMoveTick++;
      if (enemyMoveTick >= ENEMY_MOVE_INTERVAL) {
        enemyMoveTick = 0;
        let edge = false;
        for (const e of enemies) {
          if (!e.alive) continue;
          if ((enemyDir === 1 && e.x + e.w / 2 + 16 > W) || (enemyDir === -1 && e.x - e.w / 2 - 16 < 0)) {
            edge = true;
            break;
          }
        }
        for (const e of enemies) {
          if (!e.alive) continue;
          e.x += enemyDir * 24;
          if (edge) e.y += 24;
        }
        if (edge) enemyDir *= -1;
      }
    }
    // Collisions
    bullets.forEach((b: Bullet) => {
      enemies.forEach(e => {
        if (e.alive && Math.abs(b.x - e.x) < ENEMY_W / 2 && Math.abs(b.y - e.y) < ENEMY_H / 2) {
          e.alive = false; b.y = -100; score += 10;
        }
      });
    });
    // Draw
    drawShip();
    drawEnemies();
    drawBullets();
    drawScore();
    // Проверка на конец волны
    if (!wavePause && enemies.every(e => !e.alive)) {
      wavePause = true;
      wavePauseTimeout = window.setTimeout(() => {
        startNewWave();
      }, 2000);
    }
    animationId = requestAnimationFrame(update);
  }
  function shoot() {
    if (canShoot) {
      bullets.push({ x: ship.x, y: ship.y });
      canShoot = false;
      setTimeout(() => canShoot = true, 250);
    }
  }
  function keydown(e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') left = true;
    if (e.code === 'ArrowRight') right = true;
    if (e.code === 'Space') {
      e.preventDefault();
      space = true;
    }
  }
  function keyup(e: KeyboardEvent) {
    if (e.code === 'ArrowLeft') left = false;
    if (e.code === 'ArrowRight') right = false;
    if (e.code === 'Space') {
      e.preventDefault();
      space = false; shoot();
    }
  }
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
  update();
  return () => {
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
    cancelAnimationFrame(animationId);
    if (wavePauseTimeout !== null) {
      clearTimeout(wavePauseTimeout);
    }
  };
}
