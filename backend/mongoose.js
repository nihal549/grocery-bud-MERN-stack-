const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/grocery-bud(test)', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
     amount: {
        type: String,
        required: true,
        trim: true
    },
    
    
   
})


const Data = mongoose.model('data', userSchema)

module.exports = Data