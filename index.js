/* require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//const User = require('./models/user');
const configure= require('./config/config');



const app = express();
const PORT =  process.env.PORT || 3000;

mongoose.set('strictQuery',false); //to avoid warnings
mongoose.connect('mongodb+srv://swaroop:ninjah2r@cluster0.han8srw.mongodb.net/REGISTRATIONS_JN?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error(err);
});
app.use(express.static('public'));


const connectDB = async ()=> {
  try {
    const conn = await mongoose.connect(configure.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.log(error);
    process.exit(1);
    }
}

//for user routes

const userRoutes=require('./routes/userRoute');
app.get('/',userRoutes);
app.post('/',userRoutes);

app.post('/login',userRoutes);
app.get('/house',userRoutes);
app.get('/logout',userRoutes);
app.get('/forget',userRoutes);
app.post('/forget',userRoutes);
app.get('/forget-password',userRoutes);
app.post('/forget-password',userRoutes);
app.get('/edit',userRoutes);
app.post('/edit',userRoutes);


const adminRoutes=require('./routes/adminRoute');
app.get('/admin',adminRoutes);
app.post('/admin',adminRoutes);
app.get('/admin_house',adminRoutes);
app.get('/admin_logout',adminRoutes);
app.get('/admin_forget',adminRoutes);
app.post('/admin_forget',adminRoutes);
app.get('/admin_forget-password',adminRoutes);
app.post('/admin_forget-password',adminRoutes);
app.get('/admin_dashboard',adminRoutes);
app.get('/delete-user',adminRoutes);


const http = require('http');
const fs = require('fs');
const mime = require('mime');
const { Script } = require('vm');

http.createServer((req, res) => {
  const filePath = '/public/script.js';
  const contentType = mime.getType(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      });
      res.end(data);
    }
  });
});



connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
  });
  
  module.exports = app; */

  require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const configure = require('./config/config'); // Assumes configure.MONGO_URI exists
// Remove unused modules for Netlify deployment:
// const http = require('http');
// const fs = require('fs');
// const mime = require('mime');
// const { Script } = require('vm');

const app = express();
const PORT = process.env.PORT || 3000;

// Optionally, if you need to serve static files from the "public" folder:
app.use(express.static('public'));

// Connect to MongoDB using environment variable or fallback from your config file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || configure.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Mount route handlers using Express routers
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

// Use the routers; assume your route files define all needed endpoints.
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// If running locally (i.e. not on Netlify), start the server.
if (process.env.NODE_ENV !== 'netlify') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
} else {
  // For Netlify deployment, just ensure the DB is connected.
  connectDB();
}

// Export the app for Netlify's serverless functions.
module.exports = app;
