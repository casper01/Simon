define(["GameView", "jQuery", "Level", "GameManager", "Cookies"], (GameView, $, Level, GameManager, Cookies) ->
    class GameController
        constructor: ->
            @_gameView = new GameView
            @_gameView.adjustWindow()
            @_gameView.draw()
            controller = this
            @_gameView.getDocument().mousedown((e) -> controller.mouseDown(e))
            @_gameView.getDocument().mouseup((e) -> controller.mouseUp(e))
            @_gameView.getWindow().resize(() -> controller.onResize())
            @_gameView.getBuyLifeButton().click(-> controller.onBuyLifeClick())
            @_gameView.getStartGameButton().click(-> controller.onStartGameClick())
            @_enabledClicking = true
            @_gameManager = new GameManager @_gameView.getObjects(), (=>this.update()), (=>this.disableClicking()), (=>this.enableClicking()), (=>this.notifyPlayerMistake()), =>this.finishGame()
            this.updateGameInfo false
            @_gameView.updateLifeCost @_gameManager.getLifePrice()
            this.disableClicking()
            this.updateBestScore()
        mouseDown: (e) ->
            if !@_enabledClicking
                return
            
            for obj in @_gameView.getObjects()
                if obj.contains e.pageX, e.pageY
                    obj.turnOn()
                    this.update()
        mouseUp: (e) ->
            if !@_enabledClicking
                return
                
            for obj in @_gameView.getObjects()
                if obj.isTurnedOn()
                    turnedOnButton = obj
                obj.turnOff()
            this.update()
            
            if turnedOnButton != undefined
                @_gameManager.buttonClicked turnedOnButton
        onResize: ->
            @_gameView.adjustWindow()
            this.update()
        update: ->
            @_gameView.draw()
            this.updateGameInfo()
            if @_enabledClicking and @_gameManager.getLifePrice() <= @_gameManager.getPoints()
                @_gameView.enableBuyLifeButton()
        enableClicking: ->
            @_enabledClicking = true
            this.update()
        disableClicking: ->
            @_enabledClicking = false
            @_gameView.disableBuyLifeButton()
        notifyPlayerMistake: ->
            this.disableClicking()
            @_gameView.drawFailScreen()
            this.updateGameInfo()
        updateGameInfo: (blinking = true) ->
            @_gameView.updateScore @_gameManager.getPoints(), blinking
            @_gameView.updateLives @_gameManager.getLives(), blinking
        onBuyLifeClick: ->
            @_gameManager.buyLife()
            @_gameView.updateLifeCost @_gameManager.getLifePrice()
            this.updateGameInfo()
            @_gameManager.start()
        onStartGameClick: ->
            @_gameView.switchToGameStartedMode()
            @_gameManager.start()
        finishGame: ->
            this.updateBestScore @_gameManager.getPoints()
            this.disableClicking()
            @_gameView.updateLifeCost GameManager.INITTLIFEPRICE
            @_gameView.switchToGameFinishedMode()
        updateBestScore: (newScore) ->
            bestScore = Cookies.get "bestScore"
            
            if newScore == undefined
                @_gameView.updateBestScore bestScore
                return
            if bestScore == undefined
                bestScore = -1
            else
                bestScore = parseInt bestScore
            if bestScore < newScore
                Cookies.set "bestScore", newScore, { expires: 365 }
                @_gameView.updateBestScore newScore
)
