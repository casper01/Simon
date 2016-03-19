define(["GameView", "jQuery", "Level", "GameManager"], (GameView, $, Level, GameManager) ->
    class GameController
        constructor: ->
            @_gameView = new GameView
            @_gameView.adjustWindow()
            @_gameView.draw()
            controller = this
            $(document).mousedown((e) ->
                controller.mouseDown(e)
            )
            $(document).mouseup((e) ->
                controller.mouseUp(e)
            )
            $(window).resize(() -> 
                controller.onResize()
            )
            @_enabledClicking = true
            @_gameManager = new GameManager @_gameView.getObjects(), (=>this.update()), (=>this.DisableClicking()), =>this.EnableClicking()
            @_gameManager.start()
        mouseDown: (e) ->
            if !@_enabledClicking
                return
            
            for obj in @_gameView.getObjects()
                if obj.contains(e.pageX, e.pageY)
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
            @_gameManager.buttonClicked(turnedOnButton)
        onResize: ->
            @_gameView.adjustWindow()
            this.update()
        update: ->
            @_gameView.draw()
        EnableClicking: ->
            @_enabledClicking = true
        DisableClicking: ->
            @_enabledClicking = false
)
