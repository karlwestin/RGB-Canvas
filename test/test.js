// Tests for Canvas library:
//
//
//

module("RGBCanvas", {

    setup: function() {
        this.can = new RGBCanvas("jpeg.jpeg");
    },

    teardown: function() {
       document.body.removeChild(document.querySelector("canvas"));
    }

});

test("init", function() {
        var canvas = document.querySelectorAll("canvas");
        equal(canvas.length, 1, "should create exactly one canvas element");
        asyncTest("Adapting to image", function() {
            setTimeout(function() {
                equal(canvas[0].width, 700, "Adapting width");
                equal(canvas[0].height, 555, "Adapting height");
                start();
            }, 10);
        });
});
