const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true
 },
  description: {
     type: String
     },
  category: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Category' 
    },
  vendor:
   { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Vendor' 
    },
  price: 
  {
     type: Number,
      default: 0 
    },
  isFree:
   {
     type: Boolean,
     default: false
     },
     rating:{
      type:Number,
      default:0
     },
     favorites:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
     ]
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;