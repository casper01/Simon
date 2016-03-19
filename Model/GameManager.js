define(["Level"], function(Level) {
  var GameManager;
  return GameManager = (function() {
    function GameManager(simonButtons, propertyChanged, startedDisplaying, finishedDisplaying) {
      this.propertyChanged = propertyChanged;
      this.startedDisplaying = startedDisplaying;
      this.finishedDisplaying = finishedDisplaying;
      this._actualLevel = new Level(simonButtons, 5, 1000, ((function(_this) {
        return function() {
          return _this.propertyChanged();
        };
      })(this)), (function(_this) {
        return function() {
          return _this.levelFinishedDisplaying();
        };
      })(this));
    }

    GameManager.prototype.start = function() {
      this.startedDisplaying();
      return this._actualLevel.displayAllMoves();
    };

    GameManager.prototype.levelFinishedDisplaying = function() {
      return this.finishedDisplaying();
    };

    return GameManager;

  })();
});
