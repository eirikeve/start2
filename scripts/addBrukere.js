//Add brukere as JSON here:
var brukere = [];

db.brukere.insert(brukere);

//To run:
//mongo [server] -u [username] -p [password] scripts/addBrukere.js
//Server URL, username and password can be found with `heroku config -a start2`
