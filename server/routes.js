const express = require('express');
const router = express.Router();
const registrationController = require('./registrationController');
const loginController = require('./loginController');

router.post('/registration', registrationController.registerUser);

router.get('/registration',(req,res)=>{
    console.log("poprawnie zarejestrowano")
})

router.post('/login', loginController.loginUser);

router.get('/login', (req, res) => { 
    console.log("odpoweidz poprawne zarejestrowanie")
});
/* 
router.get('/registration',registrationController.registerUser)
router.get('/login', loginController.loginUser)
 */

module.exports = router;
