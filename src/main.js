import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  scene: { preload, create }
};

const game = new Phaser.Game(config);

function preload() {
    // Use webpack's require.context to dynamically require images from the assets folder.
    const imagesContext = require.context('./assets/', false, /\.(png|jpe?g|svg)$/);
    // Create an array to hold the asset keys
    this.itemKeys = [];
  
    // Loop over each found file
    imagesContext.keys().forEach((filePath) => {
      // Derive a key from the file name (e.g., './coin.png' becomes 'coin')
      const key = filePath.replace('./', '').split('.')[0];
      // Save the key for later use in creating the roulette
      this.itemKeys.push(key);
      // Load the image with Phaser
      this.load.image(key, imagesContext(filePath));
    });
  }
function create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const numItems = this.itemKeys.length;
    const radius = 150;
    // Calculate the angle between each item in radians
    const angleStep = Phaser.Math.DegToRad(360 / numItems);
  
    // Create a container to hold the roulette items.
    const rouletteContainer = this.add.container(centerX, centerY);
  
    // Dynamically add each item image to the container
    this.itemKeys.forEach((key, i) => {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const sprite = this.add.sprite(x, y, key);
      sprite.setScale(0.5); // Adjust scale as needed
      // Store each sprite's angle (if needed for selection calculations)
      sprite.itemAngle = Phaser.Math.RadToDeg(angle);
      rouletteContainer.add(sprite);
    });
  
    // Add a pointer at the top of the roulette (optional)
    // You can use a preloaded pointer image or create one using graphics
    const pointer = this.add.text(centerX, centerY - radius - 50, '▼', {
      fontSize: '48px',
      color: '#000'
    }).setOrigin(0.5);
  
    // When the player clicks, spin the roulette.
    this.input.on('pointerdown', () => {
      // Calculate a random rotation: several full spins plus a random offset.
      const fullSpins = Phaser.Math.Between(3, 6);
      const extraDegrees = Phaser.Math.Between(0, 360);
      const totalRotation = fullSpins * 360 + extraDegrees;
  
      // Tween the rotation of the container
      this.tweens.add({
        targets: rouletteContainer,
        angle: totalRotation,
        duration: 3000,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          // Determine the selected item based on the pointer's position.
          // Assuming the pointer is at the top (270° in Phaser's coordinate system)
          const finalAngle = rouletteContainer.angle % 360;
          const pointerAngle = 270;
          let relativeAngle = (pointerAngle - finalAngle + 360) % 360;
          const sectorSize = 360 / numItems;
          const selectedIndex = Math.floor(relativeAngle / sectorSize);
          const selectedItem = this.itemKeys[selectedIndex];
          console.log('Selected item:', selectedItem);
  
          // Optionally display the result
          this.add.text(centerX, centerY + radius + 50, `You got ${selectedItem}!`, {
            fontSize: '24px',
            fill: '#000'
          }).setOrigin(0.5);
        }
      });
    });
  }
  