const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		firstName: { type: String, required: true },
		middleName: { type: String },
		lastName: { type: String },
		phoneNo: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		token: { type: String, required: true },
		isPrivateAccount: { type: Boolean, default: false },
		followers: [],
		following: [],
		profileImage: { type: String },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
