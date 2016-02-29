Canvas = function () {
  var self = this;
  var width=1000;
  var height=400;
  var svg;

  var createSvg = function() {
    svg = d3.select('#canvas').append('svg')
      .attr('width', width)
      .attr('height',height);
  };
  createSvg();

  self.clear = function() {
    d3.select('svg').remove();
    createSvg();
  };

   self.save = function() {
    // Select the first svg element
    var svg = d3.select("svg")[0][0],
        img = new Image(),
        serializer = new XMLSerializer(),
        svgStr = serializer.serializeToString(svg);

    img.src = 'data:image/svg+xml;base64,'+window.btoa(svgStr);

    var canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img,0,0,width,height);

    canvas.toBlob(function(blob) {
       saveAs(blob, "image.png");
      });
  };

  self.draw = function(data,brushType) {
    if (data.length < 1) {
      self.clear();
      return;
    }
    if (svg) {

       // Remember to format the data properly in markPoints to draw a circle - 
       if(brushType=="circle"){
        svg.selectAll('circle').data(data, function(d) { return d._id; })
        .enter().append('circle')
        .attr('r', function (d) { return d.w; })
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr("fill",function (d) { return d.c; });
      }
     else if(brushType=="line"){
          //to draw a line
      svg.selectAll('line').data(data, function(d) { return d._id; })
      .enter().append('line')
      .attr('x1', function (d) { return d.x; })
      .attr('y1', function (d) { return d.y; })
      .attr('x2', function (d) { return d.x1; })
      .attr('y2', function (d) { return d.y1; })
      .attr("stroke-width", function (d) { return d.w; })
      .attr("stroke", function (d) { return d.c; })
      .attr("stroke-linejoin", "round");
    }
    
    console.log(brushType);

    } // end of the if(svg) statement
  }; // end of the canvas.draw function
} //end of the canvas function

