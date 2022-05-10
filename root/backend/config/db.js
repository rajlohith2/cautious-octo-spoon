import mongoose from 'mongoose'
import constants from '../constants.js';
const connectDB = async () => {
    try {
        //database Name
        const databaseName='demomern';
        const con = await mongoose.connect(constants.DATABASE_STRING, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB