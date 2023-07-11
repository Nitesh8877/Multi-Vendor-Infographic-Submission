const express=require('express');
const mongoose=require('mongoose');
const BodyParser=require('body-parser');
const DbConfig=require('./configs/db.config')
const serverConfig=require('./configs/server.config');
const User=require('./models/user.model');
const Vendor=require('./models/vendor.model');
const Category=require('./models/category.model')
const Content=require('./models/content.model');
const Payment=require('./models/payment.model')
const constant=require('./utils/constatnt')
const bcrypt=require('bcryptjs')
const app=express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

mongoose.connect(DbConfig.DB_URL);
app.use(express.json());
const db=mongoose.connection
db.on("error",()=>console.log("Can't connect to DB"));
db.once("open",()=>{
    console.log("Connected to monogoDB");
    init();
})
async function init(){
    let user1,user2;
    try {
        await User.collection.drop()
      user1=  await User.create({
            username:"nitesh",
            email:"kumarnitesh88441@gmail.com",
            userType:constant.userTypes.ADMIN,
            password:bcrypt.hashSync('Welcome',8),
            accountType:"Premium"
        })
    
        console.log("Admin User Created");
      user2 = await User.create({
            username:"madhu",
            email:"madhu@gmail.com",
            userType:constant.userTypes.USER,
            password:bcrypt.hashSync('Welcome',8),
            accountType:"Free"
        })
        
    } catch (error) {
        console.log(error.message)
    }
    let vendor1,vendor2;
    try {
        await Vendor.collection.drop()
        vendor1=await Vendor.create({
            name:"nitesh",
            address:"kaimur,bihar",
            email:"nitesh123@gmail.com",
            phone:"8877928825"
        })
        vendor2=await Vendor.create({
            name:"madhu",
            address:"kaimur,bihar",
            email:"madhu234@gmail.com",
            phone:"999999999"
        })
        
    } catch (error) {
        console.log(error.message);
    }
    let cat1,cat2;
    try {
        await Category.collection.drop()
        cat1=await Category.create({
            name:"Photo"
        })
        cat2=await Category.create({
            name:"Video"
        })
        
    } catch (error) {
        console.log("category inside erorr",error.message);
    }

    let con1,con2;
    try {
        await Content.collection.drop();
        con1=await Content.create({
            title:"nature safari picture",
            description:"it is a beutiful ",
            category:cat1,
            vendor:vendor1,
            price:300,
            isFree:false
        })
        con2=await Content.create({
            title:"zoo safari video",
            description:"it is a beutiful zoo safari in rajgir, bihar",
            category:cat2,
            vendor:vendor2,
            price:250,
            isFree:false
        })
    } catch (error) {
        console.log("content side error occured", error.message);
    }

    try {
        await Payment.collection.drop();
        await Payment.create({
            user:user1,
            content:con1,
            amount:300
        })
        await Payment.create({
            user:user2,
            content:con2,
            amount:250
        })

    } catch (error) {
        
    }

}





require('./routes/user.route')(app);
require('./routes/vendor.route')(app);
require('./routes/category.route')(app);
require('./routes/content.route')(app);
require('./routes/payment.route')(app);
app.listen(serverConfig.PORT,()=>{
    console.log("Server started succeffully on this port:", serverConfig.PORT);
})