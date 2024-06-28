require('dotenv').config();
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.use(express.static(path.join(__dirname, '..', 'frontend', 'my-mern-project', 'dist')));

app.use('/user', userRoutes);
app.use('/api', postRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'my-mern-project', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
