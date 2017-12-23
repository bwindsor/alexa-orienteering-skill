const bofApi = require('../bof_api');

// “today”: 2015-11-24
Check('2015-11-24', '2015-11-24', bofApi.AwsDateToRange('2015-11-24'));
// “this week”: 2015-W48
Check('2015-11-23', '2015-11-29', bofApi.AwsDateToRange('2015-W48'));
// “this weekend”: 2015-W48-WE
Check('2015-11-28', '2015-11-29', bofApi.AwsDateToRange('2015-W48-WE'));
// “this month”: 2015-11
Check('2015-11-01', '2015-11-30', bofApi.AwsDateToRange('2015-11'));
// “next year”: 2016
Check('2016-01-01', '2016-12-31', bofApi.AwsDateToRange('2016'));
// “this decade”: 201X
Check('2010-01-01', '2019-12-31', bofApi.AwsDateToRange('201X'));
// “next winter”: 2017-WI
Check('2017-12-01', '2018-02-28', bofApi.AwsDateToRange('2017-WI'));

function Check(exp1, exp2, act) {
    endDate = new Date(exp2);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setTime(endDate.getTime() - 1);
    var exp = [new Date(exp1), endDate];
    if (exp[0].getTime() == act[0].getTime() && exp[1].getTime() == act[1].getTime()) {
        console.log('pass');
    } else {
        console.log('FAIL, exp ' + exp[0].toString() + ' - ' + exp[1].toString() + ', but got ' + act[0].toString() + '-' + act[1].toString());
    }
}