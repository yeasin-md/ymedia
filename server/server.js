const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
//Routes===
const videoRoute = require('./routes/videoRoute');
const authRoute = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`DB Connection Successfull`))
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello ymedia api');
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoute);

const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});
