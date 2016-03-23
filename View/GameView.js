var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(["View", "SimonButton", "Point", "jQuery"], function(View, SimonButton, Point, $) {
  var GameView;
  return GameView = (function(superClass) {
    extend(GameView, superClass);

    GameView.REDSCREENTIME = 200;

    function GameView() {
      GameView.__super__.constructor.call(this);
      this.board = $("#board");
      this.updateSettings();
      this.buttonColors = [["blue", "#4f77ff"], ["red", "#ff9494"], ["green", "#57ff4f"], ["#f8c600", "#feff94"]];
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

    GameView.prototype.drawBackground = function() {
      var ctx, img;
      ctx = this.board[0].getContext("2d");
      img = $('<img src="resources//sofaBlue.jpg">')[0];
      return ctx.drawImage(img, 0, 0, this.board.width(), this.board.height());
    };

    GameView.prototype.drawRedScreen = function(opacity) {
      var ctx;
      ctx = this.board[0].getContext("2d");
      ctx.fillStyle = "rgba(255,0,0," + opacity + ")";
      return ctx.fillRect(0, 0, this.board.width(), this.board.height());
    };

    GameView.prototype.draw = function() {
      this.drawBackground();
      return GameView.__super__.draw.apply(this, arguments);
    };

    GameView.prototype.drawFailScreen = function() {
      var step, view;
      this.draw();
      this.drawRedScreen(0.5);
      step = 0.2 * GameView.REDSCREENTIME;
      view = this;
      setTimeout(view.continueDrawingFailScreen(step, 0.4), step);
      return GameView.REDSCREENTIME;
    };

    GameView.prototype.continueDrawingFailScreen = function(timeStep, opacity) {
      var view;
      this.draw();
      this.drawRedScreen(opacity);
      view = this;
      if (opacity >= 0) {
        return setTimeout((function() {
          return view.continueDrawingFailScreen(timeStep, opacity - 0.1);
        }), timeStep);
      }
    };

    GameView.prototype.updateScore = function(newScore) {
      return $("#points").text(newScore);
    };

    GameView.prototype.updateLives = function(newLives) {
      return $("#lives").text(newLives);
    };

    return GameView;

  })(View);
});
