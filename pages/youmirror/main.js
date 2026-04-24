var sH = window.innerHeight;
var estact = false;
var idc = [];
var curr = 0;
var ref = [38,38,40,40,37,39,37,39,66,65,13];
var cres = "144p";
var cbtr = "64k";

$(document).keydown(function(event)  {
    idc[curr++] = event.which;
    for(var i = 0; i < curr; i++)  {
        if(idc[i] != ref[i])  {
            idc = [];
            curr = 0;
            break;
        }  else  {
            if(i == curr - 1)  {
                if(idc.length == ref.length)  {
                    trigger();
                }
            }
        }
    }
});
function trigger()  {
    if(estact == false)  {
        estact = true;
        $("body").velocity({transformPerspective: "600px"}, 0);
        $("body").velocity({rotateY: 90, transformPerspective: "600px", scale: "0.5"}, "easeInExpo", 1500, function()  {
            $("#easterContent").css("z-index", "2");
            $("body").velocity({rotateY: 180, transformPerspective: "600px", scale: "1"}, 1500, "easeOutExpo");
        });
    }
}
function untrigger()  {
    estact = false;
    $("body").delay(250).velocity({transformPerspective: "600px"}, 0);
    $("body").delay(250).velocity({rotateY: 90, transformPerspective: "600px", scale: "0.5"}, "easeInExpo", 1500, function()  {
        $("#easterContent").css("z-index", "0");
        $("body").velocity({rotateY: 0, transformPerspective: "600px", scale: "1"}, 1500, "easeOutExpo");
    });
}
function err(eT)  {
    $("#ylogo").css("animation-duration", "10s");
    $("#errorText").html(eT);
    $("#errorText").css("opacity", "1");
    $("#mainContent").velocity({backgroundColor: "#ff0000"}, 250, function()  {
        $("#mainContent").delay(750).velocity({backgroundColor: "#eeeeee"}, 250, function()  {
            $("#errorText").html("error.");
            $("#errorText").css("opacity", "0");
        });
    });
}
function urlValidate()  {
    $("#ylogo").css("animation-duration", "2s");
    var valid = true;
    var url = $("#urlIn").val();
    if(url == "")  {
        err("invalid URL: enter a URL");
        valid = false;
    }  else  {
	// $.get...
	valid = true;
    }
    if(valid)  {
	renderGrid(["144p", "240p", "360p", "480p", "720p"], ["64k", "128k", "192k"]);
	// $.get("scripts/get_v.php?u=" + url, function(dat, sts)  {
    }
}
$(document).ready(function()  {
    $("#easterClose").mouseenter(function()  {
        $("#easterClose").css("background", "rgba(255, 255, 255, 0.1)");
    });
    $("#easterClose").mouseleave(function()  {
        $("#easterClose").css("background", "transparent");
        $(".cspk").css("background-color", "white");
    });
    $("#easterClose").mousedown(function()  {
        $("#easterClose").css("background", "white");
        $(".cspk").css("background-color", "red");
    });
    $("#easterClose").mouseup(function()  {
        $("#easterClose").css("background", "rgba(255, 255, 255, 0.1)");
        $(".cspk").css("background-color", "white");
        untrigger();
    });
    $("#act").mouseenter(function()  {
        $("#act").css("background", "rgba(255, 0, 0, 0.1)");
    });
    $("#act").mouseleave(function()  {
        $("#act").css("background", "transparent");
    });
    $("#act").mousedown(function()  {
        $("#act").css("background", "red");
    });
    $("#act").mouseup(function()  {
        $("#act").css("background", "rgba(255, 0, 0, 0.1)");
        urlValidate();
    });
    $("#144p, #64k").css("background-color", "white");
});
$(document).ready(function()  {
    $("#ylogobg").delay(500).velocity({top: "33.7%"}, 1000, "easeOutExpo", function()  {
        $("#logo").velocity({top: "-10%"}, 500, "easeInOutExpo");
        $("#urlIn").velocity({top: "80%"}, 500, "easeOutExpo", function()  {
            $("#act").css("top", "80%");
            $("#urlIn").velocity({width: "40%", left: "30%", borderRadius: "2.29vh"}, 1000, "easeInOutExpo");
            $("#act").velocity({top: "90%"}, 1000, "easeInOutExpo");
        });
    });
});
function renderGrid(res, btr)  {
    $("#ylogo").css("animation-duration", "10s");
    for(var i = 0; i < res.length; i++)  {
        $("#" + res[i]).css("opacity", "1");
    }
    for(var i = 0; i < btr.length; i++)  {
        $("#" + btr[i]).css("opacity", "1");
    }
    $("#cover").css("z-index", "4").velocity({opacity: "0.4"}, function()  {
        $("#resGrid").velocity({top: 0}, "easeOutExpo");
        $("#dvideo").delay(400).velocity({top: "75%"}, "easeOutExpo");
        $("#cancel").delay(800).velocity({top: "60%"}, "easeOutExpo");
        $("#daudio").delay(1200).velocity({top: "75%"}, "easeOutExpo");
    });
}



//GRID SELECTION AREA. HARD CODED.

$(document).ready(function()  {
    $(".rGM").mouseenter(function()  {
        if($(this).attr("id") != cres && $(this).attr("id") != cbtr)  {
            $(this).css("background-color", "rgb(255, 128, 128)");
        }
    });
    $(".rGM").mouseleave(function()  {
        if($(this).attr("id") != cres && $(this).attr("id") != cbtr)  {
            $(this).css("background-color", "red");
        }
    });
    $(".rGM").mousedown(function()  {
        var ob = this;
        if($(this).attr("class") == "rGM resM")  {
            $(".resM").css("background-color", "red");
            $(this).css("background-color", "white");
            $("#gridInfo").css("color", ($(this).attr("id") == "144p")?"red":"white");
            cres = $(this).attr("id");
            $("#gridInfo").html($(this).attr("id"));
        }  else  {
            $(".btrM").css("background-color", "red");
            $(this).css("background-color", "white");
            $("#gridInfoX").css("color", ($(this).attr("id") == "64k")?"red":"white");
            cbtr = $(this).attr("id");
            $("#gridInfoX").html($(this).attr("id") + "bps");
        }
    });
    $("#cover").mousedown(function()  {
        $("#dvideo").velocity({top: "150%"}, "easeInExpo");
        $("#cancel").delay(200).velocity({top: "150%"}, "easeInExpo");
        $("#daudio").delay(400).velocity({top: "150%"}, "easeInExpo");
        $("#resGrid").delay(600).velocity({top: "-50%"}, "easeInExpo", function()  {
            $("#cover").velocity({opacity: 0}, function()  {
                $("#cover").css("z-index", "-1");
            });
        });
    });
    $("#dvideo, #daudio").mouseenter(function()  {
        $(this).css("background-color", "rgb(255, 230, 230)");
    });
    $("#dvideo, #daudio").mouseleave(function()  {
        $(this).css("background-color", "white");
        $(this).css("color", "red");
    });
    $("#dvideo, #daudio").mousedown(function()  {
        $(this).css("background-color", "red");
        $(this).css("color", "white");
    });
    $("#dvideo, #daudio").mouseup(function()  {
        $(this).css("background-color", "rgb(255, 230, 230)");
        $(this).css("color", "red");
        $("#ylogo").css("animation-duration", "2s");
        if($(this).attr("id").substring(2) == "video")  {
            
        }  else  {
            
        }
    });
    $("#cancel").mouseenter(function()  {
        $("#cancel").css("background-color", "rgb(255, 30, 30)");
    });
    $("#cancel").mouseleave(function()  {
        $("#cancel").css("background-color", "red");
        $("#cancel").css("color", "white");
    });
    $("#cancel").mousedown(function()  {
        $("#cancel").css("background-color", "white");
        $("#cancel").css("color", "red");
    });
    $("#cancel").mouseup(function()  {
        $("#cancel").css("background-color", "rgb(255, 30, 30)");
        $("#cancel").css("color", "white");
        $("#cover").mousedown();
    });
});
