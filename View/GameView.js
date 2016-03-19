var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(["View", "SimonButton", "Point", "jQuery"], function(View, SimonButton, Point, $) {
  var GameView;
  return GameView = (function(superClass) {
    extend(GameView, superClass);

    function GameView() {
      GameView.__super__.constructor.call(this);
      this.board = $("#board");
      this.updateSettings();
      this.buttonColors = [["blue", "#4f77ff"], ["red", "#ff4f4f"], ["green", "#57ff4f"], ["yellow", "#fffd4f"]];
      this.createBoard();
    }

    GameView.prototype.adjustWindow = function() {
      return this.updateSettings();
    };

    GameView.prototype.createBoard = function() {
      var coord, ind, ref, results;
      ref = this.getButtonsPositions();
      results = [];
      for (ind in ref) {
        coord = ref[ind];
        results.push(this._drawableObjects.push(new SimonButton(this.board, coord.x, coord.y, this.buttonWidth, this.buttonColors[ind][0], this.buttonColors[ind][1])));
      }
      return results;
    };

    GameView.prototype.getButtonsPositions = function() {
      var center, coords;
      coords = [];
      center = new Point(parseInt(this.board.width() / 2), parseInt(this.board.height() / 2));
      coords.push(new Point(center.x - this.buttonWidth - this.buttonDist, center.y - this.buttonWidth - this.buttonDist));
      coords.push(new Point(center.x - this.buttonWidth - this.buttonDist, center.y + this.buttonDist));
      coords.push(new Point(center.x + this.buttonDist, center.y - this.buttonWidth - this.buttonDist));
      coords.push(new Point(center.x + this.buttonDist, center.y + this.buttonDist));
      return coords;
    };

    GameView.prototype.getObjects = function() {
      return this._drawableObjects;
    };

    GameView.prototype.updateSettings = function() {
      var height, width;
      this.board.attr("width", $(document).width());
      this.board.attr("height", $(document).height());
      width = this.board.width();
      height = this.board.height();
      this.buttonWidth = parseInt(Math.min(width, height) / 3.5);
      this.buttonDist = parseInt(Math.min(width, height) / 72);
      this.buttonWidth = parseInt(Math.min(width, height) / 3.5);
      return this.buttonDist = parseInt(Math.min(width, height) / 72);
    };

    return GameView;

  })(View);
});
