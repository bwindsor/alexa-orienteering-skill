const fetch = require('node-fetch');

const API_BASE = "https://www.britishorienteering.org.uk/fixturesjson.php"

function ObjectToQueryString(obj) {
    var sections = [];
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
        sections.push(propNames[i] + "=" + obj[propNames[i]].toString());
    }
    return sections.join("&");   
}

/*
options example:
{
    assoc: "EAOA",
    club: "WAOC,LEI",
    level: "int,a,b,c,d,act"
}
*/
function GetRaces(options) {
    const url = API_BASE + "?" + ObjectToQueryString(options)
    return fetch(url).then(res => res.json())
}

module.exports = {
    GetRaces: GetRaces
}