import express from 'express'

const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config()



const connectionString = "mongodb://127.0.0.1:27017/real-estate";
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.json())
app.use(cookieParser());


app.listen(3000,()=>{
    console.log('app is running on port 3000') 
})


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
