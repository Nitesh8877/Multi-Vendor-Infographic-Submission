const VendorController=require('../controllers/vendor.controller');
const verifyToken=require('../middalware/user.middalware');
module.exports=function(app){
    app.post('/createProfile',verifyToken.verifyToken,VendorController.createProfile);
    app.put('/updateProfile/:id',verifyToken.verifyToken,VendorController.updateVendor);
    app.get('/getAllVendors',verifyToken.verifyToken,VendorController.getAllVendors);
    app.get('/getVerndorById/:id',verifyToken.verifyToken,VendorController.getVendorById);
    app.delete('/deleteVendor/:id',[verifyToken.verifyToken,verifyToken.isAdmin],VendorController.deleteVendor);
}