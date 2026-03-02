var choice = 0;
            $(document).ready(function()  {
                $("#left").mouseenter(function()  {
                    if(choice == 0)  {
                        $("#left").css("z-index", "5");
                        $("#info_l").animate({boxShadow: "0px 0px 50px black"}, 100);
                        $("#left").animate({boxShadow: "0px 0px 50px black", fontSize: "52px", width: "51%"}, 100);
                    }
                });
                $("#left").mouseleave(function()  {
                    if(choice == 0)  {
                        $("#info_l").animate({boxShadow: "0px 0px 100px black"}, 100);
                        $("#left").animate({boxShadow: "0px 0px 0px black", fontSize: "50px", width: "50%"}, 100, function()  {
                            $("#left").css("z-index", "0");
                        });
                    }
                });
                $("#right").mouseenter(function()  {
                    if(choice == 0)  {
                        $("#right").css("z-index", "5");
                        $("#info_r").animate({boxShadow: "0px 0px 50px black"}, 100);
                        $("#right").animate({boxShadow: "0px 0px 50px black", fontSize: "52px", width: "51%", left: "49%"}, 100);
                    }
                });
                $("#right").mouseleave(function()  {
                    if(choice == 0)  {
                        $("#info_r").animate({boxShadow: "0px 0px 100px black"}, 100);
                        $("#right").animate({boxShadow: "0px 0px 0px black", fontSize: "50px", width: "50%", left: "50%"}, 100, function()  {
                            $("#right").css("z-index", "0");
                        });
                    }
                });
                $("#left").mousedown(function()  {
                    if(choice == 0)  {
                        $("#info_l").animate({boxShadow: "0px 0px 100px black"}, 100);
                        $("#left").animate({boxShadow: "0px 0px 0px black", fontSize: "50px", width: "50%"}, 100, function()  {
                            $("#left").css("z-index", "0");
                        });
                    }
                });
                $("#right").mousedown(function()  {
                    if(choice == 0)  {
                        $("#info_r").animate({boxShadow: "0px 0px 100px black"}, 100);
                        $("#right").animate({boxShadow: "0px 0px 0px black", fontSize: "50px", width: "50%", left: "50%"}, 100, function()  {
                            $("#right").css("z-index", "0");
                        });
                    }
                });
                $("#left").mouseup(function()  {
                    if(choice == 0)  {
                        $("#left").css("z-index", "2");
                        $("#info").velocity({width: 0, height: 0, left: "50%", top: "50%"}, 200, function()  {
                            $("#left").velocity({width: "100%"}, 400, "easeOutExpo");
                        });
                        choice = 1;
                    }
                });
                $("#right").mouseup(function()  {
                    if(choice == 0)  {
                        $("#right").css("z-index", "2");
                        $("#info").velocity({width: 0, height: 0, left: "50%", top: "50%"}, 200, function()  {
                            $("#right").velocity({width: "100%", left: 0}, 400, "easeOutExpo");
                        });
                        choice = 2;
                    }
                });
            });