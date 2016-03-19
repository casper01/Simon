define(["Level"], (Level) ->
    class GameManager
        constructor: (simonButtons, @propertyChanged, @startedDisplaying, @finishedDisplaying) ->
            @_actualLevel = new Level simonButtons, 5, 1000, (=>this.propertyChanged()), =>this.levelFinishedDisplaying()
        start: ->
            this.startedDisplaying()
            @_actualLevel.displayAllMoves()
        levelFinishedDisplaying: ->
            this.finishedDisplaying()
)
