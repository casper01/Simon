requirejs.config({
  baseUrl: "./",
  paths: {
    jQuery: "lib/jquery-2.2.0.min",
    GameController: "Controller/GameController",
    Point: "Model/Point",
    Level: "Model/Level",
    GameManager: "Model/GameManager",
    GameView: "View/GameView",
    SimonButton: "View/SimonButton",
    View: "View/View"
  },
  shim: {
    'jQuery': {
      exports: '$'
    }
  }
});

require(["GameController"], function(GameController) {
  return new GameController;
});
