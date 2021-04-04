const City = require('../models/City')

///getThreeBest
//getAll
//findOne

async function createCity(data) {

    data.cityName = data.cityName.trim()

    if(data.cityName.includes(' ')) {

        data.cityName = data.cityName.split(' ').join('')
    }

    let city = new City(data)

    city.save()

}

async function getCities() {

    return City.find().lean()

}

async function createHospital(city , hospital) {


    let currentCity = await City.findOne({cityName: city})

    if(!currentCity) {

        throw new Error('No such City')
    }

    hospital.name = hospital.name.trim()

    if(hospital.name.includes(' ')) {

        hospital.name = hospital.name.split(' ').join('')
    }
    
    currentCity.hospitals.push(hospital)


    return currentCity.save()
}

// async function enroll(id , productId) {

//     let tutorial = await Tutorial.findOne({_id: productId})
    
//     if (tutorial.enrolledBy.includes(id)) {throw 'Already enrolled'}

//     tutorial.enrolledBy.push(id)

//     return tutorial.save()

// }

// async function updateOne(productId , data) {

//     let tutorial = await Tutorial.findOneAndUpdate({_id: productId} , data)
    
//     return tutorial

// }



// async function deleteOne(tutorialId) {

//     return Tutorial.findOneAndDelete({_id: tutorialId})
    
// }



module.exports = {
    createCity,
    getCities,
    createHospital,
    // getOne,
    // enroll,
    // updateOne,
    // deleteOne,
}