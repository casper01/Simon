define(["GameView", "jQuery", "Level", "GameManager"], function(GameView, $, Level, GameManager) {
  var GameController;
  return GameController = (function() {
    function GameController() {
      var controller, gameManager;
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
      gameManager = new GameManager(this._gameView.getObjects(), ((function(_this) {
        return function() {
          return _this.update();
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.DisableClicking();
        };
      })(this)), (function(_this) {
        return function() {
          return _this.EnableClicking();
        };
      })(this));
      gameManager.start();
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
      var i, len, obj, ref, results;
      if (!this._enabledClicking) {
        return;
      }
      ref = this._gameView.getObjects();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        obj.turnOff();
        results.push(this.update());
      }
      return results;
    };

    GameController.prototype.onResize = function() {
      this._gameView.adjustWindow();
      return this.update();
    };

    GameController.prototype.update = function() {
      return this._gameView.draw();
    };

    GameController.prototype.EnableClicking = function() {
      return this._enabledClicking = true;
    };

    GameController.prototype.DisableClicking = function() {
      return this._enabledClicking = false;
    };

    return GameController;

  })();
});
