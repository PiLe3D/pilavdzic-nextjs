import { CONFIG } from './config.js';
import { LEVELS, THRESHOLDS } from './data/levels.js';
import { STUDENTS } from './data/students.js';
import { Ucenik } from './entities.js';
import { UI } from './ui.js';
import { pointInRect } from './input.js';

export class MenuScene {
    constructor(game) {
        this.game = game;
        this.startButton = { x: 80, y: 400, w: 200, h: 60 };
    }
    
    handleTap(x, y) {
        if (pointInRect(x, y, this.startButton)) {
            this.game.audio.play('tap');
            this.game.setScene(new PlayScene(this.game, 0));
        }
    }
    
    update(dt) {}
    
    draw(ctx) {
        // Pozadina
        ctx.fillStyle = CONFIG.COLORS.bg;
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Naslov
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Učiteljica', 180, 200);
        ctx.fillText('u Panici!', 180, 240);
        
        // Emoji
        ctx.font = '64px Arial';
        ctx.fillText('👩‍🏫', 180, 320);
        
        // Start button
        ctx.fillStyle = '#3498DB';
        ctx.fillRect(this.startButton.x, this.startButton.y, 
                     this.startButton.w, this.startButton.h);
        
        ctx.strokeStyle = '#2980B9';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.startButton.x, this.startButton.y, 
                       this.startButton.w, this.startButton.h);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('POČNI', this.startButton.x + this.startButton.w / 2,
                     this.startButton.y + this.startButton.h / 2);
        
        // Info
        ctx.fillStyle = '#7F8C8D';
        ctx.font = '14px Arial';
        ctx.fillText('Održavaj red u razredu!', 180, 520);
        ctx.fillText('Tapni učenike da ih smiriš', 180, 540);
    }
}

export class PlayScene {
    constructor(game, levelIndex) {
        this.game = game;
        this.level = LEVELS[levelIndex];
        this.levelIndex = levelIndex;
        
        // Game state
        this.time = this.level.trajanje;
        this.disciplina = 80;
        this.energija = 70;
        this.skor = 0;
        this.combo = 0;
        
        // Spawn učenika
        this.ucenici = this.spawnStudents();
        
        // UI
        this.ui = new UI(this);
        
        // Particles za feedback
        this.particles = [];
    }
    
    spawnStudents() {
        const students = [];
        const count = Math.min(this.level.broj_ucenika, 10);
        
        // Uzmi random učenike
        const shuffled = [...STUDENTS].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < count; i++) {
            students.push(new Ucenik(i, shuffled[i % STUDENTS.length]));
        }
        
        return students;
    }
    
    handleTap(x, y) {
        // Prvo provjeri UI
        if (this.ui.handleTap(x, y)) {
            this.game.audio.play('tap');
            return;
        }
        
        // Provjeri učenike
        for (const u of this.ucenici) {
            const bounds = u.getBounds();
            if (pointInRect(x, y, bounds)) {
                this.ui.openRadialFor(u);
                this.game.audio.play('tap');
                return;
            }
        }
        
        // Zatvori meni ako je otvoren
        if (this.ui.radialMenu) {
            this.ui.closeRadial();
        }
    }
    
    applyAction(ucenik, actionType, miniGameSuccess = true) {
        const action = CONFIG.ACTIONS[actionType];
        
        // Provjeri cost
        if (this.energija < action.cost) {
            return;
        }
        
        // Primijeni akciju
        this.energija -= action.cost;
        
        let gain = action.gain;
        
        // Mini-igra bonus
        if (actionType === 'zabavi') {
            gain = miniGameSuccess ? action.gain : action.gain * 0.5;
        }
        
        this.disciplina = Math.min(CONFIG.DISCIPLINA_MAX, this.disciplina + gain);
        ucenik.calm(actionType);
        
        // Skor i combo
        this.combo++;
        this.skor += 10 * this.combo;
        
        // Feedback
        this.game.audio.play('ding');
        this.spawnParticle(ucenik.x, ucenik.y, `+${Math.floor(gain)}`, '#2ECC71');
    }
    
    usePowerup(type) {
        if (type === 'caj') {
            this.energija = Math.min(CONFIG.ENERGIJA_MAX, 
                                     this.energija + CONFIG.POWERUPS.caj.energyGain);
            this.spawnParticle(180, 100, '+30⚡', '#3498DB');
            this.game.audio.play('ding');
        } else if (type === 'direktor') {
            // Zaustavi sve aktivne nestašluke
            for (const u of this.ucenici) {
                if (u.state === 'nestasluk_aktivan' || u.state === 'nestasluk_priprema') {
                    u.state = 'umiren';
                    u.calmTimer = 5;
                }
            }
            this.disciplina = Math.min(CONFIG.DISCIPLINA_MAX, 
                                       this.disciplina + CONFIG.POWERUPS.direktor.discGain);
            this.spawnParticle(180, 200, 'DIREKTOR!', '#F39C12');
            this.game.audio.play('bell');
        }
    }
    
    spawnParticle(x, y, text, color) {
        this.particles.push({
            x, y,
            text,
            color,
            life: 1.0,
            vy: -50
        });
    }
    
    update(dt) {
        this.time -= dt;
        
        // Win condition
        if (this.time <= 0 && this.disciplina > 0) {
            this.game.setScene(new ResultsScene(this.game, this.levelIndex, 
                                                this.skor, this.disciplina));
            return;
        }
        
        // Lose condition
        if (this.disciplina <= 0) {
            this.game.audio.play('bell');
            this.game.setScene(new GameOverScene(this.game, this.skor));
            return;
        }
        
        // Update učenika
        for (const u of this.ucenici) {
            const prevState = u.state;
            
            u.update(dt, (deltaDisc) => {
                this.disciplina = Math.max(0, Math.min(CONFIG.DISCIPLINA_MAX, 
                                                        this.disciplina + deltaDisc));
            });
            
            // Sound za nove nestašluke
            if (prevState === 'nestasluk_priprema' && u.state === 'nestasluk_aktivan') {
                this.game.audio.play('uhoh');
                this.combo = 0; // Reset combo na novi nestašluk
            }
        }
        
        // Energija regen
        this.energija = Math.min(CONFIG.ENERGIJA_MAX, 
                                 this.energija + CONFIG.ENERGIJA_REGEN * dt);
        
        // UI update
        this.ui.update(dt);
        
        // Particles update
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= dt * 1.5;
            p.y += p.vy * dt;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    draw(ctx) {
        // Pozadina
        ctx.fillStyle = CONFIG.COLORS.bg;
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Tabla
        ctx.fillStyle = CONFIG.COLORS.board;
        ctx.fillRect(20, 100, 320, 60);
        
        ctx.fillStyle = '#ECF0F1';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.level.naziv, 180, 135);
        
        // Učenici
        for (const u of this.ucenici) {
            u.draw(ctx);
        }
        
        // Učiteljica (jednostavan prikaz)
        ctx.fillStyle = CONFIG.COLORS.teacher;
        ctx.beginPath();
        ctx.arc(180, 580, 30, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👩‍🏫', 180, 580);
        
        // Particles
        for (const p of this.particles) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(p.text, p.x, p.y);
        }
        ctx.globalAlpha = 1;
        
        // UI na vrhu
        this.ui.draw(ctx, {
            disc: this.disciplina,
            eng: this.energija,
            time: this.time,
            skor: this.skor
        });
    }
}

export class ResultsScene {
    constructor(game, levelIndex, skor, finalDisc) {
        this.game = game;
        this.levelIndex = levelIndex;
        this.skor = skor;
        this.finalDisc = finalDisc;
        
        // Odredi medalju
        this.medal = this.getMedal();
        
        // Buttons
        this.nextButton = { x: 80, y: 450, w: 200, h: 60 };
        this.menuButton = { x: 80, y: 520, w: 200, h: 50 };
    }
    
    getMedal() {
        if (this.finalDisc >= THRESHOLDS.zlato.disciplina && 
            this.skor >= THRESHOLDS.zlato.skor) {
            return { name: 'Zlato', emoji: '🥇', color: '#F1C40F' };
        } else if (this.finalDisc >= THRESHOLDS.srebro.disciplina && 
                   this.skor >= THRESHOLDS.srebro.skor) {
            return { name: 'Srebro', emoji: '🥈', color: '#95A5A6' };
        } else if (this.finalDisc >= THRESHOLDS.bronza.disciplina && 
                   this.skor >= THRESHOLDS.bronza.skor) {
            return { name: 'Bronza', emoji: '🥉', color: '#CD7F32' };
        }
        return { name: 'Završeno', emoji: '✅', color: '#2ECC71' };
    }
    
    handleTap(x, y) {
        if (pointInRect(x, y, this.nextButton)) {
            this.game.audio.play('tap');
            const nextLevel = this.levelIndex + 1;
            if (nextLevel < LEVELS.length) {
                this.game.setScene(new PlayScene(this.game, nextLevel));
            } else {
                // Ponovi poslednji nivo ili idi na meni
                this.game.setScene(new MenuScene(this.game));
            }
        } else if (pointInRect(x, y, this.menuButton)) {
            this.game.audio.play('tap');
            this.game.setScene(new MenuScene(this.game));
        }
    }
    
    update(dt) {}
    
    draw(ctx) {
        // Pozadina
        ctx.fillStyle = CONFIG.COLORS.bg;
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Naslov
        ctx.fillStyle = '#2C3E50';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Čas Završen!', 180, 100);
        
        // Medalja
        ctx.font = '64px Arial';
        ctx.fillText(this.medal.emoji, 180, 180);
        
        ctx.fillStyle = this.medal.color;
        ctx.font = 'bold 24px Arial';
        ctx.fillText(this.medal.name, 180, 220);
        
        // Statistika
        ctx.fillStyle = '#34495E';
        ctx.font = '18px Arial';
        ctx.fillText(`Skor: ${this.skor}`, 180, 280);
        ctx.fillText(`Disciplina: ${Math.floor(this.finalDisc)}`, 180, 310);
        
        // Next button
        const hasNext = this.levelIndex + 1 < LEVELS.length;
        
        if (hasNext) {
            ctx.fillStyle = '#27AE60';
            ctx.fillRect(this.nextButton.x, this.nextButton.y, 
                         this.nextButton.w, this.nextButton.h);
            
            ctx.strokeStyle = '#229954';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.nextButton.x, this.nextButton.y, 
                           this.nextButton.w, this.nextButton.h);
            
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Sledeći Nivo', this.nextButton.x + this.nextButton.w / 2,
                         this.nextButton.y + this.nextButton.h / 2);
        }
        
        // Menu button
        ctx.fillStyle = '#3498DB';
        ctx.fillRect(this.menuButton.x, this.menuButton.y, 
                     this.menuButton.w, this.menuButton.h);
        
        ctx.strokeStyle = '#2980B9';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.menuButton.x, this.menuButton.y, 
                       this.menuButton.w, this.menuButton.h);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Meni', this.menuButton.x + this.menuButton.w / 2,
                     this.menuButton.y + this.menuButton.h / 2);
    }
}

export class GameOverScene {
    constructor(game, skor) {
        this.game = game;
        this.skor = skor;
        this.restartButton = { x: 80, y: 400, w: 200, h: 60 };
        this.menuButton = { x: 80, y: 480, w: 200, h: 50 };
    }
    
    handleTap(x, y) {
        if (pointInRect(x, y, this.restartButton)) {
            this.game.audio.play('tap');
            this.game.setScene(new PlayScene(this.game, 0));
        } else if (pointInRect(x, y, this.menuButton)) {
            this.game.audio.play('tap');
            this.game.setScene(new MenuScene(this.game));
        }
    }
    
    update(dt) {}
    
    draw(ctx) {
        // Pozadina
        ctx.fillStyle = '#34495E';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Naslov
        ctx.fillStyle = '#E74C3C';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', 180, 150);
        
        ctx.fillStyle = '#ECF0F1';
        ctx.font = '20px Arial';
        ctx.fillText('Disciplina pala na 0', 180, 200);
        
        // Emoji
        ctx.font = '64px Arial';
        ctx.fillText('😰', 180, 280);
        
        // Skor
        ctx.fillStyle = '#F39C12';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(`Finalni Skor: ${this.skor}`, 180, 340);
        
        // Restart button
        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(this.restartButton.x, this.restartButton.y, 
                     this.restartButton.w, this.restartButton.h);
        
        ctx.strokeStyle = '#C0392B';
        ctx.lineWidth = 3;
        ctx.strokeRect(this.restartButton.x, this.restartButton.y, 
                       this.restartButton.w, this.restartButton.h);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Pokušaj Ponovo', this.restartButton.x + this.restartButton.w / 2,
                     this.restartButton.y + this.restartButton.h / 2);
        
        // Menu button
        ctx.fillStyle = '#95A5A6';
        ctx.fillRect(this.menuButton.x, this.menuButton.y, 
                     this.menuButton.w, this.menuButton.h);
        
        ctx.strokeStyle = '#7F8C8D';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.menuButton.x, this.menuButton.y, 
                       this.menuButton.w, this.menuButton.h);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Meni', this.menuButton.x + this.menuButton.w / 2,
                     this.menuButton.y + this.menuButton.h / 2);
    }
}
