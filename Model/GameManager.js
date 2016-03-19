define(["Level"], function(Level) {
  var GameManager;
  return GameManager = (function() {
    function GameManager(simonButtons, propertyChanged, startedDisplaying, finishedDisplaying) {
      this.propertyChanged = propertyChanged;
      this.startedDisplaying = startedDisplaying;
      this.finishedDisplaying = finishedDisplaying;
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
      if (button.equals(this._actualLevel.getButton(this._actualMove))) {
        this._actualMove++;
        if (this._actualMove === this._actualLevel.getMovesCount()) {
          button.turnOff();
          this._actualLevel.addMove();
          return this.start();
        }
      } else {
        button.turnOff();
        return this.start();
      }
    };

    return GameManager;

  })();
});
