const PaymentController=require('../controllers/payment.controller');
const {verifyToken} =require('../middalware/user.middalware');

module.exports=function(app){
    app.post('/payments',verifyToken,PaymentController.createPayment);
    app.get('/payments',verifyToken,PaymentController.getAllPayments);
    app.get('/payments/:id',verifyToken,PaymentController.getPaymentById );
}