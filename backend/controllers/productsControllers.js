
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productsModels.js";




const addProduct = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // ✅ Debugging
        console.log("Headers:", req.headers);
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);
        
        const { name, description, price, category, subcategory, bestseller } = req.body;
        const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : []; // ✅ Safe JSON parsing
        console.log("Uploaded Files:", req.files);


        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{ resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subcategory,
            bestseller: bestseller === 'true',
            sizes: req.body.size ? JSON.parse(req.body.size) : [],
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData); // ✅ Debugging

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product added successfully' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};







                          



//  listproducts



// const listProducts = async (req,res)=>{
//     try {
//         const products = await productModel.find({});
//         res.json({success:true},products)
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }

// }









const listProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ success: true, data: products }); // ✅ Fix response format
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// removeprodutcs



const removeProduct = async (req,res)=>{

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"removed products"})
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
   

}



//  single produtcs info


const singleProduct = async (req,res)=>{
    try {
        const {productId}  = req.body;
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        
    }

}


export  {singleProduct,listProducts,removeProduct,addProduct}






















// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productsModels.js";

// const addProduct = async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         console.log("Uploaded Files:", req.files);

//         const { name, description, price, category, subcategory, bestseller } = req.body;
//         const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : []; // ✅ Safe JSON parsing

//         const image1 = req.files?.image1?.[0];
//         const image2 = req.files?.image2?.[0];
//         const image3 = req.files?.image3?.[0];
//         const image4 = req.files?.image4?.[0];

//         const images = [image1, image2, image3, image4].filter(Boolean);

//         let imagesUrl = [];
//         if (images.length > 0) {
//             imagesUrl = await Promise.all(
//                 images.map(async (item) => {
//                     let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//                     return result.secure_url;
//                 })
//             );
//         }

//         const productData = {
//             name,
//             description,
//             category,
//             price: Number(price),
//             subcategory,
//             bestseller: bestseller === 'true',
//             sizes: sizes,
//             image: imagesUrl,
//             date: Date.now(),
//         };

//         console.log(productData);

//         const product = new productModel(productData);
//         await product.save();

//         res.json({ success: true, message: 'Product added successfully' });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // List all products
// const listProducts = async (req, res) => {
//     try {
//         const products = await productModel.find();
//         res.status(200).json({ success: true, products }); // ✅ Fixed response format
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove a product
// const removeProduct = async (req, res) => {
//     try {
//         const { id } = req.params; // Use req.params instead of req.body
//         const product = await productModel.findByIdAndDelete(id);
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }
//         res.json({ success: true, message: "Product removed successfully" });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// // Get single product
// const singleProduct = async (req, res) => {
//     try {
//         const { productId } = req.params; // Use req.params instead of body
//         const product = await productModel.findById(productId);
//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }
//         res.json({ success: true, product });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { singleProduct, listProducts, removeProduct, addProduct };
