require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 
app.use('/user', userRoutes);
app.use('/api', postRoutes);


app.get('/', (req,res) => {
    res.send("good to go");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
