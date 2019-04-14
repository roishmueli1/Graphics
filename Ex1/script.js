//https://gist.github.com/rilut/8eb8c76c85f00477329c

let numOfClicks = 0;
let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;

let x3 = x4 = y3 = y4 = 0 //only for Curve
let numOfCurveLines = 20;

// -----------------------------------LINE---------------------------------------
function Line(x1, y1, x2, y2, color){
    const dx = x2 - x1,
          dy = y2 - y1,
          s  = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
          xi = dx * 1.0 / s,
          yi = dy * 1.0 / s

    var x  = x1,
        y  = y1,
        out= []

    out.push({x: x1, y: y1});

    for (var i = 0; i < s; i++) {
      	putPixel(x,y,color);
        x += xi;
        y += yi;
        out.push({x: x, y: y});
    }
    console.log(out);
    return out
}

function drawLine() {
	console.log("drawLine");
  numOfClicks = 0;
  shape = 'drawLine'
}

function putPixel(x, y, color) {
  var delayInMilliseconds = 2000; //2 second
  setTimeout(function() {
  //code to be executed after 2 second
	$("body").append('<section class="pixel"></section>');
	$(".pixel:last").css({"left":x,"top":y, "background":color});
  }, delayInMilliseconds);
}

// ---------------------------------------CIRCLE-------------------------------
function Circle(x1, y1, x2, y2, color) {
	var x=0;
	var a=Math.pow(Math.abs(x1-x2),2)+Math.pow(Math.abs(y1-y2),2);
	var y=r= Math.sqrt(a);

	var p=3-(2*r);
	while(x<y) {
		setPixel(x1,y1,x,y,color);
		if(p<0)
			p=p+(4*x)+6;
		else {
			p=p+(4*(x-y))+10;
			y=y-1;
		}
		x=x+1;
	}

}

function setPixel(x1 ,y1 ,x, y, color) {
	putPixel(x1+x, y1+y, color);
	putPixel(x1-x, y1+y, color);

	putPixel(x1+x, y1-y, color);
	putPixel(x1-x, y1-y, color);

	putPixel(x1+y, y1+x, color);
	putPixel(x1-y, y1+x, color);

	putPixel(x1+y, y1-x, color);
	putPixel(x1-y, y1-x, color);
}

function drawCircle() {
	console.log("drawCircle");
	numOfClicks = 0;
  shape = 'drawCircle'
}
// ---------------------------------------Curve-------------------------------
function Curve(x1, y1, x2, y2, x3, y3, x4, y4, color) {

	var ax = -x1+(3*x2)-(3*x3)+x4;
	var bx = (3*x1)-(6*x2)+(3*x3);
	var cx = -(3*x1)+(3*x2);
	var dx = x1;

	var ay = -y1+(3*y2)-(3*y3)+y4;
	var by = (3*y1)-(6*y2)+(3*y3);
	var cy = -(3*y1)+(3*y2);
	var dy = y1;

	var xc = x1;
	var yc = y1;

	for(var t=0.0; t<=1; t=t+(1/numOfCurveLines)) {
		var x = parseInt((ax*Math.pow(t,3))+(bx*Math.pow(t,2))+(cx*t)+dx);
		var y = parseInt((ay*Math.pow(t,3))+(by*Math.pow(t,2))+(cy*t)+dy);

		Line(xc, yc, x, y, color);

		xc=x;
		yc=y;
	}
}

function drawCurve() {
	console.log("drawCurve");
	linesCurve = $('#numOfLines').val();
	numOfClicks = 0;
	shape = 'drawCurve'
}

// --------------------------------Global varible---------------------------
let shape = true;

// ------------------------------------MOUSE FUNCTION----------------------
function onClick(e) {

  switch (shape) {
    case 'drawLine':
    	numOfClicks += 1;
    	if (numOfClicks == 1) {
    		x1 = e.clientX;
    		y1 = e.clientY;
    	} else if (numOfClicks == 2) {
    			x2 = e.clientX;
    			y2 = e.clientY;
    			Line(x1, y1, x2, y2, "yellow");
    			numOfClicks = 0;
    			x1 = x2 = y1 = y2 = 0;
    	}
      break;
      case 'drawCircle':
      	numOfClicks += 1;
      	if (numOfClicks == 1) {
      		x1 = e.clientX;
      		y1 = e.clientY;
      	} else if (numOfClicks == 2) {
      			x2 = e.clientX;
      			y2 = e.clientY;
      			Circle(x1, y1, x2, y2, "green");
      			numOfClicks = 0;
      			x1 = x2 = y1 = y2 = 0;
      	}
        break;
        case 'drawCurve':
          numOfClicks += 1;
      		if(numOfClicks == 1) {
      			x1 = e.clientX;
      			y1 = e.clientY;
      		} else if (numOfClicks == 2) {
      			x2 = e.clientX;
      			y2 = e.clientY;
      		} else if (numOfClicks == 3) {
      			x3 = e.clientX;
      			y3 = e.clientY;
      		} else if (numOfClicks == 4) {
      			x4 = e.clientX;
      			y4 = e.clientY;
      			Curve(x1, y1, x2, y2, x3, y3, x4, y4, "red");
      			numOfClicks = 0;
      			x1 = x2 = x3 = x4 = y1 = y2 = y3 = y4 = 0;
      		}
  }
}
