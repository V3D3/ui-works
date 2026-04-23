var bgCol_pre, foreCol_pre, highlightCol_pre, highlightCol_post;
updatCol();
function updatCol()  {
	$(document).ready(function()  {
		switch(localStorage.getItem("theme"))  {
			case "standard":
				bgCol_pre = "rgb(0, 0, 0)";
				foreCol_pre = "rgb(30, 144, 255)";
				highlightCol_pre = "rgb(20, 20, 20)";
				highlightCol_post = "rgb(50, 164, 255)";
			break;
			case "light":
				bgCol_pre = "rgb(255, 255, 255)";
				foreCol_pre = "rgb(30, 144, 255)";
				highlightCol_pre = "rgb(235, 235, 235)";
				highlightCol_post = "rgb(50, 164, 255)";
			break;
			case "dark":
				bgCol_pre = "rgb(0, 0, 0)";
				foreCol_pre = "rgb(255, 165, 0)";
				highlightCol_pre = "rgb(20, 20, 20)";
				highlightCol_post = "rgb(255, 185, 20)";
			break;
		}
	});
}

$(document).ready(function()  {
	$("#proceedButton").mouseenter(function()  {
		$("#proceedButton").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#proceedButton").mouseleave(function()  {
		$("#proceedButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#proceedButton").mousedown(function()  {
		$("#proceedButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#proceedButton").mouseup(function()  {
		$("#proceedButton").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#continueButton").mouseenter(function()  {
		$("#continueButton").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#continueButton").mouseleave(function()  {
		$("#continueButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#continueButton").mousedown(function()  {
		$("#continueButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#continueButton").mouseup(function()  {
		$("#continueButton").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#skipIntroButton").mouseenter(function()  {
		$("#skipIntroButton").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#skipIntroButton").mouseleave(function()  {
		$("#skipIntroButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#skipIntroButton").mousedown(function()  {
		$("#skipIntroButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#skipIntroButton").mouseup(function()  {
		$("#skipIntroButton").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#yeahButton").mouseenter(function()  {
		$("#yeahButton").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#yeahButton").mouseleave(function()  {
		$("#yeahButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#yeahButton").mousedown(function()  {
		$("#yeahButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#yeahButton").mouseup(function()  {
		$("#yeahButton").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#continue2Button").mouseenter(function()  {
		$("#continue2Button").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#continue2Button").mouseleave(function()  {
		$("#continue2Button").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#continue2Button").mousedown(function()  {
		$("#continue2Button").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#continue2Button").mouseup(function()  {
		$("#continue2Button").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#continue3Button").mouseenter(function()  {
		$("#continue3Button").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#continue3Button").mouseleave(function()  {
		$("#continue3Button").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#continue3Button").mousedown(function()  {
		$("#continue3Button").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#continue3Button").mouseup(function()  {
		$("#continue3Button").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
	$("#projectsButton").mouseenter(function()  {
		$("#projectsButton").animate({backgroundColor: highlightCol_post}, 150);
	});
	$("#projectsButton").mouseleave(function()  {
		$("#projectsButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#projectsButton").mousedown(function()  {
		$("#projectsButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#projectsButton").mouseup(function()  {
		$("#projectsButton").animate({backgroundColor: highlightCol_post, color: bgCol_pre}, 150);
	});
	$("#latestButton").mouseenter(function()  {
		$("#latestButton").animate({backgroundColor: highlightCol_post}, 150);
	});
	$("#latestButton").mouseleave(function()  {
		$("#latestButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#latestButton").mousedown(function()  {
		$("#latestButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#latestButton").mouseup(function()  {
		$("#latestButton").animate({backgroundColor: highlightCol_post, color: bgCol_pre}, 150);
	});
	$("#writingsButton").mouseenter(function()  {
		$("#writingsButton").animate({backgroundColor: highlightCol_post}, 150);
	});
	$("#writingsButton").mouseleave(function()  {
		$("#writingsButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#writingsButton").mousedown(function()  {
		$("#writingsButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#writingsButton").mouseup(function()  {
		$("#writingsButton").animate({backgroundColor: highlightCol_post, color: bgCol_pre}, 150);
	});
	$("#updatesButton").mouseenter(function()  {
		$("#updatesButton").animate({backgroundColor: highlightCol_post}, 150);
	});
	$("#updatesButton").mouseleave(function()  {
		$("#updatesButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#updatesButton").mousedown(function()  {
		$("#updatesButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#updatesButton").mouseup(function()  {
		$("#updatesButton").animate({backgroundColor: highlightCol_post, color: bgCol_pre}, 150);
	});
	$("#conceptsButton").mouseenter(function()  {
		$("#conceptsButton").animate({backgroundColor: highlightCol_post}, 150);
	});
	$("#conceptsButton").mouseleave(function()  {
		$("#conceptsButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#conceptsButton").mousedown(function()  {
		$("#conceptsButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#conceptsButton").mouseup(function()  {
		$("#conceptsButton").animate({backgroundColor: highlightCol_post, color: bgCol_pre}, 150);
	});
	$("#viewResumeButton").mouseenter(function()  {
		$("#viewResumeButton").animate({backgroundColor: highlightCol_pre}, 150);
	});
	$("#viewResumeButton").mouseleave(function()  {
		$("#viewResumeButton").animate({backgroundColor: bgCol_pre, color: foreCol_pre}, 150);
	});
	$("#viewResumeButton").mousedown(function()  {
		$("#viewResumeButton").animate({backgroundColor: foreCol_pre, color: bgCol_pre}, 150);
	});
	$("#viewResumeButton").mouseup(function()  {
		$("#viewResumeButton").animate({backgroundColor: highlightCol_pre, color: foreCol_pre}, 150);
	});
    $("#appearanceTab").mousedown(function()  {
		$("#appearanceTab").animate({backgroundColor: foreCol, color: bgCol});
	});
	$("#appearanceTab").mouseenter(function()  {
		if(selectedNav != 1)  {
			$("#appearanceTab").animate({backgroundColor: highlightCol}, 100);
		}
	});
	$("#appearanceTab").mouseleave(function()  {
		if(selectedNav != 1)  {
			$("#appearanceTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
		}
	});
    $("#dockTab").mousedown(function()  {
	   $("#dockTab").animate({backgroundColor: foreCol, color: bgCol});
    });
    $("#dockTab").mouseenter(function()  {
        if(selectedNav != 2)  {
            $("#dockTab").animate({backgroundColor: highlightCol}, 100);
	   }
    });
    $("#dockTab").mouseleave(function()  {
	   if(selectedNav != 2)  {
           $("#dockTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
	   }
    });
    $("#dataTab").mousedown(function()  {
        $("#dataTab").animate({backgroundColor: foreCol, color: bgCol});
    });
	$("#dataTab").mouseenter(function()  {
		if(selectedNav != 3)  {
			$("#dataTab").animate({backgroundColor: highlightCol}, 100);
		}
	});
	$("#dataTab").mouseleave(function()  {
		if(selectedNav != 3)  {
			$("#dataTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
		}
	});
    $("#animationsTab").mousedown(function()  {
		$("#animationsTab").animate({backgroundColor: foreCol, color: bgCol});
	});
	$("#animationsTab").mouseenter(function()  {
		if(selectedNav != 4)  {
			$("#animationsTab").animate({backgroundColor: highlightCol}, 100);
		}
	});
	$("#animationsTab").mouseleave(function()  {
		if(selectedNav != 4)  {
			$("#animationsTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
		}
	});
    $("#supportTab").mousedown(function()  {
		$("#supportTab").animate({backgroundColor: foreCol, color: bgCol});
	});
	$("#supportTab").mouseenter(function()  {
		if(selectedNav != 5)  {
			$("#supportTab").animate({backgroundColor: highlightCol}, 100);
		}
	});
	$("#supportTab").mouseleave(function()  {
		if(selectedNav != 5)  {
			$("#supportTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
		}
    });
    $("#backTab").mousedown(function()  {
		$("#backTab").animate({backgroundColor: foreCol, color: bgCol});
	});
	$("#backTab").mouseenter(function()  {
		if(selectedNav != 6)  {
			$("#backTab").animate({backgroundColor: highlightCol}, 100);
		}
	});
	$("#backTab").mouseleave(function()  {
		if(selectedNav != 6)  {
			$("#backTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
		}
	});
    $("#meTab").mousedown(function()  {
        $("#meTab").animate({backgroundColor: foreCol, color: bgCol});
    });
    $("#meTab").mouseenter(function()  {
        if(selectedNav != 1)  {
            $("#meTab").animate({backgroundColor: highlightCol}, 100);
        }
    });
    $("#meTab").mouseleave(function()  {
        if(selectedNav != 1)  {
            $("#meTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
        }
    });
    $("#resumeTab").mousedown(function()  {
        $("#resumeTab").animate({backgroundColor: foreCol, color: bgCol});
    });
    $("#resumeTab").mouseenter(function()  {
        if(selectedNav != 2)  {
            $("#resumeTab").animate({backgroundColor: highlightCol}, 100);
        }
    });
    $("#resumeTab").mouseleave(function()  {
        if(selectedNav != 2)  {
            $("#resumeTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
        }
    });
    $("#stuffTab").mousedown(function()  {
        $("#stuffTab").animate({backgroundColor: foreCol, color: bgCol});
    });
    $("#stuffTab").mouseenter(function()  {
        if(selectedNav != 3)  {
            $("#stuffTab").animate({backgroundColor: highlightCol}, 100);
        }
    });
    $("#stuffTab").mouseleave(function()  {
        if(selectedNav != 3)  {
            $("#stuffTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
        }
    });
    $("#contactTab").mousedown(function()  {
        $("#contactTab").animate({backgroundColor: foreCol, color: bgCol});
    });
    $("#contactTab").mouseenter(function()  {
        if(selectedNav != 4)  {
            $("#contactTab").animate({backgroundColor: highlightCol}, 100);
        }
    });
    $("#contactTab").mouseleave(function()  {
        if(selectedNav != 4)  {
            $("#contactTab").animate({backgroundColor: bgCol, color: foreCol}, 200);
        }
    });
});