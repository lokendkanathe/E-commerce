// import express from "express";
// import cors from 'cors';
// import 'dotenv/config' 
// import connectdb from './config/Mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/useRoutes.js';
// import productRouter from './routes/productRoute.js';

// // App config


// const app = express();
// const port = process.env.PORT || 4000;
// connectdb();
// connectCloudinary()


// //  middlewares


// app.use(express.json());
// app.use(cors());



// // api
// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)


// // Allow access to uploaded images




// app.get('/',(req,res)=>{
//     res.send('API WORKING')
// });


// app.listen(port,()=> console.log('server is start:'+ port))




















import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/Mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/useRoutes.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectdb();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
