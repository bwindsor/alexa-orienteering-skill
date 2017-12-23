var bofApi = require('../bof_api')

bofApi.GetRaces({
    club: "WAOC,LEI",
    level: "b,c"
}).then(data => console.log(data))
.catch(err => console.log(err))