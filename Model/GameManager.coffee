define(["Level"], (Level) ->
    class GameManager
        constructor: (simonButtons, @propertyChanged, @startedDisplaying, @finishedDisplaying) ->
            @_actualLevel = new Level simonButtons, 2, 1000, (=>this.propertyChanged()), =>this.levelFinishedDisplaying()
            @_actualMove = 0
        start: ->
            @_actualMove = 0
            this.startedDisplaying()
            @_actualLevel.displayAllMoves()
        levelFinishedDisplaying: ->
            this.finishedDisplaying()
        buttonClicked: (button) ->
            if button.equals @_actualLevel.getButton(@_actualMove)
                @_actualMove++
                
                if @_actualMove == @_actualLevel.getMovesCount()
                    button.turnOff()
                    @_actualLevel.addMove()
                    this.start()
            else
                button.turnOff()
                this.start()
)
