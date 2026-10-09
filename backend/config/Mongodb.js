// import { log } from "console";
// import mongoose from "mongoose";

// const connectdb = async ()=>{
//     mongoose.connection.on('connected',()=>{
//         console.log('db connet')
//     })
//      await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)
  
      

// }

// export default connectdb;









import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectdb;