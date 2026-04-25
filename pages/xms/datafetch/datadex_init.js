//Load vs. Init: Init is used at XMS's initial run (xms_init/INVOLVE), only once.
//Load is used susequently, whenever datadex is involved.
//Generates empty database, tables for movies, tv shows, artists.
function init_ddx()  {
    var ddxreq = window.indexedDB.open('xms_ddex', 1);
    ddxreq.onsuccess = function(e)  {
        ddx = e.target.result;
    };
    ddxreq.onupgradeneeded = function(e) {
		ddx = e.target.result;
		var os = [];
		//maindata (overview/sdet/details)
		os.push(ddx.createObjectStore('MD_MOVIE', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('MD_ARTIST', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('MD_COLLECTION', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('MD_TV', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('MD_TVS', {keyPath: 'id'}));
        //cast
        os.push(ddx.createObjectStore('CS_MOVIE', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('CS_TV', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('CS_TVS', {keyPath: 'id'}));
        //crew
        os.push(ddx.createObjectStore('CR_MOVIE', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('CR_TV', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('CR_TVS', {keyPath: 'id'}));
        //reviews
        os.push(ddx.createObjectStore('RV_MOVIE', {keyPath: 'id'}));
		os.push(ddx.createObjectStore('RV_TV', {keyPath: 'id'}));
		//credits
		os.push(ddx.createObjectStore('MS_ARTIST', {autoIncrement: true})); //moviecast
		os.push(ddx.createObjectStore('MR_ARTIST', {autoIncrement: true})); //moviecrew
		os.push(ddx.createObjectStore('TS_ARTIST', {autoIncrement: true})); //tvcast
		os.push(ddx.createObjectStore('TR_ARTIST', {autoIncrement: true})); //tvcrew
        //libindexes
        os.push(ddx.createObjectStore('LIBINDEX_MOVIE', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('LIBINDEX_ARTIST', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('LIBINDEX_COLLECTION', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('LIBINDEX_TV', {keyPath: 'id'}));
        os.push(ddx.createObjectStore('LIBINDEX_TVS', {autoIncrement: true}));
        os.push(ddx.createObjectStore('LIBINDEX_TVE', {autoIncrement: true}));
        //watchindex
        //Singular. Dynamic. Items are added when left abruptly at a non-NotCrucial time:
        //NotCrucial time:  10% of total runtime from the end, 1% of total runtime from the beginning.
        //Applicable to Movies, TV Episodes ONLY.
        os.push(ddx.createObjectStore('WATCHINDEX', {autoIncrement: true}));
        //encountered
        /*
            Encountered format:
            {cat: 'movie/tv show/artist/collection', name: 'MovieName/TVShowName/ArtistName/CollectionName', id: '2/2/2/2', uid (autoincrement): '0/1/2/3'}
        */
		os.push(ddx.createObjectStore('ENCOUNTERED', {autoIncrement: true}));

		//Now... to create indexes.
		//Note: these are indexed keys only, not all the keys that would be stored.

		//UPDATE REQUIRED:
		//	ACCOUNT FOR USERPREFS HERE. (FAV, LISTS, RATING)

		var arr = 	[
						["adult", "collection", "budget", "genres", "homepage", "popularity", "production_companies", "production_countries", "release_year", "release_date", "revenue", "runtime", "spoken_languages", "status", "title", "vote_average"],
						["adult", "also_known_as", "birth_year", "birth_day", "gender", "homepage", "known_for_department", "name", "place_of_birth", "popularity"],
						[
							//collection
						],
						["created_by", "episode_runtime", "genres", "first_year", "homepage", "in_production", "last_year", "name", "networks", "number_of_episodes", "number_of_seasons",  "origin_country", "popularity", "production_companies", "status", "type", "vote_average", "year"],
						["id", "year", "season_number", "name", "episode_name", "number_of_episodes"],
						["id", "name", "char_name", "gender"],
						["id", "name", "char_name", "gender"],
						["id", "name", "char_name", "gender"],
						["id", "name", "department", "gender", "job"],
						["id", "name", "department", "gender", "job"],
						["id", "name", "department", "gender", "job"],
						["id", "author"],
						["id", "author"],
						["id", "character", "adult", "genres", "title", "popularity", "vote_average", "release_year", "release_date"],
						["id", "department", "job", "adult", "genres", "title", "popularity", "vote_average", "release_year", "release_date"],
						["id", "character", "genres", "name", "popularity", "vote_average", "first_year", "episode_count"],
						["id", "department", "job", "genres", "name", "popularity", "vote_average", "first_year", "episode_count"],
						["id", "status", "title"],
						["id", "name"],
						["id", "status", "name"],
						["id", "status", "name"],
						["id", "season_number", "status", "oname"],
						["id", "season_number", "episode_number", "status", "oname"], /* not a typo */
						["idx", "watched"],
						["cat", "id", "name"]
					];
		//idx: 	nnnn + "m" for movies
		//		nnnn + "s" + nn + "e" + nn for tv episodes
		//watched:	last moment (in seconds) watched
		for(var j = 0; j < os.length; j++)  {
			for(var i = 0; i < arr[j].length; i++)  {
				os[j].createIndex(arr[j][i], arr[j][i], {unique: false});
			}
		}

    };
    ddxreq.onerror = ddxreqefx;
}