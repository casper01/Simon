define(["GameView", "jQuery", "Level", "GameManager"], function(GameView, $, Level, GameManager) {
  var GameController;
  return GameController = (function() {
    function GameController() {
      var controller;
      this._gameView = new GameView;
      this._gameView.adjustWindow();
      this._gameView.draw();
      controller = this;
      $(document).mousedown(function(e) {
        return controller.mouseDown(e);
      });
      $(document).mouseup(function(e) {
        return controller.mouseUp(e);
      });
      $(window).resize(function() {
        return controller.onResize();
      });
      $("#buyLife").click((function() {
        return controller.onBuyLifeClick();
      }));
      this._enabledClicking = true;
      this._gameManager = new GameManager(this._gameView.getObjects(), ((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.disableClicking();
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.enableClicking();
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.notifyPlayerMistake();
        };
      })(this)), (function(_this) {
        return function() {
          return _this.updateGameInfo();
        };
      })(this));
      this._gameManager.start();
      this.updateGameInfo(false);
      this._gameView.updateLifeCost(this._gameManager.getLifePrice());
    }

    GameController.prototype.mouseDown = function(e) {
      var i, len, obj, ref, results;
      if (!this._enabledClicking) {
        return;
      }
      ref = this._gameView.getObjects();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        if (obj.contains(e.pageX, e.pageY)) {
          obj.turnOn();
          results.push(this.update());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    GameController.prototype.mouseUp = function(e) {
      var i, len, obj, ref, turnedOnButton;
      if (!this._enabledClicking) {
        return;
      }
      ref = this._gameView.getObjects();
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        if (obj.isTurnedOn()) {
          turnedOnButton = obj;
        }
        obj.turnOff();
      }
      this.update();
      if (turnedOnButton !== void 0) {
        return this._gameManager.buttonClicked(turnedOnButton);
      }
    };

    GameController.prototype.onResize = function() {
      this._gameView.adjustWindow();
      return this.update();
    };

    GameController.prototype.update = function() {
      return this._gameView.draw();
    };

    GameController.prototype.enableClicking = function() {
      this._enabledClicking = true;
      return this._gameView.updateLifeCost();
    };

    GameController.prototype.disableClicking = function() {
      this._enabledClicking = false;
      return this._gameView.disableBuyLifeButton();
    };

    GameController.prototype.notifyPlayerMistake = function() {
      this.disableClicking();
      this._gameView.drawFailScreen();
      return this.updateGameInfo();
    };

    GameController.prototype.updateGameInfo = function(blinking) {
      if (blinking == null) {
        blinking = true;
      }
      this._gameView.updateScore(this._gameManager.getPoints(), blinking);
      return this._gameView.updateLives(this._gameManager.getLives(), blinking);
    };

    GameController.prototype.onBuyLifeClick = function() {
      this._gameManager.buyLife();
      this._gameView.updateLifeCost(this._gameManager.getLifePrice());
      this.updateGameInfo();
      return this._gameManager.start();
    };

    return GameController;

  })();
});
