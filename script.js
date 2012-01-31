var RGBCanvas = function(imgEl, el) {

      el || (el = document.body);
      if (typeof imgEl === "string")
          loadImage(imgEl, startShit);
      else
          startShit(imgEl);
      
      var canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d"),
          pixels = [],
          img;

      el.appendChild(canvas);

      function loadImage(url, callback) {
          img = document.createElement("image");
          img.src = url;
          img.onload = function() { callback(this) }; 
      }

      function startShit(imgEl) {
        img || (img = imgEl);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }

      function readPixels (image) {
         return ctx.getImageData(0, 0, img.width, img.height).data;
      }

  return {
      
  ctx: ctx,

  readPixels: readPixels,
    
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
        
        var newData = ctx.createImageData(700, 555);
        newData.data = config.data;
        
        var x = 0;
        for(var i = 0; i < config.data.length; i+=4) {
          newData.data[i] = (config.r) ?
            config.r(config.data[i + 4*config.rOffset])   :
            config.data[i];
             
          newData.data[i+1] = (config.g) ?
            config.g(config.data[i+1 + 4*config.gOffset]) :
            config.data[i+1];

          newData.data[i+2] = (config.b) ?
            config.b(config.data[i+2 + 4*config.bOffset]) :
            config.data[i+2];

          newData.data[i+3]     = 255; // Alpha
        }
        return newData;   
  },

  };
  
};

