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
            DID_YOU_MEAN_RACE: 'I heard you say event. Did you mean race?',
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
    var locDateString = MakeLocationDateString(allData);
    
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

    return 'I found ' + numRaces.toString() + levelBounceString + ' race' + (numRaces > 1 ? 's' : '') + locationBounceString + '. ' + locDateString + '.';
}

function MakeLocationDateString(allData) {
    if (allData.length == 0) {
        return null;
    }
    var dateStrings = allData.map(data => {
        if (data.venue.trim() && data.nearest_town.trim()) {
            return 'at ' + data.venue + ' near ' + data.nearest_town + ' on ' + data.date;
        } else if (data.venue.trim()) {
            return 'at ' + data.venue + ' on ' + data.date;
        } else if (data.nearest_town.trim()) {
            return 'near ' + data.nearest_town + ' on ' + data.date;
        } else {
            return null;
        }
    }).filter(s => s != null);
    if (dateStrings.length == 1) {
        return 'It is ' + dateStrings[0];
    } else {
        var commaParts = dateStrings.slice(0, dateStrings.length - 1).join(', ');
        return 'They are ' + commaParts + ', and ' + dateStrings[dateStrings.length - 1];
    }
}

module.exports = {
    MakeRaceDescription: MakeRaceDescription
}
module.exports.default = languageStrings;