const mongoose = require('mongoose')

let categorySchema = mongoose.Schema({
    name : {
        type : String,
        require: [true, 'Category Name is Required!']
    }
})

module.exports = mongoose.model('Category', categorySchema)