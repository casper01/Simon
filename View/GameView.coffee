# TODO: make compatible with View class

define(["View", "SimonButton", "Point", "jQuery", "TextBlinker"], (View, SimonButton, Point, $, TextBlinker) ->
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
            img = $('<img src="resources//wallpaper.jpg">')[0]
            ctx.drawImage(img, 0, 0, @board.width(), @board.height());
        drawRedScreen: (opacity) ->
            ctx = @board[0].getContext("2d")
            ctx.fillStyle = "rgba(255,0,0," + opacity + ")"
            ctx.fillRect(0, 0, @board.width(), @board.height())
        draw: ->
            this.drawBackground()
            super #, no po prostu świetnie.
        drawFailScreen: () ->
            console.log "Red screen!"
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
        updateScore: (newScore, blinking = true) ->
            oldPoints = $("#points").text()
            $("#points").text(newScore)
            
            if !blinking
                return
            textBlinker = new TextBlinker $("#points")
            if oldPoints < newScore
                textBlinker.blinkGreen()
            else if oldPoints > newScore
                textBlinker.blinkRed()
            this.updateLifeCost()
        updateLives: (newLives, blinking = true) ->
            oldLives = $("#lives").text()
            $("#lives").text(newLives)
            
            if !blinking
                return
            textBlinker = new TextBlinker $("#lives")
            if oldLives < newLives
                textBlinker.blinkGreen()
            else if oldLives > newLives
                textBlinker.blinkRed()
        updateLifeCost: (newCost) ->
            if newCost != undefined
                $("#buyLife").html('Buy life and replay for <span id="lifeCost">' + newCost + '</span> points')
            else
                newCost = parseInt $("#lifeCost").text()
            if newCost > parseInt $("#points").text()
                this.disableBuyLifeButton()
            else
                this.enableBuyLifeButton()
        disableBuyLifeButton: ->
            $("#buyLife")[0].disabled = true
        enableBuyLifeButton: ->
            $("#buyLife")[0].disabled = false
        switchToGameStartedMode: ->
            $("#startGame").css("visibility", "hidden")
            $("#bestScoreLabel").css("visibility", "visible")
        switchToGameFinishedMode: ->
            $("#startGame").css("visibility", "visible")
            $("#bestScoreLabel").css("visibility", "hidden")
        updateBestScore: (bestScore) ->
            $("#bestScore").text(bestScore)
)
            
