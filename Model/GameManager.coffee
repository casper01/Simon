define(["Level"], (Level) ->
    class GameManager
        @TIMETONEXTROUND: 500
        constructor: (simonButtons, @propertyChanged, @startedDisplaying, @finishedDisplaying, @madeMistake) ->
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
                    gm = this
                    setTimeout (->gm.start()), GameManager.TIMETONEXTROUND
            else
                button.turnOff()
                waitTime = this.madeMistake()
                gm = this
                setTimeout (->gm.start()), waitTime + GameManager.TIMETONEXTROUND
)
