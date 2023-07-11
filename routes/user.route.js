const UserController=require('../controllers/user.controller');
const validateUsers=require('../middalware/user.middalware')
module.exports=function(app){
    app.post('/signup',validateUsers.validateField,UserController.signup);
    app.post('/signin',UserController.signin);
    app.get('/getAllData',[validateUsers.verifyToken,validateUsers.isAdmin],UserController.getAllUsers);
}