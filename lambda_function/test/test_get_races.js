var bofApi = require('../bof_api')

bofApi.GetRaces({
    club: "WAOC,LEI",
    level: "b,c",
    search_date: "2018-SP"
}).then(data => {
    console.log(data)
    console.log(data.length)
})
.catch(err => console.log(err))