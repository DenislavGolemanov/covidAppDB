const {Router} = require('express')
const adminController = require('./controllers/adminController')
const clientController = require('./controllers/clientController')

const router = Router();

router.get('/' , (req, res)=>{
    
    res.redirect('/admin')
})

router.use('/admin' , adminController)

router.use('/client' , clientController)


module.exports = router