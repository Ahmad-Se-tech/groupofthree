// Adventure Game Custom Level
// Save as: assets/js/GameEnginev1/GameLevelKirby.js

import GameEnvBackground from '../essentials/GameEnvBackground.js';
import Player from '../essentials/Player.js';
import Npc from '../essentials/Npc.js';
import Barrier from '../essentials/Barrier.js';

class GameLevelForest {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/clouds.jpg",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0.07, y: 0.3 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
            };

        const npcData1 = {
            id: 'NPC',
            greeting: 'you win',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 8,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0.8, y: 0 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            right: { row: Math.min(1, 1 - 1), start: 0, columns: 3 },
            left: { row: Math.min(2, 1 - 1), start: 0, columns: 3 },
            up: { row: Math.min(3, 1 - 1), start: 0, columns: 3 },
            upRight: { row: Math.min(3, 1 - 1), start: 0, columns: 3 },
            downRight: { row: Math.min(1, 1 - 1), start: 0, columns: 3 },
            upLeft: { row: Math.min(2, 1 - 1), start: 0, columns: 3 },
            downLeft: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
            dialogues: ['you win'],
            reaction: function() { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function() { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };
        
this.classes = [      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: npcData1 },
      
];

        
    }
}

export default GameLevelForest;