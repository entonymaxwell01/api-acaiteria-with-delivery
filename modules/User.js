const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({    
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true });


// Criptrografando a senha do usuário
userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

//Comparando a senha do usuário
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema }
