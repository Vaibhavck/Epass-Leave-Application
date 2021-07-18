const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    name : {
        type: String,
        required: "Required"
    },
    id : {
        type: String,
    },
    age : {
        type: String,
    }
}, { collection: 'test' })


mongoose.model("test", testSchema);