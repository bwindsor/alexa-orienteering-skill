languageStrings = {
    'en': {
        translation: {
            INTRO_PHRASE: 'Welcome, orienteer!',
            SKILL_NAME: 'British Orienteering',
            HELP_MESSAGE: 'You can say get upcoming races in east anglia this weekend, or, you can say exit... What can I help you with?',
            STOP_MESSAGE: 'Happy navigating!',
            RACE_DESCRIPTION_GENERATOR: MakeRaceDescription
        },
    },
};

function MakeRaceDescription(data) {
    return 'The next race is somewhere at some point'
}

exports.default = languageStrings;