define(["jQuery"], ($) ->
    class TextBlinker
        constructor: (@blinkingObj) ->
        blinkRed: ->
            this.continueBlinkingRed @blinkingObj, 1, 0
        continueBlinkingRed: (time, gbVal) ->
            @blinkingObj.css("color", this.rgbToHex(255, gbVal, gbVal))
            textBlinker = this
            if gbVal < 255
                setTimeout (-> textBlinker.continueBlinkingRed(time, gbVal+2)), time
        blinkGreen: ->
            this.continueBlinkingGreen @blinkingObj, 1, 0
        continueBlinkingGreen: (time, rbVal) ->
            @blinkingObj.css("color", this.rgbToHex(rbVal, 255, rbVal))
            textBlinker = this
            if rbVal < 255
                setTimeout (-> textBlinker.continueBlinkingGreen(time, rbVal+2)), time
        rgbToHex: (r, g, b) ->
            r = r.toString(16)
            g = g.toString(16)
            b = b.toString(16)
            if r.length < 2
                r = "0" + r
            if g.length < 2
                g = "0" + g
            if b.length < 2
                b = "0" + b
            return "#" + r + g + b
)
