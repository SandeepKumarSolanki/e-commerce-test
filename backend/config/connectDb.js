import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on('connected' , ()=> {
        console.log('MongoDb connected..')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Products`)

}

export default connectDb;