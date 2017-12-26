const region = {
    'swoa': 'swoa',
    'seoa': 'seoa',
    'scoa': 'scoa',
    'eaoa': 'eaoa',
    'emoa': 'emoa',
    'wmoa': 'wmoa',
    'woa': 'woa',
    'yhoa': 'yhoa',
    'neoa': 'neoa',
    'nwoa': 'nwoa',
    'nioa': 'nioa',
    'soa': 'soa',
    'south west': 'swoa',
    'south east': 'seoa',
    'south central': 'scoa',
    'east anglia': 'eaoa',
    'east midlands': 'emoa',
    'west midlands': 'wmoa',
    'wales': 'woa',
    'yorkshire': 'yhoa',
    'yorkshire and humberside': 'yhoa',
    'north east': 'neoa',
    'north west': 'nwoa',
    'northern ireland': 'nioa',
    'scotland': 'soa'
}
const regionToSpeech = {
    'swoa': 'south west',
    'seoa': 'south east',
    'scoa': 'south central',
    'eaoa': 'east anglia',
    'emoa': 'east midlands',
    'wmoa': 'west midlands',
    'woa': 'wales',
    'yhoa': 'yorkshire and humbershide',
    'neoa': 'north east',
    'nwoa': 'north west',
    'nioa': 'northern ireland',
    'soa': 'scotland',
}

const raceLevel = {
    'level a': 'a',
    'level b': 'b',
    'level c': 'c',
    'level d': 'd',
    'international': 'int',
    'activity': 'act'
}
const raceLevelToSpeech = {
    'a': 'level A',
    'b': 'level B',
    'c': 'level C',
    'd': 'level D',
    'int': 'international',
    'act': 'activity'
}

const racesWord = [
    'races',
    'orienteering races',
    'events',
    'orienteering events',
    'orienteering',
    'competitions'
]

module.exports = {
    region: region,
    regionToSpeech: regionToSpeech,
    raceLevel: raceLevel,
    raceLevelToSpeech: raceLevelToSpeech,
    racesWord: racesWord
}