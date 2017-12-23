const slotMapping = require('./slot_mapping')

languageStrings = {
    'en': {
        translation: {
            INTRO_PHRASE: 'Welcome, orienteer!',
            SKILL_NAME: 'British Orienteering',
            HELP_MESSAGE: 'You can say get upcoming races in east anglia this weekend, or, you can say exit... What can I help you with?',
            STOP_MESSAGE: 'Happy navigating!',
            ERROR_BOF: 'Sorry, I couldn\'t manage to talk to British Orienteering at the moment',
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
    var locString = 'The next one is ';
    if (data.venue && data.nearest_town) {
        locString += 'at ' + data.venue + ' near ' + data.nearest_town;
    } else if (data.venue) {
        locString += 'at ' + data.venue;
    } else if (data.nearest_town) {
        locString += 'near ' + data.nearest_town;
    } else {
        // Note equals not plus-equals
        locString = null;
    }
    var dateString = null;
    if (data.date) {
        dateString = 'on ' + data.date;
    }
    var combinedString = null;
    if (locString && dateString) {
        combinedString = locString + ' ' + dateString;
    } else if (locString) {
        combinedString = locString;
    } else if (dateString) {
        combinedString = 'The next one is ' + dateString + ', but I\'m not sure where';
    } else {
        combinedString = 'I\'m not sure where or when the next one is though';
    }

    // These properties are accepted directly by BOF's API
//     assoc: "EAOA",
//     club: "WAOC,LEI",
//     level: "int,a,b,c,d,act"
    var bounceString = '';
    if (queryData.assoc) {
        bounceString = ' in ' + slotMapping.regionToSpeech(queryData.assoc);
    }

    return 'There are ' + numRaces.toString() + ' upcoming races' + bounceString + '. ' + combinedString + '.';
}

module.exports = {
    MakeRaceDescription: MakeRaceDescription
}
module.exports.default = languageStrings;