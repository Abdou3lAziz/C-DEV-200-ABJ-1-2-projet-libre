const express = require("express");
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


const app = express()
const port = 3000

//Convertir toutes les reponses en JSON
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);


app.listen(port, () => {
  console.log(`le backend est lancé sur le port :${port}`)
})
