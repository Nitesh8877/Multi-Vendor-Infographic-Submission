const PaymentController=require('../controllers/payment.controller');
const {verifyToken} =require('../middalware/user.middalware');

module.exports=function(app){
    app.post('/makePayment',verifyToken,PaymentController.createPayment);
    app.get('/getPayment',verifyToken,PaymentController.getAllPayments);
    app.get('/getPayment/:id',verifyToken,PaymentController.getPaymentById );
}