const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ca', 'client'],
        default: 'client'
    }
});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        return next();
    } 
    this.password = await bcrypt.hash(this.password, 10);
    next();
});



userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id, role: this.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model('User', userSchema);