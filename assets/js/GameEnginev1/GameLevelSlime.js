import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

// ============================================================
//  GameLevelSlime — Alien Planet Level
//  Includes: background, player, 3 NPCs, barriers, dialogues
// ============================================================

class GameLevelSlime {
    constructor(gameEnv) {
        const path   = gameEnv.path;
        const width  = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        // ── Background ────────────────────────────────────────
        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/space_nebula.jpg", // updated background
            pixels: { height: 772, width: 1134 }
        };

        // ── Helper: build standard sprite directions ──────────
        // Keeps NPC definitions DRY — pass in total rows and it
        // returns a full direction map using the same column count.
        function buildDirections(rows = 8, columns = 3) {
            const r = (n) => Math.min(n, rows - 1);
            return {
                down:      { row: r(0), start: 0, columns },
                right:     { row: r(1), start: 0, columns },
                left:      { row: r(2), start: 0, columns },
                up:        { row: r(3), start: 0, columns },
                upRight:   { row: r(3), start: 0, columns },
                downRight: { row: r(1), start: 0, columns },
                upLeft:    { row: r(2), start: 0, columns },
                downLeft:  { row: r(0), start: 0, columns },
            };
        }

        // ── Player ────────────────────────────────────────────
        const playerData = {
            id: 'Rimuru',
            src: path + "/images/gamebuilder/sprites/player.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 40,
            INIT_POSITION: { x: width * 0.5, y: height * 0.6 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 8, columns: 11 },
            ...buildDirections(8, 3),
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            keypress: {
                up:    ['w', 'ArrowUp'],
                down:  ['s', 'ArrowDown'],
                left:  ['a', 'ArrowLeft'],
                right: ['d', 'ArrowRight'],
            }
        };

        // ── NPC 1: Veldora ────────────────────────────────────
        const npcVeldora = {
            id: 'Veldora',
            greeting: 'WHY HELLO THERE MY FRIEND RIMURU!',
            src: path + "/images/gamebuilder/sprites/astro.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width * 0.24, y: height * 0.16 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 8, columns: 11 },
            ...buildDirections(8, 3),
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: [
                'WHY HELLO THERE MY FRIEND RIMURU!',
                'I have been waiting for your arrival, slime.',
                'Together we shall conquer this alien world!',
                'Have you mastered your new abilities yet?',
                'The stars themselves tremble at our power!',
            ],
            reaction: function () {
                if (this.dialogueSystem) { this.showReactionDialogue(); }
                else { console.log(this.greeting); }
            },
            interact: function () {
                if (this.dialogueSystem) { this.showRandomDialogue(); }
            }
        };

        // ── NPC 2: Milim ──────────────────────────────────────
        const npcMilim = {
            id: 'Milim',
            greeting: 'Hey hey! Wanna spar, Rimuru?',
            src: path + "/images/gamebuilder/sprites/astro.png", // swap for Milim sprite when available
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 45,
            INIT_POSITION: { x: width * 0.7, y: height * 0.25 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 8, columns: 11 },
            ...buildDirections(8, 3),
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: [
                'Hey hey! Wanna spar, Rimuru?',
                'I\'m bored... entertain me!',
                'My Drago Nova can destroy a whole planet, you know.',
                'Being a Demon Lord is exhausting sometimes.',
                'At least you\'re more fun than most humans!',
            ],
            reaction: function () {
                if (this.dialogueSystem) { this.showReactionDialogue(); }
                else { console.log(this.greeting); }
            },
            interact: function () {
                if (this.dialogueSystem) { this.showRandomDialogue(); }
            }
        };

        // ── NPC 3: Shion ──────────────────────────────────────
        const npcShion = {
            id: 'Shion',
            greeting: 'Lord Rimuru! I have been looking everywhere for you!',
            src: path + "/images/gamebuilder/sprites/astro.png", // swap for Shion sprite when available
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 55,
            INIT_POSITION: { x: width * 0.15, y: height * 0.65 },
            pixels: { height: 770, width: 513 },
            orientation: { rows: 8, columns: 11 },
            ...buildDirections(8, 3),
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: [
                'Lord Rimuru! I have been looking everywhere for you!',
                'Please allow me to fight by your side!',
                'I will protect you with my life, my Lord.',
                'Should I prepare a meal? I\'ve been practicing...',
                'No one shall harm Lord Rimuru while I stand here!',
            ],
            reaction: function () {
                if (this.dialogueSystem) { this.showReactionDialogue(); }
                else { console.log(this.greeting); }
            },
            interact: function () {
                if (this.dialogueSystem) { this.showRandomDialogue(); }
            }
        };

        // ── Barriers ──────────────────────────────────────────
        // Four walls around the playable area to keep the player in bounds.
        const barrierTop = {
            id: 'wall_top',
            x: 0, y: 0,
            width: width, height: 20,
            visible: false,
            hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
        };

        const barrierBottom = {
            id: 'wall_bottom',
            x: 0, y: height - 20,
            width: width, height: 20,
            visible: false,
            hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
        };

        const barrierLeft = {
            id: 'wall_left',
            x: 0, y: 0,
            width: 20, height: height,
            visible: false,
            hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
        };

        const barrierRight = {
            id: 'wall_right',
            x: width - 20, y: 0,
            width: 20, height: height,
            visible: false,
            hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
        };

        // ── Central obstacle barrier ───────────────────────────
        const barrierCenter = {
            id: 'wall_center',
            x: width * 0.4,  y: height * 0.35,
            width: width * 0.2, height: height * 0.1,
            visible: true,
            hitbox: { widthPercentage: 1.0, heightPercentage: 1.0 }
        };

        // ── Class list (render order matters) ─────────────────
        this.classes = [
            { class: GameEnvBackground, data: bgData       },
            { class: Barrier,           data: barrierTop    },
            { class: Barrier,           data: barrierBottom },
            { class: Barrier,           data: barrierLeft   },
            { class: Barrier,           data: barrierRight  },
            { class: Barrier,           data: barrierCenter },
            { class: Npc,               data: npcVeldora    },
            { class: Npc,               data: npcMilim      },
            { class: Npc,               data: npcShion      },
            { class: Player,            data: playerData    },
        ];

        // ── Builder tooling (do not remove) ───────────────────
        this._initBuilderBridge(gameEnv);
    }

    // Extracted into its own method so the constructor stays readable.
    _initBuilderBridge(gameEnv) {
        // Post object summary to builder
        try {
            setTimeout(() => {
                try {
                    const objs    = Array.isArray(gameEnv?.gameObjects) ? gameEnv.gameObjects : [];
                    const summary = objs.map(o => ({
                        cls: o?.constructor?.name || 'Unknown',
                        id:  o?.canvas?.id        || '',
                        z:   o?.canvas?.style?.zIndex || ''
                    }));
                    window?.parent?.postMessage({ type: 'rpg:objects', summary }, '*');
                } catch (_) {}
            }, 250);
        } catch (_) {}

        // Report environment metrics to builder
        try {
            if (window?.parent) {
                try {
                    const rect = gameEnv?.container?.getBoundingClientRect?.()
                        ?? { top: gameEnv.top || 0, left: 0 };
                    window.parent.postMessage({ type: 'rpg:env-metrics', top: rect.top, left: rect.left }, '*');
                } catch (_) {
                    try { window.parent.postMessage({ type: 'rpg:env-metrics', top: gameEnv.top, left: 0 }, '*'); }
                    catch (__) {}
                }
            }
        } catch (_) {}

        // Listen for wall visibility & barrier draw events from builder
        try {
            window.addEventListener('message', (e) => {
                if (!e?.data) return;

                if (e.data.type === 'rpg:toggle-walls') {
                    const show = !!e.data.visible;
                    if (Array.isArray(gameEnv?.gameObjects)) {
                        for (const obj of gameEnv.gameObjects) {
                            if (obj instanceof Barrier) obj.visible = show;
                        }
                    }

                } else if (e.data.type === 'rpg:set-drawn-barriers') {
                    const arr = Array.isArray(e.data.barriers) ? e.data.barriers : [];

                    window.__overlayBarriers = window.__overlayBarriers || [];
                    for (const ob of window.__overlayBarriers) {
                        try { ob?.destroy?.(); } catch (_) {}
                    }
                    window.__overlayBarriers = [];

                    for (const bd of arr) {
                        try {
                            const bobj = new Barrier({
                                id:      bd.id,
                                x:       bd.x,       y:      bd.y,
                                width:   bd.width,   height: bd.height,
                                visible: !!bd.visible,
                                hitbox:  { widthPercentage: 0.0, heightPercentage: 0.0 },
                                fromOverlay: true
                            }, gameEnv);
                            gameEnv.gameObjects.push(bobj);
                            window.__overlayBarriers.push(bobj);
                        } catch (_) {}
                    }
                }
            });
        } catch (_) {}
    }
}

export default GameLevelSlime;
