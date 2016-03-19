requirejs.config(
    baseUrl: "./"
    paths: 
        jQuery: "lib/jquery-2.2.0.min"
        # controller
        GameController: "Controller/GameController"
        # model
        Point: "Model/Point"
        Level: "Model/Level"
        GameManager: "Model/GameManager"
        # view
        GameView: "View/GameView"
        SimonButton: "View/SimonButton"
        View: "View/View"
     shim:
        'jQuery': exports: '$' # if someone use 'jQuery' name, use global '$' variable as module value
)

require(["GameController"], (GameController) -> 
    new GameController
)
