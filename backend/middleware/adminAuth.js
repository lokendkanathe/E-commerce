// import jwt from 'jsonwebtoken'

// const adminAuth = async (req,res,next)=>{
//     try {
//          const {token}  = req.headers
//          if (!token) {
//             return res.json({success:false, message:"token is not vaild"})
//          }
//          const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//          if (token_decode !== process.env.ADMIN_EMAIL +  process.env.ADMIN_PASSWORD) {
              
//             return res.json({success:false, message:"token is not vaild"})
//          }
//          next()
//     } catch (error) {
//         console.log(error);
        
        
//     }
// }

// export default adminAuth


















import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default adminAuth;