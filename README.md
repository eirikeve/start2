# NBB2
Vi starter opp et prosjekt for å utvikle nytt barsystem til NBB. `start.samfundet.no` er overmodent og klart for å byttes ut. For å gjøre dette mer spennende og interessant for de involverte og til en slags lekegrind for de som måtte være interessert, så blir det uviklet som en Node.js applikasjon.


## Installasjon
NBB2 er en Node.js applikasjon, så du må ha [installert Node.js](http://nodejs.org/) for å uvikle på det. 

1.  Clone repo `git clone git@github.com/Samfundet/start2.git`
2.  `npm install`
3.  `node app.js`

## Teknologi-stack

### Database
Vi kjører MongoDB i backend. [MongoDB](http://www.mongodb.org/) er en NoSQL/Dokumentdatabase database.

### Server
Applikasjonen er skrevet i JavaScript og kjører på [Node.js](http://nodejs.org/api/).

### Klient
Vi bruker [Browserify](http://browserify.org/) som dependency manager og genererer det meste via serverside templates med litt javascript-sprinkles for å få litt _kapow!_.

### Rasjonale
Ruby on Rails er ikke valgt for dette prosjektet, til en forandring, fordi det er sunt å utvide sine horisonter og kunne jobbe med flere ulike programmeringspråk og platformer. Node.js legger opp til større frihet for utvikleren og større plass til å eksperimentere.

## Oppgaver
Vi kjører [Trello](https://trello.com/b/3jJE4Y3o/start2) for oppgaver. Det er organisert slik:

**Kø**<br />
Her legges alle feature-requests. Fyll inn relevant informasjon, spesifiser krav, splitt opp i hensiktsmessige oppgaver og flytt de over til **klar**.

**Klar**<br />
Her er oppgaver som er klare til plukking. Når en oppgave plukkes flyttes den over til **utvikling**.

**Utvikling**<br />
Oppgaver som blir jobbet på ligger i utvikling. Hver utvikler skal ikke ha mer enn en oppgave i utvikling samtidig. Når en oppgave er ferdig flyttes den til **QA**. Hvis en oppgave ikke er ferdig og uvikleren vil bytte til en annen oppgave flyttes oppgaven tilbake til **klar**.

**QA**<br />
Oppgaver som er ferdig utviklet skal testes mot kravene og kvalitetssikres. Når dette er gjort opprettes en pull-request for oppgaven. Når pull-requesten er godkjent av en annen utvikler flyttes oppgaven til **ferdig**.

**Ferdig**<br />
Oppgaver som er ferdig i QA legges her.