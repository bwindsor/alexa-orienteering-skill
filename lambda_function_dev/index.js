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
}
var dictionary = {
    findCommand: [
        ReUtter(utterances('{findWord} {-|RacesWord}', {}, subDict), ['RacesWord']),
        ReUtter(utterances('{findWord} {-|Level} {-|RacesWord}', {}, subDict), ['Level', 'RacesWord']),
        ['what\'s on'],
    ].reduce((a, b) => a.concat(b), []),
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

var list = templates.map(t => utterances(t, slots, dictionary)).reduce((a, b) => a.concat(b), [])
fs.writeFileSync('utterances.txt', list.join('\n'))

function ReUtter(arr, typeList) {
    return arr.map(s => {
        for (var i = 0; i < typeList.length; i++) {
            s = s.replace('{' + typeList[i] + '}', '{-|' + typeList[i] + '}')
        }
        return s
    })
}