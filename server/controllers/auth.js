require("dotenv").config();
const SECRET = process.env.SECRET;
console.log("auth:SECRET " + SECRET);
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

const createToken = (username, id) => {
	console.log("SECRET " + SECRET);
	return jwt.sign(
		// takes 3 args (userinfo, secret,option objexpires.if u do not want to expire,just pass 2 args
		{
			username,
			id,
		},
		SECRET,
		{
			expiresIn: "2 days",
		}
	);
};

module.exports = {
	login: async (req, res) => {
		console.log("login ");

		try {
			const { username, password } = req.body;
			console.log("username " + username);
			const foundUser = await User.findOne({ where: { username: username } });
			if (foundUser) {
				const isAuthenticated = bcrypt.compareSync(
					password,
					foundUser.hashedPass
				);
				if (isAuthenticated) {
					const token = createToken(username, foundUser.id);
					const exp = Date.now() + 1000 * 60 * 60 * 48;
					const data = {
						username: foundUser.dataValues.username,
						userId: foundUser.dataValues.id,
						token: token,
						exp: exp,
					};
					console.log("LOGIN SUCCESS");
					res.status(200).send(data);
				} else {
					console.error("Password is incorrect");
					res.status(400).send("Password is incorrect");
				}
			} else {
				console.error("Username not found");
				res.status(400).send("Username not found");
			}
		} catch (error) {
			console.error("Error while registering  " + error);
			res.status(400).send(error);
		}
	},
	register: async (req, res) => {
		console.log("register");
		try {
			const { username, password } = req.body;
			//OR findById() (which we'll use in this course) was replaced by findByPk().
			//here foundUser is a sequilize obj and not just a js obj and so it will have others methods like destroy,findetc
			const foundUser = await User.findOne({ where: { username: username } });
			if (foundUser) {
				res
					.status(400)
					.send("Username already exists. Please try another username ");
			} else {
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				const newUser = await User.create({
					username: username,
					hashedPass: hash,
				});
				console.log(newUser.dataValues);
				const token = createToken(
					newUser.dataValues.username,
					newUser.dataValues.id
				);
				const exp = Date.now() + 1000 * 60 * 60 * 48; //need to make our own expiration time since the JWT sign method only returns the actual token. This uses the JavaScript Date object and adds a number of milliseconds to it to equal two days, which is the expiry we assigned to the token earlier.
				const data = {
					username: newUser.dataValues.username,
					userId: newUser.dataValues.id,
					token: token,
					exp: exp,
				};
				console.log("REGISTRATION SUCCESS");
				res.status(200).send(data);
			}
		} catch (error) {
			console.error("Error while registering  " + error);
			res.status(400).send(error);
		}
		//res.sendStatus(200);
	},
};
