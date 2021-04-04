const City = require('../models/City')
const User = require('../models/User')




async function getCities() {

    let cities = await City.find()

    let cityNames = cities.map((city) => city.cityName)

    return cityNames
}


async function getHospitalAndLocation(cityName) {

    let city = await City.findOne({cityName: cityName})

    city.hospitalOptions = city.hospitals.map((obj) => obj.name)

    return city
}


async function getHospitalAvailability(cityName , hospitalName) {

    let city = await City.findOne({cityName: cityName})

    let hospital = city.hospitals.find((obj) => obj.name == hospitalName)

    let availability = hospital.availability

    availability.dates = Object.keys(availability)


    return availability
}


async function createUser(data) {

    let userValidator = await User.findOne({id: data.id})

    if(userValidator) {

        throw 'User already exists.'
    }

    let user = new User(data)
    
    return user.save()

}


async function updateUser(data , userId) {

    let user = await User.findOne({_id: userId})

    user.regId = "on"

    let withdrawHospitalHour = await changeHospitalAvailability(user)


    
    return User.findByIdAndUpdate({_id: userId} , data)

}


async function changeHospitalAvailability(data) {

    let city =  await City.findOne({cityName: data.city})


    let newCity = {

        hospitals : city.hospitals , 
        cityName: city.cityName , 
        location: city.location

    }

    /// If you see this please don't judge me :() Desperate times insist on desperate solutions, for sure ID-ing everything and using Model would have been better.

    newCity.hospitals.filter((x) => x.name == data.selectedHospital)[0].availability[data.dateOfVaccination].forEach((x) =>{ if(Object.keys(x)[0] == data.hourOfVaccination) {x[data.hourOfVaccination] = data.regId}})

    let update = {hospitals: newCity.hospitals}

    return City.findOneAndUpdate({cityName: data.city} , update)


}


async function getUserRegistration(regId , id) {

    let user = await User.findOne({regId: regId , id: id})
    
    return user

}





module.exports = {

    getCities,
    getHospitalAndLocation,
    getHospitalAvailability,
    createUser,
    updateUser,
    changeHospitalAvailability,
    getUserRegistration,


}