import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,  // Automatically choose WebGL or Canvas
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Load assets here
  // e.g., this.load.image('logo', 'assets/phaser3-logo.png');
}

function create() {
  // Add game objects here
  // e.g., this.add.image(400, 300, 'logo');
  this.add.text(300, 280, 'Hello, Phaser!', { fontSize: '32px', fill: '#fff' });
}

function update() {
  // Game loop logic
}