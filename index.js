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
		"Hi clients, welcome !"
	);
});

app.get("*", (_req, res) => {
	res.status(404).send("Error 404 not found");
});

// Start server
app.listen(8000, () => console.log("Listening on port 8000..."));