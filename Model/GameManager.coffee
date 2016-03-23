define(["Level"], (Level) ->
    class GameManager
        @TIMETONEXTROUND: 500
        @INITLIVES: 2
        constructor: (@_simonButtons, @propertyChanged, @startedDisplaying, @finishedDisplaying, @madeMistake, @updateScore) ->
            this.reset()
        start: ->
            @_actualMove = 0
            this.startedDisplaying()
            @_actualLevel.displayAllMoves()
        reset: ->
            @_actualLevel = new Level @_simonButtons, 2, 1000, (=>this.propertyChanged()), =>this.levelFinishedDisplaying()
            @_actualMove = 0
            @_points = 0
            @_lives = GameManager.INITLIVES
        levelFinishedDisplaying: ->
            this.finishedDisplaying()
        buttonClicked: (button) ->
            if button.equals @_actualLevel.getButton(@_actualMove)
                @_actualMove++
                
                if this.isEndOfLevel()
                    button.turnOff()
                    this.addPointsOfActualLevel()
                    this.startNewLevel()
            else
                button.turnOff()
                @_lives--
                gm = this
                setTimeout (->gm.start()), waitTime + GameManager.TIMETONEXTROUND
                
                if @_lives == 0
                    this.reset()
                waitTime = this.madeMistake()
        isEndOfLevel: -> @_actualMove == @_actualLevel.getMovesCount()
        addPointsOfActualLevel: ->
            @_points += 100 * @_actualLevel.getMovesCount()
            this.updateScore()
        startNewLevel: ->
            @_actualLevel.addMove()
            gm = this
            setTimeout (->gm.start()), GameManager.TIMETONEXTROUND
        getPoints: -> @_points
        getLives: -> @_lives
)
