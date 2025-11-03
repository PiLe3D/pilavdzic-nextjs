export class InputManager {
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.touches = new Map();
        this.isDown = false;
        
        this.setupListeners();
    }
    
    setupListeners() {
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        this.canvas.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });
        
        // Mouse events (desktop fallback)
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }
    
    getCanvasCoordinates(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        
        for (let touch of e.changedTouches) {
            const pos = this.getCanvasCoordinates(touch.clientX, touch.clientY);
            this.touches.set(touch.identifier, pos);
            this.game.onTap(pos.x, pos.y);
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        
        for (let touch of e.changedTouches) {
            const pos = this.getCanvasCoordinates(touch.clientX, touch.clientY);
            this.touches.set(touch.identifier, pos);
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        
        for (let touch of e.changedTouches) {
            this.touches.delete(touch.identifier);
        }
    }
    
    handleMouseDown(e) {
        const pos = this.getCanvasCoordinates(e.clientX, e.clientY);
        this.isDown = true;
        this.game.onTap(pos.x, pos.y);
    }
    
    handleMouseMove(e) {
        if (!this.isDown) return;
        const pos = this.getCanvasCoordinates(e.clientX, e.clientY);
    }
    
    handleMouseUp(e) {
        this.isDown = false;
    }
}

export function pointInRect(px, py, rect) {
    return px >= rect.x && px <= rect.x + rect.w &&
           py >= rect.y && py <= rect.y + rect.h;
}

export function pointInCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= radius * radius;
}
