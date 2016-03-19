define(function() {
  var SimonButton;
  return SimonButton = (function() {
    function SimonButton(_board, _x, _y, _width, _activeColor, _inactiveColor) {
      this._board = _board;
      this._x = _x;
      this._y = _y;
      this._width = _width;
      this._activeColor = _activeColor;
      this._inactiveColor = _inactiveColor;
      this._ctx = this._board[0].getContext("2d");
      this._color = this._inactiveColor;
    }

    SimonButton.prototype.draw = function() {
      this._ctx.fillStyle = this._color;
      return this._ctx.fillRect(this._x, this._y, this._width, this._width);
    };

    SimonButton.prototype.turnOn = function() {
      return this._color = this._activeColor;
    };

    SimonButton.prototype.turnOff = function() {
      return this._color = this._inactiveColor;
    };

    SimonButton.prototype.isTurnedOn = function() {
      return this._color === this._activeColor;
    };

    SimonButton.prototype.contains = function(x, y) {
      if (x < this._x || y < this._y) {
        return false;
      }
      if (x > this._x + this._width) {
        return false;
      }
      if (y > this._y + this._width) {
        return false;
      }
      return true;
    };

    SimonButton.prototype.getHashCode = function() {
      return this._activeColor;
    };

    SimonButton.prototype.equals = function(otherButton) {
      return this.getHashCode() === otherButton.getHashCode();
    };

    return SimonButton;

  })();
});
