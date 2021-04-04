const {Router} = require('express')
const City = require('../models/City')
const adminService = require('../services/adminService')
const router = Router()
const Assembler = require('../validators/assembler')

router.get('/' , (req , res) => {

    
    adminService.getCities()
        .then((resp) => res.render('admin-view' , {cities: resp}))
        .catch((err) => {
                     console.log(err);
                    res.render('admin-view' , {error: 'Oops!'})
                 })


})

router.get('/create/city' , (req , res) => {

    res.render('create-city')
})

router.post('/create/city' , (req , res) => {

    let data = req.body;

    console.log(data)

    if(data.cityName == '') {

        return res.render('create-city' ,  {error : 'No Data'})

    }

    data.hospitals= []

    adminService.createCity(data)
        .then((resp)=> {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err);
           res.render('admin-view' , {error: 'Oops!'})
        })


    console.log(data.cityName)
})

router.get('/create/hospital/:cityName' , (req ,res) => {

    let cityName = req.params.cityName;

    res.render('create-hospital' , {cityName: cityName})

})

router.post('/create/hospital/:cityName' , (req ,res) => {

    let city = req.params.cityName


    let input = Assembler(req.body);

    if(input == 'false input') {
      return  res.redirect(`/admin/create/hospital/${city}`)
    } 

   adminService.createHospital(city , input)
        .then((resp) => res.redirect('/'))
        .catch((err) => {
            console.log(err);
           res.render('admin-view' , {error: err})
        })


})


module.exports = router