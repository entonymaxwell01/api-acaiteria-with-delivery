const mongoose = require("mongoose");;

const { Schema } = mongoose;

const workerSchema = new Schema({
    office: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Worker = mongoose.model("Worker", workerSchema);

module.exports = { Worker, workerSchema }