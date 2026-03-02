//structurevars
var sH = window.innerHeight, sW = window.innerWidth;
var h = x => (x / 100) * sH;
var w = x => (x / 100) * sW;

//interfacevars
var estact = false;
var selected = '';
var ura = [];
var tex = [];
var url = '';

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
function err(eT, d = 0)  {
    $("#errorText").html(eT);
    $("#errorText").css({zIndex: 100});
    $("#errorText").delay(d).velocity({opacity: 1}, 250, function()  {
        $("#errorText").delay(750).velocity({opacity: 0}, 250, function()  {
            $("#errorText").html("Critical error. You should not, under any circumstance be seeing this. Reload.");
            $("#errorText").css({zIndex: -1});
        });
    });
}
function urlValidate()  {
    var valid = true;
    url = $("#urlIn").val();
    if(url == "")  {
        err("Enter a URL.");
        valid = false;
        $('#urlIn').focus();
    }  else  {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if(match && match[7].length == 11)  {
            url = match[7];
        }  else  {
            err("Invalid URL.");
            valid = false;
        }
    }
    
    if(valid)  {
        submiturl(url);
    }
}
function submiturl(url)  {
    $.ajax({url: 'ytdl.php', dataType: "text", type: "get", data: {id: url}, success: function(r)  {
            parse(r);
        }
    });
}
function parse(x)  {
    x = x.split('\n');
    ura = [];
    tex = [];
    
    for(var i = 0; i < x.length - 1; i++)  {
        [tex[i], ura[i]] = x[i].split("(evilwa)");
    }
    
    rendercont(tex);
}
$(document).ready(function()  {
    $('#xbg, #xcentel').mouseenter(function()  {
        $('#xcentel').velocity('stop');
        $('#xcentel').velocity({borderRadius: '50%'}, 200, 'easeOutExpo');
    });
    $('#xbg').mouseleave(function()  {
        $('#xcentel').velocity('stop');
        $('#xcentel').velocity({borderRadius: '10px'}, 200, 'easeOutExpo');
    });
    $('#xbg, #xcentel').mousedown(function()  {
        untrigger();
    });
    $("#act").mouseenter(function()  {
        $("#act").css("background", "rgba(255, 0, 0, 0.1)");
        $('#centel').removeClass('arotel');
    });
    $("#act").mouseleave(function()  {
        $("#act").css("background", "transparent");
        $('#centel').addClass('arotel');
    });
    $("#act").mousedown(function()  {
        $("#act").css("background", "red");
    });
    $("#act").mouseup(function()  {
        $("#act").css("background", "rgba(255, 0, 0, 0.1)");
        urlValidate();
    });
    $('#centel').mouseenter(function()  {
        $('#centel').velocity('stop');
        $('#centel').velocity({borderRadius: '50%'}, 200, 'easeOutExpo');
    });
    $('#centel').mouseleave(function()  {
        $('#centel').velocity('stop');
        $('#centel').velocity({borderRadius: '10px'}, 200, 'easeOutExpo');
    });
    $('#centel').mousedown(function()  {
        trigger();
    });
});
$(document).ready(function()  {
    $('#bg').velocity({top: '30%', borderRadius: '50%', transformPerspective: ['600px', '600px'], rotateX: [0, 270], rotateY: [0, 270], rotateZ: [0, 270]}, 1000, 'easeOutExpo');
    $('#centel').delay(800).velocity({top: '46%', borderRadius: '10px', transformPerspective: ['600px', '600px'], rotateX: [0, 270], rotateY: [0, 270], rotateZ: [0, 270]}, 1000, 'easeOutExpo');
//    $('#centel').velocity({top: h(48), height: h(4), width: h(4), left: w(50) - h(2), rotateZ: 180, borderRadius: '10px'}, 1000, 'easeOutExpo');
//    $('#bg').delay(800).velocity({top: h(40), height: h(20), width: h(20), left: w(50) - h(10), rotateZ: 180, borderRadius: '50%'}, 1000, 'easeOutExpo');
    $('#c0').delay(1700).velocity({translateX: ['29.44vh', '100vh'], translateY: ['17vh', '86.6vh']}, 1000, 'easeOutExpo');
    $('#c1').delay(1800).velocity({translateX: ['-29.44vh', '-100vh'], translateY: ['17vh', '86.6vh']}, 1000, 'easeOutExpo');
    $('#c2').delay(1900).velocity({translateY: ['-34vh', '-100vh']}, 1000, 'easeOutExpo', function()  {
//        $('#logo').attr('class', 'rotel');
//        $('#centel').attr('class', 'arotel');
//        $('#logo').velocity({top: '10vh'}, 500, 'easeOutExpo');
//        $("#urlIn").velocity({top: "80%"}, 500, "easeOutExpo", function()  {
//            $("#act").css("top", "80%");
//            $("#urlIn").velocity({width: "40%", left: "30%", borderRadius: "2.29vh"}, 1000, "easeInOutExpo");
//            $("#act").velocity({top: "90%"}, 1000, "easeInOutExpo", function()  {
//                err("Enter a URL.", 500);
//                $('#urlIn').focus();
//                $('#centel').css({top: '48%', height: '4%', width: '4vh', left: 'calc(50% - 2vh)'});
//                $('#bg').css({top: '40%', height: '20%', width: '20vh', left: 'calc(50% - 10vh)'});
//            });
//        });
    });
});
function rendercont(data)  {
    $('#lscont').html("");
    for(var i = 0; i < data.length; i++)  {
        $('#lscont').append("<span id='lsop" + i + "' class='lsop' style='position: absolute; top: " + (5 + 12*i) + "vh; left: 5%; width: 90%; height: 8vh; color: #eee; border: 2px solid #eee; box-shadow: 0 0 20px #eee; font-size: 4vh; line-height: 8vh; text-align: center; font-family: Segoe UI Light; font-variant: petite-caps;'>" + data[i] + "</span>");
    }
    selected = 'lsop' + (data.length - 1);
    $('#' + selected).css({boxShadow: '0 0 0 #eee', backgroundColor: '#eee', color: 'red'});
    $('#lscont').append("<span id='context' style='position: absolute; top: " + (13 + 12 * (data.length - 1)) + "vh; left: 0; width: 100%; height: 5%;'></span>")
    $('.lsop').mouseenter(function()  {
        if($(this).css('color') != 'rgb(255, 0, 0)')  {
            $(this).velocity({opacity: 0.8}, 200);
        }
    });
    $('.lsop').mouseleave(function()  {
        if($(this).css('color') != 'rgb(255, 0, 0)')  {
            $(this).velocity({opacity: 1}, 200);
        }
    });
    $('.lsop').mousedown(function()  {
        if($(this).css('color') != 'rgb(255, 0, 0)')  {
            $('.lsop').not(this).velocity({boxShadowBlur: '20px', backgroundColor: '#ff0000', color: '#eeeeee'}, 500, 'easeOutExpo');
            $(this).velocity({boxShadowBlur: '0px', color: '#ff0000', backgroundColor: '#eeeeee', opacity: 1}, 500, 'easeOutExpo');
            selected = $(this).attr('id');
        }
    });
    $('#logo, #urlIn, #act').velocity({blur: 5});
    $("#cover").css("z-index", "4").velocity({opacity: "0.4"}, function()  {
        $("#lscont").velocity({top: 0}, "easeOutExpo");
        $("#daudio").delay(400).velocity({top: "85%"}, "easeOutExpo");
        $("#dvideo").delay(800).velocity({top: "85%"}, "easeOutExpo");
        $("#cancel").delay(1200).velocity({top: "85%"}, "easeOutExpo");
    });
}
$(document).ready(function()  {
    $("#cover").mousedown(function()  {
        $("#daudio").velocity({top: "150%"}, "easeInExpo");
        $("#dvideo").delay(200).velocity({top: "150%"}, "easeInExpo");
        $("#cancel").delay(400).velocity({top: "150%"}, "easeInExpo");
        $("#lscont").delay(600).velocity({top: "-100%"}, "easeInExpo", function()  {
            $('#logo, #urlIn, #act').velocity({blur: 0});
            $("#cover").velocity({opacity: 0}, function()  {
                $("#cover").css("z-index", "-1");
            });
        });
    });
    $("#dvideo, #daudio").mouseenter(function()  {
        $(this).css("background-color", "rgb(255, 220, 220)");
    });
    $("#dvideo, #daudio").mouseleave(function()  {
        $(this).css("background-color", "#eee");
        $(this).css("color", "red");
    });
    $("#dvideo, #daudio").mousedown(function()  {
        $(this).css("background-color", "red");
        $(this).css("color", "#eee");
    });
    $("#dvideo").mouseup(function()  {
        $(this).css("background-color", "rgb(255, 220, 220)");
        $(this).css("color", "red");
        window.open(ura[+selected.split('lsop')[1]]);
    });
    $("#daudio").mouseup(function()  {
        $(this).css("background-color", "rgb(255, 220, 220)");
        $(this).css("color", "red");
        window.open("http://ytdl.stream:9090/aud_dl/" + url);
    });
    $("#cancel").mouseenter(function()  {
        $("#cancel").css("background-color", "rgb(255, 30, 30)");
    });
    $("#cancel").mouseleave(function()  {
        $("#cancel").css("background-color", "red");
        $("#cancel").css("color", "#eee");
    });
    $("#cancel").mousedown(function()  {
        $("#cancel").css("background-color", "#eee");
        $("#cancel").css("color", "red");
    });
    $("#cancel").mouseup(function()  {
        $("#cancel").css("background-color", "rgb(255, 30, 30)");
        $("#cancel").css("color", "#eee");
        $("#cover").mousedown();
    });
});