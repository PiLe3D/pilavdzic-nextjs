export const CONFIG = {
    CANVAS_WIDTH: 360,
    CANVAS_HEIGHT: 640,
    
    // Akcije
    ACTIONS: {
        upozori: { cost: 8, gain: 6, calmTime: 4, label: "⚠️ Upozori" },
        smiri: { cost: 15, gain: 12, calmTime: 8, label: "💬 Smiri" },
        zabavi: { cost: 22, gain: 18, calmTime: 10, label: "⭐ Zabavi" }
    },
    
    // HUD Power-upi
    POWERUPS: {
        caj: { energyGain: 30, cooldown: 20, label: "☕ Čaj" },
        direktor: { discGain: 15, cooldown: 30, label: "👔 Direktor" }
    },
    
    // Gameplay konstante
    DISCIPLINA_MAX: 100,
    ENERGIJA_MAX: 100,
    ENERGIJA_REGEN: 1.0, // po sekundi
    DISCIPLINA_LOSS_ACTIVE: -0.2, // po sekundi kad je učenik aktivan
    
    // Timing
    NESTASLUK_PRIPREMA_TIME: 3,
    
    // UI
    HUD_HEIGHT: 80,
    RADIAL_MENU_RADIUS: 80,
    BUTTON_SIZE: 60,
    
    // Pozicije klupa (2 reda)
    DESK_ROWS: 2,
    DESK_COLS: 5,
    DESK_START_Y: 180,
    DESK_SPACING_Y: 150,
    DESK_SPACING_X: 72,
    
    // Boje
    COLORS: {
        bg: '#E8F4F8',
        board: '#2C3E50',
        desk: '#8B4513',
        teacher: '#FF6B9D',
        disciplina: '#E74C3C',
        energija: '#3498DB',
        warning: '#F39C12',
        calm: '#2ECC71'
    }
};
