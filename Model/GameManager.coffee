define(["Level"], (Level) ->
    class GameManager
        @TIMETONEXTROUND: 500
        constructor: (simonButtons, @propertyChanged, @startedDisplaying, @finishedDisplaying, @madeMistake, @updateScore) ->
            @_actualLevel = new Level simonButtons, 2, 1000, (=>this.propertyChanged()), =>this.levelFinishedDisplaying()
            @_actualMove = 0
            @_points = 0
        start: ->
            @_actualMove = 0
            this.startedDisplaying()
            @_actualLevel.displayAllMoves()
        levelFinishedDisplaying: ->
            this.finishedDisplaying()
        buttonClicked: (button) ->
            if button.equals @_actualLevel.getButton(@_actualMove)
                @_actualMove++
                
                if this.isEndOfLevel()
                    button.turnOff()
                    this.addPointsOfActualLevel()
                    console.log "Update punktow: " + @_points
                    this.startNewLevel()
            else
                button.turnOff()
                waitTime = this.madeMistake()
                gm = this
                setTimeout (->gm.start()), waitTime + GameManager.TIMETONEXTROUND
        isEndOfLevel: -> @_actualMove == @_actualLevel.getMovesCount()
        addPointsOfActualLevel: ->
            @_points += 100 * @_actualLevel.getMovesCount()
            this.updateScore()
        startNewLevel: ->
            @_actualLevel.addMove()
            gm = this
            setTimeout (->gm.start()), GameManager.TIMETONEXTROUND
        getPoints: -> @_points
)
