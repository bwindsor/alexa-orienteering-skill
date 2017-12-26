var fs = require('fs')
var utterances = require('alexa-utterances');

var templates = [
    'GetRaces {findCommand}',
    'GetRaces {findCommand} {dateTemplate}',
    'GetRaces {findCommand} {locationTemplate}',
    'GetRaces {findCommand} {locationTemplate} {dateTemplate}',
    'GetRaces {findCommand} {dateTemplate} {locationTemplate}',
];
var slots = {}
var subDict = {
    findWord: ['find', 'get'],
    racesWord: ['races', 'orienteering races', 'events', 'orienteering events', 'orienteering', 'competitions']
}
var dictionary = {
    findCommand: [
        utterances('{findWord} {racesWord}', {}, subDict),
        utterances('{findWord} {-|Level} {racesWord}', {}, subDict).map(s => s.replace('{Level}', '{-|Level}')),
        ['what\'s on'],
    ].reduce((a,b) => a.concat(b), []),
    dateQualifier: [' on', ''],
    locationTemplate: [
        'in {-|Region}'
    ],
    dateTemplate: [
        '{-|RaceDate}',
        'on {-|RaceDate}',
        'from {-|StartDate} to {-|EndDate}',
        'from {-|StartDate} until {-|EndDate}',
        'between {-|StartDate} and {-|EndDate}'
    ]
}

var list = templates.map(t => utterances(t, slots, dictionary)).reduce((a,b) => a.concat(b), [])
fs.writeFileSync('utterances.txt', list.join('\n'))