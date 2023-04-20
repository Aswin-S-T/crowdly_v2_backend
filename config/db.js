const mongoose = require("mongoose");
const dbUrl =
	process.env.MONGO_URL || "mongodb://localhost:27017/social_media_web";
// const dbUrl = "mongodb://localhost:27017/social_media_web";
mongoose.set("strictQuery", true);

module.exports.connect = async () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(dbUrl);
		console.log("Database connected");
	} catch (error) {
		console.log(error);
		process.exit();
	}
};
