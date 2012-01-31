RGBCanvas
=====

Tool for real-time manipulation of images on canvas

API
---

Images can be passed as a string  

    var img = new RGBCanvas("image.jpg")  

They can also be passed as elements (i think)

    var canvases = [],
        images = document.querySelectorAll("img");
    Array.prototype.forEach.call(images, function(img) {
        canvases.push(new RGBCanvas(img));
    }

Effects
-----

There are a couple of demos in the "demos" folder. Basically, all the action
goes through the RGBCanvas.transformRGB function, and are then drawn back on
the canvas using the canvas.getContext("2d").putImageData(data, x, y) methods

An example of animating the image can be seen in the "offset green channel"
demo. You can slo use this to offset the entire image.

Promise
----

I promise that i will put up more demos while building them.

Cheers.


