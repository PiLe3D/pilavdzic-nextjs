import { CONFIG } from './config.js';
import { pointInRect, pointInCircle } from './input.js';

export class UI {
    constructor(scene) {
        this.scene = scene;
        this.radialMenu = null;
        this.miniGame = null;
        
        // Cooldown timeri
        this.cajCooldown = 0;
        this.direktorCooldown = 0;
        
        // HUD buttons bounds
        this.cajButton = { x: 20, y: 20, w: 80, h: 40 };
        this.direktorButton = { x: 260, y: 20, w: 80, h: 40 };
    }
    
    update(dt) {
        if (this.cajCooldown > 0) this.cajCooldown -= dt;
        if (this.direktorCooldown > 0) this.direktorCooldown -= dt;
        
        if (this.miniGame) {
            this.miniGame.timer -= dt;
            if (this.miniGame.timer <= 0) {
                // Timeout - zatvori mini-igru
                this.miniGame = null;
            }
        }
    }
    
    openRadialFor(ucenik) {
        this.radialMenu = {
            ucenik: ucenik,
            x: ucenik.x,
            y: ucenik.y,
            actions: ['upozori', 'smiri', 'zabavi']
        };
    }
    
    closeRadial() {
        this.radialMenu = null;
    }
    
    handleTap(x, y) {
        // Provjeri mini-igru prvo
        if (this.miniGame) {
            return this.handleMiniGameTap(x, y);
        }
        
        // Provjeri radijalni meni
        if (this.radialMenu) {
            return this.handleRadialTap(x, y);
        }
        
        // Provjeri HUD dugmad
        if (pointInRect(x, y, this.cajButton) && this.cajCooldown <= 0) {
            this.scene.usePowerup('caj');
            this.cajCooldown = CONFIG.POWERUPS.caj.cooldown;
            return true;
        }
        
        if (pointInRect(x, y, this.direktorButton) && this.direktorCooldown <= 0) {
            this.scene.usePowerup('direktor');
            this.direktorCooldown = CONFIG.POWERUPS.direktor.cooldown;
            return true;
        }
        
        return false;
    }
    
    handleRadialTap(x, y) {
        const menu = this.radialMenu;
        const radius = CONFIG.RADIAL_MENU_RADIUS;
        
        // Provjeri svaku akciju
        const angles = [0, 120, 240]; // 3 akcije raspoređene
        
        for (let i = 0; i < menu.actions.length; i++) {
            const angle = (angles[i] - 90) * Math.PI / 180;
            const btnX = menu.x + Math.cos(angle) * radius;
            const btnY = menu.y + Math.sin(angle) * radius;
            
            if (pointInCircle(x, y, btnX, btnY, 30)) {
                const actionType = menu.actions[i];
                
                // Zabavi otvara mini-igru
                if (actionType === 'zabavi') {
                    this.openMiniGame(menu.ucenik);
                } else {
                    this.scene.applyAction(menu.ucenik, actionType);
                }
                
                this.closeRadial();
                return true;
            }
        }
        
        // Tap van menija zatvara meni
        if (!pointInCircle(x, y, menu.x, menu.y, radius + 40)) {
            this.closeRadial();
            return true;
        }
        
        return false;
    }
    
    openMiniGame(ucenik) {
        // Generiši jednostavan račun
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = a + b;
        
        // Generiši 3 odgovora (1 tačan + 2 netačna)
        const answers = [correctAnswer];
        while (answers.length < 3) {
            const wrong = correctAnswer + Math.floor(Math.random() * 7) - 3;
            if (wrong !== correctAnswer && wrong > 0 && !answers.includes(wrong)) {
                answers.push(wrong);
            }
        }
        
        // Shuffluj odgovore
        answers.sort(() => Math.random() - 0.5);
        
        this.miniGame = {
            ucenik: ucenik,
            question: `${a} + ${b} = ?`,
            correctAnswer: correctAnswer,
            answers: answers,
            timer: 3.0
        };
    }
    
    handleMiniGameTap(x, y) {
        const game = this.miniGame;
        const startY = 250;
        const buttonHeight = 60;
        const gap = 10;
        
        for (let i = 0; i < game.answers.length; i++) {
            const btnY = startY + i * (buttonHeight + gap);
            const bounds = { x: 60, y: btnY, w: 240, h: buttonHeight };
            
            if (pointInRect(x, y, bounds)) {
                const isCorrect = game.answers[i] === game.correctAnswer;
                
                if (isCorrect) {
                    // Tačan odgovor
                    this.scene.applyAction(game.ucenik, 'zabavi', true);
                } else {
                    // Pogrešan - i dalje gasi učenika ali bez bonusa
                    this.scene.applyAction(game.ucenik, 'zabavi', false);
                }
                
                this.miniGame = null;
                return true;
            }
        }
        
        return false;
    }
    
    draw(ctx, state) {
        this.drawHUD(ctx, state);
        
        if (this.miniGame) {
            this.drawMiniGame(ctx);
        } else if (this.radialMenu) {
            this.drawRadialMenu(ctx);
        }
    }
    
    drawHUD(ctx, state) {
        // Pozadina HUD-a
        ctx.fillStyle = 'rgba(44, 62, 80, 0.9)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.HUD_HEIGHT);
        
        // Disciplina bar
        const discWidth = 100;
        const discX = CONFIG.CANVAS_WIDTH / 2 - discWidth / 2;
        const discY = 15;
        
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(discX, discY, discWidth, 20);
        
        const discPercent = state.disc / CONFIG.DISCIPLINA_MAX;
        ctx.fillStyle = discPercent > 0.5 ? CONFIG.COLORS.disciplina : 
                        discPercent > 0.25 ? '#F39C12' : '#E74C3C';
        ctx.fillRect(discX, discY, discWidth * discPercent, 20);
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(discX, discY, discWidth, 20);
        
        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('DISCIPLINA', discX + discWidth / 2, discY - 5);
        
        // Energija bar
        const engX = discX;
        const engY = 45;
        
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(engX, engY, discWidth, 15);
        
        const engPercent = state.eng / CONFIG.ENERGIJA_MAX;
        ctx.fillStyle = CONFIG.COLORS.energija;
        ctx.fillRect(engX, engY, discWidth * engPercent, 15);
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(engX, engY, discWidth, 15);
        
        ctx.font = '9px Arial';
        ctx.fillText('ENERGIJA', engX + discWidth / 2, engY - 3);
        
        // Timer
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = state.time < 10 ? '#E74C3C' : '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(Math.ceil(state.time), CONFIG.CANVAS_WIDTH - 40, 45);
        
        ctx.font = '10px Arial';
        ctx.fillText('vrijeme', CONFIG.CANVAS_WIDTH - 40, 60);
        
        // Skor
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#F39C12';
        ctx.textAlign = 'left';
        ctx.fillText(`${state.skor}`, 20, 60);
        
        // Čaj button
        this.drawButton(ctx, this.cajButton, '☕', this.cajCooldown);
        
        // Direktor button
        this.drawButton(ctx, this.direktorButton, '👔', this.direktorCooldown);
    }
    
    drawButton(ctx, bounds, emoji, cooldown) {
        const onCooldown = cooldown > 0;
        
        ctx.fillStyle = onCooldown ? 'rgba(100,100,100,0.5)' : 'rgba(52, 152, 219, 0.8)';
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
        
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
        
        if (onCooldown) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(Math.ceil(cooldown), bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
        }
    }
    
    drawRadialMenu(ctx) {
        const menu = this.radialMenu;
        const radius = CONFIG.RADIAL_MENU_RADIUS;
        
        // Zatamni pozadinu
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Centralni krug
        ctx.fillStyle = 'rgba(44, 62, 80, 0.8)';
        ctx.beginPath();
        ctx.arc(menu.x, menu.y, 35, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Akcije
        const angles = [0, 120, 240];
        const icons = ['⚠️', '💬', '⭐'];
        const labels = ['Upozori', 'Smiri', 'Zabavi'];
        const costs = [
            CONFIG.ACTIONS.upozori.cost,
            CONFIG.ACTIONS.smiri.cost,
            CONFIG.ACTIONS.zabavi.cost
        ];
        
        for (let i = 0; i < menu.actions.length; i++) {
            const angle = (angles[i] - 90) * Math.PI / 180;
            const btnX = menu.x + Math.cos(angle) * radius;
            const btnY = menu.y + Math.sin(angle) * radius;
            
            const canAfford = this.scene.energija >= costs[i];
            
            // Button
            ctx.fillStyle = canAfford ? 'rgba(52, 152, 219, 0.9)' : 'rgba(100,100,100,0.5)';
            ctx.beginPath();
            ctx.arc(btnX, btnY, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Icon
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(icons[i], btnX, btnY);
            
            // Label i cost
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = '#fff';
            ctx.fillText(labels[i], btnX, btnY + 45);
            ctx.font = '10px Arial';
            ctx.fillText(`-${costs[i]}⚡`, btnX, btnY + 58);
        }
    }
    
    drawMiniGame(ctx) {
        const game = this.miniGame;
        
        // Overlay
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Kartica
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fillRect(30, 150, 300, 350);
        
        ctx.strokeStyle = '#3498DB';
        ctx.lineWidth = 4;
        ctx.strokeRect(30, 150, 300, 350);
        
        // Naslov
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ Brzi Račun! ⚡', 180, 190);
        
        // Timer
        ctx.fillStyle = game.timer < 1 ? '#E74C3C' : '#F39C12';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(Math.ceil(game.timer), 180, 220);
        
        // Zadatak
        ctx.fillStyle = '#34495E';
        ctx.font = 'bold 32px Arial';
        ctx.fillText(game.question, 180, 270);
        
        // Odgovori
        const startY = 310;
        const buttonHeight = 50;
        const gap = 10;
        
        for (let i = 0; i < game.answers.length; i++) {
            const y = startY + i * (buttonHeight + gap);
            
            ctx.fillStyle = '#3498DB';
            ctx.fillRect(60, y, 240, buttonHeight);
            
            ctx.strokeStyle = '#2980B9';
            ctx.lineWidth = 2;
            ctx.strokeRect(60, y, 240, buttonHeight);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(game.answers[i], 180, y + buttonHeight / 2);
        }
    }
}
