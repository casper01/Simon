define(["jQuery"], function($) {
  var TextBlinker;
  return TextBlinker = (function() {
    function TextBlinker(blinkingObj) {
      this.blinkingObj = blinkingObj;
    }

    TextBlinker.prototype.blinkRed = function() {
      return this.continueBlinkingRed(this.blinkingObj, 1, 0);
    };

    TextBlinker.prototype.continueBlinkingRed = function(time, gbVal) {
      var textBlinker;
      this.blinkingObj.css("color", this.rgbToHex(255, gbVal, gbVal));
      textBlinker = this;
      if (gbVal < 255) {
        return setTimeout((function() {
          return textBlinker.continueBlinkingRed(time, gbVal + 2);
        }), time);
      }
    };

    TextBlinker.prototype.blinkGreen = function() {
      return this.continueBlinkingGreen(this.blinkingObj, 1, 0);
    };

    TextBlinker.prototype.continueBlinkingGreen = function(time, rbVal) {
      var textBlinker;
      this.blinkingObj.css("color", this.rgbToHex(rbVal, 255, rbVal));
      textBlinker = this;
      if (rbVal < 255) {
        return setTimeout((function() {
          return textBlinker.continueBlinkingGreen(time, rbVal + 2);
        }), time);
      }
    };

    TextBlinker.prototype.rgbToHex = function(r, g, b) {
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);
      if (r.length < 2) {
        r = "0" + r;
      }
      if (g.length < 2) {
        g = "0" + g;
      }
      if (b.length < 2) {
        b = "0" + b;
      }
      return "#" + r + g + b;
    };

    return TextBlinker;

  })();
});
