const mongoose = require('mongoose');
require('dotenv').config();

async function main(){
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.syjpuww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to the database"); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = main;