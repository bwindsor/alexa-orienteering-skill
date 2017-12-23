const fetch = require('node-fetch');
const AmazonDateParser = require('amazon-date-parser');

const API_BASE = "https://www.britishorienteering.org.uk/fixturesjson.php"

function ObjectToQueryString(obj, allowedKeys) {
    var sections = [];
    var propNames = Object.getOwnPropertyNames(obj).filter(d => allowedKeys.indexOf(d) > -1);
    for (var i = 0; i < propNames.length; i++) {
        sections.push(propNames[i] + "=" + obj[propNames[i]].toString());
    }
    return sections.join("&");
}

/*
options example:
{
    // These properties are accepted directly by BOF's API
    assoc: "EAOA",
    club: "WAOC,LEI",
    level: "int,a,b,c,d,act"

    // These need to be processed locally
    start_date: "2017-12-08",
    end_date: "2017-12-09",
    search_date: null
}
*/
function GetRaces(options) {
    const url = API_BASE + "?" + ObjectToQueryString(options, [
        'assoc', 'club', 'level'
    ]);
    var date_range = [null, null];
    if (options.hasOwnProperty('start_date')) {
        var start_range = AwsDateToRange(options.start_date);
        date_range[0] = start_range[0];
    }
    if (options.hasOwnProperty('end_date')) {
        var end_date_range = AwsDateToRange(options.end_date);
        date_range[1] = end_date_range[1];
    }
    if (options.hasOwnProperty('search_date')) {
        date_range = AwsDateToRange(options.search_date);
    }
    return fetch(url).then(res => res.json()).then(data => new Promise((resolve, reject) => {
        resolve(
            data.filter(d => {
                var date = new Date(d.date);
                if (!d.valueOf()) { return false; }
                return (date_range[0] ? date >= date_range[0] : true) && (date_range[1] ? date <= date_range[1] : true)
            })
        )
    }))
}

function AwsDateToRange(d) {
    try {
        var date = new AmazonDateParser(d);
    } catch (e) {
        console.log(e);
        return null;
    }
    return [date.startDate, date.endDate];
}

module.exports = {
    GetRaces: GetRaces,
    AwsDateToRange: AwsDateToRange
}