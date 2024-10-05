import mongoose from "mongoose";

export async function connection() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => { 

            console.warn("mongo connected successifully ")
        });
        connection.on('error', (err) => { 

            console.error(err)
            process.exit();
        });
    } catch (error) {
        console.log(error);
    }
}