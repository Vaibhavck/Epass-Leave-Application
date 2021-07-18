const mongoose = require('mongoose');
const mongodb = require('mongodb');
const buffer = require('buffer');

var fileSchema = new mongoose.Schema({
    filename : {
        type: String,
        unique: true,
        required: true
    },
    bin: {
        // type: buffer.Buffer,
        type: String,
        required: true,
    }
}, { collection: 'uploads' })


mongoose.model("uploads", fileSchema);