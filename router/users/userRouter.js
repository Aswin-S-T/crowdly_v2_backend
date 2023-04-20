const { response } = require("express");
const express = require("express");
const {
	getAllPost,
	getMyPost,
} = require("../../controllers/post/postController");
const {
	register,
	login,
	getDetails,
	getAllUsers,
	sendFollowRequest,
} = require("../../controllers/users/userController");
const data = require("../../data");
const { verifyToken } = require("../../middlewares/auth");
const Post = require("../../models/post/postSchema");
const { cloudinary } = require("../../utils/cloudinary");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	await Post.create(data.posts);
	res.send("USER ROUTER CALLED");
});

userRouter.post("/register", async (req, res) => {
	const data = req.body;
	register(data).then((response) => {
		res.send(response);
	});
});

userRouter.post("/login", async (req, res) => {
	const data = req.body;
	login(data).then((response) => {
		res.send(response);
	});
});

userRouter.get("/all-post", async (req, res) => {
	getAllPost().then((response) => {
		res.send(response);
	});
});

userRouter.post("/add-post", async (req, res) => {
	// let userData = req.user;
	let response = {};
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader
			.upload(fileStr, {
				upload_preset: "cloudinary_react",
				public_id: Date.now(),
			})
			.then(async (response) => {
				let postData = {
					userId: req.body.userId,
					caption: req.body.caption,
					image: response.url,
					imageType: req.body.imageType,
					about: req.body.about,
					time: new Date(),
				};
				await Post.create(postData).then((response) => {
					if (response) {
						let resp = {};
						resp.status = 200;
						res.send(resp);
					}
				});
			});
	} catch (err) {
		console.error("Error ", err);
		res.status(500).json({ err: "Something went wrong" });
	}
});

userRouter.get("/my-post/:id", async (req, res) => {
	let userId = req.params.id;
	getMyPost(userId).then((response) => {
		res.send(response);
	});
});

userRouter.get("/details/:id", async (req, res) => {
	getDetails(req.params.id).then((response) => {
		res.send(response);
	});
});

userRouter.get("/all-users", async (req, res) => {
	let currentUserId = req.params.id;
	getAllUsers().then((response) => {
		res.send(response);
	});
});

userRouter.post("/follow", async (req, res) => {
	let data = req.body;
	sendFollowRequest(data).then((response) => {
		res.send(response);
	});
});

module.exports = userRouter;
