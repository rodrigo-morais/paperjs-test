'use strict';

var canvas,
    element,
    tools,
    freeHand;

var configCanvas = function(){
  var height = window.innerHeight * 0.9,
      top = window.innerHeight * 0.15,
      width = window.innerWidth;

  canvas = document.getElementById('draw-area')

  $(canvas)
    .css('backgroundColor', '#000000')
    .height(height)
    .width(width);

  paper.setup(canvas);

  tools = new Tool();

  tools.onMouseDown = function(event){
    if(element === undefined){
      if (freeHand) {
        freeHand.selected = false;
      }

      freeHand = new Path({
        segments: [event.point],
        strokeColor: '#FFFFFF',
        strokeWidth: 10
      });
    }
  }

  tools.onMouseDrag = function (event) {
    if(element === undefined){
      freeHand.add(event.point);
    }
    else{
      element.position = event.point;
    }
  }

  tools.onMouseUp = function(event){
    if(element === undefined){
      freeHand.simplify(20);
      frehand.closed = true;
    }
    else{
      element = undefined;
    }
  }
};

var createElement = function(){
  var type = $('#type').val(),
      left = $('#left').val(),
      top = $('#top').val(),
      color = $('#color').val(),
      edge = $('#edge').val(),
      radius = $('#radius').val(),
      width = $('#width').val(),
      height = $('#height').val();

  if(type === 'Circle'){
    drawCircle(parseInt(radius), parseInt(left), parseInt(top), color, edge);
  }
  else if(type === 'Rectangle'){
    drawRectangle(parseInt(width), parseInt(height), parseInt(left), parseInt(top), color, edge);
  }
};

var drawCircle = function(radius, left, top, backcolor, edge){
  var circle;
  
  circle = new Path.Circle({
    radius: radius,
    fillColor: backcolor,
    strokeColor: edge,
    x: left,
    y: top
  });

  circle.onMouseDown = function(event) {
    element = this;
  };

  circle.onMouseUp = function(event) {
    element = undefined;
  };
};

var drawRectangle = function(width, height, left, top, backcolor, edge){
  var rectangle, path;
  
  rectangle = new Rectangle({
    width: width,
    height: height,
    x: left,
    y: top
  });

  path = new Path.Rectangle(rectangle);
  path.fillColor = backcolor;
  path.strokeColor = edge;

  path.onMouseDown = function(event) {
    element = this;
  };

  path.onMouseUp = function(event) {
    element = undefined;
  };
};


$('#color, #edge')
  .css('backgroundColor', '#FF0000');

$('button').on('click', function(e){
  e.preventDefault();

  createElement();
});

$('#color, #edge').change(function() {
    $(this)
      .css(
          'backgroundColor',
          $(this)
            .find('option:selected')
            .css('backgroundColor')
      );
});

$('#type').change(function() {
  if($(this).val() === 'Circle'){
    $('.circle').css('display', 'inline-block');
    $('.rectangle').css('display', 'none');
  }
  else
  {
    $('.circle').css('display', 'none');
    $('.rectangle').css('display', 'inline-block');
  }
});

$('.circle').css('display', 'inline-block');
$('.rectangle').css('display', 'none');

paper.install(window);
configCanvas();