const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
    accountName : {
        type : String,
        require: [true, 'Bank Account Name is Required!']
    },
    
    bankName : {
        type : String,
        require: [true, 'Bank Name is Required!']
    },
    
    accountNumber : {
        type : String,
        require: [true, 'Bank Account Number is Required!']
    }
})

module.exports = mongoose.model('Bank', bankSchema)