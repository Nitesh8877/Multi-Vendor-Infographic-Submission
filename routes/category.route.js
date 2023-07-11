const CategoryController=require('../controllers/category.controller');
const verifyToken=require('../middalware/user.middalware');
module.exports=function(app){
    app.post('/categories',verifyToken.verifyToken,CategoryController.createCategory);
    app.get('/categories',verifyToken.verifyToken,CategoryController.getAllCategories);
    app.get('/categories/:id',verifyToken.verifyToken,CategoryController.getCategoryById);
    app.put('/categories/:id',verifyToken.verifyToken,CategoryController.updateCategory);
    app.delete('/categories/:id',verifyToken.verifyToken,CategoryController.deleteCategory);

}