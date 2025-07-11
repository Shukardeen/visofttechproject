const express=require('express');
const app=express();
const dbConfig=require('./config/db.config');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import routes
const contactRoutes = require('./routes/contact.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes=require('./routes/project.routes');
const userRoutes = require("./routes/user.routes");


// Initialize database connection
dbConfig();

const port=process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

//Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})