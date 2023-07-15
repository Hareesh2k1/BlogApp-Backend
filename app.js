const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(morgan('dev'));
require('./db/mongodb');
app.use(cors());

const blogRoutes = require('./routes/blogRoute');
app.use('/blog', blogRoutes);

const userRoutes = require('./routes/userRoute');
app.use('/blog', userRoutes);

const postRoutes = require('./routes/postRoute');
app.use('/blog', postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
