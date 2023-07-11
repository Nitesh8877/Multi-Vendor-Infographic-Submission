const CategoryController=require('../controllers/category.controller');
const verifyToken=require('../middalware/user.middalware');
module.exports=function(app){
    app.post('/createCategory',verifyToken.verifyToken,CategoryController.createCategory);
    app.get('/getAllCategories',verifyToken.verifyToken,CategoryController.getAllCategories);
    app.get('/getCategoryById/:id',verifyToken.verifyToken,CategoryController.getCategoryById);
    app.put('/updateCategory/:id',verifyToken.verifyToken,CategoryController.updateCategory);
    app.delete('/deleteCategory/:id',verifyToken.verifyToken,CategoryController.deleteCategory);

}