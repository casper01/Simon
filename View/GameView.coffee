# TODO: make compatible with View class

define(["View", "SimonButton", "Point", "jQuery"], (View, SimonButton, Point, $) ->
    class GameView extends View
        @REDSCREENTIME: 200
        constructor: ->
            super()
            @board = $("#board")
            this.updateSettings()
                            #   blue                    red                 green               yellow
            @buttonColors = [["blue", "#4f77ff"], ["red", "#ff9494"], ["green", "#57ff4f"], ["#f8c600", "#feff94"]]
            this.createBoard()
        adjustWindow: ->
            this.updateSettings()
        createBoard: ->
            for ind, coord of this.getButtonsPositions()
                @_drawableObjects.push new SimonButton @board, coord.x, coord.y, @buttonWidth, @buttonColors[ind][0], @buttonColors[ind][1]
        getButtonsPositions: ->
            coords = []
            center = new Point parseInt(@board.width()/2), parseInt(@board.height()/2)
            coords.push new Point center.x - @buttonWidth - @buttonDist, center.y - @buttonWidth - @buttonDist
            coords.push new Point center.x - @buttonWidth - @buttonDist, center.y + @buttonDist
            coords.push new Point center.x + @buttonDist, center.y - @buttonWidth - @buttonDist
            coords.push new Point center.x + @buttonDist, center.y + @buttonDist
            return coords 
        getObjects: ->
            return @_drawableObjects
        updateSettings: ->
            @board.attr("width", $(document).width())
            @board.attr("height", $(document).height())
            width = @board.width()
            height = @board.height()
            @buttonWidth = parseInt (Math.min(width, height) / 3.5)
            @buttonDist = parseInt (Math.min(width, height) / 72)
            @buttonWidth = parseInt (Math.min(width, height) / 3.5)
            @buttonDist = parseInt (Math.min(width, height) / 72)
        drawBackground: ->
            ctx = @board[0].getContext("2d")
            img = $('<img src="resources//sofaBlue.jpg">')[0]
            ctx.drawImage(img, 0, 0, @board.width(), @board.height());
        drawRedScreen: (opacity) ->
            ctx = @board[0].getContext("2d")
            ctx.fillStyle = "rgba(255,0,0," + opacity + ")"
            ctx.fillRect(0, 0, @board.width(), @board.height())
        draw: ->
            this.drawBackground()
            super #, no po prostu świetnie.
        drawFailScreen: () ->
            this.draw()
            this.drawRedScreen(0.5)
            step = 0.2 * GameView.REDSCREENTIME
            view = this
            setTimeout (
                view.continueDrawingFailScreen(step, 0.4)
            ), step
            return GameView.REDSCREENTIME
        continueDrawingFailScreen: (timeStep, opacity) ->
            this.draw()
            this.drawRedScreen(opacity)
            view = this
            if (opacity >= 0)
                setTimeout (->
                    view.continueDrawingFailScreen(timeStep, opacity-0.1)
                ), timeStep
)
            
