const mongoose = require('mongoose');
const { User } = require("../modules/User");

const { Schema } = mongoose;

const adminSchema = new Schema({
    isAdmin: {
        type: Boolean,
        required: true,
        default: 1,
    },
}, { timestamps: true });

const Admin = User.discriminator("Admin", adminSchema);

module.exports = { Admin, adminSchema }