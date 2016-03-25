define(["Level"], function(Level) {
  var GameManager;
  return GameManager = (function() {
    GameManager.TIMETONEXTROUND = 500;

    GameManager.INITTLIFEPRICE = 200;

    GameManager.INITLIVES = 2;

    function GameManager(_simonButtons, propertyChanged, startedDisplaying, finishedDisplaying, madeMistake, updateDataInfo, finishGame) {
      this._simonButtons = _simonButtons;
      this.propertyChanged = propertyChanged;
      this.startedDisplaying = startedDisplaying;
      this.finishedDisplaying = finishedDisplaying;
      this.madeMistake = madeMistake;
      this.updateDataInfo = updateDataInfo;
      this.finishGame = finishGame;
      this.reset();
    }

    GameManager.prototype.start = function() {
      this._actualMove = 0;
      this.updateDataInfo();
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
      this._lives = GameManager.INITLIVES;
      return this._lifePrice = GameManager.INITTLIFEPRICE;
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
        waitTime = this.madeMistake();
        if (this._lives === 0) {
          this.finishGame();
          this.reset();
          return;
        }
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
      return this.updateDataInfo();
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

    GameManager.prototype.getLifePrice = function() {
      return this._lifePrice;
    };

    GameManager.prototype.buyLife = function() {
      this._lives++;
      this._points -= this._lifePrice;
      return this._lifePrice *= 2;
    };

    return GameManager;

  })();
});
