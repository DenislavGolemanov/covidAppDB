const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({

    firstName : String,
    secondName : String,
    lastName : String,
    id : String,
    dateBirth: String,
    cardNum : String,
    dateInit : String,
    telNumber : String,
    email : String,
    meanOfSignature: String,
    meanOfContact : String,
    city : String,
    vaccinePreference : String,
    selectedHospital : String,
    dateOfVaccination : String,
    hourOfVaccination : String,
    regId: String,
    
})

module.exports = mongoose.model('User' , UserSchema)