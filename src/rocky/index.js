var rocky = require('rocky');

function fractionToRadian(fraction)
{
  return fraction * 2 * Math.PI;
}

// Draw the hour hand
function drawHourHand(ctx, cx, cy, angle, length, color)
{
  // Initialize variables
  var offset_x = Math.sin(angle) * length; 
  var offset_y = Math.cos(angle) * length;
  
  // Beginning x and y coordinates of the hour hand
  var x1 = cx + offset_x * 0.25;
  var y1 = cy - offset_y * 0.25;
  
  // Ending x and y coordinates of the hour hand
  var x2 = cx + offset_x;
  var y2 = cy - offset_y;
 
  // Configure how we want to draw the hand
  ctx.lineWidth = 9;
  ctx.strokeStyle = color;
  
  // Draw the hour hand
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  
  // Draw the small connection from the center to the hour hand
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  
  // Draw the circle in the center
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 11;
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy);
  ctx.stroke();
}

function drawMinuteHand(ctx, cx, cy, angle, length, color)
{
  // Initialize variables
  var offset_x = Math.sin(angle) * length * 0.95; 
  var offset_y = Math.cos(angle) * length * 0.95;
  
  // Beginning x and y coordinates of the minute hand
  var x1 = cx + offset_x * 0.19;
  var y1 = cy - offset_y * 0.19;
  
  // Ending x and y coordinates of the minute hand
  var x2 = cx + offset_x;
  var y2 = cy - offset_y;
  
  // Draw white line around the minute hand
  // (To emphasize it against the hour hand & markers)
  ctx.beginPath();
  ctx.lineWidth = 8.6;
  ctx.strokeStyle = "white";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 + offset_x * 0.01, y2 - offset_y * 0.01);
  ctx.stroke();
 
  
  // Draw the minute hand
  ctx.lineWidth = 8;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Draw a white circle in the center
  // (to emphasize against the hour hand circle)
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 8.4;
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy);
  ctx.stroke();
  
  // Draw the small connection from the center to the minute hand
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.moveTo(cx, cy);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  
  // Draw the minute marker circle in the center
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 7;
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy);
  ctx.stroke();
  
  // Draw a white circle in the center
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3.5;
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy);
  ctx.stroke();
}

function drawHourMarkers(ctx, max_x, max_y, color)
{
  // Initalize variables
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = color;
  var length_1 = (Math.min(max_x, max_y)) / 2;
  var length_2 = length_1 * 0.80;
  var angle, x2, y2; 
  var x1 = max_x / 2;
  var y1 = max_y / 2;
  
  // Draw hour markers
  ctx.beginPath();
  
  // For loop going through every hour
  for (var i = 1; i <=12; i++)
    {
      // Set angle for marker
      angle = fractionToRadian(i/12);
      // Starting coordinates of the marker
      x2 = x1 + Math.sin(angle) * length_1 * 0.9;
      y2 = y1 - Math.cos(angle) * length_1 * 0.9;
      ctx.moveTo(x2, y2);
      // Ending coordinates of the marker
      x2 = x1 + Math.sin(angle) * length_2 * 0.9;
      y2 = y1 - Math.cos(angle) * length_2 * 0.9;
      ctx.lineTo(x2, y2); 
    }
  
  ctx.stroke();
}

function drawMinuteMarkers(ctx, max_x, max_y, color)
{
  // Initalize variables
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = color;
  var length_1 = (Math.min(max_x, max_y)) / 2;
  var length_2 = length_1 * 0.9;
  var angle, x2, y2;
  var x1 = max_x / 2;
  var y1 = max_y / 2;
  
  // Draw minute markers
  ctx.beginPath();
  
  // For loop going through every hour
  for (var i = 1; i <=60; i++)
    {
      // Set angle for the marker
      angle = fractionToRadian(i/60);
      // Starting coordinates of the marker
      x2 = x1 + Math.sin(angle) * length_1 * 0.9;
      y2 = y1 - Math.cos(angle) * length_1 * 0.9;
      ctx.moveTo(x2, y2);
      // Ending coordinates of the marker
      x2 = x1 + Math.sin(angle) * length_2 * 0.95;
      y2 = y1 - Math.cos(angle) * length_2 * 0.95;
      ctx.lineTo(x2, y2); 
    }
  
  ctx.stroke();
}

function drawDate(ctx, max_x, max_y, date, color)
{
  // Initalize variables
  var days = ["So", "Mon", "Die", "Mi", "Do", "Fr", "Sa"];
  var months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    
  // Align the text
  ctx.textAlign = 'center';
  
  // Display Day
  ctx.fillStyle = "blue";
  ctx.font = "14px Gothic";
  ctx.fillText( days[date.getDay()], max_x * 0.7, max_y * 0.36);
  
  // Display Date of Day
  ctx.fillStyle = "black";
  ctx.font = "14px bold Gothic";
  ctx.fillText( date.getDate(), max_x * 0.7, max_y * 0.445);
  
  // Display Month
  ctx.fillStyle = "blue";
  ctx.font = "14px Gothic";
  ctx.fillText( months[date.getMonth()], max_x * 0.7, max_y * 0.53);
}

rocky.on('draw', function(event)
        {
          // Initalize variables
          var ctx = event.context;
          var d = new Date();
          
          // Clear the screen
          ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
          
          // Determine the width and height of the display
          var w = ctx.canvas.unobstructedWidth;
          var h = ctx.canvas.unobstructedHeight;
          
          // Set background color to white
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
          
          // Determine the center point of the display
          // and the max size of the watch hands (-20 offset)
          var cx = w / 2;
          var cy = h / 2;
          
          var maxLength = (Math.min(w, h) - 20) / 2;
          
          // Calculate angle for the minute hand
          var minuteFraction = (d.getMinutes()) / 60;
          var minuteAngle = fractionToRadian(minuteFraction);
          
          // Calculate angle for the hour hand
          //var hourFraction = (d.getHours() % 12 + minuteFraction) / 12;
          var hourAngle = fractionToRadian((d.getHours() % 12 + minuteFraction) / 12);
          
          // Draw the date
          drawDate(ctx, w, h, d, "black");
          
          // Draw the minute markers
          drawMinuteMarkers(ctx, w, h, "grey");
          
          // Draw the hour markers
          drawHourMarkers(ctx, w, h, "black");
          
          // Draw the hour hand
          drawHourHand(ctx, cx, cy, hourAngle, maxLength * 0.65, "blue");
          
          // Draw the minute hand
          drawMinuteHand(ctx, cx, cy, minuteAngle, maxLength * 0.89, "black");
        });

rocky.on('minutechange', function(event)
         {          
           // Request redraw
           rocky.requestDraw();
         });

rocky.on('postmessagedisconnected', function(event)
         {
           rocky.requestDraw();
         });