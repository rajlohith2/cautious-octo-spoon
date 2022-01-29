import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='demomern';
        const con = await mongoose.connect(`mongodb+srv://admin:ronaldo7@cluster0.dbor1.mongodb.net/AppData?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB