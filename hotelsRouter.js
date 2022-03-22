//------------------ localhost:8000/hotels---------------//
const express = require("express");

const router = express.Router();

const app = express();

const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const { Pool } = require("pg");

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });


//-------------------------Routes--------------------------------//
// (GET /hotels) with SQL
router.get("/", async (_req, res) => {
	let hotels;
	try {
	  hotels = await Postgres.query("SELECT * FROM hotels");
	} catch (err) {
	  console.log(err);
  
	  return res.status(400).json({
		message: "An error happened",
	  });
	}
	res.json(hotels.rows);
});

// (GET /hotels/:id) with SQL
router.get("/:id",async (req, res) => {
	const hotel = await Postgres.query(
		"SELECT * FROM hotels WHERE hotels.id=$1",
		[req.params.id]
	);

	res.json(hotel.rows);
});


// (GET /hotels/:id/name) with SQL
app.get("/hotels/:id/books", (req, res) => {
	const hotel = await Postgres.query(
	  "SELECT books FROM hotels WHERE hotels.id=$1",
	  [req.params.id]
	);
  
	res.json(hotel.rows);
  });

//   export
module.exports = router;