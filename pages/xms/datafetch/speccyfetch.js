//DEVELOPER VARIABLES

var popdb_ac = false;
var df_defstat = 'watchlist';

//VARIABLES

var mmiddb = [], ttiddb = [], ariddb = []; //stores movie ids already present in library (queried on pageload)
var page = -1; //stores current interactive section of the page, assisting keyboard input
var sW = window.innerWidth; //window dimensions
var sH = window.innerHeight;
var xpr_parlim = [40, 70]; //xpr parameter limits
var xpr_params = [0, 0, true]; //xpr current parameters
var xpr_trfmpar = [0, 0, 0, 0]; //xpr temporary transform parameters
var currdatam, currdatat, currdataa; //stores current std search data for movie/tv show/artist sections
var currdatam_art, currdatat_art; //stores current art search data for movie/tv show sections
var opcom = false, opcot = false; //search end (false > std movie/tv, true > artist/tv)
var stdmac = false, stdtac = false; //std search for a movie/tv show/artist initiated
var artmac = false, arttac = false; //artist search for a movie/tv show via artist initiated

//CINEMATIC PAGE PRESENTATION

$(document).ready(function () {
	populateDB();
	reTheme();
	$('#ARM').delay(200).velocity({ left: '65%' }, 800, 'easeOutExpo');
	$('#MVM').delay(400).velocity({ left: '40%' }, 800, 'easeOutExpo');
	$('#MRM').delay(600).velocity({ left: '40%' }, 800, 'easeOutExpo');
	$('#TVM').delay(800).velocity({ left: '15%' }, 800, 'easeOutExpo');
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

//EVENTS

$(document).ready(function () {
	//The class name MTX no longer makes sense
	//It represents primary category tiles
	$('.MTX').mouseenter(function () {
		if (!$(this).hasClass('MCC')) {
			$(this).velocity({ opacity: 1 }, 100);
		}
	});
	$('.MTX').mouseleave(function () {
		if (!$(this).hasClass('MCC')) {
			$(this).velocity({ opacity: 0.5 }, 100);
		}
	});
	$('.MTX').mousedown(function () {
		if (!$(this).hasClass('MCC')) {
			$(this).attr('class', 'MCC');
			xpr_params[2] = false;
			xpr_end();
			$(this).css({ background: 'lime', color: 'black' });
			$('.MTX').velocity({ left: '150%' }, 600, 'easeInExpo', function () {
				$('.MCC').velocity({ top: '10%', left: '10%', height: '80%', width: '80%', lineHeight: '80vh' }, 800, 'easeOutExpo', function () {
					$('.MCC').velocity({ transformPerspective: '43.92vw', rotateY: xpr_trfmpar[0], rotateX: xpr_trfmpar[1], translateY: xpr_trfmpar[2], translateX: xpr_trfmpar[3] }, 0, function () {
						$('.MCC').velocity({ transformPerspective: '43.92vw', rotateY: 90, rotateX: 0, translateY: 0, translateX: 0 }, 900, 'easeInExpo', function () {
							$('#' + ['AMO', 'MMO', 'TMO'][['ARM', 'MVM', 'TVM'].indexOf($(this).attr('id'))]).velocity({ transformPerspective: ['49.32vw', '49.32vw'], scale: [0.86, 0.8], rotateY: [0, -90], opacity: [1, 1], translateY: '-2vh' }, 900, 'easeOutExpo', function () {
								switch ($(this).attr('id')) {
									case 'AMO':
										$('#AIB').focus();
										break;
									case 'MMO':
										$('#MIB').focus();
										break;
									case 'TMO':
										$('#TIB').focus();
										break;
								}
							});
						});
					});
				});
			});
		}
	});
	//MIB is the input for Movie Title
	$('#MIB').keypress(function (e) {
		if (e.keyCode == 13) {
			if (!stdmac) {
				stdmac = true;
				$('#DISPAREAMM').velocity({ height: '82%' }, 800, 'easeOutExpo');
				$('#MIB').velocity({ top: '87%', height: '8.5vh', borderWidth: '2px', left: '7%', width: '60%' }, 800, 'easeOutExpo');
				$('#MAD').velocity({ left: '73%' }, 800, 'easeOutExpo');
			}
			flash('sending search request...', 0);
			searchm($('#MIB').val());
		}
	});
	//MAB is the input for Artist Name, when searching for a Movie
	$('#MAB').keypress(function (e) {
		if (e.keyCode == 13) {
			if (!artmac) {
				artmac = true;
				$('#DISPAREAMA').velocity({ height: '82%' }, 800, 'easeOutExpo');
				$('#MAB').velocity({ top: '87%', height: '8.5vh', borderWidth: '2px', left: '7%', width: '52%' }, 800, 'easeOutExpo');
				$('#MID').velocity({ left: '65%' }, 800, 'easeOutExpo');
			}
			flash('sending search request...', 0);
			searcham($('#MAB').val());
		}
	});
	//TIB is the input for TV Show Title
	$('#TIB').keypress(function (e) {
		if (e.keyCode == 13) {
			if (!stdtac) {
				stdtac = true;
				$('#DISPAREATT').velocity({ height: '82%' }, 800, 'easeOutExpo');
				$('#TIB').velocity({ top: '87%', height: '8.5vh', borderWidth: '2px', left: '7%', width: '60%' }, 800, 'easeOutExpo');
				$('#TAD').velocity({ left: '73%' }, 800, 'easeOutExpo');
			}
			flash('sending search request...', 0);
			searcht($('#TIB').val());
		}
	});
	//TAB is the input for Artist Name, when searching for a TV Show
	$('#TAB').keypress(function (e) {
		if (e.keyCode == 13) {
			if (!arttac) {
				arttac = true;
				$('#DISPAREATA').velocity({ height: '82%' }, 800, 'easeOutExpo');
				$('#TAB').velocity({ top: '87%', height: '8.5vh', borderWidth: '2px', left: '7%', width: '52%' }, 800, 'easeOutExpo');
				$('#TID').velocity({ left: '65%' }, 800, 'easeOutExpo');
			}
			flash('sending search request...', 0);
			searchat($('#TAB').val());
		}
	});
	//AIB (no reference intended) is the input for Artist Name. 'I' here, insignificant (no pun intended).
	$('#AIB').keypress(function (e) {
		if (e.keyCode == 13) {
			$('#DISPAREAA').velocity({ height: '82%' }, 800, 'easeOutExpo');
			$('#AIB').velocity({ top: '87%', height: '8.5vh', borderWidth: '2px' }, 800, 'easeOutExpo');
			$('#AAD').velocity({ left: '73%' }, 800, 'easeOutExpo');
			flash('sending search request...', 0);
			searcha($('#AIB').val());
		}
	});
	//ExpandedCover (enlarged primary artwork, displayed with complete immersion)
	$('#EXC').mousedown(function () {
		$('#EXP').velocity({ top: '109.5%' }, 800, 'easeInExpo');
		$('#EXC').delay(550).velocity({ top: '100%' }, 800, 'easeInExpo');
	});
	//MID, MAD, TID, TAD toggle title/artist-based search modes (GUI)
	$('#MAD, #MID, #TAD, #TID').mouseenter(function () {
		$(this).velocity({ opacity: 1 }, 100);
	});
	$('#MAD, #MID').mouseleave(function () {
		if (!opcom) {
			$('#MAD').velocity({ opacity: 0.8 }, 100);
		} else {
			$('#MID').velocity({ opacity: 0.8 }, 100);
		}
	});
	$('#TAD, #TID').mouseleave(function () {
		if (!opcot) {
			$('#TAD').velocity({ opacity: 0.8 }, 100);
		} else {
			$('#TID').velocity({ opacity: 0.8 }, 100);
		}
	});
	$('#MAD').mousedown(function () {
		if (!opcom) {
			$('#MAD').css({ background: 'black', color: 'lime' });
		}
	});
	$('#MID').mousedown(function () {
		if (opcom) {
			$('#MID').css({ background: 'lime', color: 'black' });
		}
	});
	$('#TAD').mousedown(function () {
		if (!opcot) {
			$('#TAD').css({ background: 'black', color: 'lime' });
		}
	});
	$('#TID').mousedown(function () {
		if (opcot) {
			$('#TID').css({ background: 'lime', color: 'black' });
		}
	});
	$('#MAD').mouseup(function () {
		if (!opcom) {
			opcom = true;
			$('#MID').velocity({ bottom: '5%' }, 800, 'easeOutExpo');
			$('#MAB').velocity({ top: (artmac) ? '87%' : '44%' }, 800, 'easeOutExpo');
			$('#DISPAREAMA').velocity({ height: (artmac) ? '82%' : '0%', opacity: 1 }, 800, 'easeOutExpo');
			$('#MAD').velocity({ top: 2, left: 2, height: sH - 8, width: sW - 8 }, 800, 'easeOutExpo', function () {
				$('#MAB').focus();
			});
		}
	});
	$('#MID').mouseup(function () {
		if (opcom) {
			opcom = false;
			$('#MID').css({ background: 'transparent', color: 'lime' });
			$('#MID').velocity({ bottom: '-950%' }, 800, ((stdmac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#MAB').velocity({ top: '144%' }, 800, ((stdmac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#DISPAREAMA').velocity({ height: '0%', opacity: 0 }, 800, ((stdmac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#MAD').velocity({ top: '87%', left: ((stdmac) ? '73%' : '40%'), height: '8%', width: '20%' }, 800, ((stdmac) ? 'easeOutExpo' : 'easeInOutExpo'), function () {
				$('#MIB').focus();
				$('#MAD').velocity({ background: '#00ff00', color: '#000000' }, 200);
			});
		}
	});
	$('#TAD').mouseup(function () {
		if (!opcot) {
			opcot = true;
			$('#TID').velocity({ bottom: '5%' }, 800, 'easeOutExpo');
			$('#TAB').velocity({ top: (arttac) ? '87%' : '44%' }, 800, 'easeOutExpo');
			$('#DISPAREATA').velocity({ height: (arttac) ? '82%' : '0%', opacity: 1 }, 800, 'easeOutExpo');
			$('#TAD').velocity({ top: 2, left: 2, height: sH - 8, width: sW - 8 }, 800, 'easeOutExpo', function () {
				$('#TAB').focus();
			});
		}
	});
	$('#TID').mouseup(function () {
		if (opcot) {
			opcot = false;
			$('#TID').css({ background: 'transparent', color: 'lime' });
			$('#TID').velocity({ bottom: '-950%' }, 800, ((stdtac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#TAB').velocity({ top: '144%' }, 800, ((stdtac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#DISPAREATA').velocity({ height: '0%', opacity: 0 }, 800, ((stdtac) ? 'easeOutExpo' : 'easeInOutExpo'));
			$('#TAD').velocity({ top: '87%', left: ((stdtac) ? '73%' : '40%'), height: '8%', width: '20%' }, 800, ((stdtac) ? 'easeOutExpo' : 'easeInOutExpo'), function () {
				$('#TIB').focus();
				$('#TAD').velocity({ background: '#00ff00', color: '#000000' }, 200);
			});
		}
	});
	//DF...... are DFP Panel components
	$('#DFCLBTLB').mouseenter(function () {
		$('#DFCLBTBR').velocity({ right: '5%', width: '20%' }, 600, 'easeOutExpo');
	});
	$('#DFCLBTLB').mouseleave(function () {
		$('#DFCLBTBR').velocity({ right: '-50%', width: '0' }, 600, 'easeInExpo');
	});
	$('#DFCLBTLB').mousedown(function () {
		$('#DFCLBTLB').velocity({ color: '#000000' }, 300);
		$('#DFCLBTBR').velocity({ width: 0, height: 0, borderLeftWidth: '9vw', borderRightWidth: '9vw', borderTopWidth: '4vh', borderBottomWidth: '4vh' }, 600, 'easeOutExpo');
	});
	$('#DFCLBTLB').mouseup(function () {
		if ($('#DFCLBTBR').css('border-color') == 'rgb(0, 255, 0)') { $('#DFCLBTLB').velocity({ color: '#00FF00' }, 300); } else { $('#DFCLBTLB').velocity({ color: '#FF0000' }, 300); }
		$('#DFCLBTBR').velocity({ width: '20%', height: '10%', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2 }, 600, 'easeOutExpo');
		$('#DFF').velocity({ transformPerspective: ['49.32vw', '49.32vw'], translateY: ['-250vh', '-2vh'], rotateX: ['-40deg', '0deg'], translateZ: ['-70vh', '0vh'], rotateY: [0, 0] }, 800, 'easeInExpo', function () {
			$('#MMO').velocity({ transformPerspective: ['49.32vw', '49.32vw'], scale: [0.86, 0.86], translateY: ['-2vh', '250vh'], rotateX: ['0deg', '30deg'], translateZ: ['0vh', '-70vh'], rotateY: [0, 0] }, 1200, 'easeOutExpo');
		});
	});
	$('#DFRTBTLB').mouseenter(function () {
		if ($('#DFRTBTLB').css('color') != 'rgb(128, 128, 128)') { $('#DFRTBTBR').velocity({ left: '5%', width: '20%' }, 600, 'easeOutExpo'); }
	});
	$('#DFRTBTLB').mouseleave(function () {
		if ($('#DFRTBTLB').css('color') != 'rgb(128, 128, 128)') { $('#DFRTBTBR').velocity({ left: '-50%', width: '0' }, 600, 'easeInExpo'); }
	});
	$('#DFRTBTLB').mousedown(function () {
		if ($('#DFRTBTLB').css('color') != 'rgb(128, 128, 128)') {
			$('#DFRTBTLB').velocity({ color: '#000000' }, 300);
			$('#DFRTBTBR').velocity({ width: 0, height: 0, borderLeftWidth: '9vw', borderRightWidth: '9vw', borderTopWidth: '4vh', borderBottomWidth: '4vh' }, 600, 'easeOutExpo');
		}
	});
	$('#DFRTBTLB').mouseup(function () {
		if ($('#DFRTBTLB').css('color') == 'rgb(0, 0, 0)') {
			$('#DFRTBTLB').velocity({ color: '#00FF00' }, 300);
			$('#DFRTBTBR').velocity({ width: '20%', height: '10%', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2 }, 600, 'easeOutExpo');
		}
	});

	//RESPONSIVE UI EVENTS

	$('body').mousemove(function (e) {
		xpr_update(e);
	});
	$('body').mouseenter(function (e) {
		xpr_init(e);
	});
	$('body').mouseleave(function () {
		xpr_end();
	});
});

//RECURRENTLY BOUND TASKS

//Bind related events to freshly generated result objects (components).
function mmobind(i) {
	//Set MMOOBJ Fetch button behavior.
	$('.MMOFCH').mouseenter(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 1 }, 200);
		}
	});
	$('.MMOFCH').mouseleave(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 0.8 }, 200);
		}
	});
	$('.MMOFCH').mousedown(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).css({ background: 'black', color: 'lime' });
		}
	});
	$('.MMOFCH').mouseup(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).html('FETCHING');
			$(this).attr('state', 'busy');
			datastore(0, currdatam[$(this).attr('id').substr(6)].id, $(this).attr('id').substr(6));
		}
	});
	//Set MMOOBJ Cover to call ExpandedCover on click.
	$('.MMOCOV').mousedown(function () {
		$('#EXP').attr('src', $(this).attr('src'));
		$('#EXC').velocity({ top: 0 }, 800, 'easeOutExpo', function () {
			$('#EXP').velocity({ top: '9.5%' }, 800, 'easeOutExpo');
		});
	});
	//Animate the MMOOBJ to its place. This part needs to be updated in the future.
	$('#MMOOBJ' + i).delay(i * 200).velocity({ top: (5 + (i * 35)) + 'vh' }, 400, 'easeOutExpo');
}
function tmobind(i) {
	//Set TMOOBJ Fetch button behavior.
	$('.TMOFCH').mouseenter(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 1 }, 200);
		}
	});
	$('.TMOFCH').mouseleave(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 0.8 }, 200);
		}
	});
	$('.TMOFCH').mousedown(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).css({ background: 'black', color: 'lime' });
		}
	});
	$('.TMOFCH').mouseup(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).html('FETCHING');
			$(this).attr('state', 'busy');
			flash('launching DataFetch...', 0, 1000);
			datastore(1, currdatat[$(this).attr('id').substr(6)].id, $(this).attr('id').substr(6));
		}
	});
	//Similar to MMOBind.
	$('.TMOCOV').mousedown(function () {
		$('#EXP').attr('src', $(this).attr('src'));
		$('#EXC').velocity({ top: 0 }, 800, 'easeOutExpo', function () {
			$('#EXP').velocity({ top: '9.5%' }, 800, 'easeOutExpo');
		});
	});
	//Again, will be improved in the future.
	$('#TMOOBJ' + i).delay(200 * i).velocity({ top: (5 + (i * 35)) + 'vh' }, 400, 'easeOutExpo');
}
function aaobind(i) {
	//Set AAOOBJ Fetch button behavior.
	$('.AAOFCH').mouseenter(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 1 }, 200);
		}
	});
	$('.AAOFCH').mouseleave(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).velocity({ opacity: 0.8 }, 200);
		}
	});
	$('.AAOFCH').mousedown(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).css({ background: 'black', color: 'lime' });
		}
	});
	$('.AAOFCH').mouseup(function () {
		if ($(this).attr('state') == 'laze') {
			$(this).html('FETCHING');
			$(this).attr('state', 'busy');
			flash('launching DataFetch...', 0, 1000);
			console.log($(this).attr('id').substr(6));
			datastore(2, currdataa[$(this).attr('id').substr(6)].id, $(this).attr('id').substr(6));
		}
	});
	//...Same.
	$('.AAOCOV').mousedown(function () {
		$('#EXP').attr('src', $(this).attr('src'));
		$('#EXC').velocity({ top: 0 }, 800, 'easeOutExpo', function () {
			$('#EXP').velocity({ top: '9.5%' }, 800, 'easeOutExpo');
		});
	});
	//...
	$('#AAOOBJ' + i).delay(200 * i).velocity({ left: (5 + (i * 35)) + 'vh' }, 400, 'easeOutExpo');
}
function maobind(i) {
	//Set MAOOBJ Expand button behavior.
	$('.MAOEXP').mouseenter(function () {
		$(this).velocity({ opacity: 1 }, 200);
	});
	$('.MAOEXP').mouseleave(function () {
		$(this).velocity({ opacity: 0.8 }, 200);
	});
	$('.MAOEXP').mousedown(function () {
		$(this).css({ background: 'black', color: 'lime' });
	});
	$('.MAOEXP').mouseup(function () {
		//flash('', 0, 1000);
		//load data
		//datastore(2, currdataa[$(this).attr('id').substr(6)].id, $(this).attr('id').substr(6));
	});
	//...
	$('.MAOCOV').mousedown(function () {
		$('#EXP').attr('src', $(this).attr('src'));
		$('#EXC').velocity({ top: 0 }, 800, 'easeOutExpo', function () {
			$('#EXP').velocity({ top: '9.5%' }, 800, 'easeOutExpo');
		});
	});
	//...
	$('#MAOOBJ' + i).delay(200 * i).velocity({ left: (5 + (i * 35)) + 'vh' }, 400, 'easeOutExpo');
}

//RESPONSIVE UI TASKS

//Initiate, update and pause Responsive UI in the main page.
function xpr_init(e) {
	$('#_DUM').animate({ opacity: 1 }, {
		duration: 150,
		step: function (now, fx) {
			xpr_params[0] = xpr_parlim[0] * now;
			xpr_params[1] = xpr_parlim[1] * now;
		}
	});
}
function xpr_end() {
	$('#_DUM').animate({ opacity: 0 }, {
		duration: 150,
		step: function (now, fx) {
			xpr_params[0] = xpr_parlim[0] * now;
			xpr_params[1] = xpr_parlim[1] * now;
			$('.MTX').css('transform', 'perspective(49.32vw) rotateY(' + xpr_trfmpar[0] * now + 'deg) rotateX(' + xpr_trfmpar[1] * now + 'deg) translateY(' + xpr_trfmpar[2] * now + 'px) translateX(' + xpr_trfmpar[3] * now + 'px)');
		}
	});
}
function xpr_update(e) {
	if (xpr_params[2]) {
		xpr_trfmpar = [((0.5 - (e.pageX / sW)) * (-xpr_params[0])), ((0.5 - (e.pageY / sH)) * xpr_params[0]), (((e.pageY / sH) - 0.5) * xpr_params[1]), (((e.pageX / sW) - 0.5) * xpr_params[1])]; //rY, rX, tY, tX
		$('.MTX').css('transform', 'perspective(43.92vw) rotateY(' + xpr_trfmpar[0] + 'deg) rotateX(' + xpr_trfmpar[1] + 'deg) translateY(' + xpr_trfmpar[2] + 'px) translateX(' + xpr_trfmpar[3] + 'px)');
	}
}

//FS JOBS

//Load list of items already present in the library.
//To change: failure behavior.
function populateDB() { }

//COMMON TASKS

//Flash a message/error.
function flash(m, k, dh = 800) {
	$('#DEC').css({ background: ['lime', 'black', 'red', 'black'][k], color: ['black', 'lime', 'black', 'red'][k] });
	$('#DEC').html(m);
	$('#DEC').velocity({ left: [0, 0], width: '100%' }, 400, 'easeOutExpo', function () {
		$('#DEC').delay(dh).velocity({ left: '100%', width: 0 }, 400, 'easeInExpo');
	});
}
//Reset a fetch-button.
function fchreset(typ, idx) {
	$('#' + typ + idx).attr('state', 'laze');
	$('#' + typ + idx).css({ background: 'transparent', color: 'black', opacity: 0.8 });
	$('#' + typ + idx).html('FETCH');
}

//EXPERIMENTAL

//Switch to alternative DF/SF themes.
function reTheme() {
	if (localStorage.getItem('xms_df_retheme') == 'true') {
		$('#MMO, #TMO').css({ background: "url('../images/lowperf_xmsbg.png')" });
		$('.MMO, .TMO').css({ background: 'rgba(255, 255, 255, 0.2)' });
	}
}

/*
	The differences between various planned versions of DataFetch, now seem to be reason enough to keep them separate.
	The functionality seems to be similar, and it's felt that each is a slight variation of another, but if a merge is attempted, the UI of the resulting DataFetch won't be a welcome sight for first-time users. Sure, we could build a simple-looking version that blends everything in, and looks the same, but exposes power to an experienced user, but that defeats one of the points of building XMS - great, alternative design.

	I would still continue to look for a way to include everything, and make the whole process of DataFetch-ing as quick as it's meant to be, and not present a scary, complex array of choices and inputs to a first time user, but you would know - the three can't be done together.

	For now, DataFetch will remain segregated into the five categories that it is now, although two/three categories (Bulk, List, (/)Check) could be merged together, or a few more could be added. I don't think it's alright to say this, but I'm unsure where this is heading.
	I'm not confused about continuing with the project - XMS WILL BE completed, with functional components, and if not awesome, then great design. I'm just confused about what to give my end-user, knowing that it's not some developer/programmer any more - whether to stuff stuff together or put it apart, and make the easiest thing accessible. Any kind of power can be included in the program: Check filesystem for data? Load interesting/trending data? Get everything possible, from a name? Should I leave stuff? Should I include stuff?

	Heck, I'm even thinking of building a system that allows you to use various inter-compatible versions of DataFetch, sort of like how Cydia (iOS debian package store) provides a (later switch-able) choice to its users on first run. But then, completing XMS at t -> infinity isn't really my plan.

	Meh. This note will probably stop existing in the next 4 commits or so.
*/

//DATAFETCH (DFF AND API JOBS)

var tDAK = localStorage.getItem("xms_tmdbapikey");
//Resolve genres from genre IDs: Movies and TV Shows.
function genresolvem(id) {
	return ((["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"][[28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37].indexOf(id)]) || "ERROR").toUpperCase();
}
function genresolvet(id) {
	return ((["Action & Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Kids", "Mystery", "News", "Reality", "Sci-Fi & Fantasy", "Soap", "Talk", "War & Politics", "Western", "Action"][[10759, 16, 35, 80, 99, 18, 10751, 10762, 9648, 10763, 10764, 10765, 10766, 10767, 10768, 37, 28].indexOf(id)]) || "ERROR").toUpperCase();
}
//Search for Movies by title (+ year).
function searchm(query) {
	let q2 = query.match(/ \([0-9]{4}\)/);
	let originalQuery = query;
	if (q2 !== null) {
		q2 = q2[0].substring(2, 6);
		query = query.substring(0, query.length - 7) + "&year=" + q2;
	}

	GET("../data/movie-search.json", response => {
		if (response.results && response.results.length > 0) {
			$('#DISPAREAMM').html('');
			flash('rendering ' + response.results.length + ' results...', 0);
			currdatam = response.results;
			for (var i = 0; i < response.results.length; i++) {
				var s = "<span id='MMOOBJ" + i + "' class='MMOOBJ'>" +
					"<img class='MMOCOV' src='" + "https://image.tmdb.org/t/p/w500/" + response.results[i].poster_path + "'>" +
					"<span class='MMODET'>" + response.results[i].overview + "</span>" +
					"<span class='MMOGCN'>";
				for (var j = 0; j < response.results[i].genre_ids.length; j++) {
					s += "<span class='MMOGTG' style='left: " + (2 + (j * 4)) + "%;'>" + genresolvem(response.results[i].genre_ids[j]) + "</span>"
				}
				s += "</span>" +
					"<span class='MMOTTL'>" + response.results[i].title + " (" + (response.results[i].release_date ? response.results[i].release_date.split('-')[0] : 'N/A') + ")</span>" +
					"<span class='MMOFCH' id='MMOFCH" + i + "' state='laze'>FETCH</span>" +
					"</span>";
				$('#DISPAREAMM').append(s);
				if (mmiddb.find(function (z) { return (z == response.results[i].id); })) {
					$('#MMOFCH' + i).attr('state', 'stale');
					$('#MMOFCH' + i).css({ background: 'black', color: 'lime', opacity: 1 });
					$('#MMOFCH' + i).html('STORED');
				}
				mmobind(i);
			}
		} else {
			flash('no results returned.', 2);
		}
	}, err = exc => {
		flash('Error sending search query. Check connection, or key.', 2, 1500);
		console.error(exc);
	});
}
//Search for TV Shows by title + year.
function searcht(query) {
	GET("../data/tv-search.json", response => {
		if (response.results && response.results.length > 0) {
			$('#DISPAREATT').html('');
			flash('rendering ' + response.results.length + ' results...', 0);
			currdatat = response.results;
			for (var i = 0; i < response.results.length; i++) {
				var s = "<span id='TMOOBJ" + i + "' class='TMOOBJ'>" +
					"<img class='TMOCOV' src='" + "https://image.tmdb.org/t/p/w500/" + response.results[i].poster_path + "'>" +
					"<span class='TMODET'>" + response.results[i].overview + "</span>" +
					"<span class='TMOGCN'>";
				for (var j = 0; j < response.results[i].genre_ids.length; j++) {
					s += "<span class='TMOGTG' style='left: " + (2 + (j * 4)) + "%;'>" + genresolvet(response.results[i].genre_ids[j]) + "</span>"
				}
				s += "</span>" +
					"<span class='TMOTTL'>" + response.results[i].name + " (" + (response.results[i].first_air_date ? response.results[i].first_air_date.split('-')[0] : 'N/A') + ")</span>" +
					"<span class='TMOFCH' id='TMOFCH" + i + "' state='laze'>FETCH</span>" +
					"</span>";
				$('#DISPAREATT').append(s);
				if (ttiddb.find(function (z) { return (z == response.results[i].id); })) {
					$('#TMOFCH' + i).attr('state', 'stale');
					$('#TMOFCH' + i).css({ background: 'black', color: 'lime', opacity: 1 });
					$('#TMOFCH' + i).html('STORED');
				}
				currdatat[i].mrbactive = false;
				tmobind(i);
			}
		} else {
			flash('no results returned.', 2);
		}
	}, err = exc => {
		flash('error sending search query. check connection, or key.', 2, 1500);
		console.error(exc);
	});
}
//Search for Artist by name.
function searcha(query) {
	GET("../data/artist-search.json", response => {
		if (response.results && response.results.length > 0) {
			$('#DISPAREAA').html('');
			flash('rendering ' + response.results.length + ' results...', 0);
			currdataa = response.results;
			for (var i = 0; i < response.results.length; i++) {
				var s = "<span id='AAOOBJ" + i + "' class='AAOOBJ'>" +
					"<img class='AAOCOV' src='" + "https://image.tmdb.org/t/p/w500/" + response.results[i].profile_path + "'>" +
					"<span class='AAOWCN'>";
				var k = response.results[i].known_for;
				for (var j = 0; j < Math.min(k.length, 3); j++) {
					if (j == 0) {
						s += "<span class='AAOWTG' style='top: 0%;'>" + ((k[0].media_type.toLowerCase() == 'tv') ? k[0].name : k[0].title) + ' (' + k[0].media_type + ')' + "</span>"
					} else if (j == 1) {
						s += "<span class='AAOWTG' style='top: calc(33.3% + 1px);'>" + ((k[1].media_type.toLowerCase() == 'tv') ? k[1].name : k[1].title) + ' (' + k[1].media_type + ')' + "</span>"
					} else if (j == 2) {
						s += "<span class='AAOWTG' style='top: calc(66.7% + 2px);'>" + ((k[2].media_type.toLowerCase() == 'tv') ? k[2].name : k[2].title) + ' (' + k[2].media_type + ')' + "</span>"
					}
				}
				s += "</span>" +
					"<span class='AAOTTL'>" + response.results[i].name + "</span>" +
					"<span class='AAOFCH' id='AAOFCH" + i + "' state='laze'>FETCH</span>" +
					"</span>";
				$('#DISPAREAA').append(s);
				if (ariddb.find(function (z) { return (z == response.results[i].id); })) {
					$('#AAOFCH' + i).attr('state', 'stale');
					$('#AAOFCH' + i).css({ background: 'black', color: 'lime', opacity: 1 });
					$('#AAOFCH' + i).html('STORED');
				}
				aaobind(i);
			}
		} else {
			flash('no results returned.', 2);
		}
	}, err = exc => {
		flash('Error sending search query. Check connection, or key.', 2, 1500);
		console.error(exc);
	});
}
//Search for Artist by name, to later lead to movies.
function searcham(query) {
	GET("../data/artist-search.json", response => {
		if (response.results && response.results.length > 0) {
			$('#DISPAREMA').html('');
			flash('rendering ' + response.results.length + ' results...', 0);
			currdatama = response.results;
			for (var i = 0; i < response.results.length; i++) {
				var s = "<span id='MAOOBJ" + i + "' class='MAOOBJ'>" +
					"<img class='MAOCOV' src='" + "https://image.tmdb.org/t/p/w500/" + response.results[i].profile_path + "'>" +
					"<span class='MAOWCN'>";
				var k = response.results[i].known_for;
				for (var j = 0; j < Math.min(k.length, 3); j++) {
					if (j == 0) {
						s += "<span class='MAOWTG' style='top: 0%;'>" + ((k[0].media_type.toLowerCase() == 'tv') ? k[0].name : k[0].title) + ' (' + k[0].media_type + ')' + "</span>"
					} else if (j == 1) {
						s += "<span class='MAOWTG' style='top: calc(33.3% + 1px);'>" + ((k[1].media_type.toLowerCase() == 'tv') ? k[1].name : k[1].title) + ' (' + k[1].media_type + ')' + "</span>"
					} else if (j == 2) {
						s += "<span class='MAOWTG' style='top: calc(66.7% + 2px);'>" + ((k[2].media_type.toLowerCase() == 'tv') ? k[2].name : k[2].title) + ' (' + k[2].media_type + ')' + "</span>"
					}
				}
				s += "</span>" +
					"<span class='MAOTTL'>" + response.results[i].name + "</span>" +
					"<span class='MAOFCH' id='AAOFCH" + i + "'></span>" +
					"</span>";
				$('#DISPAREMA').append(s);
				maobind(i);
			}
		} else {
			flash('no results returned.', 2);
		}
	}, err = exc => {
		flash('Error sending search query. Check connection, or key.', 2, 1500);
		console.error(exc);
	});
}
//Search for Artist by name, to later lead to TV shows.
function searchat(query) {
	GET("../data/artist-search.json", response => {
		if (response.results && response.results.length > 0) {
			$('#DISPARETA').html('');
			flash('rendering ' + response.results.length + ' results...', 0);
			currdatta = response.results;
			for (var i = 0; i < response.results.length; i++) {
				var s = "<span id='TAOOBJ" + i + "' class='TAOOBJ'>" +
					"<img class='TAOCOV' src='" + "https://image.tmdb.org/t/p/w500/" + response.results[i].profile_path + "'>" +
					"<span class='TAOWCN'>";
				var k = response.results[i].known_for;
				for (var j = 0; j < Math.min(k.length, 3); j++) {
					if (j == 0) {
						s += "<span class='TAOWTG' style='top: 0%;'>" + ((k[0].media_type.toLowerCase() == 'tv') ? k[0].name : k[0].title) + ' (' + k[0].media_type + ')' + "</span>"
					} else if (j == 1) {
						s += "<span class='TAOWTG' style='top: calc(33.3% + 1px);'>" + ((k[1].media_type.toLowerCase() == 'tv') ? k[1].name : k[1].title) + ' (' + k[1].media_type + ')' + "</span>"
					} else if (j == 2) {
						s += "<span class='TAOWTG' style='top: calc(66.7% + 2px);'>" + ((k[2].media_type.toLowerCase() == 'tv') ? k[2].name : k[2].title) + ' (' + k[2].media_type + ')' + "</span>"
					}
				}
				s += "</span>" +
					"<span class='TAOTTL'>" + response.results[i].name + "</span>" +
					"<span class='TAOFCH' id='TAOFCH" + i + "' state='laze'>FETCH</span>" +
					"</span>";
				$('#DISPARETA').append(s);
				if (ariddb.find(function (z) { return (z == response.results[i].id); })) {
					$('#TAOFCH' + i).attr('state', 'stale');
					$('#TAOFCH' + i).css({ background: 'black', color: 'lime', opacity: 1 });
					$('#TAOFCH' + i).html('STORED');
				}
				taobind(i);
			}
		} else {
			flash('no results returned.', 2);
		}
	}, err = exc => {
		flash('Error sending search query. Check connection, or key.', 2, 1500);
		console.error(exc);
	});
}
//Unified DataStore method (data + img).
function uni_ds(rqobj, ty) {
	if (rqobj[0][0].length == 6) {
		dfptsk(rqobj[0][0][3]);
		const url = `https://api.themoviedb.org/3/${rqobj[0][0][0]}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: 'Bearer ' + tDAK
			}
		};

		fetch(url, options)
			.then(res => {
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				return res.text();
			})
			.then(response => {
				dfptsk(rqobj[0][0][4]);
				GET("../fshandlers/success.txt", res => {
					if (res == 1) {
						dfptsk(rqobj[0][0][5]);
						var jsonobj = JSON.parse(response);
						for (var i = 0; i < rqobj[0][0][2].length; i++) {
							if (rqobj[0][0][2][i][0] > -1) {
								rqobj[1].push(jsonobj.episodes[rqobj[0][0][2][i][0]][rqobj[0][0][2][i][1] + "_path"]);
							} else {
								rqobj[1].push(jsonobj[rqobj[0][0][2][i][1] + "_path"]);
							}
						}
						rqobj[0].reverse().pop();
						rqobj[0].reverse();
						return uni_ds(rqobj, ty);
					}
				})
			})
			.catch(err => {
				flash('error retrieving data - check connection.', 2, 1800);
				fchreset(rqobj[2][0], rqobj[2][1]);
				dfpcrash();
				console.error(err);
			});
	} else {
		dfptsk(rqobj[0][0][2]);
		GET("../../fshandlers/success.txt", res => {

			dfptsk(rqobj[0][0][3]);
			if (rqobj[0].length == 1) {
				libp(ty, rqobj[3], 0, rqobj[4], rqobj[5]);
				dfpkill();
				flash('datafetch successful.', 0, 1800);
				$('#' + rqobj[2][0] + rqobj[2][1]).attr('state', 'stale');
				$('#' + rqobj[2][0] + rqobj[2][1]).html('STORED');
				$('#DFF').velocity({ transformPerspective: ['49.32vw', '49.32vw'], translateY: ['-250vh', '-2vh'], rotateX: ['-40deg', '0deg'], translateZ: ['-70vh', '0vh'], rotateY: [0, 0] }, 800, 'easeInExpo', function () {
					$(['#MMO', '#TMO', '#AMO'][ty]).velocity({ transformPerspective: ['49.32vw', '49.32vw'], scale: [0.86, 0.86], translateY: ['-2vh', '250vh'], rotateX: ['0deg', '30deg'], translateZ: ['0vh', '-70vh'], rotateY: [0, 0] }, 1200, 'easeOutExpo');
				});
			} else {
				rqobj[0].reverse().pop();
				rqobj[0].reverse();
				return uni_ds(rqobj, ty);
			}
		}, err = exc => {
			flash('error in imgstore-ing. check connection and server status.', 2, 1000);
			fchreset(rqobj[2][0], rqobj[2][1]);
			dfpcrash();
			console.error(exc);
		});
	}
}
//Prepares DataStore-ing for TV Shows.
function tv_ds(id, idx, ty) {
	dfpspwn(1, 1, 'datastore progress');
	dfpspwn(2, 2, 'fetching tv show overview');

	GET("../data/tv-id.json", response => {
		dfpprog(2, 50);
		GET("../../fshandlers/success.txt", res => {
			if (res == 1) {
				dfpprog(2, 100);
				dfpkill(2);
				var jsonobj = JSON.parse(response);
				var n = [];

				var dfpr;
				var ifpr = [0, 2];
				for (var i = 0; i < jsonobj.seasons.length; i++) {
					n.push(jsonobj.seasons[i].episode_count);
					ifpr[1] += jsonobj.seasons[i].episode_count;
				}
				ifpr[1] += n.length;
				dfpr = [1, 3 + 2 * n.length];
				dfpprog(1, (dfpr[0] / dfpr[1]) * 100);
				dfpprog(0, ((dfpr[0] + ifpr[0]) / (dfpr[1] + ifpr[1])) / 100);

				var snar = [];
				for (var i = 0; i < n.length; i++) {
					snar.push(jsonobj.seasons[i].season_number);
				}

				var sub = [];
				for (var i = 0; i < n.length; i++) {
					var sub_at = [];
					sub_at.push([-1, 'poster']);
					for (var j = 0; j < n[i]; j++) {
						sub_at.push([j, 'still']);
					}
					dfpr[0]++;
					sub.push(['tv/' + id + '/season/' + snar[i], { cat: 'tv', id: id, type: 'sdet', sno: snar[i] }, sub_at, [[-1, 'S' + (i + 1), 2, 'fetching season ' + (i + 1) + '/' + n.length + ' details']], [['S' + (i + 1), 50], [1, 100 * ((dfpr[0] - 0.5) / dfpr[1])], [0, 100 * ((dfpr[0] - 0.5) / (dfpr[1] + ifpr[1]))]], [['S' + (i + 1), 100], [-2, 'S' + (i + 1)], [1, 100 * (dfpr[0] / dfpr[1])], [0, 100 * (dfpr[0] / (dfpr[1] + ifpr[1]))]]]);
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

				var rq = [sub, [jsonobj.backdrop_path, jsonobj.poster_path], ['TMOFCH', idx], id, n, snar];
				uni_ds(rq, ty);
			}
		})
	}, err => {
		flash('error retrieving data - check connection.', 2, 1800);
		fchreset('TMOFCH', idx);
		dfpcrash();
		console.error(err);
	});
}
//Launch DataStore for Movies, Artists; call tv_ds appropriately for TV Shows.
/*
	sub-item-types are distinguished by the number of components.
		data (movie): 6
		data (tv/overall): 6
		data (tv/season): 7
		data (artist): 6
		img (movie): 4
		img (tv/overall): 4
		img (tv/season): 5
		img (tv/episode): 5
		img (artist): 4
	sub-item-components:
		data (movie):   url (movie/id),
						ds storing parameters,
						img urls to store from current data object (imgname, interpreted as imgname_path),
						pre-process DFP changes,
						mid-process DFP changes,
						post-process DFP changes
		img (movie):    storing parameters,
						img url index,
						pre-process DFP changes,
						post-process DFP changes
		data (artist):  url (person/id),
						ds storing parameters,
						img urls to store from current data object (imgname, interpreted as imgname_path),
						pre-process DFP changes,
						mid-process DFP changes,
						post-process DFP changes
		img (artist):   storing parameters,
						img url index,
						pre-process DFP changes,
						post-process DFP changes
*/
function datastore(ty, id, idx) {
	dfpspwn(0, 0, 'overall progress');
	$(['#MMO', '#TMO', '#AMO'][ty]).velocity({ transformPerspective: ['49.32vw', '49.32vw'], scale: [0.86, 0.86], translateY: ['250vh', '-2vh'], rotateX: ['40deg', '0deg'], translateZ: ['-70vh', '0vh'], rotateY: [0, 0] }, 800, 'easeInExpo', function () {
		$('#DFF').velocity({ transformPerspective: ['49.32vw', '49.32vw'], translateY: ['-2vh', '-250vh'], rotateX: ['0deg', '-30deg'], translateZ: ['0vh', '-70vh'], rotateY: [0, 0] }, 1200, 'easeOutExpo', function () {
			switch (ty) {
				case 0:
					var sub = [
						["movie/" + id, { cat: 'movie', id: id, type: 'overview' }, [[-1, 'backdrop'], [-1, 'poster']], [[-1, 1, 1, 'datastore progress'], [-1, 2, 2, 'fetching movie overview']], [[0, 12.5], [1, 16.7], [2, 50]], [[0, 25], [1, 33.3], [2, 100], [-2, 2]]],
						["movie/" + id + "/credits", { cat: 'movie', id: id, type: 'cast' }, [], [[-1, 3, 2, 'fetching movie cast']], [[0, 37.5], [1, 50], [2, 50]], [[0, 50], [1, 66.7], [2, 100], [-2, 3]]],
						["movie/" + id + "/reviews", { cat: 'movie', id: id, type: 'reviews' }, [], [[-1, 4, 2, 'fetching movie reviews']], [[0, 62.5], [1, 83.3], [2, 50]], [[0, 75], [1, 100], [2, 100], [-2, 4], [-2, 1]]],
						['&cat=movie&id=' + id + '&type=backdrop', 0, [[-1, 5, 1, 'imgstore progress'], [-1, 6, 2, 'fetching movie backdrop']], [[0, 87.5], [1, 50], [2, 100], [-2, 6]]],
						['&cat=movie&id=' + id + '&type=poster', 1, [[-1, 7, 2, 'fetching movie poster']], [[0, 100], [1, 100], [2, 100], [-2, 7], [-2, 5], [-2, 0]]]
					];
					var rq = [sub, [], ['MMOFCH', idx], id];
					uni_ds(rq, ty);
					break;
				case 1:
					tv_ds(id, idx, ty);
					break;
				case 2:
					var sub = [
						["person/" + id, { cat: 'artist', id: id, type: 'details' }, [[-1, 'profile']], [[-1, 1, 1, 'datastore progress'], [-1, 2, 2, 'fetching artist details']], [[0, 12.5], [1, 16.7], [2, 50]], [[0, 25], [1, 33.3], [2, 100], [-2, 2]]],
						["person/" + id + "/movie_credits", { cat: 'artist', id: id, type: 'movie_credits' }, [], [[-1, 3, 2, "fetching artist's movie works"]], [[0, 37.5], [1, 50], [2, 50]], [[0, 50], [1, 66.7], [2, 100], [-2, 3]]],
						["person/" + id + "/tv_credits", { cat: 'artist', id: id, type: 'tv_credits' }, [], [[-1, 4, 2, "fetching artist's tv works"]], [[0, 62.5], [1, 83.3], [2, 50]], [[0, 75], [1, 100], [2, 100], [-2, 4], [-2, 1]]],
						['&cat=artist&id=' + id + '&type=profile', 0, [[-2], [-1, 5, 1, 'imgstore progress'], [-1, 6, 2, 'fetching artist image']], [[0, 100], [1, 50], [2, 100], [-2, 6]]]
					];
					var rq = [sub, [], ['AAOFCH', idx], id];
					uni_ds(rq, ty);
					break;
			}
		});
	});
}

//Add DFP to panel.
function dfpspwn(id, ps, ms) {
	$('#DFF').append('<span class="DFC" id="DFC' + id + '" style="top: ' + (ps * 20) + '%; opacity: 0;"><span class="DFT" id="DFT' + id + '">' + ms + '</span><span class="DFP" id="DFP' + id + '"><span class="DFB" id="DFB' + id + '"></span></span></span>');
	$('#DFC' + id).velocity({ opacity: 1 }, 200);
}
//Remove DFP from panel.
function dfpkill(id) {
	$('#DFC' + id).velocity({ opacity: 0 }, 200, function () {
		$('#DFC' + id).remove();
	});
}
//Halt DFPs.
function dfpcrash() {
	$('.DFP').css({ background: 'linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.1))' });
	$('.DFB').css({ background: 'red', boxShadow: '0 0 10px red' });
	$('#DFF').css({ borderColor: 'red', background: 'rgb(10, 0, 0)' });
	$('#DFCLBTLB').css({ color: 'red' });
	$('#DFCLBTBR').css({ borderColor: 'red' })
	$('#DFRTBTLB').css({ color: 'lime' });
	$('.DFT').velocity({ color: '#ff0000' }, 300);
	$('.DFB').velocity({ boxShadowBlur: 0 }, 300);
}
//Set a DFP's progress.
function dfpprog(id, pr) {
	$('#DFB' + id).velocity({ width: (pr + '%') }, 400, 'easeOutExpo');
}
//Execute a combination of dfpspwn, dfpkill, dfpprog.
function dfptsk(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][0] == -2) {
			dfpkill(arr[i][1]);
		} else if (arr[i][0] == -1) {
			dfpspwn(arr[i][1], arr[i][2], arr[i][3]);
		} else {
			dfpprog(arr[i][0], arr[i][1]);
		}
	}
}
//Query/adjust libindex.
function libp(ty, id, ac, ex = [], ex2 = []) { }

/*
	***PRESERVED FOR SELF-REFERENCE***
	Settable statuses:
		watchlist
		purchased
		downloading
		downloaded
		watching
		watched
		*fav
*/