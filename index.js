const express = require('express');
const cors = require('cors');
const app = express()
const dotenv = require('dotenv');
const port = process.env.PORT || 5000

require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/' , (req, res) => {
  res.send('Crazy resale deals server running')
})

app.listen(port , () => {
console.log(`Crazy resale deals server running on port ${port}`);
})