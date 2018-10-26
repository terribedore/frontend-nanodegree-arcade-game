// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies, 'this' uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // starting position. A negative starting number at
    // 'x' allows them to creep on the screen vs. teleporting!
    this.x = x; // NB: bugs, first to last appearance: -115, -220, -270.
    this.y = y;  // NB: bugs, bottom to top: 230, 145, 60.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 0.5; // rate of speed. 0.5 is a slower speed for testing.
    if (this.x > 500) {
     this.x = -115; // a negative number simulates a creep vs teleporting movement.
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';

    // starting position
    this.x = 202;
    this.y = 388;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player movement via key presses.
Player.prototype.handleInput = function(keyPress) {
    // player moves left 1 tile (102 px) for each 'left' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'left' && this.x > 0) {
      this.x -= 102;
    };

    // player moves up 1 tile (83 px) for each 'up' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'up' && this.y > 0) {
      this.y -= 83;
    };
    // player moves right 1 tile (102 px) for each 'right' key press.
    // the && Operator keeps the player on the canvas.
    if(keyPress == 'right' && this.x < 405) {
      this.x += 102;
    };

    // player moves down 1 tile (102 px) for each 'down' key press.
    // the && Operator keeps the player on the canvas.
    // NOTE: You'd think the && Operator is 405, but you'd be wrong!
    if(keyPress == 'down' && this.y < 388) {
      this.y += 83;
    };

    // if player collides with an enemy,
    // player is sent back to starting position
    for(let enemy of allEnemies) {
      if(enemy.x < this.x + 80 &&
          enemy.x + 80 > this.x &&
          enemy.y < this.y + 60 &&
          60 + enemy.y > this.y) {
          this.x = 202;
          this.y = 405;
      };
    }

    // if player reaches water row without collision, they win! and
    // player is sent back to starting position after t seconds
    if(this.y < 0) {
      // OPTIMIZE: disable 'keyPress' in future refactoring so
      // player can't be moved after winning. (short timout for now)
      // IDEA: add a 'win' and 'gotcha' function. use if/else to
      // trigger win = star and reset while gotcha = rock and reset.
      setTimeout(() => {
        this.x = 202;
        this.y = 388;
      }, 500); // 500 = miliseconds = 0.5 seconds
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-115, 60), new Enemy(-220, 145), new Enemy(-325, 230)];
//var allEnemies = [new Enemy()];

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
