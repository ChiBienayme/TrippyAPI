//------------------ localhost:8000/---------------//
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

//------------------ Routers ---------------//
const hotelsRouter = require("./routers/hotelsRouter");
app.use("/hotels", hotelsRouter); 

// Routes
app.get("/", (_req, res) => {
	res.send(
		"use endpoint /hotels whith GET method to show all hotels \n use endpoint /hotels whith POST method to add a hotel \n use endpoint /hotels/:id whith GET method to show the hotel who correspond \n use endpoint /restaurants whith GET method to see the restaurant who correspond \n use use endpoint /restaurants/:id whith GET method to see the restaurant who correspond"
	);
});

app.get("*", (_req, res) => {
	res.status(404).send("Error 404 not found");
});

// Start server
app.listen(8000, () => console.log("Listening on port 8000..."));