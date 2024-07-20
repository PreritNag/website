const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const {createTokenuser,validateToken}=require('../services/authentication');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: 'image/useravatar.webp',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
},
{ timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = randomBytes(16).toString('hex');
    const hashpassword = createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt;
    user.password = hashpassword;
    next();
});

userSchema.statics.matchPasswordandGenerateToken = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('user not found');
    }
    const salt = user.salt;
    const hashpassword = user.password;
    const userprovidedhash = createHmac('sha256', salt).update(password).digest('hex');
    if (userprovidedhash !== hashpassword) {
        throw new Error('password does not match');
    }
    // return { ...user.toObject(), password: undefined, salt: undefined };
    const token=createTokenuser(user);
    return token;
};

const User = model("user", userSchema);
module.exports = User;
