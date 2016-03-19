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
      })(this)), (function(_this) {
        return function() {
          return _this.drawFailScreen();
        };
      })(this));
      this._gameManager.start();
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
      return this._enabledClicking = true;
    };

    GameController.prototype.disableClicking = function() {
      return this._enabledClicking = false;
    };

    GameController.prototype.drawFailScreen = function() {
      this.disableClicking();
      return this._gameView.drawFailScreen();
    };

    return GameController;

  })();
});
