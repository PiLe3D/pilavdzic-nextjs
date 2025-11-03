import { CONFIG } from './config.js';
import { AudioManager } from './audio.js';
import { InputManager } from './input.js';
import { MenuScene } from './scenes.js';

export class Game {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.logicalWidth = options.width;
        this.logicalHeight = options.height;
        
        // Postavi canvas rezoluciju
        this.setupCanvas();
        
        // Managers
        this.audio = new AudioManager();
        this.input = null;
        
        // Game state
        this.scene = null;
        this.running = false;
        this.lastTime = 0;
        
        // FPS tracking
        this.fps = 60;
        this.frameCount = 0;
        this.fpsTime = 0;
        
        // Bind window resize
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        // Set logical resolution
        this.canvas.width = this.logicalWidth;
        this.canvas.height = this.logicalHeight;
        
        // Calculate scale to fit screen
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const scaleX = windowWidth / this.logicalWidth;
        const scaleY = windowHeight / this.logicalHeight;
        const scale = Math.min(scaleX, scaleY);
        
        // Apply CSS scaling
        this.canvas.style.width = `${this.logicalWidth * scale}px`;
        this.canvas.style.height = `${this.logicalHeight * scale}px`;
        
        // Enable image smoothing for better quality
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }
    
    async start() {
        console.log('🎮 Starting game...');
        
        // Inicijaliziraj audio
        await this.audio.init();
        
        // Setup input nakon što je canvas postavljen
        this.input = new InputManager(this.canvas, this);
        
        // Počni sa menu scenom
        this.setScene(new MenuScene(this));
        
        // Pokreni game loop
        this.running = true;
        this.lastTime = performance.now();
        this.loop();
        
        console.log('✅ Game started!');
    }
    
    loop() {
        if (!this.running) return;
        
        const currentTime = performance.now();
        const deltaTime = Math.min(0.033, (currentTime - this.lastTime) / 1000);
        this.lastTime = currentTime;
        
        // Update FPS
        this.frameCount++;
        this.fpsTime += deltaTime;
        if (this.fpsTime >= 1.0) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsTime = 0;
        }
        
        // Update scene
        if (this.scene) {
            this.scene.update(deltaTime);
        }
        
        // Clear and draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.scene) {
            this.scene.draw(this.ctx);
        }
        
        // Draw FPS (debug)
        if (false) { // Set to true za debug
            this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
            this.ctx.fillRect(5, 5, 60, 20);
            this.ctx.fillStyle = '#0F0';
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`FPS: ${this.fps}`, 10, 18);
        }
        
        // Next frame
        requestAnimationFrame(() => this.loop());
    }
    
    setScene(scene) {
        this.scene = scene;
    }
    
    onTap(x, y) {
        // Unlock audio na prvi tap
        if (!this.audio.unlocked) {
            this.audio.unlock();
        }
        
        // Proslijedi tap trenutnoj sceni
        if (this.scene && this.scene.handleTap) {
            this.scene.handleTap(x, y);
        }
    }
    
    stop() {
        this.running = false;
    }
}
