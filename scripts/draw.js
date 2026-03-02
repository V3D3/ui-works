var r = 0, c = 0, l = 0;
var sW = window.innerWidth, sH = window.innerHeight;
var scaleX = 1; //50
var scaleY = 1; //50
var X = (t) => t * scaleX;
var Y = (t) => sH - (t * scaleY);
function rect(x, y, width, height, cssob)  {
	$('body').append("<div id='r" + r + "' style='position: absolute; left: " + X(x) + "; top: " + Y(y + height) + "; width: " + width + "; height: " + height + ";'></div>");
	appl('r' + r, cssob);
	r++;
    return 'r' + (r - 1);
}

function circ(cx, cy, radius, cssob)  {
	$('body').append("<div id='c" + c + "' style='position: absolute; left: " + X(cx - radius) + "; top: " + Y(cy + radius) + "; width: " + (2 * radius) + "; height: " + (2 * radius) + "; border-radius: 50%;'></div>");
	appl('c' + c, cssob);
	c++;
    return 'c' + (c - 1);
}

function line(x1, y1, x2, y2, cssob)  {
	var width = Math.sqrt(Math.abs((y2 - y1) * (y2 - y1)) + Math.abs((x2 - x1) * (x2 - x1)));
	$('body').append("<div id='l" + l + "' style='position: absolute; top: " + Y((y1 + y2) / 2) + "; left: " + X(((x1 + x2) / 2) - (width / 2)) + "; height: 1px; width: " + (width) + "; transform: rotateZ(" + (-(Math.atan((y2 - y1) / (x2 - x1)) * (180 / Math.PI))) + "deg);'></div>");
	appl('l' + l, cssob);
	l++;
    return 'l' + (l - 1);
}

function reline(id, xf1, yf1, xf2, yf2, cssob)  {
	var width = Math.sqrt(Math.abs((y2 - y1) * (y2 - y1)) + Math.abs((x2 - x1) * (x2 - x1)));
    $('#' + id).velocity({top: Y((y1 + y2) / 2), left: X(((x1 + x2) / 2) - (width / 2)), width: (width), rotateZ: (-(Math.atan((y2 - y1) / (x2 - x1)) * (180 / Math.PI)))}, 'easeInOutExpo', 800);
}

function appl(id, cssob)  {
	if(cssob.bg != "")  {
		$('#' + id).css({background: cssob.bg});
	}
	if(cssob.border != "")  {
		$('#' + id).css({border: cssob.border});
	}
}

function point(x, y, cssob = {bg: 'orange'})  {
    $('body').append("<div id='p" + p + "' style='position: absolute; top: " + Y(y) + "px; left: " + X(x) + "px; width: 1px; height: 1px;'></div>");
    appl('p' + p, cssob);
    p++;
    return 'p' + (p - 1);
}

function plot(eqn, init, fin, step = 1, cssob = {bg: 'orange'})  {
    fin -= (fin - init) % step;
    if(eqn == 'lnx')  {eqn = x => Math.log(x);}
    if(eqn == 'x^2')  {eqn = x => Math.pow(x, 2);}
    if(eqn == 'e^x')  {eqn = x => Math.pow(Math.E, x);}
    if(eqn == 'sinx')  {eqn = x => Math.sin(x);}
    if(eqn == 'tanx')  {eqn = x => Math.tan(x);}
    if(eqn == 'cosx')  {eqn = x => Math.cos(x);}
    if(eqn == 'x^3')  {eqn = x => Math.pow(x, 3);}
    if(eqn == '|x|')  {eqn = x => Math.abs(x);}
    if(eqn == '1/x')  {eqn = x => 1 / x;}
    if(eqn == '12x + 7')  {eqn = x => 12 * x + 7;}
    for(var i = init; i <= fin; i += step)  {
        point(i, eqn(i), cssob);
    }
}