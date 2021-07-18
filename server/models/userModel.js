const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    regiId : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isStaff: {
        type: Boolean,
        // required: true
    },
    isHOD: {
        type: Boolean,
        // required: true
    },
    isPrincipal: {
        type: Boolean,
        // required: true
    },
    name : {
        type: String,
        required: true
    },
    rollNo : {
        type: String,
        default: true,
    },
    mobNo : {
        type: String,
        required: true
    },
    email : {
        type: String,
        // required: true
    },
    profile : {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { collection: 'users' });

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'secretkey');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function(){
    const user = this;
    var userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.statics.findByCredentials = async (regiId, password) => {
    const user = await User.findOne({regiId});

    console.log("test : ", regiId, password);
    if(!user){
        throw new Error('Unable to login. No such user');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password, user.password);
    console.log("isMatch | ", isMatch);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}


const User = mongoose.model("users", userSchema);