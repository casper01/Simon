# TODO: make compatible with View class

define(["View", "SimonButton", "Point", "jQuery"], (View, SimonButton, Point, $) ->
    class GameView extends View
        constructor: ->
            super()
            @board = $("#board")
            this.updateSettings()
            @buttonColors = [["blue", "#4f77ff"], ["red", "#ff4f4f"], ["green", "#57ff4f"], ["yellow", "#fffd4f"]]
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
)
            
