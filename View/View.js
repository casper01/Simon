define(function() {
  var View;
  return View = (function() {
    function View() {
      this._drawableObjects = [];
    }

    View.prototype.draw = function() {
      var i, len, obj, ref, results;
      ref = this._drawableObjects;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        results.push(obj.draw());
      }
      return results;
    };

    return View;

  })();
});
