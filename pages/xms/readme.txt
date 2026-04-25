The following readme is for developers. XMS is a consumer application.

XMS is a multimedia (X) metadata fetching and management (M) system (S).
Currently, supported items are Movies, TV Shows and Artists.

It is currently written in HTML, CSS, JS and PHP, and is targeted to have NodeJS and pure JS alternatives to PHP.
Under JS, it utilizes jQuery, VelocityJS, and derivatives of, from the same original author, XPR // Tipsy, and others.

Metadata fetching is handled by the DataFetch set of pages/scripts, which is further segragated into:
~ SpeccyFetch, for singular item fetching.
~ BulkFetch, for multiple, automated, item fetching.
~ ListFetch, for multiple, semi-automated, item fetching.
~ WebFetch, for recursive fetching based on (x: ) items related to (goto x).
The data is supplied by TMDb, for which, the user has to enter a self-acquired TMDb API key.

Metadata viewing is the main functionality of XMS, handled by pages coded with names derived from "XMS".
Multiple methods of viewing shall be offered. Multiple views shall be offered.
Methods of viewing: Fully animated, immersive experiences; functional, dense interfaces, et cetera.
Views: (under immersive) Carousel, Disorderly Pile, et cetera.

DATAFETCH.
In each DataFetch sub-page, the user is asked, first, for the category of the queries to be made - for now, Movies, TV Shows and Artists. The only other common parameter required is the query itself. Variations other than SpeccyFetch might require more (required/optional) parameters.
The results from TMDb are either presented to the user, or traversed through internally, and upon the decision for fetching a particular item, DataFetch is launched:
//NOTE: the below mechanism has not been fully incorporated into the code.
~ First, the TMDb API is requested for the full details of the item. This might be done recursively for multiple pieces of data related to the same item, say details for multiple Seasons of a TV Show.
~ The data acquired is stored as-is as a JSON file on the user's storage, in the application folder (achieved via a PHP/NodeJS script).
~ The data is parsed as a JavaScript object and scraped through for all relevant information, which is then inserted into an IndexedDB database (JS).
~ The image URLs contained in the parsed data were extracted in the above step. These images are now fetched and saved to the user's storage (via a PHP/NodeJS script).
~ The libindex is then updated, which is a separate table in the common XMS IndexedDB database, with details of the items added.

In SpeccyFetch, the selection of the item-to-be-fetched is done by the user.
In BulkFetch, it is done automatically on the basis of the priority, or extra information entered by the user.
In ListFetch, it is done by the user, from a handful of the top results presented to the user.
In WebFetch, all matches are selected.

To enhance XMS's portability, and also, ease development, some extra scripts are present under xtools. These may fit under any function of XMS. Those that are concerned with DataFetch are:
LOADX (PHP/NWJS + JS)
Loads a previous configuration, alongside previously fetched data, of XMS from a specified ZIP/RAR/7Z file.
RESET (PHP/NWJS + JS)
Discards all data (including user configuration and fetched data).
SAVEX (PHP/NWJS + JS)
Saves the current configuration and fetched data (but not processed data) to a ZIP/RAR/7Z file.
REFX (PHP/NWJS + JS)
Traverses through all the JSON files physically present, and adds them to the IndexedDB database, if not present.

XMS.
