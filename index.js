// -------------------PostgreSQL -------------------------//

// const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config({
// 	path: "./config.env",
// });
// const { Pool } = require("pg");
// const app = express();
// app.use(express.json());

// const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// // Routes
// app.get("/hotels", async (req, res) => {
// 	const queryKeys = Object.keys(req.query);
// 	const instruction = "SELECT * FROM hotels";
// 	let instruction2;
// 	if (queryKeys.length > 0) {
// 		instruction2 = `SELECT * FROM hotels WHERE LOWER(${
// 			queryKeys[0]
// 		})=LOWER('${req.query[queryKeys[0]].toString()}')`;
// 	}

// 	let hotels;
// 	try {
// 		if (queryKeys.length === 0) {
// 			hotels = await Postgres.query(instruction);
// 		} else if (queryKeys.length === 1) {
// 			hotels = await Postgres.query(instruction2);
// 		} else {
// 			for (let i = 1; i < queryKeys.length; i++) {
// 				instruction2 = `${instruction2} AND ${
// 					queryKeys[i]
// 				}='${req.query[queryKeys[i]].toString().toLowerCase()}'`;
// 			}
// 			hotels = await Postgres.query(instruction2);
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({
// 			message: "An error happened",
// 		});
// 	}

// 	res.json(hotels.rows);
// });

// app.get("/hotels/:id", async (req, res) => {
// 	let hotel;
// 	try {
// 		hotel = await Postgres.query("SELECT * FROM hotels WHERE id=$1", [
// 			req.params.id,
// 		]);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({
// 			message: "id not correct",
// 		});
// 	}

// 	res.json(hotel.rows);
// });

// app.get("/hotels/:id/comments", async (req, res) => {
// 	let comments;
// 	try {
// 		comments = await Postgres.query(
// 			"SELECT id, content FROM hotels_comments WHERE hotel_id=$1",
// 			[req.params.id]
// 		);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({
// 			message: "id not correct",
// 		});
// 	}

// 	res.json(comments.rows);
// });

// app.post("/hotels/comments", async (req, res) => {
// 	try {
// 		await Postgres.query(
// 			"INSERT INTO hotels_comments(hotel_id, content) VALUES($1, $2)",
// 			[req.body.hotelId, req.body.content]
// 		);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({
// 			message: "An error happened",
// 		});
// 	}

// 	res.status(201).json({
// 		message: `Comment added for hotel ${req.body.hotelId}`,
// 	});
// });

// // Start server
// app.listen(8001, () => console.log("Listening"));


// ---------------- MongoDB --------------------//

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Hotel = require("./models/hotelModel");

app.use(express.json());

// connect to db
mongoose
	.connect(	
        "mongodb+srv://chibienayme:ayUkqlOk180@cluster0.pg9q2.mongodb.net/hotels?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
    	}
	)
	.then(() => console.log("Connected to MongoDB"));

// routes
// homepage
app.get("/", (_req, res) => {
	res.send("Hotels");
});

// get all Hotels
app.get("/hotels", async (_req, res) => {
	const hotels = await Hotel.find().select("-__v");

	res.json(hotels);
});

// find Hotels by ID
app.get("/hotels/:id", async (req, res) => {
	const hotel = await Hotel.findById(req.params.id);

	res.json(hotel);
});

// find hotels by country
app.get("/hotels/:country", async (req, res) => {
	const hotel = await Hotel.findOne({ country: req.params.country });

	res.json(hotel);
});

// update country of hotel by id
app.patch("/hotels/:id", async (req, res) => {
	await Hotel.findByIdAndUpdate(req.params.id, {
		country: req.body.country,
	});

	res.json({
		message: "Country updated",
	});
});

// Add more an hotel
app.post("/hotels", async (req, res) => {
	await Hotel.create(req.body);

	res.status(201).json({
		message: "Hotel created",
	});
});


// Start server
app.listen(8001, () => console.log("Listening"));