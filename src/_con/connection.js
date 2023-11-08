import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.__MONGODB_USER}:` +
            `${process.env.__MONGODB_PASS}@${process.env.__MONGODB_HOST}:` +
            `${process.env.__MONGODB_PORT}/${process.env.__MONGODB_DB}`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export const closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (err) {
        console.error('Error closing connection', err.message);
    }
}


