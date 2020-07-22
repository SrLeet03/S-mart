const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name :{
        type:String ,
        required: true ,
        maxlength:32,
        unique:true

    }
},{timeStamps : true} /*whenevr we create a new entry to our schema this records the exact time ! */);

module.exports = mongoose.model("Category" , categorySchema) ;