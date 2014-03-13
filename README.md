[![Build Status](https://travis-ci.org/Samfundet/start2.png)](https://travis-ci.org/Samfundet/start2)

# NBB2
Vi starter opp et prosjekt for å utvikle nytt barsystem til NBB.
`start.samfundet.no` er overmodent og klart for å byttes ut. For å gjøre dette
mer spennende og interessant for de involverte og til en slags lekegrind for de
som måtte være interessert, så blir det uviklet som en Node.js applikasjon.


## Installasjon
NBB2 er en Node.js applikasjon, så du må ha [installert
Node.js](http://nodejs.org/) for å uvikle på det.

I tillegg trenger du [MongoDB](http://docs.mongodb.org/manual/installation/) og
[Redis](http://redis.io/download) installert. Hvis disse ikke startes
automatisk på ditt system, må du starte dem med `mongod` og `redis-server` før
du starter Node-applikasjonen.

1.  `git clone git@github.com/Samfundet/start2.git`
2.  `npm install`
3.  `npm start`

For å legge en bruker til databasen i ditt lokale utviklingsmiljø, kan du kjøre
følgende frekke formulering:

    echo "db.brukere.insert({name:'navn', email:'din@epost.no'})" | mongo nbb

## Utvikling
Alle nye features utvikles på egen branch og merges ved PR.

Vi kjører CI på [travis](https://travis-ci.org/Samfundet/start2). Denne vil
bygge på hvert push til master og deploye appen til Heroku. Konfigureres vha
.travis.yml.
