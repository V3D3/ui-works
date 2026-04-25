//DEVELOPER VARIABLES

var popdb_ac = false;

//VARIABLES

var sW = window.innerWidth; //window dimensions
var sH = window.innerHeight;
var df_defstat = 'watchlist';
var df_priority = 0;
var df_cat = 'movie';
var qb_mv = "query examples:\n> avatar [2009]\n> I, Robot\n> leAve tHE WoRLd behInd (2015)\n\nstart editing to clear.";
var qb_tv = "query examples:\n> breaking bad\n> game of thrones\n\nstart editing to clear.";
var qb_ar = "query examples:\n> daniel radcliffe\n> cara delevingne\n> chloe moretz\n\nstart editing to clear.";

//CINEMATIC PAGE PRESENTATION

$(document).ready(function () {
    reTheme();
    $('#head').delay(500).velocity({ left: '-10%', width: '120%' }, 1000, 'easeOutCirc');
    $('#dc0').delay(600).velocity({ left: 0, width: '100%' }, 1000, 'easeOutCirc');
    $('#dc1').delay(700).velocity({ left: 0, width: '100%' }, 1000, 'easeOutCirc');
    $('#dc2').delay(800).velocity({ left: 0, width: '100%' }, 1000, 'easeOutCirc');
    if (localStorage.getItem('xms_df_bf_cfg')) {
        $('#nx0').delay(900).velocity({ left: '-4%', width: '54%' }, 1000, 'easeOutCirc');
        $('#nx1').delay(900).velocity({ left: '50%', width: '54%' }, 1000, 'easeOutCirc', function () {
            $('#nx0, #nx1').velocity({ top: '85%', height: '8%' }, 800, 'easeInOutExpo');
        });
    } else {
        $('#nx1').delay(900).velocity({ left: '-4%', width: '108%' }, 1000, 'easeOutCirc', function () {
            $('#nx1').velocity({ top: '85%', height: '8%' }, 800, 'easeInOutExpo');
        });
    }
});

//EVENTS

$(document).ready(function () {
    $('.dcc').mouseenter(function () {
        if (($(this).attr('active') == 'false') && (($(this).hasClass('dcc1') == false) || ($('#dcc0d2').attr('active') != 'true'))) {
            $(this).velocity({ scale: 1.1 }, 100);
        }
    });
    $('.dcc').mouseleave(function () {
        if (($(this).attr('active') == 'false') && (($(this).hasClass('dcc1') == false) || ($('#dcc0d2').attr('active') != 'true'))) {
            $(this).velocity({ scale: 1 }, 100);
        }
    });
    $('.dcc').mousedown(function () { //hard-coded.
        var obt = this;
        if ($(this).hasClass('dcc0')) {
            if ('dcc0d0' != $(obt).attr('id')) {
                $('#dcc0d0').velocity({ left: '9vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d0').attr('active', 'false');
            } else {
                $('#dcc0d0').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d0').attr('active', 'true');
            }
            if ('dcc0d1' != $(obt).attr('id')) {
                $('#dcc0d1').velocity({ left: '19vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d1').attr('active', 'false');
            } else {
                $('#dcc0d1').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d1').attr('active', 'true');
            }
            if ('dcc0d2' != $(obt).attr('id')) {
                $('#dcc0d2').velocity({ left: '29vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d2').attr('active', 'false');
                $('#dc1').velocity({ opacity: 1 }, 300);
                //$.tipsy('#dct1', 'The default status for items being added to library.', xpr_tipsy_cssob);
                //Tipsy constraint found. Must be updated before use.
            } else {
                $('#dcc0d2').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc0d2').attr('active', 'true');
                $('#dc1').velocity({ opacity: 0.7 }, 300);
                //$.tipsy('#dct1', 'Disabled: no <i>status</i> for artists.', xpr_tipsy_cssob);
            }
        } else if ($(this).hasClass('dcc1')) {
            if ($('#dcc0d2').attr('active') == 'false') {
                if ('dcc1d0' != $(obt).attr('id')) {
                    $('#dcc1d0').velocity({ left: '4.7vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d0').attr('active', 'false');
                } else {
                    $('#dcc1d0').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d0').attr('active', 'true');
                }
                if ('dcc1d1' != $(obt).attr('id')) {
                    $('#dcc1d1').velocity({ left: '10.4vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d1').attr('active', 'false');
                } else {
                    $('#dcc1d1').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d1').attr('active', 'true');
                }
                if ('dcc1d2' != $(obt).attr('id')) {
                    $('#dcc1d2').velocity({ left: '16.1vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d2').attr('active', 'false');
                } else {
                    $('#dcc1d2').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d2').attr('active', 'true');
                }
                if ('dcc1d3' != $(obt).attr('id')) {
                    $('#dcc1d3').velocity({ left: '21.8vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d3').attr('active', 'false');
                } else {
                    $('#dcc1d3').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d3').attr('active', 'true');
                }
                if ('dcc1d4' != $(obt).attr('id')) {
                    $('#dcc1d4').velocity({ left: '27.5vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d4').attr('active', 'false');
                } else {
                    $('#dcc1d4').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d4').attr('active', 'true');
                }
                if ('dcc1d5' != $(obt).attr('id')) {
                    $('#dcc1d5').velocity({ left: '33.2vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d5').attr('active', 'false');
                } else {
                    $('#dcc1d5').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                    $('#dcc1d5').attr('active', 'true');
                }
            }
        } else if ($(this).hasClass('dcc2')) {
            if ('dcc2d0' != $(obt).attr('id')) {
                $('#dcc2d0').velocity({ left: '9vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d0').attr('active', 'false');
            } else {
                $('#dcc2d0').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d0').attr('active', 'true');
            }
            if ('dcc2d1' != $(obt).attr('id')) {
                $('#dcc2d1').velocity({ left: '19vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d1').attr('active', 'false');
            } else {
                $('#dcc2d1').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d1').attr('active', 'true');
            }
            if ('dcc2d2' != $(obt).attr('id')) {
                $('#dcc2d2').velocity({ left: '29vw', top: '3vh', height: '2.5vh', width: '2.5vh', borderRadius: '50%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d2').attr('active', 'false');
            } else {
                $('#dcc2d2').delay(200).velocity({ left: '40vw', height: '8vh', width: '30vw', top: '0vh', borderRadius: '0%', scale: 1 }, 600, 'easeInOutExpo');
                $('#dcc2d2').attr('active', 'true');
            }
        }
    });
    $('.nx, .fx').mouseenter(function () {
        $(this).velocity({ boxShadowBlur: 10, textShadowBlur: 10 }, 100);
    });
    $('.nx, .fx').mouseleave(function () {
        $(this).velocity({ boxShadowBlur: 0, textShadowBlur: 0 }, 100);
    });
    $('.nx, .fx').mousedown(function () {
        $(this).css({ background: 'lime', color: 'black' });
    });
    $('#nx0').mouseup(function () {
        $(this).css({ background: 'transparent', color: 'lime' });
        var c = localStorage.getItem('xms_df_bf_cfg');
        loadC(c); //switch behavior to just switching over to loaded data, rather than continuing with it
    });
    $('#nx1').mouseup(function () {
        $(this).css({ background: 'transparent', color: 'lime' });
        var c = '';
        var a = [3, 6, 3];
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < a[j]; i++) {
                if ($('#dcc' + j + 'd' + i).attr('active') == 'true') {
                    c += i;
                    break;
                }
            }
        }
        loadC(c);
    });
    $('#fx1').mouseup(function () {
        $(this).css({ background: 'transparent', color: 'lime' });
        var queries = ($('#querycapt').html()) ? $('#querycapt').html() : $('#querycapt').val();
        $('.fx').velocity({ top: '89%', height: 0 }, 1000, 'easeInOutExpo', function () {
            $('.fx').velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc');
            $('#lefthook').delay(200).velocity({ left: '40%' }, 1000, 'easeInCirc');
            $('#righthook').delay(200).velocity({ left: '50%' }, 1000, 'easeInCirc');
            $('#querycapt').delay(200).velocity({ left: '50%', width: 0, paddingLeft: 0 }, 1000, 'easeInCirc');
            $('#queryarea').delay(200).velocity({ left: '150%' }, 1000, 'easeInCirc');
            $('#head').delay(400).velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc', function () {
                bulkfetch(queries, df_cat, df_priority);
            });
        });
    });
});

let noop = exc => {
    flash("Error sending query.", 2, 1500);
    console.error(exc);
}

function GET(url, callback, err = noop) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(callback)
        .catch(err);
}

function loadC(c) {
    df_cat = ['movie', 'tv', 'artist'][+c[0]];
    df_defstat = ['watchlist', 'purchased', 'downloading', 'downloaded', 'watching', 'watched'][+c[1]];
    df_priority = +c[2];
    localStorage.setItem('xms_df_bf_cfg', c);
    $('.nx').velocity({ top: '89%', height: 0 }, 800, 'easeInOutExpo', function () {
        $('.nx').velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc');
        $('#dc2').delay(100).velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc');
        $('#dc1').delay(200).velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc');
        $('#dc0').delay(300).velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc');
        $('#head').delay(400).velocity({ left: '150%', width: 0 }, 1000, 'easeInCirc', function () {
            $('#head').html('QUERIES');
            $('#querycapt').attr('placeholder', [qb_mv, qb_tv, qb_ar][+c[0]]);
            $('#head').velocity({ left: ['-10%', '-50%'], width: ['120%', 0] }, 1000, 'easeOutCirc');
            $('#lefthook').delay(200).velocity({ left: '15%' }, 1000, 'easeOutCirc');
            $('#righthook').delay(200).velocity({ left: '75%' }, 1000, 'easeOutCirc');
            $('#querycapt').delay(200).velocity({ left: '25%', width: '50%' }, 1000, 'easeOutCirc');
            $('#fx0').delay(400).velocity({ left: '-4%', width: '36%' }, 1000, 'easeOutCirc');
            $('#fx2').delay(400).velocity({ left: '68%', width: '36%' }, 1000, 'easeOutCirc');
            $('#fx1').delay(400).velocity({ left: '32%', width: '36%' }, 1000, 'easeOutCirc', function () {
                $('.fx').velocity({ top: '85%', height: '8%' }, 800, 'easeInOutExpo');
            });
            $('#queryarea').delay(200).velocity({ left: '-50%' }, 1000, 'easeOutCirc', function () {
                $('#querycapt').focus();
            });
        });
    })
}

//COMMON TASKS

//flash a message/error
function flash(m, k, dh = 800) {
    $('#DEC').css({ background: ['lime', 'black', 'red', 'black'][k], color: ['black', 'lime', 'black', 'red'][k] });
    $('#DEC').html(m);
    $('#DEC').velocity({ left: [0, 0], width: '100%' }, 400, 'easeOutExpo', function () {
        $('#DEC').delay(dh).velocity({ left: '100%', width: 0 }, 400, 'easeInExpo');
    });
}

//EXPERIMENTAL

//switch to alternative DF/SF themes
function reTheme() {
    if (localStorage.getItem('xms_df_retheme') == 'true') {

    }
}

//DATAFETCH (DFF AND API JOBS)

var tDAK = localStorage.getItem("xms_tmdbapikey");
//resolve genres from genre IDs: Movies and TV Shows
function genresolvem(id) {
    return ((["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"][[28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37].indexOf(id)]) || "ERROR").toUpperCase();
}
function genresolvet(id) {
    return ((["Action & Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Kids", "Mystery", "News", "Reality", "Sci-Fi & Fantasy", "Soap", "Talk", "War & Politics", "Western", "Action"][[10759, 16, 35, 80, 99, 18, 10751, 10762, 9648, 10763, 10764, 10765, 10766, 10767, 10768, 37, 28].indexOf(id)]) || "ERROR").toUpperCase();
}
function bulkfetch(queries, cat, priority) {
    var sb = queries.split('\n');
    var sc = [];
    var k0 = new RegExp(/(.*) \(([0-9][0-9][0-9][0-9])\)/);
    var k1 = new RegExp(/(.*) \[([0-9][0-9][0-9][0-9])\]/);
    for (var i = 0; i < sb.length; i++) {
        if (sb[i].match(k0)) {
            sc.push([sb[i].match(k0)[1], sb[i].match(k0)[2]]);
        } else if (sb[i].match(k1)) {
            sc.push([sb[i].match(k1)[1], sb[i].match(k1)[2]]);
        } else {
            sc.push([sb[i]]);
        }
    }
    if (cat == 'movie') {
        searchm(sc, priority);
    }
    if (cat == 'tv') {
        searcht(sc, priority);
    }
}

//search for movies by title + year
function searchm(queries, priority) {
    GET("../data/movie-search.json", resp => {
        if (resp.results && resp.results.length > 0) {
            const id = response.results[priority].id;
            datastore(0, id, queries, priority);
        } else {
            const msg = `no results returned for "${queries[0][0]} (${queries[0][1]})".`;
            flash(msg, 2);
            queries.reverse().pop();
            queries.reverse();
            searchm(queries, priority);
        }
    })
}

//search for tv shows by title + year
function searcht(queries, priority) {
    GET("../data/tv-search.json", response => {
        if (response.results && response.results.length > 0) {
            datastore(1, response.results[priority].id, queries, priority);
        } else {
            flash('no results returned.', 2);
        }
    });
}
//search for artist by name
function searcha(queries, priority) {
    GET("../data/artist-search.json", response => {
        if (response.results && response.results.length > 0) {
            datastore(2, response.results[priority].id, queries, priority);
        } else {
            flash('no results returned.', 2);
        }
    });
}

//unified datastore method (data + img).
function uni_ds(rqobj, ty, queries, priority) {
    if (rqobj[0][0].length == 3) {
        // This is unfortunately too complex to refactor.
        let url = `https://api.themoviedb.org/3/${rqobj[0][0][0]}`;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tDAK}`
            }
        };

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text(); // original expected "text"
            })
            .then(response => {
                rqobj[0][0][1]['content'] = response;
                GET("../fshandlers/success.txt", res => {
                    if (res == 1) {
                        const jsonobj = JSON.parse(response);
                        y = jsonobj;

                        for (let i = 0; i < rqobj[0][0][2].length; i++) {
                            if (rqobj[0][0][2][i][0] > -1) {
                                rqobj[1].push(
                                    jsonobj.episodes[rqobj[0][0][2][i][0]][rqobj[0][0][2][i][1] + "_path"]
                                );
                            } else {
                                rqobj[1].push(
                                    jsonobj[rqobj[0][0][2][i][1] + "_path"]
                                );
                            }
                        }

                        rqobj[0].reverse().pop();
                        rqobj[0].reverse();

                        return uni_ds(rqobj, ty, queries, priority);
                    }
                });
            })
            .catch(err => {
                flash('error retrieving data - check connection.', 2, 1800);
                console.error(err);
            });
    } else {
        GET("../fshandlers/success.txt", res => {
            if (rqobj[0].length == 1) {
                libp(ty, rqobj[2], 0, rqobj[3], rqobj[4]);
                if (queries.length == 1) {
                    console.log('session complete.')
                    flash('datafetch successful.', 0, 1800);
                    fchreset(queries[0][0], queries[0][1]);
                } else {
                    queries.reverse().pop();
                    queries.reverse();
                    return bulk_ds(queries, ty);
                }
            } else {
                rqobj[0].reverse().pop();
                rqobj[0].reverse();
                return uni_ds(rqobj, ty, queries, priority);
            }
        }, err = exc => {
            flash('error in imgstore-ing. check connection and server status.', 2, 1000);
            console.error(exc);
        })
    }
}
//prepares datastore-ing for tv shows.
function tv_ds(id, ty, queries, priority) {
    //first, get main TV show overview - to get the number of seasons, mainly (and the data itself)
    GET("../data/tv-id.json", response => {
        // store details on disk
        GET("../fshandlers/success.txt", res => {
            res = res.text();
            if (res == 1) {
                //parse a copy of the data to now scrape
                var jsonobj = JSON.parse(response);
                var n = []; //stores number of episodes for each season

                //calculate and store progress percentages for DF and IMGF
                var dfpr;
                var ifpr = [0, 2];
                for (var i = 0; i < jsonobj.seasons.length; i++) {
                    n.push(jsonobj.seasons[i].episode_count);
                    ifpr[1] += jsonobj.seasons[i].episode_count;
                }
                ifpr[1] += n.length;
                dfpr = [1, 3 + 2 * n.length];

                var snar = [];
                for (var i = 0; i < n.length; i++) {
                    snar.push(jsonobj.seasons[i].season_number);
                }

                //prepare sub, for sending over to unified datastore
                var sub = [];
                for (var i = 0; i < n.length; i++) {
                    var sub_at = [];
                    sub_at.push([-1, 'poster']);
                    for (var j = 0; j < n[i]; j++) {
                        sub_at.push([j, 'still']);
                    }
                    dfpr[0]++;
                    sub.push(['tv/' + id + '/season/' + snar[i], { cat: 'tv', id: id, type: 'sdet', sno: snar[i] }, sub_at, [[-1, 'S' + (i + 1), 2, 'fetching season ' + (i + 1) + '/' + n.length + ' details']], [['S' + (i + 1), 50], [1, 100 * ((dfpr[0] - 0.5) / dfpr[1])], [0, 100 * ((dfpr[0] - 0.5) / (dfpr[1] + ifpr[1]))]], [['S' + (i + 1), 100], [-2, 'S' + (i + 1)], [1, 100 * (dfpr[0] / dfpr[1])], [0, 100 * (dfpr[0] / (dfpr[1] + ifpr[1]))]]]);
                    //season credits
                    dfpr[0]++;
                    sub.push(['tv/' + id + '/season/' + snar[i] + '/credits', { cat: 'tv', id: id, type: 'scast', sno: snar[i] }, [], [[-1, 'S' + (i + 1), 2, 'fetching season ' + (i + 1) + '/' + n.length + ' cast']], [['S' + (i + 1), 50], [1, 100 * ((dfpr[0] - 0.5) / dfpr[1])], [0, 100 * ((dfpr[0] - 0.5) / (dfpr[1] + ifpr[1]))]], [['S' + (i + 1), 100], [-2, 'S' + (i + 1)], [1, 100 * (dfpr[0] / dfpr[1])], [0, 100 * (dfpr[0] / (dfpr[1] + ifpr[1]))]]]);
                }
                dfpr[0]++;
                sub.push(
                    ['tv/' + id + '/credits', { cat: 'tv', id: id, type: 'cast' }, [], [[-1, 3, 2, 'fetching tv show cast']], [[3, 50], [1, 100 * ((dfpr[0] - 0.5) / dfpr[1])], [0, 100 * ((dfpr[0] - 0.5) / (dfpr[1] + ifpr[1]))]], [[3, 100], [-2, 3], [1, 100 * (dfpr[0] / dfpr[1])], [0, 100 * (dfpr[0] / (dfpr[1] + ifpr[1]))]]]
                );
                dfpr[0]++;
                sub.push(
                    ['tv/' + id + '/reviews', { cat: 'tv', id: id, type: 'reviews' }, [], [[-1, 4, 2, 'fetching tv show reviews']], [[4, 50], [1, 100 * ((dfpr[0] - 0.5) / dfpr[1])], [0, 100 * ((dfpr[0] - 0.5) / (dfpr[1] + ifpr[1]))]], [[4, 100], [-2, 4], [1, 100 * (dfpr[0] / dfpr[1])], [0, 100 * (dfpr[0] / (dfpr[1] + ifpr[1]))], [-2, 1]]]
                );

                ifpr[0]++;
                sub.push(
                    ['&cat=tv&id=' + id + '&type=backdrop', 0, [[-1, 5, 1, 'imgstore progress'], [-1, 6, 2, 'fetching tv show backdrop']], [[0, 100 * ((dfpr[1] + ifpr[0]) / (dfpr[1] + ifpr[1]))], [5, 100 * (ifpr[0] / ifpr[1])], [6, 100], [-2, 6]]]
                );
                ifpr[0]++;
                sub.push(
                    ['&cat=tv&id=' + id + '&type=poster', 1, [[-1, 7, 2, 'fetching tv show poster']], [[0, 100 * ((dfpr[1] + ifpr[0]) / (dfpr[1] + ifpr[1]))], [5, 100 * (ifpr[0] / ifpr[1])], [7, 100], [-2, 7]]]
                );

                var d = 2;
                for (var i = 0; i < n.length; i++) {
                    ifpr[0]++;
                    sub.push(
                        ['&cat=tv&id=' + id + '&type=sposter&season=' + snar[i], d, [[-1, 'S' + (i + 1) + 'I', 2, 'fetching tv season ' + (i + 1) + '/' + n.length + ' poster']], [[0, 100 * ((dfpr[1] + ifpr[0]) / (dfpr[1] + ifpr[1]))], [5, 100 * (ifpr[0] / ifpr[1])], ['S' + (i + 1) + 'I', 100], [-2, 'S' + (i + 1) + 'I']]]
                    );
                    d++;
                    for (var j = 0; j < n[i]; j++) {
                        ifpr[0]++;
                        if ((i == n.length - 1) && (j == n[n.length - 1] - 1)) {
                            sub.push(
                                ['&cat=tv&id=' + id + '&type=estill&season=' + snar[i] + '&episode=' + (j + 1), d, [[-1, 'S' + (i + 1) + 'E' + (j + 1), 2, 'fetching tv season ' + (i + 1) + '/' + n.length + ' ep. ' + (j + 1) + '/' + n[i] + ' still']], [[0, 100 * ((dfpr[1] + ifpr[0]) / (dfpr[1] + ifpr[1]))], [5, 100 * (ifpr[0] / ifpr[1])], ['S' + (i + 1) + 'E' + (j + 1), 100], [-2, 'S' + (i + 1) + 'E' + (j + 1)], [-2, 5], [-2, 0]]]
                            );
                        } else {
                            sub.push(
                                ['&cat=tv&id=' + id + '&type=estill&season=' + snar[i] + '&episode=' + (j + 1), d, [[-1, 'S' + (i + 1) + 'E' + (j + 1), 2, 'fetching tv season ' + (i + 1) + '/' + n.length + ' ep. ' + (j + 1) + '/' + n[i] + ' still']], [[0, 100 * ((dfpr[1] + ifpr[0]) / (dfpr[1] + ifpr[1]))], [5, 100 * (ifpr[0] / ifpr[1])], ['S' + (i + 1) + 'E' + (j + 1), 100], [-2, 'S' + (i + 1) + 'E' + (j + 1)]]]
                            );
                        }
                        d++;
                    }
                }

                var rq = [sub, [jsonobj.backdrop_path, jsonobj.poster_path], id, n, snar];
                uni_ds(rq, ty, queries, priority);
            }
        });
    });
}
//launch datastore for movies, artists; call tv_ds appropriately for tv shows
function datastore(ty, id, queries, priority) {
    switch (ty) {
        case 0:
            var sub = [
                ["movie/" + id, { cat: 'movie', id: id, type: 'overview' }, [[-1, 'backdrop'], [-1, 'poster']]],
                ["movie/" + id + "/credits", { cat: 'movie', id: id, type: 'cast' }, []],
                ["movie/" + id + "/reviews", { cat: 'movie', id: id, type: 'reviews' }, []],
                ['&cat=movie&id=' + id + '&type=backdrop', 0],
                ['&cat=movie&id=' + id + '&type=poster', 1]
            ];
            var rq = [sub, [], id];
            uni_ds(rq, ty, queries, priority);
            break;
        case 1:
            tv_ds(id, ty, queries, priority);
            break;
        case 2:
            var sub = [
                ["person/" + id, { cat: 'artist', id: id, type: 'details' }, [[-1, 'profile']]],
                ["person/" + id + "/movie_credits", { cat: 'artist', id: id, type: 'movie_credits' }, []],
                ["person/" + id + "/tv_credits", { cat: 'artist', id: id, type: 'tv_credits' }, []],
                ['&cat=artist&id=' + id + '&type=profile', 0]
            ];
            var rq = [sub, [], id];
            uni_ds(rq, ty, queries, priority);
            break;
    }
}

//query/adjust libindex
function libp(ty, id, ac, ex = [], ex2 = []) { }

//XPR - TIPSY - BINDINGS
var xpr_tipsy_cssob = { borderColor: 'rgb(0, 200, 0)', color: 'black', background: 'lime' };
$(document).ready(function () {
    $.tipsy('#dct0', 'The category for which the search queries are intended.', xpr_tipsy_cssob);
    $.tipsy('#dct1', 'The default status for items being added to library.', xpr_tipsy_cssob);
    $.tipsy('#dct2', 'The number of the result in the <i>(internal)</i> search results to fetch. <i>For numbers greater than 2, use ListFetch and/or SpeccyFetch.<i>', xpr_tipsy_cssob);
    $.tipsy('#nx0', 'Load the parameters used in the previous session of BulkFetch.', xpr_tipsy_cssob);
    $.tipsy('#fx0', 'Show advanced options, such as for multi-line editing, data estimate, et cetera.', xpr_tipsy_cssob);
    $.tipsy('#fx2', 'Load queries from a text file, or algorithmically load queries from a folder containing media files.', xpr_tipsy_cssob);
});