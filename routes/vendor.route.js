const VendorController=require('../controllers/vendor.controller');
const verifyToken=require('../middalware/user.middalware');
module.exports=function(app){
    app.post('/vendors',verifyToken.verifyToken,VendorController.createProfile);
    app.put('/vendors/:id',verifyToken.verifyToken,VendorController.updateVendor);
    app.get('/vendors',verifyToken.verifyToken,VendorController.getAllVendors);
    app.get('/vendors/:id',verifyToken.verifyToken,VendorController.getVendorById);
    app.delete('/vendors/:id',[verifyToken.verifyToken,verifyToken.isAdmin],VendorController.deleteVendor);
}