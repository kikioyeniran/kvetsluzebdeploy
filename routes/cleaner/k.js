//var scheduleClientDetails = [];
function getObject(schedule){
    var test = [];
    var myPromise = () => {
        return new Promise((resolve, reject)=>{
            for(var i=0; i<schedule.length; i++){
                var tempSchedule = schedule[i];
                query3 = {clientID: schedule[i].clientID};
                //test.push(i);
                let newObject = {};
                ClientDetails.findOne((query3), (err, clientDetails)=>{
                    if(err){
                        reject(err);
                    }else{
                        var clientDetails = clientDetails;
                        var firstClean = false;
                        if(empty(tempSchedule.lastClean)){
                            firstClean = true;
                        }else{
                            var lastCleanDate = tempSchedule.lastClean[0].lastCleanDate;
                            var lastCleanDate = new Date(lastCleanDate);
                            var lastCleanDate = date.format(lastCleanDate, 'ddd, MMM DD YYYY');
                        }
                        var currentCleanDate = tempSchedule.currentClean[0].currentCleanDate;
                        var currentCleanDate = new Date(currentCleanDate);
                        var currentCleanDate = date.format(currentCleanDate, 'ddd, MMM DD YYYY');
                        var nextCleanDate = tempSchedule.currentClean[0].nextCleanDate;
                        var nextCleanDate = new Date(nextCleanDate);
                        var nextCleanDate = date.format(nextCleanDate, 'ddd, MMM DD YYYY');
                        newObject.clientDetails = clientDetails;
                        newObject.currentCleanDate = currentCleanDate;
                        newObject.lastCleanDate = lastCleanDate;
                        newObject.nextCleanDate = nextCleanDate;
                        resolve(newObject);
                        //console.log(newObject);
                    }
                })
            }

        })
    };

    myPromise().then(res=>{
        test = res.json( result);
    })
    return test;
}
var x = getObject(schedule);
console.log(x);
var test = [];
for(var i=0; i<schedule.length; i++){
    var tempSchedule = schedule[i];
    query3 = {clientID: schedule[i].clientID};

    ClientDetails.findOne((query3), (err, clientDetails)=>{
        //
        var clientDetails = clientDetails;
        let newObject = {};
        var firstClean = false;
        if(empty(tempSchedule.lastClean)){
            firstClean = true;
        }else{
            var lastCleanDate = tempSchedule.lastClean[0].lastCleanDate;
            var lastCleanDate = new Date(lastCleanDate);
            var lastCleanDate = date.format(lastCleanDate, 'ddd, MMM DD YYYY');
        }
        var currentCleanDate = tempSchedule.currentClean[0].currentCleanDate;
        var currentCleanDate = new Date(currentCleanDate);
        var currentCleanDate = date.format(currentCleanDate, 'ddd, MMM DD YYYY');
        var nextCleanDate = tempSchedule.currentClean[0].nextCleanDate;
        var nextCleanDate = new Date(nextCleanDate);
        var nextCleanDate = date.format(nextCleanDate, 'ddd, MMM DD YYYY');
        newObject.clientDetails = clientDetails;
        newObject.currentCleanDate = currentCleanDate;
        newObject.lastCleanDate = lastCleanDate;
        newObject.nextCleanDate = nextCleanDate;
        test.push(newObject)
        //newObject.push(clientDetails, currentCleanDate, lastCleanDate, nextCleanDate);
        //step.bind(newObject);
        //scheduleClientDetails.push(newObject);
        //console.log(newObject);
    })
    //scheduleClientDetails.push(newObject);
    //console.log(newObject);
}
console.log(newObject);
query3 = {clientID: schedule[0].clientID};
ClientDetails.findOne((query3), (err, clientDetails)=>{
    //console.log(clientDetails)
    var firstClean = false;
    if(empty(schedule[0].lastClean[0])){
        firstClean = true;
    }else{
        var lastCleanDate = schedule[0].lastClean[0].lastCleanDate;
        var lastCleanDate = new Date(lastCleanDate);
        var lastCleanDate = date.format(lastCleanDate, 'ddd, MMM DD YYYY');
        //.lastCleanDate;
        //var lastCleanDate = lastCleanDate.split('T')
    }
    var currentCleanDate = schedule[0].currentClean[0].currentCleanDate;
    var currentCleanDate = new Date(currentCleanDate);
    var currentCleanDate = date.format(currentCleanDate, 'ddd, MMM DD YYYY');
    var nextCleanDate = schedule[0].currentClean[0].nextCleanDate;
    var nextCleanDate = new Date(nextCleanDate);
    var nextCleanDate = date.format(nextCleanDate, 'ddd, MMM DD YYYY');
    //console.log(currentCleanDate, lastCleanDate, nextCleanDate);
    //console.log(schedule[0]);

})

async function getObject(schedule){
    for(var i=0; i<schedule.length; i++){
        var tempSchedule = schedule[i];
        query3 = {clientID: schedule[i].clientID};
        //test.push(i);
        let newObject = {};
        var count = 0;
        ClientDetails.findOne((query3), (err, clientDetails)=>{
            if(err){
                reject(err);
            }else{
                var clientDetails = clientDetails;
                var firstClean = false;
                if(empty(tempSchedule.lastClean)){
                    firstClean = true;
                }else{
                    var lastCleanDate = tempSchedule.lastClean[0].lastCleanDate;
                    var lastCleanDate = new Date(lastCleanDate);
                    var lastCleanDate = date.format(lastCleanDate, 'ddd, MMM DD YYYY');
                }
                var currentCleanDate = tempSchedule.currentClean[0].currentCleanDate;
                var currentCleanDate = new Date(currentCleanDate);
                var currentCleanDate = date.format(currentCleanDate, 'ddd, MMM DD YYYY');
                var nextCleanDate = tempSchedule.currentClean[0].nextCleanDate;
                var nextCleanDate = new Date(nextCleanDate);
                var nextCleanDate = date.format(nextCleanDate, 'ddd, MMM DD YYYY');
                newObject.clientDetails = clientDetails;
                newObject.currentCleanDate = currentCleanDate;
                newObject.lastCleanDate = lastCleanDate;
                newObject.nextCleanDate = nextCleanDate;
                count ++
                //console.log(count, " ", schedule.length);
                if(count == schedule.length){
                    return count;
                    //console.log(count, " ", schedule.length);
                    //return count;
                }
            }
        })
        //console.log(count)
    }
}
(async () => {
    console.log(await getObject(schedule))
  })()
// var x = getObject(schedule);
// console.log(x);