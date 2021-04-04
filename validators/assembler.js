let locationRegEx = /^[0-9]{2}.[0-9]+$/

function assembler(data) {

    let hospitalName = data.hospitalName


    let arrayOfAvailability = Object.keys(data)
                                    .splice(3);

    let dates = arrayOfAvailability.filter((x) => x.includes('.'))

    let times = arrayOfAvailability.filter((x) => x.includes(':'))

    if(!hospitalName || dates.length==0 || times.length==0) {
        return 'false input'
    }

    if(!locationRegEx.test(data.longtitude)  || !locationRegEx.test(data.latitude)) {
        return 'false input'
    }


        let location = {}

        location.lat = Number(data.longtitude)
        location.lng = Number(data.latitude)


        let hours = [];

        times.forEach((time) => hours.push({[time] :data[time]}))


        let availability = {}

        dates.forEach((date) => {

        availability[date] = hours;
    })

    

    
    return  {
        name : hospitalName,
        location : location,
        availability : availability,
    }


    


    
}


module.exports = assembler