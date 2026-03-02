var ntipsy = 0;
(function($)  {
    $.tipsy = function(sel, tip, cssob = {})  {
        $(sel).mouseenter(function(e)  {
			$('body').append("<span id='tipc" + ntipsy + "' style='position: absolute; top: " + (e.pageY + 20) + "px; left: " + (e.pageX + 12) + "px; opacity: 0; z-index: 9999;'><div id='tip" + ntipsy + "' style='border: 1px solid gray; background: black; color: darkgray; font-size: 2vh; font-family: Segoe UI Light; padding: 0.3vw;'>" + tip + "</div></span>");
			$('#tip' + ntipsy).css(cssob);
			eval("$('#tipc" + ntipsy + "').animate({opacity: 1}, 400);");
			eval("$('" + sel + "').mousemove(function(e)  {$('#tipc" + ntipsy + "').css({left: (e.pageX + 12) + 'px', top: (e.pageY + 20) + 'px'});})");
			eval("$('" + sel + "').mouseleave(function()  {$('#tipc" + ntipsy + "').animate({opacity: 0}, 400, function()  {$('#tipc" + ntipsy + "').remove();});});");
			ntipsy++;
		});
    }
}(jQuery));