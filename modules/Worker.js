const mongoose = require("mongoose");
const { User } = require("../modules/User");

const { Schema } = mongoose;

const workerSchema = new Schema({
    office: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Worker = User.discriminator("Worker", workerSchema);

module.exports = { Worker, workerSchema }