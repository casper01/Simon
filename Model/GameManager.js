define(["Level"], function(Level) {
  var GameManager;
  return GameManager = (function() {
    GameManager.TIMETONEXTROUND = 500;

    GameManager.INITLIVES = 2;

    function GameManager(_simonButtons, propertyChanged, startedDisplaying, finishedDisplaying, madeMistake, updateScore) {
      this._simonButtons = _simonButtons;
      this.propertyChanged = propertyChanged;
      this.startedDisplaying = startedDisplaying;
      this.finishedDisplaying = finishedDisplaying;
      this.madeMistake = madeMistake;
      this.updateScore = updateScore;
      this.reset();
    }

    GameManager.prototype.start = function() {
      this._actualMove = 0;
      this.startedDisplaying();
      return this._actualLevel.displayAllMoves();
    };

    GameManager.prototype.reset = function() {
      this._actualLevel = new Level(this._simonButtons, 2, 1000, ((function(_this) {
        return function() {
          return _this.propertyChanged();
        };
      })(this)), (function(_this) {
        return function() {
          return _this.levelFinishedDisplaying();
        };
      })(this));
      this._actualMove = 0;
      this._points = 0;
      return this._lives = GameManager.INITLIVES;
    };

    GameManager.prototype.levelFinishedDisplaying = function() {
      return this.finishedDisplaying();
    };

    GameManager.prototype.buttonClicked = function(button) {
      var gm, waitTime;
      if (button.equals(this._actualLevel.getButton(this._actualMove))) {
        this._actualMove++;
        if (this.isEndOfLevel()) {
          button.turnOff();
          this.addPointsOfActualLevel();
          return this.startNewLevel();
        }
      } else {
        button.turnOff();
        this._lives--;
        gm = this;
        setTimeout((function() {
          return gm.start();
        }), waitTime + GameManager.TIMETONEXTROUND);
        if (this._lives === 0) {
          this.reset();
        }
        return waitTime = this.madeMistake();
      }
    };

    GameManager.prototype.isEndOfLevel = function() {
      return this._actualMove === this._actualLevel.getMovesCount();
    };

    GameManager.prototype.addPointsOfActualLevel = function() {
      this._points += 100 * this._actualLevel.getMovesCount();
      return this.updateScore();
    };

    GameManager.prototype.startNewLevel = function() {
      var gm;
      this._actualLevel.addMove();
      gm = this;
      return setTimeout((function() {
        return gm.start();
      }), GameManager.TIMETONEXTROUND);
    };

    GameManager.prototype.getPoints = function() {
      return this._points;
    };

    GameManager.prototype.getLives = function() {
      return this._lives;
    };

    return GameManager;

  })();
});
