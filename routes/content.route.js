const ContentController=require('../controllers/content.controller');
const {verifyToken}  =require('../middalware/user.middalware')
module.exports=function(app){
    app.post('/contents', verifyToken, ContentController.uploadContent);
    app.get('/contents',verifyToken,ContentController.getAllContents);
    app.get('/contents/:id',verifyToken,ContentController.getContentById);
    app.put('/contents/:id', verifyToken,ContentController.updateContent);
    app.delete('/contents',verifyToken,ContentController.deleteContent);
}