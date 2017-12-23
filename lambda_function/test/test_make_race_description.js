var strings = require('../strings')

var data = [
    {
        date: '2018-11-25',
        title: 'East Midlands League 2018',
        link: 'https://www.britishorienteering.org.uk/index.php?pg=event&amp;event=72331',
        venue: 'Bradgate Park',
        nearest_town: 'Leicester',
        grid_ref: '',
        club: 'LEI',
        association: 'EMOA',
        level: 'Regional',
        postcode: '',
        number: '72331'
    },
    {
        date: '2018-11-25',
        title: 'Rowney Warren event',
        link: 'https://www.britishorienteering.org.uk/index.php?pg=event&amp;event=73129',
        venue: 'Rowney Warren',
        nearest_town: 'Shefford',
        grid_ref: 'TL123403',
        club: 'WAOC',
        association: 'EAOA',
        level: 'Regional',
        postcode: 'SG17 5QB',
        number: '73129'
    }];

var desc = strings.MakeRaceDescription(data);

console.log(desc);