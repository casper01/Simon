define(() ->
    class SimonButton
        constructor: (@_board, @_x, @_y, @_width, @_activeColor, @_inactiveColor) ->
            @_ctx = @_board[0].getContext("2d")
            @_color = @_inactiveColor
        draw: -> 
            @_ctx.fillStyle = @_color
            @_ctx.fillRect(@_x, @_y, @_width, @_width)
        turnOn: -> 
            @_color = @_activeColor
        turnOff: ->
            @_color = @_inactiveColor
        contains: (x, y) ->
            return false if x < @_x or y < @_y
            return false if x > @_x + @_width
            return false if y > @_y + @_width
            return true
)
