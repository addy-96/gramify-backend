import mongoose from "mongoose";

const connectDb = async () => {
    try{
     await mongoose.connect(process.env.MONO_URI);
     console.log('Dtatbase connected');
    }catch(err){
     console.error('Dtabase Connection error:',err.message)
     process.exit(1); // exit the node process
    }
}

module.exports = connectDb;