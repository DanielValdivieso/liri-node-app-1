var keys = require("./keys.js");

var twitterCredentials = keys.twitterKeys;

var command = process.argv[2];

if(command === "my-tweets") {
	var Twitter = require('twitter');

	var client = new Twitter({
		consumer_key: twitterCredentials.consumer_key,
		consumer_secret: twitterCredentials.consumer_secret,
		access_token_key: twitterCredentials.access_token_key,
		access_token_secret: twitterCredentials.access_token_secret
	});

	var params = {
		screen_name: 'GiantGreenLion',
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {

	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
	});
} else if(command === "spotify-this-song") {
	var spotify = require('spotify');
	
	var trackQuery = process.argv[3];

	if(trackQuery === undefined) {
		trackQuery = "the sign ace of base";
	}

	spotify.search({ type: 'track', query: trackQuery }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	 		for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
	 			if(i === 0) {
	 				console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
	 			} else {
	 				console.log("              " + data.tracks.items[0].artists[i].name);
	 			}
	 		}
	    console.log("Song:         " + data.tracks.items[0].name);
	    console.log("Preview Link: " + data.tracks.items[0].preview_url);
	    console.log("Album:        " + data.tracks.items[0].album.name);
	});
} else if(command === "movie-this") {
	var request = require("request");

	var movieQuery = process.argv[3];

	if(movieQuery === undefined) {
		movieQuery = "mr nobody";
	}

	request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&r=json", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log("* Title of the movie:         " + JSON.parse(body).Title);
	    console.log("* Year the movie came out:    " + JSON.parse(body).Year);
	    console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
	    console.log("* Country produced:           " + JSON.parse(body).Country);
	    console.log("* Language of the movie:      " + JSON.parse(body).Language);
	    console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
	    console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

	    for(var i = 0; i < JSON.parse(body).Ratings.length; i++) {
	    	if(JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
	    		console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
	    		if(JSON.parse(body).Ratings[i].Website !== undefined) {
	    			console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
	    		}
	    	}
	    }
	  }
	});
} else if(command === "do-what-it-says") {

}