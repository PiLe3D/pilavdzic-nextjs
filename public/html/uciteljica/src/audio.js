export class AudioManager {
    constructor() {
        this.context = null;
        this.sounds = {};
        this.enabled = false;
        this.unlocked = false;
    }
    
    async init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            
            // Generiši jednostavne zvukove proceduralno
            await this.createSounds();
            
            return true;
        } catch (e) {
            console.warn('Audio not available:', e);
            return false;
        }
    }
    
    async createSounds() {
        // TAP zvuk
        this.sounds.tap = await this.createTone(800, 0.05, 'square');
        
        // DING zvuk (uspjeh)
        this.sounds.ding = await this.createTone(1200, 0.1, 'sine');
        
        // UH-OH zvuk (nestašluk)
        this.sounds.uhoh = await this.createTone(300, 0.15, 'sawtooth');
        
        // BELL zvuk (game over)
        this.sounds.bell = await this.createMultiTone([800, 600], 0.3);
    }
    
    async createTone(frequency, duration, type = 'sine') {
        const sampleRate = this.context.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const envelope = Math.max(0, 1 - (i / length));
            
            if (type === 'sine') {
                data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
            } else if (type === 'square') {
                data[i] = (Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1) * envelope * 0.2;
            } else if (type === 'sawtooth') {
                data[i] = (2 * (t * frequency % 1) - 1) * envelope * 0.25;
            }
        }
        
        return buffer;
    }
    
    async createMultiTone(frequencies, duration) {
        const sampleRate = this.context.sampleRate;
        const length = sampleRate * duration;
        const buffer = this.context.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const envelope = Math.max(0, 1 - (i / length));
            let sample = 0;
            
            frequencies.forEach(freq => {
                sample += Math.sin(2 * Math.PI * freq * t);
            });
            
            data[i] = (sample / frequencies.length) * envelope * 0.2;
        }
        
        return buffer;
    }
    
    unlock() {
        if (this.unlocked || !this.context) return;
        
        // Resume context on first user interaction
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        
        // Play silent sound to unlock
        const buffer = this.context.createBuffer(1, 1, this.context.sampleRate);
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start(0);
        
        this.unlocked = true;
        this.enabled = true;
    }
    
    play(soundName) {
        if (!this.enabled || !this.context || !this.sounds[soundName]) return;
        
        try {
            const source = this.context.createBufferSource();
            source.buffer = this.sounds[soundName];
            
            const gainNode = this.context.createGain();
            gainNode.gain.value = 0.5;
            
            source.connect(gainNode);
            gainNode.connect(this.context.destination);
            source.start(0);
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }
}
