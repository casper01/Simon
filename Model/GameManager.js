define(["Level"], function(Level) {
  var GameManager;
  return GameManager = (function() {
    GameManager.TIMETONEXTROUND = 500;

    function GameManager(simonButtons, propertyChanged, startedDisplaying, finishedDisplaying, madeMistake, updateScore) {
      this.propertyChanged = propertyChanged;
      this.startedDisplaying = startedDisplaying;
      this.finishedDisplaying = finishedDisplaying;
      this.madeMistake = madeMistake;
      this.updateScore = updateScore;
      this._actualLevel = new Level(simonButtons, 2, 1000, ((function(_this) {
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
    }

    GameManager.prototype.start = function() {
      this._actualMove = 0;
      this.startedDisplaying();
      return this._actualLevel.displayAllMoves();
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
          console.log("Update punktow: " + this._points);
          return this.startNewLevel();
        }
      } else {
        button.turnOff();
        waitTime = this.madeMistake();
        gm = this;
        return setTimeout((function() {
          return gm.start();
        }), waitTime + GameManager.TIMETONEXTROUND);
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

    return GameManager;

  })();
});
