import mongoose from "mongoose";

const connection = async () => {
	try {
		await mongoose.connect(process.env.CONNECTION_STRING);
		console.log("MongoDb Connected");
	} catch (err) {
		console.log(err.message);
	}
};

export default connection;
