import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import Raphael, { RaphaelElement, RaphaelPaper } from 'raphael';

type GameState = 'home' | 'playing' | 'paused' | 'gameOver';
@Component({
  selector: 'app-game-engine',
  template: `
    <div class="game-container">
      <!-- Playing Screen -->
      <div *ngIf="gameState === 'playing' || gameState === 'paused'" class="score-board">
        <span>🍕 Score: <strong>{{ score }}</strong></span>
      </div>

      <button *ngIf="gameState === 'playing'" class="pause-btn" (click)="togglePauseResume()" aria-label="Pause or Resume Game">
        <i class="fas fa-pause"></i>
      </button>

      <!-- Paused Screen -->
      <div class="popup paused" *ngIf="gameState === 'paused'" (click)="togglePauseResume()">
        <h2>
          Resume
          <i class="fas fa-play"></i>
        </h2>
      </div>

      <!-- Home Screen -->
      <div class="popup" *ngIf="gameState === 'home'">
        <h4 *ngIf="!showInstructions" class="game-title">
          <span class="title-highlight">Welcome to Emoji War</span>!
        </h4>
        <div *ngIf="!showInstructions" class="avatar-picker">
          <p>Select Your Avatar:</p>
          <div class="avatar-grid">
            <img
              *ngFor="let avatar of avatarImages"
              [src]="avatar"
              [class.avatar-selected]="avatar === config.player.image"
              class="avatar-item"
              (click)="selectAvatar(avatar)"
            />
          </div>
        </div>
        <div *ngIf="!showInstructions" class="button-group">
          <button class="primary-btn" (click)="startGame()">Play</button>
          <button class="primary-btn" (click)="toggleInstructions()">Instructions</button>
        </div>
        <!-- Instructions Screen -->
        <div *ngIf="showInstructions" class="instructions-section">
          <div class="instruction">
            <img class="instruction-icon" [src]="config.obstacle.image" alt="Obstacle Emoji" />
            <p><strong>Avoid Enemy Emojis</strong> to stay alive!</p>
          </div>
          <div class="instruction">
            <img class="instruction-icon" [src]="config.food.images[0]" alt="Food Item" />
            <p><strong>Collect Food Items</strong> to increase your score!</p>
          </div>
          <div class="instruction">
            <img class="instruction-icon" src="images/cursors/default2.svg" alt="Mouse Cursor" />
            <p><strong>Use Your Mouse</strong> to guide your character.</p>
          </div>
          <div class="instruction">
            <img class="instruction-icon" src="images/cursors/pause.svg" alt="Pause Icon" />
            <p><strong>Double-Click</strong> to pause the game.</p>
          </div>
        </div>
        <button *ngIf="showInstructions" class="primary-btn" (click)="toggleInstructions()">Got it! 🚀</button>
      </div>

      <!-- Game Over Screen -->
      <div class="popup" *ngIf="gameState === 'gameOver'">
        <h4>Game Over</h4>
        <h3>Your Score</h3>
        <h1 class="score">{{ score }}</h1>
        <p>Would you like to play again?</p>
        <button class="primary-btn" (click)="resetGame()">Play Again</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }
      .game-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        cursor: url('/images/cursors/default.svg'), auto;
      }

      .score-board {
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 16px;
        z-index: 1000;
      }

      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff0088, rgb(17 191 231));
        color: #ffffff;
        width: 350px;
        height: 420px;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .popup.paused {
        height: 90px;
      }

      .popup h2,
      .popup h3 {
        margin: 0;
      }

      .popup h3 {
        font-size: 1.2rem;
      }
      .popup .score {
        font-size: 8rem;
        margin-top: 4rem;
      }
      .pause-btn {
        background: linear-gradient(45deg, #ff0088, rgb(17 191 231));
        position: fixed;
        bottom: 35px;
        right: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out;
      }

      .pause-btn i {
        font-size: 20px;
        color: #ffffff;
      }
      .game-title {
        font-size: 24px;
        margin-bottom: 15px;
      }

      .title-highlight {
        font-weight: bold;
        color: #ffffff;
      }
      .avatar-picker {
        margin: 20px 0;
      }

      .avatar-grid {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .avatar-item {
        width: 60px;
        height: 60px;
        border: 8px solid transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.3s, border-color 0.3s;
      }

      .avatar-item:hover {
        transform: scale(1.1);
        border-color: #ffffff;
        cursor: url('/images/cursors/pointer.svg'), auto;
      }

      .avatar-selected {
        border-color: #ffffff;
      }
      .button-group {
        display: flex;
        gap: 10px;
      }

      .primary-btn {
        width: 100%;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: bold;
        color: #000000;
        border: 2px solid #b2dfdb;
        border-radius: 8px;
        cursor: pointer;
        background: #ffffff;
        transition: all 0.3s ease-in-out;
      }

      .primary-btn:hover {
        transform: translateY(-2px);
      }

      .instructions-section {
        margin-top: 20px;
      }

      .instruction {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;
      }

      .instruction-icon {
        width: 45px;
        height: 45px;
        padding: 5px;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .instruction p {
        font-size: 16px;
        text-align: left;
      }

      button:hover {
        cursor: url('/images/cursors/pointer.svg'), auto;
      }
    `,
  ],
})
export class GameEngineComponent implements OnInit {

  public avatarImages: string[] = [
    'images/utils/actors/cool.svg',
    'images/utils/actors/happy.svg',
    'images/utils/actors/inlove.svg',
    'images/utils/actors/kiss.svg',
    'images/utils/actors/kiss2.svg',
    'images/utils/actors/nerd.svg',
    'images/utils/actors/ninja.svg',
  ];
  public gameState: GameState = 'home';
  public showInstructions = false;
  public toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
  private paper!: RaphaelPaper;
  private player!: RaphaelElement;
  private movementInterval!: number;
  private devil!: any;

  public score = 0;
  private foodItems: { element: RaphaelElement; x: number; y: number; radius: number }[] = [];
  private obstacles: { element: RaphaelElement; x: number; y: number; velocity: { x: number; y: number } }[] = [];

  private playerPosition = { x: 1000, y: 1000 };
  private velocity = { x: 0, y: 0 };

  private viewportWidth = window.innerWidth;
  private viewportHeight = window.innerHeight;

  public config: any = {
    player: {
      image: 'images/utils/actors/ninja.svg',
      size: 50,
      speed: 3,
    },
    obstacle: {
      image: 'images/utils/actors/enemy.svg',
      size: 70,
      speed: 1.5,
    },
    devil: {
      image: 'images/utils/actors/devil.svg',
      size: 30,
      speed: 1,
    },
    devilEnabled: true,
    food: {
      images: ['images/utils/foods/orange.svg', 'images/utils/foods/food-apples.svg', 'images/utils/foods/apples-food.svg', 'images/utils/foods/blueberry.svg', 'images/utils/foods/pine-apple.svg'],
      size: 25,
    },
    grid: {
      size: 2000,
      gridSpacing: 50,
    },
    sounds: {
      eat: 'sounds/eat.mp3',
      gameOver: 'sounds/wrong.mp3',
      spawn: 'sounds/spawn.mp3',
    },
  };

  private audioElements: { [key: string]: HTMLAudioElement } = {};

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.loadSounds();
    this.initializeCanvas();
    this.drawGrid();
  }
  selectAvatar(imageUrl: string) {
    this.config.player.image = imageUrl;
  }
  private initGame(): void {
    this.createPlayer();
    this.playSound('spawn');
    this.fillFoodStock();
    this.spawnObstacles();
    if (this.config.devilEnabled) {
      this.spawnDevil();
    }
    this.startMovement();
    this.updateView();
    this.score = 0;
  }
  startGame() {
    this.initGame()
    this.gameState = 'playing'
  }
  private loadSounds(): void {
    Object.keys(this.config.sounds).forEach(key => {
      const soundPath = this.config.sounds[key];
      const audio = new Audio(soundPath);
      this.audioElements[key] = audio;
    });
  }
  public togglePauseResume(): void {
    if (this.gameState == 'playing') {
      this.gameState = 'paused';
      this.pauseGame();
    } else {
      this.gameState = 'playing';
      this.resumeGame();
    }
  }
  private pauseGame(): void {
    clearInterval(this.movementInterval);
  }

  private resumeGame(): void {
    this.startMovement();
  }
  private playSound(soundKey: string): void {
    const sound = this.audioElements[soundKey];
    if (sound) {
      sound.play();
    }
  }

  private initializeCanvas(): void {
    const container = this.elRef.nativeElement.querySelector('.game-container');
    container.style.width = `${this.viewportWidth}px`;
    container.style.height = `${this.viewportHeight}px`;
    this.paper = Raphael(container, this.config.grid.size, this.config.grid.size);
  }

  private drawGrid(): void {
    const { size, gridSpacing } = this.config.grid;
    const strokeColor = '#e0e0e0';
    for (let y = 0; y <= size; y += gridSpacing) {
      this.paper.path(`M0,${y}L${size},${y}`).attr({ stroke: strokeColor, 'stroke-width': 1 });
    }
    for (let x = 0; x <= size; x += gridSpacing) {
      this.paper.path(`M${x},0L${x},${size}`).attr({ stroke: strokeColor, 'stroke-width': 1 });
    }
  }

  private createPlayer(): void {
    const { x, y } = this.playerPosition;
    const { image, size } = this.config.player;
    this.player = this.paper.image(image, x - size / 2, y - size / 2, size, size);
  }

  private fillFoodStock(): void {
    while (this.foodItems.length < 50) {
      this.spawnFood();
    }
  }

  private spawnFood(): void {
    let x, y, validPosition;
    const radius = this.config.food.size;

    const foodImages = this.config.food.images;
    const foodImage = foodImages[Math.floor(Math.random() * foodImages.length)];

    do {
      x = Math.random() * this.config.grid.size;
      y = Math.random() * this.config.grid.size;

      // Check if food spawns too close to the player or enemies
      validPosition = this.checkSafeSpawn(x, y, radius);
    } while (!validPosition);

    const element = this.paper.image(foodImage, x - radius, y - radius, radius * 2, radius * 2);

    this.foodItems.push({ element, x, y, radius });
  }


  private spawnDevil(): void {
    const { image, size, speed } = this.config.devil;

    let x, y, validPosition;

    do {
      x = Math.random() * this.config.grid.size;
      y = Math.random() * this.config.grid.size;

      // Check if devil spawns too close to the player
      validPosition = this.checkSafeSpawn(x, y, size / 2);
    } while (!validPosition);

    this.devil = this.paper.image(image, x - size / 2, y - size / 2, size, size);

    this.devil.x = x;
    this.devil.y = y;

    this.moveDevilTowardsPlayer();
  }

  private spawnObstacles(): void {
    const { size, image, speed } = this.config.obstacle;

    for (let i = 0; i < 10; i++) {
      let x, y, validPosition;

      do {
        x = Math.random() * this.config.grid.size;
        y = Math.random() * this.config.grid.size;

        // Check if obstacle spawns too close to the player or other obstacles
        validPosition = this.checkSafeSpawn(x, y, size / 2);
      } while (!validPosition);

      const obstacle = this.paper.image(image, x - size / 2, y - size / 2, size, size);
      const velocity = { x: Math.random() * speed * 2 - speed, y: Math.random() * speed * 2 - speed };

      this.obstacles.push({ element: obstacle, x, y, velocity });
    }
  }
  private checkSafeSpawn(x: number, y: number, radius: number): boolean {
    const { x: playerX, y: playerY } = this.playerPosition;
    const playerRadius = this.config.player.size / 2;

    // Check distance from player
    const playerDistance = Math.sqrt((x - playerX) ** 2 + (y - playerY) ** 2);
    if (playerDistance < radius + playerRadius + 10) {
      return false;
    }

    // Check distance from other obstacles
    for (const obstacle of this.obstacles) {
      const obstacleDistance = Math.sqrt((x - obstacle.x) ** 2 + (y - obstacle.y) ** 2);
      if (obstacleDistance < radius + this.config.obstacle.size / 2 + 10) {
        return false;
      }
    }

    // Check distance from food items
    for (const food of this.foodItems) {
      const foodDistance = Math.sqrt((x - food.x) ** 2 + (y - food.y) ** 2);
      if (foodDistance < radius + food.radius + 10) {
        return false;
      }
    }

    return true;
  }


  private movePlayer(): void {
    const { size } = this.config.player;
    const gridSize = this.config.grid.size;

    this.playerPosition.x = Math.min(Math.max(this.playerPosition.x + this.velocity.x, size / 2), gridSize - size / 2);
    this.playerPosition.y = Math.min(Math.max(this.playerPosition.y + this.velocity.y, size / 2), gridSize - size / 2);

    this.player.attr({
      x: this.playerPosition.x - size / 2,
      y: this.playerPosition.y - size / 2,
    });

    this.checkCollisions();
    this.updateView();
  }

  private checkCollisions(): void {
    let initLength = this.foodItems.length;
    this.foodItems = this.foodItems.filter(({ element, x, y, radius }) => {
      const dx = x - this.playerPosition.x;
      const dy = y - this.playerPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.config.player.size / 2 + radius) {
        this.playEatAnimation(x, y, radius);
        element.remove();
        this.score++;
        this.playSound('eat');
        return false;
      }
      return true;
    });
    if (this.foodItems.length != initLength) {
      this.fillFoodStock();
    }
    this.obstacles.forEach(({ element, x, y }) => {
      const dx = x - this.playerPosition.x;
      const dy = y - this.playerPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.config.player.size / 2 + this.config.obstacle.size / 2) {
        this.handleObstacleCollision();
      }
    });
  }

  private handleObstacleCollision(): void {
    this.gameState = 'gameOver';
    this.playSound('gameOver');
  }
  private cleanUpElements(): void {
    if (this.player) {
      this.player.remove();
    }
    if (this.devil) {
      this.devil.remove();
    }
    this.foodItems.forEach(food => food.element.remove());
    this.foodItems = [];
    this.obstacles.forEach(obstacle => obstacle.element.remove());
    this.obstacles = [];
  }
  public resetGame(): void {
    this.stopMovement();
    this.cleanUpElements();
    this.initGame();
    this.gameState = 'playing';
  }
  private stopMovement(): void {
    clearInterval(this.movementInterval);
  }
  private playEatAnimation(x: number, y: number, radius: number): void {
    for (let i = 0; i < 12; i++) {
      const dotX = x + Math.random() * radius * 2 - radius;
      const dotY = y + Math.random() * radius * 2 - radius;

      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

      const dot: any = this.paper.circle(dotX, dotY, 2).attr({
        fill: randomColor,
        stroke: randomColor,
        opacity: 1,
      });

      dot.animate({ opacity: 0, r: 0 }, 500, () => dot.remove());
    }
  }

  private updateView(): void {
    const container = this.elRef.nativeElement.querySelector('.game-container');
    container.scrollLeft = this.playerPosition.x - this.viewportWidth / 2;
    container.scrollTop = this.playerPosition.y - this.viewportHeight / 2;
  }

  private startMovement(): void {
    this.movementInterval = window.setInterval(() => {
      if (this.gameState == 'playing') {
        this.movePlayer();
        this.moveObstacles();
        this.moveDevilTowardsPlayer()
      }
    }, 16); // ~60fps
  }

  private moveObstacles(): void {
    const { size } = this.config.obstacle;

    this.obstacles.forEach((obstacle) => {
      obstacle.x += obstacle.velocity.x;
      obstacle.y += obstacle.velocity.y;

      if (obstacle.x < 0 || obstacle.x > this.config.grid.size) {
        obstacle.velocity.x *= -1;
      }
      if (obstacle.y < 0 || obstacle.y > this.config.grid.size) {
        obstacle.velocity.y *= -1;
      }

      obstacle.element.attr({
        x: obstacle.x - size / 2,
        y: obstacle.y - size / 2,
      });
    });
  }
  private moveDevilTowardsPlayer(): void {
    if (!this.config.devilEnabled) return;

      const { size, speed } = this.config.devil;
      const dx = this.playerPosition.x - this.devil.x;
      const dy = this.playerPosition.y - this.devil.y;
      const magnitude = Math.sqrt(dx * dx + dy * dy);

      const moveX = (dx / magnitude) * speed;
      const moveY = (dy / magnitude) * speed;

      this.devil.x += moveX;
      this.devil.y += moveY;

      this.devil.attr({
        x: this.devil.x - size / 2,
        y: this.devil.y - size / 2,
      });

      this.checkDevilCollision();
  }
    private checkDevilCollision(): void {
      const dx = this.devil.x - this.playerPosition.x;
      const dy = this.devil.y - this.playerPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.config.player.size / 2 + this.config.devil.size / 2) {
        this.handleObstacleCollision();
      }
    }

  @HostListener('mousemove', ['$event'])
  handleMouseMove(event: MouseEvent): void {
    const container = this.elRef.nativeElement.querySelector('.game-container') as HTMLElement;
    const rect = container.getBoundingClientRect();

    const relativeX = event.clientX - rect.left + container.scrollLeft;
    const relativeY = event.clientY - rect.top + container.scrollTop;

    const dx = relativeX - this.playerPosition.x;
    const dy = relativeY - this.playerPosition.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);

    const { speed } = this.config.player;
    this.velocity.x = (dx / magnitude || 0) * speed;
    this.velocity.y = (dy / magnitude || 0) * speed;
  }


}
