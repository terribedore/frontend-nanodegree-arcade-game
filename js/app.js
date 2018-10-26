// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, 'this' uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // starting position and speed. A negative starting number at
    // 'x' allows them to creep on the screen vs. teleporting!
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter which will ensure
    // the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // if enemy is rendering outside the canvas,
    // reset their location and their speed
    if (this.x > 510) {
      console.log('snails move faster!');
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 222);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our player!
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';

    // starting position
    this.x = 202;
    this.y = 388;
};

// Update the player's position, required method for game
Player.prototype.update = function(dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player movement via key presses.
Player.prototype.handleInput = function(keyPress) {
    // player moves left 1 tile (102px) for each 'left' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'left' && this.x > 0) {
      this.x -= 102;
    };

    // player moves up 1 tile (83px) for each 'up' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'up' && this.y > 0) {
      this.y -= 83;
    };
    // player moves right 1 tile (102px) for each 'right' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'right' && this.x < 405) {
      this.x += 102;
    };

    // player moves down 1 tile (102px) for each 'down' key press.
    // the && Operator keeps the player on the canvas.
    // NOTE: You'd think the && Operator is 405, but you'd be wrong!
    if(keyPress == 'down' && this.y < 388) {
      this.y += 83;
    };

    // if player collides with an enemy,
    // player is sent back to starting position
    for(let enemy of allEnemies) {
      // if enemy position is LESS than player's position (within 80px) AND
      if(enemy.x < this.x + 80 &&
        // if enemy position (within 80px) is GREATER than player's position
        enemy.x + 80 > this.x &&
        // if enemy position is LESS than player's position (within 60px)
        enemy.y < this.y + 80 &&
        // if enemy position (within 60px) is GREATER than player's position
        enemy.y  + 80 > this.y) {

        // then reset player to starting position
        this.x = 202;
        this.y = 388;
      }; // BUG: this works if I'm moving, BUT if I stay staionary, the bug passes right over me...
    }

    // if player reaches water row (0 on y axis) without collision,
    // they WIN!
    // and player is sent back to starting position after t seconds
    if(this.y < 0) {
      // OPTIMIZE: disable 'keyPress' in future refactoring so
      // player can't be moved after winning. (short timout for now)
      // IDEA: add a 'win' and 'gotcha' function. use if/else to
      // trigger win = star and reset while gotcha = rock and reset.
      setTimeout(() => {

        // reset player to starting position
        this.x = 202;
        this.y = 388;
      }, 500); // 500 = miliseconds = 0.5 seconds
    };
};


// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-115, 60, 100), new Enemy(-220, 145, 100), new Enemy(-325, 230, 100)];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
