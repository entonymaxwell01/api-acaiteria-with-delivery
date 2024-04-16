const moongoose = require('mongoose');

async function main(){
    try {
        moongoose.set("strictQuery", true);
        await moongoose.connect("mongodb+srv://entonymaxwell01:fglKtQXaUmYzhepN@cluster0.syjpuww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to the database"); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = main;