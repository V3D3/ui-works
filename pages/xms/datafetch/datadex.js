//LOOKUP.JS WAS CONVERTED INTO DATADEX.JS.

//DECISION: INDEXEDDB WILL PROVIDE DATADEX's FUNCTIONALITY.

//DEVELOPER VARIABLES

const ddx_v = 1;

//VARIABLES

var ddxreqefx = function(e){console.log(e)};
var ddx;

function load_ddx()  {
    var ddxreq = window.indexedDB.open('xms_ddex', ddx_v);
    ddxreq.onsuccess = function(e)  {
        ddx = e.target.result;
    };
    ddxreq.onupgradeneeded = function(e) { 
        ddx = e.target.result;
        //To be used in development.
        //In a consumer-ready edition, this should throw an error.
    };
    ddxreq.onerror = ddxreqefx;
}
//Add item to datadex.
function ddx_add_m(obj, defstat = 'watchlist')  {
    ddx.transaction(function (y) {
        var sarr = ['', '', '', ''];
        var darr = [obj.cast, obj.crew, obj.genres, obj.production_companies, obj.spoken_languages];
        for(var j = 0; j < darr.length; j++)  {
            for(var i = 0; i < darr[j].length; i++)  {
                if(darr[j][i].name)  {
                    sarr[j] += darr[j][i].name + ', ';
                }
            }
        }

        //main data
        y.executeSql('INSERT INTO movies (id, text, collection, budget, cast, crew, genre, production_company, runtime, year, vote_average, revenue, popularity, spoken_languages, p_rating, p_libstat, p_libstatx, homepage, overview, status, tagline, adult, lists, favorite) VALUES (' + obj.id + ', "' + obj.title + '", "' + obj.belongs_to_collection.name + '", ' + obj.budget + ', [' + darr[0].susbtr(0, darr[0].length - 2) + '], [' + darr[1].substr(0, darr[1].length - 2) + '], [' + darr[2].substr(0, darr[2].length - 2) + '], [' + darr[3].substr(0, darr[3].length - 2) + '], ' + obj.runtime + ', ' + obj.release_date.substr(0, 4) + ', ' + obj.vote_average + ', ' + obj.revenue + ', ' + obj.popularity + ', ' + darr[4].susbtr(0, darr[4].length - 2) + ', -1, ' + defstat + ', -1, ' + obj.homepage + ', ' + obj.overview + ', ' + obj.status + ', ' + obj.tagline + ', ' + obj.adult + ', [], [])');

        //libindex
        y.executeSql('INSERT INTO libindex_movies (id, status, statusx) VALUES (' + id + ', ' + defstat + ', ' + '-1)');

        //encountered
        y.executeSql('INSERT INTO encountered (cat, id, name) VALUES (movie, ' + obj.id + ', ' + obj.title + ')');
    });
}

//Remove item from datadex.
//To be used before the files related to the object are deleted.
function remddx_m(id)  {
    ddx.transaction(function(y)  {
        y.executeSql('DELETE FROM movies WHERE id = ' + id);
        y.executeSql('DELETE FROM libindex_movies WHERE id = ' + id);
    });
}

//Replace the current library (in datadex) with that which is physically present in JSON files, in xms/data.
function scrddx_m()  {
    scandir(doc_root + '/data/json/movie/', function(d)  {
        scrddx_m_uni(d);
    });
}

function scrddx_m_uni(arr)  {
    
}

//The good stuff...
//TO TAKE CARE OF WHILE SEARCHING:
//For artists, while searching for a name, also look in also_known_as.
function qry_ddx_m(prop, query, ret, queryx)  {
    ddx.transaction(function(y)  {
        if(queryx === undefined)  {
            y.executeSql('SELECT ' + ret + ' FROM movies WHERE ' + prop + ' = ' + query);
        }  else if(queryx > query)  {
            y.executeSql('SELECT ' + ret + ' FROM movies WHERE ' + prop + ' > ' + query + ' AND ' + prop + ' < ' + queryx);
        }  else if(queryx < query)  {
            y.executeSql('SELECT ' + ret + ' FROM movies WHERE ' + prop + ' > ' + queryx + ' AND ' + prop + ' < ' + query);
        }
    });
}