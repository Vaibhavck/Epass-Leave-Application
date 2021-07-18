const mongoose = require('mongoose');

var applicationSchema = new mongoose.Schema({
    regiId : {
        type: String,
        unique: false,
        required: true
    },
    filename : {
        type: String,
        required: true
    },
    applicationId: {
        type: String,
        required: true
    },
    status : {
        type: Boolean,
        default: null,
    },
    downloadURL : {
        type: String,
        // required :true,
    },
}, { collection: 'applications', timestamps: true });


mongoose.model("applications", applicationSchema);