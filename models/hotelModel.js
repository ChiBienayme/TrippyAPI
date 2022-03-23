const mongoose = require("mongoose");

// créer un schéma
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  country: {
    type: String,
    required: true,
    maxlength: 30,
  },
  
  lastConnection: Date,
  orders: Number,
});

// créer un modèle
const Hotel = mongoose.model("Hotel", hotelSchema);

// exporter le modèle
module.exports = Hotel;
