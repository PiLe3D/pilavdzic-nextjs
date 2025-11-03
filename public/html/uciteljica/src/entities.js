import { CONFIG } from './config.js';
import { STUDENT_EMOJI } from './data/students.js';

export class Ucenik {
    constructor(slot, meta) {
        this.id = meta.id;
        this.ime = meta.ime;
        this.tip = meta.tip;
        this.meta = meta;
        
        // Pozicija na osnovu slota (red, kolona)
        const row = Math.floor(slot / CONFIG.DESK_COLS);
        const col = slot % CONFIG.DESK_COLS;
        
        this.x = 36 + col * CONFIG.DESK_SPACING_X;
        this.y = CONFIG.DESK_START_Y + row * CONFIG.DESK_SPACING_Y;
        
        // State machine
        this.state = 'mirno';
        this.timer = this.randomTimer(2, 5);
        this.calmTimer = 0;
        
        // Animacija
        this.bobOffset = Math.random() * Math.PI * 2;
        this.warningPulse = 0;
        
        // Broj nestašluka
        this.nestaslukCount = 0;
    }
    
    randomTimer(min, max) {
        return min + Math.random() * (max - min);
    }
    
    update(dt, onDiscChange) {
        this.timer -= dt;
        this.bobOffset += dt * 2;
        
        // Calm buff
        if (this.calmTimer > 0) {
            this.calmTimer -= dt;
            if (this.calmTimer <= 0) {
                this.state = 'mirno';
                this.timer = this.randomTimer(3, 6);
            }
            return;
        }
        
        // State transitions
        switch (this.state) {
            case 'mirno':
                if (this.timer <= 0) {
                    // Šansa za nestašluk bazirana na meta podacima
                    const chance = this.meta.nestasluk_baza + 
                                   (Math.random() - 0.5) * this.meta.nestasluk_var;
                    
                    if (Math.random() < chance) {
                        this.state = 'nestasluk_priprema';
                        this.timer = CONFIG.NESTASLUK_PRIPREMA_TIME;
                        this.warningPulse = 0;
                    } else {
                        this.timer = this.randomTimer(2, 5);
                    }
                }
                break;
                
            case 'nestasluk_priprema':
                this.warningPulse += dt * 5;
                if (this.timer <= 0) {
                    this.state = 'nestasluk_aktivan';
                    this.timer = this.randomTimer(4, 7);
                    this.nestaslukCount++;
                }
                break;
                
            case 'nestasluk_aktivan':
                onDiscChange(CONFIG.DISCIPLINA_LOSS_ACTIVE * dt);
                if (this.timer <= 0) {
                    // Samo završava prirodno ako nije zaustavljen
                    this.state = 'mirno';
                    this.timer = this.randomTimer(3, 6);
                }
                break;
        }
    }
    
    calm(actionType) {
        const action = CONFIG.ACTIONS[actionType];
        this.state = 'umiren';
        this.calmTimer = action.calmTime;
        this.timer = 0;
        this.warningPulse = 0;
    }
    
    getBounds() {
        return {
            x: this.x - 24,
            y: this.y - 24,
            w: 48,
            h: 48
        };
    }
    
    draw(ctx) {
        const bounds = this.getBounds();
        const bob = Math.sin(this.bobOffset) * 2;
        
        // Klupa
        ctx.fillStyle = CONFIG.COLORS.desk;
        ctx.fillRect(bounds.x, bounds.y + 20, bounds.w, 28);
        
        // Učenik (krug s emoji)
        ctx.save();
        ctx.translate(this.x, this.y + bob);
        
        // State vizualizacija
        let circleColor = this.meta.boja;
        let glowColor = null;
        
        if (this.state === 'nestasluk_priprema') {
            const pulse = Math.sin(this.warningPulse) * 0.5 + 0.5;
            glowColor = `rgba(243, 156, 18, ${pulse * 0.8})`;
        } else if (this.state === 'nestasluk_aktivan') {
            glowColor = 'rgba(231, 76, 60, 0.6)';
        } else if (this.calmTimer > 0) {
            glowColor = 'rgba(46, 204, 113, 0.5)';
        }
        
        // Glow effect
        if (glowColor) {
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 20;
        }
        
        // Glavni krug
        ctx.fillStyle = circleColor;
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        // Border
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Emoji
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(STUDENT_EMOJI[this.tip] || '😊', 0, 0);
        
        ctx.restore();
        
        // Warning ikonica
        if (this.state === 'nestasluk_priprema') {
            const pulse = Math.sin(this.warningPulse) * 0.3 + 0.7;
            ctx.font = `${16 * pulse}px Arial`;
            ctx.textAlign = 'center';
            ctx.fillText('⚠️', this.x, this.y - 30);
        }
        
        // Active indicator
        if (this.state === 'nestasluk_aktivan') {
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('💥', this.x, this.y - 30);
        }
        
        // Ime (mali tekst)
        ctx.font = '10px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(this.ime, this.x, this.y + 40);
    }
}
