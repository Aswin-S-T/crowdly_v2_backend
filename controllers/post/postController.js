const Post = require("../../models/post/postSchema");
let successResponse = {
	status: 200,
	success: true,
	data: null,
	message: null,
};

let errorResponse = {
	status: 400,
	success: false,
	data: null,
	message: null,
};

module.exports = {
	getAllPost: () => {
		return new Promise(async (resolve, reject) => {
			await Post.find()
				.sort({ createdAt: -1 })
				.then((result) => {
					if (result) {
						successResponse.data = result;
						resolve(successResponse);
					} else {
						resolve(errorResponse);
					}
				});
		});
	},
	getMyPost: (userId) => {
		return new Promise(async (resolve, reject) => {
			await Post.find({ userId }).then((result) => {
				if (result) {
					successResponse.data = result;
					resolve(successResponse);
				} else {
					resolve(errorResponse);
				}
			});
		});
	},
};
