(function($)  {
    $.protect = function()  {
        var xprclsrw = window.innerWidth;
        var xprclsrh = window.innerHeight;
        $(window).resize(chk);
        function chk()  {
            if(window.innerHeight != xprclsrh || window.innerWidth != xprclsrw)  {
                document.write("<body style='background-color:black'><span style='position:absolute;top:0;left:0;width:100%;height:100%;color:orange;font-family:Segoe UI Light;line-height:100vh;text-align:center;font-size:15vh'>Page destroyed.</span></body>");
            }
        }
    }
}(jQuery));