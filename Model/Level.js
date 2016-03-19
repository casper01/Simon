define(function() {
  var Level;
  return Level = (function() {
    Level.DELAY_TIME = 500;

    function Level(_simonButtons, initLen, _displayTime, propertyChanged, finishedDisplaying) {
      var i, j, ref;
      this._simonButtons = _simonButtons;
      this._displayTime = _displayTime;
      this.propertyChanged = propertyChanged;
      this.finishedDisplaying = finishedDisplaying;
      if (initLen <= 0) {
        console.warn("Level sholud have at least 1 initLen, it has " + initLen);
      }
      if (this._displayTime <= 0) {
        console.warn("Level's delay time should be positive, it is " + this._displayTime);
      }
      if (this._simonButtons.length === 0) {
        console.warn("No simon buttons in level");
      }
      this._moves = [];
      for (i = j = 1, ref = initLen; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        this.addMove();
      }
    }

    Level.prototype.addMove = function() {
      var newMove;
      newMove = parseInt(Math.random() * this._simonButtons.length);
      return this._moves.push(newMove);
    };

    Level.prototype.displayAllMoves = function() {
      return this.displayFromMove(0);
    };

    Level.prototype.displayFromMove = function(moveNumber) {
      var level;
      level = this;
      this.getButton(this.getMove(moveNumber)).turnOn();
      this.propertyChanged();
      return setTimeout((function() {
        level.getButton(level.getMove(moveNumber)).turnOff();
        level.propertyChanged();
        if (moveNumber !== level.getMovesCount() - 1) {
          return setTimeout((function() {
            return level.displayFromMove(moveNumber + 1);
          }), Level.DELAY_TIME);
        } else {
          return level.finishedDisplaying();
        }
      }), this._displayTime);
    };

    Level.prototype.getButton = function(i) {
      return this._simonButtons[i];
    };

    Level.prototype.getMove = function(i) {
      return this._moves[i];
    };

    Level.prototype.getMovesCount = function() {
      return this._moves.length;
    };

    return Level;

  })();
});
