const {Router} = require('express')
const clientService = require('../services/clientService')
const router = Router()

const uniqid = require('uniqid')


router.get('/citiesNames' , (req , res) => {

    
    clientService.getCities()
        .then(resp => res.send(resp))
        .catch((err) => {
                     console.log(err);
                 })

})


router.get('/:cityName/hospitals' , (req , res) => {

    let cityName = req.params.cityName;

    
    clientService.getHospitalAndLocation(cityName)
        .then(resp => res.send(resp))
        .catch((err) => {
                     console.log(err);
                 })

})


router.get('/:cityName/:hospitalName' , (req , res) => {

    let cityName = req.params.cityName;
    let hospitalName = req.params.hospitalName;

    
    clientService.getHospitalAvailability(cityName , hospitalName)
        .then(resp => res.send(resp))
        .catch((err) => {
                     console.log(err);
                 })

})

router.post('/user' , (req , res) => {

    let userData = req.body

    let regid = uniqid()
    userData.regId = regid

    console.log(userData)

    clientService.createUser(userData)
        .then((resp) => {
            clientService.changeHospitalAvailability(userData)
        })
        .then((resp) => res.send(userData))
        .catch((err) => res.send(err))
})


router.post('/user/update/:userId' , (req , res) => {

    let userData = req.body;
    let userId = req.params.userId;

    let regid = uniqid()
    userData.regId = regid

    console.log(userData)

    clientService.updateUser(userData , userId)
        .then((resp) => {
            clientService.changeHospitalAvailability(userData)
        })
        .then((resp) => res.send(userData))
})


router.get('/user/:regId/:id' , (req , res) => {

    let regId = req.params.regId;
    let id = req.params.id;

    
    clientService.getUserRegistration(regId , id)
        .then(resp => res.send(resp))
        .catch((err) => {
                     console.log(err);
                 })

})

module.exports = router