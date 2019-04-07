//https://gist.github.com/rilut/8eb8c76c85f00477329c

$(document).ready(function() {
  // putPixel(300,400, 'red');
    dda(30,100,670,400,"red"); //x0,y0,x1,y1
});

function putPixel(x, y, color) {
  var delayInMilliseconds = 2000; //2 second
  setTimeout(function() {
  //code to be executed after 2 second
	$("body").append('<section class="pixel"></section>');
	$(".pixel:last").css({"left":x,"top":y, "background":color});
  }, delayInMilliseconds);
}


function dda(x0, y0, x1, y1, color){
    const dx = x1 - x0,
          dy = y1 - y0,
          s  = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
          xi = dx * 1.0 / s,
          yi = dy * 1.0 / s

    var x  = x0,
        y  = y0,
        out= []

    out.push({x: x0, y: y0});

    for (var i = 0; i < s; i++) {
      	putPixel(x,y,color);  
        x += xi;
        y += yi;
        out.push({x: x, y: y});

    }
    console.log(out);
    return out
}
