const ContentController=require('../controllers/content.controller');
const {verifyToken}  =require('../middalware/user.middalware')
module.exports=function(app){
    app.post('/uploadContent', verifyToken, ContentController.uploadContent);
    app.get('/getAllContents',verifyToken,ContentController.getAllContents);
    app.get('/getContentById/:id',verifyToken,ContentController.getContentById);
    app.put('/updateContent/:id', verifyToken,ContentController.updateContent);
    app.delete('/deleteContent',verifyToken,ContentController.deleteContent);
}