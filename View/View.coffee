define(() ->
    class View
        constructor: () ->
            @_drawableObjects = []
        draw: ->
            for obj in @_drawableObjects
                obj.draw()
)
