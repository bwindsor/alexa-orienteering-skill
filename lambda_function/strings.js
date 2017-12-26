const slotMapping = require('./slot_mapping')

languageStrings = {
    'en': {
        translation: {
            INTRO_PHRASE: 'Welcome, orienteer!',
            SKILL_NAME: 'British Orienteering',
            HELP_MESSAGE: 'You can say get upcoming races in east anglia this weekend, or, you can say exit... What can I help you with?',
            STOP_MESSAGE: 'Happy navigating!',
            ERROR_BOF: 'Sorry, I couldn\'t manage to talk to British Orienteering at the moment',
            ERROR_BAD_QUESTION: 'Sorry, I didn\'t understand that',
            DID_YOU_MEAN_RACE: 'I heard you say event... Did you mean race?',
            RACE_DESCRIPTION_GENERATOR: MakeRaceDescription
        },
    },
};

function MakeRaceDescription(allData, queryData) {
    var numRaces = allData.length;
    if (numRaces == 0) {
        return "There are no upcoming races."
    }
    var data = allData[0];
    var locString = MakeLocationString(allData);
    var dateString = 'on ' + data.date;
    var combinedString = null;
    if (locString) {
        combinedString = locString + ' ' + dateString;
    } else {
        combinedString = 'The next one is ' + dateString + ', but I\'m not sure where';
    }

    // These properties are accepted directly by BOF's API
    //     assoc: "EAOA",
    //     club: "WAOC,LEI",
    //     level: "int,a,b,c,d,act"
    var locationBounceString = '';
    if (queryData.assoc) {
        locationBounceString = ' in ' + slotMapping.regionToSpeech[queryData.assoc];
    }
    var levelBounceString = '';
    if (queryData.level) {
        levelBounceString = ' ' + slotMapping.raceLevelToSpeech[queryData.level];
    }

    return 'There are ' + numRaces.toString() + levelBounceString + ' races' + locationBounceString + '. ' + combinedString + '.';
}

function MakeLocationString(allData) {
    if (allData.length == 0){
        return null;
    }
        var firstDateStrings = allData.filter(d => d.date == allData[0].date).map(data => {
            if (data.venue.trim() && data.nearest_town.trim()) {
                return 'at ' + data.venue + ' near ' + data.nearest_town;
            } else if (data.venue.trim()) {
                return 'at ' + data.venue;
            } else if (data.nearest_town.trim()) {
                return 'near ' + data.nearest_town;
            } else {
                return null;
            }
        });
    if (firstDateStrings.length == 1) {
        return 'The next one is ' + firstDateStrings[0];
    } else {
        var commaParts = firstDateStrings.slice(0, firstDateStrings.length - 1).join(', ');
        return 'The next ones are ' + commaParts + ' and ' + firstDateStrings[firstDateStrings.length - 1];
    }
}

module.exports = {
    MakeRaceDescription: MakeRaceDescription
}
module.exports.default = languageStrings;