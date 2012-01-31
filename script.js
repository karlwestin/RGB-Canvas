var rgbcanvas = {

  init: function(canvas, url) {
      this.ctx = canvas.getContext("2d");
      this.img = document.createElement("image");
      this.pixels = []; 
      var that = this;
    
      this.img.src = url;
      this.img.onload = function() {
        that.ctx.drawImage(this, 0, 0);
        that.pixels = that.readPixels(this);
      }    
  },

  
  readPixels: function(image) {
     var testCan = document.createElement("canvas");
     testCan.width = image.width;
     testCan.height = image.height;
     var testCon = testCan.getContext("2d");
     testCon.drawImage(image, 0, 0);
     return testCon.getImageData(0, 0, image.width, image.height).data;
  },
  
  separateRGB: function(data) {
       var r = [], b = [], g = [];
       for(var i = 0; i < data.length; i += 4) {
          r.push(data[i]);
          g.push(data[i + 1]);
          b.push(data[i + 2]);
       }
       return {r:r, g:g, b:b}
  },
  
  transformRGB: function(config) {
        config = {
          r:        config.r || false,
          rOffset:  config.rOffset || 0,
          g:        config.g || false,
          gOffset:  config.gOffset || 0,
          b:        config.b || false,
          bOffset:  config.bOffset || 0,
          data:     config.data
        }
        
        var newData = rgbcanvas.ctx.createImageData(700, 555);
        newData.data = config.data;
        
        var x = 0;
        for(var i = 0; i < config.data.length; i+=4) {
          newData.data[i] = (config.r) ?
            config.r(config.data[i + 4*config.rOffset])   :
            config.data[i] ;
             
          newData.data[i+1] = (config.g) ?
            config.g(config.data[i+1 + 4*config.gOffset]) :
            config.data[i+1]

          newData.data[i+2] = (config.b) ?
            config.b(config.data[i+2 + 4*config.bOffset]) :
            config.data[i+2]

          newData.data[i+3]     = 255;
        }
        return newData;   
  },
  
};


 // Iterating functions

 function sineWave(wavepos) {
    // returns a value betwwen 0 and 1. "Starts" at 0.5
    // to start with 0, pass in 90
    return Math.sin(degToRad(wavepos))/2 + 0.5;

    function degToRad(v) {
      return Math.round((v * Math.PI/180) * 1000)/1000;
    }
 }
