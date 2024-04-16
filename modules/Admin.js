const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
    isAdmin: {
        type: Boolean,
        required: true,
        default: 1,
    },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin, adminSchema }