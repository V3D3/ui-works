var toastjsidcn = 0;
(function($)  {
    $.toast = function(msg = "Dummy toast!", fcol = "gray", bcol = "black", dur = 2000, id = "toast" + toastjsidcn++)  {
        //var xprclsrw = window.innerWidth;
        //var xprclsrh = window.innerHeight;
        $("body").append("<span id='" + id + "' style='z-index: 999; position: absolute; top: 70%; color: " + fcol + "; background: " + bcol + "; font-family: &quot;Segoe UI Light&quot;; font-size: 3vh; height: 5vh; width: 40%; border-radius: 2.5vh; left: 30%; opacity: 0; line-height: 5vh; text-align: center;'>" + msg + "</span>");
        $("#" + id).animate({opacity: 1}, 500, function()  {
            $("#" + id).delay(dur).animate({opacity: 0}, 1000, function()  {
                $("#" + id).remove();
            });
        });
    }
}(jQuery));