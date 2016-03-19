define(() ->
    class Point
        constructor: (@x, @y) ->
        toString: -> return "(" + @x + ", " + @y + ")"
)
