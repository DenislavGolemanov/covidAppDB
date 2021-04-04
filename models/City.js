const mongoose = require('mongoose');

let CitySchema = new mongoose.Schema({

    cityName: String,
    hospitals: Array,
       
})

module.exports = mongoose.model('City' , CitySchema)