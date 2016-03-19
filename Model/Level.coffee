define(() ->
    class Level
        @DELAY_TIME: 500
        constructor: (@_simonButtons, initLen, @_displayTime, @propertyChanged, @finishedDisplaying) ->
            if initLen <= 0
                console.warn "Level sholud have at least 1 initLen, it has " + initLen
            if @_displayTime <= 0
                console.warn "Level's delay time should be positive, it is " + @_displayTime
            if @_simonButtons.length == 0
                console.warn "No simon buttons in level"
            
            @_moves = []
            this.addMove() for i in [1..initLen]
        addMove: ->
            newMove = parseInt (Math.random() * @_simonButtons.length)
            @_moves.push newMove
        displayAllMoves: ->
            this.displayFromMove(0)
        displayFromMove: (moveNumber) -> 
            level = this
            this.getButton(this.getMove(moveNumber)).turnOn()
            this.propertyChanged()
            setTimeout (->
                level.getButton(level.getMove(moveNumber)).turnOff()
                level.propertyChanged()
                
                if moveNumber != level.getMovesCount() - 1
                    setTimeout (->
                        level.displayFromMove(moveNumber+1)
                        ), Level.DELAY_TIME
                else
                    level.finishedDisplaying()
            ), @_displayTime
            
        getButton: (i) -> @_simonButtons[i]
        getMove: (i) -> @_moves[i]
        getMovesCount: -> @_moves.length
)
