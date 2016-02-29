points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";

Meteor.startup( function() {
  canvas = new Canvas();
  Session.set("color",strokeColor);
  Session.set("thickness",thickness);
  Session.set("brushType","circle");

  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
      canvas.draw(data,Session.get("brushType"));
    }
  });
});

Template.wall.helpers({
 "selectedColor": function () {
    return Session.get("color");
    },

    "selectedThickness":  function () {
       return Session.get("thickness");
    },
}),

Template.wall.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },

   "click button.save": function (event) {
    Meteor.call('save', function() {
       canvas.save();
    
    });
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "click button.thicker": function () {
    thickness+=1;
    Session.set("thickness",thickness);

  },

  "click button.thinner": function () {    
    if (thickness > 0) {
      thickness-=1;
    }
     Session.set("thickness",thickness);
  },



})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection

        c: strokeColor,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.body.events({
    'click #red': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "red";
      Session.set("color",strokeColor);
    },
    'click #pink': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "pink";
      Session.set("color",strokeColor);
    },
    'click #purple': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "purple";
      Session.set("color",strokeColor);
    },
    'click #deeppurple': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "deeppurple";
      Session.set("color",strokeColor);
    },
    'click #indigo': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "indigo";
      Session.set("color",strokeColor);
    },
    'click #lightblue': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "lightblue";
      Session.set("color",strokeColor);
    },
    'click #cyan': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "cyan";
      Session.set("color",strokeColor);
    },
    'click #teal': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "teal";
      Session.set("color",strokeColor);
    },
     'click #lightgreen': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "lightgreen";
      Session.set("color",strokeColor);
    },
     'click #lime': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "lime";
      Session.set("color",strokeColor);
    },
     'click #lightyellow': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "lightyellow";
      Session.set("color",strokeColor);
    },
     'click #orange': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "orange";
      Session.set("color",strokeColor);
    },
     'click #deeporange': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "deeporange";
      Session.set("color",strokeColor);
    },
     'click #grey': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "grey";
      Session.set("color",strokeColor);
    },
     'click #bluegrey': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "bluegrey";
      Session.set("color",strokeColor);
    },
     'click #brown': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "brown";
      Session.set("color",strokeColor);
    },
     'click #teal': function(e) {
      lastX=0;
      lastY=0;
      strokeColor = "teal";
      Session.set("color",strokeColor);
    },
});

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});

Template.brush_types.events({
    // event handler for when user changes the selected
    // option in the drop down list
    "change .js-select-brush-type":function(event){
      event.preventDefault();
      var value = $(event.target).val();
      console.log(value);
      Session.set("brushType",value);
    }, 

 });  



